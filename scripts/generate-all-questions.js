/*
  Comprehensive script to generate and upload questions for all courses and subcourses
  This script will create 50 questions for each level (Easy, Intermediate, Advanced) 
  for all major subcourses across AWS, Microsoft, CompTIA, Cisco, and PECB
*/

import axios from 'axios';
import mongoose from 'mongoose';
import { QuestionModel } from '../model/question.model.js';

const ENV = (process.argv[2] || 'local').toLowerCase();
const BASE_URL = ENV === 'prod'
  ? 'https://traincape-backend-1.onrender.com'
  : 'http://localhost:8080';

// AWS Subcourses
const AWS_SUBCOURSES = [
  { name: "AWS Certified Security", value: "AWSCertifiedSecurity" },
  { name: "AWS Certified SysOps Administrator", value: "AWSCertifiedSysOpsAdministrator" },
  { name: "AWS Certified Developer", value: "AWSCertifiedDeveloper" },
  { name: "AWS Certified DevOps", value: "AWSCertifiedDevOps" },
  { name: "AWS Certified Machine Learning", value: "AWSCertifiedMachineLearning" },
  { name: "AWS Certified Data Analytics", value: "AWSCertifiedDataAnalytics" },
  { name: "AWS Certified cloud practitioner", value: "AWSCertifiedcloudpractitioner" },
  { name: "AWS Certified Solutions Architect", value: "AWSCertifiedSolutionsArchitect" },
  { name: "AWS Certified Advanced Networking", value: "AWSCertifiedAdvancedNetworking" }
];

// Microsoft Subcourses
const MICROSOFT_SUBCOURSES = [
  { name: "Microsoft Azure Administrator", value: "MicrosoftAzureAdministrator" },
  { name: "Microsoft Azure AI Fundamentals", value: "MicrosoftAzureAIFundamentals" },
  { name: "Microsoft Azure Developer Associate", value: "MicrosoftAzureDeveloperAssociate" },
  { name: "Microsoft Azure Fundamentals", value: "MicrosoftAzureFundamentals" },
  { name: "Microsoft Dynamics 365", value: "MicrosoftDynamics365" },
  { name: "Microsoft Azure", value: "MicrosoftAzure" },
  { name: "Microsoft 365 Associate", value: "Microsoft365Associate" },
  { name: "Microsoft 365 Fundamentals", value: "Microsoft365Fundamentals" },
  { name: "Microsoft security, compliance and Identity", value: "MicrosoftsecurityComplianceandIdentity" },
  { name: "Microsoft Power Platform", value: "MicrosoftPowerPlatform" },
  { name: "Microsoft Azure Data Fundamentals", value: "MicrosoftAzureDataFundamentals" },
  { name: "Microsoft 365 certified teams administrator associate", value: "Microsoft365certifiedteamsadministratorassociate" },
  { name: "Microsoft Power bi", value: "MicrosoftPowerbi" },
  { name: "Microsoft Azure Cosmos DB Developer Specialty", value: "MicrosoftAzureCosmosDBDeveloperSpecialty" },
  { name: "Microsoft Azure for SAP workloads Specialty", value: "MicrosoftAzureforSAPworkloadsSpecialty" },
  { name: "Microsoft Azure Solutions Architect Expert", value: "MicrosoftAzureSolutionsArchitectExpert" },
  { name: "Microsoft Azure Virtual Desktop Specialty", value: "MicrosoftAzureVirtualDesktopSpecialty" },
  { name: "Microsoft Dynamics 365 Sales Functional Consultant Associate", value: "MicrosoftDynamics365SalesFunctionalConsultantAssociate" },
  { name: "Microsoft 365", value: "Microsoft365" },
  { name: "Microsoft Cybersecurity Analyst", value: "MicrosoftCybersecurityAnalyst" },
  { name: "Microsoft Ms-900: Microsoft 365 Fundamentals", value: "MicrosoftMs-900:Microsoft365Fundamentals" },
  { name: "Microsoft Pl-300 Microsoft Power Bi Certification Training", value: "MicrosoftPl-300MicrosoftPowerBiCertificationTraining" }
];

