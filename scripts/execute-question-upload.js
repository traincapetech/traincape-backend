/*
  Execute comprehensive question upload for all courses
  This script will upload questions for all major subcourses across all platforms
*/

import axios from 'axios';
import { generateAWSQuestions } from './aws-questions.js';

const ENV = (process.argv[2] || 'local').toLowerCase();
const BASE_URL = ENV === 'prod'
  ? 'https://traincape-backend-1.onrender.com'
  : 'http://localhost:8080';

// All subcourses that need questions
const ALL_SUBCOURSES = [
  // AWS
  { course: 'AWS', subTopic: 'AWSCertifiedSecurity', name: 'AWS Certified Security' },
  { course: 'AWS', subTopic: 'AWSCertifiedSysOpsAdministrator', name: 'AWS Certified SysOps Administrator' },
  { course: 'AWS', subTopic: 'AWSCertifiedDeveloper', name: 'AWS Certified Developer' },
  { course: 'AWS', subTopic: 'AWSCertifiedDevOps', name: 'AWS Certified DevOps' },
  { course: 'AWS', subTopic: 'AWSCertifiedMachineLearning', name: 'AWS Certified Machine Learning' },
  { course: 'AWS', subTopic: 'AWSCertifiedDataAnalytics', name: 'AWS Certified Data Analytics' },
  { course: 'AWS', subTopic: 'AWSCertifiedcloudpractitioner', name: 'AWS Certified Cloud Practitioner' },
  { course: 'AWS', subTopic: 'AWSCertifiedSolutionsArchitect', name: 'AWS Certified Solutions Architect' },
  { course: 'AWS', subTopic: 'AWSCertifiedAdvancedNetworking', name: 'AWS Certified Advanced Networking' },

  // Microsoft
  { course: 'Microsoft', subTopic: 'MicrosoftAzureAdministrator', name: 'Microsoft Azure Administrator' },
  { course: 'Microsoft', subTopic: 'MicrosoftAzureAIFundamentals', name: 'Microsoft Azure AI Fundamentals' },
  { course: 'Microsoft', subTopic: 'MicrosoftAzureDeveloperAssociate', name: 'Microsoft Azure Developer Associate' },
  { course: 'Microsoft', subTopic: 'MicrosoftAzureFundamentals', name: 'Microsoft Azure Fundamentals' },
  { course: 'Microsoft', subTopic: 'MicrosoftDynamics365', name: 'Microsoft Dynamics 365' },
  { course: 'Microsoft', subTopic: 'MicrosoftAzure', name: 'Microsoft Azure' },
  { course: 'Microsoft', subTopic: 'Microsoft365Associate', name: 'Microsoft 365 Associate' },
  { course: 'Microsoft', subTopic: 'Microsoft365Fundamentals', name: 'Microsoft 365 Fundamentals' },
  { course: 'Microsoft', subTopic: 'MicrosoftsecurityComplianceandIdentity', name: 'Microsoft Security Compliance and Identity' },
  { course: 'Microsoft', subTopic: 'MicrosoftPowerPlatform', name: 'Microsoft Power Platform' },
  { course: 'Microsoft', subTopic: 'MicrosoftAzureDataFundamentals', name: 'Microsoft Azure Data Fundamentals' },
  { course: 'Microsoft', subTopic: 'Microsoft365certifiedteamsadministratorassociate', name: 'Microsoft 365 Teams Administrator Associate' },
  { course: 'Microsoft', subTopic: 'MicrosoftPowerbi', name: 'Microsoft Power BI' },
  { course: 'Microsoft', subTopic: 'MicrosoftAzureCosmosDBDeveloperSpecialty', name: 'Microsoft Azure Cosmos DB Developer Specialty' },
  { course: 'Microsoft', subTopic: 'MicrosoftAzureforSAPworkloadsSpecialty', name: 'Microsoft Azure for SAP Workloads Specialty' },
  { course: 'Microsoft', subTopic: 'MicrosoftAzureSolutionsArchitectExpert', name: 'Microsoft Azure Solutions Architect Expert' },
  { course: 'Microsoft', subTopic: 'MicrosoftAzureVirtualDesktopSpecialty', name: 'Microsoft Azure Virtual Desktop Specialty' },
  { course: 'Microsoft', subTopic: 'MicrosoftDynamics365SalesFunctionalConsultantAssociate', name: 'Microsoft Dynamics 365 Sales Functional Consultant Associate' },
  { course: 'Microsoft', subTopic: 'Microsoft365', name: 'Microsoft 365' },
  { course: 'Microsoft', subTopic: 'MicrosoftCybersecurityAnalyst', name: 'Microsoft Cybersecurity Analyst' },
  { course: 'Microsoft', subTopic: 'MicrosoftMs-900:Microsoft365Fundamentals', name: 'Microsoft MS-900: Microsoft 365 Fundamentals' },
  { course: 'Microsoft', subTopic: 'MicrosoftPl-300MicrosoftPowerBiCertificationTraining', name: 'Microsoft PL-300 Power BI Certification Training' },

  // CompTIA
  { course: 'comptia', subTopic: 'CompTIAA+', name: 'CompTIA A+' },
  { course: 'comptia', subTopic: 'CompTIANetwork+N10-008', name: 'CompTIA Network+ N10-008' },
  { course: 'comptia', subTopic: 'CompTIANetwork+N10-007', name: 'CompTIA Network+ N10-007' },
  { course: 'comptia', subTopic: 'CompTIASecurity+701', name: 'CompTIA Security+ SY0-701' },
  { course: 'comptia', subTopic: 'CompTIAAdvancedSecurity', name: 'CompTIA Advanced Security' },
  { course: 'comptia', subTopic: 'CompTIACybersecurityAnalyst', name: 'CompTIA Cybersecurity Analyst' },
  { course: 'comptia', subTopic: 'CompTIACloudEssentials+', name: 'CompTIA Cloud Essentials+' },
  { course: 'comptia', subTopic: 'CompTIAData+', name: 'CompTIA Data+' },
  { course: 'comptia', subTopic: 'CompTIAServer+', name: 'CompTIA Server+' },
  { course: 'comptia', subTopic: 'CompTIACloud+', name: 'CompTIA Cloud+' },
  { course: 'comptia', subTopic: 'CompTIAPenTest', name: 'CompTIA PenTest+' },
  { course: 'comptia', subTopic: 'CompTIAProject+004', name: 'CompTIA Project+ PK0-004' },
  { course: 'comptia', subTopic: 'CompTIAProject+005', name: 'CompTIA Project+ PK0-005' },
  { course: 'comptia', subTopic: 'CompTIALinux+', name: 'CompTIA Linux+' },
  { course: 'comptia', subTopic: 'CompTIASecurity+601', name: 'CompTIA Security+ SY0-601' },

  // Cisco
  { course: 'Cisco', subTopic: 'CiscoCertifiedSupportTechnician(CCST)', name: 'Cisco Certified Support Technician (CCST)' },
  { course: 'Cisco', subTopic: 'CCSTCybersecurity', name: 'CCST Cybersecurity' },
  { course: 'Cisco', subTopic: 'CCSTNetworking', name: 'CCST Networking' },
  { course: 'Cisco', subTopic: 'CiscoCertifiedTechnician(CCT)', name: 'Cisco Certified Technician (CCT)' },
  { course: 'Cisco', subTopic: 'CCTRouting&Switching(Exam: 100-490 RSTECH)', name: 'CCT Routing & Switching' },
  { course: 'Cisco', subTopic: 'CCTDataCenter(Exam: 010-151 DCTECH)', name: 'CCT Data Center' },
  { course: 'Cisco', subTopic: 'CiscoCertifiedNetworkAssociate(CCNA)', name: 'Cisco Certified Network Associate (CCNA)' },
  { course: 'Cisco', subTopic: 'CiscoCertifiedCyberOpsAssociate', name: 'Cisco Certified CyberOps Associate' },
  { course: 'Cisco', subTopic: 'CCNPEnterprise', name: 'CCNP Enterprise' },
  { course: 'Cisco', subTopic: 'CCNPSecurity', name: 'CCNP Security' },
  { course: 'Cisco', subTopic: 'CCNPDataCenter', name: 'CCNP Data Center' },
  { course: 'Cisco', subTopic: 'CCNPServiceProvider', name: 'CCNP Service Provider' },
  { course: 'Cisco', subTopic: 'CCNPCollaboration', name: 'CCNP Collaboration' },
  { course: 'Cisco', subTopic: 'CCNPDevNet(Developer)', name: 'CCNP DevNet (Developer)' },
  { course: 'Cisco', subTopic: 'CCIEEnterpriseInfrastructure', name: 'CCIE Enterprise Infrastructure' },
  { course: 'Cisco', subTopic: 'CCIEEnterpriseWireless', name: 'CCIE Enterprise Wireless' },
  { course: 'Cisco', subTopic: 'CCIESecurity', name: 'CCIE Security' },
  { course: 'Cisco', subTopic: 'CCIEDataCenter', name: 'CCIE Data Center' },
  { course: 'Cisco', subTopic: 'CCIEServiceProvider', name: 'CCIE Service Provider' },
  { course: 'Cisco', subTopic: 'CCIECollaboration', name: 'CCIE Collaboration' }
];

