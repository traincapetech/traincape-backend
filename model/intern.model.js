import mongoose from 'mongoose';

const internSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    degree: {
        type: String,
        required: true
    },
    techStack: {
        type: String,
        required: true
    },
    photo: {
        data: Buffer,
        contentType: String,
        filename: String,
        size: Number
    }
}, { timestamps: true });

const InternModel = mongoose.model('Intern', internSchema);

export default InternModel;
