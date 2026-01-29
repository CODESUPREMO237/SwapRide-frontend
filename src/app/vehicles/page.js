'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import VehicleCard from '@/components/vehicles/VehicleCard';
import VehicleFilters from '@/components/vehicles/VehicleFilters';
import { Loader } from '@/components/ui/Loader';
import { Alert } from '@/components/ui/Alert';
import { Car } from 'lucide-react';

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
    limit: 12
  });
  const [filters, setFilters] = useState({
    search: '',
    make: '',
    minPrice: '',
    maxPrice: '',
    minYear: '',
    maxYear: '',
    fuelType: '',
    transmission: '',
    condition: '',
    acceptSwap: false,
  });

  useEffect(() => {
    fetchVehicles();
  }, [filters, pagination.page]);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Build query params
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...Object.fromEntries(
          Object.entries(filters).filter(([_, value]) => value !== '' && value !== false)
        )
      };

      console.log('Fetching vehicles with params:', params);
      const response = await api.get('/vehicles', { params });
      console.log('Vehicles response:', response.data);
      
      // Handle different response structures
      const vehiclesData = response.data.data?.vehicles || response.data.data || response.data.vehicles || [];
      const paginationData = response.data.data?.pagination || response.data.pagination || {};
      
      console.log('Vehicles data:', vehiclesData);
      console.log('Pagination data:', paginationData);
      
      setVehicles(Array.isArray(vehiclesData) ? vehiclesData : []);
      setPagination(prev => ({
        ...prev,
        page: paginationData.page || prev.page,
        pages: paginationData.pages || paginationData.totalPages || 1,
        total: paginationData.total || paginationData.totalVehicles || vehiclesData.length,
        limit: paginationData.limit || prev.limit
      }));
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      console.error('Error response:', error.response?.data);
      setError(error.response?.data?.message || 'Failed to load vehicles. Please try again.');
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFavoriteToggle = async (vehicleId) => {
    // TODO: Implement favorite toggle
    console.log('Toggle favorite:', vehicleId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Car className="h-10 w-10 text-blue-600" />
            Browse Vehicles
          </h1>
          <p className="text-gray-600">
            Find your perfect vehicle from thousands of listings
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <VehicleFilters 
                filters={filters} 
                setFilters={setFilters}
                onSearch={fetchVehicles}
              />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="mb-6 flex items-center justify-between bg-white rounded-lg shadow-sm p-4 border border-gray-200">
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">{pagination.total || 0}</span> vehicles found
              </div>
              {/* TODO: Add sort dropdown */}
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
                {/* Vehicles Grid */}
                {vehicles.length === 0 ? (
                  <div className="text-center py-20">
                    <Car className="h-20 w-20 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No vehicles found
                    </h3>
                    <p className="text-gray-600">
                      Try adjusting your filters to see more results
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {vehicles.map((vehicle) => {
                      const vehicleId = vehicle.id || vehicle._id;
                      return (
                        <VehicleCard 
                          key={vehicleId} 
                          vehicle={vehicle}
                          onFavoriteToggle={handleFavoriteToggle}
                        />
                      );
                    })}
                  </div>
                )}

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <nav className="flex items-center gap-2">
                      <button
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page === 1}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Previous
                      </button>
                      
                      {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`
                            px-4 py-2 border rounded-lg transition-colors
                            ${page === pagination.page 
                              ? 'bg-blue-600 text-white border-blue-600' 
                              : 'border-gray-300 hover:bg-gray-50'
                            }
                          `}
                        >
                          {page}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page === pagination.pages}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
