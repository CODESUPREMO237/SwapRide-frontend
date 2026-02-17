'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';

import Button from '@/components/ui/Button';
import { FileText, AlertCircle } from 'lucide-react';

export default function TermsOfServicePage() {
  const lastUpdated = 'January 1, 2025';

  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: `By accessing and using SwapRide ("the Platform"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Platform. We reserve the right to modify these terms at any time, and your continued use constitutes acceptance of any changes.`,
    },
    {
      title: '2. Description of Service',
      content: `SwapRide is a peer-to-peer marketplace platform that facilitates vehicle and parts trading between users. We provide the platform and tools for users to connect, but we are not a party to any transactions between users. Users are responsible for conducting their own due diligence and completing transactions safely.`,
    },
    {
      title: '3. User Accounts',
      content: `3.1. You must be at least 18 years old to create an account and use the Platform.
      
3.2. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.

3.3. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete.

3.4. You may not create multiple accounts or allow others to use your account.

3.5. We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent or suspicious activity.`,
    },
    {
      title: '4. User Conduct',
      content: `You agree not to:

• Post false, misleading, or fraudulent listings
• Impersonate any person or entity
• Harass, threaten, or harm other users
• Use the Platform for any illegal purposes
• Attempt to manipulate ratings or reviews
• Scrape or collect user data without permission
• Interfere with or disrupt the Platform's functionality
• Upload malicious code or attempt to hack the system
• Engage in price manipulation or market manipulation
• Create listings for stolen or illegal items`,
    },
    {
      title: '5. Listings and Transactions',
      content: `5.1. Users are solely responsible for the accuracy of their listings, including descriptions, photos, and vehicle conditions.

5.2. SwapRide does not verify the accuracy of listings and is not responsible for misrepresentations made by users.

5.3. All transactions are conducted directly between users. SwapRide is not a party to these transactions.

5.4. Users must comply with all applicable laws regarding vehicle transfers, including proper title transfers and registration.

5.5. Users are responsible for paying all applicable taxes, fees, and charges related to their transactions.`,
    },
    {
      title: '6. Fees and Payments',
      content: `6.1. Creating an account and browsing listings is free.

6.2. SwapRide charges a service fee for completed swaps, typically 2-3% of the transaction value.

6.3. Fees are clearly displayed before transaction completion and are non-refundable once a swap is marked as complete.

6.4. Users agree to pay all applicable fees through the payment methods provided on the Platform.

6.5. We reserve the right to modify our fee structure with 30 days' notice to users.`,
    },
    {
      title: '7. Prohibited Items',
      content: `The following items may not be listed on SwapRide:

• Stolen vehicles or parts
• Vehicles with altered VIN numbers
• Items obtained through illegal means
• Vehicles without proper documentation
• Weapons, drugs, or other illegal items
• Counterfeit or unauthorized replica items
• Items that violate intellectual property rights`,
    },
    {
      title: '8. Intellectual Property',
      content: `8.1. All content on the Platform, including text, graphics, logos, and software, is the property of SwapRide or its licensors and is protected by copyright and trademark laws.

8.2. You grant SwapRide a non-exclusive, worldwide, royalty-free license to use, display, and distribute content you post on the Platform.

8.3. You represent that you have all necessary rights to post content on the Platform and that such content does not infringe on the rights of others.`,
    },
    {
      title: '9. Disclaimers and Limitation of Liability',
      content: `9.1. THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED.

9.2. SwapRide does not guarantee the accuracy, reliability, or quality of listings or user communications.

9.3. SwapRide is not responsible for the actions, conduct, or content of users.

9.4. You assume all risks associated with transactions conducted through the Platform.

9.5. TO THE MAXIMUM EXTENT PERMITTED BY LAW, SwapRide SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE PLATFORM.

9.6. Our total liability for any claims shall not exceed the amount of fees you paid to SwapRide in the 12 months preceding the claim.`,
    },
    {
      title: '10. Indemnification',
      content: `You agree to indemnify, defend, and hold harmless SwapRide, its affiliates, officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from:

• Your use of the Platform
• Your violation of these Terms
• Your violation of any rights of another party
• Any transactions conducted through the Platform`,
    },
    {
      title: '11. Dispute Resolution',
      content: `11.1. Users are encouraged to resolve disputes directly with each other in good faith.

11.2. SwapRide may, at its discretion, assist in mediating disputes but is not obligated to do so.

11.3. Any disputes with SwapRide shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.

11.4. You agree to waive your right to participate in class action lawsuits or class-wide arbitration.`,
    },
    {
      title: '12. Privacy',
      content: `Your privacy is important to us. Please review our Privacy Policy, which explains how we collect, use, and protect your personal information. By using the Platform, you consent to our privacy practices.`,
    },
    {
      title: '13. Termination',
      content: `13.1. You may terminate your account at any time through your account settings.

13.2. We reserve the right to suspend or terminate your account for violations of these Terms, suspicious activity, or at our sole discretion.

13.3. Upon termination, your right to use the Platform immediately ceases, and we may delete your account and content.

13.4. Sections of these Terms that by their nature should survive termination shall survive, including liability limitations and indemnification.`,
    },
    {
      title: '14. General Provisions',
      content: `14.1. These Terms constitute the entire agreement between you and SwapRide regarding the Platform.

14.2. If any provision is found invalid, the remaining provisions shall remain in effect.

14.3. Our failure to enforce any right or provision shall not constitute a waiver.

14.4. These Terms are governed by the laws of the State of California, without regard to conflict of law principles.

14.5. You may not assign these Terms without our prior written consent.`,
    },
    {
      title: '15. Contact Information',
      content: `If you have questions about these Terms of Service, please contact us at:

Email: tchabeustephane2@gmail.com
Address: Likomba Quater 11, Tiko, Southwest Region, Cameroon
Phone: +237 679 398 551`,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FileText className="w-16 h-16 mb-6" />
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-blue-100 text-lg">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Important Notice */}
        <Card className="mb-8 border-l-4 border-yellow-500 bg-yellow-50">
          <div className="p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Important: Please Read Carefully
                </h3>
                <p className="text-gray-700">
                  These Terms of Service govern your use of SwapRide. By using our platform,
                  you agree to these terms. Please read them carefully and contact us if you
                  have any questions.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Terms Content */}
        <Card className="mb-8">
          <div className="p-8">
            {sections.map((section, index) => (
              <div key={index} className={index !== 0 ? 'mt-8 pt-8 border-t border-gray-200' : ''}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {section.title}
                </h2>
                <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Acknowledgment */}
        <Card className="bg-blue-50 border-blue-200">
          <div className="p-6">
            <h3 className="font-semibold text-gray-900 mb-3">
              Acknowledgment
            </h3>
            <p className="text-gray-700 mb-4">
              By clicking "I Agree" during account creation or by using the SwapRide platform,
              you acknowledge that you have read, understood, and agree to be bound by these
              Terms of Service.
            </p>
            <div className="flex gap-4">
              <Button variant="primary" href="/register">
                Create Account
              </Button>
              <Button variant="outline" href="/contact">
                Questions?
              </Button>
            </div>
          </div>
        </Card>

        {/* Related Links */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center text-sm">
          <Button variant="ghost" href="/privacy">
            Privacy Policy
          </Button>
          <Button variant="ghost" href="/faq">
            FAQ
          </Button>
          <Button variant="ghost" href="/contact">
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
}
