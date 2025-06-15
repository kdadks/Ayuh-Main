import { 
  Patient, 
  Employee, 
  Candidate, 
  WeeklyAvailability, 
  EmergencyContact, 
  MedicalInfo,
  HomeopathyProfile,
  LifestyleInfo
} from '../types';

// ============================
// DUMMY PATIENT ACCOUNTS
// ============================

export const dummyPatients: Patient[] = [
  {
    // Basic User Info
    id: 'patient_001',
    email: 'patient@ayuhclinic.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'patient',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    isActive: true,
    createdAt: '2024-01-15T10:30:00Z',
    
    // Patient-specific Info
    patientId: 'P001',
    dateOfBirth: '1945-03-15',
    phone: '+1-555-0123',
    address: '123 Oak Street, Springfield, IL 62701',
    emergencyContact: {
      name: 'Michael Johnson',
      relationship: 'Son',
      phone: '+1-555-0124'
    },
    medicalInfo: {
      allergies: ['Penicillin', 'Shellfish'],
      medications: ['Lisinopril 10mg', 'Metformin 500mg'],
      conditions: ['Hypertension', 'Type 2 Diabetes', 'Arthritis'],
      notes: 'Patient prefers morning appointments. Has mobility issues with stairs.'
    },
    homeopathyProfile: {
      constitution: 'Calcarea Carbonica',
      symptoms: ['Chronic fatigue', 'Joint stiffness', 'Digestive issues'],
      previousTreatments: ['Conventional medication', 'Physical therapy'],
      lifestyle: {
        diet: 'Low sodium, diabetic-friendly',
        exercise: 'Light walking, chair exercises',
        sleep: '7-8 hours, occasional insomnia',
        stress: 'Moderate stress from health concerns'
      },
      mentalEmotionalState: 'Generally optimistic but anxious about health'
    }
  },
  {
    // Second Patient for testing
    id: 'patient_002',
    email: 'robert.wilson@email.com',
    firstName: 'Robert',
    lastName: 'Wilson',
    role: 'patient',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    isActive: true,
    createdAt: '2024-01-20T09:15:00Z',
    
    patientId: 'P002',
    dateOfBirth: '1950-08-22',
    phone: '+1-555-0125',
    address: '456 Maple Avenue, Springfield, IL 62702',
    emergencyContact: {
      name: 'Linda Wilson',
      relationship: 'Wife',
      phone: '+1-555-0126'
    },
    medicalInfo: {
      allergies: ['Latex', 'Iodine'],
      medications: ['Warfarin 5mg', 'Atorvastatin 20mg'],
      conditions: ['Atrial Fibrillation', 'High Cholesterol'],
      notes: 'Requires regular INR monitoring. Prefers afternoon appointments.'
    },
    homeopathyProfile: {
      constitution: 'Lycopodium',
      symptoms: ['Heart palpitations', 'Digestive bloating', 'Memory concerns'],
      previousTreatments: ['Cardiac medications', 'Dietary changes'],
      lifestyle: {
        diet: 'Heart-healthy, low fat',
        exercise: 'Swimming, gentle yoga',
        sleep: '6-7 hours, early riser',
        stress: 'Low stress, enjoys retirement'
      },
      mentalEmotionalState: 'Calm and accepting of aging process'
    }
  }
];

// ============================
// DUMMY EMPLOYEE ACCOUNTS
// ============================

