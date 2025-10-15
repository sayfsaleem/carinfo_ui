'use client';

import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

/**
 * Input Component
 * Styled input field with various options
 *
 * @param {string} label - Input label
 * @param {string} error - Error message
 * @param {ReactNode} icon - Icon to display (left side)
 * @param {string} className - Additional CSS classes
 */
const Input = forwardRef(({
  label,
  error,
  icon,
  className = '',
  wrapperClassName = '',
  ...props
}, ref) => {
  const inputClasses = cn(
    'w-full bg-white border rounded-2xl px-5 py-3 text-base font-medium text-gray-900 placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500',
    error ? 'border-danger-500' : 'border-gray-300',
    icon ? 'pl-12' : '',
    className
  );

  return (
    <div className={cn('w-full', wrapperClassName)}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
            {icon}
          </div>
        )}

        <input
          ref={ref}
          className={inputClasses}
          {...props}
        />
      </div>

      {error && (
        <p className="mt-2 text-sm text-danger-500 font-medium">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;

/**
 * Textarea Component
 */
export const Textarea = forwardRef(({
  label,
  error,
  className = '',
  wrapperClassName = '',
  rows = 4,
  ...props
}, ref) => {
  const textareaClasses = cn(
    'w-full bg-white border rounded-2xl px-5 py-3 text-base font-medium text-gray-900 placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 resize-none',
    error ? 'border-danger-500' : 'border-gray-300',
    className
  );

  return (
    <div className={cn('w-full', wrapperClassName)}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}

      <textarea
        ref={ref}
        rows={rows}
        className={textareaClasses}
        {...props}
      />

      {error && (
        <p className="mt-2 text-sm text-danger-500 font-medium">
          {error}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';
