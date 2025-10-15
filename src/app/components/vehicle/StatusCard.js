'use client';

import { motion } from 'framer-motion';
import { FaCircleCheck, FaCircleXmark, FaTriangleExclamation, FaCalendarDay } from 'react-icons/fa6';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { cn, daysUntil, formatDate } from '../../lib/utils';

/**
 * StatusCard Component
 * Displays MOT/Tax/Mileage status with visual indicators
 *
 * @param {string} title - Card title (e.g., "MOT Status")
 * @param {string} status - Status value ('valid', 'invalid', 'taxed', 'untaxed', 'sorn', 'warning')
 * @param {string} date - Date string for expiry/due date
 * @param {string} value - Main value to display (e.g., mileage)
 * @param {string} subtitle - Additional info text
 * @param {string} icon - Icon component to display
 * @param {string} variant - Color variant ('success', 'danger', 'warning', 'info')
 * @param {boolean} showDaysRemaining - Show countdown or overdue days
 */
export default function StatusCard({
  title,
  status,
  date,
  value,
  subtitle,
  icon: IconComponent,
  variant = 'info',
  showDaysRemaining = false
}) {
  // Calculate days remaining if date provided
  const daysRemaining = showDaysRemaining && date ? daysUntil(date) : null;

  // Determine variant based on status if not explicitly provided
  const getVariant = () => {
    if (variant !== 'info') return variant;

    if (status === 'valid' || status === 'taxed') return 'success';
    if (status === 'invalid' || status === 'untaxed') return 'danger';
    if (status === 'warning' || status === 'sorn') return 'warning';

    return 'info';
  };

  const finalVariant = getVariant();

  // Icon based on variant
  const getIcon = () => {
    if (IconComponent) return <IconComponent className="text-3xl" />;

    switch (finalVariant) {
      case 'success':
        return <FaCircleCheck className="text-3xl" />;
      case 'danger':
        return <FaCircleXmark className="text-3xl" />;
      case 'warning':
        return <FaTriangleExclamation className="text-3xl" />;
      default:
        return <FaCalendarDay className="text-3xl" />;
    }
  };

  // Status badge text
  const getStatusText = () => {
    if (status === 'valid') return 'Valid';
    if (status === 'invalid') return 'Expired';
    if (status === 'taxed') return 'Taxed';
    if (status === 'untaxed') return 'Untaxed';
    if (status === 'sorn') return 'SORN';
    if (status === 'warning') return 'Expiring Soon';
    return status;
  };

  // Days remaining text
  const getDaysText = () => {
    if (daysRemaining === null) return null;

    if (daysRemaining > 0) {
      if (daysRemaining === 1) return '1 day remaining';
      if (daysRemaining < 30) return `${daysRemaining} days remaining`;

      const months = Math.floor(daysRemaining / 30);
      if (months === 1) return '1 month remaining';
      return `${months} months remaining`;
    }

    if (daysRemaining === 0) return 'Expires today';

    const daysOverdue = Math.abs(daysRemaining);
    if (daysOverdue === 1) return '1 day overdue';
    if (daysOverdue < 30) return `${daysOverdue} days overdue`;

    const months = Math.floor(daysOverdue / 30);
    if (months === 1) return '1 month overdue';
    return `${months} months overdue`;
  };

  // Variant styles
  const variantStyles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-700',
      icon: 'text-green-600',
      badge: 'success'
    },
    danger: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-700',
      icon: 'text-red-600',
      badge: 'danger'
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-700',
      icon: 'text-yellow-600',
      badge: 'warning'
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-700',
      icon: 'text-blue-600',
      badge: 'info'
    }
  };

  const styles = variantStyles[finalVariant];

  // Calculate progress percentage for visual indicator
  const getProgressPercentage = () => {
    if (!showDaysRemaining || daysRemaining === null) return null;

    // Assume 365 days as max
    const maxDays = 365;
    if (daysRemaining < 0) return 0;
    if (daysRemaining > maxDays) return 100;
    return (daysRemaining / maxDays) * 100;
  };

  const progressPercentage = getProgressPercentage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative group"
    >
      {/* Glow effect on hover */}
      <div className={cn(
        'absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 blur transition duration-500',
        finalVariant === 'success' && 'bg-gradient-to-r from-green-400 to-emerald-600',
        finalVariant === 'danger' && 'bg-gradient-to-r from-red-400 to-rose-600',
        finalVariant === 'warning' && 'bg-gradient-to-r from-yellow-400 to-orange-600',
        finalVariant === 'info' && 'bg-gradient-to-r from-blue-400 to-indigo-600'
      )}></div>

      <Card
        className={cn(
          'relative border-2 transition-all duration-300 group-hover:shadow-2xl',
          styles.bg,
          styles.border
        )}
      >
        <div className="flex items-start gap-4">
          {/* Icon with gradient background */}
          <div className={cn(
            'w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300',
            finalVariant === 'success' && 'bg-gradient-to-br from-green-400 to-emerald-600',
            finalVariant === 'danger' && 'bg-gradient-to-br from-red-400 to-rose-600',
            finalVariant === 'warning' && 'bg-gradient-to-br from-yellow-400 to-orange-600',
            finalVariant === 'info' && 'bg-gradient-to-br from-blue-400 to-indigo-600',
            'text-white'
          )}>
            {getIcon()}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Title and Status Badge */}
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-bold text-gray-900">{title}</h3>
              {status && (
                <Badge variant={styles.badge}>{getStatusText()}</Badge>
              )}
            </div>

            {/* Main Value */}
            {value && (
              <p className={cn('text-2xl font-bold mb-1', styles.text)}>
                {value}
              </p>
            )}

            {/* Date */}
            {date && (
              <p className="text-gray-600 text-sm mb-1">
                <span className="font-medium">
                  {daysRemaining !== null && daysRemaining < 0 ? 'Expired:' : 'Expires:'}
                </span>{' '}
                {formatDate(date, 'short')}
              </p>
            )}

            {/* Progress Bar and Days Remaining */}
            {daysRemaining !== null && progressPercentage !== null && (
              <div className="mt-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className={cn(
                        'h-full rounded-full',
                        daysRemaining > 90 && 'bg-gradient-to-r from-green-500 to-emerald-600',
                        daysRemaining > 30 && daysRemaining <= 90 && 'bg-gradient-to-r from-yellow-500 to-orange-600',
                        daysRemaining <= 30 && daysRemaining > 0 && 'bg-gradient-to-r from-orange-500 to-red-600',
                        daysRemaining <= 0 && 'bg-gradient-to-r from-red-600 to-rose-700'
                      )}
                    ></motion.div>
                  </div>
                  <span className={cn(
                    'text-sm font-bold whitespace-nowrap',
                    daysRemaining > 30 ? styles.text :
                    daysRemaining > 0 ? 'text-yellow-700' :
                    'text-red-700'
                  )}>
                    {getDaysText()}
                  </span>
                </div>
              </div>
            )}

            {/* Subtitle */}
            {subtitle && (
              <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
