'use client';

import { useState, useEffect } from 'react';
import VehicleCard from '@/components/vehicles/VehicleCard';
import { Card } from '@/components/ui/Card';
import  Button  from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import { Badge } from '@/components/ui/Badge';
import { API_ENDPOINTS } from '@/lib/api';

export default function FeaturedListings() {
  const [featuredVehicles, setFeaturedVehicles] = useState([]);
  const [featuredParts, setFeaturedParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('vehicles'); // vehicles or parts

  useEffect(() => {
    fetchFeaturedListings();
  }, []);

  const fetchFeaturedListings = async () => {
    try {
      setLoading(true);
      
      // Get base API URL
      const API_BASE = process.env.NEXT_PUBLIC_API_URL ;
      const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || 'v1';
      
      const [vehiclesRes, partsRes] = await Promise.all([
        fetch(`${API_BASE}/api/${API_VERSION}/vehicles?featured=true&limit=12`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }),
        fetch(`${API_BASE}/api/${API_VERSION}/parts?featured=true&limit=12`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }),
      ]);

      // Check if responses are ok
      if (vehiclesRes.ok) {
        const vehiclesData = await vehiclesRes.json();
        setFeaturedVehicles(vehiclesData.data?.vehicles || vehiclesData.vehicles || []);
      } else {
        console.warn('Vehicles API returned:', vehiclesRes.status);
        setFeaturedVehicles([]);
      }

      if (partsRes.ok) {
        const partsData = await partsRes.json();
        setFeaturedParts(partsData.data?.parts || partsData.parts || []);
      } else {
        console.warn('Parts API returned:', partsRes.status);
        setFeaturedParts([]);
      }
    } catch (error) {
      console.error('Error fetching featured listings:', error);
      // Set empty arrays on error
      setFeaturedVehicles([]);
      setFeaturedParts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 mb-8 text-white">
          <div className="max-w-3xl">
            <Badge variant="light" className="mb-4">⭐ Premium Listings</Badge>
            <h1 className="text-5xl font-bold mb-4">Featured Listings</h1>
            <p className="text-xl text-purple-100 mb-6">
              Discover our hand-picked collection of premium vehicles and parts. 
              These listings are verified, top-rated, and ready for your next swap.
            </p>
            <div className="flex gap-4">
              <Button variant="light" size="lg">
                List Your Vehicle
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-purple-600">
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white text-center p-6">
            <div className="text-3xl font-bold text-purple-600 mb-1">1,247</div>
            <div className="text-sm text-gray-600">Featured Vehicles</div>
          </Card>
          <Card className="bg-white text-center p-6">
            <div className="text-3xl font-bold text-pink-600 mb-1">3,842</div>
            <div className="text-sm text-gray-600">Featured Parts</div>
          </Card>
          <Card className="bg-white text-center p-6">
            <div className="text-3xl font-bold text-blue-600 mb-1">98%</div>
            <div className="text-sm text-gray-600">Satisfaction Rate</div>
          </Card>
          <Card className="bg-white text-center p-6">
            <div className="text-3xl font-bold text-green-600 mb-1">24h</div>
            <div className="text-sm text-gray-600">Avg. Response Time</div>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b">
          <button
            onClick={() => setActiveTab('vehicles')}
            className={`pb-4 px-6 font-semibold transition-colors ${
              activeTab === 'vehicles'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Featured Vehicles ({featuredVehicles.length})
          </button>
          <button
            onClick={() => setActiveTab('parts')}
            className={`pb-4 px-6 font-semibold transition-colors ${
              activeTab === 'parts'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Featured Parts ({featuredParts.length})
          </button>
        </div>

        {/* Featured Listings Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader size="lg" />
          </div>
        ) : (
          <>
            {activeTab === 'vehicles' && (
              <div>
                {featuredVehicles.length === 0 ? (
                  <Card className="bg-white">
                    <div className="p-12 text-center">
                      <div className="text-6xl mb-4">🚗</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        No featured vehicles yet
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Check back soon for premium vehicle listings
                      </p>
                      <Button href="/vehicles">Browse All Vehicles</Button>
                    </div>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredVehicles.map((vehicle) => (
                      <div key={vehicle._id} className="relative">
                        <Badge 
                          variant="warning" 
                          className="absolute top-4 right-4 z-10 bg-yellow-400 text-yellow-900"
                        >
                          ⭐ Featured
                        </Badge>
                        <VehicleCard vehicle={vehicle} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'parts' && (
              <div>
                {featuredParts.length === 0 ? (
                  <Card className="bg-white">
                    <div className="p-12 text-center">
                      <div className="text-6xl mb-4">🔧</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        No featured parts yet
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Check back soon for premium parts listings
                      </p>
                      <Button href="/parts">Browse All Parts</Button>
                    </div>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredParts.map((part) => (
                      <Card key={part._id} className="bg-white hover:shadow-lg transition-shadow relative">
                        <Badge 
                          variant="warning" 
                          className="absolute top-4 right-4 z-10 bg-yellow-400 text-yellow-900"
                        >
                          ⭐ Featured
                        </Badge>
                        {part.images?.[0] && (
                          <img
                            src={part.images[0]}
                            alt={part.name}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                        )}
                        <div className="p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {part.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {part.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="text-2xl font-bold text-purple-600">
                              ${part.price?.toLocaleString()}
                            </div>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                          <div className="mt-4 pt-4 border-t flex items-center justify-between text-sm text-gray-500">
                            <span>{part.condition}</span>
                            <span>📍 {part.location}</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* Become Featured CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Want to Feature Your Listing?</h2>
            <p className="text-lg text-blue-100 mb-6">
              Get 10x more visibility and connect with serious buyers faster. 
              Featured listings appear at the top of search results and on our homepage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="light" size="lg">
                Feature My Listing
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                View Pricing
              </Button>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div>
                <div className="text-2xl mb-2">📈</div>
                <div className="font-semibold mb-1">10x Visibility</div>
                <div className="text-sm text-blue-100">
                  Appear at the top of all searches
                </div>
              </div>
              <div>
                <div className="text-2xl mb-2">⚡</div>
                <div className="font-semibold mb-1">Fast Results</div>
                <div className="text-sm text-blue-100">
                  Get responses within 24 hours
                </div>
              </div>
              <div>
                <div className="text-2xl mb-2">✅</div>
                <div className="font-semibold mb-1">Verified Badge</div>
                <div className="text-sm text-blue-100">
                  Build trust with buyers instantly
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
