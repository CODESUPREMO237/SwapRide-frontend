'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';

import Button from '@/components/ui/Button';
import { Search, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'General', 'Swapping', 'Payments', 'Safety', 'Account', 'Technical'];

  const faqs = [
    {
      category: 'General',
      question: 'What is SwapRide?',
      answer: 'SwapRide is a peer-to-peer marketplace that allows vehicle owners to trade their vehicles directly with each other. Whether you want to swap cars, motorcycles, or even parts, SwapRide makes it easy, safe, and transparent.',
    },
    {
      category: 'General',
      question: 'How much does it cost to use SwapRide?',
      answer: 'Creating an account and browsing listings is completely free. We only charge a small service fee (typically 2-3% of the vehicle value) when a swap is successfully completed. This fee helps us maintain the platform and provide customer support.',
    },
    {
      category: 'General',
      question: 'Is SwapRide available in my area?',
      answer: 'SwapRide is currently available in 50+ cities across the United States. Check our coverage map on the homepage or enter your location when searching for vehicles to see available listings in your area.',
    },
    {
      category: 'Swapping',
      question: 'How does the vehicle swapping process work?',
      answer: 'The process is simple: (1) Create a listing for your vehicle, (2) Browse and find a vehicle you\'d like to swap with, (3) Contact the owner and negotiate terms, (4) Meet in person to inspect both vehicles, (5) Complete the swap with proper documentation and transfer of titles.',
    },
    {
      category: 'Swapping',
      question: 'Can I swap my vehicle for one with a different value?',
      answer: 'Absolutely! Many swaps involve vehicles of different values. You can negotiate a cash difference (called "boot") to make the swap fair for both parties. Our platform provides estimated values to help with negotiations.',
    },
    {
      category: 'Swapping',
      question: 'What if I want to swap multiple items?',
      answer: 'You can create multiple listings and propose package deals. For example, you could offer your car plus cash, or your car plus some parts, in exchange for another vehicle.',
    },
    {
      category: 'Swapping',
      question: 'How long does a typical swap take?',
      answer: 'Timeline varies, but most swaps are completed within 1-3 weeks from initial contact to final exchange. This includes time for negotiations, inspections, and paperwork.',
    },
    {
      category: 'Payments',
      question: 'How do payments work for cash differences?',
      answer: 'When vehicles have different values, the difference (boot) can be paid via bank transfer, cashier\'s check, or cash. We recommend using traceable payment methods and completing financial transactions through your bank for safety.',
    },
    {
      category: 'Payments',
      question: 'When do I pay the SwapRide service fee?',
      answer: 'The service fee is charged only after both parties confirm the swap is complete. You\'ll receive an invoice via email and can pay through our secure payment system.',
    },
    {
      category: 'Payments',
      question: 'Can I get a refund if the swap falls through?',
      answer: 'Our service fee is only charged for completed swaps. If your swap doesn\'t go through, you won\'t be charged. However, we cannot refund fees for completed swaps.',
    },
    {
      category: 'Safety',
      question: 'How do I know if someone is trustworthy?',
      answer: 'Check user profiles for verification badges, read reviews from previous swaps, look at their account history, and pay attention to how they communicate. Always meet in public places and trust your instincts.',
    },
    {
      category: 'Safety',
      question: 'What should I do if I suspect a scam?',
      answer: 'Report the user immediately through our platform. Common red flags include: pressure to act quickly, refusal to meet in person, requests for unusual payment methods, or deals that seem too good to be true.',
    },
    {
      category: 'Safety',
      question: 'Should I get a vehicle inspection?',
      answer: 'Yes! We strongly recommend having a professional mechanic inspect any vehicle before completing a swap. The cost of an inspection is minimal compared to potential issues you might discover.',
    },
    {
      category: 'Safety',
      question: 'Where should I meet to inspect vehicles?',
      answer: 'Always meet in public, well-lit locations during daylight hours. Many police stations offer designated areas for online transaction meetups. Bring someone with you and inform others of your location.',
    },
    {
      category: 'Account',
      question: 'How do I get verified?',
      answer: 'Upload a government-issued ID and complete our verification process. Verified users have a badge on their profile and are generally more trusted by the community.',
    },
    {
      category: 'Account',
      question: 'Can I delete my account?',
      answer: 'Yes, you can delete your account at any time from your settings page. Note that this action is permanent and cannot be undone. Any active listings will be removed.',
    },
    {
      category: 'Account',
      question: 'How do I edit my listing?',
      answer: 'Go to "My Listings" in your dashboard, select the listing you want to edit, and click the "Edit" button. You can update photos, description, price, and other details at any time.',
    },
    {
      category: 'Account',
      question: 'Can I have multiple accounts?',
      answer: 'No, each person should only have one account. Multiple accounts may be flagged and suspended as this violates our terms of service.',
    },
    {
      category: 'Technical',
      question: 'What file formats can I use for photos?',
      answer: 'We accept JPG, PNG, and WebP formats. Each photo should be under 10MB, and you can upload up to 15 photos per listing.',
    },
    {
      category: 'Technical',
      question: 'Is there a mobile app?',
      answer: 'Not yet, but our website is fully mobile-responsive and works great on phones and tablets. A dedicated mobile app is in development and coming soon!',
    },
    {
      category: 'Technical',
      question: 'I\'m having trouble uploading photos. What should I do?',
      answer: 'Try reducing the file size of your images, checking your internet connection, or trying a different browser. If problems persist, contact our support team.',
    },
    {
      category: 'Technical',
      question: 'How do I report a bug or technical issue?',
      answer: 'Use the "Contact Us" form or email tchabeustephane2@gmail.com with details about the issue, including what you were trying to do, any error messages, and your browser/device information.',
    },
  ];

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const filteredFaqs = faqs
    .filter(faq => selectedCategory === 'all' || faq.category === selectedCategory)
    .filter(faq =>
      searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <HelpCircle className="w-20 h-20 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-blue-100 mb-8">
            Find answers to common questions about SwapRide
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-4 py-4 rounded-lg text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Filter */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Browse by Category</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
              >
                {category === 'all' ? 'All Questions' : category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full p-6 text-left flex items-start justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1 pr-8">
                  <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium mb-3">
                    {faq.category}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {faq.question}
                  </h3>
                </div>
                {expandedFaq === index ? (
                  <ChevronUp className="w-6 h-6 text-gray-500 flex-shrink-0 mt-1" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-500 flex-shrink-0 mt-1" />
                )}
              </button>
              {expandedFaq === index && (
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </Card>
          ))}
        </div>

        {filteredFaqs.length === 0 && (
          <div className="text-center py-12">
            <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-6">
              No questions found matching your search.
            </p>
            <Button variant="outline" onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
              Clear Filters
            </Button>
          </div>
        )}

        {/* Still Need Help CTA */}
        <Card className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Our support team is here to help you with anything you need
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button variant="light" size="lg" href="/contact">
              Contact Support
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600"
              href="/help"
            >
              Help Center
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
