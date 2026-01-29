import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Cookie, Shield, Settings, Info } from 'lucide-react';

export const metadata = {
  title: 'Cookie Policy - SwapRide',
  description: 'Learn about how SwapRide uses cookies and similar technologies.',
};

export default function CookiesPage() {
  const cookieTypes = [
    {
      icon: Shield,
      title: 'Essential Cookies',
      description: 'Required for the website to function properly. These cannot be disabled.',
      examples: [
        'Authentication and security',
        'Session management',
        'Load balancing',
        'Form submission data',
      ],
      duration: 'Session or up to 1 year',
    },
    {
      icon: Settings,
      title: 'Functional Cookies',
      description: 'Enable enhanced functionality and personalization.',
      examples: [
        'Language preferences',
        'User interface customization',
        'Recent searches',
        'Saved filters and settings',
      ],
      duration: 'Up to 2 years',
    },
    {
      icon: Info,
      title: 'Analytics Cookies',
      description: 'Help us understand how visitors use our website.',
      examples: [
        'Page views and interactions',
        'Time spent on pages',
        'Navigation patterns',
        'Error tracking',
      ],
      duration: 'Up to 2 years',
    },
    {
      icon: Cookie,
      title: 'Marketing Cookies',
      description: 'Used to deliver relevant advertisements and track campaign performance.',
      examples: [
        'Ad targeting',
        'Campaign effectiveness',
        'Social media integration',
        'Retargeting',
      ],
      duration: 'Up to 1 year',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Cookie className="w-10 h-10" />
              <h1 className="text-4xl md:text-5xl font-bold">Cookie Policy</h1>
            </div>
            <p className="text-xl text-blue-100">
              Last Updated: January 27, 2026
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What Are Cookies?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed mb-4">
                Cookies are small text files that are placed on your device when you visit our website. 
                They help us provide you with a better experience by remembering your preferences and 
                understanding how you use our platform.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We use cookies and similar technologies like web beacons, pixels, and local storage 
                to enhance your experience, analyze site usage, and deliver personalized content.
              </p>
            </CardContent>
          </Card>

          {/* Types of Cookies */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Types of Cookies We Use</h2>
            <div className="space-y-6">
              {cookieTypes.map((type, index) => {
                const Icon = type.icon;
                return (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <Icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {type.title}
                          </h3>
                          <p className="text-gray-600 mb-3">
                            {type.description}
                          </p>
                          <div className="mb-3">
                            <p className="text-sm font-medium text-gray-700 mb-2">Examples:</p>
                            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                              {type.examples.map((example, i) => (
                                <li key={i}>{example}</li>
                              ))}
                            </ul>
                          </div>
                          <p className="text-sm text-gray-500">
                            <strong>Duration:</strong> {type.duration}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Third-Party Cookies */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Third-Party Cookies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed mb-4">
                We work with trusted third-party service providers who may also set cookies on your device. 
                These include:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li><strong>Google Analytics</strong> - To understand how visitors use our site</li>
                <li><strong>Facebook Pixel</strong> - For advertising and analytics</li>
                <li><strong>Stripe</strong> - For secure payment processing</li>
                <li><strong>Intercom</strong> - For customer support chat</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                These third parties have their own privacy policies and cookie policies. We encourage 
                you to review them to understand how they use your information.
              </p>
            </CardContent>
          </Card>

          {/* Managing Cookies */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Managing Your Cookie Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-600">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Cookie Settings</h4>
                  <p className="leading-relaxed">
                    You can manage your cookie preferences through our cookie consent banner that 
                    appears when you first visit our site. You can also update your preferences at 
                    any time by clicking the "Cookie Settings" link in the footer.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Browser Settings</h4>
                  <p className="leading-relaxed mb-2">
                    Most web browsers allow you to control cookies through their settings. You can:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Block all cookies</li>
                    <li>Accept only first-party cookies</li>
                    <li>Delete cookies when you close your browser</li>
                    <li>View and delete individual cookies</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Important Note</h4>
                  <p className="leading-relaxed">
                    Blocking or deleting cookies may impact your experience on our website. 
                    Essential cookies are required for basic functionality, and disabling them 
                    may prevent you from using certain features.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Do Not Track */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Do Not Track Signals</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                Some browsers include a "Do Not Track" (DNT) feature that signals to websites that 
                you do not want your online activity tracked. We respect DNT signals and will not 
                track your activity when this feature is enabled in your browser.
              </p>
            </CardContent>
          </Card>

          {/* Updates */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Updates to This Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in our 
                practices or applicable laws. We will notify you of any material changes by 
                posting the updated policy on this page and updating the "Last Updated" date.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Questions About Cookies?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have any questions about our use of cookies or this policy, please contact us:
              </p>
              <div className="space-y-2 text-gray-600">
                <p><strong>Email:</strong> privacy@swapride.com</p>
                <p><strong>Mail:</strong> SwapRide, Inc., 123 Market Street, San Francisco, CA 94103</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Related Links */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Related Policies
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="/privacy"
                className="block p-6 border border-gray-200 rounded-lg hover:border-blue-600 hover:shadow-md transition-all text-center"
              >
                <h3 className="font-semibold text-gray-900 mb-2">Privacy Policy</h3>
                <p className="text-sm text-gray-600">
                  Learn how we collect and use your data
                </p>
              </a>
              <a
                href="/terms"
                className="block p-6 border border-gray-200 rounded-lg hover:border-blue-600 hover:shadow-md transition-all text-center"
              >
                <h3 className="font-semibold text-gray-900 mb-2">Terms of Service</h3>
                <p className="text-sm text-gray-600">
                  Read our terms and conditions
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
