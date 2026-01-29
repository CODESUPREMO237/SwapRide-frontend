'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Alert } from '@/components/ui/Alert';
import { Loader } from '@/components/ui/Loader';
import { Card, CardContent } from '@/components/ui/Card';
import { formatCurrency, formatRelativeTime } from '@/lib/utils';
import { Repeat, Check, X, MessageCircle, ArrowRight } from 'lucide-react';

export default function MySwapsPage() {
  const [swaps, setSwaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [processingSwap, setProcessingSwap] = useState(null);

  useEffect(() => {
    fetchSwaps();
  }, [activeTab]);

  const fetchSwaps = async () => {
    try {
      setLoading(true);
      const params = activeTab !== 'all' ? { status: activeTab } : {};
      const response = await api.get('/swaps/my-swaps', { params });
      setSwaps(response.data.data.swaps || []);
    } catch (error) {
      console.error('Error fetching swaps:', error);
      setError('Failed to load swaps');
    } finally {
      setLoading(false);
    }
  };

  const handleSwapAction = async (swapId, action) => {
    setProcessingSwap(swapId);
    try {
      await api.patch(`/swaps/${swapId}/${action}`);
      fetchSwaps();
    } catch (error) {
      console.error(`Error ${action} swap:`, error);
      setError(`Failed to ${action} swap`);
    } finally {
      setProcessingSwap(null);
    }
  };

  const tabs = [
    { id: 'all', label: 'All Swaps' },
    { id: 'pending', label: 'Pending' },
    { id: 'accepted', label: 'Accepted' },
    { id: 'rejected', label: 'Rejected' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Swaps</h1>
          <p className="text-gray-600">Manage your swap proposals and offers</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-4 py-2 font-medium transition-colors border-b-2
                ${activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {error && (
          <Alert type="error" className="mb-6" onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {/* Swaps List */}
        {swaps.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Repeat className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No swaps {activeTab !== 'all' ? activeTab : 'yet'}
              </h3>
              <p className="text-gray-600 mb-6">
                {activeTab === 'all' 
                  ? 'Browse swap-available vehicles to make your first proposal'
                  : `You don't have any ${activeTab} swaps`
                }
              </p>
              <Link href="/vehicles?acceptSwap=true">
                <Button>Browse Swap-Available Vehicles</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {swaps.map((swap) => {
              const isProposer = swap.proposer?._id === swap.currentUserId;
              const otherParty = isProposer ? swap.owner : swap.proposer;
              
              return (
                <Card key={swap._id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Repeat className="h-5 w-5 text-blue-600" />
                        <h3 className="font-semibold text-gray-900">
                          {isProposer ? 'Swap Proposal Sent' : 'Swap Proposal Received'}
                        </h3>
                      </div>
                      <Badge
                        variant={
                          swap.status === 'pending' ? 'warning' :
                          swap.status === 'accepted' ? 'success' :
                          swap.status === 'rejected' ? 'danger' : 'default'
                        }
                      >
                        {swap.status}
                      </Badge>
                    </div>

                    {/* Vehicles */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {/* Proposed Vehicle */}
                      <div className="border border-gray-200 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-2">
                          {isProposer ? 'Your Vehicle' : 'Their Vehicle'}
                        </p>
                        <div className="flex gap-3">
                          <img
                            src={swap.proposedVehicle?.images?.[0]?.url || '/images/placeholder-car.jpg'}
                            alt={swap.proposedVehicle?.title}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">
                              {swap.proposedVehicle?.title}
                            </h4>
                            <p className="text-lg font-bold text-blue-600">
                              {formatCurrency(swap.proposedVehicle?.price || 0)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="hidden md:flex items-center justify-center">
                        <ArrowRight className="h-8 w-8 text-gray-400" />
                      </div>

                      {/* Requested Vehicle */}
                      <div className="border border-gray-200 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-2">
                          {isProposer ? 'Their Vehicle' : 'Your Vehicle'}
                        </p>
                        <div className="flex gap-3">
                          <img
                            src={swap.requestedVehicle?.images?.[0]?.url || '/images/placeholder-car.jpg'}
                            alt={swap.requestedVehicle?.title}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">
                              {swap.requestedVehicle?.title}
                            </h4>
                            <p className="text-lg font-bold text-blue-600">
                              {formatCurrency(swap.requestedVehicle?.price || 0)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Cash Top-Up */}
                    {swap.cashTopUp > 0 && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                        <p className="text-sm text-green-800">
                          <span className="font-semibold">Cash Top-Up:</span>{' '}
                          {formatCurrency(swap.cashTopUp)}
                        </p>
                      </div>
                    )}

                    {/* Message */}
                    {swap.message && (
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <p className="text-sm text-gray-600 mb-1">Message:</p>
                        <p className="text-gray-900">{swap.message}</p>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-600">
                        <span>From: {otherParty?.firstName} {otherParty?.lastName}</span>
                        <span className="mx-2">•</span>
                        <span>{formatRelativeTime(new Date(swap.createdAt))}</span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        {!isProposer && swap.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleSwapAction(swap._id, 'accept')}
                              loading={processingSwap === swap._id}
                              disabled={processingSwap === swap._id}
                              leftIcon={<Check className="h-4 w-4" />}
                            >
                              Accept
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleSwapAction(swap._id, 'reject')}
                              loading={processingSwap === swap._id}
                              disabled={processingSwap === swap._id}
                              leftIcon={<X className="h-4 w-4" />}
                              className="text-red-600 hover:bg-red-50"
                            >
                              Reject
                            </Button>
                          </>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          leftIcon={<MessageCircle className="h-4 w-4" />}
                        >
                          Message
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
