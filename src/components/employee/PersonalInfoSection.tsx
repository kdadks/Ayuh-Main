import React, { useState } from 'react';
import { User, Lock, Mail, Phone, MapPin, Calendar, Edit2, Save, X, Award, Plus, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  qualifications: string[];
  certificates: {
    name: string;
    issuer: string;
    issueDate: string;
    expiryDate?: string;
  }[];
}

export function PersonalInfoSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@ayuh.ie',
    phone: '+91 98765 43210',
    address: '123 MG Road, Bangalore, Karnataka, India',
    dateOfBirth: '1990-05-15',
    gender: 'Male',
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '+91 98765 43211'
    },
    qualifications: [
      'Diploma in Healthcare Support',
      'Certificate in Personal Care',
      'First Aid Certification'
    ],
    certificates: [
      {
        name: 'CPR Certification',
        issuer: 'Irish Red Cross',
        issueDate: '2023-01-15',
        expiryDate: '2025-01-15'
      },
      {
        name: 'Manual Handling Certificate',
        issuer: 'HSE',
        issueDate: '2022-09-10',
        expiryDate: '2024-09-10'
      },
      {
        name: 'Medication Administration',
        issuer: 'Healthcare Skills Academy',
        issueDate: '2023-03-20',
        expiryDate: '2026-03-20'
      }
    ]
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [editForm, setEditForm] = useState<PersonalInfo>(personalInfo);

  const handleSavePersonalInfo = () => {
    setPersonalInfo(editForm);
    setIsEditing(false);
    // Here you would typically make an API call to update the information
  };

  const handleCancelEdit = () => {
    setEditForm(personalInfo);
    setIsEditing(false);
  };

  const handlePasswordChange = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Here you would typically make an API call to change the password
    alert('Password changed successfully');
    setIsChangingPassword(false);
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const addQualification = () => {
    setEditForm(prev => ({
      ...prev,
      qualifications: [...prev.qualifications, '']
    }));
  };

  const removeQualification = (index: number) => {
    setEditForm(prev => ({
      ...prev,
      qualifications: prev.qualifications.filter((_, i) => i !== index)
    }));
  };

  const updateQualification = (index: number, value: string) => {
    setEditForm(prev => ({
      ...prev,
      qualifications: prev.qualifications.map((qual, i) => i === index ? value : qual)
    }));
  };

  const addCertificate = () => {
    setEditForm(prev => ({
      ...prev,
      certificates: [...prev.certificates, {
        name: '',
        issuer: '',
        issueDate: '',
        expiryDate: ''
      }]
    }));
  };

  const removeCertificate = (index: number) => {
    setEditForm(prev => ({
      ...prev,
      certificates: prev.certificates.filter((_, i) => i !== index)
    }));
  };

  const updateCertificate = (index: number, field: string, value: string) => {
    setEditForm(prev => ({
      ...prev,
      certificates: prev.certificates.map((cert, i) =>
        i === index ? { ...cert, [field]: value } : cert
      )
    }));
  };

  const isCertificateExpiring = (expiryDate?: string) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const now = new Date();
    const monthsUntilExpiry = (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30);
    return monthsUntilExpiry <= 3 && monthsUntilExpiry > 0;
  };

  const isCertificateExpired = (expiryDate?: string) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Personal Information
            </h2>
            {!isEditing ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Edit
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  onClick={handleSavePersonalInfo}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancelEdit}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              {isEditing ? (
                <Input
                  value={editForm.firstName}
                  onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                />
              ) : (
                <p className="text-gray-900">{personalInfo.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              {isEditing ? (
                <Input
                  value={editForm.lastName}
                  onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                />
              ) : (
                <p className="text-gray-900">{personalInfo.lastName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                Email
              </label>
              {isEditing ? (
                <Input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                />
              ) : (
                <p className="text-gray-900">{personalInfo.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                Phone
              </label>
              {isEditing ? (
                <Input
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                />
              ) : (
                <p className="text-gray-900">{personalInfo.phone}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                Address
              </label>
              {isEditing ? (
                <Input
                  value={editForm.address}
                  onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                />
              ) : (
                <p className="text-gray-900">{personalInfo.address}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Date of Birth
              </label>
              {isEditing ? (
                <Input
                  type="date"
                  value={editForm.dateOfBirth}
                  onChange={(e) => setEditForm({ ...editForm, dateOfBirth: e.target.value })}
                />
              ) : (
                <p className="text-gray-900">{new Date(personalInfo.dateOfBirth).toLocaleDateString()}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              {isEditing ? (
                <select
                  value={editForm.gender}
                  onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              ) : (
                <p className="text-gray-900">{personalInfo.gender}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">Emergency Contact</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              {isEditing ? (
                <Input
                  value={editForm.emergencyContact.name}
                  onChange={(e) => setEditForm({
                    ...editForm,
                    emergencyContact: { ...editForm.emergencyContact, name: e.target.value }
                  })}
                />
              ) : (
                <p className="text-gray-900">{personalInfo.emergencyContact.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Relationship
              </label>
              {isEditing ? (
                <Input
                  value={editForm.emergencyContact.relationship}
                  onChange={(e) => setEditForm({
                    ...editForm,
                    emergencyContact: { ...editForm.emergencyContact, relationship: e.target.value }
                  })}
                />
              ) : (
                <p className="text-gray-900">{personalInfo.emergencyContact.relationship}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              {isEditing ? (
                <Input
                  value={editForm.emergencyContact.phone}
                  onChange={(e) => setEditForm({
                    ...editForm,
                    emergencyContact: { ...editForm.emergencyContact, phone: e.target.value }
                  })}
                />
              ) : (
                <p className="text-gray-900">{personalInfo.emergencyContact.phone}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Password Change */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Lock className="h-5 w-5 mr-2" />
              Password & Security
            </h2>
            {!isChangingPassword && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsChangingPassword(true)}
              >
                Change Password
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isChangingPassword ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <Input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <Input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <Input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                />
              </div>

              <div className="flex space-x-3">
                <Button onClick={handlePasswordChange}>
                  Update Password
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsChangingPassword(false);
                    setPasswordForm({
                      currentPassword: '',
                      newPassword: '',
                      confirmPassword: ''
                    });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-gray-600">
              <p>Password last changed: March 15, 2024</p>
              <p className="text-sm mt-2">
                For security reasons, we recommend changing your password every 90 days.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Qualifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Qualifications
            </h2>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isEditing ? (
              <div className="space-y-3">
                {editForm.qualifications.map((qualification, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Input
                      value={qualification}
                      onChange={(e) => updateQualification(index, e.target.value)}
                      placeholder="Enter qualification"
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeQualification(index)}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addQualification}
                  className="flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Qualification</span>
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                {personalInfo.qualifications.length > 0 ? (
                  personalInfo.qualifications.map((qualification, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span className="text-gray-700">{qualification}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No qualifications added</p>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Certificates */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Certificates
            </h2>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isEditing ? (
              <div className="space-y-4">
                {editForm.certificates.map((certificate, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">Certificate {index + 1}</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeCertificate(index)}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Certificate Name
                        </label>
                        <Input
                          value={certificate.name}
                          onChange={(e) => updateCertificate(index, 'name', e.target.value)}
                          placeholder="Certificate name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Issuing Organization
                        </label>
                        <Input
                          value={certificate.issuer}
                          onChange={(e) => updateCertificate(index, 'issuer', e.target.value)}
                          placeholder="Issuing organization"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Issue Date
                        </label>
                        <Input
                          type="date"
                          value={certificate.issueDate}
                          onChange={(e) => updateCertificate(index, 'issueDate', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date (Optional)
                        </label>
                        <Input
                          type="date"
                          value={certificate.expiryDate || ''}
                          onChange={(e) => updateCertificate(index, 'expiryDate', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addCertificate}
                  className="flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Certificate</span>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {personalInfo.certificates.length > 0 ? (
                  personalInfo.certificates.map((certificate, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${
                      isCertificateExpired(certificate.expiryDate)
                        ? 'border-red-200 bg-red-50'
                        : isCertificateExpiring(certificate.expiryDate)
                        ? 'border-yellow-200 bg-yellow-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{certificate.name}</h4>
                          <p className="text-sm text-gray-600">Issued by: {certificate.issuer}</p>
                          <p className="text-sm text-gray-600">
                            Issue Date: {new Date(certificate.issueDate).toLocaleDateString()}
                          </p>
                          {certificate.expiryDate && (
                            <p className={`text-sm ${
                              isCertificateExpired(certificate.expiryDate)
                                ? 'text-red-600 font-medium'
                                : isCertificateExpiring(certificate.expiryDate)
                                ? 'text-yellow-600 font-medium'
                                : 'text-gray-600'
                            }`}>
                              {isCertificateExpired(certificate.expiryDate) ? 'Expired: ' : 'Expires: '}
                              {new Date(certificate.expiryDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          {isCertificateExpired(certificate.expiryDate) && (
                            <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                              Expired
                            </span>
                          )}
                          {isCertificateExpiring(certificate.expiryDate) && !isCertificateExpired(certificate.expiryDate) && (
                            <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                              Expiring Soon
                            </span>
                          )}
                          {!certificate.expiryDate && (
                            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                              No Expiry
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No certificates added</p>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}