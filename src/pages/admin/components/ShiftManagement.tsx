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
  Plus,
  Edit,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Shift, Employee, ShiftAssignment } from '../../../types';
import { ShiftReports } from '../../../components/shift/ShiftReports';
import { EmployeeAvailabilityView } from '../../../components/admin/EmployeeAvailabilityView';

export function ShiftManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'assigned' | 'completed' | 'cancelled'>('all');
  const [dateFilter, setDateFilter] = useState('');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [showEmployeeAvailability, setShowEmployeeAvailability] = useState(false);
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);
  const [editingShift, setEditingShift] = useState<Shift | null>(null);

  // Form data for shift creation/editing
  const [formData, setFormData] = useState({
    patientId: '',
    patientName: '',
    date: '',
    startTime: '',
    endTime: '',
    serviceType: '',
    location: '',
    payment: '',
    notes: '',
    specialInstructions: '',
    employeeId: ''
  });

  // Mock shifts data with extended properties
  const [shifts, setShifts] = useState<(Shift & {
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

  // Mock patients data for shift creation
  const [patients] = useState([
    {
      id: '1',
      patientId: 'PAT001',
      name: 'Sarah Johnson',
      address: '123 Oak Street, Springfield, IL',
      phone: '+1-555-0100'
    },
    {
      id: '2',
      patientId: 'PAT002',
      name: 'Robert Wilson',
      address: '456 Maple Avenue, Springfield, IL',
      phone: '+1-555-0102'
    },
    {
      id: '3',
      patientId: 'PAT003',
      name: 'Margaret Thompson',
      address: '789 Pine Road, Springfield, IL',
      phone: '+1-555-0104'
    },
    {
      id: '4',
      patientId: 'PAT004',
      name: 'William Davis',
      address: '321 Elm Street, Springfield, IL',
      phone: '+1-555-0106'
    },
    {
      id: '5',
      patientId: 'PAT005',
      name: 'Dorothy Brown',
      address: '654 Cedar Lane, Springfield, IL',
      phone: '+1-555-0108'
    }
  ]);

  // Service types for shift creation
  const serviceTypes = [
    'Personal Care Assistance',
    'Medical Care',
    'Companionship',
    'Transportation',
    'Live-in Care',
    'Light Housekeeping',
    'Medication Management',
    'Physical Therapy Support'
  ];

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

  const resetForm = () => {
    setFormData({
      patientId: '',
      patientName: '',
      date: '',
      startTime: '',
      endTime: '',
      serviceType: '',
      location: '',
      payment: '',
      notes: '',
      specialInstructions: '',
      employeeId: ''
    });
  };

  const calculateDuration = (startTime: string, endTime: string): number => {
    if (!startTime || !endTime) return 0;
    const start = new Date(`2000-01-01 ${startTime}`);
    const end = new Date(`2000-01-01 ${endTime}`);
    return Math.max(0, (end.getTime() - start.getTime()) / (1000 * 60 * 60));
  };

  const calculatePayment = (duration: number, serviceType: string): number => {
    const baseRates: { [key: string]: number } = {
      'Personal Care Assistance': 25.50,
      'Medical Care': 28.00,
      'Companionship': 22.00,
      'Transportation': 25.00,
      'Live-in Care': 25.00,
      'Light Housekeeping': 20.00,
      'Medication Management': 26.00,
      'Physical Therapy Support': 30.00
    };
    const rate = baseRates[serviceType] || 25.00;
    return duration * rate;
  };

  const handleCreateShift = () => {
    const duration = calculateDuration(formData.startTime, formData.endTime);
    const payment = formData.payment ? parseFloat(formData.payment) : calculatePayment(duration, formData.serviceType);
    const selectedPatient = patients.find(p => p.id === formData.patientId);
    
    const newShift = {
      id: (shifts.length + 1).toString(),
      employeeId: formData.employeeId || '',
      employeeName: formData.employeeId ? availableEmployees.find(e => e.id === formData.employeeId)?.firstName + ' ' + availableEmployees.find(e => e.id === formData.employeeId)?.lastName : undefined,
      patientId: formData.patientId,
      patientName: formData.patientName || selectedPatient?.name || '',
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      duration,
      serviceType: formData.serviceType,
      status: (formData.employeeId ? 'assigned' : 'pending') as Shift['status'],
      location: formData.location || selectedPatient?.address || '',
      payment,
      notes: formData.notes,
      specialInstructions: formData.specialInstructions,
      arrivalStatus: 'pending' as 'on-time' | 'late' | 'no-show' | 'pending'
    };

    setShifts(prev => [...prev, newShift]);
    setShowCreateModal(false);
    resetForm();
  };

  const handleEditShift = () => {
    if (!editingShift) return;
    
    const duration = calculateDuration(formData.startTime, formData.endTime);
    const payment = formData.payment ? parseFloat(formData.payment) : calculatePayment(duration, formData.serviceType);
    const selectedPatient = patients.find(p => p.id === formData.patientId);
    
    const updatedShift = {
      ...editingShift,
      employeeId: formData.employeeId || '',
      employeeName: formData.employeeId ? availableEmployees.find(e => e.id === formData.employeeId)?.firstName + ' ' + availableEmployees.find(e => e.id === formData.employeeId)?.lastName : undefined,
      patientId: formData.patientId,
      patientName: formData.patientName || selectedPatient?.name || '',
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      duration,
      serviceType: formData.serviceType,
      status: (formData.employeeId ? 'assigned' : 'pending') as Shift['status'],
      location: formData.location || selectedPatient?.address || '',
      payment,
      notes: formData.notes,
      specialInstructions: formData.specialInstructions
    };

    setShifts(prev => prev.map(shift => shift.id === editingShift.id ? updatedShift : shift));
    setShowEditModal(false);
    setEditingShift(null);
    resetForm();
  };

  const handlePatientChange = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    setFormData(prev => ({
      ...prev,
      patientId,
      patientName: patient?.name || '',
      location: patient?.address || ''
    }));
  };

  const handleServiceTypeChange = (serviceType: string) => {
    const duration = calculateDuration(formData.startTime, formData.endTime);
    const calculatedPayment = calculatePayment(duration, serviceType);
    
    setFormData(prev => ({
      ...prev,
      serviceType,
      payment: calculatedPayment > 0 ? calculatedPayment.toFixed(2) : ''
    }));
  };

  const handleTimeChange = (field: 'startTime' | 'endTime', value: string) => {
    const newFormData = { ...formData, [field]: value };
    const duration = calculateDuration(
      field === 'startTime' ? value : formData.startTime,
      field === 'endTime' ? value : formData.endTime
    );
    const calculatedPayment = calculatePayment(duration, formData.serviceType);
    
    setFormData({
      ...newFormData,
      payment: calculatedPayment > 0 ? calculatedPayment.toFixed(2) : formData.payment
    });
  };

  const openEditModal = (shift: any) => {
    setEditingShift(shift);
    setFormData({
      patientId: shift.patientId,
      patientName: shift.patientName,
      date: shift.date,
      startTime: shift.startTime,
      endTime: shift.endTime,
      serviceType: shift.serviceType,
      location: shift.location,
      payment: shift.payment.toString(),
      notes: shift.notes || '',
      specialInstructions: shift.specialInstructions || '',
      employeeId: shift.employeeId || ''
    });
    setShowEditModal(true);
  };

  const handleAssignEmployee = (shiftId: string, employeeId: string) => {
    const employee = availableEmployees.find(e => e.id === employeeId);
    setShifts(prev => prev.map(shift =>
      shift.id === shiftId
        ? {
            ...shift,
            employeeId,
            employeeName: employee ? `${employee.firstName} ${employee.lastName}` : '',
            status: 'assigned' as Shift['status'],
            arrivalStatus: 'pending' as 'on-time' | 'late' | 'no-show' | 'pending'
          }
        : shift
    ));
    setShowAssignModal(false);
    setShowEmployeeAvailability(false);
    setSelectedShift(null);
    
    // Send notification to employee (in real app, this would be an API call)
    console.log(`Notification sent to ${employee?.firstName} ${employee?.lastName} for shift assignment`);
  };

  const handleEmployeeSelect = (employee: any) => {
    if (selectedShift) {
      handleAssignEmployee(selectedShift.id, employee.id);
    }
  };

  const handleReassignShift = (shiftId: string) => {
    const shift = shifts.find(s => s.id === shiftId);
    if (shift) {
      setSelectedShift(shift);
      setShowEmployeeAvailability(true);
    }
  };

  const handleCancelShift = (shiftId: string) => {
    setShifts(prev => prev.map(shift =>
      shift.id === shiftId ? { ...shift, status: 'cancelled' as Shift['status'] } : shift
    ));
  };

  const handleDeleteShift = (shiftId: string) => {
    if (window.confirm('Are you sure you want to delete this shift? This action cannot be undone.')) {
      setShifts(prev => prev.filter(shift => shift.id !== shiftId));
    }
  };

  const handleCompleteShift = (shiftId: string) => {
    setShifts(prev => prev.map(shift =>
      shift.id === shiftId
        ? {
            ...shift,
            status: 'completed' as Shift['status'],
            arrivalStatus: shift.arrivalStatus === 'pending' ? 'on-time' : shift.arrivalStatus
          }
        : shift
    ));
  };

  const handleMarkInProgress = (shiftId: string) => {
    setShifts(prev => prev.map(shift =>
      shift.id === shiftId
        ? {
            ...shift,
            status: 'in-progress' as Shift['status']
          }
        : shift
    ));
  };

  const checkEmployeeAvailability = (employeeId: string, date: string, startTime: string, endTime: string): boolean => {
    // Check if employee has conflicting shifts
    const conflictingShifts = shifts.filter(shift =>
      shift.employeeId === employeeId &&
      shift.date === date &&
      shift.status !== 'cancelled' &&
      shift.id !== selectedShift?.id && // Exclude current shift when editing
      (
        (startTime >= shift.startTime && startTime < shift.endTime) ||
        (endTime > shift.startTime && endTime <= shift.endTime) ||
        (startTime <= shift.startTime && endTime >= shift.endTime)
      )
    );
    
    return conflictingShifts.length === 0;
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
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={() => setShowEmployeeAvailability(!showEmployeeAvailability)}
          >
            <Users className="h-4 w-4 mr-2" />
            {showEmployeeAvailability ? 'Hide Employee View' : 'Employee Availability'}
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowReports(!showReports)}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            {showReports ? 'Hide Reports' : 'View Reports'}
          </Button>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create New Shift
          </Button>
        </div>
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
                        ₹{shift.payment.toLocaleString()}
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
                              setShowEmployeeAvailability(true);
                            }}
                          >
                            <Users className="h-4 w-4 mr-1" />
                            Assign
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedShift(shift);
                              setShowEmployeeAvailability(true);
                            }}
                          >
                            <RotateCcw className="h-4 w-4 mr-1" />
                            Reassign
                          </Button>
                        )}

                        {shift.status === 'assigned' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleMarkInProgress(shift.id)}
                            className="text-green-600 border-green-300 hover:bg-green-50"
                          >
                            <Clock className="h-4 w-4 mr-1" />
                            Start
                          </Button>
                        )}

                        {shift.status === 'in-progress' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCompleteShift(shift.id)}
                            className="text-green-600 border-green-300 hover:bg-green-50"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Complete
                          </Button>
                        )}

                        {shift.status !== 'completed' && shift.status !== 'cancelled' && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openEditModal(shift)}
                              className="text-blue-600 border-blue-300 hover:bg-blue-50"
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleCancelShift(shift.id)}
                              className="text-red-600 border-red-300 hover:bg-red-50"
                            >
                              <X className="h-4 w-4 mr-1" />
                              Cancel
                            </Button>
                            
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteShift(shift.id)}
                              className="text-red-600 border-red-300 hover:bg-red-50"
                            >
                              <X className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </>
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
                    <p><strong>Payment:</strong> ₹{selectedShift.payment.toLocaleString()}</p>
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
                            <p className="text-sm text-gray-500">₹{employee.hourlyRate.toLocaleString()}/hr</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600 mb-2">
                            Skills: {employee.skills.slice(0, 2).join(', ')}
                          </div>
                          {selectedShift && !checkEmployeeAvailability(
                            employee.id,
                            selectedShift.date,
                            selectedShift.startTime,
                            selectedShift.endTime
                          ) ? (
                            <div className="text-xs text-red-600 mb-2">
                              ⚠️ Scheduling conflict detected
                            </div>
                          ) : (
                            <div className="text-xs text-green-600 mb-2">
                              ✅ Available
                            </div>
                          )}
                          <Button
                            size="sm"
                            onClick={() => handleAssignEmployee(selectedShift.id, employee.id)}
                            disabled={selectedShift && !checkEmployeeAvailability(
                              employee.id,
                              selectedShift.date,
                              selectedShift.startTime,
                              selectedShift.endTime
                            )}
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

      {/* Create Shift Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Create New Shift</h3>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Patient Information */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Patient Information</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Patient
                    </label>
                    <select
                      value={formData.patientId}
                      onChange={(e) => handlePatientChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select a patient...</option>
                      {patients.map((patient) => (
                        <option key={patient.id} value={patient.id}>
                          {patient.name} ({patient.patientId})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Patient Name
                    </label>
                    <Input
                      value={formData.patientName}
                      onChange={(e) => setFormData(prev => ({ ...prev, patientName: e.target.value }))}
                      placeholder="Enter patient name if not in list"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <Input
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Patient address"
                      required
                    />
                  </div>
                </div>

                {/* Shift Details */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Shift Details</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service Type
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => handleServiceTypeChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select service type...</option>
                      {serviceTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Time
                      </label>
                      <input
                        type="time"
                        value={formData.startTime}
                        onChange={(e) => handleTimeChange('startTime', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Time
                      </label>
                      <input
                        type="time"
                        value={formData.endTime}
                        onChange={(e) => handleTimeChange('endTime', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Amount (₹)
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.payment}
                      onChange={(e) => setFormData(prev => ({ ...prev, payment: e.target.value }))}
                      placeholder="Auto-calculated or manual entry"
                    />
                  </div>
                </div>
              </div>

              {/* Assignment and Notes */}
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assign Employee (Optional)
                  </label>
                  <select
                    value={formData.employeeId}
                    onChange={(e) => setFormData(prev => ({ ...prev, employeeId: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Leave unassigned</option>
                    {availableEmployees.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.firstName} {employee.lastName} - ₹{employee.hourlyRate.toLocaleString()}/hr
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Any additional notes..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Instructions
                  </label>
                  <textarea
                    value={formData.specialInstructions}
                    onChange={(e) => setFormData(prev => ({ ...prev, specialInstructions: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Special care instructions..."
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateShift}>
                  Create Shift
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Shift Modal */}
      {showEditModal && editingShift && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Edit Shift</h3>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingShift(null);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Patient Information */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Patient Information</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Patient
                    </label>
                    <select
                      value={formData.patientId}
                      onChange={(e) => handlePatientChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select a patient...</option>
                      {patients.map((patient) => (
                        <option key={patient.id} value={patient.id}>
                          {patient.name} ({patient.patientId})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Patient Name
                    </label>
                    <Input
                      value={formData.patientName}
                      onChange={(e) => setFormData(prev => ({ ...prev, patientName: e.target.value }))}
                      placeholder="Enter patient name if not in list"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <Input
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Patient address"
                      required
                    />
                  </div>
                </div>

                {/* Shift Details */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Shift Details</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service Type
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => handleServiceTypeChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select service type...</option>
                      {serviceTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Time
                      </label>
                      <input
                        type="time"
                        value={formData.startTime}
                        onChange={(e) => handleTimeChange('startTime', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Time
                      </label>
                      <input
                        type="time"
                        value={formData.endTime}
                        onChange={(e) => handleTimeChange('endTime', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Amount (₹)
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.payment}
                      onChange={(e) => setFormData(prev => ({ ...prev, payment: e.target.value }))}
                      placeholder="Auto-calculated or manual entry"
                    />
                  </div>
                </div>
              </div>

              {/* Assignment and Notes */}
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assign Employee (Optional)
                  </label>
                  <select
                    value={formData.employeeId}
                    onChange={(e) => setFormData(prev => ({ ...prev, employeeId: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Leave unassigned</option>
                    {availableEmployees.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.firstName} {employee.lastName} - ₹{employee.hourlyRate.toLocaleString()}/hr
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Any additional notes..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Instructions
                  </label>
                  <textarea
                    value={formData.specialInstructions}
                    onChange={(e) => setFormData(prev => ({ ...prev, specialInstructions: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Special care instructions..."
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingShift(null);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleEditShift}>
                  Update Shift
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Employee Availability View */}
      {showEmployeeAvailability && (
        <div className="mt-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Employee Availability by Location</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowEmployeeAvailability(false);
                    setSelectedShift(null);
                  }}
                >
                  <X className="h-4 w-4 mr-2" />
                  Close
                </Button>
              </div>
              {selectedShift && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">Selected Shift for Assignment</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-blue-700 font-medium">Patient:</span>
                      <p className="text-blue-800">{selectedShift.patientName}</p>
                    </div>
                    <div>
                      <span className="text-blue-700 font-medium">Service:</span>
                      <p className="text-blue-800">{selectedShift.serviceType}</p>
                    </div>
                    <div>
                      <span className="text-blue-700 font-medium">Date & Time:</span>
                      <p className="text-blue-800">{selectedShift.date} {selectedShift.startTime}-{selectedShift.endTime}</p>
                    </div>
                    <div>
                      <span className="text-blue-700 font-medium">Location:</span>
                      <p className="text-blue-800">{selectedShift.location}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <EmployeeAvailabilityView
                selectedDate={selectedShift?.date || new Date().toISOString().split('T')[0]}
                selectedShift={selectedShift ? {
                  date: selectedShift.date,
                  startTime: selectedShift.startTime,
                  endTime: selectedShift.endTime,
                  location: selectedShift.location,
                  serviceType: selectedShift.serviceType
                } : undefined}
                onEmployeeSelect={handleEmployeeSelect}
              />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Reports Section */}
      {showReports && (
        <div className="mt-8">
          <ShiftReports />
        </div>
      )}
    </div>
  );
}