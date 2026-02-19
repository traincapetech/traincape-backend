import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

async function clean() {
    try {
        console.log('Fetching questions for CompTIA CySA+...');
        const response = await axios.get(`${BASE_URL}/questions`, {
            params: {
                course: 'Cybersecurity & Compliance',
                subTopic: 'CompTIA CySA+'
            }
        });

        const questions = response.data;
        console.log(`Found ${questions.length} questions.`);

        // Group by question text
        const map = new Map();
        questions.forEach(q => {
            const text = q.questionText;
            if (!map.has(text)) {
                map.set(text, []);
            }
            map.get(text).push(q);
        });

        console.log('\nCleaning duplicates...');
        let deletedCount = 0;

        for (const [text, group] of map) {
            if (group.length > 1) {
                console.log(`Duplicate found: "${text.substring(0, 30)}..." (${group.length} times)`);

                // Keep the first one, delete the rest
                const toDelete = group.slice(1);

                for (const q of toDelete) {
                    try {
                        console.log(`  Deleting ID: ${q._id}`);
                        await axios.delete(`${BASE_URL}/questions/deleteQuestion/${q._id}`);
                        deletedCount++;
                    } catch (delErr) {
                        console.error(`  Failed to delete ${q._id}: ${delErr.message}`);
                    }
                }
            }
        }

        console.log(`\nCleanup complete. Deleted ${deletedCount} duplicates.`);

    } catch (err) {
        console.error('Error:', err.message);
        if (err.response) {
            console.log('Response data:', err.response.data);
        }
    }
}

clean();
