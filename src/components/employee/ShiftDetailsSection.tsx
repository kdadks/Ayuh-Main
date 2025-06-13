import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Filter,
  Search,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface ShiftDetails {
  id: string;
  patientName: string;
  patientAddress: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  serviceType: string;
  status: 'pending' | 'accepted' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  payment: number;
  notes?: string;
  specialInstructions?: string;
}

export function ShiftDetailsSection() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedShift, setSelectedShift] = useState<ShiftDetails | null>(null);

  // Mock data - in real app, this would come from API
  const [shifts, setShifts] = useState<ShiftDetails[]>([
    {
      id: '1',
      patientName: 'Priya Sharma',
      patientAddress: '123 MG Road, Bangalore, Karnataka',
      date: '2024-06-13',
      startTime: '09:00',
      endTime: '13:00',
      duration: 4,
      serviceType: 'Personal Care',
      status: 'confirmed',
      payment: 1800,
      notes: 'Patient prefers morning medication at 10:30 AM',
      specialInstructions: 'Please use wheelchair for mobility assistance'
    },
    {
      id: '2',
      patientName: 'Rajesh Kumar',
      patientAddress: '456 Park Street, Mumbai, Maharashtra',
      date: '2024-06-14',
      startTime: '14:00',
      endTime: '18:00',
      duration: 4,
      serviceType: 'Companionship',
      status: 'pending',
      payment: 2400,
      notes: 'New patient - first visit',
      specialInstructions: 'Patient has mild dementia, speak slowly and clearly'
    },
    {
      id: '3',
      patientName: 'Sunita Patel',
      patientAddress: '789 Ring Road, Delhi',
      date: '2024-06-15',
      startTime: '10:00',
      endTime: '14:00',
      duration: 4,
      serviceType: 'Medical Care',
      status: 'accepted',
      payment: 2000,
      notes: 'Blood pressure monitoring required',
      specialInstructions: 'Patient is diabetic - monitor blood sugar levels'
    },
    {
      id: '4',
      patientName: 'Amit Singh',
      patientAddress: '321 Sector 14, Gurgaon, Haryana',
      date: '2024-06-16',
      startTime: '08:00',
      endTime: '12:00',
      duration: 4,
      serviceType: 'Personal Care',
      status: 'pending',
      payment: 1900,
      notes: 'Regular weekly appointment',
      specialInstructions: 'Assistance with bathing and dressing'
    },
    {
      id: '5',
      patientName: 'Meera Gupta',
      patientAddress: '654 Anna Nagar, Chennai, Tamil Nadu',
      date: '2024-06-12',
      startTime: '15:00',
      endTime: '19:00',
      duration: 4,
      serviceType: 'Companionship',
      status: 'completed',
      payment: 2200,
      notes: 'Completed successfully',
      specialInstructions: 'Enjoys reading and light conversation'
    }
  ]);

  const filterOptions = [
    { value: 'all', label: 'All Shifts', count: shifts.length },
    { value: 'pending', label: 'Pending', count: shifts.filter(s => s.status === 'pending').length },
    { value: 'accepted', label: 'Accepted', count: shifts.filter(s => s.status === 'accepted').length },
    { value: 'confirmed', label: 'Confirmed', count: shifts.filter(s => s.status === 'confirmed').length },
    { value: 'completed', label: 'Completed', count: shifts.filter(s => s.status === 'completed').length }
  ];

  const filteredShifts = shifts.filter(shift => {
    const matchesFilter = selectedFilter === 'all' || shift.status === selectedFilter;
    const matchesSearch = shift.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shift.serviceType.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAcceptShift = (shiftId: string) => {
    setShifts(prev => prev.map(shift => 
      shift.id === shiftId ? { ...shift, status: 'accepted' as const } : shift
    ));
  };

  const handleDeclineShift = (shiftId: string) => {
    setShifts(prev => prev.map(shift => 
      shift.id === shiftId ? { ...shift, status: 'cancelled' as const } : shift
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-blue-100 text-blue-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      case 'pending': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Shift Management
          </h2>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {filterOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => setSelectedFilter(option.value)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 ${
                    selectedFilter === option.value
                      ? 'bg-primary-100 text-primary-700 border border-primary-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span>{option.label}</span>
                  <span className="bg-white px-2 py-0.5 rounded-full text-xs">
                    {option.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search shifts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full lg:w-64"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shifts List */}
      <div className="space-y-4">
        {filteredShifts.map(shift => (
          <Card key={shift.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        {shift.patientName}
                      </h3>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {shift.patientAddress}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(shift.status)}`}>
                        {getStatusIcon(shift.status)}
                        <span className="capitalize">{shift.status}</span>
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{new Date(shift.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>{shift.startTime} - {shift.endTime} ({shift.duration}h)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">₹{shift.payment}</span>
                      <span className="text-gray-500">• {shift.serviceType}</span>
                    </div>
                  </div>

                  {shift.notes && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <strong>Notes:</strong> {shift.notes}
                      </p>
                    </div>
                  )}
                </div>

                <div className="ml-6 flex flex-col space-y-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedShift(shift)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  
                  {shift.status === 'pending' && (
                    <div className="flex flex-col space-y-2">
                      <Button
                        size="sm"
                        onClick={() => handleAcceptShift(shift.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeclineShift(shift.id)}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Decline
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredShifts.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No shifts found matching your criteria</p>
          </CardContent>
        </Card>
      )}

      {/* Shift Details Modal */}
      {selectedShift && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Shift Details</h3>
                <button
                  onClick={() => setSelectedShift(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Patient Information</h4>
                  <p className="text-lg font-semibold">{selectedShift.patientName}</p>
                  <p className="text-gray-600 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {selectedShift.patientAddress}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Date & Time</h4>
                    <p className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{new Date(selectedShift.date).toLocaleDateString()}</span>
                    </p>
                    <p className="flex items-center space-x-2 mt-1">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>{selectedShift.startTime} - {selectedShift.endTime}</span>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Service Details</h4>
                    <p className="text-gray-700">{selectedShift.serviceType}</p>
                    <p className="text-lg font-semibold text-green-600 mt-1">₹{selectedShift.payment}</p>
                  </div>
                </div>

                {selectedShift.specialInstructions && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Special Instructions</h4>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-gray-700">{selectedShift.specialInstructions}</p>
                    </div>
                  </div>
                )}

                {selectedShift.notes && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-gray-700">{selectedShift.notes}</p>
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <Button variant="outline" onClick={() => setSelectedShift(null)}>
                    Close
                  </Button>
                  {selectedShift.status === 'pending' && (
                    <>
                      <Button
                        onClick={() => {
                          handleAcceptShift(selectedShift.id);
                          setSelectedShift(null);
                        }}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Accept Shift
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}