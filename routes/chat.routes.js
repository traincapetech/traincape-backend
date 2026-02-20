import express from 'express';
import { requestHumanHandover, endSession, getPendingSessions } from '../controllers/chat.controller.js';

const chatRouter = express.Router();

chatRouter.post('/request-human', requestHumanHandover);
chatRouter.post('/end-session', endSession);
chatRouter.get('/sessions', getPendingSessions);

export default chatRouter;