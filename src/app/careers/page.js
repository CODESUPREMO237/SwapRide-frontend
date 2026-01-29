'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Briefcase, MapPin, Clock, DollarSign, Users, Zap, Heart, TrendingUp } from 'lucide-react';

export default function CareersPage() {
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const openPositions = [
    {
      id: 1,
      title: 'Full Stack Developer',
      department: 'Engineering',
      location: 'Douala / Remote',
      type: 'Full-time',
      salary: '150,000 - 200,000 XAF',
      description: 'Build and scale our platform with modern web technologies.',
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'Product',
      location: 'Douala',
      type: 'Full-time',
      salary: '100,000 - 140,000 XAF',
      description: 'Drive product strategy and deliver exceptional user experiences.',
    },
    {
      id: 3,
      title: 'Customer Support Representative',
      department: 'Operations',
      location: 'Tiko / Douala',
      type: 'Full-time',
      salary: '110,000 - 130,000 XAF',
      description: 'Help our users succeed and build lasting relationships.',
    },
    {
      id: 4,
      title: 'Marketing Manager',
      department: 'Marketing',
      location: 'Douala / Remote',
      type: 'Full-time',
      salary: '120,000 - 180,000 XAF',
      description: 'Lead our marketing efforts and grow our brand across Cameroon.',
    },
    {
      id: 5,
      title: 'Mobile App Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: '180,000 - 380,000 XAF',
      description: 'Build native mobile experiences for Android and iOS users.',
    },
    {
      id: 6,
      title: 'Vehicle Inspector',
      department: 'Operations',
      location: 'Douala / Yaoundé / Bamenda',
      type: 'Full-time',
      salary: '300,000 - 350,000 XAF',
      description: 'Inspect vehicles, verify condition, and ensure quality standards.',
    },
    {
      id: 7,
      title: 'Sales Representative',
      department: 'Sales',
      location: 'Tiko / Douala',
      type: 'Full-time',
      salary: '80,000 - 150,000 XAF + Commission',
      description: 'Connect with potential buyers and sellers, facilitate transactions.',
    },
    {
      id: 8,
      title: 'Content Creator',
      department: 'Marketing',
      location: 'Remote',
      type: 'Part-time',
      salary: '90,000 - 150,000 XAF',
      description: 'Create engaging content for social media and marketing campaigns.',
    },
  ];

  const benefits = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Health & Wellness',
      description: 'Comprehensive medical, dental, and vision insurance for you and your family',
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'Competitive Salary',
      description: 'Industry-leading compensation with equity options and performance bonuses',
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Flexible Schedule',
      description: 'Work when you are most productive with flexible hours and remote options',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Growth Opportunities',
      description: 'Continuous learning budget and clear career progression paths',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Amazing Team',
      description: 'Work with talented, passionate people who care about what they do',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Startup Energy',
      description: 'Move fast, make impact, and shape the future of vehicle trading',
    },
  ];

  const departments = ['all', 'Engineering', 'Product', 'Operations', 'Marketing', 'Sales'];

  const filteredPositions = selectedDepartment === 'all' 
    ? openPositions 
    : openPositions.filter(pos => pos.department === selectedDepartment);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Join Our Team</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Help us revolutionize vehicle trading and build the future of peer-to-peer marketplaces
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="light" size="lg" onClick={() => document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' })}>
              View Open Positions
            </Button>
          </div>
        </div>
      </div>

      {/* Why Join Us Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why SwapRide?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are on a mission to transform how people trade vehicles. Join us in building 
            something meaningful.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-8 text-center">
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Fast Growth</h3>
            <p className="text-gray-600">
              We are rapidly expanding and creating new opportunities every day
            </p>
          </Card>
          <Card className="p-8 text-center">
            <div className="text-5xl mb-4">💡</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation First</h3>
            <p className="text-gray-600">
              We embrace new ideas and encourage experimentation
            </p>
          </Card>
          <Card className="p-8 text-center">
            <div className="text-5xl mb-4">🌍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Make an Impact</h3>
            <p className="text-gray-600">
              Your work directly affects millions of users worldwide
            </p>
          </Card>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Benefits & Perks</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We take care of our team so they can do their best work
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6">
                <div className="text-blue-600 mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Open Positions Section */}
      <div id="openings" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Open Positions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find your next opportunity and help us build something amazing
          </p>
        </div>

        {/* Department Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDepartment(dept)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedDepartment === dept
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {dept === 'all' ? 'All Departments' : dept}
            </button>
          ))}
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {filteredPositions.map((position) => (
            <Card key={position.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-3">
                    <Briefcase className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                        {position.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{position.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {position.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {position.type}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {position.salary}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <Button 
                    variant="primary" 
                    size="lg"
                    onClick={() => alert('Application form would open here')}
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredPositions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No positions available in this department at the moment.
            </p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Don't See a Perfect Fit?</h2>
          <p className="text-xl text-blue-100 mb-8">
            We are always looking for talented people. Send us your resume and tell us 
            why you would be a great addition to the team.
          </p>
          <Button variant="light" size="lg" href="/contact">
            Get in Touch
          </Button>
        </div>
      </div>
    </div>
  );
}
