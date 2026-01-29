import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Package, Tag } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

export default function PartCard({ part }) {
  const primaryImage = part.images?.[0]?.url || '/images/placeholder-part.jpg';

  return (
    <Link href={`/parts/${part._id}`}>
      <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200">
        {/* Image */}
        <div className="relative h-48 bg-gray-200 overflow-hidden">
          <Image
            src={primaryImage}
            alt={part.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {part.isNew && (
              <Badge variant="success" size="sm">
                ✨ New
              </Badge>
            )}
            {part.condition && (
              <Badge variant="info" size="sm">
                {part.condition}
              </Badge>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-bold text-lg mb-2 text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors min-h-[3.5rem]">
            {part.title}
          </h3>
          
          <div className="text-2xl font-bold text-blue-600 mb-3">
            {formatCurrency(part.price)}
          </div>

          {/* Part Details */}
          <div className="space-y-2 text-sm text-gray-600 mb-4">
            {part.partCategory && (
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-gray-400" />
                <span className="capitalize">{part.partCategory}</span>
              </div>
            )}
            
            {part.compatibility && (
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-gray-400" />
                <span>{part.compatibility}</span>
              </div>
            )}
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-gray-600 pt-4 border-t border-gray-100">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span>{part.location?.city}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
