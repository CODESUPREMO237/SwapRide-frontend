'use client';

import Image from 'next/image';
import { User } from 'lucide-react';

export function Avatar({ 
  src, 
  name, 
  size = 'md', 
  status,
  className = '',
  rounded = 'full'
}) {
  const sizeClasses = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-16 w-16 text-xl',
    '2xl': 'h-20 w-20 text-2xl',
  };

  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
  };

  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const containerClass = `
    relative inline-block
    ${sizeClasses[size]}
    ${className}
  `;

  const avatarClass = `
    ${sizeClasses[size]}
    ${roundedClasses[rounded]}
    overflow-hidden
    bg-gradient-to-br from-blue-500 to-purple-600
    flex items-center justify-center
    text-white font-semibold
  `;

  return (
    <div className={containerClass}>
      <div className={avatarClass}>
        {src ? (
          <Image
            src={src}
            alt={name || 'Avatar'}
            fill
            className="object-cover"
            sizes={`${sizeClasses[size]}`}
          />
        ) : (
          <span className="select-none">
            {name ? getInitials(name) : <User className="h-1/2 w-1/2" />}
          </span>
        )}
      </div>

      {/* Status Indicator */}
      {status && (
        <span
          className={`
            absolute bottom-0 right-0
            ${size === 'xs' || size === 'sm' ? 'h-2 w-2' : 'h-3 w-3'}
            ${roundedClasses.full}
            ${statusColors[status]}
            border-2 border-white
          `}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
}

// Avatar Group Component for displaying multiple avatars
export function AvatarGroup({ 
  avatars = [], 
  max = 3, 
  size = 'md',
  className = '' 
}) {
  const displayAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  const sizeClasses = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-16 w-16 text-xl',
  };

  return (
    <div className={`flex -space-x-2 ${className}`}>
      {displayAvatars.map((avatar, index) => (
        <div
          key={index}
          className="relative ring-2 ring-white rounded-full"
          style={{ zIndex: displayAvatars.length - index }}
        >
          <Avatar
            src={avatar.src}
            name={avatar.name}
            size={size}
            status={avatar.status}
          />
        </div>
      ))}
      
      {remainingCount > 0 && (
        <div
          className={`
            ${sizeClasses[size]}
            rounded-full
            bg-gray-200
            flex items-center justify-center
            text-gray-600 font-semibold
            ring-2 ring-white
          `}
          style={{ zIndex: 0 }}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}
