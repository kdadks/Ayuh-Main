import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, Lock, User, Phone } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent } from '../../components/ui/Card';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../types';

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  serviceInterest: 'homecare' | 'homeopathy' | 'both';
  agreeToTerms: boolean;
}

export function Register() {
  const [error, setError] = React.useState('');
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<RegisterForm>();

  const password = watch('password');

  const onSubmit = async (data: RegisterForm) => {
    try {
      setError('');
      await registerUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role
      }, data.password);
      
      // Redirect based on user role
      switch (data.role) {
        case 'patient':
          navigate('/patient/dashboard');
          break;
        case 'caregiver':
          navigate('/caregiver/dashboard');
          break;
        case 'candidate':
          navigate('/candidate/dashboard');
          break;
        case 'homeopath':
          navigate('/homeopath/dashboard');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 hover:text-primary-500 font-medium">
              Sign in
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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  icon={<User className="h-5 w-5" />}
                  error={errors.firstName?.message}
                  {...register('firstName', {
                    required: 'First name is required'
                  })}
                />

                <Input
                  label="Last Name"
                  icon={<User className="h-5 w-5" />}
                  error={errors.lastName?.message}
                  {...register('lastName', {
                    required: 'Last name is required'
                  })}
                />
              </div>

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

              <Input
                label="Phone Number"
                type="tel"
                icon={<Phone className="h-5 w-5" />}
                error={errors.phone?.message}
                {...register('phone', {
                  required: 'Phone number is required'
                })}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  I am interested in:
                </label>
                <select
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  {...register('serviceInterest', { required: 'Please select your interest' })}
                >
                  <option value="">Select your interest</option>
                  <option value="homecare">Home Care Services</option>
                  <option value="homeopathy">Homeopathy Treatment</option>
                  <option value="both">Both Services</option>
                </select>
                {errors.serviceInterest && (
                  <p className="text-sm text-red-600 mt-1">{errors.serviceInterest.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  I am registering as a:
                </label>
                <select
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  {...register('role', { required: 'Please select your role' })}
                >
                  <option value="">Select your role</option>
                  <option value="patient">Patient (seeking care/treatment)</option>
                  <option value="caregiver">Caregiver (applying to provide home care)</option>
                  <option value="candidate">Candidate (job application)</option>
                  <option value="homeopath">Homeopath (applying to provide treatment)</option>
                </select>
                {errors.role && (
                  <p className="text-sm text-red-600 mt-1">{errors.role.message}</p>
                )}
              </div>

              <Input
                label="Password"
                type="password"
                icon={<Lock className="h-5 w-5" />}
                error={errors.password?.message}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters'
                  }
                })}
              />

              <Input
                label="Confirm Password"
                type="password"
                icon={<Lock className="h-5 w-5" />}
                error={errors.confirmPassword?.message}
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: value => value === password || 'Passwords do not match'
                })}
              />

              <div className="flex items-center">
                <input
                  id="agree-terms"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  {...register('agreeToTerms', {
                    required: 'You must agree to the terms and conditions'
                  })}
                />
                <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary-600 hover:text-primary-500">
                    Terms and Conditions
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary-600 hover:text-primary-500">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-sm text-red-600">{errors.agreeToTerms.message}</p>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating account...' : 'Create account'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}