'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import Button  from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Alert } from '@/components/ui/Alert';
import { Loader } from '@/components/ui/Loader';
import { Modal } from '@/components/ui/Modal';
import { formatCurrency, formatRelativeTime } from '@/lib/utils';
import { Edit, Trash2, Eye, Plus, Car } from 'lucide-react';

export default function MyListingsPage() {
  const router = useRouter();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [listingToDelete, setListingToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await api.get('/vehicles/my-listings');
      setListings(response.data.data.vehicles || []);
    } catch (error) {
      console.error('Error fetching listings:', error);
      setError('Failed to load listings');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!listingToDelete) return;

    setDeleting(true);
    try {
      await api.delete(`/vehicles/${listingToDelete.id}`);
      setListings(listings.filter(l => l.id !== listingToDelete.id));
      setDeleteModalOpen(false);
      setListingToDelete(null);
    } catch (error) {
      console.error('Error deleting listing:', error);
      setError('Failed to delete listing');
    } finally {
      setDeleting(false);
    }
  };

  const confirmDelete = (listing) => {
    setListingToDelete(listing);
    setDeleteModalOpen(true);
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
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Listings</h1>
            <p className="text-gray-600">Manage your vehicle and parts listings</p>
          </div>
          <Link href="/dashboard/create-listing">
            <Button leftIcon={<Plus className="h-5 w-5" />}>
              Create New Listing
            </Button>
          </Link>
        </div>

        {error && (
          <Alert type="error" className="mb-6" onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {/* Listings */}
        {listings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Car className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No listings yet
            </h3>
            <p className="text-gray-600 mb-6">
              Create your first listing to start selling or swapping
            </p>
            <Link href="/dashboard/create-listing">
              <Button>Create Your First Listing</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={listing.images?.[0]?.url || '/images/placeholder-car.jpg'}
                      alt={listing.title}
                      className="w-full md:w-48 h-32 object-cover rounded-lg"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {listing.title}
                        </h3>
                        <p className="text-2xl font-bold text-blue-600">
                          {formatCurrency(listing.price)}
                        </p>
                      </div>
                      <Badge
                        variant={
                          listing.status === 'active' ? 'success' :
                          listing.status === 'sold' ? 'default' : 'warning'
                        }
                      >
                        {listing.status}
                      </Badge>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {listing.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                      <span>{listing.year}</span>
                      <span>•</span>
                      <span>{listing.mileage?.toLocaleString()} km</span>
                      <span>•</span>
                      <span className="capitalize">{listing.fuelType}</span>
                      <span>•</span>
                      <span>{listing.location?.city}</span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>👁 {listing.views || 0} views</span>
                      <span>•</span>
                      <span>Posted {formatRelativeTime(new Date(listing.createdAt))}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex md:flex-col gap-2">
                    <Link href={`/vehicles/${listing.id}`} className="flex-1 md:flex-none">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        leftIcon={<Eye className="h-4 w-4" />}
                      >
                        View
                      </Button>
                    </Link>
                    <Link href={`/dashboard/edit-listing/${listing.id}`} className="flex-1 md:flex-none">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        leftIcon={<Edit className="h-4 w-4" />}
                      >
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => confirmDelete(listing)}
                      className="flex-1 md:flex-none text-red-600 hover:bg-red-50 hover:border-red-300"
                      leftIcon={<Trash2 className="h-4 w-4" />}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Listing"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete "{listingToDelete?.title}"? This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={() => setDeleteModalOpen(false)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              loading={deleting}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleting ? 'Deleting...' : 'Delete Listing'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
