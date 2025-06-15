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

export type UserRole = 'patient' | 'caregiver' | 'employee' | 'admin' | 'homeopath' | 'candidate';

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
  patientName: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  serviceType: string;
  status: 'pending' | 'assigned' | 'accepted' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  location: string;
  payment: number;
  notes?: string;
  specialInstructions?: string;
}

export interface Employee extends User {
  employeeId: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  emergencyContact: EmergencyContact;
  hourlyRate: number;
  availability: WeeklyAvailability;
  skills: string[];
  certifications: string[];
}

export interface WeeklyAvailability {
  [key: string]: {
    day: string;
    available: boolean;
    timeSlots: { start: string; end: string; }[];
  };
}

export interface ArrivalConfirmation {
  id: string;
  shiftId: string;
  employeeId: string;
  arrivalTime: string;
  location: string;
  imageUrl: string;
  notes?: string;
  confirmedAt: string;
}

export interface Candidate extends User {
  candidateId: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  emergencyContact: EmergencyContact;
  experience: number;
  qualifications: string[];
  documents: Document[];
  interviewAssessment?: {
    comments: string;
    rating: number;
    interviewer: string;
    interviewDate: string;
  };
  policeVerification?: {
    status: 'pending' | 'verified' | 'rejected';
    documentUrl?: string;
    verifiedDate?: string;
  };
  status: 'pending' | 'reviewed' | 'approved' | 'rejected';
  appliedAt: string;
}

export interface CarePlan {
  id: string;
  name: string;
  description: string;
  services: CarePlanService[];
  duration: string;
  frequency: string;
  totalCost: number;
  isCustom: boolean;
  createdAt: string;
  createdBy: string;
  status: 'active' | 'inactive' | 'draft';
}

export interface CarePlanService {
  serviceId: string;
  serviceName: string;
  serviceType: 'homecare' | 'homeopathy';
  category: string;
  price: number;
  duration: number;
  frequency: 'daily' | 'weekly' | 'monthly' | 'as-needed';
  isIncluded: boolean;
}

export interface CarePlanTemplate {
  id: string;
  name: string;
  description: string;
  targetDemographic: string;
  recommendedServices: string[];
  estimatedCost: number;
  isDefault: boolean;
}

export interface Invoice {
  id: string;
  patientId: string;
  patientName: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  items: InvoiceItem[];
  issuedDate: string;
  paidDate?: string;
  paymentMethod?: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface PaymentRecord {
  id: string;
  patientId: string;
  patientName: string;
  invoiceId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: 'cash' | 'card' | 'bank_transfer' | 'insurance';
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  transactionId?: string;
}

export interface ShiftAssignment {
  id: string;
  shiftId: string;
  employeeId: string;
  employeeName: string;
  patientId: string;
  patientName: string;
  assignedAt: string;
  assignedBy: string;
  status: 'assigned' | 'accepted' | 'declined' | 'completed';
}

export interface PatientExtended extends Patient {
  carePlan?: CarePlan;
  invoices: Invoice[];
  paymentHistory: PaymentRecord[];
  totalRevenue: number;
  lastPayment?: PaymentRecord;
}

export interface PatientRegistration {
  id: string;
  patientId: string;
  referenceNumber: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  selectedCarePlan: string[];
  comments: string;
  medicalCondition: string;
  familyDoctor: string;
  emergencyContactNumber: string;
  careNeeds: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected' | 'active';
}