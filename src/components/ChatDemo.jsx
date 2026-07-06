import React, { useState, useEffect, useRef } from 'react';
// import conversations from '../data/chat-flow.json'; // No longer needed for AI API

// These suggestions will now be sent as user input to the AI
const suggestions = [
  { label: 'Leaky Faucet', message: 'I have a leaky faucet' },
  { label: 'Water Heater Emergency', message: 'Water heater is broken, need emergency service ASAP' },
  { label: 'Schedule Maintenance', message: 'I want to schedule maintenance for Tuesday' },
];

const ChatDemo = () => {
  const [chatMessages, setChatMessages] = useState([ // Initial message from the bot
    { id: 1, text: "👋 Hi! Welcome to Thompson Plumbing. I'm here to help schedule your appointment or answer questions about our services. What brings you in today?", sender: 'bot' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatContainerRef = useRef(null);
  const nextId = useRef(2); // Start message IDs from 2

  useEffect(() => {
    // Auto-scroll to the latest message
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const addMessage = (text, sender) => {
    setChatMessages(prev => [...prev, { id: nextId.current++, text, sender }]);
  };

  const handleSendMessage = (messageText) => {
    const text = messageText.trim();
    if (!text) return;

    addMessage(text, 'user');
    setChatInput('');
    setIsBotTyping(true);
    
    setTimeout(() => {
      const response = conversations[text];
      if (response) {
        addMessage(response.bot, 'bot');
      } else {
        addMessage(`I understand you're asking about "${text.toLowerCase()}". For complex questions, one of our team members can help—would you like us to call you back?`, 'bot');
      }
      setIsBotTyping(false);
    }, 500);
  };

  return (
    <section id="demo" className="py-24 px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight drop-shadow-lg">AI Assistant Demo</h2>
          <p className="text-xl text-gray-400">Click a suggestion below to see our intelligent chatbot in action.</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
          <div ref={chatContainerRef} className="h-96 overflow-y-auto mb-6 bg-black/30 rounded-xl p-6 border border-white/5 scroll-smooth">
            {chatMessages.map((message) => ( // Display existing messages
              <div key={message.id} className={`flex gap-3 mb-4 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                <div className={`max-w-[70%] p-4 rounded-xl ${message.sender === 'bot' ? 'bg-gradient-to-r from-cyan-400/20 to-violet-500/20 border border-cyan-400/30' : 'bg-white/10 border border-white/20'}`}>
                  <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                </div>
              </div>
            ))}
            {isBotTyping && (
              <div className="flex gap-3 mb-4">
                <div className="max-w-[70%] p-4 rounded-xl bg-gradient-to-r from-cyan-400/20 to-violet-500/20 border border-cyan-400/30">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 bg-cyan-400 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                    <span className="h-2 w-2 bg-cyan-400 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 bg-cyan-400 rounded-full animate-pulse"></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 mb-6">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(chatInput)}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
            />
            <button
              onClick={() => handleSendMessage(chatInput)}
              disabled={isBotTyping}
              className="bg-gradient-to-r from-cyan-400 to-violet-500 text-white font-semibold px-6 py-3 rounded-xl hover:shadow-[0_0_20px_rgba(56,182,255,0.4)] transition-all"
            >
              Send
            </button>
          </div>

          {/* New function to handle bot response asynchronously */}
          const processBotResponse = async (userMessage) => {
            setIsBotTyping(true);
            try {
              // Pass the current chat history to the AI for context
              const botResponse = await callOpenAIChatAPI(userMessage, chatMessages);
              addMessage(botResponse, 'bot');
            } catch (error) {
              console.error("Failed to get AI response:", error);
              addMessage("I'm sorry, I couldn't get a response from the AI. Please try again.", 'bot');
            }
            setIsBotTyping(false);
          };

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <p className="text-sm font-semibold mb-4 text-gray-300">💡 Try these messages:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.label}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:border-cyan-400/30 transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handleSendMessage(suggestion.message)}
                  disabled={isBotTyping}
                >
                  {suggestion.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatDemo;