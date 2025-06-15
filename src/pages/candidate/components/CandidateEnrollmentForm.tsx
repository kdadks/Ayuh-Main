import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  GraduationCap, 
  Briefcase,
  Upload,
  FileText,
  Award,
  Save,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

interface EnrollmentFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  
  // Qualification & Experience
  qualification: string;
  experience?: number;
  
  // File uploads
  resume?: FileList;
  certificates?: FileList;
}

interface CandidateEnrollmentFormProps {
  onSubmit: (data: any) => void;
}

export function CandidateEnrollmentForm({ onSubmit }: CandidateEnrollmentFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: File[]}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { register, handleSubmit, watch, formState: { errors }, trigger } = useForm<EnrollmentFormData>();

  const watchedData = watch();

  // Generate reference number
  const generateReferenceNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `CAND-${year}${month}${day}-${random}`;
  };

  const handleFileUpload = (fieldName: string, files: FileList | null) => {
    if (files) {
      setUploadedFiles(prev => ({
        ...prev,
        [fieldName]: Array.from(files)
      }));
    }
  };

  const onFormSubmit = async (data: EnrollmentFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const submissionData = {
      ...data,
      referenceNumber: generateReferenceNumber(),
      applicationStatus: 'pending',
      submissionDate: new Date().toISOString().split('T')[0],
      uploadedFiles,
      personalInfo: {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        address: data.address,
        dateOfBirth: data.dateOfBirth,
        qualification: data.qualification,
        experience: data.experience || 0
      }
    };
    
    onSubmit(submissionData);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const getFieldsForStep = (step: number) => {
    switch (step) {
      case 1:
        return ['firstName', 'lastName', 'email', 'phone'] as Array<keyof EnrollmentFormData>;
      case 2:
        return ['address', 'dateOfBirth'] as Array<keyof EnrollmentFormData>;
      case 3:
        return ['qualification'] as Array<keyof EnrollmentFormData>;
      default:
        return [] as Array<keyof EnrollmentFormData>;
    }
  };

  if (isSubmitted) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted Successfully!</h2>
          <p className="text-gray-600 mb-4">
            Thank you for your application. We have received your information and will review it shortly.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-700">
              <strong>Reference Number:</strong> Please save this number for future reference.
            </p>
          </div>
          <Button onClick={() => window.location.reload()}>
            Submit Another Application
          </Button>
        </CardContent>
      </Card>
    );
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="First Name *"
            icon={<User className="h-5 w-5" />}
            error={errors.firstName?.message}
            {...register('firstName', {
              required: 'First name is required'
            })}
          />

          <Input
            label="Last Name *"
            icon={<User className="h-5 w-5" />}
            error={errors.lastName?.message}
            {...register('lastName', {
              required: 'Last name is required'
            })}
          />

          <Input
            label="Email Address *"
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
            label="Phone Number *"
            type="tel"
            icon={<Phone className="h-5 w-5" />}
            error={errors.phone?.message}
            {...register('phone', {
              required: 'Phone number is required',
              pattern: {
                value: /^[\+]?[1-9][\d]{0,15}$/,
                message: 'Please enter a valid phone number'
              }
            })}
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Address & Personal Details</h3>
        <div className="space-y-6">
          <Input
            label="Full Address *"
            icon={<MapPin className="h-5 w-5" />}
            error={errors.address?.message}
            placeholder="Street, City, State, ZIP Code"
            {...register('address', {
              required: 'Address is required'
            })}
          />

          <Input
            label="Date of Birth *"
            type="date"
            icon={<Calendar className="h-5 w-5" />}
            error={errors.dateOfBirth?.message}
            {...register('dateOfBirth', {
              required: 'Date of birth is required',
              validate: (value) => {
                const birthDate = new Date(value);
                const today = new Date();
                const age = today.getFullYear() - birthDate.getFullYear();
                if (age < 18) {
                  return 'You must be at least 18 years old';
                }
                if (age > 80) {
                  return 'Please enter a valid date of birth';
                }
                return true;
              }
            })}
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Qualifications & Experience</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Highest Qualification *
            </label>
            <select
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              {...register('qualification', { required: 'Please select your qualification' })}
            >
              <option value="">Select your qualification</option>
              <option value="High School Diploma">High School Diploma</option>
              <option value="Certificate Program">Certificate Program</option>
              <option value="Associate Degree">Associate Degree</option>
              <option value="Bachelor's Degree">Bachelor's Degree</option>
              <option value="Master's Degree">Master's Degree</option>
              <option value="Doctoral Degree">Doctoral Degree</option>
              <option value="Professional License">Professional License</option>
            </select>
            {errors.qualification && (
              <p className="text-sm text-red-600 mt-1">{errors.qualification.message}</p>
            )}
          </div>

          <Input
            label="Years of Experience (Optional)"
            type="number"
            icon={<Briefcase className="h-5 w-5" />}
            error={errors.experience?.message}
            placeholder="0"
            min="0"
            max="50"
            {...register('experience', {
              min: {
                value: 0,
                message: 'Experience cannot be negative'
              },
              max: {
                value: 50,
                message: 'Please enter a valid number of years'
              }
            })}
          />
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Upload</h3>
        <div className="space-y-6">
          {/* Resume Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Resume *
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <label className="cursor-pointer">
                    <span className="mt-2 block text-sm font-medium text-gray-900">
                      Upload your resume
                    </span>
                    <input
                      type="file"
                      className="sr-only"
                      accept=".pdf,.doc,.docx"
                      {...register('resume', { 
                        required: 'Resume is required',
                        onChange: (e) => handleFileUpload('resume', e.target.files)
                      })}
                    />
                    <span className="mt-2 block text-sm text-gray-500">
                      PDF, DOC, DOCX up to 10MB
                    </span>
                  </label>
                </div>
              </div>
            </div>
            {uploadedFiles.resume && (
              <div className="mt-2">
                <p className="text-sm text-green-600">
                  ✓ {uploadedFiles.resume[0]?.name} uploaded
                </p>
              </div>
            )}
            {errors.resume && (
              <p className="text-sm text-red-600 mt-1">{errors.resume.message}</p>
            )}
          </div>

          {/* Certificates Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Certificates (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="text-center">
                <Award className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <label className="cursor-pointer">
                    <span className="mt-2 block text-sm font-medium text-gray-900">
                      Upload certificates
                    </span>
                    <input
                      type="file"
                      className="sr-only"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      multiple
                      {...register('certificates', {
                        onChange: (e) => handleFileUpload('certificates', e.target.files)
                      })}
                    />
                    <span className="mt-2 block text-sm text-gray-500">
                      Multiple files allowed. PDF, DOC, DOCX, JPG, PNG up to 10MB each
                    </span>
                  </label>
                </div>
              </div>
            </div>
            {uploadedFiles.certificates && (
              <div className="mt-2">
                {uploadedFiles.certificates.map((file, index) => (
                  <p key={index} className="text-sm text-green-600">
                    ✓ {file.name} uploaded
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Step {currentStep} of 4</span>
        <span className="text-sm text-gray-500">{Math.round((currentStep / 4) * 100)}% Complete</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / 4) * 100}%` }}
        ></div>
      </div>
    </div>
  );

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return 'Personal Information';
      case 2: return 'Address & Details';
      case 3: return 'Qualifications';
      case 4: return 'Document Upload';
      default: return 'Enrollment Form';
    }
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-bold text-gray-900">Candidate Enrollment Form</h2>
        <p className="text-gray-600">
          Please fill out all required information to complete your application
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          {renderProgressBar()}
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {getStepTitle(currentStep)}
            </h3>
          </div>

          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Previous
            </Button>

            {currentStep < 4 ? (
              <Button type="button" onClick={nextStep}>
                Next Step
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="min-w-[140px]"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Save className="h-4 w-4 mr-2" />
                    Submit Application
                  </div>
                )}
              </Button>
            )}
          </div>

          {/* Summary Preview for Step 4 */}
          {currentStep === 4 && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Application Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Name:</span>
                  <span className="ml-2 text-gray-900">
                    {watchedData.firstName} {watchedData.lastName}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Email:</span>
                  <span className="ml-2 text-gray-900">{watchedData.email}</span>
                </div>
                <div>
                  <span className="text-gray-600">Phone:</span>
                  <span className="ml-2 text-gray-900">{watchedData.phone}</span>
                </div>
                <div>
                  <span className="text-gray-600">Qualification:</span>
                  <span className="ml-2 text-gray-900">{watchedData.qualification}</span>
                </div>
                {watchedData.experience && (
                  <div>
                    <span className="text-gray-600">Experience:</span>
                    <span className="ml-2 text-gray-900">{watchedData.experience} years</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}