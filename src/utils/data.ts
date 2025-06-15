import { Service, Appointment, CaregiverApplication, Shift, TreatmentPlan, CaseStudy, CarePlan, PatientRegistration, Invoice, PaymentRecord } from '../types';
import { dummyPatients, dummyEmployees, dummyCandidates } from './dummyAccounts';

export const mockHomecareServices: Service[] = [
  {
    id: '1',
    name: 'Personal Care Assistance',
    description: 'Comprehensive personal care including bathing, dressing, grooming, and mobility assistance.',
    price: 3375, // ₹3,375 (45 USD * 75)
    duration: 120,
    category: 'Personal Care',
    serviceType: 'homecare',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    name: 'Medication Management',
    description: 'Professional medication reminders, administration, and monitoring for safety.',
    price: 2625, // ₹2,625 (35 USD * 75)
    duration: 60,
    category: 'Medical',
    serviceType: 'homecare',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    name: 'Companionship Services',
    description: 'Social interaction, conversation, activities, and emotional support.',
    price: 2250, // ₹2,250 (30 USD * 75)
    duration: 180,
    category: 'Companionship',
    serviceType: 'homecare',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '4',
    name: 'Light Housekeeping',
    description: 'Maintaining a clean, safe living environment including laundry and meal preparation.',
    price: 3000, // ₹3,000 (40 USD * 75)
    duration: 120,
    category: 'Domestic',
    serviceType: 'homecare',
    image: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '5',
    name: 'Transportation Services',
    description: 'Safe transportation to medical appointments, shopping, and social activities.',
    price: 1875, // ₹1,875 (25 USD * 75)
    duration: 90,
    category: 'Transportation',
    serviceType: 'homecare',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '6',
    name: '24/7 Live-in Care',
    description: 'Round-the-clock professional care and supervision in the comfort of home.',
    price: 15000, // ₹15,000 (200 USD * 75)
    duration: 1440,
    category: 'Specialized',
    serviceType: 'homecare',
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

export const mockHomeopathyServices: Service[] = [
  {
    id: '7',
    name: 'Initial Consultation',
    description: 'Comprehensive 90-minute consultation including case taking, constitutional analysis, and remedy prescription.',
    price: 11250, // ₹11,250 (150 USD * 75)
    duration: 90,
    category: 'Consultation',
    serviceType: 'homeopathy',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '8',
    name: 'Follow-up Consultation',
    description: 'Progress assessment, remedy adjustment, and ongoing treatment monitoring.',
    price: 6000, // ₹6,000 (80 USD * 75)
    duration: 45,
    category: 'Consultation',
    serviceType: 'homeopathy',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '9',
    name: 'Acute Care Treatment',
    description: 'Immediate homeopathic treatment for acute conditions like fever, cold, injuries.',
    price: 4500, // ₹4,500 (60 USD * 75)
    duration: 30,
    category: 'Acute Care',
    serviceType: 'homeopathy',
    image: 'https://images.unsplash.com/photo-1594824720264-94f6ad9c5b83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '10',
    name: 'Chronic Disease Management',
    description: 'Long-term treatment plan for chronic conditions like diabetes, arthritis, allergies.',
    price: 9000, // ₹9,000 (120 USD * 75)
    duration: 60,
    category: 'Chronic Care',
    serviceType: 'homeopathy',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '11',
    name: 'Constitutional Treatment',
    description: 'Deep constitutional healing addressing the root cause of health issues.',
    price: 13500, // ₹13,500 (180 USD * 75)
    duration: 75,
    category: 'Constitutional',
    serviceType: 'homeopathy',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '12',
    name: 'Pediatric Homeopathy',
    description: 'Specialized homeopathic care for children and infants with gentle, safe remedies.',
    price: 7500, // ₹7,500 (100 USD * 75)
    duration: 60,
    category: 'Pediatric',
    serviceType: 'homeopathy',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

export const mockServices = [...mockHomecareServices, ...mockHomeopathyServices];

export const mockTreatmentPlans: TreatmentPlan[] = [
  {
    id: '1',
    patientId: '1',
    homeopathId: '5',
    condition: 'Chronic Migraine',
    remedies: [
      {
        name: 'Belladonna',
        potency: '30C',
        dosage: '3 pellets',
        frequency: 'Twice daily',
        duration: '2 weeks',
        instructions: 'Take on empty stomach, avoid coffee and mint'
      },
      {
        name: 'Natrum Muriaticum',
        potency: '200C',
        dosage: '3 pellets',
        frequency: 'Once weekly',
        duration: '4 weeks',
        instructions: 'Take in the morning, avoid strong odors'
      }
    ],
    duration: '3 months',
    followUpSchedule: ['2 weeks', '1 month', '2 months'],
    dietaryRecommendations: [
      'Avoid processed foods and artificial additives',
      'Increase water intake to 8-10 glasses daily',
      'Include magnesium-rich foods like leafy greens',
      'Limit caffeine and alcohol consumption'
    ],
    lifestyleChanges: [
      'Maintain regular sleep schedule (7-8 hours)',
      'Practice stress management techniques',
      'Regular gentle exercise like walking or yoga',
      'Keep a headache diary to identify triggers'
    ],
    createdAt: '2024-02-01T10:00:00Z',
    status: 'active'
  }
];

export const mockCaseStudies: CaseStudy[] = [
  {
    id: '1',
    title: 'Chronic Eczema Recovery',
    condition: 'Atopic Dermatitis',
    age: '8 years',
    gender: 'Female',
    symptoms: ['Severe itching', 'Red inflamed patches', 'Sleep disturbance', 'Emotional distress'],
    treatment: 'Constitutional treatment with Sulphur 200C followed by Graphites 30C for local symptoms',
    outcome: '90% improvement in skin condition within 6 months, no steroid dependency',
    duration: '8 months',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    title: 'Anxiety and Depression Recovery',
    condition: 'Generalized Anxiety Disorder',
    age: '35 years',
    gender: 'Male',
    symptoms: ['Constant worry', 'Panic attacks', 'Insomnia', 'Digestive issues'],
    treatment: 'Arsenicum Album 1M for anxiety, followed by Lycopodium 200C for digestive symptoms',
    outcome: 'Significant reduction in anxiety levels, improved sleep quality, better digestion',
    duration: '1 year',
    image: 'https://images.unsplash.com/photo-1594824720264-94f6ad9c5b83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    title: 'Rheumatoid Arthritis Management',
    condition: 'Rheumatoid Arthritis',
    age: '52 years',
    gender: 'Female',
    symptoms: ['Joint pain and stiffness', 'Morning stiffness', 'Fatigue', 'Limited mobility'],
    treatment: 'Rhus Toxicodendron 30C for joint stiffness, Bryonia 200C for pain management',
    outcome: 'Reduced joint inflammation, improved mobility, decreased dependency on conventional medication',
    duration: '18 months',
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    caregiverId: '2',
    serviceType: 'Personal Care Assistance',
    appointmentType: 'homecare',
    date: '2024-02-15',
    time: '09:00',
    duration: 120,
    status: 'scheduled',
    notes: 'First appointment - initial assessment needed',
    location: 'Patient Home'
  },
  {
    id: '2',
    patientId: '1',
    homeopathId: '5',
    serviceType: 'Follow-up Consultation',
    appointmentType: 'homeopathy',
    date: '2024-02-16',
    time: '14:00',
    duration: 45,
    status: 'confirmed',
    location: 'Ayuh Clinic'
  }
];

export const mockApplications: CaregiverApplication[] = [
  {
    id: '1',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    email: 'emily.rodriguez@email.com',
    phone: '+1-555-0123',
    experience: 5,
    qualifications: ['CNA Certified', 'CPR/First Aid', 'Alzheimer\'s Care Training'],
    documents: [
      {
        id: '1',
        name: 'CNA Certificate',
        type: 'pdf',
        url: '/documents/cna-cert.pdf',
        uploadedAt: '2024-02-01T10:00:00Z'
      }
    ],
    status: 'pending',
    submittedAt: '2024-02-01T10:00:00Z'
  },
  {
    id: '2',
    firstName: 'Marcus',
    lastName: 'Thompson',
    email: 'marcus.thompson@email.com',
    phone: '+1-555-0124',
    experience: 8,
    qualifications: ['RN Licensed', 'Home Health Aide', 'Medication Administration'],
    documents: [],
    status: 'approved',
    submittedAt: '2024-01-28T14:30:00Z'
  }
];

export const mockShifts: Shift[] = [
  {
    id: '1',
    employeeId: '3',
    patientId: '1',
    patientName: 'Sarah Johnson',
    date: '2024-02-15',
    startTime: '08:00',
    endTime: '16:00',
    duration: 8,
    serviceType: 'Personal Care',
    status: 'confirmed',
    location: '123 Oak Street, Springfield',
    payment: 27000 // ₹27,000 (360 USD * 75)
  },
  {
    id: '2',
    employeeId: '3',
    patientId: '2',
    patientName: 'Robert Wilson',
    date: '2024-02-16',
    startTime: '09:00',
    endTime: '17:00',
    duration: 8,
    serviceType: 'Comprehensive Care',
    status: 'confirmed',
    location: '456 Maple Avenue, Springfield',
    payment: 24000 // ₹24,000 (320 USD * 75)
  }
];

export const mockCarePlans: CarePlan[] = [
  {
    id: '1',
    name: 'Essential Care Package',
    description: 'Basic daily care services for independent seniors',
    services: [
      {
        serviceId: '1',
        serviceName: 'Personal Care Assistance',
        serviceType: 'homecare',
        category: 'Personal Care',
        price: 3375, // ₹3,375 (45 USD * 75)
        duration: 120,
        frequency: 'daily',
        isIncluded: true
      },
      {
        serviceId: '2',
        serviceName: 'Medication Management',
        serviceType: 'homecare',
        category: 'Medical',
        price: 2625, // ₹2,625 (35 USD * 75)
        duration: 60,
        frequency: 'daily',
        isIncluded: true
      }
    ],
    duration: '3 hours daily',
    frequency: 'Monday to Friday',
    totalCost: 90000.00, // ₹90,000 (1200 USD * 75)
    isCustom: false,
    createdAt: '2024-01-01T00:00:00Z',
    createdBy: 'admin',
    status: 'active'
  },
  {
    id: '2',
    name: 'Comprehensive Care Plus',
    description: 'Full-service care with medical monitoring and companionship',
    services: [
      {
        serviceId: '1',
        serviceName: 'Personal Care Assistance',
        serviceType: 'homecare',
        category: 'Personal Care',
        price: 3375, // ₹3,375 (45 USD * 75)
        duration: 120,
        frequency: 'daily',
        isIncluded: true
      },
      {
        serviceId: '2',
        serviceName: 'Medication Management',
        serviceType: 'homecare',
        category: 'Medical',
        price: 2625, // ₹2,625 (35 USD * 75)
        duration: 60,
        frequency: 'daily',
        isIncluded: true
      },
      {
        serviceId: '3',
        serviceName: 'Companionship Services',
        serviceType: 'homecare',
        category: 'Companionship',
        price: 2250, // ₹2,250 (30 USD * 75)
        duration: 180,
        frequency: 'daily',
        isIncluded: true
      },
      {
        serviceId: '5',
        serviceName: 'Transportation Services',
        serviceType: 'homecare',
        category: 'Transportation',
        price: 1875, // ₹1,875 (25 USD * 75)
        duration: 90,
        frequency: 'weekly',
        isIncluded: true
      }
    ],
    duration: '6 hours daily',
    frequency: 'Daily',
    totalCost: 187500.00, // ₹187,500 (2500 USD * 75)
    isCustom: false,
    createdAt: '2024-01-01T00:00:00Z',
    createdBy: 'admin',
    status: 'active'
  },
  {
    id: '3',
    name: 'Premium Holistic Care',
    description: 'Comprehensive care combining homecare and homeopathy services',
    services: [
      {
        serviceId: '6',
        serviceName: '24/7 Live-in Care',
        serviceType: 'homecare',
        category: 'Specialized',
        price: 15000, // ₹15,000 (200 USD * 75)
        duration: 1440,
        frequency: 'daily',
        isIncluded: true
      },
      {
        serviceId: '7',
        serviceName: 'Initial Consultation',
        serviceType: 'homeopathy',
        category: 'Consultation',
        price: 11250, // ₹11,250 (150 USD * 75)
        duration: 90,
        frequency: 'monthly',
        isIncluded: true
      },
      {
        serviceId: '8',
        serviceName: 'Follow-up Consultation',
        serviceType: 'homeopathy',
        category: 'Consultation',
        price: 6000, // ₹6,000 (80 USD * 75)
        duration: 45,
        frequency: 'weekly',
        isIncluded: true
      }
    ],
    duration: '24 hours',
    frequency: 'Daily with monthly consultations',
    totalCost: 485250.00, // ₹485,250 (6470 USD * 75)
    isCustom: false,
    createdAt: '2024-01-01T00:00:00Z',
    createdBy: 'admin',
    status: 'active'
  }
];

// Export dummy account data for easy access
export const mockPatients = dummyPatients;
export const mockEmployees = dummyEmployees;
export const mockCandidates = dummyCandidates;

// Updated mock shifts to reference our dummy accounts
export const updatedMockShifts: Shift[] = [
  {
    id: '1',
    employeeId: 'employee_001', // David Chen
    patientId: 'patient_001',   // Sarah Johnson
    patientName: 'Sarah Johnson',
    date: '2024-02-15',
    startTime: '08:00',
    endTime: '16:00',
    duration: 8,
    serviceType: 'Personal Care',
    status: 'confirmed',
    location: '123 Oak Street, Springfield, IL 62701',
    payment: 27000 // ₹27,000 (360 USD * 75)
  },
  {
    id: '2',
    employeeId: 'employee_002', // Maria Garcia
    patientId: 'patient_002',   // Robert Wilson
    patientName: 'Robert Wilson',
    date: '2024-02-16',
    startTime: '09:00',
    endTime: '17:00',
    duration: 8,
    serviceType: 'Comprehensive Care',
    status: 'confirmed',
    location: '456 Maple Avenue, Springfield, IL 62702',
    payment: 24000 // ₹24,000 (320 USD * 75)
  }
];

// Mock Patient Registrations
export const mockPatientRegistrations: PatientRegistration[] = [
  {
    id: 'reg_001',
    patientId: 'patient_001',
    referenceNumber: 'REF-2024-001',
    firstName: 'Sarah',
    lastName: 'Johnson',
    phone: '+1-555-0123',
    email: 'patient@ayuhclinic.com',
    address: '123 Oak Street, Springfield, IL 62701',
    selectedCarePlan: ['1', '2'], // Essential Care Package, Comprehensive Care Plus
    comments: 'Prefers morning appointments. Has mobility issues with stairs.',
    medicalCondition: 'Hypertension, Type 2 Diabetes, Arthritis',
    familyDoctor: 'Dr. Michael Thompson - Springfield Medical Center',
    emergencyContactNumber: '+1-555-0124',
    careNeeds: 'Personal care assistance, medication management, companionship services. Needs help with daily activities due to arthritis.',
    submittedAt: '2024-01-15T10:30:00Z',
    status: 'active'
  }
];

// Mock Invoices for Patient
export const mockPatientInvoices: Invoice[] = [
  {
    id: 'inv_001',
    patientId: 'patient_001',
    patientName: 'Sarah Johnson',
    amount: 90000.00, // ₹90,000 (1200 USD * 75)
    dueDate: '2024-02-28',
    status: 'paid',
    items: [
      {
        id: 'item_001',
        description: 'Essential Care Package - February 2024',
        quantity: 1,
        rate: 90000.00, // ₹90,000 (1200 USD * 75)
        amount: 1200.00
      }
    ],
    issuedDate: '2024-02-01',
    paidDate: '2024-02-15',
    paymentMethod: 'bank_transfer'
  },
  {
    id: 'inv_002',
    patientId: 'patient_001',
    patientName: 'Sarah Johnson',
    amount: 90000.00, // ₹90,000 (1200 USD * 75)
    dueDate: '2024-03-31',
    status: 'paid',
    items: [
      {
        id: 'item_002',
        description: 'Essential Care Package - March 2024',
        quantity: 1,
        rate: 90000.00, // ₹90,000 (1200 USD * 75)
        amount: 1200.00
      }
    ],
    issuedDate: '2024-03-01',
    paidDate: '2024-03-10',
    paymentMethod: 'card'
  },
  {
    id: 'inv_003',
    patientId: 'patient_001',
    patientName: 'Sarah Johnson',
    amount: 90000.00, // ₹90,000 (1200 USD * 75)
    dueDate: '2024-04-30',
    status: 'pending',
    items: [
      {
        id: 'item_003',
        description: 'Essential Care Package - April 2024',
        quantity: 1,
        rate: 90000.00, // ₹90,000 (1200 USD * 75)
        amount: 1200.00
      }
    ],
    issuedDate: '2024-04-01'
  }
];

// Mock Payment Records for Patient
export const mockPatientPayments: PaymentRecord[] = [
  {
    id: 'pay_001',
    patientId: 'patient_001',
    patientName: 'Sarah Johnson',
    invoiceId: 'inv_001',
    amount: 90000.00, // ₹90,000 (1200 USD * 75)
    paymentDate: '2024-02-15',
    paymentMethod: 'bank_transfer',
    status: 'completed',
    transactionId: 'TXN_20240215_001'
  },
  {
    id: 'pay_002',
    patientId: 'patient_001',
    patientName: 'Sarah Johnson',
    invoiceId: 'inv_002',
    amount: 90000.00, // ₹90,000 (1200 USD * 75)
    paymentDate: '2024-03-10',
    paymentMethod: 'card',
    status: 'completed',
    transactionId: 'TXN_20240310_001'
  },
  {
    id: 'pay_003',
    patientId: 'patient_001',
    patientName: 'Sarah Johnson',
    invoiceId: 'inv_001',
    amount: 6750.00, // ₹6,750 (90 USD * 75)
    paymentDate: '2024-01-20',
    paymentMethod: 'card',
    status: 'completed',
    transactionId: 'TXN_20240120_001'
  }
];

// Helper function to get all dummy data
export const getAllMockData = () => ({
  services: mockServices,
  appointments: mockAppointments,
  applications: mockApplications,
  shifts: updatedMockShifts,
  treatmentPlans: mockTreatmentPlans,
  caseStudies: mockCaseStudies,
  carePlans: mockCarePlans,
  patients: mockPatients,
  employees: mockEmployees,
  candidates: mockCandidates,
  patientRegistrations: mockPatientRegistrations,
  patientInvoices: mockPatientInvoices,
  patientPayments: mockPatientPayments
});