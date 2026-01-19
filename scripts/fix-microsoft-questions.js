/*
  Fix Microsoft Questions Script
  This script will replace all generic Microsoft questions with proper, exam-relevant content
*/

import axios from 'axios';

const ENV = (process.argv[2] || 'local').toLowerCase();
const BASE_URL = ENV === 'prod'
  ? 'https://traincape-backend-1.onrender.com'
  : 'http://localhost:8080';

// Microsoft Azure AI Fundamentals Questions
const MICROSOFT_AI_FUNDAMENTALS_QUESTIONS = {
  easy: [
    {
      questionText: "What is Azure AI Fundamentals primarily focused on?",
      options: [
        "Basic understanding of AI concepts and Azure AI services",
        "Advanced machine learning algorithms",
        "Cloud infrastructure management",
        "Database administration"
      ],
      correctAnswer: "Basic understanding of AI concepts and Azure AI services"
    },
    {
      questionText: "Which Azure service provides pre-built AI models for common tasks?",
      options: [
        "Azure Cognitive Services",
        "Azure Machine Learning",
        "Azure Data Factory",
        "Azure Functions"
      ],
      correctAnswer: "Azure Cognitive Services"
    },
    {
      questionText: "What is the primary purpose of Azure Machine Learning?",
      options: [
        "Build, train, and deploy machine learning models",
        "Store application data",
        "Manage virtual machines",
        "Handle network security"
      ],
      correctAnswer: "Build, train, and deploy machine learning models"
    },
    {
      questionText: "Which Azure service is used for natural language processing?",
      options: [
        "Azure Language Service",
        "Azure Storage",
        "Azure Virtual Network",
        "Azure Active Directory"
      ],
      correctAnswer: "Azure Language Service"
    },
    {
      questionText: "What is Azure Computer Vision used for?",
      options: [
        "Analyze images and extract information",
        "Store image files",
        "Manage computer hardware",
        "Process text documents"
      ],
      correctAnswer: "Analyze images and extract information"
    }
  ],
  intermediate: [
    {
      questionText: "Which Azure service provides conversational AI capabilities?",
      options: [
        "Azure Bot Service",
        "Azure Logic Apps",
        "Azure Event Grid",
        "Azure Service Bus"
      ],
      correctAnswer: "Azure Bot Service"
    },
    {
      questionText: "What is the purpose of Azure Form Recognizer?",
      options: [
        "Extract text and data from documents",
        "Create web forms",
        "Manage user authentication",
        "Store form templates"
      ],
      correctAnswer: "Extract text and data from documents"
    },
    {
      questionText: "Which Azure service is used for speech-to-text conversion?",
      options: [
        "Azure Speech Service",
        "Azure Media Services",
        "Azure Stream Analytics",
        "Azure Event Hubs"
      ],
      correctAnswer: "Azure Speech Service"
    },
    {
      questionText: "What is Azure Personalizer used for?",
      options: [
        "Deliver personalized experiences to users",
        "Manage user profiles",
        "Store personal data",
        "Handle user authentication"
      ],
      correctAnswer: "Deliver personalized experiences to users"
    },
    {
      questionText: "Which Azure service provides text analytics capabilities?",
      options: [
        "Azure Text Analytics",
        "Azure Search",
        "Azure Database",
        "Azure Storage"
      ],
      correctAnswer: "Azure Text Analytics"
    }
  ],
  advanced: [
    {
      questionText: "What is the difference between Azure Machine Learning Designer and Azure Machine Learning Studio?",
      options: [
        "Designer is visual interface, Studio is code-based",
        "Designer is for beginners, Studio is for experts",
        "Designer is free, Studio is paid",
        "Designer is cloud-based, Studio is on-premises"
      ],
      correctAnswer: "Designer is visual interface, Studio is code-based"
    },
    {
      questionText: "Which Azure service provides automated machine learning capabilities?",
      options: [
        "Azure AutoML",
        "Azure Data Factory",
        "Azure Logic Apps",
        "Azure Functions"
      ],
      correctAnswer: "Azure AutoML"
    },
    {
      questionText: "What is Azure Cognitive Search primarily used for?",
      options: [
        "Build intelligent search experiences",
        "Store search data",
        "Manage search algorithms",
        "Process search requests"
      ],
      correctAnswer: "Build intelligent search experiences"
    },
    {
      questionText: "Which Azure service provides anomaly detection capabilities?",
      options: [
        "Azure Anomaly Detector",
        "Azure Monitor",
        "Azure Security Center",
        "Azure Sentinel"
      ],
      correctAnswer: "Azure Anomaly Detector"
    },
    {
      questionText: "What is Azure Content Moderator used for?",
      options: [
        "Moderate content for inappropriate material",
        "Manage content storage",
        "Organize content libraries",
        "Track content usage"
      ],
      correctAnswer: "Moderate content for inappropriate material"
    }
  ]
};

