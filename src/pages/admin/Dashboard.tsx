import React from 'react';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  UserCheck,
  Clock,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export function AdminDashboard() {
  const stats = [
    {
      label: 'Total Patients',
      value: '1,247',
      change: '+12%',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      label: 'Active Caregivers',
      value: '89',
      change: '+5%',
      icon: UserCheck,
      color: 'text-green-600'
    },
    {
      label: 'Monthly Revenue',
      value: '$234,567',
      change: '+18%',
      icon: DollarSign,
      color: 'text-purple-600'
    },
    {
      label: 'Care Hours',
      value: '4,892',
      change: '+7%',
      icon: Clock,
      color: 'text-orange-600'
    }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 185000, patients: 1100 },
    { month: 'Feb', revenue: 234567, patients: 1247 },
    { month: 'Mar', revenue: 198000, patients: 1180 },
    { month: 'Apr', revenue: 267000, patients: 1340 },
    { month: 'May', revenue: 289000, patients: 1420 },
    { month: 'Jun', revenue: 312000, patients: 1550 }
  ];

  const serviceData = [
    { service: 'Personal Care', hours: 1234, revenue: 55530 },
    { service: 'Medical Care', hours: 892, revenue: 31220 },
    { service: 'Companionship', hours: 1567, revenue: 47010 },
    { service: 'Housekeeping', hours: 678, revenue: 27120 },
    { service: 'Transportation', hours: 456, revenue: 11400 }
  ];

  const pendingTasks = [
    { id: '1', task: 'Review caregiver applications', count: 7, priority: 'high' },
    { id: '2', task: 'Process insurance claims', count: 23, priority: 'medium' },
    { id: '3', task: 'Schedule quality assessments', count: 12, priority: 'medium' },
    { id: '4', task: 'Update care plans', count: 5, priority: 'low' }
  ];

  const recentActivity = [
    {
      id: '1',
      title: 'New caregiver application',
      description: 'Emily Rodriguez submitted application',
      time: '10 minutes ago',
      type: 'application'
    },
    {
      id: '2',
      title: 'Patient enrollment',
      description: 'Margaret Thompson enrolled in Premium plan',
      time: '25 minutes ago',
      type: 'enrollment'
    },
    {
      id: '3',
      title: 'Quality report generated',
      description: 'Monthly quality metrics report is ready',
      time: '1 hour ago',
      type: 'report'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Comprehensive overview of clinic operations and performance
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Revenue & Patient Growth</h2>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip formatter={(value, name) => [
                      name === 'revenue' ? `$${value.toLocaleString()}` : value,
                      name === 'revenue' ? 'Revenue' : 'Patients'
                    ]} />
                    <Bar yAxisId="left" dataKey="revenue" fill="#0ea5e9" />
                    <Line yAxisId="right" type="monotone" dataKey="patients" stroke="#10b981" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Pending Tasks */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Pending Tasks</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{task.task}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-lg font-bold text-gray-900">{task.count}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          task.priority === 'high' 
                            ? 'bg-red-100 text-red-800'
                            : task.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Service Performance */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">Service Performance</h2>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={serviceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="service" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [
                    name === 'revenue' ? `$${value.toLocaleString()}` : `${value} hours`,
                    name === 'revenue' ? 'Revenue' : 'Hours'
                  ]} />
                  <Bar dataKey="hours" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'application' ? 'bg-blue-600' :
                      activity.type === 'enrollment' ? 'bg-green-600' :
                      'bg-purple-600'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Button variant="outline" size="sm" className="w-full">
                  View All Activity
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}