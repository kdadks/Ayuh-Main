import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
  Home, 
  User, 
  Calendar, 
  FileText, 
  Settings, 
  Users, 
  Briefcase, 
  Heart,
  DollarSign,
  Building,
  Phone,
  Info,
  BookOpen
} from 'lucide-react';

interface NavigationItem {
  label: string;
  path: string;
  icon: React.ElementType;
  roles?: string[];
  isPublic?: boolean;
}

const navigationItems: NavigationItem[] = [
  // Public navigation items
  { label: 'Home', path: '/', icon: Home, isPublic: true },
  { label: 'About', path: '/about', icon: Info, isPublic: true },
  { label: 'Services', path: '/services', icon: Building, isPublic: true },
  { label: 'Blog', path: '/blog', icon: BookOpen, isPublic: true },
  { label: 'Contact', path: '/contact', icon: Phone, isPublic: true },

  // Role-based navigation items
  { label: 'Dashboard', path: '/patient/dashboard', icon: Home, roles: ['patient'] },
  { label: 'My Appointments', path: '/patient/appointments', icon: Calendar, roles: ['patient'] },
  { label: 'Care Plan', path: '/patient/care-plan', icon: FileText, roles: ['patient'] },
  { label: 'Profile', path: '/patient/profile', icon: User, roles: ['patient'] },

  { label: 'Dashboard', path: '/employee/dashboard', icon: Home, roles: ['employee'] },
  { label: 'My Shifts', path: '/employee/shifts', icon: Calendar, roles: ['employee'] },
  { label: 'Availability', path: '/employee/availability', icon: Settings, roles: ['employee'] },
  { label: 'Profile', path: '/employee/profile', icon: User, roles: ['employee'] },

  { label: 'Dashboard', path: '/candidate/dashboard', icon: Home, roles: ['candidate'] },
  { label: 'Application', path: '/candidate/application', icon: FileText, roles: ['candidate'] },
  { label: 'Documents', path: '/candidate/documents', icon: Briefcase, roles: ['candidate'] },
  { label: 'Profile', path: '/candidate/profile', icon: User, roles: ['candidate'] },

  { label: 'Dashboard', path: '/admin/dashboard', icon: Home, roles: ['admin'] },
  { label: 'User Management', path: '/admin/users', icon: Users, roles: ['admin'] },
  { label: 'Employee Management', path: '/admin/employees', icon: User, roles: ['admin'] },
  { label: 'Candidate Management', path: '/admin/candidates', icon: Briefcase, roles: ['admin'] },
  { label: 'Patient Management', path: '/admin/patients', icon: Heart, roles: ['admin'] },
  { label: 'Revenue Management', path: '/admin/revenue', icon: DollarSign, roles: ['admin'] },

  { label: 'Dashboard', path: '/caregiver/dashboard', icon: Home, roles: ['caregiver'] },
  { label: 'My Patients', path: '/caregiver/patients', icon: Heart, roles: ['caregiver'] },
  { label: 'Schedule', path: '/caregiver/schedule', icon: Calendar, roles: ['caregiver'] },
  { label: 'Profile', path: '/caregiver/profile', icon: User, roles: ['caregiver'] },

  { label: 'Dashboard', path: '/homeopath/dashboard', icon: Home, roles: ['homeopath'] },
  { label: 'Patients', path: '/homeopath/patients', icon: Heart, roles: ['homeopath'] },
  { label: 'Appointments', path: '/homeopath/appointments', icon: Calendar, roles: ['homeopath'] },
  { label: 'Profile', path: '/homeopath/profile', icon: User, roles: ['homeopath'] },
];

export function RoleBasedNavigation({ className = '' }: { className?: string }) {
  const { user, isAuthenticated } = useAuth();

  const getVisibleItems = () => {
    if (!isAuthenticated || !user) {
      return navigationItems.filter(item => item.isPublic);
    }

    const publicItems = navigationItems.filter(item => item.isPublic);
    const roleItems = navigationItems.filter(item => 
      item.roles && item.roles.includes(user.role)
    );

    return [...publicItems, ...roleItems];
  };

  const visibleItems = getVisibleItems();

  return (
    <nav className={className}>
      <div className="flex flex-col space-y-2">
        {visibleItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            <item.icon className="h-4 w-4 mr-3" />
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function getDefaultFunctions() {
  return [
    { label: 'Home', path: '/', icon: Home },
    { label: 'About', path: '/about', icon: Info },
    { label: 'Services', path: '/services', icon: Building },
    { label: 'Blog', path: '/blog', icon: BookOpen },
    { label: 'Contact', path: '/contact', icon: Phone },
  ];
}

export function getRoleFunctions(role: string) {
  const roleFunctions: Record<string, Array<{ label: string; path: string; icon: React.ElementType }>> = {
    patient: [
      { label: 'Dashboard', path: '/patient/dashboard', icon: Home },
      { label: 'My Appointments', path: '/patient/appointments', icon: Calendar },
      { label: 'Care Plan', path: '/patient/care-plan', icon: FileText },
      { label: 'Profile', path: '/patient/profile', icon: User },
    ],
    employee: [
      { label: 'Dashboard', path: '/employee/dashboard', icon: Home },
      { label: 'My Shifts', path: '/employee/shifts', icon: Calendar },
      { label: 'Availability', path: '/employee/availability', icon: Settings },
      { label: 'Profile', path: '/employee/profile', icon: User },
    ],
    candidate: [
      { label: 'Dashboard', path: '/candidate/dashboard', icon: Home },
      { label: 'Application', path: '/candidate/application', icon: FileText },
      { label: 'Documents', path: '/candidate/documents', icon: Briefcase },
      { label: 'Profile', path: '/candidate/profile', icon: User },
    ],
    admin: [
      { label: 'Dashboard', path: '/admin/dashboard', icon: Home },
      { label: 'User Management', path: '/admin/users', icon: Users },
      { label: 'Employee Management', path: '/admin/employees', icon: User },
      { label: 'Candidate Management', path: '/admin/candidates', icon: Briefcase },
      { label: 'Patient Management', path: '/admin/patients', icon: Heart },
      { label: 'Revenue Management', path: '/admin/revenue', icon: DollarSign },
    ],
    caregiver: [
      { label: 'Dashboard', path: '/caregiver/dashboard', icon: Home },
      { label: 'My Patients', path: '/caregiver/patients', icon: Heart },
      { label: 'Schedule', path: '/caregiver/schedule', icon: Calendar },
      { label: 'Profile', path: '/caregiver/profile', icon: User },
    ],
    homeopath: [
      { label: 'Dashboard', path: '/homeopath/dashboard', icon: Home },
      { label: 'Patients', path: '/homeopath/patients', icon: Heart },
      { label: 'Appointments', path: '/homeopath/appointments', icon: Calendar },
      { label: 'Profile', path: '/homeopath/profile', icon: User },
    ],
  };

  return roleFunctions[role] || [];
}