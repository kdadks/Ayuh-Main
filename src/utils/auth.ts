import { User, UserRole } from '../types';

// Mock authentication service
class AuthService {
  private currentUser: User | null = null;

  // Mock users for demonstration
  private mockUsers: User[] = [
    {
      id: '1',
      email: 'patient@ayuhclinic.com',
      firstName: 'Sarah',
      lastName: 'Johnson',
      role: 'patient',
      isActive: true,
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      email: 'caregiver@ayuhclinic.com',
      firstName: 'Maria',
      lastName: 'Garcia',
      role: 'caregiver',
      isActive: true,
      createdAt: '2024-01-10T08:15:00Z'
    },
    {
      id: '3',
      email: 'employee@ayuhclinic.com',
      firstName: 'David',
      lastName: 'Chen',
      role: 'employee',
      isActive: true,
      createdAt: '2024-01-05T14:45:00Z'
    },
    {
      id: '4',
      email: 'admin@ayuhclinic.com',
      firstName: 'Jennifer',
      lastName: 'Williams',
      role: 'admin',
      isActive: true,
      createdAt: '2024-01-01T09:00:00Z'
    },
    {
      id: '5',
      email: 'homeopath@ayuhclinic.com',
      firstName: 'Dr. Michael',
      lastName: 'Thompson',
      role: 'homeopath',
      isActive: true,
      createdAt: '2024-01-01T09:00:00Z'
    }
  ];

  async login(email: string, password: string): Promise<User | null> {
    // Mock authentication logic
    const user = this.mockUsers.find(u => u.email === email);
    if (user && password === 'password123') {
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
}

export const authService = new AuthService();