// Generate questions for different levels
const generateQuestions = (course, subTopic, level) => {
  const questions = [];
  
  for (let i = 0; i < 50; i++) {
    const questionText = `${course} ${subTopic} ${level.charAt(0).toUpperCase() + level.slice(1)} Question ${i + 1}`;
    const options = [
      `${level.charAt(0).toUpperCase() + level.slice(1)} Option A for ${questionText}`,
      `${level.charAt(0).toUpperCase() + level.slice(1)} Option B for ${questionText}`,
      `${level.charAt(0).toUpperCase() + level.slice(1)} Option C for ${questionText}`,
      `${level.charAt(0).toUpperCase() + level.slice(1)} Option D for ${questionText}`
    ];
    
    questions.push({
      questionText,
      options,
      correctAnswer: options[Math.floor(Math.random() * 4)] // Random correct answer
    });
  }
  
  return questions;
};

// Upload questions for a specific course and subcourse
const uploadQuestions = async (course, subTopic, level, questions) => {
  console.log(`\n📤 Uploading ${questions.length} ${level} questions for ${course} - ${subTopic}`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const question of questions) {
    try {
      const questionData = {
        questionText: question.questionText,
        course: course,
        subTopic: subTopic,
        level: level,
        options: question.options,
        correctAnswer: question.correctAnswer
      };
      
      const response = await axios.post(`${BASE_URL}/questions/addQuestion`, questionData);
      if (response.status === 201) {
        successCount++;
      }
    } catch (error) {
      errorCount++;
      if (errorCount <= 5) { // Only log first 5 errors to avoid spam
        console.error(`❌ Error uploading question: ${error.message}`);
      }
    }
  }
  
  console.log(`✅ ${successCount} questions uploaded successfully, ${errorCount} errors`);
  return { successCount, errorCount };
};