// Microsoft Azure Administrator Questions
const MICROSOFT_AZURE_ADMIN_QUESTIONS = {
  easy: [
    {
      questionText: "What is Azure Resource Manager used for?",
      options: [
        "Deploy and manage Azure resources",
        "Monitor resource usage",
        "Backup resources",
        "Secure resources"
      ],
      correctAnswer: "Deploy and manage Azure resources"
    },
    {
      questionText: "Which Azure service provides identity and access management?",
      options: [
        "Azure Active Directory",
        "Azure Security Center",
        "Azure Key Vault",
        "Azure Policy"
      ],
      correctAnswer: "Azure Active Directory"
    },
    {
      questionText: "What is the purpose of Azure Virtual Networks?",
      options: [
        "Connect Azure resources securely",
        "Store network configurations",
        "Monitor network traffic",
        "Manage DNS records"
      ],
      correctAnswer: "Connect Azure resources securely"
    },
    {
      questionText: "Which Azure service provides managed storage for files and blobs?",
      options: [
        "Azure Storage Account",
        "Azure Database",
        "Azure Backup",
        "Azure Archive"
      ],
      correctAnswer: "Azure Storage Account"
    },
    {
      questionText: "What is Azure Monitor used for?",
      options: [
        "Collect and analyze telemetry data",
        "Store monitoring data",
        "Manage monitoring rules",
        "Configure monitoring alerts"
      ],
      correctAnswer: "Collect and analyze telemetry data"
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
      questionText: "What is Azure Backup used for?",
      options: [
        "Backup and restore Azure resources",
        "Store backup data",
        "Manage backup policies",
        "Schedule backup jobs"
      ],
      correctAnswer: "Backup and restore Azure resources"
    },
    {
      questionText: "Which Azure service provides automated scaling capabilities?",
      options: [
        "Azure Auto Scaling",
        "Azure Load Balancer",
        "Azure Traffic Manager",
        "Azure Application Gateway"
      ],
      correctAnswer: "Azure Auto Scaling"
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
    }
  ],
  advanced: [
    {
      questionText: "What is the purpose of Azure Resource Groups?",
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
      questionText: "What is Azure Cost Management used for?",
      options: [
        "Monitor and optimize Azure spending",
        "Manage Azure subscriptions",
        "Track resource usage",
        "Generate billing reports"
      ],
      correctAnswer: "Monitor and optimize Azure spending"
    },
    {
      questionText: "Which Azure service provides disaster recovery capabilities?",
      options: [
        "Azure Site Recovery",
        "Azure Backup",
        "Azure Archive",
        "Azure Redundancy"
      ],
      correctAnswer: "Azure Site Recovery"
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
    }
  ]
};

