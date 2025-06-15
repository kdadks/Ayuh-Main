# Role-Based Access Control (RBAC) System

## Overview

The Ayuh Clinic application now implements a comprehensive role-based access control system that ensures users can only access functionality appropriate to their role while maintaining public access to essential information pages.

## User Roles

### 1. Public User (Unauthenticated)
**Access Level**: Public pages only
**Available Functions**:
- Home page (`/`)
- About page (`/about`)
- Services page (`/services`)
- Blog and all blog posts (`/blog/*`)
- Contact page (`/contact`)
- Terms & Privacy pages (`/terms`, `/privacy`)
- Authentication pages (`/login`, `/register`)
- Admin portal access (`/admin`, `/admin/login`)

### 2. Patient Role
**Access Level**: Default functions + Patient dashboard
**Available Functions**:
- All public functions listed above
- Patient Dashboard (`/patient/dashboard`)
- Appointment management
- Care plan viewing
- Profile management
- Billing and payment information

**Demo Account**: `patient@ayuhclinic.com` / `password123`

### 3. Employee Role
**Access Level**: Default functions + Employee dashboard
**Available Functions**:
- All public functions listed above
- Employee Dashboard (`/employee/dashboard`)
- Shift management and scheduling
- Availability setting
- Job arrival confirmation
- Payment tracking
- Profile management

**Demo Account**: `employee@ayuhclinic.com` / `password123`

### 4. Candidate Role
**Access Level**: Default functions + Candidate dashboard
**Available Functions**:
- All public functions listed above
- Candidate Dashboard (`/candidate/dashboard`)
- Application form completion
- Document upload and management
- Application status tracking
- Profile management

**Demo Account**: `candidate@ayuhclinic.com` / `password123`

### 5. Admin Role
**Access Level**: Default functions + Admin dashboard
**Available Functions**:
- All public functions listed above
- Admin Dashboard (`/admin/dashboard`)
- User management (activate/deactivate users)
- Employee management
- Candidate management and approval
- Patient management
- Shift assignment and monitoring
- Revenue and payment management
- System analytics and reporting

**Demo Account**: `admin@ayuhclinic.com` / `password123`

### 6. Caregiver Role (Future Implementation)
**Access Level**: Default functions + Caregiver dashboard
**Available Functions**:
- All public functions listed above
- Caregiver Dashboard (`/caregiver/dashboard`) - Coming Soon
- Patient care management
- Schedule management
- Profile management

**Demo Account**: `caregiver@ayuhclinic.com` / `password123`

### 7. Homeopath Role (Future Implementation)
**Access Level**: Default functions + Homeopath dashboard
**Available Functions**:
- All public functions listed above
- Homeopath Dashboard (`/homeopath/dashboard`) - Coming Soon
- Patient treatment management
- Appointment scheduling
- Profile management

**Demo Account**: `homeopath@ayuhclinic.com` / `password123`

## Implementation Details

### Route Protection
- **ProtectedRoute Component**: Handles authentication and role-based access control
- **Public Routes**: Accessible without authentication
- **Protected Routes**: Require authentication and specific roles
- **Role Validation**: Automatic redirection to appropriate dashboard if user tries to access unauthorized areas

### Authentication Flow
1. **Login**: User credentials validated against mock user database
2. **Role Detection**: System identifies user role and redirects to appropriate dashboard
3. **Session Management**: User session maintained in localStorage
4. **Automatic Routing**: Users are automatically directed to their role-specific areas

### Security Features
- **Route Guards**: Prevent unauthorized access to protected areas
- **Role Validation**: Ensure users can only access functions for their assigned role
- **Automatic Redirection**: Invalid access attempts redirect to appropriate areas
- **Session Validation**: Check authentication status on route changes

## File Structure

```
src/
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.tsx          # Route protection component
│   ├── navigation/
│   │   └── RoleBasedNavigation.tsx     # Role-based navigation helper
│   └── layout/
│       └── Header.tsx                  # Updated with role-based routing
├── pages/
│   ├── admin/
│   │   └── Dashboard.tsx               # Admin dashboard
│   ├── employee/
│   │   └── Dashboard.tsx               # Employee dashboard
│   ├── candidate/
│   │   └── Dashboard.tsx               # Candidate dashboard
│   ├── patient/
│   │   └── Dashboard.tsx               # Patient dashboard
│   └── auth/
│       ├── Login.tsx                   # Updated with role routing
│       └── Register.tsx                # Role selection during registration
├── hooks/
│   └── useAuth.ts                      # Authentication hook
├── utils/
│   └── auth.ts                         # Authentication service with mock users
└── types/
    └── index.ts                        # TypeScript definitions including UserRole
```

## Usage Examples

### Accessing Role-Specific Features
```typescript
import { useAuth } from '../hooks/useAuth';

function MyComponent() {
  const { user, hasRole } = useAuth();
  
  if (hasRole('admin')) {
    // Show admin-specific content
  }
  
  if (hasRole('patient')) {
    // Show patient-specific content
  }
}
```

### Protected Route Usage
```typescript
<Route path="/admin/dashboard" element={
  <ProtectedRoute allowedRoles={['admin']}>
    <AdminDashboard />
  </ProtectedRoute>
} />
```

## Testing the System

1. **Public Access**: Visit any public page without logging in
2. **Role-Based Access**: 
   - Log in with different demo accounts
   - Verify each role has access to appropriate functions
   - Try accessing unauthorized areas (should redirect)
3. **Navigation**: Check that navigation items change based on user role
4. **Dashboard Access**: Ensure each role lands on the correct dashboard

## Future Enhancements

1. **Granular Permissions**: Add fine-grained permissions within roles
2. **Role Hierarchy**: Implement role inheritance (e.g., admin can access all functions)
3. **Dynamic Role Assignment**: Allow runtime role changes
4. **Audit Logging**: Track user access and actions
5. **Multi-Role Support**: Allow users to have multiple roles
6. **Complete Caregiver/Homeopath Dashboards**: Implement full functionality for these roles

## Security Considerations

- All sensitive routes are protected
- User roles are validated on both frontend and should be validated on backend
- Session management prevents unauthorized access
- Automatic logout on role changes or security violations
- Demo accounts are clearly marked and should be disabled in production

This RBAC system provides a solid foundation for managing user access across the Ayuh Clinic application while maintaining flexibility for future enhancements.