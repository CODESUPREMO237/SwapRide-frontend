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
  Package,
  Eye,
  Trash2,
  DollarSign,
  MapPin,
  Calendar,
  CheckCircle,
  XCircle
} from 'lucide-react';

export default function AdminPartsPage() {
  const router = useRouter();
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCondition, setFilterCondition] = useState('all');

  useEffect(() => {
    fetchParts();
  }, []);

  const fetchParts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/parts');
      setParts(response.data.data?.parts || response.data.data || []);
    } catch (error) {
      console.error('Error fetching parts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this part?')) return;

    try {
      await api.delete(`/parts/${id}`);
      fetchParts();
    } catch (error) {
      console.error('Error deleting part:', error);
      alert('Failed to delete part');
    }
  };

  const filteredParts = parts.filter(part => {
    const matchesSearch = 
      part.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.partName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.manufacturer?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      filterStatus === 'all' || 
      part.status === filterStatus;

    const matchesCondition =
      filterCondition === 'all' ||
      part.condition === filterCondition;

    return matchesSearch && matchesStatus && matchesCondition;
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Parts Management</h1>
        <p className="text-gray-600">Manage all spare parts listings</p>
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
                  placeholder="Search parts..."
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
                <option value="available">Available</option>
                <option value="sold">Sold</option>
                <option value="reserved">Reserved</option>
              </select>

              <select
                value={filterCondition}
                onChange={(e) => setFilterCondition(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Conditions</option>
                <option value="new">New</option>
                <option value="used">Used</option>
                <option value="refurbished">Refurbished</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
            <div>
              <p className="text-sm text-gray-600">Total Parts</p>
              <p className="text-2xl font-bold text-gray-900">{parts.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Available</p>
              <p className="text-2xl font-bold text-green-600">
                {parts.filter(p => p.status === 'available').length}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Sold</p>
              <p className="text-2xl font-bold text-blue-600">
                {parts.filter(p => p.status === 'sold').length}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">New Condition</p>
              <p className="text-2xl font-bold text-purple-600">
                {parts.filter(p => p.condition === 'new').length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Parts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredParts.map((part) => (
          <Card key={part.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gray-200 relative">
              {part.images?.[0] ? (
                <img
                  src={part.images[0]}
                  alt={part.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="h-16 w-16 text-gray-400" />
                </div>
              )}
              <div className="absolute top-2 right-2 flex gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  part.condition === 'new' ? 'bg-green-100 text-green-800' :
                  part.condition === 'refurbished' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {part.condition}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  part.status === 'available' ? 'bg-green-100 text-green-800' :
                  part.status === 'sold' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {part.status}
                </span>
              </div>
            </div>

            <CardContent className="p-4">
              <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
                {part.title || part.partName}
              </h3>
              
              <p className="text-gray-600 text-sm mb-3">
                {part.manufacturer || 'Unknown'} • {part.partNumber || 'N/A'}
              </p>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <DollarSign className="h-4 w-4" />
                  <span className="font-semibold text-blue-600">
                    {part.price?.toLocaleString()}
                  </span>
                </div>
                {part.quantity && (
                  <span className="text-xs text-gray-500">
                    Qty: {part.quantity}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
                <Calendar className="h-3 w-3" />
                {new Date(part.createdAt).toLocaleDateString()}
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => router.push(`/parts/${part.id}`)}
                  className="flex-1"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>

                <button
                  onClick={() => handleDelete(part.id)}
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

      {filteredParts.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No parts found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
