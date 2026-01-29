# Cookie Consent System

This document explains the cookie consent implementation for SwapRide.

## Overview

The cookie consent system allows users to control which types of cookies they want to allow on the website. It's GDPR and privacy-law compliant and provides a user-friendly interface for managing cookie preferences.

## Components

### 1. CookieConsent Component (`/src/components/common/CookieConsent.js`)

The main component that displays the cookie banner at the bottom of the page.

**Features:**
- Shows automatically on first visit
- Remembers user preferences in localStorage
- Provides "Accept All", "Reject All", and "Customize" options
- Detailed preferences panel with toggle switches
- Backdrop overlay for better visibility

**Cookie Categories:**
- **Necessary**: Always enabled, required for basic functionality
- **Analytics**: Optional, for understanding user behavior
- **Functional**: Optional, for enhanced features and personalization
- **Marketing**: Optional, for advertising and retargeting

### 2. Cookie Consent Utility (`/src/lib/cookieConsent.js`)

Helper functions for checking and managing cookie preferences throughout the app.

**Main Functions:**
- `getCookieConsent()` - Get user's current preferences
- `isCookieCategoryEnabled(category)` - Check if a category is enabled
- `canUseAnalytics()` - Quick check for analytics cookies
- `canUseMarketing()` - Quick check for marketing cookies
- `canUseFunctional()` - Quick check for functional cookies
- `initializeAnalytics()` - Initialize analytics based on consent
- `initializeMarketing()` - Initialize marketing pixels based on consent
- `shouldRequestConsent()` - Check if consent needs renewal (after 1 year)
- `clearCookieConsent()` - Clear consent for testing

## Usage

### Checking Consent Before Using Cookies

```javascript
import { canUseAnalytics, canUseMarketing } from '@/lib/cookieConsent';

// Before initializing Google Analytics
if (canUseAnalytics()) {
  // Initialize GA
  window.gtag('config', 'GA_MEASUREMENT_ID');
}

// Before loading Facebook Pixel
if (canUseMarketing()) {
  // Load FB Pixel
  window.fbq('init', 'PIXEL_ID');
}
```

### Getting Full Preferences

```javascript
import { getCookieConsent } from '@/lib/cookieConsent';

const preferences = getCookieConsent();
console.log(preferences);
// Output: { necessary: true, analytics: true, marketing: false, functional: true }
```

### Resetting Consent (for Testing)

```javascript
import { clearCookieConsent } from '@/lib/cookieConsent';

// Clear consent and reload
clearCookieConsent();
window.location.reload();
```

## Integration Points

### 1. Root Layout (`/src/app/layout.js`)

The CookieConsent component is included in the root layout to appear on all pages:

```javascript
import CookieConsent from '@/components/common/CookieConsent';

// Inside the return statement
<CookieConsent />
```

### 2. Footer (`/src/components/layout/Footer.js`)

A "Cookie Settings" button is added to the footer to allow users to update their preferences:

```javascript
<button onClick={() => {
  localStorage.removeItem('cookieConsent');
  window.location.reload();
}}>
  Cookie Settings
</button>
```

### 3. Cookie Policy Page (`/src/app/cookies/page.js`)

A detailed page explaining what cookies are used and how to manage them.

## Storage

Cookie preferences are stored in `localStorage` with two keys:

- `cookieConsent`: JSON object with user preferences
- `cookieConsentDate`: ISO date string when consent was given

Example:
```javascript
localStorage.setItem('cookieConsent', JSON.stringify({
  necessary: true,
  analytics: true,
  marketing: false,
  functional: true
}));
localStorage.setItem('cookieConsentDate', new Date().toISOString());
```

## Consent Re-request

The system will automatically re-request consent after 1 year to comply with regulations that require periodic consent renewal.

## Testing

To test the cookie consent banner:

1. **Clear consent**: 
   - Open browser console
   - Run: `localStorage.removeItem('cookieConsent')`
   - Reload page

2. **Check current preferences**:
   - Open browser console
   - Run: `localStorage.getItem('cookieConsent')`

3. **View consent date**:
   - Open browser console
   - Run: `localStorage.getItem('cookieConsentDate')`

## Customization

### Changing Cookie Categories

Edit `/src/lib/cookieConsent.js`:

```javascript
export const COOKIE_CATEGORIES = {
  NECESSARY: 'necessary',
  ANALYTICS: 'analytics',
  MARKETING: 'marketing',
  FUNCTIONAL: 'functional',
  // Add new categories here
};
```

### Styling the Banner

Edit `/src/components/common/CookieConsent.js` and modify the Tailwind classes.

### Adding Third-Party Integrations

In the `savePreferences` function in `CookieConsent.js`:

```javascript
const savePreferences = (prefs) => {
  localStorage.setItem('cookieConsent', JSON.stringify(prefs));
  
  if (prefs.analytics) {
    // Initialize Google Analytics
    window.gtag('config', 'YOUR_GA_ID');
  }
  
  if (prefs.marketing) {
    // Initialize Facebook Pixel
    window.fbq('init', 'YOUR_PIXEL_ID');
  }
};
```

## Compliance

This implementation helps comply with:
- **GDPR** (EU General Data Protection Regulation)
- **CCPA** (California Consumer Privacy Act)
- **LGPD** (Brazilian General Data Protection Law)
- Other privacy regulations

**Note**: While this implementation provides the technical foundation, you should consult with legal counsel to ensure full compliance with applicable laws.

## Best Practices

1. **Default to Privacy**: Only necessary cookies are enabled by default
2. **Clear Communication**: Explain what each cookie type does
3. **Easy Access**: Users can change preferences at any time via footer
4. **Granular Control**: Users can enable/disable specific categories
5. **Consent Renewal**: Re-request consent annually
6. **Respect Choices**: Honor user preferences throughout the app

## Future Enhancements

- [ ] Add cookie scanner to detect all cookies automatically
- [ ] Implement server-side consent verification
- [ ] Add A/B testing for consent rates
- [ ] Create admin panel for managing cookie descriptions
- [ ] Add multi-language support for banner text
- [ ] Implement consent syncing across subdomains
