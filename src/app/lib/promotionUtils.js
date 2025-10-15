'use client';

/**
 * Promotion Utilities
 * Smart logic for showing tier promotions and popups
 */

import { PRICING_TIERS } from './demoData';

// LocalStorage keys
const STORAGE_KEYS = {
  POPUP_DISMISSED: 'promo-popup-dismissed',
  BANNER_DISMISSED: 'promo-banner-dismissed',
  EXIT_INTENT_SHOWN: 'promo-exit-intent-shown',
  LAST_PROMOTION_SHOWN: 'promo-last-shown',
  LOCKED_FEATURES_VIEWED: 'promo-locked-views',
  SESSION_POPUPS_COUNT: 'promo-session-count'
};

// Constants
const MAX_POPUPS_PER_SESSION = 1;
const POPUP_COOLDOWN_DAYS = 7;
const TIME_BEFORE_BANNER = 30000; // 30 seconds
const SCROLL_DEPTH_TRIGGER = 60; // 60% of page

/**
 * Check if enough time has passed since last dismissal
 */
export function hasPassedCooldown(key, days = POPUP_COOLDOWN_DAYS) {
  try {
    const dismissed = localStorage.getItem(key);
    if (!dismissed) return true;

    const dismissedDate = new Date(dismissed);
    const now = new Date();
    const daysPassed = (now - dismissedDate) / (1000 * 60 * 60 * 24);

    return daysPassed >= days;
  } catch (error) {
    console.error('Error checking cooldown:', error);
    return true;
  }
}

/**
 * Check if popup can be shown (respects session limits)
 */
export function canShowPopup(type) {
  try {
    // Check if already dismissed
    const dismissKey = `${STORAGE_KEYS.POPUP_DISMISSED}-${type}`;
    if (!hasPassedCooldown(dismissKey)) {
      return false;
    }

    // Check session popup count
    const sessionCount = parseInt(sessionStorage.getItem(STORAGE_KEYS.SESSION_POPUPS_COUNT) || '0');
    if (sessionCount >= MAX_POPUPS_PER_SESSION) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error checking popup availability:', error);
    return false;
  }
}

/**
 * Mark popup as shown (increment session counter)
 */
export function markPopupShown(type) {
  try {
    const sessionCount = parseInt(sessionStorage.getItem(STORAGE_KEYS.SESSION_POPUPS_COUNT) || '0');
    sessionStorage.setItem(STORAGE_KEYS.SESSION_POPUPS_COUNT, (sessionCount + 1).toString());
  } catch (error) {
    console.error('Error marking popup shown:', error);
  }
}

/**
 * Dismiss popup/banner (sets localStorage)
 */
export function dismissPromotion(type, days = POPUP_COOLDOWN_DAYS) {
  try {
    const dismissKey = `${STORAGE_KEYS.POPUP_DISMISSED}-${type}`;
    localStorage.setItem(dismissKey, new Date().toISOString());
  } catch (error) {
    console.error('Error dismissing promotion:', error);
  }
}

/**
 * Track locked feature view
 */
export function trackLockedFeatureView(feature) {
  try {
    const views = JSON.parse(sessionStorage.getItem(STORAGE_KEYS.LOCKED_FEATURES_VIEWED) || '[]');
    if (!views.includes(feature)) {
      views.push(feature);
      sessionStorage.setItem(STORAGE_KEYS.LOCKED_FEATURES_VIEWED, JSON.stringify(views));
    }
    return views.length;
  } catch (error) {
    console.error('Error tracking feature view:', error);
    return 0;
  }
}

/**
 * Get number of locked features viewed
 */
export function getLockedFeaturesViewedCount() {
  try {
    const views = JSON.parse(sessionStorage.getItem(STORAGE_KEYS.LOCKED_FEATURES_VIEWED) || '[]');
    return views.length;
  } catch (error) {
    return 0;
  }
}

/**
 * Should show promotion based on context
 */
export function shouldShowPromotion(context) {
  const {
    tier,
    timeOnPage = 0,
    scrollDepth = 0,
    lockedFeaturesViewed = 0,
    checksThisSession = 0
  } = context;

  // Gold users don't need promotions
  if (tier === PRICING_TIERS.GOLD) {
    return false;
  }

  // High priority: User clicked on 2+ locked features
  if (lockedFeaturesViewed >= 2 && canShowPopup('comparison')) {
    return { type: 'comparison-popup', priority: 'high', tier };
  }

  // Medium priority: Been on page for 30+ seconds
  if (timeOnPage > TIME_BEFORE_BANNER && canShowPopup('floating-banner')) {
    return { type: 'floating-banner', priority: 'medium', tier };
  }

  // Low priority: Scrolled past 60% (viewing locked content)
  if (scrollDepth > SCROLL_DEPTH_TRIGGER && canShowPopup('inline-prompt')) {
    return { type: 'inline-prompt', priority: 'low', tier };
  }

  return false;
}

