import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { ArrowRight, Search, MessageSquare, Handshake, Shield } from 'lucide-react';

export const metadata = {
  title: 'How It Works - SwapRide',
  description: 'Learn how SwapRide makes vehicle and parts swapping easy, safe, and convenient.',
};

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Create Your Listing',
      description: 'Post your vehicle or parts with photos and details. Our smart system helps you create an attractive listing in minutes.',
      icon: Search,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      number: '02',
      title: 'Browse & Connect',
      description: 'Search through thousands of listings. Use our advanced filters to find exactly what you need and connect with owners.',
      icon: MessageSquare,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      number: '03',
      title: 'Negotiate & Swap',
      description: 'Chat directly with other users, negotiate terms, and arrange your swap. Our platform facilitates smooth communication.',
      icon: Handshake,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      number: '04',
      title: 'Safe Transaction',
      description: 'Complete your swap with confidence. We provide safety tips, verification tools, and support throughout the process.',
      icon: Shield,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  const features = [
    {
      title: 'Verified Listings',
      description: 'All listings go through verification to ensure quality and authenticity.',
    },
    {
      title: 'Secure Messaging',
      description: 'Communicate safely with built-in chat that protects your privacy.',
    },
    {
      title: 'Smart Matching',
      description: 'Our algorithm suggests the best matches based on your preferences.',
    },
    {
      title: 'Rating System',
      description: 'Build trust with our community rating and review system.',
    },
    {
      title: 'Support Team',
      description: '24/7 customer support to help you with any questions or concerns.',
    },
    {
      title: 'Fair Trading',
      description: 'Guidelines and tools to ensure fair and honest transactions.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              How SwapRide Works
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Swapping vehicles and parts has never been easier. Follow our simple 4-step process to get started.
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className={`${step.bgColor} p-4 rounded-xl`}>
                        <Icon className={`w-8 h-8 ${step.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className={`text-sm font-bold ${step.color} mb-2`}>
                          STEP {step.number}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What Makes SwapRide Different
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We've built features that prioritize safety, convenience, and community trust.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of users who are already swapping vehicles and parts on SwapRide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/dashboard"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center justify-center gap-2"
              >
                Start Swapping
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
