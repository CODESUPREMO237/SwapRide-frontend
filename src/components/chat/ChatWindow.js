'use client';

import { useState, useEffect, useRef } from 'react';
import { useSocket } from '@/context/SocketContext';
import { useAuth } from '@/context/AuthContext';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import api from '@/lib/api';
import { Loader } from '@/components/ui/Loader';
import { Alert } from '@/components/ui/Alert';
import { User, MoreVertical, Phone, Video } from 'lucide-react';
import Image from 'next/image';

export default function ChatWindow({ conversationId, recipientUser }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { socket, connected, joinConversation, leaveConversation } = useSocket();
  const { user } = useAuth();
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    if (conversationId && connected) {
      fetchMessages();
      joinConversation(conversationId);
      
      // Listen for new messages
      socket.on('message', handleNewMessage);
      socket.on('typing', handleTypingIndicator);
      
      return () => {
        socket.off('message', handleNewMessage);
        socket.off('typing', handleTypingIndicator);
        leaveConversation(conversationId);
      };
    }
  }, [conversationId, connected]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get(`/chat/conversations/${conversationId}/messages`);
      setMessages(response.data.data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const handleNewMessage = (message) => {
    if (message.conversation === conversationId) {
      setMessages(prev => {
        // Check if message already exists
        const exists = prev.some(m => m._id === message._id);
        if (exists) return prev;
        return [...prev, message];
      });
    }
  };

  const handleTypingIndicator = ({ userId, isTyping: typing }) => {
    if (userId !== user?._id) {
      setIsTyping(typing);
      
      // Clear typing indicator after 3 seconds
      if (typing) {
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
          setIsTyping(false);
        }, 3000);
      }
    }
  };

  const handleSendMessage = async (content, attachment) => {
    try {
      const response = await api.post(`/chat/conversations/${conversationId}/messages`, {
        content,
        attachment
      });
      
      // Message will be added via socket event
      return response.data.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!conversationId) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <div className="text-center">
          <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">Select a conversation to start messaging</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b bg-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
            {recipientUser?.avatar ? (
              <Image
                src={recipientUser.avatar}
                alt={recipientUser.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <User className="h-5 w-5 text-gray-400" />
              </div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {recipientUser?.name || 'User'}
            </h3>
            <p className="text-xs text-gray-500">
              {connected ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Phone className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Video className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MoreVertical className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert type="error" className="m-4" onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-gray-500 mb-2">No messages yet</p>
              <p className="text-sm text-gray-400">Start the conversation!</p>
            </div>
          </div>
        ) : (
          <>
            <MessageList messages={messages} currentUserId={user?._id} />
            {isTyping && (
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                <div className="flex gap-1">
                  <span className="animate-bounce" style={{ animationDelay: '0ms' }}>●</span>
                  <span className="animate-bounce" style={{ animationDelay: '150ms' }}>●</span>
                  <span className="animate-bounce" style={{ animationDelay: '300ms' }}>●</span>
                </div>
                <span>{recipientUser?.name} is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <MessageInput
        onSend={handleSendMessage}
        conversationId={conversationId}
        disabled={!connected}
      />
    </div>
  );
}
