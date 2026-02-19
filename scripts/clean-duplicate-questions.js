/**
 * Clean duplicate questions for a specific course/subTopic
 * Keeps only the LATEST 50 questions (the ones you uploaded) and deletes the old duplicates.
 * 
 * Usage: node scripts/clean-duplicate-questions.js [local|prod]
 */

import axios from 'axios';

const ENV = (process.argv[2] || 'local').toLowerCase();
const BASE_URL = ENV === 'prod'
    ? 'https://traincape-backend-1.onrender.com'
    : 'http://localhost:8080';

// Courses to clean - add more entries if needed
const COURSES_TO_CLEAN = [
    { course: 'comptia', subTopic: 'CompTIAA+', expectedCount: 50 },
    { course: 'comptia', subTopic: 'CompTIANetwork+', expectedCount: 50 },
    { course: 'comptia', subTopic: 'CompTIASecurity+', expectedCount: 50 },
];

async function cleanCourse(course, subTopic, expectedCount) {
    try {
        // Fetch all questions for this course/subTopic
        const res = await axios.get(`${BASE_URL}/questions/getQuestions`, {
            params: { course, subTopic, level: 'easy' }
        });

        const questions = res.data.questions || res.data;
        console.log(`\n📋 ${course} / ${subTopic}: Found ${questions.length} questions (expected: ${expectedCount})`);

        if (questions.length <= expectedCount) {
            console.log(`   ✅ Already clean, no duplicates.`);
            return;
        }

        // The OLDEST questions are duplicates - keep the LATEST ones
        // Sort by _id (MongoDB ObjectIds are time-based, newer = later)
        const sorted = [...questions].sort((a, b) => {
            if (a._id > b._id) return 1;
            if (a._id < b._id) return -1;
            return 0;
        });

        const toDelete = sorted.slice(0, sorted.length - expectedCount);
        console.log(`   🗑️  Will delete ${toDelete.length} old duplicate questions...`);

        let deleted = 0;
        for (const q of toDelete) {
            try {
                await axios.delete(`${BASE_URL}/questions/deleteQuestion/${q._id}`);
                deleted++;
            } catch (err) {
                console.log(`   ❌ Failed to delete ${q._id}: ${err.message}`);
            }
        }

        console.log(`   ✅ Deleted ${deleted}/${toDelete.length} old questions. Remaining: ${questions.length - deleted}`);
    } catch (err) {
        console.log(`   ❌ Error fetching questions: ${err.message}`);
    }
}

async function main() {
    console.log(`🔧 Cleaning duplicate questions on: ${BASE_URL}\n`);

    for (const { course, subTopic, expectedCount } of COURSES_TO_CLEAN) {
        await cleanCourse(course, subTopic, expectedCount);
    }

    console.log('\n✅ Done!');
}

main().catch(console.error);
