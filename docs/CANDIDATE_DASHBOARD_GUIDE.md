# Candidate Dashboard Guide

## Overview

The Candidate Dashboard is a comprehensive portal for job applicants to submit their enrollment information, upload required documents, and track their application status with Ayuh Clinic.

## Features

### 1. Candidate Enrollment Form
- **Multi-step form** with progress tracking
- **Personal Information**: Name, email, phone, address, date of birth
- **Qualifications**: Education level and years of experience
- **Document Upload**: Resume and certificates
- **Form Validation**: Real-time validation with error messages
- **Auto-generated Reference Number**: Unique identifier for each application

### 2. Application Tracking
- **Reference Number**: Unique tracking ID assigned upon submission
- **Status Updates**: Real-time application status tracking
- **Progress Timeline**: Visual representation of application stages

### 3. Document Management
- **Resume Upload**: Required PDF/DOC/DOCX files
- **Certificate Upload**: Optional professional certifications
- **File Validation**: Format and size restrictions
- **Document Viewing**: View uploaded documents

### 4. Profile Management
- **View Profile**: Review submitted information
- **Application Summary**: Complete overview of application data

## How to Access

### For New Candidates
1. Visit `/candidate` or `/candidate/dashboard`
2. Complete the enrollment form step by step
3. Upload required documents
4. Receive unique reference number

### For Existing Users
1. Register as a "Candidate" role in the registration form
2. Access the dashboard at `/candidate/dashboard`

## Form Sections

### Step 1: Personal Information
- First Name (Required)
- Last Name (Required)
- Email Address (Required)
- Phone Number (Required)

### Step 2: Address & Details
- Full Address (Required)
- Date of Birth (Required, must be 18+ years)

### Step 3: Qualifications & Experience
- Highest Qualification (Required)
  - High School Diploma
  - Certificate Program
  - Associate Degree
  - Bachelor's Degree
  - Master's Degree
  - Doctoral Degree
  - Professional License
- Years of Experience (Optional)

### Step 4: Document Upload
- **Resume** (Required)
  - Formats: PDF, DOC, DOCX
  - Max size: 10MB
- **Certificates** (Optional)
  - Formats: PDF, DOC, DOCX, JPG, PNG
  - Max size: 10MB per file
  - Multiple files allowed

## Application Process

1. **Submission**: Complete enrollment form and upload documents
2. **Review**: Administrative team reviews application (3-5 business days)
3. **Interview**: Schedule interview if application meets requirements
4. **Decision**: Final hiring decision communicated via email

## Reference Number Format

Format: `CAND-YYYYMMDD-XXXX`
- YYYY: Year
- MM: Month
- DD: Day
- XXXX: Random 4-digit number

Example: `CAND-20240614-1234`

## Technical Implementation

### Components
- **CandidateDashboard**: Main dashboard with tabbed interface
- **CandidateEnrollmentForm**: Multi-step form with validation
- **Form Validation**: React Hook Form with custom validation rules
- **File Upload**: HTML5 file input with drag-and-drop support

### Routes
- `/candidate` - Main candidate portal
- `/candidate/dashboard` - Full dashboard interface

### User Role
- Added `candidate` to `UserRole` type
- Integrated with existing authentication system
- Registration form includes candidate option

## Data Structure

```typescript
interface CandidateData {
  referenceNumber: string;
  applicationStatus: 'pending' | 'reviewed' | 'approved' | 'rejected';
  submissionDate: string;
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    dateOfBirth: string;
    qualification: string;
    experience: number;
  };
  uploadedFiles: {
    resume: File[];
    certificates: File[];
  };
}
```

## Admin Integration

The candidate applications integrate with the existing admin dashboard:
- View all candidate applications in Admin > Candidate Management
- Review documents and conduct assessments
- Update application status
- Schedule interviews

## Future Enhancements

1. **Email Notifications**: Automated status update emails
2. **Interview Scheduling**: Calendar integration for interview booking
3. **Background Check Integration**: Automated verification process
4. **Skills Assessment**: Online skills testing capability
5. **Reference Checking**: Automated reference contact system

## Support

For technical issues or questions about the candidate portal, contact the development team or refer to the main project documentation.