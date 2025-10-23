# Smart Study Buddy

**Autonomous AI Tutor Powered by AWS Bedrock Agents**

🏆 Submitted to AWS AI Agent Global Hackathon 2025

[Live Demo](https://smart-study1.vercel.app/)

---

## About

Smart Study Buddy is an autonomous AI tutor that breaks down educational barriers by intelligently deciding when to analyze images, search the web, or translate to Spanish all without requiring manual commands from users. Unlike traditional chatbots that wait for explicit instructions, this system uses AWS Bedrock Agents to autonomously orchestrate multiple specialized services, providing comprehensive educational support 24/7.

The project addresses critical gaps in educational technology. With 41 million Spanish speakers in the United States and 65% of learners being visual learners, existing educational tools fall short by being English only and unable to process images. Smart Study Buddy solves these problems by providing truly autonomous, multi-modal, and bilingual educational support.

## What It Does

When a student uploads a photo of a math problem, the agent automatically detects the image, analyzes it using Claude 3.5 Sonnet v2's vision capabilities, and provides step-by-step explanations no buttons or commands needed. When someone asks about recent developments in technology, the agent recognizes the temporal keyword and automatically searches the web for current information. When a user writes in Spanish, the system detects the language and responds fluently in Spanish with proper educational terminology.

The autonomous decision-making is powered by AWS Bedrock Agents, which analyze each query and intelligently select from four specialized capabilities: image analysis with Claude Vision API, real-time web search integration, news fetching for current events, and bilingual translation between English and Spanish. This creates a seamless learning experience where students can focus on understanding concepts rather than figuring out which buttons to click.

## Technical Implementation

The project is built on a serverless architecture using AWS services. The frontend is a React application built with Vite and deployed on Vercel, providing a responsive and modern user interface. When a user sends a message or uploads an image, the request goes through AWS API Gateway to the main orchestrator Lambda function written in Python 3.11.

The orchestrator Lambda function handles several critical tasks. It parses incoming requests, stores uploaded images in sessionAttributes to avoid data truncation issues, invokes the AWS Bedrock Agent, and implements comprehensive retry logic with exponential backoff to handle throttling. This retry logic proved essential when the AWS US-EAST-1 region experienced an outage during development, forcing the implementation of production-ready error handling from day one.

The AWS Bedrock Agent serves as the intelligent decision-making engine, using Claude 3.5 Sonnet v2 as the foundation model. The agent is configured with explicit, step-by-step instructions that enable it to autonomously decide which tools to use based on user input. When it detects an uploaded image in the sessionAttributes, it calls the image-analysis tool. When it sees temporal keywords like "latest" or "recent," it calls the web-search tool. When it identifies Spanish text, it uses its built-in translation capabilities to respond appropriately.

Behind the agent are six specialized Lambda functions, each handling a specific capability. The image-analysis function uses Claude 3.5 Sonnet v2's vision API to analyze photos of homework problems, diagrams, and charts. The web-search function integrates with SerpAPI to provide real-time search results. The news-fetcher function connects to NewsAPI for the latest articles and research. The translation function leverages Amazon Translate for language detection and conversion, though much of the bilingual capability comes from Claude's native Spanish fluency.

## Technologies Used

**AI & Cloud Infrastructure:**
- AWS Bedrock Agents for autonomous orchestration and decision-making
- Claude 3.5 Sonnet v2 as the foundation model with vision capabilities
- AWS Lambda for serverless backend functions (Python 3.11 and 3.12)
- AWS API Gateway for REST API endpoints with CORS support
- AWS IAM for secure permissions management
- Amazon CloudWatch for logging and monitoring
- AWS Secrets Manager for secure API key storage

**Frontend:**
- React 18 for building the user interface
- Vite as the build tool and development server
- Tailwind CSS for styling and responsive design
- Vercel for deployment with global CDN distribution

**External APIs:**
- SerpAPI for real-time web search functionality
- NewsAPI for fetching the latest news articles
- Amazon Translate for language detection and translation support

## Key Challenges Solved

One of the biggest challenges was the AWS US-EAST-1 outage on October 20, 2025, which occurred during active development. This forced the implementation of comprehensive retry logic with exponential backoff, turning what could have been a setback into an opportunity to build production-ready error handling. The system now gracefully handles service disruptions and provides user-friendly error messages.

Another significant challenge was image data truncation. When passing base64-encoded images as action group parameters, the Bedrock Agent was truncating the data to approximately 16 characters, making image analysis impossible. The solution was to store images in sessionAttributes instead, where they remain intact and accessible to the Lambda functions. This required careful debugging and understanding of how Bedrock Agents handle different types of data.

Getting the agent to autonomously detect and analyze uploaded images required crafting explicit instructions with strong directive language. Initially, the agent would respond with "I don't see an image" despite the image being present in sessionAttributes. The solution was to provide step-by-step protocols in the agent instructions, using keywords like "MUST" and "NEVER" to establish clear behavior patterns. This taught an important lesson: autonomous AI agents need explicit guidance to behave autonomously they don't inherently know what to do.

Rate limiting was another challenge, with AWS Bedrock initially providing only 2 requests per minute. This severely limited testing during development. The solution involved implementing retry logic for throttling exceptions, providing clear user feedback about rate limits, and requesting a quota increase from AWS. The system now handles rate limiting gracefully while waiting for the increased quota.

## Impact and Results

Smart Study Buddy successfully demonstrates that autonomous AI agents can provide genuinely useful educational support. The system is fully deployed and production ready, operating at approximately $5 per month with AWS credits. It handles text and images seamlessly, responds in both English and Spanish fluently, and provides current information through real-time web search all while requiring zero manual commands from users.

The project addresses real educational inequality by breaking down language barriers for Spanish-speaking students, making visual learning accessible through image analysis, and providing 24/7 intelligent tutoring at minimal cost. It proves that AI agents with proper instruction design can make complex, multi-step decisions reliably in production environments.

## Future Development

Future enhancements include adding voice input and output for accessibility, processing uploaded documents like PDFs and Word files for homework help, implementing learning analytics to track student progress, and expanding language support beyond English and Spanish to include French, German, Chinese, Hindi, and Arabic. Long-term goals include building study group collaboration features, adding gamification elements to increase engagement, and exploring AR/VR learning environments for immersive education.

## Author

Created by Delis Santiago as a submission to the AWS AI Agent Global Hackathon 2025. This project represents a passion for using artificial intelligence to democratize education and make quality learning accessible to everyone, regardless of language or location.

Contact: sdeliaelias@gmail.com  
GitHub: https://github.com/Delis99/smart-study  
Live Demo: https://smart-study1.vercel.app/

## License

MIT License - This project is open source and available for educational and development purposes.

---

**Built with ❤️ to democratize education through autonomous AI**
