import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

async function test() {
    const question = {
        course: "Cybersecurity & Compliance",
        subTopic: "CompTIA CySA+",
        level: "easy",
        questionText: "Which of the following is a common SIEM tool used by cybersecurity analysts?",
        options: [
            "A) Microsoft Word",
            "B) Splunk",
            "C) Adobe Photoshop",
            "D) Google Sheets"
        ],
        correctAnswer: "B) Splunk"
    };

    try {
        console.log("Attempting to add a known duplicate question...");
        const response = await axios.post(`${BASE_URL}/questions/addQuestion`, question);
        console.log("Response Status:", response.status);
        console.log("Response Data:", response.data);
    } catch (err) {
        console.error("Error:", err.message);
        if (err.response) {
            console.log("Response Data:", err.response.data);
        }
    }
}

test();
