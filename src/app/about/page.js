import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function About() {
  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: '/team/sarah.jpg',
      bio: 'Former automotive industry executive with 15 years of experience',
    },
    {
      name: 'Mike Chen',
      role: 'CTO',
      image: '/team/mike.jpg',
      bio: 'Tech entrepreneur and software architect passionate about marketplaces',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Operations',
      image: '/team/emily.jpg',
      bio: 'Operations expert focused on creating seamless user experiences',
    },
    {
      name: 'James Wilson',
      role: 'Head of Community',
      image: '/team/james.jpg',
      bio: 'Community builder dedicated to fostering trust and connections',
    },
  ];

  const milestones = [
    { year: '2022', event: 'SwapRide founded with a vision to revolutionize vehicle trading' },
    { year: '2023', event: 'Reached 10,000 registered users and 1,000 successful swaps' },
    { year: '2024', event: 'Expanded to 50 cities and launched parts marketplace' },
    { year: '2025', event: 'Hit 100,000 users and raised Series A funding' },
  ];

  const values = [
    {
      icon: '🤝',
      title: 'Trust & Transparency',
      description: 'We build trust through verified profiles, secure transactions, and honest communication.',
    },
    {
      icon: '🌱',
      title: 'Sustainability',
      description: 'Promoting vehicle swapping reduces waste and environmental impact.',
    },
    {
      icon: '💡',
      title: 'Innovation',
      description: 'We continuously improve our platform with cutting-edge technology.',
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
              We're on a mission to make vehicle trading simple, safe, and sustainable 
              through innovative peer-to-peer swapping.
            </p>
            <div className="flex gap-4">
              <Button variant="light" size="lg" href="/contact">
                Get in Touch
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600" href="/careers">
                Join Our Team
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="bg-white text-center p-8">
            <div className="text-4xl font-bold text-blue-600 mb-2">100K+</div>
            <div className="text-gray-600">Active Users</div>
          </Card>
          <Card className="bg-white text-center p-8">
            <div className="text-4xl font-bold text-purple-600 mb-2">50K+</div>
            <div className="text-gray-600">Successful Swaps</div>
          </Card>
          <Card className="bg-white text-center p-8">
            <div className="text-4xl font-bold text-green-600 mb-2">50</div>
            <div className="text-gray-600">Cities</div>
          </Card>
          <Card className="bg-white text-center p-8">
            <div className="text-4xl font-bold text-pink-600 mb-2">98%</div>
            <div className="text-gray-600">Satisfaction</div>
          </Card>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                SwapRide was born from a simple frustration: trading vehicles shouldn't be complicated, 
                expensive, or wasteful. Our founders experienced firsthand the challenges of selling a car 
                while buying another—the fees, the hassle, and the environmental impact.
              </p>
              <p>
                In 2022, we launched SwapRide with a bold vision: create a platform where people could 
                directly swap vehicles with each other, eliminating the middleman and making the process 
                transparent, safe, and sustainable.
              </p>
              <p>
                Today, we're proud to serve over 100,000 users across 50 cities, facilitating thousands 
                of vehicle swaps every month. But we're just getting started. Our goal is to become the 
                go-to platform for peer-to-peer vehicle trading worldwide.
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

      {/* Timeline Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Journey</h2>
        <div className="space-y-8">
          {milestones.map((milestone, index) => (
            <div key={index} className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {milestone.year}
                </div>
              </div>
              <Card className="flex-1 p-6 bg-white">
                <p className="text-gray-700">{milestone.event}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Meet Our Team</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            We're a diverse team of automotive enthusiasts, tech innovators, and community builders 
            dedicated to transforming how people trade vehicles.
          </p>
          <div className="grid md:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center p-6 bg-white">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl text-white">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <div className="text-blue-600 font-medium mb-3">{member.role}</div>
                <p className="text-sm text-gray-600">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join the SwapRide Community</h2>
          <p className="text-xl text-blue-100 mb-8">
            Be part of the vehicle trading revolution. Whether you're looking to swap, 
            buy parts, or just explore, we're here to help.
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
