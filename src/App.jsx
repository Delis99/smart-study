import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const API_ENDPOINT = 'https://ctq7xfkhg6.execute-api.us-east-1.amazonaws.com/prod/chat';

function App() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "👋 Hi! I'm Smart Study Buddy, your AI tutor powered by AWS Bedrock Agent.\n\nI can help you learn any topic with:\n• 🔍 Real-time web search\n• 📰 Latest news & updates\n• 🌐 Bilingual support (English/Spanish)\n• 🖼️ Image analysis\n\nJust ask me anything!",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState('session-' + Date.now());
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestedPrompts = [
    { text: "🔬 Quantum Computing" },
    { text: "📰 Latest AI News" },
    { text: "🧠 Redes Neuronales (ES)" }
  ];

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSend = async () => {
    if ((!input.trim() && !selectedImage) || isLoading) return;

    const userMessage = {
      role: 'user',
      content: input || "Please analyze this image",
      timestamp: new Date(),
      image: imagePreview
    };

    const userInput = input || "Analyze this image";
    const imageData = selectedImage;
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setSelectedImage(null);
    setImagePreview(null);
    setIsLoading(true);

    try {
      console.log('Sending request to:', API_ENDPOINT);

      let requestBody = {
        message: userInput,
        sessionId: sessionId
      };

      // If there's an image, convert to base64 and add to request
      if (imageData) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64Image = reader.result.split(',')[1];
          requestBody.image = base64Image;
          
          await sendRequest(requestBody);
        };
        reader.readAsDataURL(imageData);
      } else {
        await sendRequest(requestBody);
      }

    } catch (error) {
      console.error('Error details:', error);
      const errorMessage = {
        role: 'assistant',
        content: `Connection error: ${error.message}. Please try again.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  const sendRequest = async (requestBody) => {
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

      const assistantMessage = {
        role: 'assistant',
        content: data.response || 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
        isThrottled: data.isThrottled || false  // NEW: Flag for throttled messages
      };

      setMessages(prev => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePromptClick = (prompt) => {
    setInput(prompt.text);
  };

  return (
    <div className="app">
      <div className="header">
        <div className="header-content">
          <div className="logo">🧠</div>
          <div>
            <h1>Smart Study Buddy</h1>
            <p>Your autonomous AI tutor powered by AWS Bedrock Agent</p>
          </div>
        </div>
      </div>

      <div className="features-banner">
        <div className="features-content">
          <div className="feature-item">
            <span className="status-dot"></span>
            <span>Built with <strong>AWS Bedrock AgentCore + Claude 3.5 Sonnet</strong></span>
          </div>
          <div className="feature-item">
            <span>🤖 <strong>Autonomous:</strong> I decide when to search web or fetch news!</span>
          </div>
          <div className="feature-item">
            <span>🌐 <strong>Bilingual:</strong> Automatically responds in English or Spanish!</span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="chat-container">
          <div className="messages-container">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.role}`}>
                <div className="avatar">
                  {message.role === 'user' ? '👤' : '🧠'}
                </div>
                <div className="message-content">
                  {message.image && (
                    <img src={message.image} alt="Uploaded" className="message-image" />
                  )}
                  <div className={`message-bubble ${message.isThrottled ? 'throttled-message' : ''}`}>
                    {message.content}
                  </div>
                  <div className="message-time">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="message assistant">
                <div className="avatar">🧠</div>
                <div className="message-content">
                  <div className="thinking-indicator">
                    <div className="thinking-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <span>Thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <div className="suggested-prompts">
              <p className="prompts-label">💡 Try these:</p>
              <div className="prompts-grid">
                {suggestedPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handlePromptClick(prompt)}
                    className="prompt-button"
                  >
                    {prompt.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="input-container">
            {imagePreview && (
              <div className="image-preview-container">
                <img src={imagePreview} alt="Preview" className="image-preview" />
                <button onClick={removeImage} className="remove-image-btn">✕</button>
              </div>
            )}
            <div className="input-wrapper">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageSelect}
                accept="image/*"
                style={{ display: 'none' }}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="attach-button"
                disabled={isLoading}
                title="Attach image"
              >
                📎
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder="Ask me anything..."
                className="input-field"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || (!input.trim() && !selectedImage)}
                className="send-button"
              >
                {isLoading ? 'Thinking...' : 'Send'} ➤
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        © 2025 — Built with <strong>AWS Bedrock Agent</strong> · <strong>React</strong> · <strong>Autonomous AI</strong>
      </div>
    </div>
  );
}

export default App;