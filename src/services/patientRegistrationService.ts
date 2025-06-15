import { PatientRegistration } from '../types';
import { PatientRegistrationData } from '../components/patient/PatientRegistrationForm';

// Simulated database storage
let patientRegistrations: PatientRegistration[] = [
  {
    id: 'reg_001',
    patientId: 'patient_001',
    referenceNumber: 'REF-2024-001',
    firstName: 'Sarah',
    lastName: 'Johnson',
    phone: '+1-555-0123',
    email: 'patient@ayuhclinic.com',
    address: '123 Oak Street, Springfield, IL 62701',
    selectedCarePlan: ['1', '2'],
    comments: 'Prefers morning appointments. Has mobility issues with stairs.',
    medicalCondition: 'Hypertension, Type 2 Diabetes, Arthritis',
    familyDoctor: 'Dr. Michael Thompson - Springfield Medical Center',
    emergencyContactNumber: '+1-555-0124',
    careNeeds: 'Personal care assistance, medication management, companionship services. Needs help with daily activities due to arthritis.',
    submittedAt: '2024-01-15T10:30:00Z',
    status: 'active'
  }
];

export class PatientRegistrationService {
  // Generate a unique reference number
  private generateReferenceNumber(): string {
    const year = new Date().getFullYear();
    const randomId = Math.random().toString(36).substr(2, 6).toUpperCase();
    return `REF-${year}-${randomId}`;
  }

  // Generate a unique registration ID
  private generateRegistrationId(): string {
    return `reg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Submit a new patient registration
  async submitRegistration(
    patientId: string,
    registrationData: PatientRegistrationData
  ): Promise<{ success: boolean; registration?: PatientRegistration; error?: string }> {
    try {
      // Check if patient already has a registration
      const existingRegistration = patientRegistrations.find(
        reg => reg.patientId === patientId
      );

      if (existingRegistration) {
        return {
          success: false,
          error: 'Patient already has an active registration'
        };
      }

      // Create new registration
      const newRegistration: PatientRegistration = {
        id: this.generateRegistrationId(),
        patientId,
        referenceNumber: this.generateReferenceNumber(),
        firstName: registrationData.firstName,
        lastName: registrationData.lastName,
        phone: registrationData.phone,
        email: registrationData.email,
        address: registrationData.address,
        selectedCarePlan: registrationData.selectedCarePlan,
        comments: registrationData.comments,
        medicalCondition: registrationData.medicalCondition,
        familyDoctor: registrationData.familyDoctor,
        emergencyContactNumber: registrationData.emergencyContactNumber,
        careNeeds: registrationData.careNeeds,
        submittedAt: new Date().toISOString(),
        status: 'pending'
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Add to storage
      patientRegistrations.push(newRegistration);

      // Also update localStorage for persistence
      localStorage.setItem('patientRegistrations', JSON.stringify(patientRegistrations));

      return {
        success: true,
        registration: newRegistration
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to submit registration. Please try again.'
      };
    }
  }

  // Get patient registration by patient ID
  getPatientRegistration(patientId: string): PatientRegistration | undefined {
    // First check localStorage for any new registrations
    const stored = localStorage.getItem('patientRegistrations');
    if (stored) {
      try {
        patientRegistrations = JSON.parse(stored);
      } catch (error) {
        console.error('Failed to parse stored registrations:', error);
      }
    }

    return patientRegistrations.find(reg => reg.patientId === patientId);
  }

  // Get all patient registrations (for admin use)
  getAllRegistrations(): PatientRegistration[] {
    const stored = localStorage.getItem('patientRegistrations');
    if (stored) {
      try {
        patientRegistrations = JSON.parse(stored);
      } catch (error) {
        console.error('Failed to parse stored registrations:', error);
      }
    }
    return patientRegistrations;
  }

  // Update registration status
  async updateRegistrationStatus(
    registrationId: string, 
    status: PatientRegistration['status']
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const registrationIndex = patientRegistrations.findIndex(
        reg => reg.id === registrationId
      );

      if (registrationIndex === -1) {
        return {
          success: false,
          error: 'Registration not found'
        };
      }

      patientRegistrations[registrationIndex].status = status;
      localStorage.setItem('patientRegistrations', JSON.stringify(patientRegistrations));

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to update registration status'
      };
    }
  }
}

// Export singleton instance
export const patientRegistrationService = new PatientRegistrationService();

// Make service available globally for debugging
if (typeof window !== 'undefined') {
  (window as any).patientRegistrationService = patientRegistrationService;
}