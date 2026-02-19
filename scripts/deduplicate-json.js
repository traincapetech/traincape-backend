import fs from 'fs';
import path from 'path';

const dataPath = './data/course-questions.json';
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

let duplicatesRemoved = 0;

for (const key in data) {
    if (!data[key].questions) continue;

    const seen = new Set();
    const uniqueQuestions = [];

    for (const q of data[key].questions) {
        if (!seen.has(q.questionText)) {
            uniqueQuestions.push(q);
            seen.add(q.questionText);
        } else {
            duplicatesRemoved++;
        }
    }

    data[key].questions = uniqueQuestions;
}

if (duplicatesRemoved > 0) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    console.log(`✅ Removed ${duplicatesRemoved} duplicate questions from JSON.`);
} else {
    console.log('No duplicates found in JSON.');
}
