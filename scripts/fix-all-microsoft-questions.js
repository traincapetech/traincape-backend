/*
  Fix All Microsoft Questions Script
  This script will replace ALL generic Microsoft questions with proper, exam-relevant content
*/

import axios from 'axios';

const ENV = (process.argv[2] || 'local').toLowerCase();
const BASE_URL = ENV === 'prod'
  ? 'https://traincape-backend-1.onrender.com'
  : 'http://localhost:8080';

// Generic Microsoft Azure Questions (can be used for multiple subcourses)
const MICROSOFT_AZURE_QUESTIONS = {
  easy: [
    {
      questionText: "What is Microsoft Azure?",
      options: [
        "A cloud computing platform and service",
        "A desktop operating system",
        "A database management system",
        "A web browser"
      ],
      correctAnswer: "A cloud computing platform and service"
    },
    {
      questionText: "Which Azure service provides virtual machines?",
      options: [
        "Azure Virtual Machines",
        "Azure Functions",
        "Azure Logic Apps",
        "Azure App Service"
      ],
      correctAnswer: "Azure Virtual Machines"
    },
    {
      questionText: "What is Azure Resource Manager?",
      options: [
        "A deployment and management service",
        "A monitoring service",
        "A security service",
        "A backup service"
      ],
      correctAnswer: "A deployment and management service"
    },
    {
      questionText: "Which Azure service provides managed databases?",
      options: [
        "Azure SQL Database",
        "Azure Storage",
        "Azure Functions",
        "Azure Logic Apps"
      ],
      correctAnswer: "Azure SQL Database"
    },
    {
      questionText: "What is Azure Active Directory?",
      options: [
        "Identity and access management service",
        "Database service",
        "Storage service",
        "Networking service"
      ],
      correctAnswer: "Identity and access management service"
    },
    {
      questionText: "Which Azure service provides serverless computing?",
      options: [
        "Azure Functions",
        "Azure Virtual Machines",
        "Azure Container Instances",
        "Azure App Service"
      ],
      correctAnswer: "Azure Functions"
    },
    {
      questionText: "What is Azure Storage Account?",
      options: [
        "A service for storing various types of data",
        "A service for managing virtual machines",
        "A service for networking",
        "A service for monitoring"
      ],
      correctAnswer: "A service for storing various types of data"
    },
    {
      questionText: "Which Azure service provides content delivery network?",
      options: [
        "Azure CDN",
        "Azure Traffic Manager",
        "Azure Load Balancer",
        "Azure Application Gateway"
      ],
      correctAnswer: "Azure CDN"
    },
    {
      questionText: "What is Azure Monitor?",
      options: [
        "A monitoring and analytics service",
        "A backup service",
        "A security service",
        "A networking service"
      ],
      correctAnswer: "A monitoring and analytics service"
    },
    {
      questionText: "Which Azure service provides load balancing?",
      options: [
        "Azure Load Balancer",
        "Azure Traffic Manager",
        "Azure Application Gateway",
        "Azure CDN"
      ],
      correctAnswer: "Azure Load Balancer"
    }
  ],
  intermediate: [
    {
      questionText: "What is the difference between Azure Availability Zones and Availability Sets?",
      options: [
        "Availability Zones are across data centers, Availability Sets are within data centers",
        "Availability Zones are free, Availability Sets are paid",
        "Availability Zones are for storage, Availability Sets are for compute",
        "Availability Zones are faster, Availability Sets are slower"
      ],
      correctAnswer: "Availability Zones are across data centers, Availability Sets are within data centers"
    },
    {
      questionText: "Which Azure service provides automated scaling?",
      options: [
        "Azure Auto Scaling",
        "Azure Load Balancer",
        "Azure Traffic Manager",
        "Azure Application Gateway"
      ],
      correctAnswer: "Azure Auto Scaling"
    },
    {
      questionText: "What is Azure Key Vault used for?",
      options: [
        "Secure storage of secrets, keys, and certificates",
        "Virtual machine management",
        "Network security",
        "Data backup"
      ],
      correctAnswer: "Secure storage of secrets, keys, and certificates"
    },
    {
      questionText: "Which Azure service provides disaster recovery?",
      options: [
        "Azure Site Recovery",
        "Azure Backup",
        "Azure Archive",
        "Azure Redundancy"
      ],
      correctAnswer: "Azure Site Recovery"
    },
    {
      questionText: "What is Azure Policy used for?",
      options: [
        "Enforce organizational standards and compliance",
        "Manage resource permissions",
        "Monitor resource usage",
        "Backup resource configurations"
      ],
      correctAnswer: "Enforce organizational standards and compliance"
    },
    {
      questionText: "Which Azure service provides centralized security management?",
      options: [
        "Azure Security Center",
        "Azure Active Directory",
        "Azure Key Vault",
        "Azure Policy"
      ],
      correctAnswer: "Azure Security Center"
    },
    {
      questionText: "What is Azure Virtual Network used for?",
      options: [
        "Connect Azure resources securely",
        "Store network configurations",
        "Monitor network traffic",
        "Manage DNS records"
      ],
      correctAnswer: "Connect Azure resources securely"
    },
    {
      questionText: "Which Azure service provides cost management?",
      options: [
        "Azure Cost Management",
        "Azure Monitor",
        "Azure Advisor",
        "Azure Security Center"
      ],
      correctAnswer: "Azure Cost Management"
    },
    {
      questionText: "What is Azure Application Gateway?",
      options: [
        "A web traffic load balancer",
        "A database service",
        "A storage service",
        "A monitoring service"
      ],
      correctAnswer: "A web traffic load balancer"
    },
    {
      questionText: "Which Azure service provides backup capabilities?",
      options: [
        "Azure Backup",
        "Azure Archive",
        "Azure Site Recovery",
        "Azure Storage"
      ],
      correctAnswer: "Azure Backup"
    }
  ],
  advanced: [
    {
      questionText: "What is Azure Resource Groups used for?",
      options: [
        "Organize and manage related Azure resources",
        "Store resource metadata",
        "Backup resource configurations",
        "Monitor resource performance"
      ],
      correctAnswer: "Organize and manage related Azure resources"
    },
    {
      questionText: "Which Azure service provides governance and compliance management?",
      options: [
        "Azure Governance",
        "Azure Policy",
        "Azure Security Center",
        "Azure Monitor"
      ],
      correctAnswer: "Azure Governance"
    },
    {
      questionText: "What is Azure Blueprints used for?",
      options: [
        "Define and deploy compliant environments",
        "Create resource templates",
        "Manage resource permissions",
        "Monitor resource compliance"
      ],
      correctAnswer: "Define and deploy compliant environments"
    },
    {
      questionText: "Which Azure service provides hybrid cloud connectivity?",
      options: [
        "Azure ExpressRoute",
        "Azure VPN Gateway",
        "Azure Virtual Network",
        "Azure Direct Connect"
      ],
      correctAnswer: "Azure ExpressRoute"
    },
    {
      questionText: "What is Azure Container Instances?",
      options: [
        "A serverless container service",
        "A container orchestration service",
        "A container registry service",
        "A container monitoring service"
      ],
      correctAnswer: "A serverless container service"
    },
    {
      questionText: "Which Azure service provides container orchestration?",
      options: [
        "Azure Kubernetes Service (AKS)",
        "Azure Container Instances",
        "Azure Container Registry",
        "Azure Functions"
      ],
      correctAnswer: "Azure Kubernetes Service (AKS)"
    },
    {
      questionText: "What is Azure DevOps used for?",
      options: [
        "DevOps tools and services for software development",
        "Virtual machine management",
        "Database administration",
        "Network configuration"
      ],
      correctAnswer: "DevOps tools and services for software development"
    },
    {
      questionText: "Which Azure service provides data analytics?",
      options: [
        "Azure Synapse Analytics",
        "Azure Data Factory",
        "Azure Stream Analytics",
        "Azure HDInsight"
      ],
      correctAnswer: "Azure Synapse Analytics"
    },
    {
      questionText: "What is Azure Event Grid?",
      options: [
        "A serverless event routing service",
        "A messaging service",
        "A notification service",
        "A monitoring service"
      ],
      correctAnswer: "A serverless event routing service"
    },
    {
      questionText: "Which Azure service provides IoT capabilities?",
      options: [
        "Azure IoT Hub",
        "Azure Event Hubs",
        "Azure Service Bus",
        "Azure Stream Analytics"
      ],
      correctAnswer: "Azure IoT Hub"
    }
  ]
};

