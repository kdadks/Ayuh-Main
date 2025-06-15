# Troubleshooting Dummy Accounts

If the dummy account login credentials are not working, follow these steps to diagnose and fix the issue.

## Quick Verification Steps

### 1. Browser Console Check
Open your browser's developer tools (F12) and run these commands in the console:

```javascript
// Check if authService is available
console.log('AuthService:', window.authService);

// List all available users
console.log('Available users:', window.authService.getAvailableUsers());

// Test a specific credential
window.authService.verifyCredentials('admin@ayuhclinic.com', 'password123');

// Try manual login
window.authService.login('admin@ayuhclinic.com', 'password123').then(user => {
  console.log('Manual login result:', user);
});
```

### 2. Available Credentials
These are the exact credentials that should work:

| Email | Password | Role |
|-------|----------|------|
| `admin@ayuhclinic.com` | `password123` | admin |
| `patient@ayuhclinic.com` | `password123` | patient |
| `employee@ayuhclinic.com` | `password123` | employee |
| `candidate@ayuhclinic.com` | `password123` | candidate |
| `homeopath@ayuhclinic.com` | `password123` | homeopath |
| `caregiver@ayuhclinic.com` | `password123` | caregiver |

### 3. Quick Login Buttons
The login page now includes "Quick Login" buttons for each role. Use these for instant testing without typing credentials.

## Common Issues & Solutions

### Issue 1: "Invalid email or password" error
**Cause**: Case sensitivity or extra spaces in email/password

**Solution**: 
- Ensure email is exactly as listed (lowercase)
- Password is exactly `password123` (case sensitive)
- No extra spaces before or after credentials

### Issue 2: Authentication service not loading
**Cause**: Service initialization issue

**Solution**:
```javascript
// Force reload the auth service
import { authService } from './src/utils/auth';
console.log('Auth service users:', authService.getAvailableUsers());
```

### Issue 3: Page not redirecting after login
**Cause**: Route protection or navigation issue

**Solution**:
- Check browser console for navigation errors
- Verify the dashboard routes exist for each role
- Clear localStorage: `localStorage.clear()`

### Issue 4: Form validation preventing login
**Cause**: Client-side validation blocking submission

**Solution**:
- Use the Quick Login buttons instead of the form
- Check browser console for form validation errors
- Ensure email format is valid

## Debugging Tools

### 1. Authentication Test Function
```javascript
// Run this in browser console to test all accounts
import('./src/utils/authTest').then(module => {
  module.testAllDummyAccounts();
});
```

### 2. Manual Account Verification
```javascript
// Check specific account
window.authService.login('admin@ayuhclinic.com', 'password123').then(result => {
  if (result) {
    console.log('✅ Login successful:', result);
  } else {
    console.log('❌ Login failed');
  }
});
```

### 3. Clear Authentication State
```javascript
// Reset authentication state
window.authService.logout();
localStorage.removeItem('currentUser');
location.reload();
```

## Advanced Troubleshooting

### Check Network Tab
1. Open Developer Tools → Network tab
2. Attempt login
3. Look for any failed API calls or errors

### Verify Service Worker
1. Open Developer Tools → Application tab
2. Check Service Workers section
3. Clear any cached data

### Check Local Storage
1. Open Developer Tools → Application tab
2. Look at Local Storage
3. Verify `currentUser` is set after successful login

## Quick Fix Commands

Run these in the browser console for quick fixes:

```javascript
// 1. Force refresh auth service
window.location.reload();

// 2. Clear all stored data
localStorage.clear();
sessionStorage.clear();

// 3. Test admin login directly
window.authService.login('admin@ayuhclinic.com', 'password123').then(user => {
  if (user) {
    console.log('Admin login works!', user);
    window.location.href = '/admin/dashboard';
  }
});

// 4. List all available user emails
window.authService.getAvailableUsers().forEach(user => {
  console.log(`${user.role}: ${user.email}`);
});
```

## Contact Support

If none of these solutions work:

1. **Check browser compatibility**: Ensure you're using a modern browser
2. **Clear cache completely**: Hard refresh (Ctrl+F5) or incognito mode
3. **Check JavaScript errors**: Look for any console errors blocking execution
4. **Verify file changes**: Ensure all the dummy account files were properly created

## Success Indicators

You'll know the dummy accounts are working when:

✅ Quick Login buttons successfully log you in  
✅ Manual form login with credentials works  
✅ Console shows no authentication errors  
✅ User is redirected to appropriate dashboard  
✅ User information is stored in localStorage  

## File Checklist

Ensure these files exist and contain the dummy account data:

- ✅ `src/utils/auth.ts` - Updated with new user accounts
- ✅ `src/utils/dummyAccounts.ts` - Comprehensive account data
- ✅ `src/components/auth/QuickLoginButtons.tsx` - Quick login component
- ✅ `src/utils/authTest.ts` - Testing utilities
- ✅ `src/pages/auth/Login.tsx` - Updated with quick login buttons

---

**Last Updated**: When dummy accounts were implemented  
**Status**: All 6 dummy accounts should be fully functional