/**
 * Check if banner should be shown
 */
export function shouldShowBanner(tier) {
  if (tier === PRICING_TIERS.GOLD) return false;

  const dismissKey = `${STORAGE_KEYS.BANNER_DISMISSED}`;
  return hasPassedCooldown(dismissKey, 1); // Show again after 1 day
}

/**
 * Dismiss banner
 */
export function dismissBanner() {
  try {
    localStorage.setItem(STORAGE_KEYS.BANNER_DISMISSED, new Date().toISOString());
  } catch (error) {
    console.error('Error dismissing banner:', error);
  }
}

/**
 * Check if exit intent should be shown
 */
export function shouldShowExitIntent(tier) {
  if (tier === PRICING_TIERS.GOLD) return false;

  try {
    // Only show once per session
    const shown = sessionStorage.getItem(STORAGE_KEYS.EXIT_INTENT_SHOWN);
    if (shown) return false;

    // Check if dismissed recently
    const dismissKey = `${STORAGE_KEYS.POPUP_DISMISSED}-exit-intent`;
    if (!hasPassedCooldown(dismissKey, 3)) return false; // 3 day cooldown

    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Mark exit intent as shown
 */
export function markExitIntentShown() {
  try {
    sessionStorage.setItem(STORAGE_KEYS.EXIT_INTENT_SHOWN, 'true');
  } catch (error) {
    console.error('Error marking exit intent:', error);
  }
}

/**
 * Get target tier for current user
 */
export function getTargetTier(currentTier) {
  switch (currentTier) {
    case PRICING_TIERS.BASIC:
      return PRICING_TIERS.SILVER;
    case PRICING_TIERS.SILVER:
      return PRICING_TIERS.GOLD;
    default:
      return null;
  }
}

/**
 * Get features for target tier
 */
export function getTargetTierFeatures(currentTier) {
  const targetTier = getTargetTier(currentTier);

  if (targetTier === PRICING_TIERS.SILVER) {
    return [
      'Full MOT History (6+ years)',
      'All Test Details & Advisories',
      'Mileage Progression Chart',
      'Environmental Data',
      'Export/Import History',
      'Previous Keeper Count'
    ];
  }

  if (targetTier === PRICING_TIERS.GOLD) {
    return [
      'Complete Keeper History',
      'Ownership Duration Timeline',
      'Professional Valuation',
      'Additional Mileage Records',
      'Mileage Anomaly Detection',
      'Priority Support (24h)'
    ];
  }

  return [];
}

/**
 * Get pricing for target tier
 */
export function getTargetTierPricing(currentTier) {
  const targetTier = getTargetTier(currentTier);

  if (targetTier === PRICING_TIERS.SILVER) {
    return {
      price: '£2.99',
      period: '/month',
      annual: 'Save 40% with annual billing',
      savings: '£14.36/year'
    };
  }

  if (targetTier === PRICING_TIERS.GOLD) {
    return {
      price: '£5.99',
      period: '/month',
      annual: 'Save 40% with annual billing',
      savings: '£28.76/year',
      upgradeFrom: '£3.00/month more'
    };
  }

  return null;
}

/**
 * Get promotion messaging based on context
 */
export function getPromotionMessage(currentTier, context = 'default') {
  const targetTier = getTargetTier(currentTier);

  if (currentTier === PRICING_TIERS.BASIC) {
    const messages = {
      'default': 'See the full story - Upgrade to Silver',
      'unlock-mot-history': 'Unlock 6+ years of MOT history for just £2.99/month',
      'popular': '95% of users choose Silver for complete vehicle insights',
      'compare': 'What are you missing? Compare plans',
      'free-badge': 'FREE forever - upgrade only when you need more'
    };
    return messages[context] || messages.default;
  }

  if (currentTier === PRICING_TIERS.SILVER) {
    const messages = {
      'default': 'Complete your report - Upgrade to Gold',
      'unlock-valuation': 'Add professional valuation for £3 more',
      'insights': 'Gold users see 40% more vehicle insights',
      'unlock-everything': 'Unlock everything with Gold - £5.99/month',
      'keeper-history': 'See complete ownership timeline with Gold'
    };
    return messages[context] || messages.default;
  }

  return null;
}

/**
 * Use scroll detection hook
 */
export function useScrollDepth() {
  if (typeof window === 'undefined') return 0;

  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;

  return docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
}

/**
 * Use time on page hook
 */
export function useTimeOnPage() {
  if (typeof window === 'undefined') return 0;

  const startTime = Date.now();
  return () => Date.now() - startTime;
}
