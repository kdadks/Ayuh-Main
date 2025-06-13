import React, { useState } from 'react';
import { 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  Download, 
  Eye, 
  Clock,
  CreditCard,
  FileText,
  Filter
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';

interface PaymentRecord {
  id: string;
  shiftId: string;
  patientName: string;
  date: string;
  hours: number;
  hourlyRate: number;
  totalAmount: number;
  status: 'pending' | 'paid' | 'processing';
  paidDate?: string;
  serviceType: string;
}

interface PaymentSummary {
  totalEarnings: number;
  pendingPayments: number;
  thisMonthEarnings: number;
  lastMonthEarnings: number;
  averageHourlyRate: number;
  totalHoursWorked: number;
}

export function PaymentInfoSection() {
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data - in real app, this would come from API
  const [paymentRecords] = useState<PaymentRecord[]>([
    {
      id: '1',
      shiftId: 'SH001',
      patientName: 'Priya Sharma',
      date: '2024-06-12',
      hours: 4,
      hourlyRate: 450,
      totalAmount: 1800,
      status: 'paid',
      paidDate: '2024-06-14',
      serviceType: 'Personal Care'
    },
    {
      id: '2',
      shiftId: 'SH002',
      patientName: 'Rajesh Kumar',
      date: '2024-06-11',
      hours: 4,
      hourlyRate: 600,
      totalAmount: 2400,
      status: 'paid',
      paidDate: '2024-06-13',
      serviceType: 'Medical Care'
    },
    {
      id: '3',
      shiftId: 'SH003',
      patientName: 'Sunita Patel',
      date: '2024-06-10',
      hours: 4,
      hourlyRate: 500,
      totalAmount: 2000,
      status: 'processing',
      serviceType: 'Companionship'
    },
    {
      id: '4',
      shiftId: 'SH004',
      patientName: 'Amit Singh',
      date: '2024-06-09',
      hours: 3.5,
      hourlyRate: 450,
      totalAmount: 1575,
      status: 'pending',
      serviceType: 'Personal Care'
    },
    {
      id: '5',
      shiftId: 'SH005',
      patientName: 'Meera Gupta',
      date: '2024-06-08',
      hours: 4,
      hourlyRate: 550,
      totalAmount: 2200,
      status: 'paid',
      paidDate: '2024-06-12',
      serviceType: 'Companionship'
    }
  ]);

  const paymentSummary: PaymentSummary = {
    totalEarnings: paymentRecords.reduce((sum, record) => sum + record.totalAmount, 0),
    pendingPayments: paymentRecords
      .filter(record => record.status === 'pending' || record.status === 'processing')
      .reduce((sum, record) => sum + record.totalAmount, 0),
    thisMonthEarnings: 46800,
    lastMonthEarnings: 43600,
    averageHourlyRate: 510,
    totalHoursWorked: paymentRecords.reduce((sum, record) => sum + record.hours, 0)
  };

  const filteredRecords = paymentRecords.filter(record => {
    if (selectedStatus !== 'all' && record.status !== selectedStatus) {
      return false;
    }
    // Add period filtering logic here if needed
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CreditCard className="h-4 w-4" />;
      case 'processing': return <Clock className="h-4 w-4" />;
      case 'pending': return <FileText className="h-4 w-4" />;
      default: return <DollarSign className="h-4 w-4" />;
    }
  };

  const earnings = paymentSummary.thisMonthEarnings - paymentSummary.lastMonthEarnings;
  const earningsPercentage = ((earnings / paymentSummary.lastMonthEarnings) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">₹{paymentSummary.totalEarnings.toFixed(2)}</p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Payments</p>
                <p className="text-2xl font-bold text-gray-900">₹{paymentSummary.pendingPayments.toFixed(2)}</p>
              </div>
              <div className="p-3 rounded-full bg-yellow-100">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">₹{paymentSummary.thisMonthEarnings}</p>
                <p className={`text-sm mt-1 flex items-center ${
                  earnings >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {earnings >= 0 ? '+' : ''}{earningsPercentage}% from last month
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Hourly Rate</p>
                <p className="text-2xl font-bold text-gray-900">₹{paymentSummary.averageHourlyRate}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {paymentSummary.totalHoursWorked}h total
                </p>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Payment History
            </h2>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Period Filter */}
            <div className="flex space-x-2">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="current-month">Current Month</option>
                <option value="last-month">Last Month</option>
                <option value="last-3-months">Last 3 Months</option>
                <option value="last-6-months">Last 6 Months</option>
                <option value="all-time">All Time</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex space-x-2">
              {['all', 'paid', 'processing', 'pending'].map(status => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium capitalize ${
                    selectedStatus === status
                      ? 'bg-primary-100 text-primary-700 border border-primary-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {status === 'all' ? 'All' : status}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Records */}
      <div className="space-y-4">
        {filteredRecords.map(record => (
          <Card key={record.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{record.patientName}</h3>
                      <p className="text-sm text-gray-600">
                        Shift ID: {record.shiftId} • {record.serviceType}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">₹{record.totalAmount}</p>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                        {getStatusIcon(record.status)}
                        <span className="ml-1 capitalize">{record.status}</span>
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Date:</span> {new Date(record.date).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="font-medium">Hours:</span> {record.hours}h
                    </div>
                    <div>
                      <span className="font-medium">Rate:</span> ₹{record.hourlyRate}/hour
                    </div>
                    <div>
                      {record.paidDate && (
                        <>
                          <span className="font-medium">Paid:</span> {new Date(record.paidDate).toLocaleDateString()}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="ml-6">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRecords.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No payment records found for the selected criteria</p>
          </CardContent>
        </Card>
      )}

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Payment Information</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Bank Transfer</p>
                    <p className="text-sm text-gray-600">Payments processed weekly on Fridays</p>
                  </div>
                </div>
                <span className="text-sm text-green-600 font-medium">Active</span>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Payment Schedule</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Payments are processed every Friday</li>
                <li>• Direct bank transfer to your registered account</li>
                <li>• Payment confirmation sent via email</li>
                <li>• Contact HR for payment inquiries</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}