import React from 'react';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  FileText, 
  Heart, 
  Package,
  Calendar,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { PatientRegistration } from '../../types';
import { mockCarePlans } from '../../utils/data';
import { format, parseISO } from 'date-fns';

interface PatientRegistrationDetailsProps {
  registration: PatientRegistration;
}

export function PatientRegistrationDetails({ registration }: PatientRegistrationDetailsProps) {
  const getSelectedCarePlans = () => {
    return mockCarePlans.filter(plan => registration.selectedCarePlan.includes(plan.id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'approved':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'approved':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4" />;
      case 'rejected':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Reference Number and Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Registration Details</h2>
              <p className="text-gray-600">Reference Number: <span className="font-mono font-medium">{registration.referenceNumber}</span></p>
            </div>
            <div className={`px-3 py-1 rounded-full border flex items-center space-x-2 ${getStatusColor(registration.status)}`}>
              {getStatusIcon(registration.status)}
              <span className="text-sm font-medium capitalize">{registration.status}</span>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <User className="mr-2 h-5 w-5 text-primary-600" />
            Personal Information
          </h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <User className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium">{registration.firstName} {registration.lastName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{registration.phone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{registration.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p className="font-medium">{registration.address}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Care Packages */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Package className="mr-2 h-5 w-5 text-primary-600" />
            Selected Care Packages
          </h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getSelectedCarePlans().map((plan) => (
              <div key={plan.id} className="border border-primary-200 bg-primary-50 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{plan.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{plan.description}</p>
                    <p className="text-lg font-semibold text-primary-600 mt-2">
                      ₹{plan.totalCost.toLocaleString()}/month
                    </p>
                    <p className="text-xs text-gray-500">{plan.frequency}</p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-primary-600" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Medical Information */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Heart className="mr-2 h-5 w-5 text-primary-600" />
            Medical Information
          </h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Medical Condition</p>
              <p className="text-gray-900 bg-gray-50 p-3 rounded-md">{registration.medicalCondition}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Family Doctor</p>
                <p className="text-gray-900">{registration.familyDoctor || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Emergency Contact</p>
                <p className="text-gray-900">{registration.emergencyContactNumber}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Care Needs</p>
              <p className="text-gray-900 bg-gray-50 p-3 rounded-md">{registration.careNeeds}</p>
            </div>
            {registration.comments && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Additional Comments</p>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-md">{registration.comments}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Registration Timeline */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-primary-600" />
            Registration Timeline
          </h3>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-3">
            <Calendar className="h-4 w-4 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Submitted</p>
              <p className="font-medium">
                {format(parseISO(registration.submittedAt), 'MMMM d, yyyy \'at\' h:mm a')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}