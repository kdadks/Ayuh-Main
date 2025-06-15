# Employee Availability by Location Feature

## Overview
The Employee Availability by Location feature provides administrators with a comprehensive view of all active employees and their availability, organized by location, to facilitate efficient shift assignment.

## Key Features

### 1. Location-Based Employee Grouping
- Employees are automatically grouped by their current location (area and city)
- Shows distance from shift location for optimal assignment
- Displays employee count per location

### 2. Real-Time Availability Status
- **Available**: Employee is ready for new shift assignments
- **Busy**: Employee is currently assigned to shifts
- **Off-Duty**: Employee is not available for work

### 3. Comprehensive Employee Information
- **Personal Details**: Name, Employee ID, contact information
- **Skills & Certifications**: Relevant qualifications for different service types
- **Performance Metrics**: Star rating and completed shift count
- **Today's Schedule**: Current availability and time slots
- **Weekly Hours**: Total hours available per week

### 4. Smart Shift Compatibility Checking
When assigning a shift, the system automatically evaluates:
- **Skills Match**: Does the employee have required skills for the service type?
- **Time Availability**: Is the employee available during the shift time?
- **Current Status**: Is the employee currently available for assignment?

### 5. Advanced Filtering & Search
- **Search**: Find employees by name or ID
- **Skill Filter**: Filter by specific skills or certifications
- **Location Filter**: Filter by area or city
- **Status Filter**: Filter by availability status
- **Sort Options**: Sort by distance, rating, or experience

## How to Use

### Accessing the Feature
1. Navigate to **Admin Dashboard** → **Shift Management**
2. Click the **"Employee Availability"** button in the header
3. The employee availability view will display below the shift list

### Assigning Shifts
1. **From Shift List**: Click "Assign" or "Reassign" on any shift
2. **From Employee View**: Click "Employee Availability" then select employees
3. The system will highlight compatible employees in green
4. Click on an employee card to assign them to the selected shift

### Viewing Employee Details
Each employee card displays:
- Current availability status with color coding
- Distance from shift location (if shift is selected)
- Skills and certifications (first 3 shown, "+X more" for additional)
- Today's availability time slots
- Contact information (phone and email)
- Performance rating and experience level

### Compatibility Indicators
When a shift is selected for assignment, each employee card shows:
- ✓ **Skills**: Employee has required skills for the service type
- ✓ **Time**: Employee is available during the shift hours
- ✓ **Status**: Employee is currently available for assignment

## Technical Implementation

### Components
- **EmployeeAvailabilityView**: Main component for the availability interface
- **ShiftManagement**: Updated to integrate the new employee view
- Enhanced employee data model with location and availability information

### Data Structure
```typescript
interface EmployeeWithLocation {
  // Basic employee info
  id: string;
  firstName: string;
  lastName: string;
  
  // Location information
  currentLocation: {
    area: string;
    city: string;
    distance?: number; // km from shift location
  };
  
  // Availability data
  currentStatus: 'available' | 'busy' | 'off-duty';
  todayAvailability: {
    available: boolean;
    timeSlots: { start: string; end: string; }[];
    conflictingShifts: number;
  };
  
  // Performance metrics
  rating: number;
  completedShifts: number;
  weeklyHours: number;
}
```

### Key Functions
- **Employee Filtering**: Advanced search and filter functionality
- **Location Grouping**: Automatic grouping by geographic location
- **Compatibility Checking**: Smart matching of employees to shift requirements
- **Real-time Updates**: Dynamic status updates based on current assignments

## Benefits

### For Administrators
- **Efficient Assignment**: Quickly identify the best employee for each shift
- **Location Optimization**: Minimize travel time by showing nearby employees
- **Skill Matching**: Ensure employees have required qualifications
- **Conflict Prevention**: Avoid double-booking employees

### For Operations
- **Improved Coverage**: Better visibility into employee availability
- **Quality Assurance**: Match skilled employees to appropriate service types
- **Cost Optimization**: Reduce travel costs by prioritizing nearby employees
- **Compliance**: Ensure proper staffing levels and qualifications

## Future Enhancements

### Planned Features
1. **GPS Integration**: Real-time employee location tracking
2. **Automated Assignment**: AI-powered shift assignment suggestions
3. **Mobile App**: Employee availability updates via mobile application
4. **Calendar Integration**: Sync with employee personal calendars
5. **Predictive Analytics**: Forecast availability patterns and staffing needs

### Potential Improvements
- **Notification System**: Real-time alerts for availability changes
- **Shift Preferences**: Employee preferences for shift types and locations
- **Team Management**: Group assignments for complex care requirements
- **Performance Tracking**: Detailed analytics on assignment efficiency

## Support & Troubleshooting

### Common Issues
1. **Employee Not Showing**: Check if employee is marked as active
2. **Incorrect Availability**: Verify employee has updated their schedule
3. **Distance Calculation**: Ensure employee and shift locations are accurate

### Contact
For technical support or feature requests, contact the development team.