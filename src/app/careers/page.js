'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Briefcase, MapPin, Clock, Users, Zap, Heart, TrendingUp } from 'lucide-react';

export default function CareersPage() {
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const openPositions = [
    {
      id: 1,
      title: 'Vehicle Agent',
      department: 'Operations',
      location: 'Tiko / Douala',
      type: 'Full-time',
      salary: '80,000 - 120,000 XAF/month',
      description: 'Source vehicles, meet sellers, inspect and list cars on the platform.',
    },
    {
      id: 2,
      title: 'Customer Service Representative',
      department: 'Operations',
      location: 'Tiko',
      type: 'Full-time',
      salary: '60,000 - 90,000 XAF/month',
      description: 'Assist buyers and sellers via phone and chat, resolve disputes and answer questions.',
    },
    {
      id: 3,
      title: 'Driver / Delivery Agent',
      department: 'Operations',
      location: 'Tiko / Douala / Buea',
      type: 'Full-time',
      salary: '50,000 - 75,000 XAF/month',
      description: 'Transport vehicles and parts to buyers, handle pick-ups and deliveries across the region.',
    },
    {
      id: 4,
      title: 'Social Media Manager',
      department: 'Marketing',
      location: 'Tiko / Remote',
      type: 'Part-time',
      salary: '40,000 - 70,000 XAF/month',
      description: 'Manage our Facebook, Instagram and WhatsApp presence, create posts and engage the community.',
    },
    {
      id: 5,
      title: 'Web Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: '100,000 - 150,000 XAF/month',
      description: 'Maintain and improve the SwapRide website, add new features, fix bugs.',
    },
    {
      id: 6,
      title: 'Vehicle Photographer',
      department: 'Marketing',
      location: 'Tiko / Douala',
      type: 'Part-time',
      salary: '30,000 - 50,000 XAF/month',
      description: 'Take quality photos and videos of vehicles for listings on the platform.',
    },
    {
      id: 7,
      title: 'Accountant / Bookkeeper',
      department: 'Operations',
      location: 'Tiko',
      type: 'Full-time',
      salary: '70,000 - 100,000 XAF/month',
      description: 'Manage finances, track transactions, handle invoicing and keep accurate records.',
    },
  ];

  const benefits = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Health & Wellness',
      description: 'Comprehensive medical, dental, and vision insurance for you and your family',
    },
    {
      icon: <span className="text-2xl font-bold">XAF</span>,
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

  const departments = ['all', 'Engineering', 'Operations', 'Marketing'];

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
              Your work directly helps people across Cameroon trade vehicles
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
              className={`px-6 py-2 rounded-full font-medium transition-colors ${selectedDepartment === dept
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
                          <span className="text-xs font-bold">XAF</span>
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
