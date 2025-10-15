'use client';

import { cn } from '../../lib/utils';

/**
 * QuickStat Component
 * Small stat display for vehicle header
 *
 * @param {Component} icon - React Icon component
 * @param {string} label - Stat label
 * @param {string} value - Stat value
 */
export default function QuickStat({ icon: IconComponent, label, value }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
      {IconComponent && (
        <div className="mb-2">
          <IconComponent className="text-2xl text-white/80 mx-auto" />
        </div>
      )}
      <div className="text-xs text-white/60 mb-1">{label}</div>
      <div className="text-lg font-bold text-white">{value}</div>
    </div>
  );
}
