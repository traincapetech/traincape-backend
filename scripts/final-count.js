import fs from 'fs';
import path from 'path';

const dataPath = './data/course-questions.json';
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

console.log('--- Final Course Question Counts ---');
const results = [];
for (const key in data) {
    const questions = data[key].questions || [];
    if (questions.length > 0) {
        results.push({ course: key, count: questions.length });
    }
}

results.sort((a, b) => b.count - a.count);
results.forEach(r => {
    console.log(`${r.course}: ${r.count} questions`);
});

const total = results.reduce((sum, r) => sum + r.count, 0);
console.log(`\nTotal questions: ${total}`);
