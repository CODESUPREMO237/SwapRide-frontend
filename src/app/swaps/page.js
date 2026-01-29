'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import { Alert } from '@/components/ui/Alert';
import { 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  Clock, 
  ArrowLeftRight,
  DollarSign,
  Calendar,
  User
} from 'lucide-react';

export default function SwapsPage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('received'); // received, sent, completed
  const [swaps, setSwaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login?redirect=/swaps');
    } else if (isAuthenticated) {
      fetchSwaps();
    }
  }, [isAuthenticated, authLoading, activeTab]);

  const fetchSwaps = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get(`/swaps?type=${activeTab}`);
      setSwaps(response.data.data.swaps || []);
    } catch (error) {
      console.error('Error fetching swaps:', error);
      setError(error.response?.data?.message || 'Failed to load swaps');
    } finally {
      setLoading(false);
    }
  };

  const handleSwapAction = async (swapId, action) => {
    try {
      setProcessingId(swapId);
      await api.put(`/swaps/${swapId}/${action}`);
      await fetchSwaps();
      // Show success message
    } catch (error) {
      console.error(`Error ${action} swap:`, error);
      setError(error.response?.data?.message || `Failed to ${action} swap`);
    } finally {
      setProcessingId(null);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'accepted':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-gray-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="xl" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <ArrowLeftRight className="h-10 w-10 text-blue-600" />
            My Swaps
          </h1>
          <p className="text-gray-600">
            Manage your vehicle swap requests and offers
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex gap-8">
              <button
                onClick={() => setActiveTab('received')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'received'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Received Requests
              </button>
              <button
                onClick={() => setActiveTab('sent')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'sent'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Sent Requests
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'completed'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Completed
              </button>
            </nav>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert type="error" className="mb-6" onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader size="xl" />
          </div>
        ) : (
          <>
            {/* Swaps List */}
            {swaps.length === 0 ? (
              <Card className="p-12 text-center">
                <RefreshCw className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No swaps found
                </h3>
                <p className="text-gray-600 mb-6">
                  {activeTab === 'received' && "You haven't received any swap requests yet"}
                  {activeTab === 'sent' && "You haven't sent any swap requests yet"}
                  {activeTab === 'completed' && "You don't have any completed swaps"}
                </p>
                <Button variant="primary" href="/vehicles">
                  Browse Vehicles
                </Button>
              </Card>
            ) : (
              <div className="space-y-6">
                {swaps.map((swap) => (
                  <Card key={swap.id} className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Swap Details */}
                      <div className="flex-1">
                        {/* Status Badge */}
                        <div className="flex items-center gap-2 mb-4">
                          {getStatusIcon(swap.status)}
                          <span className="font-semibold text-gray-900">
                            {getStatusText(swap.status)}
                          </span>
                        </div>

                        {/* Participants */}
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                              <User className="w-4 h-4" />
                              {activeTab === 'received' ? 'From' : 'To'}
                            </div>
                            <p className="font-medium text-gray-900">
                              {activeTab === 'received' 
                                ? swap.initiator?.firstName + ' ' + swap.initiator?.lastName
                                : swap.receiver?.firstName + ' ' + swap.receiver?.lastName
                              }
                            </p>
                          </div>

                          <div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                              <Calendar className="w-4 h-4" />
                              Date
                            </div>
                            <p className="font-medium text-gray-900">
                              {new Date(swap.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        {/* Offered Vehicle */}
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">
                            Offered Vehicle:
                          </h4>
                          <p className="text-gray-900">
                            {swap.offeredVehicle?.make} {swap.offeredVehicle?.model} ({swap.offeredVehicle?.year})
                          </p>
                        </div>

                        {/* Requested Item */}
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">
                            Requested Item:
                          </h4>
                          <p className="text-gray-900">
                            {swap.requestedItemType === 'vehicle' ? 'Vehicle' : 'Part'} (ID: {swap.requestedItemId})
                          </p>
                        </div>

                        {/* Additional Cash */}
                        {swap.additionalCash > 0 && (
                          <div className="flex items-center gap-2 mb-4">
                            <DollarSign className="w-5 h-5 text-green-600" />
                            <span className="font-semibold text-gray-900">
                              Additional Cash: {swap.currency} {swap.additionalCash.toLocaleString()}
                            </span>
                          </div>
                        )}

                        {/* Message */}
                        {swap.message && (
                          <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            <p className="text-sm text-gray-600 italic">
                              "{swap.message}"
                            </p>
                          </div>
                        )}

                        {/* Response Note */}
                        {swap.responseNote && (
                          <div className="bg-blue-50 rounded-lg p-4">
                            <p className="text-sm text-blue-900">
                              <strong>Response:</strong> {swap.responseNote}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      {swap.status === 'pending' && activeTab === 'received' && (
                        <div className="flex flex-col gap-3 lg:w-48">
                          <Button
                            variant="success"
                            onClick={() => handleSwapAction(swap.id, 'accept')}
                            disabled={processingId === swap.id}
                            loading={processingId === swap.id}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleSwapAction(swap.id, 'reject')}
                            disabled={processingId === swap.id}
                          >
                            Reject
                          </Button>
                        </div>
                      )}

                      {swap.status === 'pending' && activeTab === 'sent' && (
                        <div className="flex flex-col gap-3 lg:w-48">
                          <Button
                            variant="outline"
                            onClick={() => handleSwapAction(swap.id, 'cancel')}
                            disabled={processingId === swap.id}
                          >
                            Cancel Request
                          </Button>
                        </div>
                      )}

                      {swap.status === 'accepted' && (
                        <div className="flex flex-col gap-3 lg:w-48">
                          <Button
                            variant="primary"
                            href={`/messages?user=${activeTab === 'received' ? swap.initiatorId : swap.receiverId}`}
                          >
                            Message User
                          </Button>
                          <Button
                            variant="success"
                            onClick={() => handleSwapAction(swap.id, 'complete')}
                            disabled={processingId === swap.id}
                          >
                            Mark Complete
                          </Button>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
