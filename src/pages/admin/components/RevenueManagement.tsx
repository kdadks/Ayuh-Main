import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Filter,
  Search,
  Download,
  Eye,
  CreditCard,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { PaymentRecord, Invoice } from '../../../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

export function RevenueManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending' | 'failed' | 'refunded'>('all');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<'all' | 'cash' | 'card' | 'bank_transfer' | 'insurance'>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month');

  // Mock payment records data
  const [paymentRecords] = useState<PaymentRecord[]>([
    {
      id: 'PAY001',
      patientId: '1',
      patientName: 'Sarah Johnson',
      invoiceId: 'INV001',
      amount: 720.00,
      paymentDate: '2024-02-15T10:30:00Z',
      paymentMethod: 'bank_transfer',
      status: 'completed',
      transactionId: 'TXN123456'
    },
    {
      id: 'PAY002',
      patientId: '2',
      patientName: 'Robert Wilson',
      invoiceId: 'INV002',
      amount: 1280.00,
      paymentDate: '2024-02-10T14:15:00Z',
      paymentMethod: 'card',
      status: 'completed',
      transactionId: 'TXN789012'
    },
    {
      id: 'PAY003',
      patientId: '3',
      patientName: 'Margaret Thompson',
      invoiceId: 'INV003',
      amount: 560.00,
      paymentDate: '2024-02-08T09:45:00Z',
      paymentMethod: 'insurance',
      status: 'completed',
      transactionId: 'INS345678'
    },
    {
      id: 'PAY004',
      patientId: '4',
      patientName: 'William Davis',
      invoiceId: 'INV004',
      amount: 340.00,
      paymentDate: '2024-02-05T16:20:00Z',
      paymentMethod: 'cash',
      status: 'completed'
    },
    {
      id: 'PAY005',
      patientId: '5',
      patientName: 'Dorothy Brown',
      invoiceId: 'INV005',
      amount: 450.00,
      paymentDate: '2024-01-28T11:30:00Z',
      paymentMethod: 'card',
      status: 'failed'
    },
    {
      id: 'PAY006',
      patientId: '6',
      patientName: 'James Miller',
      invoiceId: 'INV006',
      amount: 890.00,
      paymentDate: '2024-01-25T13:45:00Z',
      paymentMethod: 'bank_transfer',
      status: 'pending'
    }
  ]);

  // Mock revenue data for charts
  const monthlyRevenueData = [
    { month: 'Sep 2023', revenue: 185000, payments: 45 },
    { month: 'Oct 2023', revenue: 234567, payments: 52 },
    { month: 'Nov 2023', revenue: 198000, payments: 48 },
    { month: 'Dec 2023', revenue: 267000, payments: 58 },
    { month: 'Jan 2024', revenue: 289000, payments: 62 },
    { month: 'Feb 2024', revenue: 312000, payments: 67 }
  ];

  const paymentMethodData = [
    { name: 'Bank Transfer', value: 45, color: '#0ea5e9' },
    { name: 'Card', value: 30, color: '#10b981' },
    { name: 'Insurance', value: 20, color: '#f59e0b' },
    { name: 'Cash', value: 5, color: '#ef4444' }
  ];

  const revenueByServiceData = [
    { service: 'Personal Care', revenue: 95000, percentage: 30.4 },
    { service: 'Medical Care', revenue: 78000, percentage: 25.0 },
    { service: 'Companionship', revenue: 65000, percentage: 20.8 },
    { service: 'Live-in Care', revenue: 48000, percentage: 15.4 },
    { service: 'Transportation', revenue: 26000, percentage: 8.3 }
  ];

  const filteredPayments = paymentRecords.filter(payment => {
    const matchesSearch = 
      payment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.invoiceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    const matchesPaymentMethod = paymentMethodFilter === 'all' || payment.paymentMethod === paymentMethodFilter;
    
    const paymentDate = new Date(payment.paymentDate);
    const matchesDateRange = 
      (!dateRange.start || paymentDate >= new Date(dateRange.start)) &&
      (!dateRange.end || paymentDate <= new Date(dateRange.end));

    return matchesSearch && matchesStatus && matchesPaymentMethod && matchesDateRange;
  });

  const totalRevenue = paymentRecords
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingRevenue = paymentRecords
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  const failedPayments = paymentRecords.filter(p => p.status === 'failed').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentMethodColor = (method: string) => {
    switch (method) {
      case 'bank_transfer':
        return 'bg-blue-100 text-blue-800';
      case 'card':
        return 'bg-green-100 text-green-800';
      case 'insurance':
        return 'bg-orange-100 text-orange-800';
      case 'cash':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'failed':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const exportPaymentData = () => {
    console.log('Exporting payment data...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Revenue Management</h2>
          <p className="text-gray-600 mt-1">
            Payment dashboard, revenue tracking, and financial analytics
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={exportPaymentData}>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button>
            <CreditCard className="h-4 w-4 mr-2" />
            Process Payment
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹{totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-green-600 mt-1">+18% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Payments</p>
                <p className="text-2xl font-bold text-gray-900">₹{pendingRevenue.toLocaleString()}</p>
                <p className="text-sm text-yellow-600 mt-1">{paymentRecords.filter(p => p.status === 'pending').length} transactions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Failed Payments</p>
                <p className="text-2xl font-bold text-gray-900">{failedPayments}</p>
                <p className="text-sm text-red-600 mt-1">Requires attention</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Payment</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{(totalRevenue / paymentRecords.filter(p => p.status === 'completed').length).toFixed(0)}
                </p>
                <p className="text-sm text-blue-600 mt-1">Per transaction</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Trend Chart */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                </select>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [
                    name === 'revenue' ? `₹${value.toLocaleString()}` : value,
                    name === 'revenue' ? 'Revenue' : 'Payments'
                  ]} />
                  <Line type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={3} />
                  <Bar dataKey="payments" fill="#10b981" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Payment Methods Distribution */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={paymentMethodData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {paymentMethodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Revenue by Service */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Revenue by Service Type</h3>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueByServiceData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="service" type="category" width={120} />
              <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
              <Bar dataKey="revenue" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by patient name, invoice ID, or payment ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Start Date"
              />
              
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="End Date"
              />
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>

              <select
                value={paymentMethodFilter}
                onChange={(e) => setPaymentMethodFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Methods</option>
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="insurance">Insurance</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Records Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Payment Records</h3>
            <div className="text-sm text-gray-600">
              Showing {filteredPayments.length} of {paymentRecords.length} payments
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="font-medium">{payment.id}</div>
                        <div className="text-gray-500">Invoice: {payment.invoiceId}</div>
                        {payment.transactionId && (
                          <div className="text-gray-500 text-xs">TXN: {payment.transactionId}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{payment.patientName}</div>
                      <div className="text-sm text-gray-500">ID: {payment.patientId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">₹{payment.amount.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentMethodColor(payment.paymentMethod)}`}>
                        {payment.paymentMethod.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(payment.status)}
                        <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(payment.paymentDate).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(payment.paymentDate).toLocaleTimeString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        
                        {payment.status === 'failed' && (
                          <Button size="sm">
                            Retry Payment
                          </Button>
                        )}
                        
                        {payment.status === 'completed' && (
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-1" />
                            Receipt
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Summary */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Revenue Summary</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">₹{totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-gray-600 mt-1">Total Collected Revenue</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-600">₹{pendingRevenue.toLocaleString()}</p>
              <p className="text-sm text-gray-600 mt-1">Pending Collections</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">
                ₹{(totalRevenue + pendingRevenue).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 mt-1">Total Expected Revenue</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}