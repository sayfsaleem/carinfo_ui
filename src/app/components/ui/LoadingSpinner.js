'use client';

import { cn } from '../../lib/utils';

/**
 * LoadingSpinner Component
 * Displays a loading spinner with optional text
 *
 * @param {string} size - Spinner size ('sm', 'md', 'lg')
 * @param {string} text - Loading text to display
 * @param {boolean} fullScreen - Whether to show as full screen loader
 * @param {string} className - Additional CSS classes
 */
export default function LoadingSpinner({
  size = 'md',
  text = 'Loading...',
  fullScreen = false,
  className = ''
}) {
  const sizeClasses = {
    sm: 'w-8 h-8 border-2',
    md: 'w-12 h-12 border-4',
    lg: 'w-16 h-16 border-4'
  };

  const spinner = (
    <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
      <div
        className={cn(
          'animate-spin rounded-full border-gray-200 border-t-primary-500',
          sizeClasses[size]
        )}
        role="status"
        aria-label="Loading"
      />
      {text && (
        <p className="text-gray-600 text-lg font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
}

/**
 * Skeleton Loader Component
 * For loading state placeholders
 */
export function Skeleton({ className = '', variant = 'default' }) {
  const variantClasses = {
    default: 'bg-gray-200',
    light: 'bg-gray-100',
    card: 'bg-gray-200 rounded-3xl p-6'
  };

  return (
    <div
      className={cn(
        'animate-pulse rounded-lg',
        variantClasses[variant],
        className
      )}
      aria-hidden="true"
    />
  );
}
