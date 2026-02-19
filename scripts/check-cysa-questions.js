import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

async function check() {
    try {
        console.log('Fetching questions for CompTIA CySA+...');
        const response = await axios.get(`${BASE_URL}/questions`, {
            params: {
                course: 'Cybersecurity & Compliance',
                subTopic: 'CompTIA CySA+'
            }
        });
        console.log(`Found ${response.data.length} questions.`);

        // Count duplicates
        const map = new Map();
        response.data.forEach(q => {
            const text = q.questionText;
            map.set(text, (map.get(text) || 0) + 1);
        });

        console.log('\nDuplicate check:');
        let duplicateCount = 0;
        map.forEach((count, text) => {
            if (count > 1) {
                console.log(`- "${text.substring(0, 40)}..." appears ${count} times`);
                duplicateCount++;
            }
        });

        if (duplicateCount === 0) {
            console.log('No duplicates found based on question text.');
        } else {
            console.log(`Found ${duplicateCount} questions with duplicates.`);
        }

    } catch (err) {
        console.error('Error:', err.message);
        if (err.response) {
            console.log('Response data:', err.response.data);
        }
    }
}

check();
