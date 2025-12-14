'use client';

import { motion } from 'framer-motion';
import { FaCircleCheck, FaCircleXmark, FaTriangleExclamation, FaCalendarDay } from 'react-icons/fa6';
import { cn, daysUntil, formatDate } from '../../lib/utils';

/**
 * StatusCard Component - REMASTERED
 * Clean, mobile-responsive status display for MOT/Tax/Mileage
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
  const daysRemaining = showDaysRemaining && date ? daysUntil(date) : null;

  const getVariant = () => {
    if (variant !== 'info') return variant;
    if (status === 'valid' || status === 'taxed') return 'success';
    if (status === 'invalid' || status === 'untaxed') return 'danger';
    if (status === 'warning' || status === 'sorn') return 'warning';
    return 'info';
  };

  const finalVariant = getVariant();

  const getStatusText = () => {
    if (status === 'valid') return 'Valid';
    if (status === 'invalid') return 'Expired';
    if (status === 'taxed') return 'Taxed';
    if (status === 'untaxed') return 'Untaxed';
    if (status === 'sorn') return 'SORN';
    if (status === 'warning') return 'Expiring';
    return status;
  };

  const getDaysText = () => {
    if (daysRemaining === null) return null;
    if (daysRemaining > 0) {
      if (daysRemaining === 1) return '1 day left';
      if (daysRemaining < 30) return `${daysRemaining} days left`;
      const months = Math.floor(daysRemaining / 30);
      return months === 1 ? '1 month left' : `${months} months left`;
    }
    if (daysRemaining === 0) return 'Expires today';
    const daysOverdue = Math.abs(daysRemaining);
    if (daysOverdue === 1) return '1 day overdue';
    if (daysOverdue < 30) return `${daysOverdue} days overdue`;
    const months = Math.floor(daysOverdue / 30);
    return months === 1 ? '1 month overdue' : `${months} months overdue`;
  };

  const variantConfig = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      iconBg: 'bg-green-500',
      text: 'text-green-700',
      badge: 'bg-green-100 text-green-700',
    },
    danger: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      iconBg: 'bg-red-500',
      text: 'text-red-700',
      badge: 'bg-red-100 text-red-700',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      iconBg: 'bg-yellow-500',
      text: 'text-yellow-700',
      badge: 'bg-yellow-100 text-yellow-700',
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      iconBg: 'bg-blue-500',
      text: 'text-blue-700',
      badge: 'bg-blue-100 text-blue-700',
    },
  };

  const config = variantConfig[finalVariant];

  const getIcon = () => {
    if (IconComponent) return <IconComponent className="text-xl text-white" />;
    switch (finalVariant) {
      case 'success': return <FaCircleCheck className="text-xl text-white" />;
      case 'danger': return <FaCircleXmark className="text-xl text-white" />;
      case 'warning': return <FaTriangleExclamation className="text-xl text-white" />;
      default: return <FaCalendarDay className="text-xl text-white" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'rounded-xl border-2 overflow-hidden transition-shadow hover:shadow-lg',
        config.bg,
        config.border
      )}
    >
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-3">
        <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', config.iconBg)}>
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <div className="flex items-center gap-2">
            {status && (
              <span className={cn('text-lg font-bold', config.text)}>
                {getStatusText()}
              </span>
            )}
            {value && !status && (
              <span className={cn('text-lg font-bold', config.text)}>
                {value}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Details */}
      {(date || subtitle || value) && (
        <div className="px-4 pb-3 pt-0">
          {date && (
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-500">
                {daysRemaining !== null && daysRemaining < 0 ? 'Expired:' : 'Expires:'}
              </span>
              <span className="font-semibold text-gray-700">{formatDate(date, 'short')}</span>
            </div>
          )}
          {daysRemaining !== null && (
            <div className={cn(
              'text-xs font-semibold px-2 py-1 rounded-full inline-block mt-1',
              daysRemaining > 30 ? 'bg-green-100 text-green-700' :
              daysRemaining > 0 ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            )}>
              {getDaysText()}
            </div>
          )}
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
      )}
    </motion.div>
  );
}
