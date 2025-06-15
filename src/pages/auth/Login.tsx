import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { useAuth } from '../../hooks/useAuth';
import QuickLoginButtons from '../../components/auth/QuickLoginButtons';

interface LoginForm {
  email: string;
  password: string;
}

export function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      setError('');
      console.log('Form submit attempt:', data);
      
      // Trim whitespace from inputs
      const email = data.email?.trim();
      const password = data.password?.trim();
      
      if (!email || !password) {
        setError('Please enter both email and password');
        return;
      }
      
      const user = await login(email, password);
      console.log('Login result:', user);
      
      if (user) {
        console.log('Login successful, navigating for role:', user.role);
        
        // Define routes for each role
        const routes = {
          'patient': '/patient/dashboard',
          'caregiver': '/caregiver/dashboard',
          'employee': '/employee/dashboard',
          'candidate': '/candidate/dashboard',
          'homeopath': '/homeopath/dashboard',
          'admin': '/admin/dashboard'
        };
        
        const route = routes[user.role as keyof typeof routes] || '/';
        console.log('Navigating to:', route);
        
        // Navigate with replace to ensure it works
        navigate(route, { replace: true });
        
        // Backup navigation
        setTimeout(() => {
          if (window.location.pathname === '/auth/login') {
            window.location.href = route;
          }
        }, 100);
        
      } else {
        console.log('Login failed - no user returned');
        setError('Invalid email or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-gray-600">
            Or{' '}
            <Link to="/register" className="text-primary-600 hover:text-primary-500 font-medium">
              create a new account
            </Link>
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800 text-sm font-medium mb-2">Demo Accounts:</p>
              <ul className="text-blue-700 text-xs space-y-1">
                <li>Patient: patient@ayuhclinic.com / password123</li>
                <li>Caregiver: caregiver@ayuhclinic.com / password123</li>
                <li>Employee: employee@ayuhclinic.com / password123</li>
                <li>Candidate: candidate@ayuhclinic.com / password123</li>
                <li>Homeopath: homeopath@ayuhclinic.com / password123</li>
                <li>Admin: admin@ayuhclinic.com / password123</li>
              </ul>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                label="Email address"
                type="email"
                icon={<Mail className="h-5 w-5" />}
                error={errors.email?.message}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />

              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  icon={<Lock className="h-5 w-5" />}
                  error={errors.password?.message}
                  {...register('password', {
                    required: 'Password is required'
                  })}
                />
                <button
                  type="button"
                  className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <Link to="/forgot-password" className="text-sm text-primary-600 hover:text-primary-500">
                  Forgot your password?
                </Link>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>

            <QuickLoginButtons onLogin={(user) => {
              setError('');
              // Handle successful login from quick buttons
              switch (user.role) {
                case 'patient':
                  navigate('/patient/dashboard');
                  break;
                case 'caregiver':
                  navigate('/caregiver/dashboard');
                  break;
                case 'employee':
                  navigate('/employee/dashboard');
                  break;
                case 'candidate':
                  navigate('/candidate/dashboard');
                  break;
                case 'homeopath':
                  navigate('/homeopath/dashboard');
                  break;
                case 'admin':
                  navigate('/admin/dashboard');
                  break;
                default:
                  navigate('/');
              }
            }} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}