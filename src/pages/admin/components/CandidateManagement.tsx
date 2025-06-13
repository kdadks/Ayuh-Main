import React, { useState } from 'react';
import { 
  Users, 
  Eye, 
  MessageSquare, 
  FileText, 
  Upload, 
  Check, 
  X, 
  Clock,
  Star,
  Download,
  Search
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Candidate, Document } from '../../../types';

export function CandidateManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'reviewed' | 'approved' | 'rejected'>('all');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);

  // Mock candidates data
  const [candidates] = useState<Candidate[]>([
    {
      id: '1',
      candidateId: 'CAND001',
      email: 'emily.rodriguez@email.com',
      firstName: 'Emily',
      lastName: 'Rodriguez',
      role: 'caregiver',
      isActive: false,
      createdAt: '2024-02-01T10:00:00Z',
      phone: '+1-555-0123',
      address: '123 Main St, Springfield, IL',
      dateOfBirth: '1990-05-15',
      emergencyContact: {
        name: 'John Rodriguez',
        relationship: 'Spouse',
        phone: '+1-555-0124'
      },
      experience: 5,
      qualifications: ['CNA Certified', 'CPR/First Aid', 'Alzheimer\'s Care Training'],
      documents: [
        {
          id: '1',
          name: 'CNA Certificate',
          type: 'pdf',
          url: '/documents/cna-cert.pdf',
          uploadedAt: '2024-02-01T10:00:00Z'
        },
        {
          id: '2',
          name: 'CPR Certification',
          type: 'pdf',
          url: '/documents/cpr-cert.pdf',
          uploadedAt: '2024-02-01T10:15:00Z'
        }
      ],
      interviewAssessment: {
        comments: 'Excellent communication skills and experience with elderly care.',
        rating: 4.5,
        interviewer: 'Jennifer Williams',
        interviewDate: '2024-02-05T14:00:00Z'
      },
      policeVerification: {
        status: 'verified',
        documentUrl: '/documents/police-verification.pdf',
        verifiedDate: '2024-02-03T09:00:00Z'
      },
      status: 'approved',
      appliedAt: '2024-02-01T10:00:00Z'
    },
    {
      id: '2',
      candidateId: 'CAND002',
      email: 'marcus.thompson@email.com',
      firstName: 'Marcus',
      lastName: 'Thompson',
      role: 'caregiver',
      isActive: false,
      createdAt: '2024-01-28T14:30:00Z',
      phone: '+1-555-0125',
      address: '456 Oak Ave, Springfield, IL',
      dateOfBirth: '1985-03-22',
      emergencyContact: {
        name: 'Sarah Thompson',
        relationship: 'Sister',
        phone: '+1-555-0126'
      },
      experience: 8,
      qualifications: ['RN Licensed', 'Home Health Aide', 'Medication Administration'],
      documents: [
        {
          id: '3',
          name: 'RN License',
          type: 'pdf',
          url: '/documents/rn-license.pdf',
          uploadedAt: '2024-01-28T14:30:00Z'
        }
      ],
      policeVerification: {
        status: 'pending'
      },
      status: 'pending',
      appliedAt: '2024-01-28T14:30:00Z'
    }
  ]);

  const [assessmentForm, setAssessmentForm] = useState({
    comments: '',
    rating: 0,
    interviewer: 'Jennifer Williams'
  });

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = 
      candidate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.candidateId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleApproveCandidate = (candidateId: string) => {
    console.log('Approving candidate:', candidateId);
  };

  const handleRejectCandidate = (candidateId: string) => {
    console.log('Rejecting candidate:', candidateId);
  };

  const handleSaveAssessment = () => {
    console.log('Saving assessment:', assessmentForm);
    setShowAssessmentModal(false);
    setAssessmentForm({ comments: '', rating: 0, interviewer: 'Jennifer Williams' });
  };

  const handleUploadDocument = (file: File) => {
    console.log('Uploading document:', file.name);
  };

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

  const getVerificationColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Candidate Management</h2>
          <p className="text-gray-600 mt-1">
            Review applications, conduct assessments, and verify candidate documents
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-gray-900">
                  {candidates.filter(c => c.status === 'pending').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Under Review</p>
                <p className="text-2xl font-bold text-gray-900">
                  {candidates.filter(c => c.status === 'reviewed').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">
                  {candidates.filter(c => c.status === 'approved').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <X className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-gray-900">
                  {candidates.filter(c => c.status === 'rejected').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search candidates by name, email, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Candidates Table */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Candidate Applications</h3>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Candidate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Experience
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Verification
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assessment
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCandidates.map((candidate) => (
                  <tr key={candidate.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">
                              {candidate.firstName[0]}{candidate.lastName[0]}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {candidate.firstName} {candidate.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{candidate.candidateId}</div>
                          <div className="text-sm text-gray-500">{candidate.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{candidate.experience} years</div>
                      <div className="text-sm text-gray-500">
                        {candidate.qualifications.slice(0, 2).join(', ')}
                        {candidate.qualifications.length > 2 && '...'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(candidate.status)}`}>
                        {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getVerificationColor(candidate.policeVerification?.status || 'pending')}`}>
                        {candidate.policeVerification?.status || 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {candidate.interviewAssessment ? (
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-sm text-gray-900">
                            {candidate.interviewAssessment.rating}/5
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">Not assessed</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedCandidate(candidate);
                            setShowAssessmentModal(true);
                          }}
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Assess
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedCandidate(candidate);
                            setShowDocumentModal(true);
                          }}
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          Documents
                        </Button>

                        {candidate.status === 'pending' || candidate.status === 'reviewed' ? (
                          <div className="flex space-x-1">
                            <Button
                              size="sm"
                              onClick={() => handleApproveCandidate(candidate.id)}
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRejectCandidate(candidate.id)}
                              className="text-red-600 border-red-300 hover:bg-red-50"
                            >
                              <X className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Assessment Modal */}
      {showAssessmentModal && selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Interview Assessment - {selectedCandidate.firstName} {selectedCandidate.lastName}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating (1-5 stars)
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setAssessmentForm({...assessmentForm, rating: star})}
                      className={`p-1 ${assessmentForm.rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      <Star className="h-6 w-6 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assessment Comments
                </label>
                <textarea
                  value={assessmentForm.comments}
                  onChange={(e) => setAssessmentForm({...assessmentForm, comments: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your assessment comments..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interviewer
                </label>
                <Input
                  value={assessmentForm.interviewer}
                  onChange={(e) => setAssessmentForm({...assessmentForm, interviewer: e.target.value})}
                  placeholder="Interviewer name"
                />
              </div>

              {selectedCandidate.interviewAssessment && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Previous Assessment</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Rating: {selectedCandidate.interviewAssessment.rating}/5 stars
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    Comments: {selectedCandidate.interviewAssessment.comments}
                  </p>
                  <p className="text-sm text-gray-500">
                    By: {selectedCandidate.interviewAssessment.interviewer} on{' '}
                    {new Date(selectedCandidate.interviewAssessment.interviewDate).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowAssessmentModal(false);
                  setSelectedCandidate(null);
                  setAssessmentForm({ comments: '', rating: 0, interviewer: 'Jennifer Williams' });
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveAssessment}>
                Save Assessment
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Documents Modal */}
      {showDocumentModal && selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Documents - {selectedCandidate.firstName} {selectedCandidate.lastName}
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Existing Documents */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Uploaded Documents</h4>
                <div className="space-y-3">
                  {selectedCandidate.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                          <p className="text-sm text-gray-500">
                            Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upload New Documents */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Upload Additional Documents</h4>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <label className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">
                        Upload Police Verification or Other Documents
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={(e) => e.target.files?.[0] && handleUploadDocument(e.target.files[0])}
                      />
                    </label>
                    <p className="mt-1 text-sm text-gray-500">
                      PDF, DOC, DOCX, JPG, PNG up to 10MB
                    </p>
                  </div>
                </div>

                {/* Police Verification Status */}
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">Police Verification Status</h5>
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getVerificationColor(selectedCandidate.policeVerification?.status || 'pending')}`}>
                      {selectedCandidate.policeVerification?.status || 'Pending'}
                    </span>
                    {selectedCandidate.policeVerification?.status === 'verified' && (
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    )}
                  </div>
                  {selectedCandidate.policeVerification?.verifiedDate && (
                    <p className="text-sm text-gray-500 mt-1">
                      Verified on {new Date(selectedCandidate.policeVerification.verifiedDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowDocumentModal(false);
                  setSelectedCandidate(null);
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}