/**
 * Generate course-questions.json entries for ALL certifications 
 * (CompTIA, PECB, and GIPMC certifications)
 * 
 * Run: node server/scripts/generate-all-questions-keys.js
 */

const fs = require("fs");
const path = require("path");

// Read the GIPMC certifications menu
const menuPath = path.join(__dirname, "../../client/src/data/gipmc-certifications-menu.json");
const menu = JSON.parse(fs.readFileSync(menuPath, "utf-8"));

// Read existing course-questions.json
const questionsPath = path.join(__dirname, "../data/course-questions.json");
const existing = JSON.parse(fs.readFileSync(questionsPath, "utf-8"));

// Helper: decode HTML entities (matching the client-side logic)
function decodeHtmlEntities(str) {
    return str
        .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(n))
        .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCharCode(parseInt(n, 16)))
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&nbsp;/g, " ")
        .replace(/&apos;/g, "'");
}

// Helper: map domain to top category (matching certificationsCatalog.js logic)
function mapDomainToTopCategory(domainTitle = "", groupTitle = "") {
    const d = `${domainTitle} ${groupTitle}`.toLowerCase();

    if (/(project|program|portfolio|pmo|planning|scheduling|leadership|executive)/.test(d))
        return "Project & Program Management";
    if (/(agile|scrum|safe|kanban|lean|six sigma)/.test(d))
        return "Agile, Scrum & Lean";
    if (/(cyber|security|risk|compliance|iso\/iec|governance|secure coding|privacy)/.test(d))
        return "Cybersecurity & Compliance";
    if (/(cloud|devops|infrastructure|network|data centre|wireless|it & network)/.test(d))
        return "Cloud, Infrastructure & Networking";
    if (/(artificial intelligence|ai|data science|machine learning|automation|analytics)/.test(d))
        return "AI, Data & Emerging Technologies";
    if (/(software testing|quality|automation testing|qa|development|web designing|python)/.test(d))
        return "Software Development & Testing";
    if (/(business|management|hr|finance|accounting|supply chain|procurement|operations|leadership development)/.test(d))
        return "Business, HR & Management";
    if (/(sales|marketing|branding|customer experience|call centre|service operations|ux|ui|business analysis)/.test(d))
        return "Digital Marketing & Customer Experience";

    return "Business, HR & Management";
}

// Helper: create a safe key from course and subtopic
function makeKey(course, subTopic) {
    return `${course}_${subTopic}`
        .replace(/[^a-zA-Z0-9_]/g, "")
        .substring(0, 80);
}

// Count stats
let existingCount = Object.keys(existing).length;
let newCount = 0;

// Process all GIPMC certifications from the menu
for (const domain of menu?.hierarchy || []) {
    for (const group of domain?.groups || []) {
        const categoryTitle = mapDomainToTopCategory(domain.domainTitle, group.groupTitle);

        for (const course of group.courses || []) {
            const title = decodeHtmlEntities(course.title);

            // Skip junk/test entries
            if (!title || /^testing/i.test(title)) continue;

            const key = makeKey(categoryTitle, title);

            // Don't overwrite existing entries that may have questions
            if (!existing[key]) {
                existing[key] = {
                    course: categoryTitle,
                    subTopic: title,
                    questions: [],
                };
                newCount++;
            }
        }
    }
}

// Write back
const outputPath = questionsPath;
fs.writeFileSync(outputPath, JSON.stringify(existing, null, 4), "utf-8");

console.log(`\n✅ Done!`);
console.log(`   Existing entries: ${existingCount}`);
console.log(`   New entries added: ${newCount}`);
console.log(`   Total entries: ${Object.keys(existing).length}`);
console.log(`\n   File: ${outputPath}`);
console.log(`\n   Now you can add questions to any entry in course-questions.json`);
console.log(`   Then run: node server/scripts/upload-questions.js to upload to DB\n`);
