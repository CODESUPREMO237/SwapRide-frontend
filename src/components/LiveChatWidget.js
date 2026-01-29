'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { user, isAuthenticated } = useAuth();

  // Admin contact info
  const ADMIN_CONTACT = {
    name: 'SwapRide Support',
    email: 'tchabeustephane@gmail.com',
    phone: '+237 679 398 551',
    whatsapp: '+237679398551',
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
      userName: user?.firstName || 'Guest',
    };

    setMessages([...messages, userMessage]);
    const currentMessage = message;
    setMessage('');
    setLoading(true);

    // Try to send to backend (optional - won't break if endpoint doesn't exist)
    try {
      // Attempt to send via backend API
      await api.post('/contact/support', {
        message: currentMessage,
        userId: user?._id,
        userName: user?.firstName + ' ' + user?.lastName,
        userEmail: user?.email,
        type: 'live_chat',
      });
    } catch (error) {
      // Silently handle backend errors - chat still works for user
      console.log('Backend endpoint not available, using local chat only');
    }

    // Always show auto-reply (even if backend fails)
    setTimeout(() => {
      const autoReply = {
        id: Date.now() + 1,
        text: `Thank you for your message! We've received: "${currentMessage}". For immediate assistance, please contact us on WhatsApp at ${ADMIN_CONTACT.phone} or email us at ${ADMIN_CONTACT.email}`,
        sender: 'admin',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, autoReply]);
      setLoading(false);
    }, 1000);
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent('Hello, I need help with SwapRide.');
    window.open(`https://wa.me/${ADMIN_CONTACT.whatsapp}?text=${text}`, '_blank');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 transition-all hover:scale-110 flex items-center gap-2 group"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
          Need Help?
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-[9999] w-96 max-w-[calc(100vw-3rem)]">
      {/* Chat Window */}
      <div className={`bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border-2 border-blue-200 transition-all duration-300 ${
        isMinimized ? 'h-auto' : 'h-[600px] max-h-[80vh]'
      }`}>
        {/* Header - Always Visible */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold">
              SR
            </div>
            <div>
              <h3 className="font-semibold">SwapRide Support</h3>
              <p className="text-xs text-blue-100">We typically reply instantly</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="hover:bg-white/10 p-2 rounded-lg transition-all active:scale-95"
              title="Minimize"
              aria-label="Minimize chat"
            >
              <Minimize2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/10 p-2 rounded-lg transition-all hover:rotate-90 active:scale-95"
              title="Close chat"
              aria-label="Close chat"
            >
              <X className="h-6 w-6 stroke-[3]" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages Area */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50 min-h-0">
              {/* Welcome Message */}
              {messages.length === 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-sm text-gray-700 mb-3">
                    👋 Hi{user?.firstName ? ` ${user.firstName}` : ''}! How can we help you today?
                  </p>
                  <div className="space-y-2">
                    <button
                      onClick={openWhatsApp}
                      className="w-full text-left text-sm bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center gap-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Chat on WhatsApp
                    </button>
                    <p className="text-xs text-gray-600 mt-2">
                      📧 Email: {ADMIN_CONTACT.email}<br />
                      📞 Phone: {ADMIN_CONTACT.phone}
                    </p>
                  </div>
                </div>
              )}

              {/* Messages */}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    {msg.sender === 'admin' && (
                      <p className="text-xs font-semibold mb-1 text-blue-600">
                        SwapRide Support
                      </p>
                    )}
                    <p className="text-sm">{msg.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        msg.sender === 'user' ? 'text-blue-200' : 'text-gray-500'
                      }`}
                    >
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-200 flex-shrink-0">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={!message.trim() || loading}
                  className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Or message us on{' '}
                <button onClick={openWhatsApp} className="text-green-600 hover:underline font-medium">
                  WhatsApp
                </button>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
