'use client';

import Accordion from '../ui/Accordion';
import { PRICING_FAQ } from '../../lib/constants';

/**
 * PricingFAQ Component
 * FAQ section specifically for pricing questions
 */
export default function PricingFAQ() {
  return (
    <div className="max-w-4xl mx-auto">
      <Accordion items={PRICING_FAQ} allowMultiple={false} />
    </div>
  );
}
