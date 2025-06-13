import React, { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  UserX, 
  UserPlus, 
  Badge, 
  Clock, 
  Search,
  Check,
  X,
  Eye,
  Edit
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Employee, Candidate } from '../../../types';

export function EmployeeManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  // Mock employees data
  const [employees] = useState<Employee[]>([
    {
      id: '1',
      employeeId: '2024012AYUH00001',
      email: 'maria.garcia@ayuhclinic.com',
      firstName: 'Maria',
      lastName: 'Garcia',
      role: 'employee',
      isActive: true,
      createdAt: '2024-01-25T10:00:00Z',
      phone: '+1-555-0200',
      address: '123 Healthcare Ave, Springfield, IL',
      dateOfBirth: '1988-07-12',
      emergencyContact: {
        name: 'Carlos Garcia',
        relationship: 'Husband',
        phone: '+1-555-0201'
      },
      hourlyRate: 25.50,
      availability: {},
      skills: ['Personal Care', 'Medication Management', 'Companionship'],
      certifications: ['CNA', 'CPR/First Aid', 'Alzheimer\'s Care']
    },
    {
      id: '2',
      employeeId: '2024020AYUH00002',
      email: 'david.chen@ayuhclinic.com',
      firstName: 'David',
      lastName: 'Chen',
      role: 'employee',
      isActive: true,
      createdAt: '2024-02-03T14:30:00Z',
      phone: '+1-555-0202',
      address: '456 Care Street, Springfield, IL',
      dateOfBirth: '1985-03-22',
      emergencyContact: {
        name: 'Lisa Chen',
        relationship: 'Wife',
        phone: '+1-555-0203'
      },
      hourlyRate: 28.00,
      availability: {},
      skills: ['Medical Care', 'Transportation', 'Light Housekeeping'],
      certifications: ['RN License', 'Home Health Aide', 'Medication Administration']
    },
    {
      id: '3',
      employeeId: '2024021AYUH00003',
      email: 'sarah.wilson@ayuhclinic.com',
      firstName: 'Sarah',
      lastName: 'Wilson',
      role: 'employee',
      isActive: false,
      createdAt: '2024-02-10T09:15:00Z',
      phone: '+1-555-0204',
      address: '789 Wellness Blvd, Springfield, IL',
      dateOfBirth: '1992-11-08',
      emergencyContact: {
        name: 'Mark Wilson',
        relationship: 'Brother',
        phone: '+1-555-0205'
      },
      hourlyRate: 24.00,
      availability: {},
      skills: ['Companionship', 'Light Housekeeping'],
      certifications: ['CPR/First Aid']
    }
  ]);

  // Mock approved candidates ready for conversion
  const [approvedCandidates] = useState<Candidate[]>([
    {
      id: '4',
      candidateId: 'CAND003',
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
      documents: [],
      status: 'approved',
      appliedAt: '2024-02-01T10:00:00Z'
    }
  ]);

  const generateEmployeeId = (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    
    // Get next sequential number
    const existingIds = employees.map(emp => {
      const match = emp.employeeId.match(/AYUH(\d{5})$/);
      return match ? parseInt(match[1]) : 0;
    });
    const nextNumber = Math.max(...existingIds, 0) + 1;
    const sequentialNumber = String(nextNumber).padStart(5, '0');
    
    return `${year}${month}${day}AYUH${sequentialNumber}`;
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && employee.isActive) ||
      (statusFilter === 'inactive' && !employee.isActive);

    return matchesSearch && matchesStatus;
  });

  const handleConfirmAsEmployee = (candidate: Candidate) => {
    const newEmployeeId = generateEmployeeId();
    console.log('Converting candidate to employee:', {
      candidateId: candidate.id,
      newEmployeeId,
      candidateData: candidate
    });
    setShowConfirmModal(false);
    setSelectedCandidate(null);
  };

  const handleActivateEmployee = (employeeId: string) => {
    console.log('Activating employee:', employeeId);
  };

  const handleDeactivateEmployee = (employeeId: string) => {
    console.log('Deactivating employee:', employeeId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Employee Management</h2>
          <p className="text-gray-600 mt-1">
            Manage employee accounts, confirm candidates, and track employment status
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Employees</p>
                <p className="text-2xl font-bold text-gray-900">{employees.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Employees</p>
                <p className="text-2xl font-bold text-gray-900">
                  {employees.filter(e => e.isActive).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <UserX className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Inactive Employees</p>
                <p className="text-2xl font-bold text-gray-900">
                  {employees.filter(e => !e.isActive).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <UserPlus className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Ready to Hire</p>
                <p className="text-2xl font-bold text-gray-900">{approvedCandidates.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Approved Candidates Section */}
      {approvedCandidates.length > 0 && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Approved Candidates Ready for Employment</h3>
            <p className="text-gray-600">Convert approved candidates to employees with unique Employee IDs</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {approvedCandidates.map((candidate) => (
                <div key={candidate.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-green-700">
                          {candidate.firstName[0]}{candidate.lastName[0]}
                        </span>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-sm font-medium text-gray-900">
                          {candidate.firstName} {candidate.lastName}
                        </h4>
                        <p className="text-sm text-gray-500">{candidate.candidateId}</p>
                        <p className="text-sm text-gray-500">{candidate.experience} years experience</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedCandidate(candidate);
                        setShowConfirmModal(true);
                      }}
                    >
                      <UserPlus className="h-4 w-4 mr-1" />
                      Confirm as Employee
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search employees by name, email, or ID..."
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Employees Table */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Employee Directory</h3>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Skills & Certifications
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hourly Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-700">
                              {employee.firstName[0]}{employee.lastName[0]}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {employee.firstName} {employee.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{employee.email}</div>
                          <div className="text-sm text-gray-500">{employee.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Badge className="h-4 w-4 mr-2 text-gray-400" />
                        <div className="text-sm font-mono text-gray-900">{employee.employeeId}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        <div className="mb-1">
                          <span className="font-medium">Skills:</span> {employee.skills.slice(0, 2).join(', ')}
                          {employee.skills.length > 2 && '...'}
                        </div>
                        <div>
                          <span className="font-medium">Certs:</span> {employee.certifications.slice(0, 2).join(', ')}
                          {employee.certifications.length > 2 && '...'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ${employee.hourlyRate}/hr
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        employee.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {employee.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>

                        {employee.isActive ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeactivateEmployee(employee.id)}
                            className="text-red-600 border-red-300 hover:bg-red-50"
                          >
                            <UserX className="h-4 w-4 mr-1" />
                            Deactivate
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => handleActivateEmployee(employee.id)}
                          >
                            <UserCheck className="h-4 w-4 mr-1" />
                            Activate
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Modal */}
      {showConfirmModal && selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirm Employee Conversion
            </h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Candidate Details</h4>
                <p className="text-sm text-gray-600">
                  <strong>Name:</strong> {selectedCandidate.firstName} {selectedCandidate.lastName}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Candidate ID:</strong> {selectedCandidate.candidateId}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Experience:</strong> {selectedCandidate.experience} years
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Qualifications:</strong> {selectedCandidate.qualifications.join(', ')}
                </p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">New Employee Details</h4>
                <p className="text-sm text-gray-600">
                  <strong>Employee ID:</strong> {generateEmployeeId()}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Role:</strong> Employee
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  All candidate data will be automatically copied to the employee profile.
                </p>
              </div>

              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> This action will convert the candidate to an employee and cannot be undone. 
                  The candidate will receive their Employee ID and access credentials.
                </p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowConfirmModal(false);
                  setSelectedCandidate(null);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleConfirmAsEmployee(selectedCandidate)}
              >
                <Check className="h-4 w-4 mr-1" />
                Confirm Employee
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}