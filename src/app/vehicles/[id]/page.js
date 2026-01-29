'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import api from '@/lib/api';
import ImageGallery from '@/components/common/ImageGallery';
import { Badge } from '@/components/ui/Badge';
import  Button  from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import SwapProposalForm from '@/components/swap/SwapProposalForm';
import { Loader } from '@/components/ui/Loader';
import { Alert } from '@/components/ui/Alert';
import {
  Calendar,
  Gauge,
  Fuel,
  Settings,
  MapPin,
  Heart,
  Share2,
  MessageCircle,
  Shield,
  CheckCircle,
  Flag,
  ArrowLeft,
  Phone,
  Mail,
  User,
  Star,
  Edit,
  Trash2
} from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

export default function VehicleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  
  // Debug logging
  console.log('VehicleDetailPage - params:', params);
  console.log('VehicleDetailPage - params.id:', params?.id);
  const [vehicle, setVehicle] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Fetch current user profile from backend
  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!user) return;
      
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
  }, [user]);

  useEffect(() => {
    if (params.id) {
      fetchVehicleDetails();
    }
  }, [params.id]);

  // Debug logging - always run this hook
  useEffect(() => {
    if (vehicle && currentUser) {
      console.log('🔍 Ownership check:');
      console.log('  - Current user ID (from backend):', currentUser.id);
      console.log('  - Vehicle sellerId:', vehicle.sellerId);
      console.log('  - Are they equal?:', vehicle.sellerId === currentUser.id);
    }
  }, [vehicle, currentUser]);

  const fetchVehicleDetails = async () => {
    if (!params?.id) {
      console.error('Vehicle ID is missing from params');
      setError('Vehicle ID is missing');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log('Fetching vehicle with ID:', params.id);
      const response = await api.get(`/vehicles/${params.id}`);
      console.log('Vehicle response:', response.data);
      const vehicleData = response.data.data?.vehicle || response.data.data;
      setVehicle(vehicleData);
      
      // The vehicle data already includes isFavorited status
      if (vehicleData.isFavorited !== undefined) {
        setIsFavorite(vehicleData.isFavorited);
      }
    } catch (error) {
      console.error('Error fetching vehicle:', error);
      setError(error.response?.data?.message || 'Vehicle not found');
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    try {
      // Use the correct vehicle favorite endpoint
      const response = await api.patch(`/vehicles/${params.id}/favorite`);
      
      // Update state based on response
      if (response.data.data?.isFavorited !== undefined) {
        setIsFavorite(response.data.data.isFavorited);
      } else {
        // Toggle locally if response doesn't include status
        setIsFavorite(!isFavorite);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      alert('Failed to update favorite status. Please try again.');
    }
  };

  const handleContactSeller = () => {
    if (!user) {
      router.push('/login');
      return;
    }
    setShowContactModal(true);
  };

  const handleProposeSwap = () => {
    if (!user) {
      router.push('/login');
      return;
    }
    setShowSwapModal(true);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: vehicle.title,
          text: `Check out this vehicle: ${vehicle.title}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleReport = () => {
    if (!user) {
      router.push('/login');
      return;
    }
    setShowReportModal(true);
  };

  const handleEditVehicle = () => {
    // Navigate to edit page
    router.push(`/dashboard/my-listings/edit/${vehicle.id}`);
  };

  const handleDeleteVehicle = async () => {
    if (!confirm('Are you sure you want to delete this vehicle listing?')) {
      return;
    }

    try {
      await api.delete(`/vehicles/${vehicle.id}`);
      alert('Vehicle deleted successfully');
      router.push('/dashboard/my-listings');
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      alert('Failed to delete vehicle');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="xl" />
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Vehicle Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => router.push('/vehicles')}>
            Browse Vehicles
          </Button>
        </div>
      </div>
    );
  }

  // Check if current user is the owner
  // Compare with backend user ID, not Clerk ID
  const isOwner = currentUser && vehicle && vehicle.sellerId === currentUser.id;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <ImageGallery images={vehicle.images} />

            {/* Title and Basic Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {vehicle.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2">
                    {vehicle.isFeatured && (
                      <Badge variant="warning">⭐ Featured</Badge>
                    )}
                    {vehicle.acceptSwap && (
                      <Badge variant="success">🔄 Swap Available</Badge>
                    )}
                    <Badge variant="info">{vehicle.condition}</Badge>
                    {vehicle?.seller?.isVerified && (
                      <Badge variant="success">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified Seller
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleFavoriteToggle}
                    className={`p-2 rounded-full border ${
                      isFavorite
                        ? 'bg-red-50 border-red-200 text-red-600'
                        : 'bg-white border-gray-200 text-gray-600 hover:text-red-600'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-full border bg-white border-gray-200 text-gray-600 hover:text-blue-600"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="text-4xl font-bold text-blue-600 mb-6">
                {formatCurrency(vehicle.price)}
              </div>
            </div>

            {/* Key Specifications */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Key Specifications</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Calendar className="h-5 w-5" />
                    <span className="text-sm">Year</span>
                  </div>
                  <p className="font-semibold text-gray-900">{vehicle.year}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Gauge className="h-5 w-5" />
                    <span className="text-sm">Mileage</span>
                  </div>
                  <p className="font-semibold text-gray-900">
                    {vehicle.mileage?.toLocaleString()} km
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Fuel className="h-5 w-5" />
                    <span className="text-sm">Fuel Type</span>
                  </div>
                  <p className="font-semibold text-gray-900 capitalize">{vehicle.fuelType}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Settings className="h-5 w-5" />
                    <span className="text-sm">Transmission</span>
                  </div>
                  <p className="font-semibold text-gray-900 capitalize">{vehicle.transmission}</p>
                </div>
              </div>
            </div>

            {/* Full Specifications */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Full Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Make</span>
                  <span className="font-semibold">{vehicle.make}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Model</span>
                  <span className="font-semibold">{vehicle.model}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Body Type</span>
                  <span className="font-semibold capitalize">{vehicle.bodyType}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Engine Size</span>
                  <span className="font-semibold">{vehicle.engineSize}L</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Color</span>
                  <span className="font-semibold capitalize">{vehicle.color}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Condition</span>
                  <span className="font-semibold capitalize">{vehicle.condition}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{vehicle.description}</p>
            </div>

            {/* Features */}
            {vehicle.features && vehicle.features.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {vehicle.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Location</h2>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">
                    {vehicle?.city || 'Location'}, {vehicle?.region || 'Not specified'}
                  </p>
                  <p className="text-sm text-gray-600">{vehicle?.country || 'CM'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Right 1/3 */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Seller Info */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="font-bold text-lg mb-4">Seller Information</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
                    {vehicle?.seller?.avatar ? (
                      <Image
                        src={vehicle.seller.avatar}
                        alt={vehicle?.seller?.firstName || 'Seller'}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <User className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {vehicle?.seller?.firstName} {vehicle?.seller?.lastName}
                    </p>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Star className="h-3 w-3 fill-current text-yellow-500" />
                      <span>{vehicle?.seller?.rating || 'New'}</span>
                    </div>
                  </div>
                </div>

                {vehicle?.seller?.isVerified && (
                  <div className="flex items-center gap-2 text-sm text-green-600 mb-4">
                    <Shield className="h-4 w-4" />
                    <span>Verified Seller</span>
                  </div>
                )}

                <p className="text-sm text-gray-600 mb-4">
                  Member since {vehicle?.seller?.createdAt ? formatDate(vehicle.seller.createdAt) : 'Recently'}
                </p>

                {!isOwner && (
                  <div className="space-y-3">
                    <Button onClick={handleContactSeller} className="w-full gap-2">
                      <MessageCircle className="h-4 w-4" />
                      Contact Seller
                    </Button>

                    {vehicle.acceptSwap && (
                      <Button
                        onClick={handleProposeSwap}
                        variant="outline"
                        className="w-full gap-2"
                      >
                        🔄 Propose Swap
                      </Button>
                    )}
                  </div>
                )}

                {isOwner && (
                  <>
                    <Button 
                      onClick={handleEditVehicle}
                      className="w-full mb-3"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Listing
                    </Button>

                    <Button
                      variant="outline"
                      onClick={handleDeleteVehicle}
                      className="w-full text-red-600 border-red-300 hover:bg-red-50 mb-3"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Listing
                    </Button>

                    <Alert type="info">
                      This is your listing
                    </Alert>
                  </>
                )}
              </div>

              {/* Safety Tips */}
              <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <h3 className="font-bold text-blue-900">Safety Tips</h3>
                </div>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>• Meet in a safe, public location</li>
                  <li>• Inspect the vehicle thoroughly</li>
                  <li>• Verify all documents</li>
                  <li>• Never send money in advance</li>
                  <li>• Trust your instincts</li>
                </ul>
              </div>

              {/* Report Button */}
              {!isOwner && (
                <button
                  onClick={handleReport}
                  className="w-full flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  <Flag className="h-4 w-4" />
                  Report this listing
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Swap Proposal Modal */}
      {showSwapModal && (
        <Modal
          isOpen={showSwapModal}
          onClose={() => setShowSwapModal(false)}
          title="Propose a Swap"
          size="lg"
        >
          <SwapProposalForm
            targetVehicle={vehicle}
            onSuccess={() => {
              setShowSwapModal(false);
              alert('Swap proposal sent!');
            }}
            onCancel={() => setShowSwapModal(false)}
          />
        </Modal>
      )}

      {/* Contact Seller Modal */}
      {showContactModal && (
        <Modal
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
          title="Contact Seller"
        >
          <div className="space-y-4">
            <p className="text-gray-600">
              You can contact the seller using the following methods:
            </p>
            
            {vehicle?.seller?.phone && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-semibold">{vehicle.seller.phone}</p>
                </div>
              </div>
            )}

            {vehicle?.seller?.email && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold">{vehicle.seller.email}</p>
                </div>
              </div>
            )}

            <Button
              onClick={() => {
                setShowContactModal(false);
                router.push(`/messages?userId=${vehicle?.seller?.id}`);
              }}
              className="w-full gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              Send Message
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