// CompTIA Subcourses
const COMPTIA_SUBCOURSES = [
  { name: "CompTIA A+", value: "CompTIAA+" },
  { name: "CompTIA Network+ N10-008", value: "CompTIANetwork+N10-008" },
  { name: "CompTIA Network+ N10-007", value: "CompTIANetwork+N10-007" },
  { name: "CompTIA Security+ SY0-701", value: "CompTIASecurity+701" },
  { name: "CompTIA Advanced Security", value: "CompTIAAdvancedSecurity" },
  { name: "CompTIA Cybersecurity Analyst", value: "CompTIACybersecurityAnalyst" },
  { name: "CompTIA Cloud Essentials+", value: "CompTIACloudEssentials+" },
  { name: "CompTIA Data+", value: "CompTIAData+" },
  { name: "CompTIA Server+", value: "CompTIAServer+" },
  { name: "CompTIA Cloud+", value: "CompTIACloud+" },
  { name: "CompTIA PenTest+", value: "CompTIAPenTest" },
  { name: "CompTIA Project+ PK0-004", value: "CompTIAProject+004" },
  { name: "CompTIA Project+ PK0-005", value: "CompTIAProject+005" },
  { name: "CompTIA Linux+", value: "CompTIALinux+" },
  { name: "CompTIA Security+ SY0-601", value: "CompTIASecurity+601" }
];

// Cisco Subcourses
const CISCO_SUBCOURSES = [
  { name: "Cisco Certified Support Technician (CCST)", value: "CiscoCertifiedSupportTechnician(CCST)" },
  { name: "CCST Cybersecurity", value: "CCSTCybersecurity" },
  { name: "CCST Networking", value: "CCSTNetworking" },
  { name: "Cisco Certified Technician (CCT)", value: "CiscoCertifiedTechnician(CCT)" },
  { name: "CCT Routing & Switching (Exam: 100-490 RSTECH)", value: "CCTRouting&Switching(Exam: 100-490 RSTECH)" },
  { name: "CCT Data Center (Exam: 010-151 DCTECH)", value: "CCTDataCenter(Exam: 010-151 DCTECH)" },
  { name: "Cisco Certified Network Associate (CCNA)", value: "CiscoCertifiedNetworkAssociate(CCNA)" },
  { name: "Cisco Certified CyberOps Associate", value: "CiscoCertifiedCyberOpsAssociate" },
  { name: "CCNP Enterprise", value: "CCNPEnterprise" },
  { name: "CCNP Security", value: "CCNPSecurity" },
  { name: "CCNP Data Center", value: "CCNPDataCenter" },
  { name: "CCNP Service Provider", value: "CCNPServiceProvider" },
  { name: "CCNP Collaboration", value: "CCNPCollaboration" },
  { name: "CCNP DevNet (Developer)", value: "CCNPDevNet(Developer)" },
  { name: "CCIE Enterprise Infrastructure", value: "CCIEEnterpriseInfrastructure" },
  { name: "CCIE Enterprise Wireless", value: "CCIEEnterpriseWireless" },
  { name: "CCIE Security", value: "CCIESecurity" },
  { name: "CCIE Data Center", value: "CCIEDataCenter" },
  { name: "CCIE Service Provider", value: "CCIEServiceProvider" },
  { name: "CCIE Collaboration", value: "CCIECollaboration" }
];

// PECB Subcourses (excluding those that already have questions)
const PECB_SUBCOURSES = [
  { name: "PECB Computer Forensics", value: "PECBComputerForensics" },
  { name: "PECBCybersecurity Audit Training", value: "PECBCybersecurityAuditTraining" },
  { name: "PECB ISO 9001 Lead Implementer", value: "PECBISO9001LeadImplementer" },
  { name: "PECB ISO 22301", value: "PECBISO22301" },
  { name: "PECB ISO 31000 Risk Manager", value: "PECBISO31000RiskManager" },
  { name: "PECB ISO 37001", value: "PECBISO37001" },
  { name: "PECB ISO 45001", value: "PECBISO45001" },
  { name: "PECB ISO IEC 27001 Lead Implementer", value: "PECBISOIEC27001LeadImplementer" },
  { name: "PECB ISO IEC 27001", value: "PECBISOIEC27001" },
  { name: "PECB ISO IEC 27005 Risk Manager", value: "PECBISOIEC27005RiskManager" },
  { name: "PECB ISO IEC 27032 Cyber Security", value: "PECBISOIEC27032CyberSecurity" },
  { name: "PECB Certified ISO 27001 Foundation", value: "PECBCertifiedISO27001Foundation" },
  { name: "SCADA Security Manager", value: "SCADASecurityManager" }
];

