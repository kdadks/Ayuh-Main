import React, { useState, useRef } from 'react';
import { 
  MapPin, 
  Camera, 
  Upload, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  X,
  Eye,
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';

interface ArrivalRecord {
  id: string;
  shiftId: string;
  patientName: string;
  arrivalTime: string;
  location: string;
  imageUrl?: string;
  status: 'confirmed' | 'pending' | 'late';
  notes?: string;
  uploadedAt: string;
}

interface ActiveShift {
  id: string;
  patientName: string;
  patientAddress: string;
  scheduledStart: string;
  scheduledEnd: string;
  serviceType: string;
  status: 'upcoming' | 'active' | 'completed';
}

export function JobArrivalSection() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<ArrivalRecord | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock data - in real app, this would come from API
  const [activeShifts] = useState<ActiveShift[]>([
    {
      id: '1',
      patientName: 'Priya Sharma',
      patientAddress: '123 MG Road, Bangalore, Karnataka',
      scheduledStart: '09:00',
      scheduledEnd: '13:00',
      serviceType: 'Personal Care',
      status: 'upcoming'
    },
    {
      id: '2',
      patientName: 'Rajesh Kumar',
      patientAddress: '456 Park Street, Mumbai, Maharashtra',
      scheduledStart: '14:00',
      scheduledEnd: '18:00',
      serviceType: 'Companionship',
      status: 'active'
    }
  ]);

  const [arrivalRecords, setArrivalRecords] = useState<ArrivalRecord[]>([
    {
      id: '1',
      shiftId: 'SH001',
      patientName: 'Meera Gupta',
      arrivalTime: '14:58',
      location: '654 Anna Nagar, Chennai, Tamil Nadu',
      imageUrl: '/api/placeholder/300/200',
      status: 'confirmed',
      notes: 'Arrived on time, patient was ready',
      uploadedAt: '2024-06-12T14:58:00Z'
    },
    {
      id: '2',
      shiftId: 'SH002',
      patientName: 'Amit Singh',
      arrivalTime: '08:05',
      location: '321 Sector 14, Gurgaon, Haryana',
      imageUrl: '/api/placeholder/300/200',
      status: 'late',
      notes: 'Traffic delay, patient notified',
      uploadedAt: '2024-06-11T08:05:00Z'
    }
  ]);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleConfirmArrival = async (shiftId: string) => {
    if (!selectedImage) {
      alert('Please upload an image to confirm your arrival');
      return;
    }

    setIsUploading(true);
    
    // Simulate upload - in real app, this would upload to your server
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const shift = activeShifts.find(s => s.id === shiftId);
      if (shift) {
        const currentTime = new Date();
        const scheduledTime = new Date(`2000-01-01 ${shift.scheduledStart}`);
        const arrivalTime = currentTime.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit'
        });
        
        // Determine arrival status
        const timeDifference = currentTime.getHours() * 60 + currentTime.getMinutes() -
                             (scheduledTime.getHours() * 60 + scheduledTime.getMinutes());
        let arrivalStatus: 'confirmed' | 'pending' | 'late' = 'confirmed';
        
        if (timeDifference > 15) { // More than 15 minutes late
          arrivalStatus = 'late';
        }

        const newRecord: ArrivalRecord = {
          id: Date.now().toString(),
          shiftId: shiftId,
          patientName: shift.patientName,
          arrivalTime: arrivalTime,
          location: shift.patientAddress,
          imageUrl: previewUrl,
          status: arrivalStatus,
          notes: notes || `Arrival confirmed${arrivalStatus === 'late' ? ' - Late arrival' : ''}`,
          uploadedAt: new Date().toISOString()
        };
        
        setArrivalRecords(prev => [newRecord, ...prev]);
        
        // Reset form
        setSelectedImage(null);
        setPreviewUrl('');
        setNotes('');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        
        // Notify admin of arrival (in real app, this would be an API call)
        console.log(`Arrival confirmed for shift ${shiftId} - Status: ${arrivalStatus}`);
        
        alert(`Arrival confirmed successfully!${arrivalStatus === 'late' ? ' Note: Marked as late arrival.' : ''}`);
      }
    } catch (error) {
      alert('Failed to confirm arrival. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'late': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'late': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Active Shifts */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Active Shifts
          </h2>
        </CardHeader>
        <CardContent>
          {activeShifts.length > 0 ? (
            <div className="space-y-4">
              {activeShifts.map(shift => (
                <div
                  key={shift.id}
                  className={`p-4 rounded-lg border ${
                    shift.status === 'active' 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-blue-200 bg-blue-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{shift.patientName}</h3>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {shift.patientAddress}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {shift.scheduledStart} - {shift.scheduledEnd} • {shift.serviceType}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        shift.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {shift.status === 'active' ? 'In Progress' : 'Upcoming'}
                      </span>
                      {shift.status === 'upcoming' && (
                        <Button 
                          size="sm"
                          onClick={() => {
                            // Scroll to arrival confirmation section
                            document.getElementById('arrival-confirmation')?.scrollIntoView({ 
                              behavior: 'smooth' 
                            });
                          }}
                        >
                          Confirm Arrival
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No active shifts at the moment</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Arrival Confirmation */}
      <div id="arrival-confirmation">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Camera className="h-5 w-5 mr-2" />
              Confirm Job Site Arrival
            </h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Arrival Photo
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  {previewUrl ? (
                    <div className="relative">
                      <img
                        src={previewUrl}
                        alt="Arrival confirmation"
                        className="max-w-full h-48 mx-auto object-cover rounded-lg"
                      />
                      <button
                        onClick={clearImage}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Take a photo to confirm your arrival</p>
                      <p className="text-sm text-gray-500 mb-4">
                        Photo should show the patient's address or recognizable landmark
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Photo
                      </Button>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Any additional information about your arrival..."
                />
              </div>

              {/* Confirm Button */}
              <div className="flex space-x-3">
                {activeShifts.filter(s => s.status === 'upcoming').map(shift => (
                  <Button
                    key={shift.id}
                    onClick={() => handleConfirmArrival(shift.id)}
                    disabled={!selectedImage || isUploading}
                    className="flex-1"
                  >
                    {isUploading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Confirming...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Confirm Arrival for {shift.patientName}
                      </>
                    )}
                  </Button>
                ))}
              </div>

              {activeShifts.filter(s => s.status === 'upcoming').length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  No upcoming shifts to confirm arrival for
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Arrival History */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">Arrival History</h2>
        </CardHeader>
        <CardContent>
          {arrivalRecords.length > 0 ? (
            <div className="space-y-4">
              {arrivalRecords.map(record => (
                <div
                  key={record.id}
                  className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg"
                >
                  {record.imageUrl && (
                    <img
                      src={record.imageUrl}
                      alt="Arrival confirmation"
                      className="w-16 h-16 object-cover rounded-lg cursor-pointer"
                      onClick={() => setSelectedRecord(record)}
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{record.patientName}</h3>
                        <p className="text-sm text-gray-600 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {record.location}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Arrived at {record.arrivalTime} • {new Date(record.uploadedAt).toLocaleDateString()}
                        </p>
                        {record.notes && (
                          <p className="text-sm text-gray-500 mt-1">{record.notes}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                          {getStatusIcon(record.status)}
                          <span className="ml-1 capitalize">{record.status}</span>
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedRecord(record)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No arrival confirmations yet</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Image Preview Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Arrival Confirmation</h3>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                {selectedRecord.imageUrl && (
                  <img
                    src={selectedRecord.imageUrl}
                    alt="Arrival confirmation"
                    className="w-full max-h-96 object-cover rounded-lg"
                  />
                )}

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-900">Patient:</span>
                    <p className="text-gray-600">{selectedRecord.patientName}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Arrival Time:</span>
                    <p className="text-gray-600">{selectedRecord.arrivalTime}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium text-gray-900">Location:</span>
                    <p className="text-gray-600">{selectedRecord.location}</p>
                  </div>
                  {selectedRecord.notes && (
                    <div className="col-span-2">
                      <span className="font-medium text-gray-900">Notes:</span>
                      <p className="text-gray-600">{selectedRecord.notes}</p>
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <Button variant="outline" onClick={() => setSelectedRecord(null)}>
                    Close
                  </Button>
                  {selectedRecord.imageUrl && (
                    <Button>
                      <Download className="h-4 w-4 mr-2" />
                      Download Image
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}