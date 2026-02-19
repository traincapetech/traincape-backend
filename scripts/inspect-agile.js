import fs from 'fs';
const data = JSON.parse(fs.readFileSync('./data/course-questions.json', 'utf-8'));
const key = 'AgileScrumLean_AgileTestingAssociateATA';
console.log(JSON.stringify(data[key], (k, v) => k === 'questions' ? undefined : v, 2));
