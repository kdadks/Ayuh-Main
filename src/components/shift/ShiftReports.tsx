import React, { useState } from 'react';
import { 
  BarChart3, 
  Download, 
  Calendar, 
  Clock, 
  Users, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Filter,
  FileText
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface ShiftReport {
  totalShifts: number;
  completedShifts: number;
  cancelledShifts: number;
  averageResponseTime: number;
  onTimeArrivalRate: number;
  employeeUtilization: number;
  revenueGenerated: number;
  topEmployees: {
    name: string;
    shiftsCompleted: number;
    onTimeRate: number;
  }[];
  shiftsByServiceType: {
    serviceType: string;
    count: number;
    revenue: number;
  }[];
  monthlyTrends: {
    month: string;
    shifts: number;
    revenue: number;
  }[];
}

export function ShiftReports() {
  const [dateRange, setDateRange] = useState({
    startDate: '2024-06-01',
    endDate: '2024-06-30'
  });
  const [reportType, setReportType] = useState<'overview' | 'detailed' | 'employee' | 'financial'>('overview');

  // Mock report data
  const reportData: ShiftReport = {
    totalShifts: 245,
    completedShifts: 220,
    cancelledShifts: 15,
    averageResponseTime: 2.3, // hours
    onTimeArrivalRate: 87.5, // percentage
    employeeUtilization: 82.1, // percentage
    revenueGenerated: 62450.00,
    topEmployees: [
      { name: 'Maria Garcia', shiftsCompleted: 45, onTimeRate: 95.6 },
      { name: 'David Chen', shiftsCompleted: 42, onTimeRate: 89.3 },
      { name: 'Sarah Wilson', shiftsCompleted: 38, onTimeRate: 92.1 }
    ],
    shiftsByServiceType: [
      { serviceType: 'Personal Care', count: 85, revenue: 21675 },
      { serviceType: 'Medical Care', count: 65, revenue: 18200 },
      { serviceType: 'Companionship', count: 55, revenue: 12100 },
      { serviceType: 'Live-in Care', count: 25, revenue: 10000 },
      { serviceType: 'Transportation', count: 15, revenue: 3750 }
    ],
    monthlyTrends: [
      { month: 'Jan', shifts: 180, revenue: 45000 },
      { month: 'Feb', shifts: 195, revenue: 48750 },
      { month: 'Mar', shifts: 210, revenue: 52500 },
      { month: 'Apr', shifts: 225, revenue: 56250 },
      { month: 'May', shifts: 235, revenue: 58750 },
      { month: 'Jun', shifts: 245, revenue: 62450 }
    ]
  };

  const generateReport = () => {
    // In real app, this would call API with date range and report type
    console.log(`Generating ${reportType} report for ${dateRange.startDate} to ${dateRange.endDate}`);
    alert(`${reportType.charAt(0).toUpperCase() + reportType.slice(1)} report generated successfully!`);
  };

  const exportReport = (format: 'pdf' | 'excel') => {
    // In real app, this would trigger file download
    console.log(`Exporting report as ${format}`);
    alert(`Report exported as ${format.toUpperCase()} successfully!`);
  };

  const renderOverviewReport = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Shifts</p>
                <p className="text-2xl font-bold text-gray-900">{reportData.totalShifts}</p>
                <p className="text-sm text-green-600">+12% from last month</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-gray-900">
                  {((reportData.completedShifts / reportData.totalShifts) * 100).toFixed(1)}%
                </p>
                <p className="text-sm text-green-600">+2.3% from last month</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">On-Time Rate</p>
                <p className="text-2xl font-bold text-gray-900">{reportData.onTimeArrivalRate}%</p>
                <p className="text-sm text-yellow-600">-1.2% from last month</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹{reportData.revenueGenerated.toLocaleString()}</p>
                <p className="text-sm text-green-600">+15% from last month</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Type Breakdown */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Shifts by Service Type</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportData.shiftsByServiceType.map((service, index) => {
                const percentage = (service.count / reportData.totalShifts) * 100;
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-700">{service.serviceType}</span>
                      <span className="text-gray-600">{service.count} shifts</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{percentage.toFixed(1)}%</span>
                      <span>₹{service.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Top Employees */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Top Performing Employees</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportData.topEmployees.map((employee, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-700">
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{employee.name}</p>
                      <p className="text-sm text-gray-600">{employee.shiftsCompleted} shifts completed</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{employee.onTimeRate}%</p>
                    <p className="text-xs text-gray-500">On-time rate</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Report Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Shift Reports & Analytics
              </h2>
              <p className="text-gray-600 mt-1">Comprehensive insights into shift performance and metrics</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex gap-2">
                <Input
                  type="date"
                  value={dateRange.startDate}
                  onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                  className="w-auto"
                />
                <Input
                  type="date"
                  value={dateRange.endDate}
                  onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                  className="w-auto"
                />
              </div>
              
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="overview">Overview Report</option>
                <option value="detailed">Detailed Analysis</option>
                <option value="employee">Employee Performance</option>
                <option value="financial">Financial Summary</option>
              </select>
              
              <Button onClick={generateReport}>
                <Filter className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Content */}
      {renderOverviewReport()}

      {/* Export Options */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Export Report</h3>
              <p className="text-gray-600">Download report data in different formats</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => exportReport('pdf')}>
                <FileText className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button variant="outline" onClick={() => exportReport('excel')}>
                <Download className="h-4 w-4 mr-2" />
                Export Excel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}