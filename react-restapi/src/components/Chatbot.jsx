import React, { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hi! I\'m Vinz\'s Portfolio Assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const faqDatabase = {
    'hello': 'Hi there! Welcome to my portfolio. Feel free to ask me anything!',
    'hi': 'Hello! How can I assist you?',
    'who are you': 'I\'m Vinz Szymone Roi V. Mendoza, an Information Technology professional passionate about creating beautiful and functional web applications.',
    'what do you do': 'I specialize in full-stack web development with React, Python, C++, Java, and Flutter. I also have experience with database design and API development.',
    'skills': 'My skills include: React, Python, C++, Java, Flutter, Node.js, MySQL, Supabase, Bootstrap, and API development.',
    'projects': 'I have worked on various projects including e-commerce platforms, task management apps, data analysis tools, and mobile applications.',
    'contact': 'You can reach me through the contact form below. Fill in your name, email, and message, and I\'ll get back to you soon!',
    'about': 'I\'m an Information Technology professional with a passion for solving real-world problems through clean, efficient code and excellent user experiences.',
    'experience': 'I have experience in full-stack development, working with modern frameworks and databases. I\'m constantly learning new technologies!',
    'education': 'I\'m currently studying Information Technology, focused on web development and software engineering.',
    'portfolio': 'Check out my portfolio section above! I have projects in Python, C++, Java, and Flutter.',
    'hire': 'I\'m always open to new opportunities! Feel free to contact me using the contact form on this website.',
    'thanks': 'You\'re welcome! Is there anything else you\'d like to know?',
    'help': 'I can answer questions about my skills, projects, experience, contact information, and more. Just ask!',
    'hobby': 'I love playing basketball and outdoor sports! It\'s a great way to stay active and relax after coding.',
    'hobbies': 'I love playing basketball and outdoor sports! It\'s a great way to stay active and relax after coding.',
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase().trim();
    
    for (const [key, response] of Object.entries(faqDatabase)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return 'I\'m not sure about that. You can ask me about my skills, projects, experience, contact information, or feel free to use the contact form!';
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue('');

    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
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
            />
            <button
              onClick={handleSendMessage}
              className="chatbot-send-btn"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
