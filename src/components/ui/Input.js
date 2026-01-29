import React, { forwardRef } from 'react';
import colors from '@/styles/theme';

/**
 * Input Component with Validation
 * Supports various input types with consistent styling and error handling
 */
const Input = forwardRef(({
  label,
  error,
  helperText,
  required = false,
  className = '',
  leftIcon,
  rightIcon,
  type = 'text',
  ...props
}, ref) => {
  const hasError = !!error;
  
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-900 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          className={`
            w-full px-4 py-3 
            text-base font-normal
            bg-white
            border-2 rounded-lg
            transition-all duration-200
            placeholder:text-gray-400
            disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500
            focus:outline-none focus:ring-4
            ${hasError
              ? 'border-red-500 text-red-900 focus:border-red-500 focus:ring-red-100'
              : 'border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-100 hover:border-gray-400'
            }
            ${leftIcon ? 'pl-11' : ''}
            ${rightIcon ? 'pr-11' : ''}
            ${className}
          `}
          aria-invalid={hasError}
          aria-describedby={error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>
      
      {error && (
        <p id={`${props.id}-error`} className="mt-2 text-sm text-red-600 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      
      {!error && helperText && (
        <p id={`${props.id}-helper`} className="mt-2 text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

/**
 * Textarea Component with Validation
 */
export const Textarea = forwardRef(({
  label,
  error,
  helperText,
  required = false,
  className = '',
  rows = 4,
  maxLength,
  showCharCount = false,
  value = '',
  ...props
}, ref) => {
  const hasError = !!error;
  const charCount = value?.length || 0;
  
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-900 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <textarea
          ref={ref}
          rows={rows}
          maxLength={maxLength}
          value={value}
          className={`
            w-full px-4 py-3 
            text-base font-normal
            bg-white
            border-2 rounded-lg
            transition-all duration-200
            placeholder:text-gray-400
            disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500
            focus:outline-none focus:ring-4
            resize-vertical
            ${hasError
              ? 'border-red-500 text-red-900 focus:border-red-500 focus:ring-red-100'
              : 'border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-100 hover:border-gray-400'
            }
            ${className}
          `}
          aria-invalid={hasError}
          {...props}
        />
        
        {showCharCount && maxLength && (
          <div className="absolute bottom-3 right-3 text-xs text-gray-400">
            {charCount} / {maxLength}
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      
      {!error && helperText && (
        <p className="mt-2 text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

/**
 * Select Component with Validation
 */
export const Select = forwardRef(({
  label,
  error,
  helperText,
  required = false,
  className = '',
  children,
  placeholder,
  ...props
}, ref) => {
  const hasError = !!error;
  
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-900 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <select
          ref={ref}
          className={`
            w-full px-4 py-3 pr-10
            text-base font-normal
            bg-white
            border-2 rounded-lg
            transition-all duration-200
            appearance-none
            disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500
            focus:outline-none focus:ring-4
            ${hasError
              ? 'border-red-500 text-red-900 focus:border-red-500 focus:ring-red-100'
              : 'border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-100 hover:border-gray-400'
            }
            ${!props.value && placeholder ? 'text-gray-400' : ''}
            ${className}
          `}
          aria-invalid={hasError}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>
        
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      
      {!error && helperText && (
        <p className="mt-2 text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Input;
export { Input };
