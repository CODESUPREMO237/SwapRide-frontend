import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Calendar, Gauge, Fuel, Settings, Heart } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

export default function VehicleCard({ vehicle, onFavoriteToggle }) {
  // Ensure we have a valid ID (handle both id and _id from MongoDB)
  const vehicleId = vehicle.id || vehicle._id;
  
  const primaryImage = vehicle.images?.[0]?.url || vehicle.images?.[0] || '/images/placeholder-car.jpg';
  const vehicleTitle = vehicle.title || `${vehicle.year || ''} ${vehicle.make || ''} ${vehicle.model || ''}`.trim() || 'Vehicle';
  
  // Debug - log if ID is missing
  if (!vehicleId) {
    console.error('VehicleCard: Missing vehicle ID', vehicle);
  }

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200">
      <Link href={`/vehicles/${vehicleId}`}>
        {/* Image */}
        <div className="relative h-56 bg-gray-200 overflow-hidden">
          <Image
            src={primaryImage}
            alt={vehicleTitle}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {vehicle.isFeatured && (
              <Badge variant="warning" size="sm">
                ⭐ Featured
              </Badge>
            )}
            {vehicle.acceptSwap && (
              <Badge variant="success" size="sm">
                🔄 Swap Available
              </Badge>
            )}
            {vehicle.condition && (
              <Badge variant="info" size="sm">
                {vehicle.condition}
              </Badge>
            )}
          </div>

          {/* Favorite Button */}
          {onFavoriteToggle && vehicleId && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onFavoriteToggle(vehicleId);
              }}
              className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
              aria-label="Add to favorites"
            >
              <Heart className="h-5 w-5 text-gray-600 hover:text-red-500" />
            </button>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        <Link href={`/vehicles/${vehicleId}`}>
          <h3 className="font-bold text-xl mb-2 text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {vehicleTitle}
          </h3>
        </Link>
        
        <div className="text-3xl font-bold text-blue-600 mb-4">
          {formatCurrency(vehicle.price)}
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span>{vehicle.year}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Gauge className="h-4 w-4 text-gray-400" />
            <span>{vehicle.mileage?.toLocaleString()} km</span>
          </div>
          
          {vehicle.fuelType && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Fuel className="h-4 w-4 text-gray-400" />
              <span className="capitalize">{vehicle.fuelType}</span>
            </div>
          )}
          
          {vehicle.transmission && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Settings className="h-4 w-4 text-gray-400" />
              <span className="capitalize">{vehicle.transmission}</span>
            </div>
          )}
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-gray-600 pt-4 border-t border-gray-100">
          <MapPin className="h-4 w-4 text-gray-400" />
          <span>{vehicle?.city || 'Location'}, {vehicle?.region || 'Region'}</span>
        </div>
      </div>
    </div>
  );
}
