'use client';

export function Loader({ size = 'md', className = '', fullScreen = false }) {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
    xl: 'h-16 w-16 border-4',
  };

  const spinner = (
    <div 
      className={`
        animate-spin rounded-full border-blue-600 border-t-transparent
        ${sizes[size]}
        ${className}
      `}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
}

export function LoadingOverlay({ message = 'Loading...' }) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm z-50">
      <Loader size="xl" />
      <p className="mt-4 text-gray-600 font-medium">{message}</p>
    </div>
  );
}

export default Loader;
