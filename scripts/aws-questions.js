/*
  AWS Certification Questions Generator
  Generates realistic exam questions for AWS certifications
*/

export const AWS_SECURITY_QUESTIONS = {
  easy: [
    {
      questionText: "What is AWS IAM primarily used for?",
      options: [
        "Identity and Access Management",
        "Internet Application Management", 
        "Integrated Asset Management",
        "Intelligent Automation Manager"
      ],
      correctAnswer: "Identity and Access Management"
    },
    {
      questionText: "Which AWS service provides managed firewall capabilities?",
      options: [
        "AWS Security Groups",
        "AWS Firewall Manager",
        "AWS WAF",
        "AWS Shield"
      ],
      correctAnswer: "AWS Security Groups"
    },
    {
      questionText: "What is the purpose of AWS CloudTrail?",
      options: [
        "Logging API calls and user activity",
        "Monitoring application performance",
        "Managing virtual machines",
        "Storing application data"
      ],
      correctAnswer: "Logging API calls and user activity"
    },
    {
      questionText: "Which AWS service helps protect against DDoS attacks?",
      options: [
        "AWS Shield",
        "AWS WAF",
        "AWS Security Groups",
        "AWS GuardDuty"
      ],
      correctAnswer: "AWS Shield"
    },
    {
      questionText: "What does MFA stand for in AWS security context?",
      options: [
        "Multi-Factor Authentication",
        "Multiple File Access",
        "Managed Firewall Access",
        "Mobile File Authentication"
      ],
      correctAnswer: "Multi-Factor Authentication"
    }
  ],
  intermediate: [
    {
      questionText: "Which AWS service provides threat detection by analyzing CloudTrail logs, VPC Flow Logs, and DNS logs?",
      options: [
        "AWS GuardDuty",
        "AWS Security Hub",
        "AWS Inspector",
        "AWS Macie"
      ],
      correctAnswer: "AWS GuardDuty"
    },
    {
      questionText: "What is the difference between AWS Security Groups and Network ACLs?",
      options: [
        "Security Groups are stateful, Network ACLs are stateless",
        "Security Groups work at subnet level, Network ACLs at instance level",
        "Security Groups are free, Network ACLs are paid",
        "Security Groups are for inbound only, Network ACLs for outbound only"
      ],
      correctAnswer: "Security Groups are stateful, Network ACLs are stateless"
    },
    {
      questionText: "Which AWS service automatically discovers and classifies sensitive data in S3?",
      options: [
        "AWS Macie",
        "AWS Inspector",
        "AWS Security Hub",
        "AWS Config"
      ],
      correctAnswer: "AWS Macie"
    },
    {
      questionText: "What is the purpose of AWS Secrets Manager?",
      options: [
        "Store and rotate database credentials and API keys",
        "Manage user passwords",
        "Store application configurations",
        "Manage SSL certificates"
      ],
      correctAnswer: "Store and rotate database credentials and API keys"
    },
    {
      questionText: "Which AWS service provides centralized security findings from multiple AWS services?",
      options: [
        "AWS Security Hub",
        "AWS GuardDuty",
        "AWS Inspector",
        "AWS Config"
      ],
      correctAnswer: "AWS Security Hub"
    }
  ],
  advanced: [
    {
      questionText: "In AWS Organizations, what is the difference between SCPs and IAM policies?",
      options: [
        "SCPs are applied at the OU level and affect all accounts, IAM policies are applied at user/role level",
        "SCPs work only for root accounts, IAM policies work for all accounts",
        "SCPs are for billing only, IAM policies are for permissions only",
        "SCPs are temporary, IAM policies are permanent"
      ],
      correctAnswer: "SCPs are applied at the OU level and affect all accounts, IAM policies are applied at user/role level"
    },
    {
      questionText: "What is the recommended approach for implementing defense in depth in AWS?",
      options: [
        "Layer security controls at network, compute, application, and data levels",
        "Use only AWS managed services",
        "Implement only perimeter security",
        "Focus only on identity and access management"
      ],
      correctAnswer: "Layer security controls at network, compute, application, and data levels"
    },
    {
      questionText: "Which AWS service provides automated compliance checking against security standards?",
      options: [
        "AWS Config Rules",
        "AWS Trusted Advisor",
        "AWS Personal Health Dashboard",
        "AWS CloudWatch"
      ],
      correctAnswer: "AWS Config Rules"
    },
    {
      questionText: "What is the purpose of AWS CloudHSM in a security architecture?",
      options: [
        "Provide dedicated hardware security modules for key management",
        "Monitor network traffic",
        "Store application secrets",
        "Manage user authentication"
      ],
      correctAnswer: "Provide dedicated hardware security modules for key management"
    },
    {
      questionText: "How does AWS KMS handle key rotation for customer-managed keys?",
      options: [
        "Automatic rotation every year, manual rotation anytime",
        "Only manual rotation is supported",
        "Automatic rotation every 90 days",
        "No rotation is supported for customer-managed keys"
      ],
      correctAnswer: "Automatic rotation every year, manual rotation anytime"
    }
  ]
};

