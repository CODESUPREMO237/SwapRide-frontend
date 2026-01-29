'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useSocket } from '@/context/SocketContext';
import Button from '@/components/ui/Button';  // ✅ Correct (default import)
import  Input  from '@/components/ui/Input';
import { Loader } from '@/components/ui/Loader';
import { Badge } from '@/components/ui/Badge';
import { formatRelativeTime } from '@/lib/utils';
import { MessageCircle, Send, Search, User } from 'lucide-react';

export default function MessagesPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { socket, connected } = useSocket();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    fetchConversations();
  }, [isAuthenticated]);

  useEffect(() => {
    if (socket && connected) {
      socket.on('message', handleNewMessage);
      socket.on('messageRead', handleMessageRead);

      return () => {
        socket.off('message', handleNewMessage);
        socket.off('messageRead', handleMessageRead);
      };
    }
  }, [socket, connected, selectedConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const response = await api.get('/chat/conversations');
      setConversations(response.data.data.conversations || []);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (conversationId) => {
    try {
      const response = await api.get(`/chat/conversations/${conversationId}/messages`);
      setMessages(response.data.data.messages || []);
      
      // Mark messages as read
      if (socket && connected) {
        socket.emit('markAsRead', { conversationId });
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleConversationSelect = (conversation) => {
    setSelectedConversation(conversation);
    fetchMessages(conversation._id);
    
    // Join conversation room
    if (socket && connected) {
      socket.emit('joinConversation', { conversationId: conversation._id });
    }
  };

  const handleNewMessage = (message) => {
    if (selectedConversation && message.conversation === selectedConversation._id) {
      setMessages(prev => [...prev, message]);
    }
    
    // Update conversation list
    setConversations(prev => 
      prev.map(conv => 
        conv._id === message.conversation
          ? { ...conv, lastMessage: message, unreadCount: conv.unreadCount + 1 }
          : conv
      )
    );
  };

  const handleMessageRead = ({ conversationId }) => {
    setConversations(prev =>
      prev.map(conv =>
        conv._id === conversationId
          ? { ...conv, unreadCount: 0 }
          : conv
      )
    );
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !selectedConversation || !socket) return;

    setSending(true);
    try {
      const messageData = {
        conversationId: selectedConversation._id,
        content: newMessage,
      };

      socket.emit('sendMessage', messageData);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
          <div className="grid grid-cols-12 h-full">
            {/* Conversations List */}
            <div className="col-span-12 md:col-span-4 border-r border-gray-200 flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <MessageCircle className="h-6 w-6 text-blue-600" />
                  Messages
                </h2>
                <div className="relative">
                  <Input
                    placeholder="Search conversations..."
                    leftIcon={<Search className="h-5 w-5 text-gray-400" />}
                  />
                </div>
              </div>

              {/* Conversations */}
              <div className="flex-1 overflow-y-auto">
                {conversations.length === 0 ? (
                  <div className="p-8 text-center">
                    <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-600">No conversations yet</p>
                  </div>
                ) : (
                  conversations.map((conversation) => {
                    const otherParticipant = conversation.participants?.find(
                      p => p._id !== user?._id
                    );

                    return (
                      <button
                        key={conversation._id}
                        onClick={() => handleConversationSelect(conversation)}
                        className={`
                          w-full p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-left
                          ${selectedConversation?._id === conversation._id ? 'bg-blue-50' : ''}
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-gray-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold text-gray-900 truncate">
                                {otherParticipant?.firstName} {otherParticipant?.lastName}
                              </h3>
                              {conversation.unreadCount > 0 && (
                                <Badge variant="primary" size="sm">
                                  {conversation.unreadCount}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 truncate">
                              {conversation.lastMessage?.content || 'No messages yet'}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {conversation.lastMessage && formatRelativeTime(new Date(conversation.lastMessage.createdAt))}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Messages Area */}
            <div className="col-span-12 md:col-span-8 flex flex-col">
              {!selectedConversation ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-600">Select a conversation to start messaging</p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {selectedConversation.participants?.find(p => p._id !== user?._id)?.firstName}{' '}
                          {selectedConversation.participants?.find(p => p._id !== user?._id)?.lastName}
                        </h3>
                        {connected && (
                          <p className="text-xs text-green-600">● Online</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => {
                      const isOwn = message.sender?._id === user?._id;
                      
                      return (
                        <div
                          key={message._id}
                          className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`
                              max-w-[70%] rounded-lg px-4 py-2
                              ${isOwn 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-100 text-gray-900'
                              }
                            `}
                          >
                            <p className="break-words">{message.content}</p>
                            <p className={`text-xs mt-1 ${isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
                              {formatRelativeTime(new Date(message.createdAt))}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <form onSubmit={sendMessage} className="p-4 border-t border-gray-200">
                    <div className="flex gap-2">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1"
                        disabled={!connected || sending}
                      />
                      <Button
                        type="submit"
                        disabled={!newMessage.trim() || !connected || sending}
                        loading={sending}
                        leftIcon={<Send className="h-5 w-5" />}
                      >
                        Send
                      </Button>
                    </div>
                    {!connected && (
                      <p className="text-xs text-red-600 mt-2">
                        Connecting to chat server...
                      </p>
                    )}
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
