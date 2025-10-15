'use client';

import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

/**
 * Button Component
 * A versatile button component with multiple variants and sizes
 *
 * @param {string} variant - Button style variant ('primary', 'secondary', 'ghost', 'danger', 'success')
 * @param {string} size - Button size ('sm', 'md', 'lg')
 * @param {boolean} fullWidth - Whether button should take full width
 * @param {boolean} loading - Show loading state
 * @param {ReactNode} children - Button content
 * @param {string} className - Additional CSS classes
 */
const Button = forwardRef(({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  ...props
}, ref) => {

  const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-opacity-30 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden';

  const variantClasses = {
    primary: 'bg-gradient-to-r from-[#0069d9] to-[#007bff] text-white shadow-[0_4px_20px_rgba(0,123,255,0.25)] hover:shadow-[0_10px_25px_rgba(0,123,255,0.3)] hover:-translate-y-1 hover:scale-[1.02] focus:ring-primary active:scale-[0.98]',
    secondary: 'bg-white text-[#0069d9] border border-gray-200 shadow-md hover:bg-[#e6f2ff] hover:border-[#b3d7ff] hover:-translate-y-1 hover:shadow-lg focus:ring-primary-light active:scale-[0.98]',
    ghost: 'bg-transparent text-gray-600 border border-gray-300 hover:bg-gray-100 hover:text-gray-900 hover:border-gray-400 focus:ring-gray-300',
    danger: 'bg-gradient-to-r from-[#dc3545] to-[#c82333] text-white shadow-lg hover:shadow-xl hover:-translate-y-1 focus:ring-danger active:scale-[0.98]',
    success: 'bg-gradient-to-r from-[#198754] to-[#157347] text-white shadow-lg hover:shadow-xl hover:-translate-y-1 focus:ring-success active:scale-[0.98]'
  };

  const sizeClasses = {
    sm: 'text-sm px-4 py-2 h-9',
    md: 'text-base px-6 py-3 h-12',
    lg: 'text-lg px-8 py-4 h-14'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const combinedClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    widthClass,
    className
  );

  return (
    <button
      ref={ref}
      className={combinedClasses}
      disabled={disabled || loading}
      {...props}
    >
      {/* Shine effect on hover */}
      <span className="absolute inset-0 w-full h-full transition-all duration-500 ease-out opacity-0 hover:opacity-100">
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
      </span>

      {/* Loading spinner */}
      {loading && (
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}

      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
