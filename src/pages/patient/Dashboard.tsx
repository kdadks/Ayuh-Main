import React, { useState } from 'react';
import {
  Calendar,
  User,
  FileText,
  CreditCard,
  Bell,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  UserPlus,
  Receipt,
  DollarSign
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { mockAppointments, mockPatientInvoices, mockPatientPayments } from '../../utils/data';
import { PatientRegistrationForm, PatientRegistrationData } from '../../components/patient/PatientRegistrationForm';
import { PatientRegistrationDetails } from '../../components/patient/PatientRegistrationDetails';
import { PatientBillingHistory } from '../../components/patient/PatientBillingHistory';
import { PatientPaymentHistory } from '../../components/patient/PatientPaymentHistory';
import { PatientRegistration } from '../../types';
import { patientRegistrationService } from '../../services/patientRegistrationService';
import { format, parseISO } from 'date-fns';

type DashboardView = 'overview' | 'register' | 'registration-details' | 'billing' | 'payments';

export function PatientDashboard() {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<DashboardView>('overview');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [patientRegistration, setPatientRegistration] = useState<PatientRegistration | undefined>(
    user?.id ? patientRegistrationService.getPatientRegistration(user.id) : undefined
  );
  
  const upcomingAppointments = mockAppointments.filter(
    apt => apt.status === 'scheduled' || apt.status === 'confirmed'
  ).slice(0, 3);

  // Get patient data
  const patientInvoices = mockPatientInvoices.filter(inv => inv.patientId === user?.id);
  const patientPayments = mockPatientPayments.filter(pay => pay.patientId === user?.id);

  const stats = [
    {
      label: 'Upcoming Appointments',
      value: upcomingAppointments.length,
      icon: Calendar,
      color: 'text-blue-600'
    },
    {
      label: 'Care Hours This Month',
      value: '24',
      icon: Clock,
      color: 'text-green-600'
    },
    {
      label: 'Active Care Plan',
      value: patientRegistration ? 'Active' : 'Not Registered',
      icon: CheckCircle,
      color: patientRegistration ? 'text-purple-600' : 'text-orange-600'
    },
    {
      label: 'Outstanding Amount',
      value: `₹${patientInvoices.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.amount, 0).toFixed(0)}`,
      icon: AlertCircle,
      color: 'text-orange-600'
    }
  ];

  const recentActivity = [
    {
      id: '1',
      type: 'appointment',
      title: 'Personal Care Session Completed',
      description: 'With Maria Garcia',
      time: '2 hours ago',
      icon: CheckCircle,
      iconColor: 'text-green-600'
    },
    {
      id: '2',
      type: 'payment',
      title: 'Payment Processed',
      description: '₹1,200.00 for March services',
      time: '1 day ago',
      icon: CreditCard,
      iconColor: 'text-blue-600'
    },
    {
      id: '3',
      type: 'document',
      title: 'Care Plan Updated',
      description: 'Medication schedule revised',
      time: '3 days ago',
      icon: FileText,
      iconColor: 'text-purple-600'
    }
  ];

  const handleRegistrationSubmit = async (data: PatientRegistrationData) => {
    if (!user?.id) {
      alert('Error: User not found. Please log in again.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await patientRegistrationService.submitRegistration(user.id, data);
      
      if (result.success && result.registration) {
        // Update local state
        setPatientRegistration(result.registration);
        
        // Show success message
        alert(`Registration submitted successfully! Your reference number is: ${result.registration.referenceNumber}`);
        
        // Switch to registration details view
        setCurrentView('registration-details');
      } else {
        alert(`Registration failed: ${result.error || 'Unknown error occurred'}`);
      }
    } catch (error) {
      console.error('Registration submission error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderNavigation = () => (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={currentView === 'overview' ? 'primary' : 'outline'}
          onClick={() => setCurrentView('overview')}
          className="flex items-center"
        >
          <User className="mr-2 h-4 w-4" />
          Overview
        </Button>
        
        {!patientRegistration ? (
          <Button
            variant={currentView === 'register' ? 'primary' : 'outline'}
            onClick={() => setCurrentView('register')}
            className="flex items-center"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Register
          </Button>
        ) : (
          <Button
            variant={currentView === 'registration-details' ? 'primary' : 'outline'}
            onClick={() => setCurrentView('registration-details')}
            className="flex items-center"
          >
            <FileText className="mr-2 h-4 w-4" />
            Registration Details
          </Button>
        )}
        
        <Button
          variant={currentView === 'billing' ? 'primary' : 'outline'}
          onClick={() => setCurrentView('billing')}
          className="flex items-center"
        >
          <Receipt className="mr-2 h-4 w-4" />
          Billing History
        </Button>
        
        <Button
          variant={currentView === 'payments' ? 'primary' : 'outline'}
          onClick={() => setCurrentView('payments')}
          className="flex items-center"
        >
          <DollarSign className="mr-2 h-4 w-4" />
          Payment History
        </Button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'register':
        return (
          <PatientRegistrationForm
            onSubmit={handleRegistrationSubmit}
            isSubmitting={isSubmitting}
          />
        );
        
      case 'registration-details':
        return patientRegistration ? (
          <PatientRegistrationDetails registration={patientRegistration} />
        ) : (
          <div className="text-center py-8">
            <UserPlus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No registration found. Please register first.</p>
            <Button
              className="mt-4"
              onClick={() => setCurrentView('register')}
            >
              Register Now
            </Button>
          </div>
        );
        
      case 'billing':
        return <PatientBillingHistory invoices={patientInvoices} />;
        
      case 'payments':
        return <PatientPaymentHistory payments={patientPayments} />;
        
      default:
        return renderOverview();
    }
  };

  const renderOverview = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-gray-600 mt-2">
            Here's an overview of your care dashboard
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
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Appointments */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
              </CardHeader>
              <CardContent>
                {upcomingAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="bg-primary-100 rounded-full p-2">
                            <Calendar className="h-5 w-5 text-primary-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {appointment.serviceType}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {format(parseISO(appointment.date), 'MMM d, yyyy')} at {appointment.time}
                            </p>
                            <p className="text-xs text-gray-500">
                              Duration: {appointment.duration} minutes
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            appointment.status === 'confirmed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {appointment.status}
                          </span>
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No upcoming appointments</p>
                    <Button className="mt-4">Schedule Appointment</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Activity */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
              </CardHeader>
              <CardContent className="space-y-3">
                {!patientRegistration ? (
                  <Button
                    className="w-full justify-start"
                    onClick={() => setCurrentView('register')}
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Register for Services
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setCurrentView('registration-details')}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    View Registration
                  </Button>
                )}
                <Button className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Appointment
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Update Profile
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setCurrentView('billing')}
                >
                  <Receipt className="mr-2 h-4 w-4" />
                  View Billing
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setCurrentView('payments')}
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  Payment History
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <activity.icon className={`h-5 w-5 mt-0.5 ${activity.iconColor}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.title}
                        </p>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderNavigation()}
        {renderContent()}
      </div>
    </div>
  );
}