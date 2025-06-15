import React, { useState } from 'react';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  FileText, 
  Heart, 
  Users, 
  Phone as PhoneIcon,
  Package,
  Send,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { mockCarePlans } from '../../utils/data';
import { PatientRegistration } from '../../types';

export interface PatientRegistrationData {
  // Personal Information
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  
  // Care Information
  selectedCarePlan: string[];
  comments: string;
  medicalCondition: string;
  familyDoctor: string;
  emergencyContactNumber: string;
  careNeeds: string;
}

interface PatientRegistrationFormProps {
  onSubmit: (data: PatientRegistrationData) => void;
  isSubmitting?: boolean;
}

export function PatientRegistrationForm({ onSubmit, isSubmitting = false }: PatientRegistrationFormProps) {
  const [formData, setFormData] = useState<PatientRegistrationData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    selectedCarePlan: [],
    comments: '',
    medicalCondition: '',
    familyDoctor: '',
    emergencyContactNumber: '',
    careNeeds: ''
  });

  const [errors, setErrors] = useState<Partial<PatientRegistrationData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<PatientRegistrationData> = {};

    // Required field validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (formData.selectedCarePlan.length === 0) newErrors.selectedCarePlan = ['At least one care package must be selected'];
    if (!formData.medicalCondition.trim()) newErrors.medicalCondition = 'Medical condition is required';
    if (!formData.emergencyContactNumber.trim()) newErrors.emergencyContactNumber = 'Emergency contact number is required';
    if (!formData.careNeeds.trim()) newErrors.careNeeds = 'Care needs description is required';

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s|-|\(|\)/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof PatientRegistrationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCarePlanToggle = (planId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedCarePlan: prev.selectedCarePlan.includes(planId)
        ? prev.selectedCarePlan.filter(id => id !== planId)
        : [...prev.selectedCarePlan, planId]
    }));
    // Clear error when user selects a plan
    if (errors.selectedCarePlan) {
      setErrors(prev => ({ ...prev, selectedCarePlan: undefined }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Registration</h1>
            <p className="text-gray-600">Please fill out all required information to register for our care services</p>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <User className="mr-2 h-5 w-5 text-primary-600" />
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <Input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Enter your first name"
                    className={errors.firstName ? 'border-red-500' : ''}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <Input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Enter your last name"
                    className={errors.lastName ? 'border-red-500' : ''}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.lastName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+1-555-0123"
                    className={errors.phone ? 'border-red-500' : ''}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your.email@example.com"
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address *
                  </label>
                  <Input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Enter your full address"
                    className={errors.address ? 'border-red-500' : ''}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.address}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Care Package Selection */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Package className="mr-2 h-5 w-5 text-primary-600" />
                Care Packages *
              </h2>
              <p className="text-sm text-gray-600 mb-4">Select one or more care packages that meet your needs:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockCarePlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      formData.selectedCarePlan.includes(plan.id)
                        ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleCarePlanToggle(plan.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{plan.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{plan.description}</p>
                        <p className="text-lg font-semibold text-primary-600 mt-2">
                          ₹{plan.totalCost.toLocaleString()}/month
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{plan.frequency}</p>
                      </div>
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        formData.selectedCarePlan.includes(plan.id)
                          ? 'border-primary-500 bg-primary-500'
                          : 'border-gray-300'
                      }`}>
                        {formData.selectedCarePlan.includes(plan.id) && (
                          <div className="w-2 h-2 bg-white rounded-sm"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {errors.selectedCarePlan && (
                <p className="text-red-500 text-xs mt-2 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  At least one care package must be selected
                </p>
              )}
            </div>

            {/* Medical Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Heart className="mr-2 h-5 w-5 text-primary-600" />
                Medical Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Medical Condition *
                  </label>
                  <textarea
                    value={formData.medicalCondition}
                    onChange={(e) => handleInputChange('medicalCondition', e.target.value)}
                    placeholder="Please describe your current medical conditions, symptoms, or health concerns"
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${
                      errors.medicalCondition ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.medicalCondition && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.medicalCondition}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Family Doctor
                  </label>
                  <Input
                    type="text"
                    value={formData.familyDoctor}
                    onChange={(e) => handleInputChange('familyDoctor', e.target.value)}
                    placeholder="Dr. Smith - Springfield Medical Center"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Emergency Contact Number *
                  </label>
                  <Input
                    type="tel"
                    value={formData.emergencyContactNumber}
                    onChange={(e) => handleInputChange('emergencyContactNumber', e.target.value)}
                    placeholder="+1-555-0124"
                    className={errors.emergencyContactNumber ? 'border-red-500' : ''}
                  />
                  {errors.emergencyContactNumber && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.emergencyContactNumber}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Care Needs *
                  </label>
                  <textarea
                    value={formData.careNeeds}
                    onChange={(e) => handleInputChange('careNeeds', e.target.value)}
                    placeholder="Please describe your specific care needs, daily activities you need help with, preferred schedule, etc."
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${
                      errors.careNeeds ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.careNeeds && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.careNeeds}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Comments */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="mr-2 h-5 w-5 text-primary-600" />
                Additional Comments
              </h2>
              <textarea
                value={formData.comments}
                onChange={(e) => handleInputChange('comments', e.target.value)}
                placeholder="Any additional information you'd like us to know about your care preferences, schedule, or special requirements..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 text-lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Submit Registration
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}