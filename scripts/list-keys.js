import fs from 'fs';
const data = JSON.parse(fs.readFileSync('./data/course-questions.json', 'utf-8'));
console.log(Object.keys(data));
