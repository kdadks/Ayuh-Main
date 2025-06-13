import React, { useState } from 'react';
import { Calendar, Clock, Save, Plus, X, Edit2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';

interface TimeSlot {
  start: string;
  end: string;
}

interface DayAvailability {
  day: string;
  available: boolean;
  timeSlots: TimeSlot[];
}

interface WeeklyAvailability {
  [key: string]: DayAvailability;
}

export function AvailabilitySection() {
  const [isEditing, setIsEditing] = useState(false);
  const [availability, setAvailability] = useState<WeeklyAvailability>({
    monday: {
      day: 'Monday',
      available: true,
      timeSlots: [{ start: '09:00', end: '17:00' }]
    },
    tuesday: {
      day: 'Tuesday',
      available: true,
      timeSlots: [{ start: '09:00', end: '17:00' }]
    },
    wednesday: {
      day: 'Wednesday',
      available: true,
      timeSlots: [{ start: '09:00', end: '17:00' }]
    },
    thursday: {
      day: 'Thursday',
      available: true,
      timeSlots: [{ start: '09:00', end: '17:00' }]
    },
    friday: {
      day: 'Friday',
      available: true,
      timeSlots: [{ start: '09:00', end: '17:00' }]
    },
    saturday: {
      day: 'Saturday',
      available: false,
      timeSlots: []
    },
    sunday: {
      day: 'Sunday',
      available: false,
      timeSlots: []
    }
  });

  const [editAvailability, setEditAvailability] = useState<WeeklyAvailability>(availability);

  const toggleDayAvailability = (dayKey: string) => {
    setEditAvailability(prev => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        available: !prev[dayKey].available,
        timeSlots: !prev[dayKey].available ? [{ start: '09:00', end: '17:00' }] : []
      }
    }));
  };

  const addTimeSlot = (dayKey: string) => {
    setEditAvailability(prev => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        timeSlots: [...prev[dayKey].timeSlots, { start: '09:00', end: '17:00' }]
      }
    }));
  };

  const removeTimeSlot = (dayKey: string, index: number) => {
    setEditAvailability(prev => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        timeSlots: prev[dayKey].timeSlots.filter((_, i) => i !== index)
      }
    }));
  };

  const updateTimeSlot = (dayKey: string, index: number, field: 'start' | 'end', value: string) => {
    setEditAvailability(prev => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        timeSlots: prev[dayKey].timeSlots.map((slot, i) =>
          i === index ? { ...slot, [field]: value } : slot
        )
      }
    }));
  };

  const handleSave = () => {
    setAvailability(editAvailability);
    setIsEditing(false);
    // Here you would typically make an API call to save the availability
  };

  const handleCancel = () => {
    setEditAvailability(availability);
    setIsEditing(false);
  };

  const formatTimeRange = (timeSlots: TimeSlot[]) => {
    if (timeSlots.length === 0) return 'Not available';
    return timeSlots.map(slot => `${slot.start} - ${slot.end}`).join(', ');
  };

  return (
    <div className="space-y-6">
      {/* Current Schedule Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Weekly Availability Schedule
            </h2>
            {!isEditing ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Schedule
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button size="sm" onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(editAvailability).map(([dayKey, dayData]) => (
              <div
                key={dayKey}
                className={`p-4 rounded-lg border ${
                  dayData.available ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">{dayData.day}</h3>
                  {isEditing && (
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={dayData.available}
                        onChange={() => toggleDayAvailability(dayKey)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-600">Available</span>
                    </label>
                  )}
                </div>

                {dayData.available ? (
                  <div className="space-y-3">
                    {dayData.timeSlots.map((slot, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Clock className="h-4 w-4 text-gray-400" />
                        {isEditing ? (
                          <>
                            <input
                              type="time"
                              value={slot.start}
                              onChange={(e) => updateTimeSlot(dayKey, index, 'start', e.target.value)}
                              className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                            />
                            <span className="text-gray-500">to</span>
                            <input
                              type="time"
                              value={slot.end}
                              onChange={(e) => updateTimeSlot(dayKey, index, 'end', e.target.value)}
                              className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                            />
                            {dayData.timeSlots.length > 1 && (
                              <button
                                onClick={() => removeTimeSlot(dayKey, index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            )}
                          </>
                        ) : (
                          <span className="text-gray-700">{slot.start} - {slot.end}</span>
                        )}
                      </div>
                    ))}
                    {isEditing && (
                      <button
                        onClick={() => addTimeSlot(dayKey)}
                        className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 text-sm"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add time slot</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Not available</p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {Object.values(availability).filter(day => day.available).length}
              </div>
              <div className="text-sm text-gray-600">Available Days</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {Object.values(availability).reduce((total, day) => 
                  total + day.timeSlots.length, 0
                )}
              </div>
              <div className="text-sm text-gray-600">Time Slots</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Object.values(availability).reduce((total, day) => {
                  return total + day.timeSlots.reduce((dayTotal, slot) => {
                    const start = new Date(`2000-01-01T${slot.start}`);
                    const end = new Date(`2000-01-01T${slot.end}`);
                    return dayTotal + (end.getTime() - start.getTime()) / (1000 * 60 * 60);
                  }, 0);
                }, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Hours/Week</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Availability Templates */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Quick Templates</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="p-4 h-auto flex-col space-y-2"
              onClick={() => {
                const template = {
                  monday: { day: 'Monday', available: true, timeSlots: [{ start: '09:00', end: '17:00' }] },
                  tuesday: { day: 'Tuesday', available: true, timeSlots: [{ start: '09:00', end: '17:00' }] },
                  wednesday: { day: 'Wednesday', available: true, timeSlots: [{ start: '09:00', end: '17:00' }] },
                  thursday: { day: 'Thursday', available: true, timeSlots: [{ start: '09:00', end: '17:00' }] },
                  friday: { day: 'Friday', available: true, timeSlots: [{ start: '09:00', end: '17:00' }] },
                  saturday: { day: 'Saturday', available: false, timeSlots: [] },
                  sunday: { day: 'Sunday', available: false, timeSlots: [] }
                };
                setEditAvailability(template);
              }}
            >
              <div className="font-medium">Monday - Friday</div>
              <div className="text-sm text-gray-600">9:00 AM - 5:00 PM</div>
            </Button>

            <Button
              variant="outline"
              className="p-4 h-auto flex-col space-y-2"
              onClick={() => {
                const template = Object.keys(editAvailability).reduce((acc, day) => ({
                  ...acc,
                  [day]: {
                    day: editAvailability[day].day,
                    available: true,
                    timeSlots: [{ start: '09:00', end: '17:00' }]
                  }
                }), {});
                setEditAvailability(template);
              }}
            >
              <div className="font-medium">Full Week</div>
              <div className="text-sm text-gray-600">All days available</div>
            </Button>

            <Button
              variant="outline"
              className="p-4 h-auto flex-col space-y-2"
              onClick={() => {
                const template = Object.keys(editAvailability).reduce((acc, day) => ({
                  ...acc,
                  [day]: {
                    day: editAvailability[day].day,
                    available: false,
                    timeSlots: []
                  }
                }), {});
                setEditAvailability(template);
              }}
            >
              <div className="font-medium">Clear All</div>
              <div className="text-sm text-gray-600">No availability</div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}