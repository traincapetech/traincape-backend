import fs from 'fs';
import path from 'path';

const dataPath = './data/course-questions.json';
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

console.log('--- Course Question Count ---');
for (const key in data) {
    const questions = data[key].questions || [];
    console.log(`${key}: ${questions.length} questions`);
}
