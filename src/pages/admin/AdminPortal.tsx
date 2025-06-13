import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Users, BarChart3, Settings, Zap, CheckCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';

export function AdminPortal() {
  const features = [
    {
      icon: Users,
      title: 'User Management',
      description: 'Comprehensive user administration, role assignments, and access control management.',
      items: ['User activation/deactivation', 'Role-based permissions', 'Account verification']
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Real-time insights, performance metrics, and comprehensive reporting tools.',
      items: ['Revenue tracking', 'User engagement metrics', 'System performance']
    },
    {
      icon: Settings,
      title: 'System Configuration',
      description: 'Advanced system settings, integrations, and operational configurations.',
      items: ['API configurations', 'System preferences', 'Integration management']
    }
  ];

  const securityFeatures = [
    'Multi-factor authentication',
    '256-bit SSL encryption',
    'Audit trail logging',
    'Role-based access control',
    'Session management',
    'Security monitoring'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="/AYUH_Logo_2.png"
                alt="Ayuh Clinic Logo"
                className="h-10 w-auto"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Ayuh Clinic</h1>
                <p className="text-sm text-gray-600">Administrator Portal</p>
              </div>
            </div>
            <Link to="/">
              <Button variant="outline">Back to Main Site</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-primary-100 p-4 rounded-2xl">
              <Shield className="h-12 w-12 text-primary-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Enterprise Administration Portal
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Comprehensive healthcare management system designed for administrators. 
            Secure access to advanced tools, analytics, and operational controls.
          </p>
          <Link to="/admin/login">
            <Button size="lg" className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-lg">
              <Lock className="h-5 w-5 mr-2" />
              Access Admin Portal
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="bg-primary-100 p-3 rounded-xl inline-block mb-4">
                  <feature.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 text-primary-600 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Security & Stats Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Security Features */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-red-100 p-2 rounded-lg">
                  <Shield className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Enterprise Security</h3>
              </div>
              <p className="text-gray-600">
                Advanced security protocols to protect sensitive healthcare data and operations.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {securityFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-700">
                    <Zap className="h-4 w-4 text-primary-600 mr-2 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Statistics */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">System Performance</h3>
              </div>
              <p className="text-gray-600">
                Real-time system metrics and operational statistics.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">99.9%</div>
                  <div className="text-sm text-gray-600">System Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">24/7</div>
                  <div className="text-sm text-gray-600">Support Available</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">1,456</div>
                  <div className="text-sm text-gray-600">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">256-bit</div>
                  <div className="text-sm text-gray-600">Encryption</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Access Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-2xl border-0 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <Shield className="h-12 w-12 mx-auto mb-4 opacity-90" />
              <h3 className="text-2xl font-bold mb-4">Ready to Access?</h3>
              <p className="text-primary-100 mb-6">
                Secure administrator access with enterprise-grade authentication and comprehensive audit trails.
              </p>
              <div className="space-y-3">
                <Link to="/admin/login">
                  <Button 
                    variant="secondary" 
                    size="lg" 
                    className="w-full bg-white text-primary-700 hover:bg-gray-50"
                  >
                    <Lock className="h-5 w-5 mr-2" />
                    Administrator Login
                  </Button>
                </Link>
                <p className="text-xs text-primary-200">
                  Authorized personnel only • All access is logged and monitored
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white/50 backdrop-blur-sm border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-600">
            <p>
              Technical Support: 
              <a href="mailto:admin-support@ayuhclinic.com" className="text-primary-600 hover:text-primary-500 ml-1">
                admin-support@ayuhclinic.com
              </a>
            </p>
            <p className="mt-2">© 2024 Ayuh Clinic. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}