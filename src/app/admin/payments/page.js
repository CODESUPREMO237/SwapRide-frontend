'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Loader } from '@/components/ui/Loader';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { 
  Search, 
  Filter, 
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  RefreshCw,
  User,
  Calendar,
  CreditCard
} from 'lucide-react';

export default function AdminPaymentsPage() {
  const router = useRouter();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/payments');
      setPayments(response.data.data?.payments || response.data.data || []);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefund = async (id) => {
    if (!confirm('Are you sure you want to process a refund for this payment?')) return;

    const amount = prompt('Enter refund amount:');
    if (!amount) return;

    try {
      await api.post(`/admin/payments/${id}/refund`, { amount: parseFloat(amount) });
      fetchPayments();
    } catch (error) {
      console.error('Error processing refund:', error);
      alert('Failed to process refund');
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.transactionId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.user?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filterStatus === 'all' || 
      payment.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'failed': return <XCircle className="h-4 w-4" />;
      case 'refunded': return <RefreshCw className="h-4 w-4" />;
      default: return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader size="xl" />
      </div>
    );
  }

  const totalRevenue = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + (p.amount || 0), 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payments Management</h1>
        <p className="text-gray-600">Monitor and manage all platform transactions</p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by transaction ID or user..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
            <div>
              <p className="text-sm text-gray-600">Total Payments</p>
              <p className="text-2xl font-bold text-gray-900">{payments.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600">
                ${totalRevenue.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {payments.filter(p => p.status === 'completed').length}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Failed</p>
              <p className="text-2xl font-bold text-red-600">
                {payments.filter(p => p.status === 'failed').length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payments List */}
      <div className="space-y-4">
        {filteredPayments.map((payment) => (
          <Card key={payment.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                    <h3 className="font-bold text-lg">
                      Transaction #{payment.transactionId || payment.id}
                    </h3>
                    <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                      {getStatusIcon(payment.status)}
                      {payment.status}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <User className="h-4 w-4" />
                        <span className="font-medium">
                          {payment.user?.firstName} {payment.user?.lastName}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 ml-6">{payment.user?.email}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(payment.createdAt).toLocaleString()}
                      </div>
                      {payment.paymentMethod && (
                        <p className="text-xs text-gray-500 ml-6">
                          Method: {payment.paymentMethod}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <div>
                      <p className="text-sm text-gray-600">Amount</p>
                      <p className="text-2xl font-bold text-gray-900">
                        ${payment.amount?.toLocaleString() || '0'}
                      </p>
                    </div>

                    {payment.description && (
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Description</p>
                        <p className="text-sm text-gray-900">{payment.description}</p>
                      </div>
                    )}
                  </div>

                  {payment.refundedAmount > 0 && (
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-sm text-blue-600">
                        Refunded: ${payment.refundedAmount.toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  {payment.status === 'completed' && !payment.refundedAmount && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRefund(payment.id)}
                      className="gap-2"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Refund
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => router.push(`/admin/payments/${payment.id}`)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPayments.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <DollarSign className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No payments found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
