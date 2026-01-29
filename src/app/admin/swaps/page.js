'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Loader } from '@/components/ui/Loader';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { 
  Search, 
  Filter, 
  Repeat,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  User,
  Car,
  Calendar,
  ArrowRight
} from 'lucide-react';

export default function AdminSwapsPage() {
  const router = useRouter();
  const [swaps, setSwaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchSwaps();
  }, []);

  const fetchSwaps = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/swaps');
      setSwaps(response.data.data?.swaps || response.data.data || []);
    } catch (error) {
      console.error('Error fetching swaps:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResolveDispute = async (id) => {
    const resolution = prompt('Enter resolution notes:');
    if (!resolution) return;

    try {
      await api.patch(`/admin/swaps/${id}/resolve`, { resolution });
      fetchSwaps();
    } catch (error) {
      console.error('Error resolving dispute:', error);
      alert('Failed to resolve dispute');
    }
  };

  const filteredSwaps = swaps.filter(swap => {
    const matchesSearch = 
      swap.id?.toString().includes(searchTerm) ||
      swap.initiator?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      swap.receiver?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filterStatus === 'all' || 
      swap.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      case 'disputed': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'accepted': return <CheckCircle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      case 'disputed': return <AlertTriangle className="h-4 w-4" />;
      default: return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader size="xl" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Swap Management</h1>
        <p className="text-gray-600">Manage all vehicle swap transactions</p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by swap ID or user email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
                <option value="disputed">Disputed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6 pt-6 border-t">
            <div>
              <p className="text-sm text-gray-600">Total Swaps</p>
              <p className="text-2xl font-bold text-gray-900">{swaps.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {swaps.filter(s => s.status === 'pending').length}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {swaps.filter(s => s.status === 'completed').length}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Disputed</p>
              <p className="text-2xl font-bold text-orange-600">
                {swaps.filter(s => s.status === 'disputed').length}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-red-600">
                {swaps.filter(s => s.status === 'rejected').length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Swaps List */}
      <div className="space-y-4">
        {filteredSwaps.map((swap) => (
          <Card key={swap.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Repeat className="h-5 w-5 text-blue-600" />
                    <h3 className="font-bold text-lg">Swap #{swap.id}</h3>
                    <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(swap.status)}`}>
                      {getStatusIcon(swap.status)}
                      {swap.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    {new Date(swap.createdAt).toLocaleString()}
                  </div>
                </div>

                <div className="flex gap-2">
                  {swap.status === 'disputed' && (
                    <Button
                      size="sm"
                      onClick={() => handleResolveDispute(swap.id)}
                      className="gap-2"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Resolve
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => router.push(`/swaps/${swap.id}`)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                </div>
              </div>

              {/* Swap Parties */}
              <div className="grid md:grid-cols-3 gap-4">
                {/* Initiator */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-xs text-blue-600 font-medium mb-2">INITIATOR</p>
                  <div className="flex items-center gap-2 mb-2">
                    <User className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium">
                      {swap.initiator?.firstName} {swap.initiator?.lastName}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Car className="h-4 w-4 text-gray-600 mt-0.5" />
                    <div className="text-sm text-gray-700">
                      {swap.offeredVehicle?.title || 'Vehicle not found'}
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex items-center justify-center">
                  <ArrowRight className="h-8 w-8 text-gray-400" />
                </div>

                {/* Receiver */}
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-xs text-green-600 font-medium mb-2">RECEIVER</p>
                  <div className="flex items-center gap-2 mb-2">
                    <User className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium">
                      {swap.receiver?.firstName} {swap.receiver?.lastName}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Car className="h-4 w-4 text-gray-600 mt-0.5" />
                    <div className="text-sm text-gray-700">
                      {swap.requestedVehicle?.title || 'Vehicle not found'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              {swap.cashDifference > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Cash Difference:</span> ${swap.cashDifference?.toLocaleString()}
                  </p>
                </div>
              )}

              {swap.message && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Message:</span> {swap.message}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSwaps.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Repeat className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No swaps found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
