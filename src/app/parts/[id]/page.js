'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import Button  from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Alert } from '@/components/ui/Alert';
import { Loader } from '@/components/ui/Loader';
import { Card, CardContent } from '@/components/ui/Card';
import { formatCurrency } from '@/lib/utils';
import {
  Package,
  MapPin,
  Calendar,
  User,
  Mail,
  Phone,
  ArrowLeft,
  Heart,
  Share2,
  Flag,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Edit,
  Trash2
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function PartDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user: clerkUser } = useAuth();
  const [part, setPart] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Fetch current user profile from backend
  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!clerkUser) return;
      
      try {
        console.log('🔍 Fetching current user profile...');
        const response = await api.get('/users/profile');
        console.log('✅ Current user profile:', response.data);
        setCurrentUser(response.data.data?.user || response.data.user);
      } catch (error) {
        console.error('❌ Error fetching user profile:', error);
      }
    };

    fetchCurrentUser();
  }, [clerkUser]);

  useEffect(() => {
    if (params.id) {
      fetchPartDetails();
    }
  }, [params.id]);

  const fetchPartDetails = async () => {
    try {
      setLoading(true);
      setError('');

      console.log('🔍 Fetching part details for ID:', params.id);

      const response = await api.get(`/parts/${params.id}`);
      
      console.log('✅ Part details:', response.data);
      console.log('🔍 Part sellerId:', response.data.data.part.sellerId);

      setPart(response.data.data.part);
    } catch (error) {
      console.error('❌ Error fetching part details:', error);
      
      if (error.response?.status === 404) {
        setError('Part not found');
      } else {
        setError('Failed to load part details');
      }
    } finally {
      setLoading(false);
    }
  };

  // Check if current user is the owner of this part
  // Compare with backend user ID, not Clerk ID
  const isOwner = currentUser && part && part.sellerId === currentUser.id;
  
  // Debug logging
  useEffect(() => {
    if (part && currentUser) {
      console.log('🔍 Ownership check:');
      console.log('  - Current user ID (from backend):', currentUser.id);
      console.log('  - Part sellerId:', part.sellerId);
      console.log('  - Are they equal?:', part.sellerId === currentUser.id);
      console.log('  - isOwner:', isOwner);
    }
  }, [part, currentUser, isOwner]);

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? (part.images?.length || 1) - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === (part.images?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const handleContactSeller = () => {
    // TODO: Implement contact seller functionality
    alert('Contact seller feature coming soon!');
  };

  const handleEditPart = () => {
    // Navigate to edit page
    router.push(`/dashboard/my-listings/edit/${part.id}`);
  };

  const handleDeletePart = async () => {
    if (!confirm('Are you sure you want to delete this part listing?')) {
      return;
    }

    try {
      await api.delete(`/parts/${part.id}`);
      alert('Part deleted successfully');
      router.push('/dashboard/my-listings');
    } catch (error) {
      console.error('Error deleting part:', error);
      alert('Failed to delete part');
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: Implement favorite functionality with API
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: part?.title || 'Vehicle Part',
        text: `Check out this part: ${part?.title}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader size="xl" />
      </div>
    );
  }

  if (error || !part) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Alert type="error" className="mb-6">
            {error || 'Part not found'}
          </Alert>
          <Button onClick={() => router.push('/parts')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Parts
          </Button>
        </div>
      </div>
    );
  }

  const images = part.images && part.images.length > 0 
    ? part.images 
    : [{ url: '/images/placeholder-part.jpg' }];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => router.push('/parts')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Parts
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                {/* Main Image */}
                <div className="relative h-96 bg-gray-200 rounded-t-xl overflow-hidden">
                  <img
                    src={images[currentImageIndex]?.url || '/images/placeholder-part.jpg'}
                    alt={part.title || 'Part image'}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Image Navigation */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={handlePreviousImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  {images.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  )}

                  {/* Condition Badge */}
                  {part.condition && (
                    <div className="absolute top-4 left-4">
                      <Badge variant={
                        part.condition === 'new' ? 'success' :
                        part.condition === 'refurbished' ? 'info' : 'warning'
                      }>
                        {part.condition.charAt(0).toUpperCase() + part.condition.slice(1)}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Thumbnail Images */}
                {images.length > 1 && (
                  <div className="p-4 flex gap-2 overflow-x-auto">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                          index === currentImageIndex
                            ? 'border-blue-600'
                            : 'border-gray-200'
                        }`}
                      >
                        <img
                          src={image.url}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Part Details */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Part Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {part.partNumber && (
                    <div>
                      <span className="text-sm text-gray-600">Part Number</span>
                      <p className="font-semibold">{part.partNumber}</p>
                    </div>
                  )}

                  {part.category && (
                    <div>
                      <span className="text-sm text-gray-600">Category</span>
                      <p className="font-semibold capitalize">
                        {part.category.replace(/_/g, ' ')}
                      </p>
                    </div>
                  )}

                  {part.brand && (
                    <div>
                      <span className="text-sm text-gray-600">Brand</span>
                      <p className="font-semibold">{part.brand}</p>
                    </div>
                  )}

                  {part.manufacturer && (
                    <div>
                      <span className="text-sm text-gray-600">Manufacturer</span>
                      <p className="font-semibold">{part.manufacturer}</p>
                    </div>
                  )}

                  {part.material && (
                    <div>
                      <span className="text-sm text-gray-600">Material</span>
                      <p className="font-semibold">{part.material}</p>
                    </div>
                  )}

                  {part.weight && (
                    <div>
                      <span className="text-sm text-gray-600">Weight</span>
                      <p className="font-semibold">{part.weight}</p>
                    </div>
                  )}

                  {part.warranty && (
                    <div>
                      <span className="text-sm text-gray-600">Warranty</span>
                      <p className="font-semibold">{part.warranty}</p>
                    </div>
                  )}

                  {part.quantity && (
                    <div>
                      <span className="text-sm text-gray-600">Available Quantity</span>
                      <p className="font-semibold">{part.quantity}</p>
                    </div>
                  )}

                  <div>
                    <span className="text-sm text-gray-600">In Stock</span>
                    <p className="font-semibold flex items-center gap-2">
                      {part.inStock ? (
                        <>
                          <Check className="h-4 w-4 text-green-600" />
                          <span className="text-green-600">Yes</span>
                        </>
                      ) : (
                        <>
                          <X className="h-4 w-4 text-red-600" />
                          <span className="text-red-600">No</span>
                        </>
                      )}
                    </p>
                  </div>
                </div>

                {/* Description */}
                {part.description && (
                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-600 whitespace-pre-wrap">{part.description}</p>
                  </div>
                )}

                {/* Compatible Vehicles */}
                {(part.compatibleMakes?.length > 0 || part.isUniversal) && (
                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Compatibility</h3>
                    {part.isUniversal ? (
                      <Badge variant="info">Universal Fit</Badge>
                    ) : (
                      <div className="space-y-2">
                        {part.compatibleMakes?.length > 0 && (
                          <div>
                            <span className="text-sm text-gray-600">Makes: </span>
                            <span>{part.compatibleMakes.join(', ')}</span>
                          </div>
                        )}
                        {part.compatibleModels?.length > 0 && (
                          <div>
                            <span className="text-sm text-gray-600">Models: </span>
                            <span>{part.compatibleModels.join(', ')}</span>
                          </div>
                        )}
                        {part.compatibleYears?.length > 0 && (
                          <div>
                            <span className="text-sm text-gray-600">Years: </span>
                            <span>{part.compatibleYears.join(', ')}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Purchase Info */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  {part.title || part.partName}
                </h1>

                {/* Price */}
                <div className="mb-6">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {formatCurrency(part.price)}
                  </div>
                  {part.priceNegotiable && (
                    <p className="text-sm text-gray-600">Price negotiable</p>
                  )}
                </div>

                {/* Swap Option */}
                {part.openToSwap && (
                  <Alert type="info" className="mb-4">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      <span className="font-semibold">Open to Swap</span>
                    </div>
                    {part.swapAdditionalNotes && (
                      <p className="text-sm mt-1">{part.swapAdditionalNotes}</p>
                    )}
                  </Alert>
                )}

                {/* Action Buttons */}
                <div className="space-y-3 mb-6">
                  {isOwner ? (
                    // Owner Actions
                    <>
                      <Button 
                        onClick={handleEditPart}
                        className="w-full"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Listing
                      </Button>

                      <Button
                        variant="outline"
                        onClick={handleDeletePart}
                        className="w-full text-red-600 border-red-300 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Listing
                      </Button>
                    </>
                  ) : (
                    // Buyer Actions
                    <>
                      <Button 
                        onClick={handleContactSeller}
                        className="w-full"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Contact Seller
                      </Button>

                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          variant="outline"
                          onClick={handleToggleFavorite}
                        >
                          <Heart
                            className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`}
                          />
                          {isFavorite ? 'Saved' : 'Save'}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleShare}
                        >
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </>
                  )}
                </div>

                {/* Location */}
                {(part.city || part.region) && (
                  <div className="border-t pt-4 mb-4">
                    <div className="flex items-start gap-2 text-gray-600">
                      <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Location</p>
                        <p>
                          {part.city}
                          {part.region && `, ${part.region}`}
                          {part.country && `, ${part.country}`}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Seller Info - Only show if not owner */}
                {!isOwner && part.seller && (
                  <div className="border-t pt-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Seller Information</h3>
                    <div className="flex items-center gap-3 mb-3">
                      {part.seller.avatarUrl ? (
                        <img
                          src={part.seller.avatarUrl}
                          alt={part.seller.firstName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                      <div>
                        <p className="font-semibold">
                          {part.seller.firstName} {part.seller.lastName}
                        </p>
                        {part.seller.username && (
                          <p className="text-sm text-gray-600">@{part.seller.username}</p>
                        )}
                      </div>
                    </div>

                    {part.seller.rating && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-yellow-500">★</span>
                        <span className="font-semibold">{part.seller.rating.toFixed(1)}</span>
                        {part.seller.reviewCount && (
                          <span className="text-gray-600">({part.seller.reviewCount} reviews)</span>
                        )}
                      </div>
                    )}

                    {part.seller.verificationBadges?.length > 0 && (
                      <div className="flex gap-2 mt-3">
                        {part.seller.verificationBadges.map((badge, index) => (
                          <Badge key={index} variant="success" className="text-xs">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Report - Only show if not owner */}
                {!isOwner && (
                  <div className="border-t pt-4 mt-4">
                    <button className="text-sm text-gray-600 hover:text-red-600 flex items-center gap-2">
                      <Flag className="h-4 w-4" />
                      Report this listing
                    </button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
