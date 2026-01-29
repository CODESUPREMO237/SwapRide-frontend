'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { Loader } from '@/components/ui/Loader';
import { 
  Users, 
  Car, 
  Package, 
  Repeat, 
  DollarSign, 
  AlertTriangle,
  Star,
  TrendingUp,
  Activity,
  Settings as SettingsIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function AdminDashboard() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is admin
    if (!authLoading && !user) {
      router.push('/login?redirect=/admin');
      return;
    }

    if (user) {
      fetchDashboardStats();
    }
  }, [user, authLoading, router]);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/dashboard/stats');
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      
      // Check if user is not admin
      if (error.response?.status === 403) {
        setError('You do not have admin privileges. Access denied.');
      } else {
        setError(error.response?.data?.message || 'Failed to load dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => router.push('/dashboard')}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats?.stats?.users?.total || 0,
      subtitle: `${stats?.stats?.users?.active || 0} active`,
      icon: Users,
      color: 'blue',
      link: '/admin/users'
    },
    {
      title: 'Vehicles',
      value: stats?.stats?.vehicles?.total || 0,
      subtitle: `${stats?.stats?.vehicles?.active || 0} active`,
      icon: Car,
      color: 'green',
      link: '/admin/vehicles'
    },
    {
      title: 'Parts',
      value: stats?.stats?.parts?.total || 0,
      subtitle: 'Total listings',
      icon: Package,
      color: 'purple',
      link: '/admin/parts'
    },
    {
      title: 'Swaps',
      value: stats?.stats?.swaps?.total || 0,
      subtitle: 'All time',
      icon: Repeat,
      color: 'orange',
      link: '/admin/swaps'
    },
    {
      title: 'Pending Reports',
      value: stats?.stats?.pending?.reports || 0,
      subtitle: 'Needs review',
      icon: AlertTriangle,
      color: 'red',
      link: '/admin/reports'
    },
    {
      title: 'Pending Reviews',
      value: stats?.stats?.pending?.reviews || 0,
      subtitle: 'Awaiting approval',
      icon: Star,
      color: 'yellow',
      link: '/admin/reviews'
    }
  ];

  const quickActions = [
    { label: 'Manage Users', icon: Users, link: '/admin/users' },
    { label: 'Manage Listings', icon: Car, link: '/admin/listings' },
    { label: 'View Reports', icon: AlertTriangle, link: '/admin/reports' },
    { label: 'System Settings', icon: SettingsIcon, link: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Welcome back, {user?.firstName}! Here's what's happening.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-500" />
              <span className="text-sm text-gray-600">System Online</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: 'bg-blue-100 text-blue-600',
              green: 'bg-green-100 text-green-600',
              purple: 'bg-purple-100 text-purple-600',
              orange: 'bg-orange-100 text-orange-600',
              red: 'bg-red-100 text-red-600',
              yellow: 'bg-yellow-100 text-yellow-600'
            };

            return (
              <Card 
                key={index}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => router.push(stat.link)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${colorClasses[stat.color]}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={() => router.push(action.link)}
                  className="flex flex-col items-center justify-center p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all"
                >
                  <Icon className="h-8 w-8 text-blue-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Users */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Users</h3>
              {stats?.recentUsers?.length > 0 ? (
                <div className="space-y-3">
                  {stats.recentUsers.slice(0, 5).map((user) => (
                    <div 
                      key={user.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => router.push(`/admin/users/${user.id}`)}
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          user.accountStatus === 'active' 
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {user.accountStatus}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No recent users</p>
              )}
            </div>
          </Card>

          {/* Recent Listings */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Listings</h3>
              {stats?.recentListings?.length > 0 ? (
                <div className="space-y-3">
                  {stats.recentListings.slice(0, 5).map((listing) => (
                    <div 
                      key={listing.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => router.push(`/vehicles/${listing.id}`)}
                    >
                      <div>
                        <p className="font-medium text-gray-900">{listing.title}</p>
                        <p className="text-sm text-gray-600">
                          {listing.make} {listing.model}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-blue-600">
                          ${listing.price?.toLocaleString()}
                        </p>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                          listing.status === 'active' 
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {listing.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No recent listings</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
