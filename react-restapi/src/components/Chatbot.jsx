import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hi! I\'m Vinz\'s AI Portfolio Assistant. Ask me anything about his skills, projects, or experience!',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatSessionRef = useRef(null);

  const systemPrompt = `You are Vinz Szymone Roi V. Mendoza's Portfolio Assistant. You represent a talented Information Technology professional specializing in full-stack web development.

About Vinz:
- Skills: React, Python, C++, Java, Flutter, Node.js, MySQL, Supabase, Bootstrap, API Development
- Projects: E-commerce platforms, task management apps, data analysis tools, mobile applications
- Experience: Full-stack development with modern frameworks and databases
- Education: Currently studying Information Technology
- Hobbies: Basketball, outdoor sports
- Location: Available for opportunities and collaborations

Guidelines:
- Be friendly and professional
- Provide detailed answers about skills and projects
- Direct questions about hiring to the contact form
- Keep responses concise but informative
- If asked something unrelated to the portfolio, politely redirect to portfolio topics`;

  const initializeChat = async () => {
    try {
      const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
      if (!apiKey) {
        console.error('Google Gemini API key not found in environment variables');
        return false;
      }
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      chatSessionRef.current = model.startChat({
        history: [],
        generationConfig: {
          maxOutputTokens: 500,
          temperature: 0.7,
        },
      });
      return true;
    } catch (error) {
      console.error('Error initializing chat:', error);
      return false;
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessageToAI = async (userMessage) => {
    try {
      if (!chatSessionRef.current) {
        const initialized = await initializeChat();
        if (!initialized) {
          return 'Sorry, I couldn\'t connect to the AI service. Please try again later.';
        }
      }

      const response = await chatSessionRef.current.sendMessage([
        {
          role: 'user',
          parts: [{ text: `${systemPrompt}\n\nUser: ${userMessage}` }],
        },
      ]);

      const text = response.response.text();
      return text || 'I couldn\'t generate a response. Please try again.';
    } catch (error) {
      console.error('Error sending message to AI:', error);
      return 'Sorry, I encountered an error. Please try again later.';
    }
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Get AI response
    const aiResponse = await sendMessageToAI(inputValue);

    setIsLoading(false);

    const botResponse = {
      id: messages.length + 2,
      text: aiResponse,
      sender: 'bot',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botResponse]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Chat with me"
      >
        💬
      </button>

      {/* Chat Box */}
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <h3>Portfolio Assistant</h3>
            <button
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.sender}`}
              >
                <div className="message-bubble">
                  {message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message bot">
                <div className="message-bubble">
                  ✓ Typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input-area">
            <input
              type="text"
              placeholder="Ask me something..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="chatbot-input"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              className="chatbot-send-btn"
              disabled={isLoading}
            >
              {isLoading ? '...' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