export const dummyEmployees: Employee[] = [
  {
    // Basic User Info
    id: 'employee_001',
    email: 'employee@ayuhclinic.com',
    firstName: 'David',
    lastName: 'Chen',
    role: 'employee',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    isActive: true,
    createdAt: '2024-01-05T14:45:00Z',
    
    // Employee-specific Info
    employeeId: 'E001',
    phone: '+1-555-0201',
    address: '789 Pine Street, Springfield, IL 62703',
    dateOfBirth: '1985-07-12',
    emergencyContact: {
      name: 'Lisa Chen',
      relationship: 'Wife',
      phone: '+1-555-0202'
    },
    hourlyRate: 3375, // ₹3,375/hr (45 USD * 75)
    availability: {
      monday: {
        day: 'Monday',
        available: true,
        timeSlots: [
          { start: '08:00', end: '16:00' }
        ]
      },
      tuesday: {
        day: 'Tuesday',
        available: true,
        timeSlots: [
          { start: '08:00', end: '16:00' }
        ]
      },
      wednesday: {
        day: 'Wednesday',
        available: true,
        timeSlots: [
          { start: '08:00', end: '16:00' }
        ]
      },
      thursday: {
        day: 'Thursday',
        available: true,
        timeSlots: [
          { start: '08:00', end: '16:00' }
        ]
      },
      friday: {
        day: 'Friday',
        available: true,
        timeSlots: [
          { start: '08:00', end: '16:00' }
        ]
      },
      saturday: {
        day: 'Saturday',
        available: false,
        timeSlots: []
      },
      sunday: {
        day: 'Sunday',
        available: false,
        timeSlots: []
      }
    },
    skills: [
      'Personal Care Assistance',
      'Medication Management',
      'Mobility Assistance',
      'Companionship',
      'Light Housekeeping'
    ],
    certifications: [
      'Certified Nursing Assistant (CNA)',
      'CPR/First Aid Certified',
      'Alzheimer\'s Care Training',
      'HIPAA Compliance Training'
    ]
  },
  {
    // Second Employee for testing
    id: 'employee_002',
    email: 'maria.garcia@ayuhclinic.com',
    firstName: 'Maria',
    lastName: 'Garcia',
    role: 'employee',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    isActive: true,
    createdAt: '2024-01-10T08:15:00Z',
    
    employeeId: 'E002',
    phone: '+1-555-0203',
    address: '321 Cedar Lane, Springfield, IL 62704',
    dateOfBirth: '1990-11-03',
    emergencyContact: {
      name: 'Carlos Garcia',
      relationship: 'Husband',
      phone: '+1-555-0204'
    },
    hourlyRate: 3000, // ₹3,000/hr (40 USD * 75)
    availability: {
      monday: {
        day: 'Monday',
        available: true,
        timeSlots: [
          { start: '06:00', end: '14:00' },
          { start: '18:00', end: '22:00' }
        ]
      },
      tuesday: {
        day: 'Tuesday',
        available: true,
        timeSlots: [
          { start: '06:00', end: '14:00' }
        ]
      },
      wednesday: {
        day: 'Wednesday',
        available: true,
        timeSlots: [
          { start: '06:00', end: '14:00' }
        ]
      },
      thursday: {
        day: 'Thursday',
        available: true,
        timeSlots: [
          { start: '06:00', end: '14:00' }
        ]
      },
      friday: {
        day: 'Friday',
        available: true,
        timeSlots: [
          { start: '06:00', end: '14:00' }
        ]
      },
      saturday: {
        day: 'Saturday',
        available: true,
        timeSlots: [
          { start: '08:00', end: '16:00' }
        ]
      },
      sunday: {
        day: 'Sunday',
        available: false,
        timeSlots: []
      }
    },
    skills: [
      'Personal Care Assistance',
      'Medication Management',
      'Physical Therapy Support',
      'Meal Preparation',
      'Transportation Services'
    ],
    certifications: [
      'Home Health Aide (HHA)',
      'CPR/First Aid Certified',
      'Medication Administration Training',
      'Dementia Care Specialist'
    ]
  }
];

// ============================
// DUMMY CANDIDATE ACCOUNTS
// ============================

