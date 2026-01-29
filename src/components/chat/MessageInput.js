'use client';

import { useState, useRef } from 'react';
import { Send, Image as ImageIcon, Smile, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useSocket } from '@/context/SocketContext';

export default function MessageInput({ onSend, conversationId, disabled = false }) {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const { sendTyping } = useSocket();
  const fileInputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!message.trim() || disabled) return;

    try {
      setSending(true);
      await onSend(message.trim(), null);
      setMessage('');
      // Stop typing indicator
      sendTyping(conversationId, false);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const handleTyping = () => {
    // Send typing indicator
    sendTyping(conversationId, true);
    
    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Stop typing indicator after 2 seconds of no activity
    typingTimeoutRef.current = setTimeout(() => {
      sendTyping(conversationId, false);
    }, 2000);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    try {
      setUploadingImage(true);

      // Create FormData
      const formData = new FormData();
      formData.append('image', file);

      // Upload to Cloudinary via your backend
      // TODO: Replace with your actual upload endpoint
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      const imageUrl = data.url;

      // Send message with image
      await onSend('', { url: imageUrl, type: 'image' });
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
      <div className="flex items-end gap-2">
        {/* File Upload Buttons */}
        <div className="flex gap-1">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            disabled={disabled || uploadingImage}
          />
          
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled || uploadingImage}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Upload image"
          >
            {uploadingImage ? (
              <div className="h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            ) : (
              <ImageIcon className="h-6 w-6" />
            )}
          </button>

          <button
            type="button"
            disabled={disabled}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Attach file"
          >
            <Paperclip className="h-6 w-6" />
          </button>

          <button
            type="button"
            disabled={disabled}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Add emoji"
          >
            <Smile className="h-6 w-6" />
          </button>
        </div>
        
        {/* Message Input */}
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              handleTyping();
            }}
            onKeyPress={handleKeyPress}
            placeholder={disabled ? 'Connecting...' : 'Type a message...'}
            disabled={disabled || sending}
            rows={1}
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:bg-gray-50 disabled:cursor-not-allowed"
            style={{
              minHeight: '48px',
              maxHeight: '120px',
            }}
          />
        </div>
        
        {/* Send Button */}
        <Button
          type="submit"
          disabled={!message.trim() || sending || disabled}
          size="icon"
          className="h-12 w-12 rounded-full flex-shrink-0"
        >
          {sending ? (
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Character Count (optional) */}
      {message.length > 0 && (
        <div className="mt-2 text-xs text-gray-400 text-right">
          {message.length} characters
        </div>
      )}
    </form>
  );
}
