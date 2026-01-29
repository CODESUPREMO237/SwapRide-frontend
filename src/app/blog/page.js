'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';

import Button from '@/components/ui/Button';
import { Calendar, User, Tag, Search, TrendingUp } from 'lucide-react';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const blogPosts = [
    {
      id: 1,
      title: 'The Ultimate Guide to Vehicle Swapping in 2025',
      excerpt: 'Everything you need to know about swapping your vehicle safely and successfully in the modern marketplace.',
      author: 'Sarah Johnson',
      date: 'January 15, 2025',
      category: 'Guide',
      image: '📚',
      readTime: '8 min read',
    },
    {
      id: 2,
      title: '10 Tips for Getting the Best Swap Deal',
      excerpt: 'Learn how to maximize value and find the perfect match when swapping your vehicle on SwapRide.',
      author: 'Mike Chen',
      date: 'January 10, 2025',
      category: 'Tips',
      image: '💡',
      readTime: '5 min read',
    },
    {
      id: 3,
      title: 'How to Verify Vehicle Condition Before a Swap',
      excerpt: 'A comprehensive checklist for inspecting vehicles and avoiding common pitfalls in peer-to-peer trades.',
      author: 'Emily Rodriguez',
      date: 'January 5, 2025',
      category: 'Safety',
      image: '🔍',
      readTime: '6 min read',
    },
    {
      id: 4,
      title: 'Success Story: From Sedan to SUV in One Week',
      excerpt: 'Meet John, who found his dream family SUV by swapping his sedan on SwapRide. Here\'s his story.',
      author: 'James Wilson',
      date: 'December 28, 2024',
      category: 'Success Story',
      image: '⭐',
      readTime: '4 min read',
    },
    {
      id: 5,
      title: 'The Environmental Benefits of Vehicle Swapping',
      excerpt: 'How peer-to-peer vehicle swapping reduces waste and contributes to a more sustainable future.',
      author: 'Sarah Johnson',
      date: 'December 20, 2024',
      category: 'Sustainability',
      image: '🌱',
      readTime: '7 min read',
    },
    {
      id: 6,
      title: 'Understanding Vehicle Valuations',
      excerpt: 'Learn how to accurately value your vehicle and understand market prices for fair swaps.',
      author: 'Mike Chen',
      date: 'December 15, 2024',
      category: 'Guide',
      image: '💰',
      readTime: '6 min read',
    },
    {
      id: 7,
      title: 'Negotiating Swap Terms: A Complete Guide',
      excerpt: 'Master the art of negotiation to get the best deal when trading vehicles on our platform.',
      author: 'Emily Rodriguez',
      date: 'December 10, 2024',
      category: 'Tips',
      image: '🤝',
      readTime: '5 min read',
    },
    {
      id: 8,
      title: 'Top 10 Most Swapped Vehicles in 2024',
      excerpt: 'Discover which vehicles were the most popular on SwapRide this year and why.',
      author: 'James Wilson',
      date: 'December 5, 2024',
      category: 'Trends',
      image: '📊',
      readTime: '4 min read',
    },
  ];

  const categories = ['all', 'Guide', 'Tips', 'Safety', 'Success Story', 'Sustainability', 'Trends'];

  const featuredPost = blogPosts[0];

  const filteredPosts = blogPosts
    .filter(post => selectedCategory === 'all' || post.category === selectedCategory)
    .filter(post => 
      searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">SwapRide Blog</h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Tips, guides, and stories from the world of vehicle swapping
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Post */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Featured Article</h2>
          </div>
          <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
            <div className="grid md:grid-cols-2 gap-8 p-8">
              <div className="flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg">
                <div className="text-9xl">{featuredPost.image}</div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {featuredPost.category}
                  </span>
                  <span className="text-gray-500 text-sm">{featuredPost.readTime}</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {featuredPost.title}
                </h3>
                <p className="text-gray-600 mb-6 text-lg">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {featuredPost.author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {featuredPost.date}
                  </div>
                </div>
                <Button variant="primary" size="lg">
                  Read More
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {category === 'all' ? 'All Posts' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.slice(1).map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer flex flex-col">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 aspect-video flex items-center justify-center">
                <div className="text-6xl">{post.image}</div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-xs">{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 flex-1 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-600 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 1 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No articles found matching your criteria.
            </p>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Get the latest tips, guides, and stories delivered to your inbox every week
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <Button variant="light" size="lg">
                Subscribe
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
