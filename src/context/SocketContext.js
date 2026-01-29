'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import socketService from '@/lib/socket';
import { useAuth } from './AuthContext';

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const { user, token } = useAuth();
  const [connected, setConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (token && user) {
      // Connect to socket
      const socket = socketService.connect(token);
      
      socket.on('connect', () => {
        console.log('Socket connected in context');
        setConnected(true);
      });

      socket.on('disconnect', () => {
        console.log('Socket disconnected in context');
        setConnected(false);
      });

      // Listen for online users updates
      socket.on('users-online', (users) => {
        setOnlineUsers(users);
      });

      // Cleanup on unmount or token change
      return () => {
        socketService.disconnect();
        setConnected(false);
      };
    } else {
      // Disconnect if no token
      socketService.disconnect();
      setConnected(false);
    }
  }, [token, user]);

  const joinConversation = (conversationId) => {
    return socketService.emit('join-conversation', { conversationId });
  };

  const leaveConversation = (conversationId) => {
    return socketService.emit('leave-conversation', { conversationId });
  };

  const sendMessage = (data) => {
    return socketService.emit('send-message', data);
  };

  const sendTyping = (conversationId, isTyping) => {
    return socketService.emit('typing', { conversationId, isTyping });
  };

  const value = {
    socket: socketService,
    connected,
    onlineUsers,
    joinConversation,
    leaveConversation,
    sendMessage,
    sendTyping,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within SocketProvider');
  }
  return context;
};
