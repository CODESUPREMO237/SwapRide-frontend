'use client';

/**
 * Enhanced Textarea Component with Validation
 * Multi-line text input with character counter and error handling
 */
export function Textarea({
  label,
  value,
  onChange,
  placeholder,
  error,
  helperText,
  disabled = false,
  rows = 4,
  maxLength,
  showCharCount = true,
  className = '',
  required = false,
  ...props
}) {
  const hasError = !!error;
  const charCount = value?.length || 0;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-900 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
          className={`
            w-full px-4 py-3
            text-base font-normal
            bg-white
            border-2 rounded-lg
            transition-all duration-200
            resize-vertical
            placeholder:text-gray-400
            disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500
            focus:outline-none focus:ring-4
            ${hasError
              ? 'border-red-500 text-red-900 focus:border-red-500 focus:ring-red-100'
              : 'border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-100 hover:border-gray-400'
            }
          `}
          aria-invalid={hasError}
          {...props}
        />

        {showCharCount && maxLength && (
          <div className="absolute bottom-3 right-3 text-xs text-gray-400 bg-white px-1">
            {charCount} / {maxLength}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}

      {/* Helper Text */}
      {!error && helperText && (
        <p className="mt-2 text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
}

export default Textarea;
