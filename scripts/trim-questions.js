import fs from 'fs';
import path from 'path';

const dataPath = 'e:/Traincape_Website/Traincape_Website/server/data/course-questions.json';
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

if (data['comptia_CompTIAA+']) {
    const originalQuestions = data['comptia_CompTIAA+'].questions;
    console.log(`Original count: ${originalQuestions.length}`);

    // Deduplicate by questionText
    const seen = new Set();
    const uniqueQuestions = originalQuestions.filter(q => {
        if (seen.has(q.questionText)) {
            return false;
        }
        seen.add(q.questionText);
        return true;
    });

    console.log(`Unique count: ${uniqueQuestions.length}`);
    data['comptia_CompTIAA+'].questions = uniqueQuestions.slice(0, 50);
    console.log(`Final count: ${data['comptia_CompTIAA+'].questions.length}`);
}

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log('Successfully trimmed CompTIAA+ questions to 50.');
