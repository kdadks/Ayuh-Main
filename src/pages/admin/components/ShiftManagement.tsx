import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Search,
  Filter,
  CheckCircle,
  AlertTriangle,
  X,
  RotateCcw,
  Eye,
  Plus
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Shift, Employee, ShiftAssignment } from '../../../types';

export function ShiftManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'assigned' | 'completed' | 'cancelled'>('all');
  const [dateFilter, setDateFilter] = useState('');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);

  // Mock shifts data with extended properties
  const [shifts] = useState<(Shift & { 
    employeeName?: string; 
    arrivalStatus?: 'on-time' | 'late' | 'no-show' | 'pending';
    arrivalTime?: string;
  })[]>([
    {
      id: '1',
      employeeId: '1',
      employeeName: 'Maria Garcia',
      patientId: '1',
      patientName: 'Sarah Johnson',
      date: '2024-02-15',
      startTime: '08:00',
      endTime: '16:00',
      duration: 8,
      serviceType: 'Personal Care Assistance',
      status: 'assigned',
      location: '123 Oak Street, Springfield, IL',
      payment: 204.00,
      arrivalStatus: 'on-time',
      arrivalTime: '07:58',
      notes: 'Morning medication assistance required',
      specialInstructions: 'Patient has mobility issues, requires walker assistance'
    },
    {
      id: '2',
      employeeId: '2',
      employeeName: 'David Chen',
      patientId: '2',
      patientName: 'Robert Wilson',
      date: '2024-02-15',
      startTime: '09:00',
      endTime: '17:00',
      duration: 8,
      serviceType: 'Medical Care',
      status: 'assigned',
      location: '456 Maple Avenue, Springfield, IL',
      payment: 224.00,
      arrivalStatus: 'late',
      arrivalTime: '09:15',
      notes: 'Blood pressure monitoring required'
    },
    {
      id: '3',
      employeeId: '',
      patientId: '3',
      patientName: 'Margaret Thompson',
      date: '2024-02-16',
      startTime: '10:00',
      endTime: '14:00',
      duration: 4,
      serviceType: 'Companionship',
      status: 'pending',
      location: '789 Pine Road, Springfield, IL',
      payment: 102.00,
      arrivalStatus: 'pending',
      notes: 'Social activities and light meal preparation'
    },
    {
      id: '4',
      employeeId: '1',
      employeeName: 'Maria Garcia',
      patientId: '4',
      patientName: 'William Davis',
      date: '2024-02-16',
      startTime: '14:00',
      endTime: '18:00',
      duration: 4,
      serviceType: 'Transportation',
      status: 'assigned',
      location: '321 Elm Street, Springfield, IL',
      payment: 100.00,
      arrivalStatus: 'pending'
    },
    {
      id: '5',
      employeeId: '3',
      employeeName: 'Sarah Wilson',
      patientId: '5',
      patientName: 'Dorothy Brown',
      date: '2024-02-14',
      startTime: '12:00',
      endTime: '20:00',
      duration: 8,
      serviceType: 'Live-in Care',
      status: 'completed',
      location: '654 Cedar Lane, Springfield, IL',
      payment: 200.00,
      arrivalStatus: 'no-show',
      notes: 'Employee called in sick, replacement needed'
    }
  ]);

  // Mock available employees
  const [availableEmployees] = useState<Employee[]>([
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
    }
  ]);

  const filteredShifts = shifts.filter(shift => {
    const matchesSearch = 
      shift.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shift.employeeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shift.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shift.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || shift.status === statusFilter;
    const matchesDate = !dateFilter || shift.date === dateFilter;

    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleAssignEmployee = (shiftId: string, employeeId: string) => {
    console.log('Assigning employee', employeeId, 'to shift', shiftId);
    setShowAssignModal(false);
    setSelectedShift(null);
  };

  const handleReassignShift = (shiftId: string) => {
    const shift = shifts.find(s => s.id === shiftId);
    if (shift) {
      setSelectedShift(shift);
      setShowAssignModal(true);
    }
  };

  const handleCancelShift = (shiftId: string) => {
    console.log('Cancelling shift:', shiftId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'assigned':
        return 'bg-blue-100 text-blue-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getArrivalStatusColor = (status?: string) => {
    switch (status) {
      case 'on-time':
        return 'bg-green-100 text-green-800';
      case 'late':
        return 'bg-yellow-100 text-yellow-800';
      case 'no-show':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getArrivalIcon = (status?: string) => {
    switch (status) {
      case 'on-time':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'late':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'no-show':
        return <X className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Shift Management</h2>
          <p className="text-gray-600 mt-1">
            Assign employees to shifts, monitor compliance, and track attendance
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create New Shift
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Unassigned</p>
                <p className="text-2xl font-bold text-gray-900">
                  {shifts.filter(s => s.status === 'pending').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Assigned</p>
                <p className="text-2xl font-bold text-gray-900">
                  {shifts.filter(s => s.status === 'assigned').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">On Time</p>
                <p className="text-2xl font-bold text-gray-900">
                  {shifts.filter(s => s.arrivalStatus === 'on-time').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Late Arrivals</p>
                <p className="text-2xl font-bold text-gray-900">
                  {shifts.filter(s => s.arrivalStatus === 'late').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">No Shows</p>
                <p className="text-2xl font-bold text-gray-900">
                  {shifts.filter(s => s.arrivalStatus === 'no-show').length}
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
                  placeholder="Search by patient, employee, service, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="assigned">Assigned</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shifts Table */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Shift Schedule</h3>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Shift Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Arrival Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredShifts.map((shift) => (
                  <tr key={shift.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="font-medium">{shift.serviceType}</div>
                        <div className="flex items-center text-gray-500 mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          {shift.date}
                        </div>
                        <div className="flex items-center text-gray-500 mt-1">
                          <Clock className="h-4 w-4 mr-1" />
                          {shift.startTime} - {shift.endTime} ({shift.duration}h)
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="font-medium">{shift.patientName}</div>
                        <div className="flex items-center text-gray-500 mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="truncate max-w-32">{shift.location}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {shift.employeeName ? (
                        <div className="text-sm text-gray-900">
                          <div className="font-medium">{shift.employeeName}</div>
                          <div className="text-gray-500">ID: {shift.employeeId}</div>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500 italic">Unassigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(shift.status)}`}>
                        {shift.status.charAt(0).toUpperCase() + shift.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getArrivalIcon(shift.arrivalStatus)}
                        <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getArrivalStatusColor(shift.arrivalStatus)}`}>
                          {shift.arrivalStatus === 'on-time' ? 'On Time' :
                           shift.arrivalStatus === 'late' ? 'Late' :
                           shift.arrivalStatus === 'no-show' ? 'No Show' : 'Pending'}
                        </span>
                      </div>
                      {shift.arrivalTime && (
                        <div className="text-xs text-gray-500 mt-1">
                          Arrived: {shift.arrivalTime}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ${shift.payment.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        
                        {shift.status === 'pending' ? (
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedShift(shift);
                              setShowAssignModal(true);
                            }}
                          >
                            <Users className="h-4 w-4 mr-1" />
                            Assign
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleReassignShift(shift.id)}
                          >
                            <RotateCcw className="h-4 w-4 mr-1" />
                            Reassign
                          </Button>
                        )}

                        {shift.status !== 'completed' && shift.status !== 'cancelled' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCancelShift(shift.id)}
                            className="text-red-600 border-red-300 hover:bg-red-50"
                          >
                            <X className="h-4 w-4 mr-1" />
                            Cancel
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

      {/* Assignment Modal */}
      {showAssignModal && selectedShift && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Assign Employee to Shift
            </h3>
            
            <div className="space-y-4">
              {/* Shift Details */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Shift Details</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>Patient:</strong> {selectedShift.patientName}</p>
                    <p><strong>Service:</strong> {selectedShift.serviceType}</p>
                    <p><strong>Duration:</strong> {selectedShift.duration} hours</p>
                  </div>
                  <div>
                    <p><strong>Date:</strong> {selectedShift.date}</p>
                    <p><strong>Time:</strong> {selectedShift.startTime} - {selectedShift.endTime}</p>
                    <p><strong>Payment:</strong> ${selectedShift.payment.toFixed(2)}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Location:</strong> {selectedShift.location}
                </p>
              </div>

              {/* Available Employees */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Available Employees</h4>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {availableEmployees.map((employee) => (
                    <div key={employee.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <span className="text-sm font-medium text-blue-700">
                              {employee.firstName[0]}{employee.lastName[0]}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {employee.firstName} {employee.lastName}
                            </p>
                            <p className="text-sm text-gray-500">{employee.employeeId}</p>
                            <p className="text-sm text-gray-500">${employee.hourlyRate}/hr</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600 mb-2">
                            Skills: {employee.skills.slice(0, 2).join(', ')}
                          </div>
                          <Button
                            size="sm"
                            onClick={() => handleAssignEmployee(selectedShift.id, employee.id)}
                          >
                            Assign
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowAssignModal(false);
                  setSelectedShift(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}