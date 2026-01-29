'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { 
  Car, Package, Repeat, Heart, TrendingUp, Eye, 
  Plus, MessageCircle, DollarSign, Clock, MapPin,
  CheckCircle, XCircle, AlertCircle
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalListings: 0,
    activeListings: 0,
    soldListings: 0,
    activeSwaps: 0,
    completedSwaps: 0,
    favorites: 0,
    totalViews: 0,
    unreadMessages: 0,
  });
  const [recentListings, setRecentListings] = useState([]);
  const [recentSwaps, setRecentSwaps] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    fetchDashboardData();
  }, [isAuthenticated]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all dashboard data
      const [listingsRes, swapsRes, favoritesRes] = await Promise.all([
        api.get('/vehicles/my/listings?limit=5'),  // Changed from my-listings
        api.get('/swaps?limit=5'),  // Changed from /swaps/my-swaps
        api.get('/users/favorites?limit=5')
      ]);

      const listings = listingsRes.data.data.vehicles || [];
      const swaps = swapsRes.data.data.swaps || [];

      // Calculate stats
      const totalViews = listings.reduce((sum, listing) => sum + (listing.views || 0), 0);
      const activeListings = listings.filter(l => l.status === 'active').length;
      const soldListings = listings.filter(l => l.status === 'sold').length;
      const activeSwapsCount = swaps.filter(s => s.status === 'pending' || s.status === 'accepted').length;
      const completedSwapsCount = swaps.filter(s => s.status === 'completed').length;

      setStats({
        totalListings: listingsRes.data.data.pagination?.total || 0,
        activeListings,
        soldListings,
        activeSwaps: activeSwapsCount,
        completedSwaps: completedSwapsCount,
        favorites: favoritesRes.data.data.favorites?.length || 0,
        totalViews,
        unreadMessages: 0, // Would come from messages API
      });

      setRecentListings(listings);
      setRecentSwaps(swaps);

      // Create recent activity timeline
      const activity = [
        ...listings.map(l => ({
          type: 'listing',
          action: 'created',
          item: l,
          timestamp: l.createdAt
        })),
        ...swaps.map(s => ({
          type: 'swap',
          action: s.status,
          item: s,
          timestamp: s.createdAt
        }))
      ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 5);

      setRecentActivity(activity);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'pending': return 'warning';
      case 'sold': return 'default';
      case 'completed': return 'success';
      case 'rejected': return 'danger';
      case 'cancelled': return 'default';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.firstName}! 👋
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your listings and swaps
          </p>
        </div>

        {/* Primary Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Listings</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalListings}</p>
                  <p className="text-xs text-green-600 mt-1">
                    {stats.activeListings} active
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Car className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Swaps</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.activeSwaps}</p>
                  <p className="text-xs text-blue-600 mt-1">
                    {stats.completedSwaps} completed
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <Repeat className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Views</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalViews}</p>
                  <p className="text-xs text-purple-600 mt-1">
                    On your listings
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Eye className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Favorites</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.favorites}</p>
                  <p className="text-xs text-red-600 mt-1">
                    Saved items
                  </p>
                </div>
                <div className="p-3 bg-red-100 rounded-lg">
                  <Heart className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link href="/dashboard/create-listing">
            <Card className="hover:shadow-lg hover:border-blue-400 transition-all cursor-pointer h-full border-2 border-transparent">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Plus className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Create Listing</h3>
                    <p className="text-sm text-gray-600">List a new vehicle or part</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/vehicles">
            <Card className="hover:shadow-lg hover:border-green-400 transition-all cursor-pointer h-full border-2 border-transparent">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Car className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Browse Vehicles</h3>
                    <p className="text-sm text-gray-600">Find your next vehicle</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/messages">
            <Card className="hover:shadow-lg hover:border-purple-400 transition-all cursor-pointer h-full border-2 border-transparent">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <MessageCircle className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Messages</h3>
                    <p className="text-sm text-gray-600">Chat with buyers/sellers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Listings */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Recent Listings</h2>
                  <Link href="/dashboard/my-listings">
                    <Button variant="ghost" size="sm">View All</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {recentListings.length === 0 ? (
                  <div className="text-center py-12">
                    <Car className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">No listings yet</p>
                    <Link href="/dashboard/create-listing">
                      <Button size="sm">Create Your First Listing</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentListings.map((listing) => (
                      <Link 
                        key={listing._id}
                        href={`/vehicles/${listing._id}`}
                      >
                        <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all cursor-pointer">
                          <img 
                            src={listing.images?.[0]?.url || '/images/placeholder-car.jpg'}
                            alt={listing.title}
                            className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 mb-1 truncate">
                              {listing.title}
                            </h3>
                            <p className="text-lg font-bold text-blue-600 mb-2">
                              {formatCurrency(listing.price)}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                {listing.views || 0} views
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {formatDistanceToNow(new Date(listing.createdAt), { addSuffix: true })}
                              </span>
                            </div>
                          </div>
                          <Badge variant={getStatusColor(listing.status)}>
                            {listing.status}
                          </Badge>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Recent Activity</h2>
              </CardHeader>
              <CardContent>
                {recentActivity.length === 0 ? (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-600 text-sm">No recent activity</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="flex-shrink-0">
                          {activity.type === 'listing' ? (
                            <div className="p-2 bg-blue-100 rounded-full">
                              <Car className="h-4 w-4 text-blue-600" />
                            </div>
                          ) : (
                            <div className="p-2 bg-green-100 rounded-full">
                              <Repeat className="h-4 w-4 text-green-600" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 font-medium">
                            {activity.type === 'listing' 
                              ? 'Created listing' 
                              : `Swap ${activity.action}`
                            }
                          </p>
                          <p className="text-sm text-gray-600 truncate">
                            {activity.type === 'listing'
                              ? activity.item.title
                              : `${activity.item.proposedVehicle?.title || 'Vehicle'} ↔ ${activity.item.requestedVehicle?.title || 'Vehicle'}`
                            }
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Swap Requests */}
            <Card className="mt-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Swap Requests</h2>
                  <Link href="/dashboard/my-swaps">
                    <Button variant="ghost" size="sm">View All</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {recentSwaps.length === 0 ? (
                  <div className="text-center py-8">
                    <Repeat className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-600 text-sm mb-4">No swap proposals yet</p>
                    <Link href="/vehicles">
                      <Button size="sm" variant="outline">Browse Vehicles</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recentSwaps.slice(0, 3).map((swap) => (
                      <div 
                        key={swap._id}
                        className="p-3 border border-gray-200 rounded-lg hover:border-blue-400 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant={getStatusColor(swap.status)}>
                            {swap.status}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {formatDistanceToNow(new Date(swap.createdAt), { addSuffix: true })}
                          </span>
                        </div>
                        <p className="text-sm text-gray-900 font-medium">
                          {swap.proposedVehicle?.title || 'Your vehicle'}
                        </p>
                        <div className="flex items-center gap-2 my-1">
                          <Repeat className="h-3 w-3 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-600">
                          {swap.requestedVehicle?.title || 'Their vehicle'}
                        </p>
                      </div>
                    ))}
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
