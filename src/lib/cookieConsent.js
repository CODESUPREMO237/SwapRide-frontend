/**
 * Cookie Consent Management Utility
 * Provides functions to check and manage user cookie preferences
 */

export const COOKIE_CATEGORIES = {
  NECESSARY: 'necessary',
  ANALYTICS: 'analytics',
  MARKETING: 'marketing',
  FUNCTIONAL: 'functional',
};

/**
 * Get the user's cookie consent preferences
 * @returns {Object|null} Cookie preferences object or null if not set
 */
export const getCookieConsent = () => {
  if (typeof window === 'undefined') return null;
  
  try {
    const consent = localStorage.getItem('cookieConsent');
    return consent ? JSON.parse(consent) : null;
  } catch (error) {
    console.error('Error reading cookie consent:', error);
    return null;
  }
};

/**
 * Check if a specific cookie category is enabled
 * @param {string} category - Cookie category to check
 * @returns {boolean} Whether the category is enabled
 */
export const isCookieCategoryEnabled = (category) => {
  const consent = getCookieConsent();
  
  // If no consent given yet, return false (except for necessary)
  if (!consent) {
    return category === COOKIE_CATEGORIES.NECESSARY;
  }
  
  // Necessary cookies are always enabled
  if (category === COOKIE_CATEGORIES.NECESSARY) {
    return true;
  }
  
  return consent[category] === true;
};

/**
 * Check if analytics cookies are enabled
 * @returns {boolean}
 */
export const canUseAnalytics = () => {
  return isCookieCategoryEnabled(COOKIE_CATEGORIES.ANALYTICS);
};

/**
 * Check if marketing cookies are enabled
 * @returns {boolean}
 */
export const canUseMarketing = () => {
  return isCookieCategoryEnabled(COOKIE_CATEGORIES.MARKETING);
};

/**
 * Check if functional cookies are enabled
 * @returns {boolean}
 */
export const canUseFunctional = () => {
  return isCookieCategoryEnabled(COOKIE_CATEGORIES.FUNCTIONAL);
};

/**
 * Initialize analytics based on consent
 * Call this function after consent is given or on page load
 */
export const initializeAnalytics = () => {
  if (!canUseAnalytics()) {
    console.log('Analytics disabled by user preference');
    return;
  }

  // Initialize Google Analytics or other analytics tools
  // Example:
  // if (typeof window !== 'undefined' && window.gtag) {
  //   window.gtag('config', 'GA_MEASUREMENT_ID');
  // }
  
  console.log('Analytics initialized');
};

/**
 * Initialize marketing pixels based on consent
 * Call this function after consent is given or on page load
 */
export const initializeMarketing = () => {
  if (!canUseMarketing()) {
    console.log('Marketing cookies disabled by user preference');
    return;
  }

  // Initialize Facebook Pixel, Google Ads, etc.
  // Example:
  // if (typeof window !== 'undefined' && window.fbq) {
  //   window.fbq('init', 'YOUR_PIXEL_ID');
  // }
  
  console.log('Marketing pixels initialized');
};

/**
 * Get the date when consent was given
 * @returns {Date|null} Date of consent or null
 */
export const getConsentDate = () => {
  if (typeof window === 'undefined') return null;
  
  try {
    const date = localStorage.getItem('cookieConsentDate');
    return date ? new Date(date) : null;
  } catch (error) {
    console.error('Error reading consent date:', error);
    return null;
  }
};

/**
 * Check if consent needs to be re-requested (e.g., after 1 year)
 * @returns {boolean}
 */
export const shouldRequestConsent = () => {
  const consent = getCookieConsent();
  const consentDate = getConsentDate();
  
  // No consent given yet
  if (!consent || !consentDate) {
    return true;
  }
  
  // Check if consent is older than 1 year
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  
  return consentDate < oneYearAgo;
};

/**
 * Clear cookie consent (for testing or reset)
 */
export const clearCookieConsent = () => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('cookieConsent');
  localStorage.removeItem('cookieConsentDate');
};

export default {
  COOKIE_CATEGORIES,
  getCookieConsent,
  isCookieCategoryEnabled,
  canUseAnalytics,
  canUseMarketing,
  canUseFunctional,
  initializeAnalytics,
  initializeMarketing,
  getConsentDate,
  shouldRequestConsent,
  clearCookieConsent,
};
