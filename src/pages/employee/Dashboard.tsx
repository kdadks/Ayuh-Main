import React, { useState } from 'react';
import { 
  User, 
  Calendar, 
  Clock, 
  DollarSign, 
  CheckCircle,
  MapPin,
  Camera,
  Settings,
  Bell,
  FileText,
  Shield
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { PersonalInfoSection } from '../../components/employee/PersonalInfoSection';
import { AvailabilitySection } from '../../components/employee/AvailabilitySection';
import { ShiftDetailsSection } from '../../components/employee/ShiftDetailsSection';
import { PaymentInfoSection } from '../../components/employee/PaymentInfoSection';
import { JobArrivalSection } from '../../components/employee/JobArrivalSection';

type TabType = 'overview' | 'personal' | 'availability' | 'shifts' | 'payments' | 'arrival';

export function EmployeeDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Mock data - in real app, this would come from API
  const employeeStats = {
    pendingShifts: 3,
    completedShifts: 47,
    hoursThisMonth: 124,
    earnings: 46800
  };

  const recentShifts = [
    {
      id: '1',
      patientName: 'Priya Sharma',
      date: '2024-06-13',
      time: '09:00 AM - 1:00 PM',
      location: '123 MG Road, Bangalore, Karnataka',
      status: 'confirmed',
      payment: 1800
    },
    {
      id: '2',
      patientName: 'Rajesh Kumar',
      date: '2024-06-14',
      time: '2:00 PM - 6:00 PM',
      location: '456 Park Street, Mumbai, Maharashtra',
      status: 'pending',
      payment: 2400
    },
    {
      id: '3',
      patientName: 'Sunita Patel',
      date: '2024-06-15',
      time: '10:00 AM - 2:00 PM',
      location: '789 Ring Road, Delhi',
      status: 'scheduled',
      payment: 2000
    }
  ];

  const pendingActions = [
    { id: '1', action: 'Accept shift for June 16th', priority: 'high' },
    { id: '2', action: 'Update availability for next week', priority: 'medium' },
    { id: '3', action: 'Confirm arrival for morning shift', priority: 'high' }
  ];

  const stats = [
    {
      label: 'Pending Shifts',
      value: employeeStats.pendingShifts,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      label: 'Completed Shifts',
      value: employeeStats.completedShifts,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      label: 'Hours This Month',
      value: employeeStats.hoursThisMonth,
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      label: 'Total Earnings',
      value: `₹${employeeStats.earnings}`,
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'availability', label: 'Availability', icon: Calendar },
    { id: 'shifts', label: 'Shifts', icon: Clock },
    { id: 'payments', label: 'Payments', icon: DollarSign },
    { id: 'arrival', label: 'Job Arrival', icon: MapPin }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalInfoSection />;
      case 'availability':
        return <AvailabilitySection />;
      case 'shifts':
        return <ShiftDetailsSection />;
      case 'payments':
        return <PaymentInfoSection />;
      case 'arrival':
        return <JobArrivalSection />;
      default:
        return renderOverview();
    }
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Shifts */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">Recent Shifts</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentShifts.map((shift) => (
                  <div
                    key={shift.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{shift.patientName}</h3>
                      <p className="text-sm text-gray-600">{shift.date} • {shift.time}</p>
                      <p className="text-xs text-gray-500 flex items-center mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {shift.location}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">₹{shift.payment}</p>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          shift.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : shift.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {shift.status}
                        </span>
                      </div>
                      {shift.status === 'pending' && (
                        <Button size="sm">Accept</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Button variant="outline" className="w-full">
                  View All Shifts
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Actions & Quick Actions */}
        <div className="space-y-6">
          {/* Pending Actions */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Pending Actions</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingActions.map((action) => (
                  <div key={action.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      action.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{action.action}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        action.priority === 'high' 
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {action.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full justify-start"
                onClick={() => setActiveTab('availability')}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Update Availability
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setActiveTab('shifts')}
              >
                <Clock className="mr-2 h-4 w-4" />
                View Shifts
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setActiveTab('arrival')}
              >
                <Camera className="mr-2 h-4 w-4" />
                Confirm Arrival
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setActiveTab('personal')}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your shifts, availability, and profile information
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
}