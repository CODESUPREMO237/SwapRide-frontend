import React from 'react';
import colors from '@/styles/theme';

/**
 * Button Component with consistent styling
 * Supports various variants and states
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  loading = false,
  disabled = false,
  className = '',
  type = 'button',
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center justify-center
    font-medium rounded-lg
    transition-all duration-200
    focus:outline-none focus:ring-4
    disabled:cursor-not-allowed
  `;

  const variants = {
    primary: `
      bg-blue-600 text-white
      hover:bg-blue-700
      active:bg-blue-800
      focus:ring-blue-100
      disabled:bg-gray-300 disabled:text-gray-500
    `,
    secondary: `
      bg-orange-500 text-white
      hover:bg-orange-600
      active:bg-orange-700
      focus:ring-orange-100
      disabled:bg-gray-300 disabled:text-gray-500
    `,
    outline: `
      bg-transparent text-blue-600
      border-2 border-blue-600
      hover:bg-blue-50
      active:bg-blue-100
      focus:ring-blue-100
      disabled:border-gray-300 disabled:text-gray-400 disabled:bg-transparent
    `,
    ghost: `
      bg-transparent text-gray-700
      hover:bg-gray-100
      active:bg-gray-200
      focus:ring-gray-100
      disabled:text-gray-400 disabled:bg-transparent
    `,
    danger: `
      bg-red-600 text-white
      hover:bg-red-700
      active:bg-red-800
      focus:ring-red-100
      disabled:bg-gray-300 disabled:text-gray-500
    `,
    success: `
      bg-green-600 text-white
      hover:bg-green-700
      active:bg-green-800
      focus:ring-green-100
      disabled:bg-gray-300 disabled:text-gray-500
    `,
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm gap-1.5',
    md: 'px-5 py-2.5 text-base gap-2',
    lg: 'px-6 py-3 text-lg gap-2.5',
    xl: 'px-8 py-4 text-xl gap-3',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {!loading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {!loading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </button>
  );
};

export default Button;
export { Button };
