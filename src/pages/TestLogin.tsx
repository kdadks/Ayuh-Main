import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export function TestLogin() {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { login, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testAccount = async (email: string, role: string) => {
    setLoading(true);
    try {
      addResult(`Testing ${role} account: ${email}`);
      
      const result = await login(email, 'password123');
      
      if (result) {
        addResult(`✅ ${role} login successful: ${result.firstName} ${result.lastName}`);
        addResult(`User role: ${result.role}, ID: ${result.id}`);
        
        // Navigate to dashboard
        const routes = {
          'patient': '/patient/dashboard',
          'employee': '/employee/dashboard',
          'candidate': '/candidate/dashboard', 
          'admin': '/admin/dashboard',
          'homeopath': '/homeopath/dashboard',
          'caregiver': '/caregiver/dashboard'
        };
        
        const route = routes[role as keyof typeof routes];
        if (route) {
          addResult(`Navigating to: ${route}`);
          navigate(route);
        }
      } else {
        addResult(`❌ ${role} login failed`);
      }
    } catch (error) {
      addResult(`💥 ${role} login error: ${error}`);
    }
    setLoading(false);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  const accounts = [
    { email: 'admin@ayuhclinic.com', role: 'admin' },
    { email: 'patient@ayuhclinic.com', role: 'patient' },
    { email: 'employee@ayuhclinic.com', role: 'employee' },
    { email: 'candidate@ayuhclinic.com', role: 'candidate' },
    { email: 'homeopath@ayuhclinic.com', role: 'homeopath' },
    { email: 'caregiver@ayuhclinic.com', role: 'caregiver' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Login Testing Page</h1>
        
        {/* Current Auth Status */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Current Authentication Status</h2>
          <div className="space-y-2">
            <p><strong>Authenticated:</strong> {isAuthenticated ? '✅ Yes' : '❌ No'}</p>
            <p><strong>Current User:</strong> {user ? `${user.firstName} ${user.lastName} (${user.role})` : 'None'}</p>
            <p><strong>User ID:</strong> {user?.id || 'None'}</p>
            <p><strong>Email:</strong> {user?.email || 'None'}</p>
          </div>
        </Card>

        {/* Test Buttons */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Dummy Accounts</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            {accounts.map((account) => (
              <Button
                key={account.role}
                onClick={() => testAccount(account.email, account.role)}
                disabled={loading}
                variant="primary"
                className="text-sm"
              >
                Test {account.role}
              </Button>
            ))}
          </div>
          <div className="flex gap-4">
            <Button onClick={clearResults} variant="secondary">
              Clear Results
            </Button>
            <Button onClick={() => navigate('/auth/login')} variant="primary">
              Go to Login Page
            </Button>
          </div>
        </Card>

        {/* Test Results */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Test Results</h2>
          {testResults.length === 0 ? (
            <p className="text-gray-500">No tests run yet. Click a test button above.</p>
          ) : (
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg max-h-96 overflow-y-auto">
              <pre className="text-sm">
                {testResults.map((result, index) => (
                  <div key={index}>{result}</div>
                ))}
              </pre>
            </div>
          )}
        </Card>

        {/* Quick Actions */}
        <Card className="p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Current URL:</strong> {window.location.href}</p>
            <p><strong>Browser Console:</strong> Open F12 and check for errors</p>
            <p><strong>Local Storage:</strong> Check Application tab for 'currentUser'</p>
            <div className="mt-4">
              <Button 
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                variant="secondary"
                size="sm"
              >
                Clear Storage & Reload
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}