import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';
import { QuestionModel } from '../model/question.model.js';

dotenv.config();
dns.setServers(['8.8.8.8']);

async function findAgile() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const course = await QuestionModel.findOne({ name: /Agile/i });
        if (course) {
            console.log('Found course:', course.name);
            console.log('Number of subtopics:', course.subTopics.length);
            course.subTopics.forEach(s => {
                const easyCount = s.levels.easy ? s.levels.easy.length : 0;
                console.log(`- Subtopic: "${s.name}", Easy questions: ${easyCount}`);
            });
        } else {
            console.log('Course not found');
        }
        await mongoose.connection.close();
    } catch (err) {
        console.error(err);
    }
}

findAgile();
