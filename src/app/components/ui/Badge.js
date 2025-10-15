'use client';

import { cn } from '../../lib/utils';

/**
 * Badge Component
 * Displays status indicators, labels, or tags
 *
 * @param {string} variant - Badge style ('success', 'danger', 'warning', 'info', 'default')
 * @param {string} size - Badge size ('sm', 'md', 'lg')
 * @param {ReactNode} children - Badge content
 * @param {string} className - Additional CSS classes
 */
export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200';

  const variantClasses = {
    success: 'bg-[#d1e7dd] text-[#0f5132] border border-[rgba(25,135,84,0.3)]',
    danger: 'bg-[#f8d7da] text-[#842029] border border-[rgba(220,53,69,0.3)]',
    warning: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
    info: 'bg-blue-100 text-blue-800 border border-blue-300',
    default: 'bg-gray-100 text-gray-800 border border-gray-300',
    primary: 'bg-[#e6f2ff] text-[#0056b3] border border-[#b3d7ff]'
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  };

  const combinedClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  return (
    <span className={combinedClasses} {...props}>
      {children}
    </span>
  );
}
