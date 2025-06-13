import React from 'react';
import { FileText, AlertTriangle, Scale, CreditCard, Shield, Users } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';

export function Terms() {
  const sections = [
    {
      title: 'Acceptance of Terms',
      content: [
        'By accessing or using Ayuh Clinic services, you agree to be bound by these Terms of Service',
        'If you disagree with any part of these terms, you may not access our services',
        'These terms apply to all visitors, users, and others who access or use our services',
        'We reserve the right to refuse service to anyone for any reason at any time'
      ]
    },
    {
      title: 'Description of Services',
      content: [
        'Ayuh Clinic provides healthcare services including home care, homeopathic consultations, and wellness programs',
        'Our services are intended for residents of areas where we are licensed to practice',
        'Services may vary by location and are subject to availability',
        'We do not provide emergency medical services - please call 911 for emergencies'
      ]
    },
    {
      title: 'User Responsibilities',
      content: [
        'Provide accurate and complete information about your health and medical history',
        'Follow treatment plans and recommendations provided by our healthcare professionals',
        'Notify us immediately of any changes in your condition or medications',
        'Maintain the confidentiality of your account credentials',
        'Use our services only for lawful purposes and in accordance with these terms'
      ]
    },
    {
      title: 'Medical Disclaimers',
      content: [
        'Our services are not a substitute for emergency medical care',
        'Always seek immediate medical attention for serious or life-threatening conditions',
        'Treatment outcomes cannot be guaranteed and may vary between individuals',
        'Our homeopathic services complement but do not replace conventional medical care when needed',
        'You should consult with your primary care physician about any treatments we provide'
      ]
    }
  ];

  const paymentTerms = [
    'Payment is due at the time services are rendered unless other arrangements have been made',
    'We accept cash, credit cards, and most major insurance plans',
    'Insurance coverage will be verified, but you are responsible for any uncovered services',
    'Cancellations must be made at least 24 hours in advance to avoid charges',
    'Outstanding balances may be subject to collection procedures after 90 days'
  ];

  const prohibitedUses = [
    'Violating any applicable laws or regulations',
    'Transmitting harmful, threatening, or harassing content',
    'Attempting to gain unauthorized access to our systems',
    'Using our services for fraudulent or deceptive purposes',
    'Interfering with other users\' use of our services',
    'Sharing your account credentials with others'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-primary-100 rounded-full p-4">
                <Scale className="h-12 w-12 text-primary-600" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Terms of 
              <span className="text-primary-600"> Service</span>
            </h1>
            <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto leading-relaxed">
              These terms govern your use of Ayuh Clinic's services. Please read them carefully 
              as they contain important information about your rights and obligations.
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Ayuh Clinic</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                These Terms of Service ("Terms") govern your relationship with Ayuh Clinic and the use of our 
                healthcare services, website, and related applications. These Terms apply whether you are 
                a patient, caregiver, or visitor.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                By using our services, you acknowledge that you have read, understood, and agree to be bound 
                by these Terms and our Privacy Policy. If you are using our services on behalf of another 
                person, you represent that you have the authority to bind that person to these Terms.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Terms Sections */}
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

      {/* Payment Terms */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8">
            <CardHeader>
              <div className="flex items-center mb-4">
                <CreditCard className="h-8 w-8 text-primary-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Payment Terms and Billing</h2>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {paymentTerms.map((term, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-600">{term}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Insurance Information</h3>
                <p className="text-sm text-blue-800">
                  We will work with your insurance company to maximize your benefits, but you are ultimately 
                  responsible for understanding your coverage and any costs not covered by insurance.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Prohibited Uses */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8">
            <CardHeader>
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-8 w-8 text-red-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Prohibited Uses</h2>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                You may not use our services for any of the following prohibited purposes:
              </p>
              
              <ul className="space-y-3">
                {prohibitedUses.map((use, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-600">{use}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">
                  <strong>Violation Consequences:</strong> Violation of these terms may result in immediate 
                  termination of services and potential legal action.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Privacy and Confidentiality */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8">
            <CardHeader>
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-primary-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Privacy and Confidentiality</h2>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">HIPAA Compliance</h3>
                  <p className="text-gray-600">
                    We are committed to protecting your health information in accordance with the Health Insurance 
                    Portability and Accountability Act (HIPAA) and other applicable privacy laws. Your personal 
                    health information will only be used and disclosed as permitted by law.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Confidentiality Agreement</h3>
                  <p className="text-gray-600">
                    All Ayuh Clinic staff members have signed confidentiality agreements and receive ongoing 
                    training on privacy and security practices. We maintain strict policies to protect your 
                    personal and health information.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Patient Rights</h3>
                  <p className="text-gray-600">
                    You have the right to access your medical records, request corrections, and understand how 
                    your information is used. For more details, please refer to our Privacy Policy and 
                    Notice of Privacy Practices.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Limitation of Liability */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8">
            <CardHeader>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  To the fullest extent permitted by law, Ayuh Clinic shall not be liable for any indirect, 
                  incidental, special, consequential, or punitive damages, including but not limited to loss 
                  of profits, data, or use, arising out of or relating to your use of our services.
                </p>
                
                <p className="text-gray-600">
                  Our total liability to you for any claims arising from your use of our services shall not 
                  exceed the amount you paid for the specific service giving rise to the claim.
                </p>
                
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Important:</strong> Some jurisdictions do not allow the exclusion or limitation 
                    of liability for consequential or incidental damages, so the above limitation may not 
                    apply to you.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Indemnification */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8">
            <CardHeader>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Indemnification</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                You agree to defend, indemnify, and hold harmless Ayuh Clinic, its officers, directors, 
                employees, and agents from and against any claims, damages, obligations, losses, liabilities, 
                costs, or debt, and expenses (including attorney's fees) arising from:
              </p>
              
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600">Your use of our services</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600">Your violation of these Terms</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600">Your violation of any third-party rights</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Termination */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8">
            <CardHeader>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">By You</h3>
                  <p className="text-gray-600">
                    You may terminate your relationship with Ayuh Clinic at any time by providing written notice. 
                    You will be responsible for any services already provided and any outstanding balances.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">By Us</h3>
                  <p className="text-gray-600">
                    We may terminate or suspend your access to our services immediately, without prior notice, 
                    if you breach these Terms or for any other reason in our sole discretion.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Effect of Termination</h3>
                  <p className="text-gray-600">
                    Upon termination, your right to use our services will cease immediately. We will work with 
                    you to ensure continuity of care and proper transfer of medical records as appropriate.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Governing Law */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8">
            <CardHeader>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law and Disputes</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Governing Law</h3>
                  <p className="text-gray-600">
                    These Terms shall be governed by and construed in accordance with the laws of the State where 
                    Ayuh Clinic is licensed to practice, without regard to conflict of law principles.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Dispute Resolution</h3>
                  <p className="text-gray-600">
                    Any disputes arising from these Terms or your use of our services will be resolved through 
                    binding arbitration in accordance with the rules of the American Arbitration Association, 
                    except where prohibited by law.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Jurisdiction</h3>
                  <p className="text-gray-600">
                    You agree to submit to the personal jurisdiction of the courts located in Springfield for 
                    any legal proceedings not subject to arbitration.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Changes to Terms */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8">
            <CardHeader>
              <div className="flex items-center mb-4">
                <FileText className="h-8 w-8 text-primary-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Changes to Terms</h2>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                We reserve the right to modify or replace these Terms at any time. When we make significant changes:
              </p>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600">
                    We will post the updated Terms on our website with a new "last updated" date
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600">
                    We will notify you via email if you have an active account with us
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600">
                    You will have 30 days to review the changes before they take effect
                  </span>
                </li>
              </ul>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  Your continued use of our services after the effective date of any changes constitutes 
                  acceptance of the new Terms. If you do not agree to the new Terms, please discontinue 
                  using our services.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8">
            <CardHeader>
              <div className="flex items-center mb-4">
                <Users className="h-8 w-8 text-primary-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">legal@ayuhclinic.com</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900">Mailing Address</h3>
                  <p className="text-gray-600">
                    Ayuh Clinic Legal Department<br />
                    123 Healthcare Boulevard<br />
                    Springfield, USA 12345
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}