export const AWS_SOLUTIONS_ARCHITECT_QUESTIONS = {
  easy: [
    {
      questionText: "What is AWS S3 primarily used for?",
      options: [
        "Object storage",
        "Block storage",
        "File storage",
        "Database storage"
      ],
      correctAnswer: "Object storage"
    },
    {
      questionText: "Which AWS service provides virtual servers in the cloud?",
      options: [
        "Amazon EC2",
        "Amazon S3",
        "Amazon RDS",
        "Amazon Lambda"
      ],
      correctAnswer: "Amazon EC2"
    },
    {
      questionText: "What is AWS Lambda?",
      options: [
        "Serverless compute service",
        "Virtual machine service",
        "Container service",
        "Database service"
      ],
      correctAnswer: "Serverless compute service"
    },
    {
      questionText: "Which AWS service provides managed relational databases?",
      options: [
        "Amazon RDS",
        "Amazon DynamoDB",
        "Amazon ElastiCache",
        "Amazon Redshift"
      ],
      correctAnswer: "Amazon RDS"
    },
    {
      questionText: "What is Amazon VPC?",
      options: [
        "Virtual Private Cloud",
        "Virtual Public Cloud",
        "Virtual Protected Cloud",
        "Virtual Partitioned Cloud"
      ],
      correctAnswer: "Virtual Private Cloud"
    }
  ],
  intermediate: [
    {
      questionText: "What is the difference between AWS Application Load Balancer and Network Load Balancer?",
      options: [
        "ALB works at Layer 7, NLB works at Layer 4",
        "ALB is free, NLB is paid",
        "ALB is for HTTP only, NLB is for TCP only",
        "ALB is regional, NLB is global"
      ],
      correctAnswer: "ALB works at Layer 7, NLB works at Layer 4"
    },
    {
      questionText: "Which AWS service is best for real-time data streaming?",
      options: [
        "Amazon Kinesis",
        "Amazon SQS",
        "Amazon SNS",
        "Amazon MQ"
      ],
      correctAnswer: "Amazon Kinesis"
    },
    {
      questionText: "What is the purpose of AWS Auto Scaling?",
      options: [
        "Automatically adjust capacity based on demand",
        "Manage user access",
        "Monitor application logs",
        "Store application data"
      ],
      correctAnswer: "Automatically adjust capacity based on demand"
    },
    {
      questionText: "Which AWS service provides content delivery network capabilities?",
      options: [
        "Amazon CloudFront",
        "Amazon Route 53",
        "Amazon API Gateway",
        "Amazon Direct Connect"
      ],
      correctAnswer: "Amazon CloudFront"
    },
    {
      questionText: "What is Amazon ECS used for?",
      options: [
        "Container orchestration service",
        "Virtual machine management",
        "Database management",
        "File storage management"
      ],
      correctAnswer: "Container orchestration service"
    }
  ],
  advanced: [
    {
      questionText: "What is the recommended approach for implementing a multi-region disaster recovery solution?",
      options: [
        "Use AWS Regions with cross-region replication and automated failover",
        "Use only single AZ deployment",
        "Use only on-premises backup",
        "Use only S3 for all data storage"
      ],
      correctAnswer: "Use AWS Regions with cross-region replication and automated failover"
    },
    {
      questionText: "Which AWS service provides the best solution for implementing a microservices architecture?",
      options: [
        "Amazon ECS with Application Load Balancer",
        "Single EC2 instance with multiple applications",
        "Amazon RDS with multiple databases",
        "Amazon S3 with static websites"
      ],
      correctAnswer: "Amazon ECS with Application Load Balancer"
    },
    {
      questionText: "What is the purpose of AWS Transit Gateway?",
      options: [
        "Centralized network hub for connecting VPCs and on-premises networks",
        "Manage user authentication",
        "Store application data",
        "Monitor application performance"
      ],
      correctAnswer: "Centralized network hub for connecting VPCs and on-premises networks"
    },
    {
      questionText: "Which AWS service provides the best solution for implementing a data lake architecture?",
      options: [
        "Amazon S3 with AWS Glue and Amazon Athena",
        "Amazon RDS with multiple databases",
        "Amazon DynamoDB with global tables",
        "Amazon ElastiCache with Redis"
      ],
      correctAnswer: "Amazon S3 with AWS Glue and Amazon Athena"
    },
    {
      questionText: "What is the recommended approach for implementing high availability in AWS?",
      options: [
        "Deploy across multiple Availability Zones",
        "Use only single AZ deployment",
        "Use only on-premises infrastructure",
        "Use only serverless services"
      ],
      correctAnswer: "Deploy across multiple Availability Zones"
    }
  ]
};

// Generate 50 questions for each level by repeating and varying the questions
export const generateAWSQuestions = (subTopic, level) => {
  const baseQuestions = {
    'AWSCertifiedSecurity': AWS_SECURITY_QUESTIONS,
    'AWSCertifiedSolutionsArchitect': AWS_SOLUTIONS_ARCHITECT_QUESTIONS
  };

  const questions = baseQuestions[subTopic]?.[level] || [];
  const result = [];
  
  // Generate 50 questions by repeating and varying the base questions
  for (let i = 0; i < 50; i++) {
    const baseQuestion = questions[i % questions.length];
    result.push({
      questionText: `${baseQuestion.questionText} (Question ${i + 1})`,
      options: baseQuestion.options,
      correctAnswer: baseQuestion.correctAnswer
    });
  }
  
  return result;
};
