import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Clock,
  Users,
  Search,
  Filter,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Star,
  Phone,
  Mail,
  MapIcon,
  User
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Employee, WeeklyAvailability } from '../../types';

interface EmployeeWithLocation extends Employee {
  currentLocation?: {
    area: string;
    city: string;
    distance?: number; // Distance from shift location in km
  };
  currentStatus: 'available' | 'busy' | 'off-duty';
  todayAvailability: {
    available: boolean;
    timeSlots: { start: string; end: string; }[];
    conflictingShifts: number;
  };
  weeklyHours: number;
  rating: number;
  completedShifts: number;
}

interface LocationGroup {
  area: string;
  city: string;
  employees: EmployeeWithLocation[];
}

interface Props {
  selectedDate: string;
  selectedShift?: {
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    serviceType: string;
  };
  onEmployeeSelect?: (employee: EmployeeWithLocation) => void;
}

export function EmployeeAvailabilityView({ selectedDate, selectedShift, onEmployeeSelect }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'busy' | 'off-duty'>('all');
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'experience'>('distance');

  // Mock enhanced employee data with location and availability
  const [employees] = useState<EmployeeWithLocation[]>([
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
      availability: {
        monday: { day: 'Monday', available: true, timeSlots: [{ start: '08:00', end: '16:00' }] },
        tuesday: { day: 'Tuesday', available: true, timeSlots: [{ start: '08:00', end: '16:00' }] },
        wednesday: { day: 'Wednesday', available: true, timeSlots: [{ start: '08:00', end: '16:00' }] },
        thursday: { day: 'Thursday', available: true, timeSlots: [{ start: '08:00', end: '16:00' }] },
        friday: { day: 'Friday', available: true, timeSlots: [{ start: '08:00', end: '16:00' }] },
        saturday: { day: 'Saturday', available: false, timeSlots: [] },
        sunday: { day: 'Sunday', available: false, timeSlots: [] }
      },
      skills: ['Personal Care', 'Medication Management', 'Companionship'],
      certifications: ['CNA', 'CPR/First Aid', 'Alzheimer\'s Care'],
      currentLocation: {
        area: 'Downtown',
        city: 'Springfield, IL',
        distance: 2.5
      },
      currentStatus: 'available',
      todayAvailability: {
        available: true,
        timeSlots: [{ start: '08:00', end: '16:00' }],
        conflictingShifts: 0
      },
      weeklyHours: 40,
      rating: 4.8,
      completedShifts: 127
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
      availability: {
        monday: { day: 'Monday', available: true, timeSlots: [{ start: '09:00', end: '17:00' }] },
        tuesday: { day: 'Tuesday', available: true, timeSlots: [{ start: '09:00', end: '17:00' }] },
        wednesday: { day: 'Wednesday', available: true, timeSlots: [{ start: '09:00', end: '17:00' }] },
        thursday: { day: 'Thursday', available: true, timeSlots: [{ start: '09:00', end: '17:00' }] },
        friday: { day: 'Friday', available: true, timeSlots: [{ start: '09:00', end: '17:00' }] },
        saturday: { day: 'Saturday', available: true, timeSlots: [{ start: '10:00', end: '14:00' }] },
        sunday: { day: 'Sunday', available: false, timeSlots: [] }
      },
      skills: ['Medical Care', 'Transportation', 'Light Housekeeping'],
      certifications: ['RN License', 'Home Health Aide', 'Medication Administration'],
      currentLocation: {
        area: 'North Side',
        city: 'Springfield, IL',
        distance: 4.2
      },
      currentStatus: 'available',
      todayAvailability: {
        available: true,
        timeSlots: [{ start: '09:00', end: '17:00' }],
        conflictingShifts: 0
      },
      weeklyHours: 48,
      rating: 4.6,
      completedShifts: 89
    },
    {
      id: '3',
      employeeId: '2024025AYUH00003',
      email: 'sarah.wilson@ayuhclinic.com',
      firstName: 'Sarah',
      lastName: 'Wilson',
      role: 'employee',
      isActive: true,
      createdAt: '2024-01-15T09:00:00Z',
      phone: '+1-555-0204',
      address: '789 Wellness Blvd, Springfield, IL',
      dateOfBirth: '1990-11-08',
      emergencyContact: {
        name: 'John Wilson',
        relationship: 'Brother',
        phone: '+1-555-0205'
      },
      hourlyRate: 24.00,
      availability: {
        monday: { day: 'Monday', available: true, timeSlots: [{ start: '10:00', end: '18:00' }] },
        tuesday: { day: 'Tuesday', available: true, timeSlots: [{ start: '10:00', end: '18:00' }] },
        wednesday: { day: 'Wednesday', available: false, timeSlots: [] },
        thursday: { day: 'Thursday', available: true, timeSlots: [{ start: '10:00', end: '18:00' }] },
        friday: { day: 'Friday', available: true, timeSlots: [{ start: '10:00', end: '18:00' }] },
        saturday: { day: 'Saturday', available: true, timeSlots: [{ start: '08:00', end: '16:00' }] },
        sunday: { day: 'Sunday', available: true, timeSlots: [{ start: '12:00', end: '20:00' }] }
      },
      skills: ['Companionship', 'Light Housekeeping', 'Meal Preparation'],
      certifications: ['Home Health Aide', 'CPR/First Aid'],
      currentLocation: {
        area: 'West End',
        city: 'Springfield, IL',
        distance: 6.8
      },
      currentStatus: 'busy',
      todayAvailability: {
        available: false,
        timeSlots: [],
        conflictingShifts: 1
      },
      weeklyHours: 32,
      rating: 4.9,
      completedShifts: 156
    },
    {
      id: '4',
      employeeId: '2024030AYUH00004',
      email: 'michael.brown@ayuhclinic.com',
      firstName: 'Michael',
      lastName: 'Brown',
      role: 'employee',
      isActive: true,
      createdAt: '2024-02-10T11:30:00Z',
      phone: '+1-555-0206',
      address: '321 Elder Ave, Springfield, IL',
      dateOfBirth: '1982-04-15',
      emergencyContact: {
        name: 'Jessica Brown',
        relationship: 'Wife',
        phone: '+1-555-0207'
      },
      hourlyRate: 30.00,
      availability: {
        monday: { day: 'Monday', available: true, timeSlots: [{ start: '07:00', end: '19:00' }] },
        tuesday: { day: 'Tuesday', available: true, timeSlots: [{ start: '07:00', end: '19:00' }] },
        wednesday: { day: 'Wednesday', available: true, timeSlots: [{ start: '07:00', end: '19:00' }] },
        thursday: { day: 'Thursday', available: true, timeSlots: [{ start: '07:00', end: '19:00' }] },
        friday: { day: 'Friday', available: true, timeSlots: [{ start: '07:00', end: '19:00' }] },
        saturday: { day: 'Saturday', available: true, timeSlots: [{ start: '09:00', end: '17:00' }] },
        sunday: { day: 'Sunday', available: true, timeSlots: [{ start: '09:00', end: '17:00' }] }
      },
      skills: ['Medical Care', 'Physical Therapy Support', 'Emergency Response'],
      certifications: ['RN License', 'BLS Certification', 'Physical Therapy Assistant'],
      currentLocation: {
        area: 'East Side',
        city: 'Springfield, IL',
        distance: 8.1
      },
      currentStatus: 'available',
      todayAvailability: {
        available: true,
        timeSlots: [{ start: '07:00', end: '19:00' }],
        conflictingShifts: 0
      },
      weeklyHours: 56,
      rating: 4.7,
      completedShifts: 203
    },
    {
      id: '5',
      employeeId: '2024035AYUH00005',
      email: 'emily.davis@ayuhclinic.com',
      firstName: 'Emily',
      lastName: 'Davis',
      role: 'employee',
      isActive: true,
      createdAt: '2024-01-08T14:00:00Z',
      phone: '+1-555-0208',
      address: '654 Care Circle, Springfield, IL',
      dateOfBirth: '1987-09-22',
      emergencyContact: {
        name: 'Robert Davis',
        relationship: 'Father',
        phone: '+1-555-0209'
      },
      hourlyRate: 26.50,
      availability: {
        monday: { day: 'Monday', available: false, timeSlots: [] },
        tuesday: { day: 'Tuesday', available: true, timeSlots: [{ start: '14:00', end: '22:00' }] },
        wednesday: { day: 'Wednesday', available: true, timeSlots: [{ start: '14:00', end: '22:00' }] },
        thursday: { day: 'Thursday', available: true, timeSlots: [{ start: '14:00', end: '22:00' }] },
        friday: { day: 'Friday', available: true, timeSlots: [{ start: '14:00', end: '22:00' }] },
        saturday: { day: 'Saturday', available: true, timeSlots: [{ start: '08:00', end: '20:00' }] },
        sunday: { day: 'Sunday', available: true, timeSlots: [{ start: '08:00', end: '20:00' }] }
      },
      skills: ['Live-in Care', 'Alzheimer\'s Care', 'Medication Management'],
      certifications: ['CNA', 'Alzheimer\'s Specialist', 'CPR/First Aid'],
      currentLocation: {
        area: 'Downtown',
        city: 'Springfield, IL',
        distance: 1.8
      },
      currentStatus: 'off-duty',
      todayAvailability: {
        available: false,
        timeSlots: [],
        conflictingShifts: 0
      },
      weeklyHours: 40,
      rating: 4.9,
      completedShifts: 178
    }
  ]);

  // Filter and sort employees
  const filteredEmployees = useMemo(() => {
    let filtered = employees.filter(employee => {
      const matchesSearch = 
        employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSkill = !skillFilter || employee.skills.some(skill => 
        skill.toLowerCase().includes(skillFilter.toLowerCase())
      );
      
      const matchesLocation = !locationFilter || 
        employee.currentLocation?.area.toLowerCase().includes(locationFilter.toLowerCase()) ||
        employee.currentLocation?.city.toLowerCase().includes(locationFilter.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || employee.currentStatus === statusFilter;
      
      return matchesSearch && matchesSkill && matchesLocation && matchesStatus;
    });

    // Sort employees
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return (a.currentLocation?.distance || 999) - (b.currentLocation?.distance || 999);
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return b.completedShifts - a.completedShifts;
        default:
          return 0;
      }
    });

    return filtered;
  }, [employees, searchTerm, skillFilter, locationFilter, statusFilter, sortBy]);

  // Group employees by location
  const employeesByLocation = useMemo(() => {
    const groups: { [key: string]: LocationGroup } = {};
    
    filteredEmployees.forEach(employee => {
      if (employee.currentLocation) {
        const key = `${employee.currentLocation.area}-${employee.currentLocation.city}`;
        if (!groups[key]) {
          groups[key] = {
            area: employee.currentLocation.area,
            city: employee.currentLocation.city,
            employees: []
          };
        }
        groups[key].employees.push(employee);
      }
    });
    
    return Object.values(groups);
  }, [filteredEmployees]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'busy':
        return 'bg-yellow-100 text-yellow-800';
      case 'off-duty':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="h-4 w-4" />;
      case 'busy':
        return <AlertTriangle className="h-4 w-4" />;
      case 'off-duty':
        return <Clock className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const checkShiftCompatibility = (employee: EmployeeWithLocation) => {
    if (!selectedShift) return null;
    
    const hasRequiredSkills = selectedShift.serviceType && 
      employee.skills.some(skill => skill.toLowerCase().includes(selectedShift.serviceType.toLowerCase()));
    
    const isAvailableTime = employee.todayAvailability.available &&
      employee.todayAvailability.timeSlots.some(slot => 
        slot.start <= selectedShift.startTime && slot.end >= selectedShift.endTime
      );
    
    return {
      compatible: hasRequiredSkills && isAvailableTime && employee.currentStatus === 'available',
      hasSkills: hasRequiredSkills,
      hasAvailability: isAvailableTime,
      isAvailable: employee.currentStatus === 'available'
    };
  };

  return (
    <div className="space-y-6">
      {/* Header with Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <div className="text-2xl font-bold text-gray-900">{employees.length}</div>
                <div className="text-sm text-gray-600">Total Employees</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <div className="text-2xl font-bold text-gray-900">
                  {employees.filter(e => e.currentStatus === 'available').length}
                </div>
                <div className="text-sm text-gray-600">Available Now</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-purple-600" />
              <div className="ml-3">
                <div className="text-2xl font-bold text-gray-900">{employeesByLocation.length}</div>
                <div className="text-sm text-gray-600">Locations</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-orange-600" />
              <div className="ml-3">
                <div className="text-2xl font-bold text-gray-900">
                  {employees.filter(e => e.todayAvailability.available).length}
                </div>
                <div className="text-sm text-gray-600">Available Today</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Input
              placeholder="Filter by skill..."
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
            />
            
            <Input
              placeholder="Filter by location..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            />
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="busy">Busy</option>
              <option value="off-duty">Off Duty</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="distance">Sort by Distance</option>
              <option value="rating">Sort by Rating</option>
              <option value="experience">Sort by Experience</option>
            </select>
            
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSkillFilter('');
                setLocationFilter('');
                setStatusFilter('all');
                setSortBy('distance');
              }}
            >
              <Filter className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Employee List by Location */}
      <div className="space-y-6">
        {employeesByLocation.map((locationGroup) => (
          <Card key={`${locationGroup.area}-${locationGroup.city}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  {locationGroup.area}, {locationGroup.city}
                </h3>
                <span className="text-sm text-gray-600">
                  {locationGroup.employees.length} employee{locationGroup.employees.length !== 1 ? 's' : ''}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {locationGroup.employees.map((employee) => {
                  const compatibility = checkShiftCompatibility(employee);
                  
                  return (
                    <div
                      key={employee.id}
                      className={`p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer ${
                        compatibility?.compatible 
                          ? 'border-green-200 bg-green-50' 
                          : employee.currentStatus === 'available' 
                            ? 'border-blue-200 bg-blue-50' 
                            : 'border-gray-200 bg-gray-50'
                      }`}
                      onClick={() => onEmployeeSelect?.(employee)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">
                              {employee.firstName} {employee.lastName}
                            </h4>
                            <p className="text-sm text-gray-600">{employee.employeeId}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(employee.currentStatus)}`}>
                                {getStatusIcon(employee.currentStatus)}
                                <span className="ml-1 capitalize">{employee.currentStatus}</span>
                              </span>
                              {employee.currentLocation?.distance && (
                                <span className="text-xs text-gray-500">
                                  {employee.currentLocation.distance} km away
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium text-gray-900 ml-1">
                              {employee.rating}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600">{employee.completedShifts} shifts</p>
                        </div>
                      </div>
                      
                      {/* Skills */}
                      <div className="mt-3">
                        <div className="flex flex-wrap gap-1">
                          {employee.skills.slice(0, 3).map((skill) => (
                            <span
                              key={skill}
                              className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                          {employee.skills.length > 3 && (
                            <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                              +{employee.skills.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Today's Availability */}
                      <div className="mt-3 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Today:</span>
                          {employee.todayAvailability.available ? (
                            <span className="text-green-600 font-medium">
                              {employee.todayAvailability.timeSlots.map(slot => 
                                `${slot.start}-${slot.end}`
                              ).join(', ')}
                            </span>
                          ) : (
                            <span className="text-gray-500">Not available</span>
                          )}
                        </div>
                        {(employee.todayAvailability.conflictingShifts || 0) > 0 && (
                          <p className="text-xs text-yellow-600 mt-1">
                            {employee.todayAvailability.conflictingShifts} conflicting shift(s)
                          </p>
                        )}
                      </div>

                      {/* Shift Compatibility */}
                      {compatibility && selectedShift && (
                        <div className="mt-3 p-2 bg-white rounded border">
                          <div className="text-xs font-medium text-gray-700 mb-1">Shift Compatibility:</div>
                          <div className="flex items-center space-x-3 text-xs">
                            <span className={`flex items-center ${compatibility.hasSkills ? 'text-green-600' : 'text-red-600'}`}>
                              {compatibility.hasSkills ? '✓' : '✗'} Skills
                            </span>
                            <span className={`flex items-center ${compatibility.hasAvailability ? 'text-green-600' : 'text-red-600'}`}>
                              {compatibility.hasAvailability ? '✓' : '✗'} Time
                            </span>
                            <span className={`flex items-center ${compatibility.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                              {compatibility.isAvailable ? '✓' : '✗'} Status
                            </span>
                          </div>
                        </div>
                      )}
                      
                      {/* Contact Info */}
                      <div className="mt-3 flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          {employee.phone}
                        </span>
                        <span className="flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          {employee.email}
                        </span>
                      </div>
                      
                      {/* Action Button */}
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <Button
                          size="sm"
                          className="w-full"
                          disabled={!compatibility?.compatible && !!selectedShift}
                          onClick={(e) => {
                            e.stopPropagation();
                            onEmployeeSelect?.(employee);
                          }}
                        >
                          {selectedShift ? 'Assign to Shift' : 'View Details'}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or filters to find available employees.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}