import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';
import Question from '../model/question.model.js';

dotenv.config();
dns.setServers(['8.8.8.8']);

async function checkDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const courses = await Question.distinct('course');
        console.log('Unique courses in DB:', courses);

        const subTopics = await Question.distinct('subTopic');
        console.log('Unique subtopics in DB:', subTopics);

        await mongoose.connection.close();
    } catch (err) {
        console.error(err);
    }
}

checkDB();