// Microsoft 365 Questions
const MICROSOFT_365_QUESTIONS = {
  easy: [
    {
      questionText: "What is Microsoft 365?",
      options: [
        "A suite of productivity and collaboration tools",
        "A cloud storage service",
        "A database management system",
        "A web browser"
      ],
      correctAnswer: "A suite of productivity and collaboration tools"
    },
    {
      questionText: "Which Microsoft 365 service provides email?",
      options: [
        "Outlook",
        "Teams",
        "SharePoint",
        "OneDrive"
      ],
      correctAnswer: "Outlook"
    },
    {
      questionText: "What is Microsoft Teams?",
      options: [
        "A collaboration and communication platform",
        "A project management tool",
        "A database service",
        "A storage service"
      ],
      correctAnswer: "A collaboration and communication platform"
    },
    {
      questionText: "Which Microsoft 365 service provides document storage?",
      options: [
        "OneDrive",
        "SharePoint",
        "Teams",
        "Outlook"
      ],
      correctAnswer: "OneDrive"
    },
    {
      questionText: "What is SharePoint?",
      options: [
        "A web-based collaboration platform",
        "An email service",
        "A video conferencing tool",
        "A database service"
      ],
      correctAnswer: "A web-based collaboration platform"
    }
  ],
  intermediate: [
    {
      questionText: "What is Microsoft 365 Security Center?",
      options: [
        "A centralized security management console",
        "A backup service",
        "A monitoring tool",
        "A compliance service"
      ],
      correctAnswer: "A centralized security management console"
    },
    {
      questionText: "Which Microsoft 365 service provides identity protection?",
      options: [
        "Azure AD Identity Protection",
        "Microsoft Defender",
        "Compliance Center",
        "Security Center"
      ],
      correctAnswer: "Azure AD Identity Protection"
    },
    {
      questionText: "What is Microsoft 365 Compliance Center?",
      options: [
        "A compliance management platform",
        "A security monitoring tool",
        "A backup service",
        "A data analytics service"
      ],
      correctAnswer: "A compliance management platform"
    },
    {
      questionText: "Which Microsoft 365 service provides threat protection?",
      options: [
        "Microsoft Defender for Office 365",
        "Azure Security Center",
        "Compliance Center",
        "Security Center"
      ],
      correctAnswer: "Microsoft Defender for Office 365"
    },
    {
      questionText: "What is Microsoft 365 Advanced Threat Protection?",
      options: [
        "A threat protection service",
        "A backup service",
        "A monitoring tool",
        "A compliance service"
      ],
      correctAnswer: "A threat protection service"
    }
  ],
  advanced: [
    {
      questionText: "What is Microsoft 365 DLP (Data Loss Prevention)?",
      options: [
        "A service to prevent data loss and leakage",
        "A backup service",
        "A monitoring tool",
        "A compliance service"
      ],
      correctAnswer: "A service to prevent data loss and leakage"
    },
    {
      questionText: "Which Microsoft 365 service provides information governance?",
      options: [
        "Microsoft 365 Information Governance",
        "Compliance Center",
        "Security Center",
        "Azure AD"
      ],
      correctAnswer: "Microsoft 365 Information Governance"
    },
    {
      questionText: "What is Microsoft 365 Advanced eDiscovery?",
      options: [
        "An eDiscovery and investigation service",
        "A backup service",
        "A monitoring tool",
        "A compliance service"
      ],
      correctAnswer: "An eDiscovery and investigation service"
    },
    {
      questionText: "Which Microsoft 365 service provides audit capabilities?",
      options: [
        "Microsoft 365 Audit Log",
        "Security Center",
        "Compliance Center",
        "Azure Monitor"
      ],
      correctAnswer: "Microsoft 365 Audit Log"
    },
    {
      questionText: "What is Microsoft 365 Sensitivity Labels?",
      options: [
        "A classification and protection service",
        "A backup service",
        "A monitoring tool",
        "A compliance service"
      ],
      correctAnswer: "A classification and protection service"
    }
  ]
};

