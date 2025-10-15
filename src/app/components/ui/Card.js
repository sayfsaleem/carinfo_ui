'use client';

import { cn } from '../../lib/utils';

/**
 * Card Component
 * Glass-morphism styled card container with multiple variants
 *
 * @param {ReactNode} children - Card content
 * @param {string} className - Additional CSS classes
 * @param {boolean} hover - Enable hover effects
 * @param {string} variant - Card style variant
 * @param {boolean} glow - Enable glow effect on hover
 */
export default function Card({
  children,
  className = '',
  hover = false,
  variant = 'default',
  glow = false,
  ...props
}) {
  const baseClasses = 'rounded-3xl p-6 transition-all duration-300 relative';

  const variantClasses = {
    default: 'bg-white border border-gray-200 shadow-lg',
    glass: 'bg-white/70 backdrop-blur-lg border border-white/50 shadow-xl',
    bordered: 'bg-white border-2 border-gray-300 shadow-md',
    gradient: 'bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 shadow-lg',
    dark: 'bg-gray-900 border border-gray-700 text-white shadow-xl',
    success: 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 shadow-lg',
    warning: 'bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 shadow-lg',
    danger: 'bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 shadow-lg'
  };

  const hoverClasses = hover
    ? 'hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl cursor-pointer group'
    : '';

  const combinedClasses = cn(
    baseClasses,
    variantClasses[variant],
    hoverClasses,
    className
  );

  return (
    <div className={combinedClasses} {...props}>
      {/* Glow effect on hover */}
      {glow && (
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-10"></div>
      )}
      {children}
    </div>
  );
}

/**
 * CardHeader Component
 */
export function CardHeader({ children, className = '', ...props }) {
  return (
    <div className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  );
}

/**
 * CardTitle Component
 */
export function CardTitle({ children, className = '', ...props }) {
  return (
    <h3 className={cn('text-2xl font-bold text-gray-900 mb-2', className)} {...props}>
      {children}
    </h3>
  );
}

/**
 * CardDescription Component
 */
export function CardDescription({ children, className = '', ...props }) {
  return (
    <p className={cn('text-gray-600 leading-relaxed', className)} {...props}>
      {children}
    </p>
  );
}

/**
 * CardContent Component
 */
export function CardContent({ children, className = '', ...props }) {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  );
}

/**
 * CardFooter Component
 */
export function CardFooter({ children, className = '', ...props }) {
  return (
    <div className={cn('mt-6 pt-4 border-t border-gray-200', className)} {...props}>
      {children}
    </div>
  );
}
