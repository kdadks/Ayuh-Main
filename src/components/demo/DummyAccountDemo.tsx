import React, { useState } from 'react';
import { User } from '../../types';
import { authService } from '../../utils/auth';
import { accountCredentials } from '../../utils/dummyAccounts';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface DummyAccountDemoProps {
  onLogin?: (user: User) => void;
}

export const DummyAccountDemo: React.FC<DummyAccountDemoProps> = ({ onLogin }) => {
  const [selectedAccount, setSelectedAccount] = useState<string>('');
  const [loginResult, setLoginResult] = useState<string>('');

  const handleQuickLogin = async (role: keyof typeof accountCredentials) => {
    const credentials = accountCredentials[role];
    try {
      const user = await authService.login(credentials.email, credentials.password);
      if (user) {
        setLoginResult(`✅ Successfully logged in as ${user.firstName} ${user.lastName} (${user.role})`);
        onLogin?.(user);
      } else {
        setLoginResult('❌ Login failed');
      }
    } catch (error) {
      setLoginResult('❌ Login error occurred');
    }
  };

  const accountCards = Object.entries(accountCredentials).map(([role, info]) => (
    <Card key={role} className="p-4 border-2 hover:border-blue-300 transition-colors">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg capitalize flex items-center gap-2">
            {role === 'patient' && '🏥'} 
            {role === 'employee' && '👨‍⚕️'}
            {role === 'candidate' && '🎯'}
            {role === 'admin' && '👑'}
            {role === 'homeopath' && '🌿'}
            {role === 'caregiver' && '🤝'}
            {role} Account
          </h3>
          <Button
            onClick={() => handleQuickLogin(role as keyof typeof accountCredentials)}
            variant="primary"
            size="sm"
          >
            Quick Login
          </Button>
        </div>
        
        <div className="text-sm space-y-1">
          <div><strong>Email:</strong> <code className="bg-gray-100 px-1 rounded">{info.email}</code></div>
          <div><strong>Password:</strong> <code className="bg-gray-100 px-1 rounded">{info.password}</code></div>
          <div className="text-gray-600 text-xs mt-2">{info.description}</div>
        </div>
      </div>
    </Card>
  ));

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Dummy Account Demo</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Test different user roles and functionalities using these pre-configured dummy accounts. 
          Each account has specific permissions and access to different parts of the system.
        </p>
      </div>

      {loginResult && (
        <div className={`mb-6 p-4 rounded-lg ${
          loginResult.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {loginResult}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {accountCards}
      </div>

      <Card className="p-6 bg-blue-50 border-blue-200">
        <h2 className="font-semibold text-lg mb-3 text-blue-800">Quick Testing Guide</h2>
        <div className="space-y-3 text-sm">
          <div>
            <strong>🏥 Patient:</strong> View appointments, care plans, medical information
          </div>
          <div>
            <strong>👨‍⚕️ Employee:</strong> Manage shifts, update availability, confirm job arrivals
          </div>
          <div>
            <strong>🎯 Candidate:</strong> Complete enrollment, upload documents, track application status
          </div>
          <div>
            <strong>👑 Admin:</strong> Full system access, user management, reports and analytics
          </div>
          <div>
            <strong>🌿 Homeopath:</strong> Patient consultations, treatment plans, constitutional analysis
          </div>
          <div>
            <strong>🤝 Caregiver:</strong> Appointment management, patient interaction tracking
          </div>
        </div>
      </Card>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>⚠️ These are dummy accounts for testing purposes only</p>
        <p>All data is fictional and stored locally for demonstration</p>
      </div>
    </div>
  );
};

export default DummyAccountDemo;