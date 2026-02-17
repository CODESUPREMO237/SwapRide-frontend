import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function About() {
  const values = [
    {
      icon: '🤝',
      title: 'Trust & Transparency',
      description: 'We build trust through verified profiles, secure transactions, and honest communication.',
    },
    {
      icon: '🌍',
      title: 'Made for Cameroon',
      description: 'Built from Tiko with love, designed to serve vehicle traders across Cameroon and beyond.',
    },
    {
      icon: '💡',
      title: 'Innovation',
      description: 'We continuously improve our platform with cutting-edge technology to make trading easier.',
    },
    {
      icon: '🎯',
      title: 'User-Centric',
      description: 'Every decision we make prioritizes our community\'s needs and safety.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">About SwapRide</h1>
            <p className="text-xl text-blue-100 mb-8">
              We're on a mission to make vehicle trading simple, safe, and accessible 
              for everyone in Cameroon and across Africa.
            </p>
            <div className="flex gap-4">
              <Button variant="light" size="lg" href="/contact">
                Get in Touch
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600" href="/vehicles">
                Browse Vehicles
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                SwapRide was created right here in Tiko, Cameroon, out of a real need — making 
                it easier for people to buy, sell, and swap vehicles without the usual hassle. 
                We saw how difficult it was to find trustworthy deals and decided to build a 
                platform that brings transparency and convenience to vehicle trading.
              </p>
              <p>
                Our platform allows users to list their vehicles for sale, browse available 
                listings, find vehicle parts, and even swap vehicles directly with other users. 
                Everything is designed to be straightforward, safe, and fair.
              </p>
              <p>
                Based in Tiko, Southwest Region, we're focused on serving Cameroon first — but 
                our vision is bigger. We aim to expand across Africa, Europe, and Asia, 
                partnering with investors to make vehicle trading accessible worldwide.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 aspect-square flex items-center justify-center">
            <div className="text-8xl">🚗🔄</div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* What We Offer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What We Offer</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 bg-white">
            <div className="text-4xl mb-4">🚘</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Vehicle Marketplace</h3>
            <p className="text-gray-600">
              Browse and list vehicles for sale. Find your dream car or sell your current one 
              to buyers across Cameroon.
            </p>
          </Card>
          <Card className="p-6 bg-white">
            <div className="text-4xl mb-4">🔄</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Vehicle Swapping</h3>
            <p className="text-gray-600">
              Our unique swap system lets you trade vehicles directly with other users — no 
              middleman, no unnecessary fees.
            </p>
          </Card>
          <Card className="p-6 bg-white">
            <div className="text-4xl mb-4">🔧</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Parts Marketplace</h3>
            <p className="text-gray-600">
              Find genuine and compatible vehicle parts for any make and model, from trusted 
              sellers in the community.
            </p>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join the SwapRide Community</h2>
          <p className="text-xl text-blue-100 mb-8">
            Whether you're looking to buy, sell, swap vehicles, or find parts — 
            SwapRide is the place to start. Join us today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="light" size="lg" href="/register">
              Get Started Free
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600" href="/vehicles">
              Browse Vehicles
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