export const dummyCandidates: Candidate[] = [
  {
    // Basic User Info
    id: 'candidate_001',
    email: 'candidate@ayuhclinic.com',
    firstName: 'Emma',
    lastName: 'Rodriguez',
    role: 'candidate',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    isActive: true,
    createdAt: '2024-01-03T12:30:00Z',
    
    // Candidate-specific Info
    candidateId: 'C001',
    phone: '+1-555-0301',
    address: '654 Birch Road, Springfield, IL 62705',
    dateOfBirth: '1988-04-18',
    emergencyContact: {
      name: 'Sofia Rodriguez',
      relationship: 'Sister',
      phone: '+1-555-0302'
    },
    experience: 3,
    qualifications: [
      'Associate Degree in Health Sciences',
      'CNA Certification',
      'CPR/First Aid Certified',
      'Elder Care Experience'
    ],
    documents: [
      {
        id: 'doc_001',
        name: 'CNA Certificate',
        type: 'pdf',
        url: '/documents/emma_cna_cert.pdf',
        uploadedAt: '2024-01-03T12:30:00Z'
      },
      {
        id: 'doc_002',
        name: 'CPR Certification',
        type: 'pdf',
        url: '/documents/emma_cpr_cert.pdf',
        uploadedAt: '2024-01-03T12:35:00Z'
      },
      {
        id: 'doc_003',
        name: 'Background Check',
        type: 'pdf',
        url: '/documents/emma_background.pdf',
        uploadedAt: '2024-01-03T12:40:00Z'
      }
    ],
    interviewAssessment: {
      comments: 'Excellent communication skills, shows genuine care for elderly patients. Previous experience in assisted living facility is valuable.',
      rating: 4.5,
      interviewer: 'Jennifer Williams',
      interviewDate: '2024-01-10T14:00:00Z'
    },
    policeVerification: {
      status: 'verified',
      documentUrl: '/documents/emma_police_verification.pdf',
      verifiedDate: '2024-01-15T10:00:00Z'
    },
    status: 'approved',
    appliedAt: '2024-01-03T12:30:00Z'
  },
  {
    // Second Candidate for testing
    id: 'candidate_002',
    email: 'james.wilson@email.com',
    firstName: 'James',
    lastName: 'Wilson',
    role: 'candidate',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    isActive: true,
    createdAt: '2024-02-01T09:15:00Z',
    
    candidateId: 'C002',
    phone: '+1-555-0303',
    address: '987 Elm Street, Springfield, IL 62706',
    dateOfBirth: '1992-09-25',
    emergencyContact: {
      name: 'Sarah Wilson',
      relationship: 'Mother',
      phone: '+1-555-0304'
    },
    experience: 1,
    qualifications: [
      'Bachelor\'s Degree in Nursing',
      'RN License (Pending)',
      'BLS Certification',
      'Volunteer Experience at Senior Center'
    ],
    documents: [
      {
        id: 'doc_004',
        name: 'Nursing Degree',
        type: 'pdf',
        url: '/documents/james_nursing_degree.pdf',
        uploadedAt: '2024-02-01T09:15:00Z'
      },
      {
        id: 'doc_005',
        name: 'BLS Certification',
        type: 'pdf',
        url: '/documents/james_bls_cert.pdf',
        uploadedAt: '2024-02-01T09:20:00Z'
      }
    ],
    interviewAssessment: {
      comments: 'Recent graduate with strong theoretical knowledge. Needs practical experience but shows enthusiasm and willingness to learn.',
      rating: 4.0,
      interviewer: 'Jennifer Williams',
      interviewDate: '2024-02-08T11:00:00Z'
    },
    policeVerification: {
      status: 'pending',
      documentUrl: undefined,
      verifiedDate: undefined
    },
    status: 'reviewed',
    appliedAt: '2024-02-01T09:15:00Z'
  }
];

// ============================
// ACCOUNT CREDENTIALS
// ============================

export const accountCredentials = {
  patient: {
    email: 'patient@ayuhclinic.com',
    password: 'password123',
    description: 'Access patient dashboard, view appointments, manage care plans'
  },
  employee: {
    email: 'employee@ayuhclinic.com', 
    password: 'password123',
    description: 'Access employee dashboard, manage shifts, update availability'
  },
  candidate: {
    email: 'candidate@ayuhclinic.com',
    password: 'password123', 
    description: 'Access candidate dashboard, complete enrollment, track application status'
  },
  admin: {
    email: 'admin@ayuhclinic.com',
    password: 'password123',
    description: 'Full system access, manage all users, oversee operations'
  },
  homeopath: {
    email: 'homeopath@ayuhclinic.com',
    password: 'password123',
    description: 'Access homeopathy features, manage treatments, view patient profiles'
  },
  caregiver: {
    email: 'caregiver@ayuhclinic.com',
    password: 'password123',
    description: 'Access caregiver features, manage appointments'
  }
};

// ============================
// HELPER FUNCTIONS
// ============================

export const getDummyAccountByRole = (role: string) => {
  switch (role) {
    case 'patient':
      return dummyPatients[0];
    case 'employee':
      return dummyEmployees[0];
    case 'candidate':
      return dummyCandidates[0];
    default:
      return null;
  }
};

export const getAllDummyAccounts = () => ({
  patients: dummyPatients,
  employees: dummyEmployees,
  candidates: dummyCandidates,
  credentials: accountCredentials
});