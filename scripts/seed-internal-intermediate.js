/*
  One-off seeding script for adding Intermediate questions to:
  course: "Internal"
  subTopic: "Lead-and-Sales-Assessment"
  level: "intermediate"

  Usage:
    node server/scripts/seed-internal-intermediate.js local
    node server/scripts/seed-internal-intermediate.js prod

  Endpoints used (same schema in both envs):
    POST /questions/addQuestion { questionText, course, subTopic, level, options, correctAnswer }
*/

import axios from 'axios';

const ENV = (process.argv[2] || 'local').toLowerCase();
const BASE_URL = ENV === 'prod'
  ? 'https://traincape-backend-1.onrender.com'
  : 'http://localhost:8080';

const COURSE = 'Internal';
const SUBTOPIC = 'Lead-and-Sales-Assessment';
const LEVEL = 'intermediate';

const QUESTIONS = [
  {
    questionText: 'What does PRINCE2 stand for?',
    options: [
      'Projects IN Controlled Environments',
      'Professional Resources IN Corporate Enterprises',
      'Project Review IN Contemporary Engineering',
      'Process Regulations IN Complex Environments'
    ],
    correctAnswer: 'Projects IN Controlled Environments'
  },
  {
    questionText: 'Why is PRINCE2 often preferred over PMP in the UK?',
    options: [
      'PRINCE2 is a UK government standard and widely adopted in public sector projects',
      'PMP is not recognized in Europe',
      'PRINCE2 is cheaper but less structured',
      'PMP focuses only on IT projects while PRINCE2 covers all industries'
    ],
    correctAnswer: 'PRINCE2 is a UK government standard and widely adopted in public sector projects'
  },
  {
    questionText: 'What is the passing score for the CompTIA Security+ (SY0-701) exam?',
    options: ['600', '720', '750', '800'],
    correctAnswer: '750'
  },
  {
    questionText: 'What is the exam duration for CompTIA Security+?',
    options: ['90 minutes', '165 minutes', '120 minutes', '150 minutes'],
    correctAnswer: '165 minutes'
  },
  {
    questionText: 'What is the exam duration for PMP?',
    options: ['3 hours', '3 hours 30 minutes', '3 hours 50 minutes', '4 hours 15 minutes'],
    correctAnswer: '3 hours 50 minutes'
  },
  {
    questionText: 'How many exams are required to earn CompTIA A+ certification?',
    options: ['1', '2', '3', '4'],
    correctAnswer: '2'
  },
  {
    questionText: 'How many questions are there in the PMP exam?',
    options: ['150', '180', '200', '210'],
    correctAnswer: '180'
  },
  {
    questionText: 'What is the exam code for Azure Administrator Associate?',
    options: ['AZ-104', 'AZ-204', 'AZ-500', 'AZ-900'],
    correctAnswer: 'AZ-104'
  },
  {
    questionText: 'What is the minimum work experience required to apply for PMP certification?',
    options: ['24 months', '36 months', '48 months', '60 months'],
    correctAnswer: '36 months'
  },
  {
    questionText: 'How long is the PMP exam available after your application is approved?',
    options: ['6 months', '9 months', '12 months', '18 months'],
    correctAnswer: '12 months'
  },
  {
    questionText: 'What is the exam code for Microsoft Azure AI Fundamentals?',
    options: ['AI-100', 'AI-200', 'AI-900', 'AZ-900'],
    correctAnswer: 'AI-900'
  },
  {
    questionText: 'Which certification is offered by Google for cloud fundamentals?',
    options: ['Cloud Digital Leader', 'AZ-900', 'CCSP', 'SC-900'],
    correctAnswer: 'Cloud Digital Leader'
  },
  {
    questionText: 'How much professional work experience is required to earn the CISA certification?',
    options: ['2 years', '3 years', '5 years', '7 years'],
    correctAnswer: '5 years'
  },
  {
    questionText: 'How much experience is required to attempt PRINCE2 Foundation?',
    options: ['0 years', '2 years', '3 years', '5 years'],
    correctAnswer: '0 years'
  },
  {
    questionText: 'What is the exam fee for PSM I certification?',
    options: ['$100', '$150', '$200', '$250'],
    correctAnswer: '$200'
  },
  {
    questionText: 'What is the proctoring method for PSM I and PSM II exams?',
    options: ['In-person test center', 'Online, non-proctored', 'Online, fully proctored', 'Paper-based exam'],
    correctAnswer: 'Online, non-proctored'
  },
  {
    questionText: 'Are Scrum.org PSM I and II certificates lifetime or renewable?',
    options: ['Renewable every 3 years', 'Renewable every 5 years', 'Lifetime, no renewal required', 'Valid for 10 years'],
    correctAnswer: 'Lifetime, no renewal required'
  },
  {
    questionText: 'How much is the exam fees for CISM?',
    options: ['$525', '$675', '$760', '$800'],
    correctAnswer: '$760'
  },
  {
    questionText: 'How many levels are there in the AWS certification path?',
    options: ['2', '3', '4', '5'],
    correctAnswer: '4'
  },
  {
    questionText: 'What is the exam fee for AWS Specialty certifications?',
    options: ['$150', '$200', '$300', '$400'],
    correctAnswer: '$300'
  },
  {
    questionText: 'Which AWS certification is recommended for cloud beginners with no prior experience?',
    options: [
      'AWS Solutions Architect – Associate',
      'AWS Cloud Practitioner',
      'AWS SysOps Administrator – Associate',
      'AWS DevOps Engineer – Professional'
    ],
    correctAnswer: 'AWS Cloud Practitioner'
  },
  {
    questionText: 'What is the exam code for the CCNA certification?',
    options: ['200-301', '200-201', '350-401', '300-101'],
    correctAnswer: '200-301'
  },
  {
    questionText: 'What is the exam fee for CCNA (200-301)?',
    options: ['$200', '$300', '$250', '$350'],
    correctAnswer: '$300'
  },
  {
    questionText: 'Which certification is focused on auditing?',
    options: ['CISM', 'CISA', 'CISSP', 'CEH'],
    correctAnswer: 'CISA'
  },
  {
    questionText: 'Which certification is designed for cloud architects?',
    options: ['AWS Solutions Architect', 'CEH', 'PMP', 'CISA'],
    correctAnswer: 'AWS Solutions Architect'
  },
  {
    questionText: 'How many PDUs are required to maintain the PMP certification every 3 years?',
    options: ['35', '45', '60', '75'],
    correctAnswer: '60'
  },
  {
    questionText: 'A candidate wants to pursue networking fundamentals. Which Cisco certification should they begin with?',
    options: ['CCNP', 'CCIE', 'CCNA', 'DevNet Professional'],
    correctAnswer: 'CCNA'
  },
  {
    questionText: 'Which ISACA certification is best suited for professionals managing enterprise IT risk?',
    options: ['CISA', 'CRISC', 'CISM', 'CGEIT'],
    correctAnswer: 'CRISC'
  },
  {
    questionText: 'Which certification is most aligned with IT governance?',
    options: ['CISA', 'CRISC', 'CGEIT', 'CISSP'],
    correctAnswer: 'CGEIT'
  },
  {
    questionText: 'The CISSP exam is conducted by:',
    options: ['ISACA', 'EC-Council', 'CompTIA', '(ISC)²'],
    correctAnswer: '(ISC)²'
  },
  {
    questionText: 'What is the renewal cycle for CompTIA certifications (like Security+)?',
    options: ['2 years', '3 years', '4 years', '5 years'],
    correctAnswer: '3 years'
  }
];

async function main() {
  console.log(`Seeding ${QUESTIONS.length} questions to ${ENV.toUpperCase()} -> ${BASE_URL}`);
  let success = 0;
  for (const q of QUESTIONS) {
    try {
      const payload = {
        questionText: q.questionText,
        course: COURSE,
        subTopic: SUBTOPIC,
        level: LEVEL,
        options: q.options,
        correctAnswer: q.correctAnswer,
      };
      await axios.post(`${BASE_URL}/questions/addQuestion`, payload, {
        headers: { 'Content-Type': 'application/json' }
      });
      success += 1;
      console.log(`✓ Added: ${q.questionText.slice(0, 60)}...`);
    } catch (err) {
      console.error(`✗ Failed: ${q.questionText.slice(0, 60)}...`, err.response?.data || err.message);
    }
  }
  console.log(`Done. Success: ${success}/${QUESTIONS.length}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