// Question generators for different difficulty levels
const generateEasyQuestions = (topic, subTopic) => {
  const questions = [];
  const topics = {
    'AWS': {
      'AWSCertifiedSecurity': [
        "What is AWS IAM?",
        "What is the purpose of AWS Security Groups?",
        "What is AWS CloudTrail used for?",
        "What is the difference between public and private subnets?",
        "What is AWS KMS?",
        "What is AWS WAF?",
        "What is AWS Shield?",
        "What is the principle of least privilege?",
        "What is multi-factor authentication?",
        "What is AWS Config?",
        "What is AWS GuardDuty?",
        "What is AWS Secrets Manager?",
        "What is AWS Certificate Manager?",
        "What is AWS Inspector?",
        "What is AWS Macie?",
        "What is AWS Security Hub?",
        "What is AWS CloudWatch?",
        "What is AWS Systems Manager?",
        "What is AWS Key Management Service?",
        "What is AWS Directory Service?",
        "What is AWS Single Sign-On?",
        "What is AWS Cognito?",
        "What is AWS Artifact?",
        "What is AWS Trusted Advisor?",
        "What is AWS Well-Architected Framework?",
        "What is AWS CloudFormation?",
        "What is AWS Elastic Beanstalk?",
        "What is AWS Lambda?",
        "What is AWS API Gateway?",
        "What is AWS Route 53?",
        "What is AWS CloudFront?",
        "What is AWS S3?",
        "What is AWS EC2?",
        "What is AWS RDS?",
        "What is AWS VPC?",
        "What is AWS ELB?",
        "What is AWS Auto Scaling?",
        "What is AWS EBS?",
        "What is AWS EFS?",
        "What is AWS Glacier?",
        "What is AWS SNS?",
        "What is AWS SQS?",
        "What is AWS SES?",
        "What is AWS DynamoDB?",
        "What is AWS ElastiCache?",
        "What is AWS Redshift?",
        "What is AWS EMR?",
        "What is AWS Kinesis?",
        "What is AWS Athena?"
      ]
    },
    'Microsoft': {
      'MicrosoftAzureAdministrator': [
        "What is Azure Active Directory?",
        "What is Azure Resource Manager?",
        "What is Azure Virtual Network?",
        "What is Azure Storage Account?",
        "What is Azure Virtual Machine?",
        "What is Azure App Service?",
        "What is Azure Functions?",
        "What is Azure Logic Apps?",
        "What is Azure Key Vault?",
        "What is Azure Monitor?",
        "What is Azure Security Center?",
        "What is Azure Policy?",
        "What is Azure RBAC?",
        "What is Azure Cost Management?",
        "What is Azure Backup?",
        "What is Azure Site Recovery?",
        "What is Azure Load Balancer?",
        "What is Azure Application Gateway?",
        "What is Azure CDN?",
        "What is Azure DNS?",
        "What is Azure Traffic Manager?",
        "What is Azure ExpressRoute?",
        "What is Azure VPN Gateway?",
        "What is Azure Firewall?",
        "What is Azure DDoS Protection?",
        "What is Azure Web Application Firewall?",
        "What is Azure Database for MySQL?",
        "What is Azure Database for PostgreSQL?",
        "What is Azure SQL Database?",
        "What is Azure Cosmos DB?",
        "What is Azure Redis Cache?",
        "What is Azure Service Bus?",
        "What is Azure Event Hubs?",
        "What is Azure Stream Analytics?",
        "What is Azure Data Factory?",
        "What is Azure Synapse Analytics?",
        "What is Azure HDInsight?",
        "What is Azure Databricks?",
        "What is Azure Machine Learning?",
        "What is Azure Cognitive Services?",
        "What is Azure Bot Service?",
        "What is Azure IoT Hub?",
        "What is Azure IoT Central?",
        "What is Azure Time Series Insights?",
        "What is Azure Digital Twins?",
        "What is Azure Maps?",
        "What is Azure Communication Services?",
        "What is Azure Media Services?",
        "What is Azure Content Delivery Network?",
        "What is Azure Front Door?"
      ]
    },
    'CompTIA': {
      'CompTIASecurity+701': [
        "What is a firewall?",
        "What is encryption?",
        "What is a virus?",
        "What is malware?",
        "What is phishing?",
        "What is social engineering?",
        "What is a vulnerability?",
        "What is a threat?",
        "What is risk?",
        "What is a security policy?",
        "What is access control?",
        "What is authentication?",
        "What is authorization?",
        "What is accounting?",
        "What is multifactor authentication?",
        "What is single sign-on?",
        "What is a password policy?",
        "What is network segmentation?",
        "What is a DMZ?",
        "What is a VPN?",
        "What is SSL/TLS?",
        "What is HTTPS?",
        "What is a certificate?",
        "What is PKI?",
        "What is hashing?",
        "What is digital signature?",
        "What is non-repudiation?",
        "What is integrity?",
        "What is confidentiality?",
        "What is availability?",
        "What is the CIA triad?",
        "What is a security incident?",
        "What is incident response?",
        "What is forensics?",
        "What is logging?",
        "What is monitoring?",
        "What is intrusion detection?",
        "What is intrusion prevention?",
        "What is a honeypot?",
        "What is penetration testing?",
        "What is vulnerability assessment?",
        "What is security awareness?",
        "What is security training?",
        "What is a security audit?",
        "What is compliance?",
        "What is governance?",
        "What is risk management?",
        "What is business continuity?",
        "What is disaster recovery?",
        "What is backup?"
      ]
    },
    'Cisco': {
      'CiscoCertifiedNetworkAssociate(CCNA)': [
        "What is a router?",
        "What is a switch?",
        "What is a hub?",
        "What is a network?",
        "What is an IP address?",
        "What is a subnet mask?",
        "What is a gateway?",
        "What is DNS?",
        "What is DHCP?",
        "What is NAT?",
        "What is VLAN?",
        "What is trunking?",
        "What is STP?",
        "What is RSTP?",
        "What is EtherChannel?",
        "What is OSPF?",
        "What is EIGRP?",
        "What is BGP?",
        "What is RIP?",
        "What is static routing?",
        "What is dynamic routing?",
        "What is ACL?",
        "What is QoS?",
        "What is PoE?",
        "What is CDP?",
        "What is LLDP?",
        "What is SNMP?",
        "What is Syslog?",
        "What is NTP?",
        "What is TFTP?",
        "What is FTP?",
        "What is SSH?",
        "What is Telnet?",
        "What is HTTP?",
        "What is HTTPS?",
        "What is TCP?",
        "What is UDP?",
        "What is ICMP?",
        "What is ARP?",
        "What is MAC address?",
        "What is Ethernet?",
        "What is Fast Ethernet?",
        "What is Gigabit Ethernet?",
        "What is 10 Gigabit Ethernet?",
        "What is fiber optic?",
        "What is copper cable?",
        "What is wireless?",
        "What is Wi-Fi?",
        "What is Bluetooth?",
        "What is cellular?"
      ]
    },
    'PECB': {
      'PECBISO27001': [
        "What is ISO 27001?",
        "What is information security?",
        "What is a risk?",
        "What is a threat?",
        "What is a vulnerability?",
        "What is an asset?",
        "What is confidentiality?",
        "What is integrity?",
        "What is availability?",
        "What is the CIA triad?",
        "What is an ISMS?",
        "What is a security policy?",
        "What is risk assessment?",
        "What is risk treatment?",
        "What is a control?",
        "What is monitoring?",
        "What is measurement?",
        "What is an audit?",
        "What is non-conformity?",
        "What is corrective action?",
        "What is preventive action?",
        "What is management review?",
        "What is continual improvement?",
        "What is documentation?",
        "What is a procedure?",
        "What is a record?",
        "What is training?",
        "What is awareness?",
        "What is competence?",
        "What is responsibility?",
        "What is authority?",
        "What is communication?",
        "What is reporting?",
        "What is incident management?",
        "What is business continuity?",
        "What is disaster recovery?",
        "What is backup?",
        "What is access control?",
        "What is authentication?",
        "What is authorization?",
        "What is accounting?",
        "What is encryption?",
        "What is cryptography?",
        "What is a key?",
        "What is a certificate?",
        "What is PKI?",
        "What is digital signature?",
        "What is hashing?",
        "What is malware?",
        "What is a firewall?"
      ]
    }
  };

  const topicQuestions = topics[topic]?.[subTopic] || [];
  
  for (let i = 0; i < 50; i++) {
    const questionText = topicQuestions[i] || `${topic} ${subTopic} Question ${i + 1}`;
    const options = [
      `Option A for ${questionText}`,
      `Option B for ${questionText}`,
      `Option C for ${questionText}`,
      `Option D for ${questionText}`
    ];
    
    questions.push({
      questionText,
      options,
      correctAnswer: options[0]
    });
  }
  
  return questions;
};

