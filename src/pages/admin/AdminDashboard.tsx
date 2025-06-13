import React, { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  Briefcase,
  Calendar,
  Heart,
  DollarSign,
  Settings,
  TrendingUp,
  AlertTriangle,
  Clock,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { UserManagement } from './components/UserManagement';
import { CandidateManagement } from './components/CandidateManagement';
import { EmployeeManagement } from './components/EmployeeManagement';
import { ShiftManagement } from './components/ShiftManagement';
import { PatientManagement } from './components/PatientManagement';
import { RevenueManagement } from './components/RevenueManagement';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

type AdminSection = 
  | 'overview' 
  | 'users' 
  | 'candidates' 
  | 'employees' 
  | 'shifts' 
  | 'patients' 
  | 'revenue';

export function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<AdminSection>('overview');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const stats = [
    {
      label: 'Total Users',
      value: '1,456',
      change: '+12%',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      label: 'Active Employees',
      value: '89',
      change: '+5%',
      icon: UserCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      label: 'Pending Candidates',
      value: '23',
      change: '+8%',
      icon: Briefcase,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      label: 'Monthly Revenue',
      value: '$234,567',
      change: '+18%',
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const menuItems = [
    {
      id: 'overview' as AdminSection,
      label: 'Overview',
      icon: TrendingUp,
      description: 'Dashboard overview and analytics'
    },
    {
      id: 'users' as AdminSection,
      label: 'User Management',
      icon: Users,
      description: 'Activate/deactivate users, assign roles'
    },
    {
      id: 'candidates' as AdminSection,
      label: 'Candidate Management',
      icon: Briefcase,
      description: 'Review candidates, assessments, verification'
    },
    {
      id: 'employees' as AdminSection,
      label: 'Employee Management',
      icon: UserCheck,
      description: 'Confirm candidates, manage employees'
    },
    {
      id: 'shifts' as AdminSection,
      label: 'Shift Management',
      icon: Calendar,
      description: 'Assign shifts, monitor compliance'
    },
    {
      id: 'patients' as AdminSection,
      label: 'Patient Management',
      icon: Heart,
      description: 'Manage patients, care plans, billing'
    },
    {
      id: 'revenue' as AdminSection,
      label: 'Revenue Management',
      icon: DollarSign,
      description: 'Payment dashboard, revenue tracking'
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'users':
        return <UserManagement />;
      case 'candidates':
        return <CandidateManagement />;
      case 'employees':
        return <EmployeeManagement />;
      case 'shifts':
        return <ShiftManagement />;
      case 'patients':
        return <PatientManagement />;
      case 'revenue':
        return <RevenueManagement />;
      default:
        return renderOverview();
    }
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
          <p className="text-gray-600">Access key management functions</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuItems.slice(1).map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-blue-100">
                      <item.icon className="h-5 w-5 text-gray-600 group-hover:text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{item.label}</h3>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Pending Tasks</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Candidate Reviews</p>
                    <p className="text-xs text-gray-600">7 applications pending review</p>
                  </div>
                </div>
                <Button size="sm" onClick={() => setActiveSection('candidates')}>
                  Review
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Shift Assignments</p>
                    <p className="text-xs text-gray-600">12 unassigned shifts this week</p>
                  </div>
                </div>
                <Button size="sm" onClick={() => setActiveSection('shifts')}>
                  Assign
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">User Activations</p>
                    <p className="text-xs text-gray-600">5 users awaiting activation</p>
                  </div>
                </div>
                <Button size="sm" onClick={() => setActiveSection('users')}>
                  Manage
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">System Status</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Users</span>
                <span className="text-sm font-medium text-green-600">1,234 online</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Scheduled Shifts Today</span>
                <span className="text-sm font-medium text-blue-600">45 shifts</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Pending Payments</span>
                <span className="text-sm font-medium text-orange-600">$12,350</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">System Health</span>
                <span className="text-sm font-medium text-green-600">All systems operational</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Enhanced Header with Brand */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="bg-primary-100 p-3 rounded-2xl">
                  <img
                    src="/AYUH_Logo_2.png"
                    alt="Ayuh Clinic Logo"
                    className="h-10 w-auto"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Ayuh Clinic</h1>
                  <p className="text-sm text-gray-600">Administrator Dashboard</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Welcome, {user?.firstName}</p>
                <p className="text-xs text-gray-600">Administrator</p>
              </div>
              {activeSection !== 'overview' && (
                <Button 
                  variant="outline" 
                  onClick={() => setActiveSection('overview')}
                >
                  Back to Overview
                </Button>
              )}
              <Button onClick={() => window.location.reload()}>
                <Settings className="h-4 w-4 mr-2" />
                Refresh Data
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-0 p-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Comprehensive Healthcare Management
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Enterprise-grade administrative controls for managing healthcare operations, 
                user accounts, and business analytics across all service divisions.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        {activeSection === 'overview' && (
          <div className="mb-8">
            <nav className="flex space-x-1 overflow-x-auto">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}

        {/* Content */}
        <div className="min-h-96">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}