import React from 'react';
import { Shield, Lock, Eye, FileText, Mail, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';

export function Privacy() {
  const sections = [
    {
      title: 'Information We Collect',
      content: [
        'Personal identification information (name, email address, phone number, etc.)',
        'Medical information necessary for providing healthcare services',
        'Insurance and billing information',
        'Technical information about your device and browser when using our website',
        'Cookies and similar tracking technologies for website functionality'
      ]
    },
    {
      title: 'How We Use Your Information',
      content: [
        'Provide healthcare services and manage your care',
        'Process appointments and billing',
        'Communicate with you about your health and our services',
        'Improve our services and website functionality',
        'Comply with legal and regulatory requirements',
        'Send you important updates about our services (with your consent)'
      ]
    },
    {
      title: 'Information Sharing and Disclosure',
      content: [
        'Healthcare providers involved in your care',
        'Insurance companies for billing and coverage verification',
        'Legal authorities when required by law',
        'Business partners who help us provide services (under strict confidentiality agreements)',
        'With your explicit consent for any other purposes'
      ]
    },
    {
      title: 'Data Security Measures',
      content: [
        'End-to-end encryption for all sensitive data transmission',
        'Secure, HIPAA-compliant servers and databases',
        'Regular security audits and vulnerability assessments',
        'Multi-factor authentication for staff access',
        'Strict access controls and employee training programs',
        'Regular data backups with encrypted storage'
      ]
    }
  ];

  const rights = [
    {
      title: 'Access Your Information',
      description: 'Request a copy of the personal information we have about you'
    },
    {
      title: 'Correct Your Information',
      description: 'Update or correct any inaccurate personal information'
    },
    {
      title: 'Delete Your Information',
      description: 'Request deletion of your personal information (subject to legal requirements)'
    },
    {
      title: 'Restrict Processing',
      description: 'Request that we limit how we use your personal information'
    },
    {
      title: 'Data Portability',
      description: 'Request a copy of your information in a portable format'
    },
    {
      title: 'Withdraw Consent',
      description: 'Withdraw your consent for non-essential data processing at any time'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-primary-100 rounded-full p-4">
                <Shield className="h-12 w-12 text-primary-600" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Privacy 
              <span className="text-primary-600"> Policy</span>
            </h1>
            <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto leading-relaxed">
              Your privacy and the security of your personal health information are our top priorities. 
              This policy explains how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: January 13, 2024
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 border-l-4 border-l-primary-600">
            <CardContent>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Your Privacy</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                At Ayuh Clinic, we are committed to protecting your privacy and ensuring the security of your 
                personal health information. We comply with all applicable privacy laws, including the Health 
                Insurance Portability and Accountability Act (HIPAA), and follow industry best practices for 
                data protection.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                This Privacy Policy describes how we collect, use, disclose, and safeguard your information 
                when you use our services or visit our website. By using our services, you consent to the 
                practices described in this policy.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Sections */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <Card key={index} className="p-8">
                <CardHeader>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {index + 1}. {section.title}
                  </h2>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Your Rights */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Your Privacy Rights
            </h2>
            <p className="text-xl text-gray-600 mt-4">
              You have important rights regarding your personal information
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rights.map((right, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="bg-primary-100 rounded-full p-3 w-12 h-12 mx-auto mb-4">
                  <Lock className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {right.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {right.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cookies and Tracking */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8">
            <CardHeader>
              <div className="flex items-center mb-4">
                <Eye className="h-8 w-8 text-primary-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Cookies and Tracking Technologies</h2>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">What Are Cookies?</h3>
                  <p className="text-gray-600">
                    Cookies are small text files stored on your device when you visit our website. 
                    They help us provide you with a better experience by remembering your preferences 
                    and improving site functionality.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Types of Cookies We Use:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600"><strong>Essential Cookies:</strong> Necessary for website functionality and security</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600"><strong>Performance Cookies:</strong> Help us understand how visitors use our website</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600"><strong>Preference Cookies:</strong> Remember your settings and preferences</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Managing Cookies</h3>
                  <p className="text-gray-600">
                    You can control cookies through your browser settings. However, disabling certain 
                    cookies may affect the functionality of our website.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Third-Party Services */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8">
            <CardHeader>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                We may use third-party services to help us provide better healthcare services. 
                These partners have their own privacy policies and practices:
              </p>
              
              <div className="space-y-4">
                <div className="border-l-4 border-l-blue-400 pl-4">
                  <h3 className="font-semibold text-gray-900">Payment Processors</h3>
                  <p className="text-gray-600 text-sm">
                    We use secure, PCI-compliant payment processors for billing and payments.
                  </p>
                </div>
                
                <div className="border-l-4 border-l-green-400 pl-4">
                  <h3 className="font-semibold text-gray-900">Analytics Services</h3>
                  <p className="text-gray-600 text-sm">
                    We use analytics tools to improve our website and services (data is anonymized).
                  </p>
                </div>
                
                <div className="border-l-4 border-l-purple-400 pl-4">
                  <h3 className="font-semibold text-gray-900">Communication Platforms</h3>
                  <p className="text-gray-600 text-sm">
                    Secure messaging and video consultation platforms that comply with HIPAA requirements.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Data Retention */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8">
            <CardHeader>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                We retain your personal information only as long as necessary to provide our services 
                and comply with legal requirements:
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600">
                    <strong>Medical Records:</strong> Retained according to state and federal regulations (typically 7-10 years)
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600">
                    <strong>Billing Information:</strong> Retained for tax and audit purposes (typically 7 years)
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600">
                    <strong>Website Data:</strong> Cookies and analytics data are typically retained for 1-2 years
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Children's Privacy */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8">
            <CardHeader>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                We take special care to protect the privacy of children under 18. When providing healthcare 
                services to minors:
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600">
                    We obtain parental consent before collecting any personal information from children
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600">
                    Parents have the right to review, modify, or delete their child's information
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600">
                    We comply with all applicable children's privacy laws and regulations
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8">
            <CardHeader>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us About Privacy</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                If you have questions about this Privacy Policy or want to exercise your privacy rights, 
                please contact us:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-primary-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">privacy@ayuhclinic.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-primary-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start md:col-span-2">
                  <FileText className="h-5 w-5 text-primary-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Mailing Address</h3>
                    <p className="text-gray-600">
                      Ayuh Clinic Privacy Officer<br />
                      123 Healthcare Boulevard<br />
                      Springfield, USA 12345
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Response Time:</strong> We will respond to privacy-related inquiries within 30 days. 
                  For urgent matters, please call our main number.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Policy Updates */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8">
            <CardHeader>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Policy Updates</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                We may update this Privacy Policy from time to time to reflect changes in our practices 
                or applicable laws. When we make significant changes:
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600">
                    We will post the updated policy on our website with a new "last updated" date
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600">
                    We will notify you via email if you have an account with us
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600">
                    Continued use of our services after updates constitutes acceptance of the new policy
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}