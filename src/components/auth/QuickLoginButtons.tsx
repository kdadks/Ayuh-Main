import React from 'react';
import { Button } from '../ui/Button';
import { authService } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface QuickLoginButtonsProps {
  onLogin?: (user: any) => void;
}

export const QuickLoginButtons: React.FC<QuickLoginButtonsProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the proper auth hook

  const quickLogin = async (email: string, role: string) => {
    try {
      console.log('Attempting quick login for:', email);
      const user = await login(email, 'password123'); // Use the hook's login method
      if (user) {
        console.log('Quick login successful:', user);
        onLogin?.(user);
        
        // Force navigation based on role
        const routes = {
          'patient': '/patient/dashboard',
          'employee': '/employee/dashboard',
          'candidate': '/candidate/dashboard',
          'admin': '/admin/dashboard',
          'homeopath': '/homeopath/dashboard',
          'caregiver': '/caregiver/dashboard'
        };

        const route = routes[role as keyof typeof routes] || '/';
        console.log('Navigating to:', route);
        
        // Force navigation with replace to ensure it works
        navigate(route, { replace: true });
        
        // Backup navigation attempt
        setTimeout(() => {
          window.location.href = route;
        }, 100);
        
      } else {
        console.error('Quick login failed for:', email);
        alert('Quick login failed. Please try again.');
      }
    } catch (error) {
      console.error('Quick login error:', error);
      alert('Login error occurred. Please check console.');
    }
  };

  const accounts = [
    { email: 'patient@ayuhclinic.com', role: 'patient', label: '🏥 Patient', color: 'bg-blue-500 hover:bg-blue-600' },
    { email: 'employee@ayuhclinic.com', role: 'employee', label: '👨‍⚕️ Employee', color: 'bg-green-500 hover:bg-green-600' },
    { email: 'candidate@ayuhclinic.com', role: 'candidate', label: '🎯 Candidate', color: 'bg-purple-500 hover:bg-purple-600' },
    { email: 'admin@ayuhclinic.com', role: 'admin', label: '👑 Admin', color: 'bg-red-500 hover:bg-red-600' },
    { email: 'homeopath@ayuhclinic.com', role: 'homeopath', label: '🌿 Homeopath', color: 'bg-emerald-500 hover:bg-emerald-600' },
    { email: 'caregiver@ayuhclinic.com', role: 'caregiver', label: '🤝 Caregiver', color: 'bg-orange-500 hover:bg-orange-600' }
  ];

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Login (Testing)</h3>
      <div className="grid grid-cols-2 gap-2">
        {accounts.map((account) => (
          <button
            key={account.role}
            onClick={() => quickLogin(account.email, account.role)}
            className={`${account.color} text-white text-xs px-3 py-2 rounded-md transition-colors`}
          >
            {account.label}
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-2">
        All accounts use password: <code className="bg-gray-200 px-1 rounded">password123</code>
      </p>
    </div>
  );
};

export default QuickLoginButtons;