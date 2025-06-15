import React, { useState } from 'react';
import { 
  User, 
  FileText, 
  Upload, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin,
  Award,
  CheckCircle,
  Clock,
  Settings,
  Download,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../hooks/useAuth';
import { CandidateEnrollmentForm } from './components/CandidateEnrollmentForm';

type TabType = 'overview' | 'enrollment' | 'profile' | 'documents' | 'status';

export function CandidateDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [candidateData, setCandidateData] = useState<any>(null);

  // Mock candidate data - in real app, this would come from API
  const mockCandidateData = {
    referenceNumber: 'CAND-2024-001234',
    applicationStatus: 'pending',
    submissionDate: '2024-06-14',
    documents: [
      { id: 1, name: 'Resume.pdf', type: 'resume', status: 'uploaded', uploadedAt: '2024-06-14' },
      { id: 2, name: 'CNA_Certificate.pdf', type: 'certificate', status: 'uploaded', uploadedAt: '2024-06-14' }
    ],
    personalInfo: {
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1-555-0123',
      address: '123 Main St, Springfield, IL',
      dateOfBirth: '1990-05-15',
      qualification: 'Bachelor of Nursing',
      experience: 3
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'enrollment', label: 'Enrollment Form', icon: User },
    { id: 'profile', label: 'Profile', icon: Settings },
    { id: 'documents', label: 'Documents', icon: Upload },
    { id: 'status', label: 'Application Status', icon: CheckCircle }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'enrollment':
        return <CandidateEnrollmentForm onSubmit={setCandidateData} />;
      case 'profile':
        return renderProfile();
      case 'documents':
        return renderDocuments();
      case 'status':
        return renderStatus();
      default:
        return renderOverview();
    }
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome to Ayuh Clinic Candidate Portal
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Thank you for your interest in joining our healthcare team. Use this portal to complete your application, 
              upload required documents, and track your application status.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Application Status Card */}
      {candidateData?.referenceNumber && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Application Status</h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="font-medium text-gray-900">Reference Number</h4>
                <p className="text-sm text-gray-600 mt-1">{candidateData.referenceNumber}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
                <h4 className="font-medium text-gray-900">Status</h4>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${getStatusColor(candidateData.applicationStatus)}`}>
                  {candidateData.applicationStatus.charAt(0).toUpperCase() + candidateData.applicationStatus.slice(1)}
                </span>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="font-medium text-gray-900">Submitted</h4>
                <p className="text-sm text-gray-600 mt-1">{candidateData.submissionDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab('enrollment')}>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-900">Complete Enrollment</h3>
              <p className="text-sm text-gray-600 mt-1">Fill out your application form</p>
            </CardContent>
          </Card>
        </div>

        <div className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab('documents')}>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Upload className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-900">Upload Documents</h3>
              <p className="text-sm text-gray-600 mt-1">Submit required certificates</p>
            </CardContent>
          </Card>
        </div>

        <div className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab('status')}>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="font-medium text-gray-900">Check Status</h3>
              <p className="text-sm text-gray-600 mt-1">Track application progress</p>
            </CardContent>
          </Card>
        </div>

        <div className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab('profile')}>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Settings className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-medium text-gray-900">Profile Settings</h3>
              <p className="text-sm text-gray-600 mt-1">Manage your information</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Application Process Steps */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Application Process</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-4">
                <h4 className="font-medium text-gray-900">1. Complete Enrollment Form</h4>
                <p className="text-sm text-gray-600">Fill out your personal information, qualifications, and experience</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Upload className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-4">
                <h4 className="font-medium text-gray-900">2. Upload Documents</h4>
                <p className="text-sm text-gray-600">Submit your resume, certificates, and other required documents</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <Eye className="h-5 w-5 text-yellow-600" />
              </div>
              <div className="ml-4">
                <h4 className="font-medium text-gray-900">3. Application Review</h4>
                <p className="text-sm text-gray-600">Our team will review your application and documents</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-purple-600" />
              </div>
              <div className="ml-4">
                <h4 className="font-medium text-gray-900">4. Interview & Assessment</h4>
                <p className="text-sm text-gray-600">Participate in an interview and skills assessment</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderProfile = () => (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
      </CardHeader>
      <CardContent>
        {candidateData ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <p className="text-gray-900">{candidateData.personalInfo?.name || 'Not provided'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p className="text-gray-900">{candidateData.personalInfo?.email || 'Not provided'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <p className="text-gray-900">{candidateData.personalInfo?.phone || 'Not provided'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <p className="text-gray-900">{candidateData.personalInfo?.dateOfBirth || 'Not provided'}</p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <p className="text-gray-900">{candidateData.personalInfo?.address || 'Not provided'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
                <p className="text-gray-900">{candidateData.personalInfo?.qualification || 'Not provided'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                <p className="text-gray-900">{candidateData.personalInfo?.experience ? `${candidateData.personalInfo.experience} years` : 'Not provided'}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">Complete your enrollment form to view your profile information.</p>
            <Button className="mt-4" onClick={() => setActiveTab('enrollment')}>
              Complete Enrollment Form
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderDocuments = () => (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900">Document Management</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Required Documents */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Required Documents</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Resume</p>
                    <p className="text-sm text-gray-600">PDF format preferred</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-green-600">✓ Uploaded</span>
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Certificates</p>
                    <p className="text-sm text-gray-600">Professional certifications and licenses</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-green-600">✓ Uploaded</span>
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border border-dashed border-gray-300 rounded-lg">
                <div className="flex items-center">
                  <Upload className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Additional Documents</p>
                    <p className="text-sm text-gray-600">References, background check, etc.</p>
                  </div>
                </div>
                <Button size="sm">
                  <Upload className="h-4 w-4 mr-1" />
                  Upload
                </Button>
              </div>
            </div>
          </div>

          {/* Upload New Document */}
          <div className="border-t border-gray-200 pt-6">
            <h4 className="font-medium text-gray-900 mb-4">Upload New Document</h4>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-blue-600 cursor-pointer">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX up to 10MB</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderStatus = () => (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900">Application Status</h3>
      </CardHeader>
      <CardContent>
        {candidateData ? (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-blue-600 mr-2" />
                <h4 className="font-medium text-blue-900">Reference Number: {candidateData.referenceNumber}</h4>
              </div>
              <p className="text-sm text-blue-700 mt-1">Use this reference number for all communications</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <p className="font-medium text-green-900">Application Submitted</p>
                    <p className="text-sm text-green-700">Received on {candidateData.submissionDate}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-yellow-600 mr-3" />
                  <div>
                    <p className="font-medium text-yellow-900">Under Review</p>
                    <p className="text-sm text-yellow-700">Our team is reviewing your application</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg opacity-50">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium text-gray-600">Interview Scheduled</p>
                    <p className="text-sm text-gray-500">Pending review completion</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg opacity-50">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium text-gray-600">Final Decision</p>
                    <p className="text-sm text-gray-500">Pending interview</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Next Steps</h4>
              <p className="text-sm text-gray-600">
                We'll review your application within 3-5 business days. If your application meets our requirements, 
                we'll contact you to schedule an interview. You'll receive updates via email and can check this 
                portal for status changes.
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">Complete your enrollment form to track your application status.</p>
            <Button className="mt-4" onClick={() => setActiveTab('enrollment')}>
              Complete Enrollment Form
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Candidate Portal
              </h1>
              <p className="text-gray-600 mt-2">
                Complete your application to join the Ayuh Clinic healthcare team
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <img
                src="/AYUH_Logo_2.png"
                alt="Ayuh Clinic Logo"
                className="h-12 w-auto"
              />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
}