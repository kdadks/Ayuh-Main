import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  X, 
  User,
  Calendar,
  MapPin
} from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

interface ShiftNotification {
  id: string;
  type: 'assignment' | 'acceptance' | 'arrival' | 'completion' | 'cancellation' | 'reminder';
  title: string;
  message: string;
  shiftId: string;
  patientName?: string;
  employeeName?: string;
  timestamp: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
}

interface ShiftNotificationsProps {
  userType: 'admin' | 'employee';
  userId?: string;
}

export function ShiftNotifications({ userType, userId }: ShiftNotificationsProps) {
  const [notifications, setNotifications] = useState<ShiftNotification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock notifications data - in real app, this would come from API
  useEffect(() => {
    const mockNotifications: ShiftNotification[] = [
      {
        id: '1',
        type: 'assignment',
        title: 'New Shift Assignment',
        message: 'You have been assigned a new shift for Priya Sharma on June 15th',
        shiftId: 'SH001',
        patientName: 'Priya Sharma',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
        read: false,
        priority: 'high'
      },
      {
        id: '2',
        type: 'arrival',
        title: 'Arrival Confirmed',
        message: 'Employee Maria Garcia has confirmed arrival at patient location',
        shiftId: 'SH002',
        employeeName: 'Maria Garcia',
        timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1 hour ago
        read: false,
        priority: 'medium'
      },
      {
        id: '3',
        type: 'reminder',
        title: 'Shift Starting Soon',
        message: 'Your shift with Rajesh Kumar starts in 30 minutes',
        shiftId: 'SH003',
        patientName: 'Rajesh Kumar',
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
        read: true,
        priority: 'high'
      }
    ];

    // Filter notifications based on user type
    const filteredNotifications = userType === 'admin' 
      ? mockNotifications.filter(n => ['arrival', 'acceptance', 'completion', 'cancellation'].includes(n.type))
      : mockNotifications.filter(n => ['assignment', 'reminder'].includes(n.type));

    setNotifications(filteredNotifications);
  }, [userType, userId]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'assignment':
        return <Calendar className="h-4 w-4 text-blue-600" />;
      case 'arrival':
        return <MapPin className="h-4 w-4 text-green-600" />;
      case 'completion':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'reminder':
        return <Clock className="h-4 w-4 text-orange-600" />;
      case 'cancellation':
        return <X className="h-4 w-4 text-red-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-500';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <Button size="sm" variant="outline" onClick={markAllAsRead}>
                    Mark all read
                  </Button>
                )}
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 border-l-4 ${getPriorityColor(notification.priority)} ${
                      !notification.read ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${
                              !notification.read ? 'text-gray-900' : 'text-gray-700'
                            }`}>
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-xs text-gray-500">
                                {formatTimestamp(notification.timestamp)}
                              </span>
                              {notification.patientName && (
                                <span className="text-xs text-gray-500 flex items-center">
                                  <User className="h-3 w-3 mr-1" />
                                  {notification.patientName}
                                </span>
                              )}
                              {notification.employeeName && (
                                <span className="text-xs text-gray-500 flex items-center">
                                  <User className="h-3 w-3 mr-1" />
                                  {notification.employeeName}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-1 ml-2">
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-blue-600 hover:text-blue-800 text-xs"
                              >
                                Mark read
                              </button>
                            )}
                            <button
                              onClick={() => removeNotification(notification.id)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No notifications</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}