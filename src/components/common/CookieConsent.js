'use client';

import { useState, useEffect } from 'react';
import { X, Cookie, Shield, Settings } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, can't be disabled
    analytics: true,
    marketing: true,
    functional: true,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences
      try {
        const savedPreferences = JSON.parse(consent);
        setPreferences(savedPreferences);
      } catch (error) {
        console.error('Error loading cookie preferences:', error);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    savePreferences(allAccepted);
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    savePreferences(onlyNecessary);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    savePreferences(preferences);
    setShowBanner(false);
    setShowPreferences(false);
  };

  const savePreferences = (prefs) => {
    localStorage.setItem('cookieConsent', JSON.stringify(prefs));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    
    // Here you would typically initialize your analytics/tracking based on preferences
    if (prefs.analytics) {
      // Initialize Google Analytics or other analytics
      console.log('Analytics enabled');
    }
    if (prefs.marketing) {
      // Initialize marketing pixels
      console.log('Marketing cookies enabled');
    }
    if (prefs.functional) {
      // Initialize functional cookies
      console.log('Functional cookies enabled');
    }
  };

  const togglePreference = (key) => {
    if (key === 'necessary') return; // Can't disable necessary cookies
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed inset-x-0 bottom-0 z-50 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-6">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="flex-shrink-0">
                <Cookie className="h-8 w-8 text-blue-600" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  We value your privacy
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                  By clicking "Accept All", you consent to our use of cookies. You can manage your preferences or learn more in our{' '}
                  <a href="/privacy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>
                  {' '}and{' '}
                  <a href="/cookies" className="text-blue-600 hover:underline">
                    Cookie Policy
                  </a>
                  .
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={handleAcceptAll}
                    className="gap-2"
                  >
                    Accept All
                  </Button>
                  <Button
                    onClick={handleRejectAll}
                    variant="outline"
                  >
                    Reject All
                  </Button>
                  <Button
                    onClick={() => setShowPreferences(!showPreferences)}
                    variant="outline"
                    className="gap-2"
                  >
                    <Settings className="h-4 w-4" />
                    Customize
                  </Button>
                </div>
              </div>

              {/* Close button (optional) */}
              <button
                onClick={() => setShowBanner(false)}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Preferences Panel */}
            {showPreferences && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  Cookie Preferences
                </h4>

                <div className="space-y-4">
                  {/* Necessary Cookies */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h5 className="font-medium text-gray-900">Necessary Cookies</h5>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          Always Active
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Essential for the website to function properly. These cookies enable core functionality such as security, network management, and accessibility.
                      </p>
                    </div>
                    <div className="ml-4">
                      <div className="w-11 h-6 bg-blue-600 rounded-full opacity-50 cursor-not-allowed"></div>
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900">Analytics Cookies</h5>
                      <p className="text-sm text-gray-600 mt-1">
                        Help us understand how visitors interact with our website by collecting and reporting information anonymously.
                      </p>
                    </div>
                    <div className="ml-4">
                      <button
                        onClick={() => togglePreference('analytics')}
                        className={`relative w-11 h-6 rounded-full transition-colors ${
                          preferences.analytics ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                            preferences.analytics ? 'translate-x-5' : ''
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Functional Cookies */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900">Functional Cookies</h5>
                      <p className="text-sm text-gray-600 mt-1">
                        Enable enhanced functionality and personalization, such as remembering your preferences and settings.
                      </p>
                    </div>
                    <div className="ml-4">
                      <button
                        onClick={() => togglePreference('functional')}
                        className={`relative w-11 h-6 rounded-full transition-colors ${
                          preferences.functional ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                            preferences.functional ? 'translate-x-5' : ''
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900">Marketing Cookies</h5>
                      <p className="text-sm text-gray-600 mt-1">
                        Used to track visitors across websites to display relevant ads and encourage them to engage with our content.
                      </p>
                    </div>
                    <div className="ml-4">
                      <button
                        onClick={() => togglePreference('marketing')}
                        className={`relative w-11 h-6 rounded-full transition-colors ${
                          preferences.marketing ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                            preferences.marketing ? 'translate-x-5' : ''
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <Button onClick={handleSavePreferences}>
                    Save Preferences
                  </Button>
                  <Button
                    onClick={() => setShowPreferences(false)}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {showBanner && (
        <div className="fixed inset-0 bg-black/20 z-40 backdrop-blur-sm" />
      )}
    </>
  );
}
