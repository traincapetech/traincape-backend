import mongoose from 'mongoose';

const chatSessionSchema = new mongoose.Schema({
    token: { type: String, required: true, unique: true },
    status: { type: String, enum: ['waiting', 'active', 'closed'], default: 'waiting' },
    consultantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Consultant', default: null },
    consultantName: { type: String, default: null },
    clientName: { type: String, default: 'Guest' },
    messages: [{
        sender: { type: String },
        text: { type: String },
        timestamp: { type: Date, default: Date.now }
    }],
    createdAt: { type: Date, default: Date.now },
    closedAt: { type: Date, default: null }
});

export default mongoose.model('ChatSession', chatSessionSchema);
