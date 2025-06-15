import React, { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Copy,
  Users,
  DollarSign,
  Clock,
  Package,
  CheckCircle,
  X,
  Save,
  RotateCcw
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { CarePlan, CarePlanService, Service, PatientExtended } from '../../../types';
import { mockServices } from '../../../utils/data';
import { CarePlanManager } from '../../../services/carePlanService';

export function CarePlanManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'draft'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<CarePlan | null>(null);
  const [newPlan, setNewPlan] = useState<Partial<CarePlan>>({
    name: '',
    description: '',
    services: [],
    duration: '',
    frequency: '',
    totalCost: 0,
    isCustom: true,
    status: 'draft'
  });

  // Use care plan service for data management
  const [carePlans, setCarePlans] = useState<CarePlan[]>(CarePlanManager.getAllCarePlans());

  // Mock patients for assignment
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
      invoices: [],
      paymentHistory: [],
      totalRevenue: 0
    }
  ]);

  const filteredPlans = carePlans.filter(plan => {
    const matchesSearch = 
      plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || plan.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const calculateTotalCost = (services: CarePlanService[]): number => {
    return CarePlanManager.calculateTotalCost(services);
  };

  const handleServiceToggle = (serviceId: string, planServices: CarePlanService[], setPlanServices: (services: CarePlanService[]) => void) => {
    const updatedServices = planServices.map(service =>
      service.serviceId === serviceId
        ? { ...service, isIncluded: !service.isIncluded }
        : service
    );
    setPlanServices(updatedServices);
  };

  const handleAddServiceToPlan = (service: Service, planServices: CarePlanService[], setPlanServices: (services: CarePlanService[]) => void) => {
    const newService: CarePlanService = {
      serviceId: service.id,
      serviceName: service.name,
      serviceType: service.serviceType,
      category: service.category,
      price: service.price,
      duration: service.duration,
      frequency: 'monthly',
      isIncluded: true
    };

    const exists = planServices.some(s => s.serviceId === service.id);
    if (!exists) {
      setPlanServices([...planServices, newService]);
    }
  };

  const handleCreatePlan = () => {
    const createdPlan = CarePlanManager.createCarePlan({
      ...newPlan as Omit<CarePlan, 'id' | 'createdAt'>,
      createdBy: 'admin',
      totalCost: calculateTotalCost(newPlan.services || [])
    });

    setCarePlans(CarePlanManager.getAllCarePlans());
    setNewPlan({
      name: '',
      description: '',
      services: [],
      duration: '',
      frequency: '',
      totalCost: 0,
      isCustom: true,
      status: 'draft'
    });
    setShowCreateModal(false);
  };

  const handleUpdatePlan = () => {
    if (!selectedPlan) return;

    const updatedPlan = CarePlanManager.updateCarePlan(selectedPlan.id, {
      ...selectedPlan,
      totalCost: calculateTotalCost(selectedPlan.services)
    });

    if (updatedPlan) {
      setCarePlans(CarePlanManager.getAllCarePlans());
    }
    setShowEditModal(false);
    setSelectedPlan(null);
  };

  const handleDeletePlan = (planId: string) => {
    const success = CarePlanManager.deleteCarePlan(planId);
    if (success) {
      setCarePlans(CarePlanManager.getAllCarePlans());
    }
  };

  const handleAssignPlan = (patientId: string) => {
    if (!selectedPlan) return;
    const success = CarePlanManager.assignCarePlanToPatient(patientId, selectedPlan.id);
    if (success) {
      console.log(`Successfully assigned plan ${selectedPlan.name} to patient ${patientId}`);
    }
    setShowAssignModal(false);
    setSelectedPlan(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const ServiceSelector = ({ 
    selectedServices, 
    onServicesChange 
  }: { 
    selectedServices: CarePlanService[], 
    onServicesChange: (services: CarePlanService[]) => void 
  }) => (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-900">Available Services</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-80 overflow-y-auto">
        {mockServices.map((service) => (
          <div key={service.id} className="border rounded-lg p-4 hover:bg-gray-50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h5 className="font-medium text-gray-900">{service.name}</h5>
                <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-sm text-gray-500">
                    <DollarSign className="inline h-4 w-4" />₹{service.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500">
                    <Clock className="inline h-4 w-4" />{service.duration}min
                  </span>
                  <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">
                    {service.serviceType}
                  </span>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAddServiceToPlan(service, selectedServices, onServicesChange)}
                disabled={selectedServices.some(s => s.serviceId === service.id)}
              >
                {selectedServices.some(s => s.serviceId === service.id) ? 'Added' : 'Add'}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <h4 className="font-medium text-gray-900 mb-3">Selected Services</h4>
        <div className="space-y-3">
          {selectedServices.map((service) => (
            <div key={service.serviceId} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={service.isIncluded}
                  onChange={() => handleServiceToggle(service.serviceId, selectedServices, onServicesChange)}
                  className="rounded"
                />
                <div>
                  <span className="font-medium text-gray-900">{service.serviceName}</span>
                  <div className="text-sm text-gray-600">
                    ₹{service.price.toLocaleString()} • {service.duration}min
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <select
                  value={service.frequency}
                  onChange={(e) => {
                    const updatedServices = selectedServices.map(s =>
                      s.serviceId === service.serviceId
                        ? { ...s, frequency: e.target.value as any }
                        : s
                    );
                    onServicesChange(updatedServices);
                  }}
                  className="text-sm border rounded px-2 py-1"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="as-needed">As Needed</option>
                </select>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const filtered = selectedServices.filter(s => s.serviceId !== service.serviceId);
                    onServicesChange(filtered);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Care Plan Management</h2>
          <p className="text-gray-600 mt-1">
            Create, manage, and assign care plans with customized service packages
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Care Plan
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Plans</p>
                <p className="text-2xl font-bold text-gray-900">{carePlans.length}</p>
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
                <p className="text-sm font-medium text-gray-600">Active Plans</p>
                <p className="text-2xl font-bold text-gray-900">
                  {carePlans.filter(p => p.status === 'active').length}
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
                <p className="text-sm font-medium text-gray-600">Avg. Plan Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{Math.round(carePlans.reduce((sum, p) => sum + p.totalCost, 0) / carePlans.length || 0).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Assigned Plans</p>
                <p className="text-2xl font-bold text-gray-900">
                  {patients.filter(p => p.carePlan).length}
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
                  placeholder="Search care plans by name or description..."
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
              <option value="draft">Draft</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Care Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlans.map((plan) => (
          <Card key={plan.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(plan.status)}`}>
                    {plan.status}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary-600">
                    ₹{plan.totalCost.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">per month</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  {plan.duration} • {plan.frequency}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Package className="h-4 w-4 mr-2" />
                  {plan.services.filter(s => s.isIncluded).length} services included
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <h4 className="text-sm font-medium text-gray-900">Included Services:</h4>
                <div className="space-y-1">
                  {plan.services.filter(s => s.isIncluded).map((service) => (
                    <div key={service.serviceId} className="text-sm text-gray-600 flex items-center">
                      <CheckCircle className="h-3 w-3 mr-2 text-green-600" />
                      {service.serviceName} ({service.frequency})
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelectedPlan(plan);
                    setShowEditModal(true);
                  }}
                  className="flex-1"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const duplicated = CarePlanManager.duplicateCarePlan(plan.id);
                    if (duplicated) {
                      setCarePlans(CarePlanManager.getAllCarePlans());
                    }
                  }}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    setSelectedPlan(plan);
                    setShowAssignModal(true);
                  }}
                >
                  <Users className="h-4 w-4 mr-1" />
                  Assign
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Plan Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Create New Care Plan</h3>
                <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Plan Name
                  </label>
                  <Input
                    value={newPlan.name || ''}
                    onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                    placeholder="Enter plan name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={newPlan.status || 'draft'}
                    onChange={(e) => setNewPlan({ ...newPlan, status: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newPlan.description || ''}
                  onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                  placeholder="Enter plan description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <Input
                    value={newPlan.duration || ''}
                    onChange={(e) => setNewPlan({ ...newPlan, duration: e.target.value })}
                    placeholder="e.g., 4 hours daily"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Frequency
                  </label>
                  <Input
                    value={newPlan.frequency || ''}
                    onChange={(e) => setNewPlan({ ...newPlan, frequency: e.target.value })}
                    placeholder="e.g., Monday to Friday"
                  />
                </div>
              </div>

              <ServiceSelector
                selectedServices={newPlan.services || []}
                onServicesChange={(services) => setNewPlan({ ...newPlan, services })}
              />

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-900">Total Monthly Cost:</span>
                  <span className="text-2xl font-bold text-primary-600">
                    ₹{calculateTotalCost(newPlan.services || []).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t">
              <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreatePlan} disabled={!newPlan.name || !newPlan.description}>
                <Save className="h-4 w-4 mr-2" />
                Create Plan
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Plan Modal */}
      {showEditModal && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Edit Care Plan</h3>
                <Button variant="outline" onClick={() => setShowEditModal(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Plan Name
                  </label>
                  <Input
                    value={selectedPlan.name}
                    onChange={(e) => setSelectedPlan({ ...selectedPlan, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={selectedPlan.status}
                    onChange={(e) => setSelectedPlan({ ...selectedPlan, status: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={selectedPlan.description}
                  onChange={(e) => setSelectedPlan({ ...selectedPlan, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <ServiceSelector
                selectedServices={selectedPlan.services}
                onServicesChange={(services) => setSelectedPlan({ ...selectedPlan, services })}
              />

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-900">Total Monthly Cost:</span>
                  <span className="text-2xl font-bold text-primary-600">
                    ₹{calculateTotalCost(selectedPlan.services).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-between p-6 border-t">
              <Button 
                variant="outline" 
                onClick={() => handleDeletePlan(selectedPlan.id)}
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Plan
              </Button>
              <div className="flex space-x-3">
                <Button variant="outline" onClick={() => setShowEditModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdatePlan}>
                  <Save className="h-4 w-4 mr-2" />
                  Update Plan
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assign Plan Modal */}
      {showAssignModal && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Assign Care Plan: {selectedPlan.name}
                </h3>
                <Button variant="outline" onClick={() => setShowAssignModal(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900">{selectedPlan.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{selectedPlan.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm text-gray-600">
                      {selectedPlan.services.filter(s => s.isIncluded).length} services included
                    </span>
                    <span className="text-lg font-bold text-primary-600">
                      ₹{selectedPlan.totalCost.toLocaleString()}/month
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Select Patient</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {patients.map((patient) => (
                    <div
                      key={patient.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleAssignPlan(patient.id)}
                    >
                      <div>
                        <div className="font-medium text-gray-900">
                          {patient.firstName} {patient.lastName}
                        </div>
                        <div className="text-sm text-gray-600">
                          {patient.patientId} • {patient.email}
                        </div>
                        {patient.carePlan && (
                          <div className="text-sm text-orange-600">
                            Current plan: {patient.carePlan.name}
                          </div>
                        )}
                      </div>
                      <Button size="sm">
                        Assign
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t">
              <Button variant="outline" onClick={() => setShowAssignModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}