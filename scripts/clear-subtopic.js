import axios from 'axios';

const ENV = (process.argv[2] || 'local').toLowerCase();
const BASE_URL = ENV === 'prod'
    ? 'https://traincape-backend-1.onrender.com'
    : 'http://localhost:8080';

const COURSE = 'comptia';
const SUBTOPIC = 'CompTIAA+';

async function clearSubTopic() {
    try {
        console.log(`Fetching questions for ${SUBTOPIC}...`);
        const res = await axios.get(`${BASE_URL}/questions/getQuestions`, {
            params: { course: COURSE, subTopic: SUBTOPIC, level: 'easy' }
        });

        const questions = res.data;
        console.log(`Found ${questions.length} questions.`);

        for (const q of questions) {
            console.log(`Deleting: ${q._id}`);
            await axios.delete(`${BASE_URL}/questions/${q._id}`);
        }

        console.log(`Successfully cleared ${SUBTOPIC}.`);
    } catch (err) {
        console.error('Error:', err.response?.data || err.message);
    }
}

clearSubTopic();