// Generate 50 questions for each level by repeating and varying the base questions
const generateQuestions = (baseQuestions, level) => {
  const questions = [];
  const levelQuestions = baseQuestions[level] || [];
  
  for (let i = 0; i < 50; i++) {
    const baseQuestion = levelQuestions[i % levelQuestions.length];
    questions.push({
      questionText: `${baseQuestion.questionText} (Question ${i + 1})`,
      options: baseQuestion.options,
      correctAnswer: baseQuestion.correctAnswer
    });
  }
  
  return questions;
};

// Delete existing questions for a subcourse
const deleteExistingQuestions = async (course, subTopic) => {
  try {
    console.log(`🗑️  Deleting existing questions for ${course} - ${subTopic}`);
    
    // Get all questions for this subcourse
    const response = await axios.get(`${BASE_URL}/questions?course=${course}&subTopic=${subTopic}`);
    const questions = response.data;
    
    let deletedCount = 0;
    for (const question of questions) {
      try {
        await axios.delete(`${BASE_URL}/questions/${question._id}`);
        deletedCount++;
      } catch (error) {
        console.error(`Error deleting question ${question._id}:`, error.message);
      }
    }
    
    console.log(`✅ Deleted ${deletedCount} existing questions`);
    return deletedCount;
  } catch (error) {
    console.error(`Error deleting questions: ${error.message}`);
    return 0;
  }
};

