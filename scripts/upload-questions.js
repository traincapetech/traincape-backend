/**
 * Upload questions from course-questions.json to MongoDB
 * Usage: node scripts/upload-questions.js [local|prod]
 * Default: local (http://localhost:8080)
 */

import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ENV = (process.argv[2] || 'local').toLowerCase();
const BASE_URL = ENV === 'prod'
    ? 'https://traincape-backend-1.onrender.com'
    : 'http://localhost:8080';

const API = `${BASE_URL}/questions/addQuestion`;

async function main() {
    const dataPath = path.join(__dirname, '..', 'data', 'course-questions.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    const keys = Object.keys(data);
    console.log(`Found ${keys.length} courses in course-questions.json`);
    console.log(`Uploading to: ${BASE_URL}\n`);

    let totalUploaded = 0;
    let totalSkipped = 0;
    let totalFailed = 0;

    for (const key of keys) {
        const { course, subTopic, questions } = data[key];

        if (!questions || questions.length === 0) {
            console.log(`⏭️  ${key}: No questions, skipping`);
            totalSkipped++;
            continue;
        }

        console.log(`📝 ${key}: Uploading ${questions.length} questions...`);
        let uploaded = 0;
        let failed = 0;

        for (const q of questions) {
            try {
                await axios.post(API, {
                    course,
                    subTopic,
                    level: 'easy',
                    questionText: q.questionText,
                    options: q.options,
                    correctAnswer: q.correctAnswer
                });
                uploaded++;
            } catch (err) {
                const msg = err.response?.data?.error || err.message;
                console.log(`   ❌ Failed: "${q.questionText.substring(0, 40)}..." - ${msg}`);
                failed++;
            }
        }

        console.log(`   ✅ ${uploaded} uploaded, ❌ ${failed} failed`);
        totalUploaded += uploaded;
        totalFailed += failed;
    }

    console.log(`\n--- SUMMARY ---`);
    console.log(`✅ Uploaded: ${totalUploaded} questions`);
    console.log(`⏭️  Skipped: ${totalSkipped} courses (no questions)`);
    console.log(`❌ Failed: ${totalFailed} questions`);
}

main().catch(console.error);
