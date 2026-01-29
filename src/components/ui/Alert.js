'use client';

import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';

export function Alert({ 
  type = 'info', 
  title, 
  children, 
  onClose,
  className = '' 
}) {
  const types = {
    success: {
      container: 'bg-green-50 border-green-200 text-green-800',
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
    },
    error: {
      container: 'bg-red-50 border-red-200 text-red-800',
      icon: <XCircle className="h-5 w-5 text-red-600" />,
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      icon: <AlertCircle className="h-5 w-5 text-yellow-600" />,
    },
    info: {
      container: 'bg-blue-50 border-blue-200 text-blue-800',
      icon: <Info className="h-5 w-5 text-blue-600" />,
    },
  };

  const config = types[type];

  return (
    <div 
      className={`
        border rounded-lg p-4
        ${config.container}
        ${className}
      `}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          {config.icon}
        </div>
        
        <div className="flex-1">
          {title && (
            <h3 className="font-semibold mb-1">
              {title}
            </h3>
          )}
          <div className="text-sm">
            {children}
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 ml-2 p-0.5 hover:opacity-70 transition-opacity"
            aria-label="Close alert"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
