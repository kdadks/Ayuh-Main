# Dummy Accounts Guide

This guide provides comprehensive information about the dummy accounts created for testing different user roles and functionalities within the Ayuh Healthcare System.

## Available Dummy Accounts

### 🏥 Patient Account
- **Email**: `patient@ayuhclinic.com`
- **Password**: `password123`
- **Role**: Patient
- **Profile**: Sarah Johnson (Age: 79)

**Features to Test**:
- View and manage appointments
- Access care plans and treatment history
- Update personal medical information
- View homeopathy profiles and treatments
- Emergency contact management
- Medical condition tracking

**Sample Data Included**:
- Medical conditions: Hypertension, Type 2 Diabetes, Arthritis
- Allergies: Penicillin, Shellfish
- Current medications: Lisinopril 10mg, Metformin 500mg
- Homeopathy constitution: Calcarea Carbonica

---

### 👨‍⚕️ Employee Account
- **Email**: `employee@ayuhclinic.com`
- **Password**: `password123`
- **Role**: Employee/Caregiver
- **Profile**: David Chen (CNA, 5+ years experience)

**Features to Test**:
- View assigned shifts and schedules
- Update availability (Monday-Friday, 8 AM - 4 PM)
- Confirm job arrivals with location and photos
- Manage personal information and certifications
- View patient care instructions
- Track payment information

**Sample Data Included**:
- Hourly rate: ₹45/hour
- Certifications: CNA, CPR/First Aid, Alzheimer's Care Training
- Skills: Personal Care, Medication Management, Mobility Assistance
- Available: Monday-Friday (8:00 AM - 4:00 PM)

---

### 🎯 Candidate Account
- **Email**: `candidate@ayuhclinic.com`
- **Password**: `password123`
- **Role**: Job Candidate
- **Profile**: Emma Rodriguez (3 years experience)

**Features to Test**:
- Complete candidate enrollment forms
- Upload required documents (certificates, background checks)
- Track application status
- View interview assessments
- Monitor police verification status
- Update personal qualifications

**Sample Data Included**:
- Status: Approved
- Experience: 3 years
- Interview rating: 4.5/5
- Police verification: Verified
- Documents: CNA Certificate, CPR Certification, Background Check

---

### 👑 Admin Account
- **Email**: `admin@ayuhclinic.com`
- **Password**: `password123`
- **Role**: System Administrator
- **Profile**: Jennifer Williams (System Admin)

**Features to Test**:
- User management (view all users across roles)
- Employee management and scheduling
- Patient management and care plans
- Candidate review and approval process
- Revenue and financial management
- Shift management and assignments
- System-wide reporting and analytics

**Administrative Capabilities**:
- Full access to all system modules
- User role management
- Data export and reporting
- System configuration
- Audit trail viewing

---

### 🌿 Homeopath Account
- **Email**: `homeopath@ayuhclinic.com`
- **Password**: `password123`
- **Role**: Homeopath/Doctor
- **Profile**: Dr. Michael Thompson

**Features to Test**:
- Patient consultation management
- Treatment plan creation
- Remedy prescription and tracking
- Constitutional analysis
- Follow-up scheduling
- Case study documentation

---

### 🤝 Caregiver Account
- **Email**: `caregiver@ayuhclinic.com`
- **Password**: `password123`
- **Role**: Caregiver
- **Profile**: Maria Garcia

**Features to Test**:
- Appointment management
- Patient interaction tracking
- Service delivery confirmation
- Schedule coordination

## How to Access Different Dashboards

### 1. Patient Dashboard
Login with patient credentials to access:
- `/patient/dashboard`
- Personal health information
- Appointment scheduling
- Care plan viewing
- Medical history

### 2. Employee Dashboard
Login with employee credentials to access:
- `/employee/dashboard`
- Shift management
- Availability updates
- Job arrival confirmations
- Payment tracking

### 3. Candidate Dashboard
Login with candidate credentials to access:
- `/candidate/dashboard`
- Enrollment form completion
- Document uploads
- Application status tracking
- Interview feedback

### 4. Admin Portal
Login with admin credentials to access:
- `/admin/dashboard`
- Complete system overview
- User management interfaces
- Financial reporting
- Operational analytics

## Testing Scenarios

### Patient Scenarios
1. **New Patient Onboarding**: Test registration and profile setup
2. **Appointment Booking**: Schedule homecare or homeopathy appointments
3. **Medical Information Updates**: Update conditions, medications, allergies
4. **Emergency Contact Management**: Add/edit emergency contacts
5. **Care Plan Review**: View assigned care plans and services

### Employee Scenarios
1. **Shift Management**: View upcoming shifts and accept/decline assignments
2. **Availability Updates**: Modify weekly availability schedule
3. **Job Arrival**: Confirm arrival at patient locations with photos
4. **Patient Care**: Access patient care instructions and special notes
5. **Payment Tracking**: View completed shifts and payment information

### Candidate Scenarios
1. **Application Submission**: Complete initial candidate enrollment
2. **Document Upload**: Submit required certifications and documents
3. **Interview Process**: View interview feedback and ratings
4. **Status Tracking**: Monitor application progress through approval stages
5. **Profile Updates**: Update qualifications and experience

### Admin Scenarios
1. **User Management**: Add, edit, deactivate user accounts
2. **Candidate Review**: Review and approve/reject candidate applications
3. **Shift Assignment**: Assign employees to patient shifts
4. **Revenue Analysis**: View financial reports and payment tracking
5. **System Monitoring**: Oversee all system activities and user interactions

## Additional Test Data

### Sample Shifts
- Patient: Sarah Johnson
- Employee: David Chen
- Date: Today + 1 day
- Time: 8:00 AM - 4:00 PM
- Service: Personal Care Assistance
- Payment: ₹360

### Sample Care Plans
- Essential Care Package (₹1,200/month)
- Comprehensive Care Plus (₹2,500/month)
- Premium Holistic Care (₹6,470/month)

### Sample Documents
All candidate accounts include sample documents for testing:
- Professional certificates
- Background check results
- Police verification documents
- Training completion certificates

## Security Notes

⚠️ **Important**: These are dummy accounts for development and testing purposes only.

- All passwords are set to `password123` for convenience
- Do not use these credentials in production environments
- Personal information is fictional and for testing only
- File uploads and documents are mock data

## Troubleshooting

### Login Issues
- Ensure you're using the correct email format
- Password is case-sensitive: `password123`
- Clear browser cache if experiencing issues

### Role-Based Access
- Each role has specific page restrictions
- Admin account has the broadest access
- Patient/Employee/Candidate accounts have role-specific limitations

### Data Persistence
- Changes made during testing are stored in localStorage
- Refresh the page to reset to default dummy data
- Data does not persist between browser sessions

## Support

For issues with dummy accounts or testing scenarios, refer to:
- Main documentation in `/docs/`
- Role-specific guides for detailed feature explanations
- Component documentation for UI-specific issues