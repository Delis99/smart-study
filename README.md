# 🧠 Smart Study Buddy

**Autonomous AI Tutor powered by AWS Bedrock Agents**

🏆 *AWS AI Agent Global Hackathon 2025 Submission*

## 🌐 Links

- **Live Demo:** [https://smart-study1.vercel.app/](https://smart-study1.vercel.app/)

---

## 📋 Overview

Smart Study Buddy is an autonomous, AI-powered tutoring system that provides bilingual (English/Spanish), multi-modal educational support without requiring manual commands. Built using AWS Bedrock Agents, the system intelligently decides when to analyze images, search the web, or translate content, delivering a seamless learning experience.

The project addresses real educational gaps by supporting visual learners, Spanish-speaking students, and learners who need access to real-time information.

---

## ✨ Key Capabilities

- **Autonomous Decision-Making** – AWS Bedrock Agents orchestrate tools without user intervention
- **Image-Based Problem Solving** – Powered by Claude 3.5 Sonnet v2 with vision capabilities
- **Real-Time Information Retrieval** – Web and news search for current topics and events
- **Automatic Bilingual Support** – Seamless English/Spanish responses using Amazon Translate
- **Serverless Architecture** – Production-ready, scalable cloud infrastructure

---

## 🛠️ Tech Stack

### AI & Cloud Infrastructure
- **AI Models:** AWS Bedrock Agents, Claude 3.5 Sonnet v2
- **Backend:** AWS Lambda, Amazon API Gateway
- **Translation:** Amazon Translate
- **APIs:** SerpAPI, NewsAPI

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Hosting:** Vercel

---

## 🏗️ Engineering Highlights

- **Fully Autonomous Agent Design** – Orchestrates multiple tools and services without requiring user configuration or explicit commands
- **Production-Grade Reliability** – Implemented retry logic and exponential backoff to handle AWS regional outages gracefully
- **Vision Processing Innovation** – Solved Bedrock image truncation issues by leveraging `sessionAttributes` for reliable multi-modal input processing
- **Cost-Effective Scalability** – Deployed a serverless system that operates at approximately $5/month while maintaining production readiness

---

## 🌍 Impact

Smart Study Buddy demonstrates how autonomous AI agents can reduce educational barriers by providing accessible, bilingual, and visual learning support at scale. The platform empowers students who face language barriers, prefer visual learning methods, or need real-time information access for their studies.

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- AWS Account with Bedrock access
- API keys for SerpAPI and NewsAPI

### Installation

1. **Clone the repository:**
```bash
   git clone https://github.com/Delis99/smart-study.git
   cd smart-study
```

2. **Install dependencies:**
```bash
   npm install
```

3. **Configure environment variables:**

   Create a `.env` file in the project root:
```env
   VITE_API_GATEWAY_URL=your_api_gateway_url
   AWS_REGION=us-east-1
   SERPAPI_KEY=your_serpapi_key
   NEWSAPI_KEY=your_newsapi_key
```

4. **Run the development server:**
```bash
   npm run dev
```

   Open your browser and navigate to `http://localhost:5173`

---

## 🎯 Use Cases

- **Visual Learners:** Upload images of math problems, diagrams, or handwritten notes for instant analysis
- **Language Learners:** Receive explanations in English or Spanish automatically
- **Current Events:** Ask questions about recent news or developments with real-time web search
- **Homework Help:** Get step-by-step explanations without manually selecting tools

---

## 📚 Technical Architecture
```
User Interface (React + Tailwind)
          ↓
   API Gateway (AWS)
          ↓
   Lambda Functions (Node.js)
          ↓
   AWS Bedrock Agents
     ↙    ↓    ↘
Claude  SerpAPI  NewsAPI
Vision  Search   Search
     ↘    ↓    ↙
   Amazon Translate
          ↓
   Response to User
```

---

## 🏆 Hackathon Context

This project was developed for the **AWS AI Agent Global Hackathon 2025**, showcasing the power of autonomous AI agents in solving real-world educational challenges. The focus was on creating a system that requires minimal user configuration while maximizing accessibility and impact.

---

## 👤 Author

**Delis Santiago**

- Website: [https://smart-study1.vercel.app/](https://smart-study1.vercel.app/)

---

## 🙏 Acknowledgments

- AWS for providing Bedrock and related cloud services
- Anthropic for Claude 3.5 Sonnet v2
- The open-source community for React, Vite, and Tailwind CSS

---

**Built with ❤️ for learners everywhere**
