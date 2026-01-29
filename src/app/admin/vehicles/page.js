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
  Car,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  DollarSign,
  MapPin,
  Calendar
} from 'lucide-react';

export default function AdminVehiclesPage() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/listings');
      setVehicles(response.data.data?.listings || response.data.data || []);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await api.patch(`/admin/listings/${id}/approve`);
      fetchVehicles();
    } catch (error) {
      console.error('Error approving vehicle:', error);
      alert('Failed to approve vehicle');
    }
  };

  const handleReject = async (id) => {
    const reason = prompt('Reason for rejection:');
    if (!reason) return;

    try {
      await api.patch(`/admin/listings/${id}/reject`, { reason });
      fetchVehicles();
    } catch (error) {
      console.error('Error rejecting vehicle:', error);
      alert('Failed to reject vehicle');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this vehicle?')) return;

    try {
      await api.delete(`/admin/listings/${id}`);
      fetchVehicles();
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      alert('Failed to delete vehicle');
    }
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = 
      vehicle.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.make?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filterStatus === 'all' || 
      vehicle.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Vehicle Listings</h1>
        <p className="text-gray-600">Manage all vehicle listings on the platform</p>
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
                  placeholder="Search by title, make, or model..."
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
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="sold">Sold</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
            <div>
              <p className="text-sm text-gray-600">Total Listings</p>
              <p className="text-2xl font-bold text-gray-900">{vehicles.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-green-600">
                {vehicles.filter(v => v.status === 'active').length}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {vehicles.filter(v => v.status === 'pending').length}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Sold</p>
              <p className="text-2xl font-bold text-blue-600">
                {vehicles.filter(v => v.status === 'sold').length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map((vehicle) => (
          <Card key={vehicle.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gray-200 relative">
              {vehicle.images?.[0] ? (
                <img
                  src={vehicle.images[0]}
                  alt={vehicle.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Car className="h-16 w-16 text-gray-400" />
                </div>
              )}
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  vehicle.status === 'active' ? 'bg-green-100 text-green-800' :
                  vehicle.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  vehicle.status === 'sold' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {vehicle.status}
                </span>
              </div>
            </div>

            <CardContent className="p-4">
              <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
                {vehicle.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-3">
                {vehicle.make} {vehicle.model} • {vehicle.year}
              </p>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <DollarSign className="h-4 w-4" />
                  <span className="font-semibold text-blue-600">
                    {vehicle.price?.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <MapPin className="h-3 w-3" />
                  {vehicle.city || 'Unknown'}
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
                <Calendar className="h-3 w-3" />
                {new Date(vehicle.createdAt).toLocaleDateString()}
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => router.push(`/vehicles/${vehicle.id}`)}
                  className="flex-1"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>

                {vehicle.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleApprove(vehicle.id)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded"
                      title="Approve"
                    >
                      <CheckCircle className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleReject(vehicle.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                      title="Reject"
                    >
                      <XCircle className="h-5 w-5" />
                    </button>
                  </>
                )}

                <button
                  onClick={() => handleDelete(vehicle.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                  title="Delete"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredVehicles.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No vehicles found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
