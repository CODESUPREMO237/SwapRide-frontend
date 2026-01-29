'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';
import { API_ENDPOINTS } from '@/lib/api';

export default function SwapCenter() {
  const { token } = useAuth();
  const [activeSwaps, setActiveSwaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, active, completed

  useEffect(() => {
    fetchSwaps();
  }, [filter]);

  const fetchSwaps = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_ENDPOINTS.SWAPS}?status=${filter}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await response.json();
      setActiveSwaps(data.swaps || []);
    } catch (error) {
      console.error('Error fetching swaps:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      active: 'primary',
      completed: 'success',
      cancelled: 'error',
    };
    return colors[status] || 'default';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Swap Center</h1>
          <p className="text-lg text-gray-600">
            Manage and browse active vehicle swaps in your area
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-3">
          {['all', 'pending', 'active', 'completed'].map((filterType) => (
            <Button
              key={filterType}
              variant={filter === filterType ? 'primary' : 'outline'}
              onClick={() => setFilter(filterType)}
              className="capitalize"
            >
              {filterType}
            </Button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white">
            <div className="p-6">
              <div className="text-sm text-gray-500 mb-1">Total Swaps</div>
              <div className="text-3xl font-bold text-gray-900">248</div>
              <div className="text-xs text-green-600 mt-2">↑ 12% this month</div>
            </div>
          </Card>
          <Card className="bg-white">
            <div className="p-6">
              <div className="text-sm text-gray-500 mb-1">Active Swaps</div>
              <div className="text-3xl font-bold text-blue-600">45</div>
              <div className="text-xs text-gray-500 mt-2">In progress</div>
            </div>
          </Card>
          <Card className="bg-white">
            <div className="p-6">
              <div className="text-sm text-gray-500 mb-1">Success Rate</div>
              <div className="text-3xl font-bold text-green-600">87%</div>
              <div className="text-xs text-gray-500 mt-2">Completed swaps</div>
            </div>
          </Card>
          <Card className="bg-white">
            <div className="p-6">
              <div className="text-sm text-gray-500 mb-1">Avg. Swap Time</div>
              <div className="text-3xl font-bold text-purple-600">14</div>
              <div className="text-xs text-gray-500 mt-2">Days to complete</div>
            </div>
          </Card>
        </div>

        {/* Swap Listings */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader size="lg" />
          </div>
        ) : (
          <div className="space-y-4">
            {activeSwaps.length === 0 ? (
              <Card className="bg-white">
                <div className="p-12 text-center">
                  <div className="text-6xl mb-4">🔄</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No swaps found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Start browsing vehicles to initiate your first swap
                  </p>
                  <Button href="/vehicles">Browse Vehicles</Button>
                </div>
              </Card>
            ) : (
              activeSwaps.map((swap) => (
                <Card key={swap.id} className="bg-white hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {swap.vehicleOffered?.make} {swap.vehicleOffered?.model} ⇄{' '}
                            {swap.vehicleRequested?.make} {swap.vehicleRequested?.model}
                          </h3>
                          <Badge variant={getStatusColor(swap.status)}>
                            {swap.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>📍 {swap.location || 'Location not specified'}</span>
                          <span>📅 {new Date(swap.createdAt).toLocaleDateString()}</span>
                          <span>👤 {swap.initiator?.name || 'Anonymous'}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>

                    {/* Vehicle Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t">
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-2">
                          Offering:
                        </div>
                        <div className="text-sm text-gray-600">
                          {swap.vehicleOffered?.year} {swap.vehicleOffered?.make}{' '}
                          {swap.vehicleOffered?.model}
                          <br />
                          {swap.vehicleOffered?.mileage?.toLocaleString()} miles
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-2">
                          Looking for:
                        </div>
                        <div className="text-sm text-gray-600">
                          {swap.vehicleRequested?.year} {swap.vehicleRequested?.make}{' '}
                          {swap.vehicleRequested?.model}
                          <br />
                          {swap.vehicleRequested?.mileage?.toLocaleString()} miles
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}

        {/* How It Works Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">How Swapping Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">1️⃣</div>
              <h3 className="font-semibold mb-2">Browse</h3>
              <p className="text-sm text-blue-100">
                Find vehicles you're interested in swapping for
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">2️⃣</div>
              <h3 className="font-semibold mb-2">Propose</h3>
              <p className="text-sm text-blue-100">
                Send a swap proposal with your vehicle
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">3️⃣</div>
              <h3 className="font-semibold mb-2">Negotiate</h3>
              <p className="text-sm text-blue-100">
                Chat with the owner to agree on terms
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">4️⃣</div>
              <h3 className="font-semibold mb-2">Complete</h3>
              <p className="text-sm text-blue-100">
                Finalize the swap and exchange vehicles
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
