import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, Lock, Eye, EyeOff, Shield, Building2, Users, BarChart3 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { useAuth } from '../../hooks/useAuth';

interface AdminLoginForm {
  email: string;
  password: string;
  adminCode?: string;
}

export function AdminLogin() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AdminLoginForm>();

  const onSubmit = async (data: AdminLoginForm) => {
    try {
      setError('');
      setIsLoading(true);
      const user = await login(data.email, data.password);
      
      if (user && user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        setError('Access denied. Administrator credentials required.');
      }
    } catch (err) {
      setError('Invalid administrator credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const adminFeatures = [
    {
      icon: Users,
      title: 'User Management',
      description: 'Comprehensive user administration and role management'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Real-time insights and performance metrics'
    },
    {
      icon: Shield,
      title: 'Security Controls',
      description: 'Advanced security settings and audit logs'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative flex min-h-screen">
        {/* Left Side - Branding & Features */}
        <div className="hidden lg:flex lg:w-1/2 xl:w-2/5 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-20 right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-lg"></div>
          </div>

          <div className="relative z-10 flex flex-col justify-center px-12 py-16 text-white">
            {/* Logo and Brand */}
            <div className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                  <img
                    src="/AYUH_Logo_2.png"
                    alt="Ayuh Clinic Logo"
                    className="h-12 w-auto filter brightness-0 invert"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Ayuh Clinic</h1>
                  <p className="text-primary-100 text-sm">Administrator Portal</p>
                </div>
              </div>
              
              <div className="space-y-1 mb-8">
                <h2 className="text-3xl font-bold leading-tight">
                  Enterprise-Grade
                  <br />Healthcare Management
                </h2>
                <p className="text-primary-100 text-lg">
                  Secure administrative access to comprehensive healthcare operations
                </p>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="space-y-6">
              {adminFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg flex-shrink-0">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{feature.title}</h3>
                    <p className="text-primary-100 text-xs leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold">99.9%</div>
                <div className="text-primary-200 text-xs">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-primary-200 text-xs">Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">256-bit</div>
                <div className="text-primary-200 text-xs">Encryption</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-12">
          <div className="w-full max-w-md space-y-8">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <img
                  src="/AYUH_Logo_2.png"
                  alt="Ayuh Clinic Logo"
                  className="h-10 w-auto"
                />
                <div className="text-left">
                  <h1 className="text-xl font-bold text-gray-900">Ayuh Clinic</h1>
                  <p className="text-sm text-gray-600">Administrator Portal</p>
                </div>
              </div>
            </div>

            {/* Header */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-2 mb-4">
                <div className="bg-primary-100 p-2 rounded-lg">
                  <Building2 className="h-6 w-6 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Administrator Access</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Secure access to the comprehensive healthcare management system. 
                Please authenticate with your administrator credentials.
              </p>
            </div>

            {/* Security Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-blue-800 text-sm font-medium mb-1">Secure Environment</p>
                  <p className="text-blue-700 text-xs leading-relaxed">
                    This portal uses enterprise-grade security protocols. All activities are logged and monitored.
                  </p>
                </div>
              </div>
            </div>

            {/* Login Form */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-red-600" />
                      <p className="text-red-600 text-sm font-medium">{error}</p>
                    </div>
                  </div>
                )}

                {/* Demo Credentials */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                  <p className="text-amber-800 text-sm font-medium mb-2">Demo Administrator Access:</p>
                  <div className="text-amber-700 text-xs font-mono bg-amber-100 p-2 rounded">
                    <div>Email: admin@ayuhclinic.com</div>
                    <div>Password: password123</div>
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <Input
                    label="Administrator Email"
                    type="email"
                    icon={<Mail className="h-5 w-5" />}
                    error={errors.email?.message}
                    className="bg-white/50"
                    {...register('email', {
                      required: 'Administrator email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />

                  <div className="relative">
                    <Input
                      label="Administrator Password"
                      type={showPassword ? 'text' : 'password'}
                      icon={<Lock className="h-5 w-5" />}
                      error={errors.password?.message}
                      className="bg-white/50"
                      {...register('password', {
                        required: 'Administrator password is required',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters'
                        }
                      })}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-8 text-gray-400 hover:text-gray-600 transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-admin"
                        name="remember-admin"
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-admin" className="ml-2 block text-sm text-gray-700">
                        Remember this device
                      </label>
                    </div>

                    <Link to="/admin/forgot-password" className="text-sm text-primary-600 hover:text-primary-500 transition-colors">
                      Forgot credentials?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-lg"
                    disabled={isSubmitting || isLoading}
                  >
                    {isSubmitting || isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Authenticating...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4" />
                        <span>Access Admin Portal</span>
                      </div>
                    )}
                  </Button>
                </form>

                {/* Footer Links */}
                <div className="mt-6 text-center">
                  <div className="text-sm text-gray-600">
                    Need regular access?{' '}
                    <Link to="/login" className="text-primary-600 hover:text-primary-500 font-medium transition-colors">
                      User Login Portal
                    </Link>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    Protected by enterprise security protocols
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support Contact */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Technical Support:{' '}
                <a href="mailto:admin-support@ayuhclinic.com" className="text-primary-600 hover:text-primary-500 font-medium">
                  admin-support@ayuhclinic.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}