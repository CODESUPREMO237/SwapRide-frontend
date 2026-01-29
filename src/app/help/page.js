'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';

import Button from '@/components/ui/Button';
import { Search, Book, MessageCircle, Mail, ChevronDown, ChevronUp } from 'lucide-react';

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const categories = [
    {
      icon: '🚗',
      title: 'Getting Started',
      description: 'Learn the basics of SwapRide',
      articles: 8,
    },
    {
      icon: '🔄',
      title: 'Swapping Vehicles',
      description: 'How to swap safely and successfully',
      articles: 12,
    },
    {
      icon: '💰',
      title: 'Payments & Pricing',
      description: 'Understanding fees and transactions',
      articles: 6,
    },
    {
      icon: '🔒',
      title: 'Safety & Security',
      description: 'Stay safe while using SwapRide',
      articles: 10,
    },
    {
      icon: '⚙️',
      title: 'Account Settings',
      description: 'Manage your profile and preferences',
      articles: 7,
    },
    {
      icon: '📝',
      title: 'Listing Management',
      description: 'Create and manage your listings',
      articles: 9,
    },
  ];

  const faqs = [
    {
      question: 'How does vehicle swapping work on SwapRide?',
      answer: 'SwapRide allows you to trade your vehicle directly with another user. You create a listing, browse other listings, and when you find a match, you can propose a swap. Both parties agree on terms, meet for inspection, and complete the swap with proper documentation.',
    },
    {
      question: 'Is SwapRide free to use?',
      answer: 'Creating an account and browsing listings is completely free. We charge a small service fee only when a swap is successfully completed to help maintain and improve the platform.',
    },
    {
      question: 'How do I know if a swap is fair?',
      answer: 'We provide estimated vehicle values based on market data, but ultimately the fairness of a swap is determined by what both parties agree to. We recommend getting professional appraisals and thorough inspections before finalizing any swap.',
    },
    {
      question: 'What if something goes wrong with a swap?',
      answer: 'We recommend conducting thorough inspections and using proper contracts. While SwapRide facilitates connections, the actual swap is a private transaction between users. We provide guidelines and safety tips to help ensure successful swaps.',
    },
    {
      question: 'Can I swap my vehicle for cash difference?',
      answer: 'Yes! Many swaps involve a cash difference when vehicles have different values. Both parties can negotiate and agree on terms that work for them, including cash adjustments.',
    },
    {
      question: 'How do I verify the other person is legitimate?',
      answer: 'Check user profiles for verification badges, read reviews from previous swaps, and always meet in public places. We also provide a messaging system so you can get to know potential swap partners before meeting.',
    },
    {
      question: 'What documents do I need for a vehicle swap?',
      answer: 'You\'ll typically need your vehicle title, registration, identification, and any relevant maintenance records. Requirements vary by location, so check your local DMV requirements before completing a swap.',
    },
    {
      question: 'Can I list multiple vehicles?',
      answer: 'Yes! You can create multiple listings for different vehicles. This is useful if you have several vehicles you\'re willing to trade.',
    },
  ];

  const popularArticles = [
    'How to Create Your First Listing',
    'Complete Vehicle Inspection Checklist',
    'Understanding Swap Agreements',
    'Protecting Yourself from Scams',
    'How to Get Verified on SwapRide',
  ];

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">How can we help you?</h1>
          <p className="text-xl text-blue-100 mb-8">
            Search our knowledge base or browse categories below
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="text"
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-4 py-4 rounded-lg text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Help Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Browse by Category</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Card 
                key={index} 
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="text-sm text-blue-600 font-medium">
                  {category.articles} articles
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Popular Articles */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Book className="w-6 h-6 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Popular Articles</h2>
          </div>
          <Card className="divide-y divide-gray-200">
            {popularArticles.map((article, index) => (
              <div 
                key={index}
                className="p-4 hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-between"
              >
                <span className="text-gray-900">{article}</span>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </div>
            ))}
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <MessageCircle className="w-6 h-6 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-8">
                    {faq.question}
                  </span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-6 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Support CTA */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-12 text-center">
          <Mail className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Can't find what you're looking for? Our support team is here to help you
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button variant="light" size="lg" href="/contact">
              Contact Support
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-blue-600"
              href="/messages"
            >
              Live Chat
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
