'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import  Button  from '@/components/ui/Button';
import  Input  from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Alert } from '@/components/ui/Alert';
import { Loader } from '@/components/ui/Loader';
import { Card, CardContent } from '@/components/ui/Card';
import { formatCurrency } from '@/lib/utils';
import { Package, Search, MapPin, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function PartsPage() {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    condition: '',
    minPrice: '',
    maxPrice: '',
  });
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
    limit: 12
  });

  useEffect(() => {
    fetchParts();
  }, [filters, pagination.page]);

  const fetchParts = async () => {
    try {
      setLoading(true);
      setError(''); // Clear previous errors
      
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...Object.fromEntries(
          Object.entries(filters).filter(([_, value]) => value !== '')
        )
      };

      // Debug logging
      console.log('🔍 Fetching parts with params:', params);
      console.log('📍 API Base URL:', api.defaults.baseURL);

      const response = await api.get('/parts', { params });
      
      console.log('✅ Parts response:', response.data);
      console.log('📊 Total parts found:', response.data.data?.parts?.length || 0);
      
      const partsData = response.data.data.parts || [];
      setParts(partsData);
      
      setPagination(prev => ({
        ...prev,
        page: response.data.pagination?.page || prev.page,
        pages: response.data.pagination?.pages || prev.pages,
        total: response.data.pagination?.total || 0,
        limit: response.data.pagination?.limit || prev.limit
      }));

      if (partsData.length === 0) {
        console.warn('⚠️ No parts returned from API');
      }
    } catch (error) {
      console.error('❌ Error fetching parts:', error);
      
      if (error.response) {
        console.error('📛 Response status:', error.response.status);
        console.error('📛 Response data:', error.response.data);
        setError(`Failed to load parts: ${error.response.data?.message || 'Server error'}`);
      } else if (error.request) {
        console.error('📛 No response received');
        setError('Failed to load parts: No response from server. Is the backend running?');
      } else {
        console.error('📛 Request error:', error.message);
        setError(`Failed to load parts: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const partCategories = [
    'engine',
    'transmission',
    'suspension',
    'brakes',
    'electrical',
    'body',
    'interior',
    'exterior',
    'wheels_tires',
    'exhaust',
    'cooling',
    'fuel_system',
    'lights',
    'accessories',
    'other'
  ];

  const conditions = ['new', 'used', 'refurbished', 'scrap'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Package className="h-10 w-10 text-blue-600" />
            Vehicle Parts
          </h1>
          <p className="text-gray-600">
            Find genuine and aftermarket parts for your vehicle
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <Input
                placeholder="Search parts..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                leftIcon={<Search className="h-5 w-5 text-gray-400" />}
              />
            </div>

            <Select
              options={[
                { value: '', label: 'All Categories' },
                ...partCategories.map(cat => ({ 
                  value: cat, 
                  label: cat.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
                }))
              ]}
              value={filters.category}
              onChange={(value) => handleFilterChange('category', value)}
            />

            <Select
              options={[
                { value: '', label: 'All Conditions' },
                ...conditions.map(cond => ({ 
                  value: cond, 
                  label: cond.charAt(0).toUpperCase() + cond.slice(1)
                }))
              ]}
              value={filters.condition}
              onChange={(value) => handleFilterChange('condition', value)}
            />

            <Button onClick={fetchParts}>
              Search
            </Button>
          </div>
        </div>

        {error && (
          <Alert type="error" className="mb-6" onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {/* Results */}
        <div className="mb-6 text-sm text-gray-600">
          <span className="font-semibold text-gray-900">{pagination.total || 0}</span> parts found
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader size="xl" />
          </div>
        ) : parts.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No parts found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filters
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {parts.map((part) => (
                <Link key={part.id} href={`/parts/${part.id}`}>
                  <Card className="hover:shadow-lg transition-shadow h-full">
                    <div className="relative h-48 bg-gray-200">
                      <img
                        src={part.images?.[0]?.url || '/images/placeholder-part.jpg'}
                        alt={part.title || part.partName}
                        className="w-full h-full object-cover"
                      />
                      {part.condition && (
                        <div className="absolute top-3 left-3">
                          <Badge variant={
                            part.condition === 'new' ? 'success' :
                            part.condition === 'refurbished' ? 'info' : 'warning'
                          }>
                            {part.condition}
                          </Badge>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                        {part.title || part.partName}
                      </h3>
                      
                      <div className="text-2xl font-bold text-blue-600 mb-3">
                        {formatCurrency(part.price)}
                      </div>

                      {part.partNumber && (
                        <p className="text-sm text-gray-600 mb-2">
                          Part #: {part.partNumber}
                        </p>
                      )}

                      <div className="space-y-2 text-sm text-gray-600">
                        {part.category && (
                          <p className="capitalize">
                            {part.category.replace(/_/g, ' ')}
                          </p>
                        )}
                        {(part.city || part.location?.city) && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{part.city || part.location?.city}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                    disabled={pagination.page === 1}
                  >
                    Previous
                  </Button>
                  
                  {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={page === pagination.page ? 'primary' : 'outline'}
                      onClick={() => setPagination(prev => ({ ...prev, page }))}
                    >
                      {page}
                    </Button>
                  ))}
                  
                  <Button
                    variant="outline"
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                    disabled={pagination.page === pagination.pages}
                  >
                    Next
                  </Button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