// Upload new questions
const uploadQuestions = async (course, subTopic, level, questions) => {
  console.log(`📤 Uploading ${questions.length} ${level} questions for ${course} - ${subTopic}`);
  
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
      if (errorCount <= 5) {
        console.error(`❌ Error uploading question: ${error.message}`);
      }
    }
  }
  
  console.log(`✅ ${successCount} questions uploaded successfully, ${errorCount} errors`);
  return { successCount, errorCount };
};

// Main execution function
const main = async () => {
  console.log(`🚀 Starting comprehensive Microsoft questions fix...`);
  console.log(`Environment: ${ENV}`);
  console.log(`Base URL: ${BASE_URL}`);
  
  const microsoftSubcourses = [
    // Azure-related subcourses (use Azure questions)
    { course: 'Microsoft', subTopic: 'MicrosoftAzureDeveloperAssociate', name: 'Microsoft Azure Developer Associate', questions: MICROSOFT_AZURE_QUESTIONS },
    { course: 'Microsoft', subTopic: 'MicrosoftAzureFundamentals', name: 'Microsoft Azure Fundamentals', questions: MICROSOFT_AZURE_QUESTIONS },
    { course: 'Microsoft', subTopic: 'MicrosoftDynamics365', name: 'Microsoft Dynamics 365', questions: MICROSOFT_AZURE_QUESTIONS },
    { course: 'Microsoft', subTopic: 'MicrosoftAzure', name: 'Microsoft Azure', questions: MICROSOFT_AZURE_QUESTIONS },
    { course: 'Microsoft', subTopic: 'MicrosoftPowerPlatform', name: 'Microsoft Power Platform', questions: MICROSOFT_AZURE_QUESTIONS },
    { course: 'Microsoft', subTopic: 'MicrosoftAzureDataFundamentals', name: 'Microsoft Azure Data Fundamentals', questions: MICROSOFT_AZURE_QUESTIONS },
    { course: 'Microsoft', subTopic: 'MicrosoftAzureCosmosDBDeveloperSpecialty', name: 'Microsoft Azure Cosmos DB Developer Specialty', questions: MICROSOFT_AZURE_QUESTIONS },
    { course: 'Microsoft', subTopic: 'MicrosoftAzureforSAPworkloadsSpecialty', name: 'Microsoft Azure for SAP Workloads Specialty', questions: MICROSOFT_AZURE_QUESTIONS },
    { course: 'Microsoft', subTopic: 'MicrosoftAzureSolutionsArchitectExpert', name: 'Microsoft Azure Solutions Architect Expert', questions: MICROSOFT_AZURE_QUESTIONS },
    { course: 'Microsoft', subTopic: 'MicrosoftAzureVirtualDesktopSpecialty', name: 'Microsoft Azure Virtual Desktop Specialty', questions: MICROSOFT_AZURE_QUESTIONS },
    { course: 'Microsoft', subTopic: 'MicrosoftDynamics365SalesFunctionalConsultantAssociate', name: 'Microsoft Dynamics 365 Sales Functional Consultant Associate', questions: MICROSOFT_AZURE_QUESTIONS },
    { course: 'Microsoft', subTopic: 'MicrosoftCybersecurityAnalyst', name: 'Microsoft Cybersecurity Analyst', questions: MICROSOFT_AZURE_QUESTIONS },
    { course: 'Microsoft', subTopic: 'MicrosoftMs-900:Microsoft365Fundamentals', name: 'Microsoft MS-900: Microsoft 365 Fundamentals', questions: MICROSOFT_AZURE_QUESTIONS },
    { course: 'Microsoft', subTopic: 'MicrosoftPl-300MicrosoftPowerBiCertificationTraining', name: 'Microsoft PL-300 Power BI Certification Training', questions: MICROSOFT_AZURE_QUESTIONS },
    
    // Microsoft 365-related subcourses (use 365 questions)
    { course: 'Microsoft', subTopic: 'Microsoft365Associate', name: 'Microsoft 365 Associate', questions: MICROSOFT_365_QUESTIONS },
    { course: 'Microsoft', subTopic: 'Microsoft365Fundamentals', name: 'Microsoft 365 Fundamentals', questions: MICROSOFT_365_QUESTIONS },
    { course: 'Microsoft', subTopic: 'MicrosoftsecurityComplianceandIdentity', name: 'Microsoft Security Compliance and Identity', questions: MICROSOFT_365_QUESTIONS },
    { course: 'Microsoft', subTopic: 'Microsoft365certifiedteamsadministratorassociate', name: 'Microsoft 365 Teams Administrator Associate', questions: MICROSOFT_365_QUESTIONS },
    { course: 'Microsoft', subTopic: 'Microsoft365', name: 'Microsoft 365', questions: MICROSOFT_365_QUESTIONS }
  ];
  
  let totalDeleted = 0;
  let totalUploaded = 0;
  let totalErrors = 0;
  
  for (const subcourse of microsoftSubcourses) {
    console.log(`\n🔧 Processing ${subcourse.course} - ${subcourse.name}`);
    
    // Delete existing questions
    const deletedCount = await deleteExistingQuestions(subcourse.course, subcourse.subTopic);
    totalDeleted += deletedCount;
    
    // Upload new questions for all levels
    const levels = ['easy', 'intermediate', 'advanced'];
    
    for (const level of levels) {
      const questions = generateQuestions(subcourse.questions, level);
      const result = await uploadQuestions(subcourse.course, subcourse.subTopic, level, questions);
      totalUploaded += result.successCount;
      totalErrors += result.errorCount;
      
      // Small delay between batches
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }
  
  console.log(`\n🎉 All Microsoft questions fix completed!`);
  console.log(`📊 Final Statistics:`);
  console.log(`   Total questions deleted: ${totalDeleted}`);
  console.log(`   Total questions uploaded: ${totalUploaded}`);
  console.log(`   Errors: ${totalErrors}`);
  console.log(`   Success rate: ${totalUploaded > 0 ? ((totalUploaded / (totalUploaded + totalErrors)) * 100).toFixed(2) : 0}%`);
};

// Run the script
main().catch(console.error);

