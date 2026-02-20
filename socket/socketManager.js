import { Server } from 'socket.io';
import ChatSession from '../model/chatSession.model.js';
import Consultant from '../model/consultant.model.js';

export const initSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: { origin: "*" }
  });

  io.on('connection', (socket) => {
    console.log('New connection:', socket.id);

    // Consultant joining the "Consultant Dashboard" room
    socket.on('join_consultant', async (data) => {
      const name = data?.name || "Expert Consultant";
      socket.join('consultant_room');
      socket.consultantName = name;

      // Mark as online in DB
      await Consultant.findOneAndUpdate(
        { name: socket.consultantName },
        { isOnline: true },
        { upsert: true, new: true }
      );

      console.log(`Consultant ${socket.consultantName} is online`);
    });

    // Client or Consultant joining a specific chat session
    socket.on('join_session', (token) => {
      socket.join(token);
    });

    // Consultant accepting a chat
    socket.on('accept_chat', async ({ token, consultantName }) => {
      try {
        // Find the consultant to get their ID
        const consultant = await Consultant.findOne({ name: consultantName });
        const consultantId = consultant ? consultant._id : null;

        // 1. Update Session in DB with consultantId
        await ChatSession.findOneAndUpdate(
          { token },
          { status: 'active', consultantName, consultantId }
        );

        // 2. Mark consultant as busy
        await Consultant.findOneAndUpdate(
          { name: consultantName },
          { activeToken: token }
        );

        // 3. Notify parties
        socket.join(token);
        io.to(token).emit('consultant_joined', { consultantName });
        io.to('consultant_room').emit('session_accepted', { token, consultantName });

        console.log(`Chat ${token} accepted by ${consultantName}`);
      } catch (err) {
        console.error("Error accepting chat:", err);
      }
    });

    socket.on('send_message', async (data) => {
      // Save message to the session in DB
      try {
        await ChatSession.findOneAndUpdate(
          { token: data.token },
          { $push: { messages: { sender: data.sender, text: data.text } } }
        );
      } catch (err) {
        console.error('Error saving message:', err);
      }
      io.to(data.token).emit('receive_message', data);
    });

    socket.on('end_chat', async ({ token, consultantName }) => {
      try {
        await ChatSession.findOneAndUpdate({ token }, { status: 'closed', closedAt: new Date() });
        if (consultantName) {
          await Consultant.findOneAndUpdate({ name: consultantName }, { activeToken: null });
        }
        io.to(token).emit('chat_ended');
        socket.leave(token);
      } catch (err) {
        console.error("Error ending chat:", err);
      }
    });

    socket.on('disconnect', async () => {
      if (socket.consultantName) {
        await Consultant.findOneAndUpdate(
          { name: socket.consultantName },
          { isOnline: false, activeToken: null }
        );
        console.log(`Consultant ${socket.consultantName} disconnected`);
      }
    });
  });

  return io;
};

let ioInstance;
export const getIO = () => ioInstance;
export const setIO = (io) => { ioInstance = io; };