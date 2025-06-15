import { User, UserRole, Patient, Employee, Candidate } from '../types';

// Mock authentication service
class AuthService {
  private currentUser: User | null = null;

  // Enhanced mock users with comprehensive profiles for testing
  private mockUsers: User[] = [
    // PATIENT ACCOUNT
    {
      id: 'patient_001',
      email: 'patient@ayuhclinic.com',
      firstName: 'Sarah',
      lastName: 'Johnson',
      role: 'patient',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      isActive: true,
      createdAt: '2024-01-15T10:30:00Z'
    },
    // EMPLOYEE ACCOUNT
    {
      id: 'employee_001',
      email: 'employee@ayuhclinic.com',
      firstName: 'David',
      lastName: 'Chen',
      role: 'employee',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      isActive: true,
      createdAt: '2024-01-05T14:45:00Z'
    },
    // CANDIDATE ACCOUNT
    {
      id: 'candidate_001',
      email: 'candidate@ayuhclinic.com',
      firstName: 'Emma',
      lastName: 'Rodriguez',
      role: 'candidate',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      isActive: true,
      createdAt: '2024-01-03T12:30:00Z'
    },
    // ADMIN ACCOUNT
    {
      id: 'admin_001',
      email: 'admin@ayuhclinic.com',
      firstName: 'Jennifer',
      lastName: 'Williams',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      isActive: true,
      createdAt: '2024-01-01T09:00:00Z'
    },
    // HOMEOPATH ACCOUNT (for additional testing)
    {
      id: 'homeopath_001',
      email: 'homeopath@ayuhclinic.com',
      firstName: 'Dr. Michael',
      lastName: 'Thompson',
      role: 'homeopath',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      isActive: true,
      createdAt: '2024-01-01T09:00:00Z'
    },
    // CAREGIVER ACCOUNT (for additional testing)
    {
      id: 'caregiver_001',
      email: 'caregiver@ayuhclinic.com',
      firstName: 'Maria',
      lastName: 'Garcia',
      role: 'caregiver',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      isActive: true,
      createdAt: '2024-01-10T08:15:00Z'
    }
  ];

  async login(email: string, password: string): Promise<User | null> {
    // Mock authentication logic
    const user = this.mockUsers.find(u => u.email?.toLowerCase() === email?.toLowerCase());
    
    if (user && user.isActive && password === 'password123') {
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    }
    
    return null;
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    if (!this.currentUser) {
      const stored = localStorage.getItem('currentUser');
      if (stored) {
        this.currentUser = JSON.parse(stored);
      }
    }
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  hasRole(role: UserRole): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  async register(userData: Partial<User>, password: string): Promise<User> {
    // Mock registration
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: userData.email!,
      firstName: userData.firstName!,
      lastName: userData.lastName!,
      role: userData.role!,
      isActive: true,
      createdAt: new Date().toISOString()
    };
    
    this.mockUsers.push(newUser);
    return newUser;
  }
  // Helper method to get all available users (for debugging)
  getAvailableUsers(): User[] {
    return this.mockUsers;
  }

  // Helper method to verify credentials (for debugging)
  verifyCredentials(email: string, password: string): boolean {
    const user = this.mockUsers.find(u => u.email?.toLowerCase() === email?.toLowerCase());
    return !!(user && user.isActive && password === 'password123');
  }
}

export const authService = new AuthService();

// Make authService available globally for debugging
if (typeof window !== 'undefined') {
  (window as any).authService = authService;
}