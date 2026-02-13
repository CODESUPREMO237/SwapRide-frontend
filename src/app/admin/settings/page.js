'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Loader } from '@/components/ui/Loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { 
  Settings as SettingsIcon,
  Save,
  ToggleLeft,
  ToggleRight,
  Globe,
  Shield,
  Bell,
  Mail,
  DollarSign,
  AlertCircle
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [features, setFeatures] = useState({
    enableAIPricing: false,
    enableEscrow: false,
    enableIdVerification: false,
    enableVinValidation: false,
    enableLiveChat: true,
    enableEmailNotifications: true,
    enablePushNotifications: false,
    enableSwapFee: false
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/settings');
      setSettings(response.data.data);
      
      // Get feature flags
      const featuresResponse = await api.get('/admin/settings/features');
      if (featuresResponse.data.data) {
        setFeatures(featuresResponse.data.data);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    try {
      setSaving(true);
      await api.put('/admin/settings', settings);
      await api.patch('/admin/settings/features', features);
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const toggleFeature = (feature) => {
    setFeatures(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader size="xl" />
      </div>
    );
  }

  const featuresList = [
    {
      key: 'enableAIPricing',
      label: 'AI-Powered Pricing',
      description: 'Use AI to suggest optimal prices for listings',
      icon: DollarSign,
      color: 'blue'
    },
    {
      key: 'enableEscrow',
      label: 'Escrow Service',
      description: 'Enable secure escrow for high-value transactions',
      icon: Shield,
      color: 'green'
    },
    {
      key: 'enableIdVerification',
      label: 'ID Verification',
      description: 'Require identity verification for users',
      icon: Shield,
      color: 'purple'
    },
    {
      key: 'enableVinValidation',
      label: 'VIN Validation',
      description: 'Validate vehicle identification numbers',
      icon: AlertCircle,
      color: 'orange'
    },
    {
      key: 'enableLiveChat',
      label: 'Live Chat Support',
      description: 'Enable live chat widget for customer support',
      icon: Mail,
      color: 'blue'
    },
    {
      key: 'enableEmailNotifications',
      label: 'Email Notifications',
      description: 'Send email notifications to users',
      icon: Mail,
      color: 'green'
    },
    {
      key: 'enablePushNotifications',
      label: 'Push Notifications',
      description: 'Send push notifications to users',
      icon: Bell,
      color: 'purple'
    },
    {
      key: 'enableSwapFee',
      label: 'Swap Transaction Fee',
      description: 'Charge a fee for completed swaps',
      icon: DollarSign,
      color: 'orange'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">System Settings</h1>
        <p className="text-gray-600">Configure platform settings and features</p>
      </div>

      {/* Feature Flags */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ToggleLeft className="h-5 w-5 text-blue-600" />
            Feature Flags
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {featuresList.map((feature) => {
              const Icon = feature.icon;
              const isEnabled = features[feature.key];

              return (
                <div
                  key={feature.key}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg bg-${feature.color}-100`}>
                      <Icon className={`h-5 w-5 text-${feature.color}-600`} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">{feature.label}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleFeature(feature.key)}
                    className="ml-4"
                  >
                    {isEnabled ? (
                      <ToggleRight className="h-8 w-8 text-green-600" />
                    ) : (
                      <ToggleLeft className="h-8 w-8 text-gray-400" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* General Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Platform Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-600" />
              Platform Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Platform Name
                </label>
                <input
                  type="text"
                  value={settings?.platformName || 'SwapRide'}
                  onChange={(e) => setSettings({...settings, platformName: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Support Email
                </label>
                <input
                  type="email"
                  value={settings?.supportEmail || 'tchabeustephane2@gmail.com'}
                  onChange={(e) => setSettings({...settings, supportEmail: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  value={settings?.contactPhone || '+237 XXX XXX XXX'}
                  onChange={(e) => setSettings({...settings, contactPhone: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maintenance Mode
                </label>
                <select
                  value={settings?.maintenanceMode || 'off'}
                  onChange={(e) => setSettings({...settings, maintenanceMode: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="off">Off</option>
                  <option value="on">On</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Financial Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Commission Rate (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={settings?.commissionRate || 5}
                  onChange={(e) => setSettings({...settings, commissionRate: parseFloat(e.target.value)})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Swap Fee (XAF)
                </label>
                <input
                  type="number"
                  min="0"
                  value={settings?.swapFee || 0}
                  onChange={(e) => setSettings({...settings, swapFee: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Listing Price (XAF)
                </label>
                <input
                  type="number"
                  min="0"
                  value={settings?.featuredListingPrice || 5000}
                  onChange={(e) => setSettings({...settings, featuredListingPrice: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency
                </label>
                <select
                  value={settings?.currency || 'XAF'}
                  onChange={(e) => setSettings({...settings, currency: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="XAF">XAF - Central African CFA Franc</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Limits & Restrictions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-purple-600" />
            Limits & Restrictions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Images per Listing
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={settings?.maxImagesPerListing || 10}
                onChange={(e) => setSettings({...settings, maxImagesPerListing: parseInt(e.target.value)})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Listings per User
              </label>
              <input
                type="number"
                min="1"
                value={settings?.maxListingsPerUser || 50}
                onChange={(e) => setSettings({...settings, maxListingsPerUser: parseInt(e.target.value)})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Listing Duration (days)
              </label>
              <input
                type="number"
                min="1"
                value={settings?.listingDuration || 90}
                onChange={(e) => setSettings({...settings, listingDuration: parseInt(e.target.value)})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSaveSettings}
          disabled={saving}
          className="gap-2"
          size="lg"
        >
          {saving ? (
            <>
              <Loader size="sm" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-5 w-5" />
              Save Settings
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
