import React, { forwardRef } from 'react';

/**
 * Input component for form elements
 * @param {Object} props
 * @param {string} props.label - Input label
 * @param {string} props.type - Input type (text, email, password, etc.)
 * @param {string} props.error - Error message
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.icon - Icon to display in the input
 */
const Input = forwardRef(({ 
  label, 
  type = 'text', 
  error, 
  className = '', 
  icon,
  ...props 
}, ref) => {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            {icon}
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          className={`
            w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 
            focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500
            dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-brand-400 dark:focus:ring-brand-400
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-500' : ''}
          `}
          {...props}
        />
      </div>
      
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;