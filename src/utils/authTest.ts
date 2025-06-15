import { authService } from './auth';

// Test function to verify all dummy accounts work
export const testAllDummyAccounts = async () => {
  const accounts = [
    { email: 'patient@ayuhclinic.com', role: 'patient' },
    { email: 'employee@ayuhclinic.com', role: 'employee' },
    { email: 'candidate@ayuhclinic.com', role: 'candidate' },
    { email: 'admin@ayuhclinic.com', role: 'admin' },
    { email: 'homeopath@ayuhclinic.com', role: 'homeopath' },
    { email: 'caregiver@ayuhclinic.com', role: 'caregiver' }
  ];

  console.log('=== Testing All Dummy Accounts ===');
  
  for (const account of accounts) {
    try {
      const user = await authService.login(account.email, 'password123');
      if (user) {
        console.log(`✅ ${account.role.toUpperCase()} LOGIN SUCCESS:`, {
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          role: user.role,
          id: user.id
        });
        authService.logout(); // Logout after each test
      } else {
        console.log(`❌ ${account.role.toUpperCase()} LOGIN FAILED:`, account.email);
      }
    } catch (error) {
      console.log(`💥 ${account.role.toUpperCase()} LOGIN ERROR:`, error);
    }
  }
  
  console.log('=== Test Complete ===');
};

// Test function to verify specific account
export const testSingleAccount = async (email: string, password: string = 'password123') => {
  console.log(`Testing login for: ${email}`);
  try {
    const user = await authService.login(email, password);
    if (user) {
      console.log('✅ Login successful:', user);
      return user;
    } else {
      console.log('❌ Login failed');
      return null;
    }
  } catch (error) {
    console.log('💥 Login error:', error);
    return null;
  }
};

// Run tests automatically in development
if (process.env.NODE_ENV === 'development') {
  // Test all accounts after a short delay to ensure auth service is ready
  setTimeout(() => {
    testAllDummyAccounts();
  }, 1000);
}