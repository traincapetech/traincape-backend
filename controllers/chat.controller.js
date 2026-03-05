import ChatSession from '../model/chatSession.model.js';
import Consultant from '../model/consultant.model.js';
import { getIO } from '../socket/socketManager.js';

export const requestHumanHandover = async (req, res) => {
  try {
    const { clientName } = req.body;
    const sessionToken = `live_${Date.now()}`;
    const io = getIO();

    // 1. Check for a free consultant (Online AND no active token)
    const freeConsultant = await Consultant.findOne({ isOnline: true, activeToken: null });
    console.log("DEBUG: Human handover requested. Free consultant found:", freeConsultant ? freeConsultant.name : "None");

    let status = 'waiting';
    let consultantName = null;

    if (freeConsultant) {
      status = 'active';
      consultantName = freeConsultant.name;

      // Mark consultant as busy immediately
      await Consultant.findByIdAndUpdate(freeConsultant._id, { activeToken: sessionToken });
    } else {
      // Notify all available consultants (now relies purely on socket below)
      const onlineConsultants = await Consultant.find({ isOnline: true });
      console.log("DEBUG: No free consultant. Total online:", onlineConsultants.length);
    }

    // 2. Create session
    const newSession = await ChatSession.create({
      token: sessionToken,
      status: status,
      consultantName: consultantName,
      clientName: clientName || 'Guest'
    });

    if (io) {
      if (status === 'active') {
        // Notify the consultant specifically (they should be in consultant_room)
        // Or we could have them joined to their own private room 'consultant_Name'
        io.to('consultant_room').emit('auto_assigned', { session: newSession, consultantName });
        // Since the client hasn't joined the token room yet, they will join after this response
      } else {
        // Notify all consultants of a new waiting request
        io.to('consultant_room').emit('new_session', newSession);
      }
    }

    res.json({ success: true, token: sessionToken, status, consultantName });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const endSession = async (req, res) => {
  const { token } = req.body;
  const session = await ChatSession.findOneAndUpdate({ token }, { status: 'closed' });
  if (session && session.consultantName) {
    await Consultant.findOneAndUpdate({ name: session.consultantName }, { activeToken: null });
  }
  res.json({ success: true });
};

export const getPendingSessions = async (req, res) => {
  try {
    const sessions = await ChatSession.find({ status: 'waiting' }).sort({ createdAt: 1 });
    res.json({ success: true, sessions });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};