'use client';

import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import { Check, CheckCheck } from 'lucide-react';

export default function MessageList({ messages, currentUserId }) {
  return (
    <div className="space-y-4">
      {messages.map((message, index) => {
        const isOwn = message.sender?._id === currentUserId || message.sender === currentUserId;
        const showAvatar = !isOwn && (
          index === 0 || 
          messages[index - 1]?.sender?._id !== message.sender?._id
        );

        return (
          <div
            key={message._id || index}
            className={`flex items-end gap-2 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Avatar (only for recipient messages) */}
            {!isOwn && (
              <div className="h-8 w-8 rounded-full bg-gray-300 flex-shrink-0">
                {showAvatar && message.sender?.avatar && (
                  <div className="relative h-8 w-8 rounded-full overflow-hidden">
                    <Image
                      src={message.sender.avatar}
                      alt="Avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Message Bubble */}
            <div className={`max-w-[70%] ${isOwn ? 'items-end' : 'items-start'} flex flex-col`}>
              {/* Message Content */}
              <div
                className={`
                  rounded-2xl px-4 py-2 
                  ${isOwn
                    ? 'bg-blue-600 text-white rounded-br-sm'
                    : 'bg-white border border-gray-200 text-gray-900 rounded-bl-sm'
                  }
                `}
              >
                {/* Image Attachment */}
                {message.attachment && (
                  <div className="mb-2">
                    <div className="relative w-64 h-48 rounded-lg overflow-hidden">
                      <Image
                        src={message.attachment.url}
                        alt="Attachment"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* Text Content */}
                {message.content && (
                  <p className="text-sm whitespace-pre-wrap break-words">
                    {message.content}
                  </p>
                )}
              </div>

              {/* Timestamp and Read Status */}
              <div className={`flex items-center gap-1 mt-1 px-2 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
                <span className="text-xs text-gray-500">
                  {message.createdAt 
                    ? formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })
                    : 'Just now'
                  }
                </span>
                
                {/* Read Receipt (only for own messages) */}
                {isOwn && (
                  <span className="text-gray-500">
                    {message.read ? (
                      <CheckCheck className="h-3 w-3 text-blue-500" />
                    ) : (
                      <Check className="h-3 w-3" />
                    )}
                  </span>
                )}
              </div>
            </div>

            {/* Spacer for own messages to align avatar space */}
            {isOwn && <div className="w-8" />}
          </div>
        );
      })}
    </div>
  );
}
