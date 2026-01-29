'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Loader } from '@/components/ui/Loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { 
  TrendingUp, 
  TrendingDown,
  Users, 
  Car,
  DollarSign,
  Repeat,
  BarChart3,
  Activity,
  Calendar
} from 'lucide-react';

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('30');

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/admin/dashboard/analytics?period=${period}`);
      setAnalytics(response.data.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader size="xl" />
      </div>
    );
  }

  const growthMetrics = [
    {
      title: 'User Growth',
      value: analytics?.userGrowth || 0,
      icon: Users,
      color: 'blue',
      trend: '+12%'
    },
    {
      title: 'Listing Growth',
      value: analytics?.listingGrowth || 0,
      icon: Car,
      color: 'green',
      trend: '+8%'
    },
    {
      title: 'Swap Activity',
      value: analytics?.swapStats?.length || 0,
      icon: Repeat,
      color: 'purple',
      trend: '+15%'
    },
    {
      title: 'Revenue',
      value: `$${(analytics?.revenue || 0).toLocaleString()}`,
      icon: DollarSign,
      color: 'orange',
      trend: '+20%'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Track platform performance and growth metrics</p>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Growth Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {growthMetrics.map((metric, index) => {
          const Icon = metric.icon;
          const colorClasses = {
            blue: 'bg-blue-100 text-blue-600',
            green: 'bg-green-100 text-green-600',
            purple: 'bg-purple-100 text-purple-600',
            orange: 'bg-orange-100 text-orange-600'
          };

          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${colorClasses[metric.color]}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                    <TrendingUp className="h-4 w-4" />
                    {metric.trend}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">{metric.title}</p>
                <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* User Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              User Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Chart will be displayed here</p>
                <p className="text-sm text-gray-400">Integration with charting library required</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Revenue Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Chart will be displayed here</p>
                <p className="text-sm text-gray-400">Integration with charting library required</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Swap Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Swap Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          {analytics?.swapStats && analytics.swapStats.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {analytics.swapStats.map((stat, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1 capitalize">{stat.status}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat._count}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No swap data available</p>
          )}
        </CardContent>
      </Card>

      {/* Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Top Sellers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                      {i}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">User {i}</p>
                      <p className="text-sm text-gray-500">{10 - i * 2} listings</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${(5000 - i * 500).toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Total value</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {['Sedan', 'SUV', 'Truck', 'Motorcycle', 'Parts'].map((category, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{category}</p>
                    <p className="text-sm text-gray-500">{100 - i * 15} listings</p>
                  </div>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${100 - i * 15}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
