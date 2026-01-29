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
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  User,
  FileText,
  Calendar,
  Flag
} from 'lucide-react';

export default function AdminReportsPage() {
  const router = useRouter();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/reports');
      setReports(response.data.data?.reports || response.data.data || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async (id) => {
    const resolution = prompt('Enter resolution notes:');
    if (!resolution) return;

    try {
      await api.patch(`/admin/reports/${id}/resolve`, { resolution });
      fetchReports();
    } catch (error) {
      console.error('Error resolving report:', error);
      alert('Failed to resolve report');
    }
  };

  const handleReject = async (id) => {
    if (!confirm('Are you sure you want to reject this report?')) return;

    try {
      await api.patch(`/admin/reports/${id}/reject`);
      fetchReports();
    } catch (error) {
      console.error('Error rejecting report:', error);
      alert('Failed to reject report');
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.reason?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reporter?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      filterStatus === 'all' || 
      report.status === filterStatus;

    const matchesType =
      filterType === 'all' ||
      report.reportType === filterType;

    return matchesSearch && matchesStatus && matchesType;
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'low': return 'bg-yellow-100 text-yellow-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'investigating': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader size="xl" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports Management</h1>
        <p className="text-gray-600">Review and manage user-submitted reports</p>
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
                  placeholder="Search reports..."
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
                <option value="pending">Pending</option>
                <option value="investigating">Investigating</option>
                <option value="resolved">Resolved</option>
                <option value="rejected">Rejected</option>
              </select>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="spam">Spam</option>
                <option value="scam">Scam</option>
                <option value="inappropriate">Inappropriate</option>
                <option value="fake">Fake Listing</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
            <div>
              <p className="text-sm text-gray-600">Total Reports</p>
              <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {reports.filter(r => r.status === 'pending').length}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Investigating</p>
              <p className="text-2xl font-bold text-blue-600">
                {reports.filter(r => r.status === 'investigating').length}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-green-600">
                {reports.filter(r => r.status === 'resolved').length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <Card key={report.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    <h3 className="font-bold text-lg">{report.reason || 'Report'}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                    {report.severity && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(report.severity)}`}>
                        {report.severity} priority
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {report.reporter?.firstName} {report.reporter?.lastName}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(report.createdAt).toLocaleDateString()}
                    </div>
                    {report.reportType && (
                      <div className="flex items-center gap-1">
                        <Flag className="h-4 w-4" />
                        {report.reportType}
                      </div>
                    )}
                  </div>

                  {report.description && (
                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                      <p className="text-sm text-gray-700">{report.description}</p>
                    </div>
                  )}

                  {/* Reported Item */}
                  {report.reportedItem && (
                    <div className="border-t pt-3 mt-3">
                      <p className="text-xs text-gray-500 mb-2">REPORTED ITEM</p>
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">{report.reportedItemType}:</span>
                        <span className="text-gray-700">{report.reportedItem?.title || report.reportedItem?.id}</span>
                      </div>
                    </div>
                  )}

                  {/* Resolution */}
                  {report.resolution && (
                    <div className="border-t pt-3 mt-3">
                      <p className="text-xs text-gray-500 mb-2">RESOLUTION</p>
                      <p className="text-sm text-gray-700">{report.resolution}</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 ml-4">
                  {report.status === 'pending' && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleResolve(report.id)}
                        className="gap-2"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Resolve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReject(report.id)}
                        className="gap-2 text-red-600 border-red-300 hover:bg-red-50"
                      >
                        <XCircle className="h-4 w-4" />
                        Reject
                      </Button>
                    </>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => router.push(`/admin/reports/${report.id}`)}
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

      {filteredReports.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <AlertTriangle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No reports found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
