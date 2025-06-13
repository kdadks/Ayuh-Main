export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
}

export type UserRole = 'patient' | 'caregiver' | 'employee' | 'admin' | 'homeopath';

export interface Patient extends User {
  patientId: string;
  dateOfBirth: string;
  phone: string;
  address: string;
  emergencyContact: EmergencyContact;
  medicalInfo: MedicalInfo;
  homeopathyProfile?: HomeopathyProfile;
}

export interface HomeopathyProfile {
  constitution: string;
  symptoms: string[];
  previousTreatments: string[];
  lifestyle: LifestyleInfo;
  mentalEmotionalState: string;
}

export interface LifestyleInfo {
  diet: string;
  exercise: string;
  sleep: string;
  stress: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface MedicalInfo {
  allergies: string[];
  medications: string[];
  conditions: string[];
  notes: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  caregiverId?: string;
  homeopathId?: string;
  serviceType: string;
  appointmentType: 'homecare' | 'homeopathy';
  date: string;
  time: string;
  duration: number;
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  notes?: string;
  location?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  serviceType: 'homecare' | 'homeopathy';
  image: string;
}

export interface TreatmentPlan {
  id: string;
  patientId: string;
  homeopathId: string;
  condition: string;
  remedies: Remedy[];
  duration: string;
  followUpSchedule: string[];
  dietaryRecommendations: string[];
  lifestyleChanges: string[];
  createdAt: string;
  status: 'active' | 'completed' | 'paused';
}

export interface Remedy {
  name: string;
  potency: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  condition: string;
  age: string;
  gender: string;
  symptoms: string[];
  treatment: string;
  outcome: string;
  duration: string;
  image?: string;
}

export interface CaregiverApplication {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  experience: number;
  qualifications: string[];
  documents: Document[];
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
}

export interface Shift {
  id: string;
  employeeId: string;
  patientId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed';
  location: string;
}