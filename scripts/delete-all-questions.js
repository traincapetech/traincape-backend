import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

async function deleteAllQuestions() {
    try {
        console.log('Fetching all questions...');
        // The /questions route returns all questions if no query params are provided
        const response = await axios.get(`${BASE_URL}/questions`);

        const questions = response.data;
        if (!Array.isArray(questions)) {
            console.error('Unexpected response format:', questions);
            return;
        }

        console.log(`Found ${questions.length} questions in total.`);

        if (questions.length === 0) {
            console.log('No questions to delete.');
            return;
        }

        let deletedCount = 0;
        let failedCount = 0;

        for (const q of questions) {
            try {
                process.stdout.write(`Deleting question ${deletedCount + failedCount + 1}/${questions.length}: ${q._id} ... `);
                await axios.delete(`${BASE_URL}/questions/${q._id}`);
                console.log('✅');
                deletedCount++;
            } catch (delErr) {
                console.log('❌');
                console.error(`  Failed to delete ${q._id}: ${delErr.response?.data?.error || delErr.message}`);
                failedCount++;
            }
        }

        console.log(`\n--- SUMMARY ---`);
        console.log(`✅ Total deleted: ${deletedCount}`);
        console.log(`❌ Total failed: ${failedCount}`);
        console.log(`Cleanup complete.`);

    } catch (err) {
        console.error('Error fetching questions:', err.message);
        if (err.response) {
            console.log('Response data:', err.response.data);
        }
    }
}

deleteAllQuestions();