const generateIntermediateQuestions = (topic, subTopic) => {
  const questions = [];
  
  for (let i = 0; i < 50; i++) {
    const questionText = `${topic} ${subTopic} Intermediate Question ${i + 1}`;
    const options = [
      `Intermediate Option A for ${questionText}`,
      `Intermediate Option B for ${questionText}`,
      `Intermediate Option C for ${questionText}`,
      `Intermediate Option D for ${questionText}`
    ];
    
    questions.push({
      questionText,
      options,
      correctAnswer: options[1]
    });
  }
  
  return questions;
};

const generateAdvancedQuestions = (topic, subTopic) => {
  const questions = [];
  
  for (let i = 0; i < 50; i++) {
    const questionText = `${topic} ${subTopic} Advanced Question ${i + 1}`;
    const options = [
      `Advanced Option A for ${questionText}`,
      `Advanced Option B for ${questionText}`,
      `Advanced Option C for ${questionText}`,
      `Advanced Option D for ${questionText}`
    ];
    
    questions.push({
      questionText,
      options,
      correctAnswer: options[2]
    });
  }
  
  return questions;
};

// Function to upload questions for a specific course and subcourse
const uploadQuestions = async (course, subTopic, level, questions) => {
  console.log(`\nUploading ${questions.length} ${level} questions for ${course} - ${subTopic}`);
  
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
      console.error(`Error uploading question: ${error.message}`);
    }
  }
  
  console.log(`✅ Uploaded ${successCount} questions successfully, ${errorCount} errors`);
  return { successCount, errorCount };
};

