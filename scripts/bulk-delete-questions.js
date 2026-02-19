import mongoose from 'mongoose';
import { QuestionModel } from '../model/question.model.js';
import dotenv from 'dotenv';
import dns from 'dns';

dotenv.config();

// Force Google DNS to avoid ECONNREFUSED
try {
    dns.setServers(['8.8.8.8']);
} catch (error) {
    console.warn("Could not set DNS servers:", error);
}

async function bulkDelete() {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        console.error("MONGO_URI not found");
        return;
    }

    console.log("Connecting to Database...");
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB.");

        const count = await QuestionModel.countDocuments();
        console.log(`Found ${count} course categories.`);

        // Option 1: Delete everything in the courses collection
        console.log("Deleting all documents in 'courses' collection...");
        const result = await QuestionModel.deleteMany({});
        console.log(`Successfully deleted ${result.deletedCount} documents.`);

        console.log("All questions/courses have been cleared.");
    } catch (error) {
        console.error("Error during bulk delete:", error);
    } finally {
        await mongoose.disconnect();
    }
}

bulkDelete();
