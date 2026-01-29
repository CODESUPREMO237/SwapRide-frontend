'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';

import Button from '@/components/ui/Button';
import { Shield, AlertTriangle, CheckCircle, Lock, Users, FileText, MapPin, Eye } from 'lucide-react';

export default function SafetyTipsPage() {
  const safetyPrinciples = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Verify Before You Trust',
      description: 'Always verify user profiles, check ratings and reviews, and look for verification badges before engaging in any transaction.',
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: 'Meet in Public Places',
      description: 'Schedule all meetings in public, well-lit locations. Police stations often provide designated areas for online transaction meetups.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Bring Someone With You',
      description: 'Never meet alone. Bring a friend or family member with you when inspecting vehicles or completing swaps.',
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Document Everything',
      description: 'Keep records of all communications, agreements, and vehicle conditions. Use written contracts for all swaps.',
    },
  ];

  const beforeSwapping = [
    'Verify the seller\'s identity with government-issued ID',
    'Check vehicle history reports (CARFAX, AutoCheck, etc.)',
    'Inspect the vehicle thoroughly or hire a professional mechanic',
    'Verify the VIN matches the title and registration',
    'Test drive the vehicle in various conditions',
    'Check for liens on the vehicle',
    'Verify ownership documents are legitimate',
    'Get a written pre-purchase agreement',
  ];

  const duringMeeting = [
    'Meet during daylight hours in a public place',
    'Inform someone of your meeting location and time',
    'Keep your phone charged and accessible',
    'Trust your instincts - if something feels wrong, leave',
    'Don\'t share personal information like your home address',
    'Avoid carrying large amounts of cash',
    'Take photos of the vehicle and documents',
    'Don\'t feel pressured to make quick decisions',
  ];

  const redFlags = [
    {
      icon: '🚩',
      warning: 'Pressure to Act Quickly',
      description: 'Be wary of anyone pushing you to make immediate decisions or complete a swap without proper inspection time.',
    },
    {
      icon: '🚩',
      warning: 'Refuses to Meet in Person',
      description: 'Legitimate sellers will meet you in person. Avoid anyone who only wants to communicate remotely or ship vehicles sight unseen.',
    },
    {
      icon: '🚩',
      warning: 'Price Too Good to Be True',
      description: 'If a deal seems too good to be true, it probably is. Research fair market values before proceeding.',
    },
    {
      icon: '🚩',
      warning: 'No Documentation',
      description: 'Avoid swaps with sellers who can\'t provide proper title, registration, or maintenance records.',
    },
    {
      icon: '🚩',
      warning: 'Suspicious Payment Methods',
      description: 'Be cautious of requests for wire transfers, cryptocurrency, or gift cards. Use secure, traceable payment methods.',
    },
    {
      icon: '🚩',
      warning: 'Incomplete or Vague Listings',
      description: 'Legitimate sellers provide detailed information and multiple clear photos. Incomplete listings may hide problems.',
    },
  ];

  const securityFeatures = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'User Verification',
      description: 'We verify user identities through multiple methods to ensure authentic accounts.',
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'Review System',
      description: 'See ratings and reviews from previous transactions to gauge user trustworthiness.',
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Secure Messaging',
      description: 'All communications happen through our platform with monitoring for suspicious activity.',
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: 'Report System',
      description: 'Easily report suspicious behavior or potential scams to our trust and safety team.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-20 h-20 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-6">Safety Tips</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Your safety is our top priority. Follow these guidelines to ensure secure and successful vehicle swaps.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Core Safety Principles */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Core Safety Principles
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {safetyPrinciples.map((principle, index) => (
              <Card key={index} className="p-6">
                <div className="text-blue-600 mb-4">{principle.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {principle.title}
                </h3>
                <p className="text-gray-600">{principle.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Red Flags */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            <h2 className="text-3xl font-bold text-gray-900">
              Watch Out for Red Flags
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {redFlags.map((flag, index) => (
              <Card key={index} className="p-6 border-l-4 border-red-500">
                <div className="text-4xl mb-3">{flag.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {flag.warning}
                </h3>
                <p className="text-gray-600 text-sm">{flag.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Checklist Sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Before Swapping */}
          <Card className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <FileText className="w-6 h-6 text-blue-600" />
              Before Swapping
            </h3>
            <ul className="space-y-3">
              {beforeSwapping.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* During Meeting */}
          <Card className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Users className="w-6 h-6 text-blue-600" />
              During the Meeting
            </h3>
            <ul className="space-y-3">
              {duringMeeting.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Security Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            How SwapRide Keeps You Safe
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {securityFeatures.map((feature, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="inline-flex p-3 bg-blue-100 rounded-full text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <Card className="bg-red-50 border-2 border-red-200 p-8">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                If You Feel Unsafe
              </h3>
              <p className="text-gray-700 mb-4">
                If you ever feel uncomfortable or unsafe during a transaction:
              </p>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li>• Leave the situation immediately</li>
                <li>• Contact local authorities if you feel threatened</li>
                <li>• Report the incident to SwapRide immediately</li>
                <li>• Don't complete the transaction</li>
              </ul>
              <div className="flex gap-4">
                <Button variant="danger" size="lg" href="/contact">
                  Report an Issue
                </Button>
                <Button variant="outline" size="lg" href="/help">
                  Get Help
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Additional Resources */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Learn More About Staying Safe
          </h2>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button variant="outline" href="/help">
              Visit Help Center
            </Button>
            <Button variant="outline" href="/faq">
              Read FAQ
            </Button>
            <Button variant="outline" href="/blog">
              Safety Articles
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
