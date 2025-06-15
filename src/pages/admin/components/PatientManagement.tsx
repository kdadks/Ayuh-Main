import React, { useState } from 'react';
import { 
  Heart, 
  Users, 
  UserCheck, 
  UserX, 
  FileText, 
  DollarSign, 
  Search,
  Plus,
  Edit,
  Eye,
  CreditCard,
  Clock,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { PatientExtended, CarePlan, Invoice } from '../../../types';
import { mockServices } from '../../../utils/data';

export function PatientManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [showCarePlanModal, setShowCarePlanModal] = useState(false);
  const [showBillingModal, setShowBillingModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<PatientExtended | null>(null);

  // Mock care plans
  const [carePlans] = useState<CarePlan[]>([
    {
      id: '1',
      name: 'Basic Care Package',
      description: 'Essential daily care services including personal hygiene, medication management, and light housekeeping',
      services: [
        {
          serviceId: '1',
          serviceName: 'Personal Care Assistance',
          serviceType: 'homecare',
          category: 'Personal Care',
          price: 45,
          duration: 120,
          frequency: 'daily',
          isIncluded: true
        },
        {
          serviceId: '2',
          serviceName: 'Medication Management',
          serviceType: 'homecare',
          category: 'Medical',
          price: 35,
          duration: 60,
          frequency: 'daily',
          isIncluded: true
        },
        {
          serviceId: '4',
          serviceName: 'Light Housekeeping',
          serviceType: 'homecare',
          category: 'Domestic',
          price: 40,
          duration: 120,
          frequency: 'daily',
          isIncluded: true
        }
      ],
      duration: '4 hours daily',
      frequency: 'Monday to Friday',
      totalCost: 720.00,
      isCustom: false,
      createdAt: '2024-01-01T00:00:00Z',
      createdBy: 'admin',
      status: 'active'
    },
    {
      id: '2',
      name: 'Comprehensive Care Package',
      description: 'Full-service care including medical monitoring, transportation, and companionship',
      services: [
        {
          serviceId: '1',
          serviceName: 'Personal Care Assistance',
          serviceType: 'homecare',
          category: 'Personal Care',
          price: 45,
          duration: 120,
          frequency: 'daily',
          isIncluded: true
        },
        {
          serviceId: '2',
          serviceName: 'Medication Management',
          serviceType: 'homecare',
          category: 'Medical',
          price: 35,
          duration: 60,
          frequency: 'daily',
          isIncluded: true
        },
        {
          serviceId: '5',
          serviceName: 'Transportation Services',
          serviceType: 'homecare',
          category: 'Transportation',
          price: 25,
          duration: 90,
          frequency: 'weekly',
          isIncluded: true
        },
        {
          serviceId: '3',
          serviceName: 'Companionship Services',
          serviceType: 'homecare',
          category: 'Companionship',
          price: 30,
          duration: 180,
          frequency: 'daily',
          isIncluded: true
        }
      ],
      duration: '8 hours daily',
      frequency: 'Daily',
      totalCost: 1280.00,
      isCustom: false,
      createdAt: '2024-01-01T00:00:00Z',
      createdBy: 'admin',
      status: 'active'
    },
    {
      id: '3',
      name: '24/7 Live-in Care',
      description: 'Round-the-clock professional care and supervision',
      services: [
        {
          serviceId: '6',
          serviceName: '24/7 Live-in Care',
          serviceType: 'homecare',
          category: 'Specialized',
          price: 200,
          duration: 1440,
          frequency: 'daily',
          isIncluded: true
        },
        {
          serviceId: '1',
          serviceName: 'Personal Care Assistance',
          serviceType: 'homecare',
          category: 'Personal Care',
          price: 45,
          duration: 120,
          frequency: 'daily',
          isIncluded: true
        },
        {
          serviceId: '3',
          serviceName: 'Companionship Services',
          serviceType: 'homecare',
          category: 'Companionship',
          price: 30,
          duration: 180,
          frequency: 'daily',
          isIncluded: true
        }
      ],
      duration: '24 hours',
      frequency: 'Daily',
      totalCost: 8250.00,
      isCustom: false,
      createdAt: '2024-01-01T00:00:00Z',
      createdBy: 'admin',
      status: 'active'
    }
  ]);

  // Mock patients data with extended information
  const [patients] = useState<PatientExtended[]>([
    {
      id: '1',
      patientId: 'PAT001',
      email: 'sarah.johnson@email.com',
      firstName: 'Sarah',
      lastName: 'Johnson',
      role: 'patient',
      isActive: true,
      createdAt: '2024-01-15T10:30:00Z',
      dateOfBirth: '1945-03-20',
      phone: '+1-555-0100',
      address: '123 Oak Street, Springfield, IL 62701',
      emergencyContact: {
        name: 'Michael Johnson',
        relationship: 'Son',
        phone: '+1-555-0101'
      },
      medicalInfo: {
        allergies: ['Penicillin', 'Shellfish'],
        medications: ['Lisinopril 10mg', 'Metformin 500mg'],
        conditions: ['Type 2 Diabetes', 'Hypertension'],
        notes: 'Requires blood sugar monitoring twice daily'
      },
      carePlan: carePlans[0],
      invoices: [
        {
          id: 'INV001',
          patientId: '1',
          patientName: 'Sarah Johnson',
          amount: 720.00,
          dueDate: '2024-02-28',
          status: 'paid',
          items: [
            { id: '1', description: 'Basic Care Package - February', quantity: 1, rate: 720.00, amount: 720.00 }
          ],
          issuedDate: '2024-02-01',
          paidDate: '2024-02-15',
          paymentMethod: 'bank_transfer'
        }
      ],
      paymentHistory: [
        {
          id: 'PAY001',
          patientId: '1',
          patientName: 'Sarah Johnson',
          invoiceId: 'INV001',
          amount: 720.00,
          paymentDate: '2024-02-15',
          paymentMethod: 'bank_transfer',
          status: 'completed',
          transactionId: 'TXN123456'
        }
      ],
      totalRevenue: 720.00,
      lastPayment: {
        id: 'PAY001',
        patientId: '1',
        patientName: 'Sarah Johnson',
        invoiceId: 'INV001',
        amount: 720.00,
        paymentDate: '2024-02-15',
        paymentMethod: 'bank_transfer',
        status: 'completed'
      }
    },
    {
      id: '2',
      patientId: 'PAT002',
      email: 'robert.wilson@email.com',
      firstName: 'Robert',
      lastName: 'Wilson',
      role: 'patient',
      isActive: true,
      createdAt: '2024-01-20T14:15:00Z',
      dateOfBirth: '1938-07-12',
      phone: '+1-555-0102',
      address: '456 Maple Avenue, Springfield, IL 62702',
      emergencyContact: {
        name: 'Jennifer Wilson',
        relationship: 'Daughter',
        phone: '+1-555-0103'
      },
      medicalInfo: {
        allergies: ['None known'],
        medications: ['Warfarin 5mg', 'Digoxin 0.25mg'],
        conditions: ['Atrial Fibrillation', 'Congestive Heart Failure'],
        notes: 'Requires INR monitoring weekly'
      },
      carePlan: carePlans[1],
      invoices: [
        {
          id: 'INV002',
          patientId: '2',
          patientName: 'Robert Wilson',
          amount: 1280.00,
          dueDate: '2024-02-28',
          status: 'pending',
          items: [
            { id: '2', description: 'Comprehensive Care Package - February', quantity: 1, rate: 1280.00, amount: 1280.00 }
          ],
          issuedDate: '2024-02-01'
        }
      ],
      paymentHistory: [],
      totalRevenue: 0,
      lastPayment: undefined
    },
    {
      id: '3',
      patientId: 'PAT003',
      email: 'margaret.thompson@email.com',
      firstName: 'Margaret',
      lastName: 'Thompson',
      role: 'patient',
      isActive: false,
      createdAt: '2024-01-25T09:45:00Z',
      dateOfBirth: '1952-11-30',
      phone: '+1-555-0104',
      address: '789 Pine Road, Springfield, IL 62703',
      emergencyContact: {
        name: 'David Thompson',
        relationship: 'Son',
        phone: '+1-555-0105'
      },
      medicalInfo: {
        allergies: ['Latex', 'Iodine'],
        medications: ['Aricept 10mg', 'Namenda 10mg'],
        conditions: ['Alzheimer\'s Disease', 'Osteoporosis'],
        notes: 'Mild cognitive impairment, requires supervision'
      },
      invoices: [],
      paymentHistory: [],
      totalRevenue: 0,
      lastPayment: undefined
    }
  ]);

  const generatePatientId = (): string => {
    const existingIds = patients.map(patient => {
      const match = patient.patientId.match(/PAT(\d{3})$/);
      return match ? parseInt(match[1]) : 0;
    });
    const nextNumber = Math.max(...existingIds, 0) + 1;
    return `PAT${String(nextNumber).padStart(3, '0')}`;
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = 
      patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.patientId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && patient.isActive) ||
      (statusFilter === 'inactive' && !patient.isActive);

    return matchesSearch && matchesStatus;
  });

  const handleActivatePatient = (patientId: string) => {
    console.log('Activating patient:', patientId);
  };

  const handleDeactivatePatient = (patientId: string) => {
    console.log('Deactivating patient:', patientId);
  };

  const handleAssignCarePlan = (patientId: string, carePlanId: string) => {
    console.log('Assigning care plan', carePlanId, 'to patient', patientId);
    setShowCarePlanModal(false);
    setSelectedPatient(null);
  };

  const handleGenerateInvoice = (patientId: string) => {
    console.log('Generating invoice for patient:', patientId);
    setShowBillingModal(false);
    setSelectedPatient(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Patient Management</h2>
          <p className="text-gray-600 mt-1">
            Manage patient records, care plans, billing, and payment workflows
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add New Patient
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Heart className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Patients</p>
                <p className="text-2xl font-bold text-gray-900">{patients.length}</p>
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
                <p className="text-sm font-medium text-gray-600">Active Patients</p>
                <p className="text-2xl font-bold text-gray-900">
                  {patients.filter(p => p.isActive).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{patients.reduce((sum, p) => sum + p.totalRevenue, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <FileText className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Invoices</p>
                <p className="text-2xl font-bold text-gray-900">
                  {patients.flatMap(p => p.invoices).filter(i => i.status === 'pending').length}
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
                  placeholder="Search patients by name, email, or Patient ID..."
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

      {/* Patients Table */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Patient Directory</h3>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Care Plan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Revenue
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
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-700">
                              {patient.firstName[0]}{patient.lastName[0]}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {patient.firstName} {patient.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{patient.email}</div>
                          <div className="text-sm text-gray-500">{patient.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-mono text-gray-900">{patient.patientId}</div>
                      <div className="text-sm text-gray-500">
                        Age: {new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {patient.carePlan ? (
                        <div className="text-sm text-gray-900">
                          <div className="font-medium">{patient.carePlan.name}</div>
                          <div className="text-gray-500">₹{patient.carePlan.totalCost}/month</div>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500 italic">No care plan assigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {patient.lastPayment ? (
                        <div className="text-sm text-gray-900">
                          <div className="flex items-center">
                            <Activity className="h-4 w-4 mr-1 text-green-600" />
                            <span className="text-green-600">Last paid</span>
                          </div>
                          <div className="text-gray-500">
                            {new Date(patient.lastPayment.paymentDate).toLocaleDateString()}
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">No payments</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ₹{patient.totalRevenue.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        patient.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {patient.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedPatient(patient);
                            setShowPatientModal(true);
                          }}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedPatient(patient);
                            setShowCarePlanModal(true);
                          }}
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          Care Plan
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedPatient(patient);
                            setShowBillingModal(true);
                          }}
                        >
                          <CreditCard className="h-4 w-4 mr-1" />
                          Billing
                        </Button>

                        {patient.isActive ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeactivatePatient(patient.id)}
                            className="text-red-600 border-red-300 hover:bg-red-50"
                          >
                            <UserX className="h-4 w-4 mr-1" />
                            Deactivate
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => handleActivatePatient(patient.id)}
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

      {/* Patient Details Modal */}
      {showPatientModal && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Patient Details - {selectedPatient.firstName} {selectedPatient.lastName}
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Personal Information</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Patient ID:</strong> {selectedPatient.patientId}</p>
                  <p><strong>Email:</strong> {selectedPatient.email}</p>
                  <p><strong>Phone:</strong> {selectedPatient.phone}</p>
                  <p><strong>Date of Birth:</strong> {new Date(selectedPatient.dateOfBirth).toLocaleDateString()}</p>
                  <p><strong>Address:</strong> {selectedPatient.address}</p>
                </div>

                <h5 className="font-medium text-gray-900 mt-4 mb-2">Emergency Contact</h5>
                <div className="space-y-1 text-sm">
                  <p><strong>Name:</strong> {selectedPatient.emergencyContact.name}</p>
                  <p><strong>Relationship:</strong> {selectedPatient.emergencyContact.relationship}</p>
                  <p><strong>Phone:</strong> {selectedPatient.emergencyContact.phone}</p>
                </div>
              </div>

              {/* Medical Information */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Medical Information</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <strong>Allergies:</strong>
                    <ul className="list-disc list-inside ml-2">
                      {selectedPatient.medicalInfo.allergies.map((allergy, index) => (
                        <li key={index}>{allergy}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <strong>Current Medications:</strong>
                    <ul className="list-disc list-inside ml-2">
                      {selectedPatient.medicalInfo.medications.map((medication, index) => (
                        <li key={index}>{medication}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <strong>Medical Conditions:</strong>
                    <ul className="list-disc list-inside ml-2">
                      {selectedPatient.medicalInfo.conditions.map((condition, index) => (
                        <li key={index}>{condition}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <strong>Notes:</strong>
                    <p className="ml-2">{selectedPatient.medicalInfo.notes}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowPatientModal(false);
                  setSelectedPatient(null);
                }}
              >
                Close
              </Button>
              <Button>
                <Edit className="h-4 w-4 mr-1" />
                Edit Patient
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Care Plan Modal */}
      {showCarePlanModal && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-screen overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Assign Care Plan - {selectedPatient.firstName} {selectedPatient.lastName}
            </h3>
            
            {/* Current Care Plan */}
            {selectedPatient.carePlan && (
              <div className="p-4 bg-blue-50 rounded-lg mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Current Care Plan</h4>
                <p className="text-sm text-gray-600">{selectedPatient.carePlan.name} - ₹{selectedPatient.carePlan.totalCost.toLocaleString()}/month</p>
              </div>
            )}

            {/* Available Care Plans */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Available Care Plans</h4>
              {carePlans.map((plan) => (
                <div key={plan.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-gray-900">{plan.name}</h5>
                    <span className="text-lg font-bold text-gray-900">₹{plan.totalCost.toLocaleString()}/month</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{plan.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <p>{plan.duration} • {plan.frequency}</p>
                      <p>Services: {plan.services.join(', ')}</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleAssignCarePlan(selectedPatient.id, plan.id)}
                      disabled={selectedPatient.carePlan?.id === plan.id}
                    >
                      {selectedPatient.carePlan?.id === plan.id ? 'Current Plan' : 'Assign Plan'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowCarePlanModal(false);
                  setSelectedPatient(null);
                }}
              >
                Cancel
              </Button>
              <Button variant="outline">
                Create Custom Plan
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Billing Modal */}
      {showBillingModal && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Billing & Payments - {selectedPatient.firstName} {selectedPatient.lastName}
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Invoices */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">Invoices</h4>
                  <Button size="sm" onClick={() => handleGenerateInvoice(selectedPatient.id)}>
                    Generate Invoice
                  </Button>
                </div>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {selectedPatient.invoices.length > 0 ? (
                    selectedPatient.invoices.map((invoice) => (
                      <div key={invoice.id} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{invoice.id}</span>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">Amount: ₹{invoice.amount.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Due: {new Date(invoice.dueDate).toLocaleDateString()}</p>
                        {invoice.paidDate && (
                          <p className="text-sm text-green-600">Paid: {new Date(invoice.paidDate).toLocaleDateString()}</p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 italic">No invoices generated</p>
                  )}
                </div>
              </div>

              {/* Payment History */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Payment History</h4>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {selectedPatient.paymentHistory.length > 0 ? (
                    selectedPatient.paymentHistory.map((payment) => (
                      <div key={payment.id} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{payment.id}</span>
                          <span className="text-green-600 font-medium">₹{payment.amount.toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-gray-600">Date: {new Date(payment.paymentDate).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-600">Method: {payment.paymentMethod.replace('_', ' ').toUpperCase()}</p>
                        {payment.transactionId && (
                          <p className="text-sm text-gray-500">Transaction: {payment.transactionId}</p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 italic">No payment history</p>
                  )}
                </div>
              </div>
            </div>

            {/* Revenue Summary */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Revenue Summary</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Total Revenue</p>
                  <p className="text-lg font-bold text-gray-900">₹{selectedPatient.totalRevenue.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Outstanding</p>
                  <p className="text-lg font-bold text-orange-600">
                    ₹{selectedPatient.invoices
                      .filter(i => i.status === 'pending' || i.status === 'overdue')
                      .reduce((sum, i) => sum + i.amount, 0)
                      .toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Last Payment</p>
                  <p className="text-lg font-bold text-gray-900">
                    {selectedPatient.lastPayment 
                      ? new Date(selectedPatient.lastPayment.paymentDate).toLocaleDateString()
                      : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowBillingModal(false);
                  setSelectedPatient(null);
                }}
              >
                Close
              </Button>
              <Button>
                Process Payment
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}