// Check if questions already exist for a subcourse
const checkExistingQuestions = async (course, subTopic) => {
  try {
    const response = await axios.get(`${BASE_URL}/questions?course=${course}&subTopic=${subTopic}`);
    const questions = response.data;
    
    const levelCounts = {
      easy: 0,
      intermediate: 0,
      advanced: 0
    };
    
    questions.forEach(q => {
      if (q.level && levelCounts.hasOwnProperty(q.level)) {
        levelCounts[q.level]++;
      }
    });
    
    return levelCounts;
  } catch (error) {
    console.error(`Error checking existing questions: ${error.message}`);
    return { easy: 0, intermediate: 0, advanced: 0 };
  }
};

// Main execution function
const main = async () => {
  console.log(`🚀 Starting comprehensive question upload...`);
  console.log(`Environment: ${ENV}`);
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Total subcourses to process: ${ALL_SUBCOURSES.length}`);
  
  let totalProcessed = 0;
  let totalSuccess = 0;
  let totalErrors = 0;
  let skippedCount = 0;
  
  for (const subcourse of ALL_SUBCOURSES) {
    console.log(`\n🔍 Processing ${subcourse.course} - ${subcourse.name}`);
    
    // Check existing questions
    const existingCounts = await checkExistingQuestions(subcourse.course, subcourse.subTopic);
    console.log(`   Existing: Easy=${existingCounts.easy}, Intermediate=${existingCounts.intermediate}, Advanced=${existingCounts.advanced}`);
    
    const levels = ['easy', 'intermediate', 'advanced'];
    let subcourseProcessed = false;
    
    for (const level of levels) {
      if (existingCounts[level] >= 50) {
        console.log(`   ⏭️  Skipping ${level} level (already has ${existingCounts[level]} questions)`);
        skippedCount++;
        continue;
      }
      
      const questionsNeeded = 50 - existingCounts[level];
      console.log(`   📝 Generating ${questionsNeeded} ${level} questions (${existingCounts[level]} already exist)`);
      
      const questions = generateQuestions(subcourse.course, subcourse.subTopic, level);
      const questionsToUpload = questions.slice(0, questionsNeeded);
      
      const result = await uploadQuestions(subcourse.course, subcourse.subTopic, level, questionsToUpload);
      totalSuccess += result.successCount;
      totalErrors += result.errorCount;
      totalProcessed += questionsToUpload.length;
      subcourseProcessed = true;
      
      // Small delay between batches
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    if (!subcourseProcessed) {
      console.log(`   ✅ All levels already have sufficient questions`);
    }
    
    // Progress update
    const progress = ((totalProcessed / (ALL_SUBCOURSES.length * 3 * 50)) * 100).toFixed(2);
    console.log(`   📊 Progress: ${progress}%`);
  }
  
  console.log(`\n🎉 Question upload completed!`);
  console.log(`📊 Final Statistics:`);
  console.log(`   Total questions processed: ${totalProcessed}`);
  console.log(`   Successfully uploaded: ${totalSuccess}`);
  console.log(`   Errors: ${totalErrors}`);
  console.log(`   Skipped (already exist): ${skippedCount}`);
  console.log(`   Success rate: ${totalProcessed > 0 ? ((totalSuccess / totalProcessed) * 100).toFixed(2) : 0}%`);
};

// Run the script
main().catch(console.error);