// Main function to process all courses
const main = async () => {
  console.log(`🚀 Starting comprehensive question generation for all courses...`);
  console.log(`Environment: ${ENV}`);
  console.log(`Base URL: ${BASE_URL}`);
  
  const allCourses = [
    { name: 'AWS', subcourses: AWS_SUBCOURSES },
    { name: 'Microsoft', subcourses: MICROSOFT_SUBCOURSES },
    { name: 'CompTIA', subcourses: COMPTIA_SUBCOURSES },
    { name: 'Cisco', subcourses: CISCO_SUBCOURSES },
    { name: 'PECB', subcourses: PECB_SUBCOURSES }
  ];
  
  let totalQuestions = 0;
  let totalSuccess = 0;
  let totalErrors = 0;
  
  for (const course of allCourses) {
    console.log(`\n📚 Processing ${course.name} course with ${course.subcourses.length} subcourses...`);
    
    for (const subcourse of course.subcourses) {
      console.log(`\n🔧 Processing ${course.name} - ${subcourse.name}`);
      
      // Generate questions for all three levels
      const levels = ['easy', 'intermediate', 'advanced'];
      
      for (const level of levels) {
        const questions = level === 'easy' 
          ? generateEasyQuestions(course.name, subcourse.value)
          : level === 'intermediate'
          ? generateIntermediateQuestions(course.name, subcourse.value)
          : generateAdvancedQuestions(course.name, subcourse.value);
        
        const result = await uploadQuestions(course.name, subcourse.value, level, questions);
        totalSuccess += result.successCount;
        totalErrors += result.errorCount;
        totalQuestions += questions.length;
        
        // Small delay between batches to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
  }
  
  console.log(`\n🎉 Question generation completed!`);
  console.log(`📊 Total Statistics:`);
  console.log(`   Total questions processed: ${totalQuestions}`);
  console.log(`   Successfully uploaded: ${totalSuccess}`);
  console.log(`   Errors: ${totalErrors}`);
  console.log(`   Success rate: ${((totalSuccess / totalQuestions) * 100).toFixed(2)}%`);
};

// Run the script
main().catch(console.error);
