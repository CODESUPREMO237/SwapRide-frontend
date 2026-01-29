'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';

import Button from '@/components/ui/Button';
import { Shield, Lock, Eye, Database, Users, Globe } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const lastUpdated = 'January 1, 2025';

  const principles = [
    {
      icon: <Lock className="w-8 h-8" />,
      title: 'Secure by Design',
      description: 'We use industry-standard encryption and security measures to protect your data.',
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: 'Transparency',
      description: 'We\'re clear about what data we collect and how we use it.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'User Control',
      description: 'You have control over your data and can access, update, or delete it anytime.',
    },
  ];

  const sections = [
    {
      title: '1. Information We Collect',
      icon: <Database className="w-6 h-6" />,
      subsections: [
        {
          subtitle: 'Information You Provide',
          content: `• Account information (name, email, phone number, address)
• Profile information (photo, bio, preferences)
• Vehicle listings (descriptions, photos, specifications)
• Communications with other users
• Payment information (processed securely by third-party providers)
• Identity verification documents`,
        },
        {
          subtitle: 'Information Collected Automatically',
          content: `• Device information (IP address, browser type, operating system)
• Usage data (pages visited, features used, time spent)
• Location data (with your permission)
• Cookies and similar tracking technologies
• Log data and analytics`,
        },
        {
          subtitle: 'Information from Third Parties',
          content: `• Social media profile information (if you choose to connect accounts)
• Vehicle history reports (when you authorize access)
• Identity verification services
• Payment processors`,
        },
      ],
    },
    {
      title: '2. How We Use Your Information',
      icon: <Globe className="w-6 h-6" />,
      subsections: [
        {
          subtitle: 'Primary Uses',
          content: `• Provide and improve our services
• Process transactions and send notifications
• Verify user identities and prevent fraud
• Facilitate communication between users
• Personalize your experience
• Send updates about your account and transactions`,
        },
        {
          subtitle: 'Secondary Uses',
          content: `• Send marketing communications (with your consent)
• Conduct research and analytics
• Enforce our Terms of Service
• Comply with legal obligations
• Resolve disputes and provide customer support`,
        },
      ],
    },
    {
      title: '3. Information Sharing and Disclosure',
      icon: <Users className="w-6 h-6" />,
      subsections: [
        {
          subtitle: 'With Other Users',
          content: `When you create a listing or engage in transactions, certain information becomes visible to other users:
• Your public profile information
• Vehicle listings and photos
• Reviews and ratings
• Messages sent through our platform`,
        },
        {
          subtitle: 'With Service Providers',
          content: `We share information with trusted third-party service providers who help us operate our platform:
• Payment processors
• Cloud hosting services
• Analytics providers
• Customer support tools
• Marketing platforms (with your consent)`,
        },
        {
          subtitle: 'Legal Requirements',
          content: `We may disclose information when required by law or to:
• Comply with legal processes
• Protect our rights and property
• Prevent fraud or security threats
• Respond to government requests`,
        },
        {
          subtitle: 'Business Transfers',
          content: `If SwapRide is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.`,
        },
      ],
    },
    {
      title: '4. Data Security',
      icon: <Lock className="w-6 h-6" />,
      subsections: [
        {
          subtitle: 'Security Measures',
          content: `We implement comprehensive security measures to protect your information:
• SSL/TLS encryption for data transmission
• Encrypted storage of sensitive data
• Regular security audits and penetration testing
• Access controls and authentication
• Employee training on data protection
• Incident response procedures`,
        },
        {
          subtitle: 'Your Responsibility',
          content: `You can help keep your account secure by:
• Using a strong, unique password
• Enabling two-factor authentication
• Not sharing your login credentials
• Logging out on shared devices
• Reporting suspicious activity immediately`,
        },
      ],
    },
    {
      title: '5. Your Rights and Choices',
      icon: <Eye className="w-6 h-6" />,
      subsections: [
        {
          subtitle: 'Access and Update',
          content: `You can access and update your information through your account settings at any time.`,
        },
        {
          subtitle: 'Delete Your Account',
          content: `You can delete your account permanently through your settings. Note that some information may be retained as required by law or for legitimate business purposes.`,
        },
        {
          subtitle: 'Marketing Communications',
          content: `You can opt out of marketing emails by clicking "unsubscribe" in any marketing email or updating your preferences in your account settings.`,
        },
        {
          subtitle: 'Cookies',
          content: `You can control cookies through your browser settings, though this may affect your ability to use certain features.`,
        },
        {
          subtitle: 'Data Portability',
          content: `You can request a copy of your data in a machine-readable format by contacting us.`,
        },
      ],
    },
    {
      title: '6. Children\'s Privacy',
      content: `SwapRide is not intended for users under 18 years of age. We do not knowingly collect information from children. If we learn that we have collected information from a child under 18, we will delete it promptly.`,
    },
    {
      title: '7. International Data Transfers',
      content: `Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.`,
    },
    {
      title: '8. Data Retention',
      content: `We retain your information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. When you delete your account, we delete or anonymize your information, except where we must retain it for legal, tax, or audit purposes.`,
    },
    {
      title: '9. Third-Party Links',
      content: `Our platform may contain links to third-party websites. We are not responsible for the privacy practices of these websites. We encourage you to review their privacy policies.`,
    },
    {
      title: '10. Changes to This Policy',
      content: `We may update this Privacy Policy from time to time. We will notify you of significant changes by email or through a notice on our platform. Your continued use after such changes constitutes acceptance of the updated policy.`,
    },
    {
      title: '11. Contact Us',
      content: `If you have questions about this Privacy Policy or how we handle your information, please contact us at:

Email: privacy@swapride.com
Address: 123 Swap Street, San Francisco, CA 94105
Phone: +1 (234) 567-890

For privacy-related concerns or to exercise your rights, you can also write to our Data Protection Officer at the above address.`,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Shield className="w-16 h-16 mb-6" />
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-blue-100 text-lg mb-6">
            Last Updated: {lastUpdated}
          </p>
          <p className="text-xl text-blue-100">
            Your privacy is important to us. This policy explains how we collect, use, 
            and protect your personal information.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Privacy Principles */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Privacy Principles
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {principles.map((principle, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="inline-flex p-3 bg-blue-100 rounded-full text-blue-600 mb-4">
                  {principle.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {principle.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {principle.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Privacy Policy Content */}
        <Card className="mb-8">
          <div className="p-8">
            {sections.map((section, index) => (
              <div key={index} className={index !== 0 ? 'mt-10 pt-10 border-t border-gray-200' : ''}>
                <div className="flex items-center gap-3 mb-4">
                  {section.icon && (
                    <div className="text-blue-600">
                      {section.icon}
                    </div>
                  )}
                  <h2 className="text-2xl font-bold text-gray-900">
                    {section.title}
                  </h2>
                </div>
                
                {section.content && (
                  <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {section.content}
                  </div>
                )}

                {section.subsections && (
                  <div className="space-y-6">
                    {section.subsections.map((subsection, subIndex) => (
                      <div key={subIndex}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          {subsection.subtitle}
                        </h3>
                        <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                          {subsection.content}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Your Privacy Matters CTA */}
        <Card className="bg-blue-50 border-blue-200">
          <div className="p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Your Privacy Matters to Us
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              We're committed to protecting your privacy and being transparent about our practices. 
              If you have any questions or concerns, please don't hesitate to reach out.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button variant="primary" href="/contact">
                Contact Us
              </Button>
              <Button variant="outline" href="/settings">
                Privacy Settings
              </Button>
            </div>
          </div>
        </Card>

        {/* Related Links */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center text-sm">
          <Button variant="ghost" href="/terms">
            Terms of Service
          </Button>
          <Button variant="ghost" href="/faq">
            FAQ
          </Button>
          <Button variant="ghost" href="/safety">
            Safety Tips
          </Button>
        </div>
      </div>
    </div>
  );
}