// Microsoft Power BI Questions
const MICROSOFT_POWER_BI_QUESTIONS = {
  easy: [
    {
      questionText: "What is Power BI primarily used for?",
      options: [
        "Business intelligence and data visualization",
        "Database management",
        "Web development",
        "Network administration"
      ],
      correctAnswer: "Business intelligence and data visualization"
    },
    {
      questionText: "Which Power BI component is used to create visualizations?",
      options: [
        "Power BI Desktop",
        "Power BI Service",
        "Power BI Mobile",
        "Power BI Gateway"
      ],
      correctAnswer: "Power BI Desktop"
    },
    {
      questionText: "What is a Power BI Dataset?",
      options: [
        "A collection of data that can be used for analysis",
        "A visualization component",
        "A report template",
        "A dashboard layout"
      ],
      correctAnswer: "A collection of data that can be used for analysis"
    },
    {
      questionText: "Which Power BI feature allows users to explore data interactively?",
      options: [
        "Q&A (Question and Answer)",
        "Filters",
        "Drill-through",
        "Cross-filtering"
      ],
      correctAnswer: "Q&A (Question and Answer)"
    },
    {
      questionText: "What is Power BI Service?",
      options: [
        "Cloud-based platform for sharing and collaborating on reports",
        "Desktop application for creating reports",
        "Mobile app for viewing reports",
        "Gateway for connecting to data sources"
      ],
      correctAnswer: "Cloud-based platform for sharing and collaborating on reports"
    }
  ],
  intermediate: [
    {
      questionText: "What is DAX in Power BI?",
      options: [
        "Data Analysis Expressions - a formula language",
        "Data Access eXtensions - a connectivity tool",
        "Data Analytics XML - a markup language",
        "Data Architecture eXchange - a data format"
      ],
      correctAnswer: "Data Analysis Expressions - a formula language"
    },
    {
      questionText: "Which Power BI feature allows real-time data streaming?",
      options: [
        "Power BI Streaming Datasets",
        "Power BI Live Connection",
        "Power BI DirectQuery",
        "Power BI Import"
      ],
      correctAnswer: "Power BI Streaming Datasets"
    },
    {
      questionText: "What is Power BI Gateway used for?",
      options: [
        "Connect on-premises data sources to Power BI",
        "Secure Power BI reports",
        "Optimize Power BI performance",
        "Manage Power BI licenses"
      ],
      correctAnswer: "Connect on-premises data sources to Power BI"
    },
    {
      questionText: "Which Power BI feature allows embedding reports in other applications?",
      options: [
        "Power BI Embedded",
        "Power BI Web Embed",
        "Power BI API",
        "Power BI SDK"
      ],
      correctAnswer: "Power BI Embedded"
    },
    {
      questionText: "What is Power BI Premium?",
      options: [
        "Advanced Power BI features and capabilities",
        "Power BI for mobile devices",
        "Power BI for developers",
        "Power BI for enterprise users"
      ],
      correctAnswer: "Advanced Power BI features and capabilities"
    }
  ],
  advanced: [
    {
      questionText: "What is the difference between Power BI Pro and Power BI Premium?",
      options: [
        "Premium includes advanced features, larger datasets, and dedicated capacity",
        "Pro is for individuals, Premium is for organizations",
        "Pro is cloud-based, Premium is on-premises",
        "Pro is free, Premium is paid"
      ],
      correctAnswer: "Premium includes advanced features, larger datasets, and dedicated capacity"
    },
    {
      questionText: "Which Power BI feature provides advanced analytics capabilities?",
      options: [
        "Power BI Advanced Analytics",
        "Power BI AI Insights",
        "Power BI Machine Learning",
        "Power BI Cognitive Services"
      ],
      correctAnswer: "Power BI AI Insights"
    },
    {
      questionText: "What is Power BI Row-Level Security (RLS)?",
      options: [
        "Restrict data access based on user roles",
        "Optimize query performance",
        "Manage data refresh schedules",
        "Control report sharing permissions"
      ],
      correctAnswer: "Restrict data access based on user roles"
    },
    {
      questionText: "Which Power BI feature allows creating custom visuals?",
      options: [
        "Power BI Custom Visuals",
        "Power BI SDK",
        "Power BI Developer Tools",
        "Power BI Visual Studio"
      ],
      correctAnswer: "Power BI Custom Visuals"
    },
    {
      questionText: "What is Power BI Composite Models?",
      options: [
        "Combine multiple data sources in a single model",
        "Create complex data relationships",
        "Merge multiple reports",
        "Combine different visualization types"
      ],
      correctAnswer: "Combine multiple data sources in a single model"
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
  console.log(`🚀 Starting Microsoft questions fix...`);
  console.log(`Environment: ${ENV}`);
  console.log(`Base URL: ${BASE_URL}`);
  
  const microsoftSubcourses = [
    { course: 'Microsoft', subTopic: 'MicrosoftAzureAIFundamentals', name: 'Microsoft Azure AI Fundamentals', questions: MICROSOFT_AI_FUNDAMENTALS_QUESTIONS },
    { course: 'Microsoft', subTopic: 'MicrosoftAzureAdministrator', name: 'Microsoft Azure Administrator', questions: MICROSOFT_AZURE_ADMIN_QUESTIONS },
    { course: 'Microsoft', subTopic: 'MicrosoftPowerbi', name: 'Microsoft Power BI', questions: MICROSOFT_POWER_BI_QUESTIONS }
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
  
  console.log(`\n🎉 Microsoft questions fix completed!`);
  console.log(`📊 Final Statistics:`);
  console.log(`   Total questions deleted: ${totalDeleted}`);
  console.log(`   Total questions uploaded: ${totalUploaded}`);
  console.log(`   Errors: ${totalErrors}`);
  console.log(`   Success rate: ${totalUploaded > 0 ? ((totalUploaded / (totalUploaded + totalErrors)) * 100).toFixed(2) : 0}%`);
};

// Run the script
main().catch(console.error);

