import mongoose from 'mongoose';
import { QuestionModel } from '../model/question.model.js';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGO_URI;

async function run() {
    console.log("Connecting to DB...");
    await mongoose.connect(uri);
    try {
        const course = "Cybersecurity & Compliance";
        const subTopic = "CompTIA CySA+";
        const level = "easy";
        const questionText = "Which of the following is a common SIEM tool used by cybersecurity analysts?";

        console.log(`Searching for course: ${course}`);
        const foundCourse = await QuestionModel.findOne({ name: course });

        if (!foundCourse) {
            console.log("Course not found!");
            return;
        }

        console.log("Course found. Searching for subtopic...");
        const foundSubTopic = foundCourse.subTopics.find(sub => sub.name === subTopic);

        if (!foundSubTopic) {
            console.log("Subtopic not found!");
            return;
        }

        if (!foundSubTopic.levels) {
            console.log("Levels is undefined/null");
            return;
        }

        // Accessing the array directly
        const questions = foundSubTopic.levels[level];
        console.log(`Questions in ${level}: ${questions.length}`);

        if (questions.length > 0) {
            console.log("First Question in DB:", questions[0].questionText);
            console.log("Input Question:      ", questionText);
            console.log("Are they equal trimmed?", questions[0].questionText.trim() === questionText.trim());
        }

        const matching = questions.find(q => q.questionText.trim() === questionText.trim());
        if (matching) {
            console.log("Duplicate FOUND in script!");
            console.log("ID:", matching._id);
        } else {
            console.log("Duplicate NOT found in script.");
        }

    } catch (e) {
        console.error(e);
    } finally {
        await mongoose.disconnect();
    }
}
run();
