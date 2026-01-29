'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import VehicleCard from '@/components/vehicles/VehicleCard';
import { Loader } from '@/components/ui/Loader';
import { Alert } from '@/components/ui/Alert';
import Button from '@/components/ui/Button';  // ✅ Correct (default import)
import { Heart } from 'lucide-react';

export default function FavoritesPage() {
  const router = useRouter();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users/favorites');
      console.log('Favorites response:', response.data);
      const favoritesData = response.data.data?.favorites || [];
      setFavorites(favoritesData);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setError('Failed to load favorites');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (vehicleId) => {
    try {
      // Use the vehicle's toggle favorite endpoint
      await api.patch(`/vehicles/${vehicleId}/favorite`);
      // Remove from local state
      setFavorites(prev => prev.filter(f => {
        const fVehicleId = f.vehicle?.id || f.vehicle?._id || f.vehicleId;
        return fVehicleId !== vehicleId;
      }));
    } catch (error) {
      console.error('Error removing favorite:', error);
      setError('Failed to remove favorite');
    }
  };

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Favorites</h1>
          <p className="text-gray-600">Vehicles you've saved for later</p>
        </div>

        {error && (
          <Alert type="error" className="mb-6" onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {favorites.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Heart className="h-20 w-20 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              No favorites yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start browsing and save vehicles you're interested in
            </p>
            <Button onClick={() => router.push('/vehicles')}>
              Browse Vehicles
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((favorite) => {
              // Handle both id and _id
              const favoriteId = favorite.id || favorite._id;
              const vehicleId = favorite.vehicle?.id || favorite.vehicle?._id;
              
              return (
                <VehicleCard
                  key={favoriteId || vehicleId}
                  vehicle={favorite.vehicle}
                  onFavoriteToggle={() => handleRemoveFavorite(vehicleId)}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
