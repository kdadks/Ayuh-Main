import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  MessageCircle,
  Heart,
  CheckCircle
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Input } from '../components/ui/Input';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+91 9050471087', ''],
      description: 'Call us anytime for immediate assistance'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['clinicayuh@gmail.com', ''],
      description: 'Send us an email and we\'ll respond within 24 hours'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: ['Sector 45C, Chandigarh, India 160047'],
      description: 'Visit our main clinic location'
    },
    {
      icon: Clock,
      title: 'Hours',
      details: ['Mon-Fri: 8:00 AM - 8:00 PM', 'Sat-Sun: 9:00 AM - 5:00 PM'],
      description: '24/7 emergency home care available'
    }
  ];

  const services = [
    'Home Care Services',
    'Homeopathic Consultation',
    'Chronic Disease Management',
    'Elderly Care',
    'Post-Surgery Care',
    'Wellness Programs',
    'Mental Health Support',
    'Other'
  ];

  const officeLocations = [
    {
      name: 'Main Clinic',
      address: 'Sector 45C, Chandigarh, India 160047',
      phone: '+91 9050471087',
      hours: 'Mon-Fri: 8:00 AM - 8:00 PM'
    },
    {
      name: 'Home Care Center',
      address: 'Sector 45, Chandigarh, India 160047',
      phone: '+91 9050471087',
      hours: '24/7 Services Available'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Get In 
              <span className="text-primary-600"> Touch</span>
            </h1>
            <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto leading-relaxed">
              We're here to help you with all your healthcare needs. Reach out to us for consultations, 
              appointments, or any questions about our services.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="bg-primary-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <info.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {info.title}
                </h3>
                <div className="space-y-1 mb-3">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-900 font-medium">
                      {detail}
                    </p>
                  ))}
                </div>
                <p className="text-gray-600 text-sm">
                  {info.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="p-8">
                <CardHeader>
                  <div className="flex items-center mb-6">
                    <MessageCircle className="h-8 w-8 text-primary-600 mr-3" />
                    <h2 className="text-3xl font-bold text-gray-900">Send Us a Message</h2>
                  </div>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">Thank You!</h3>
                      <p className="text-gray-600">
                        Your message has been sent successfully. We'll get back to you within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <Input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full"
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <Input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full"
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <Input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                        <div>
                          <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                            Service Interested In
                          </label>
                          <select
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          >
                            <option value="">Select a service</option>
                            {services.map((service, index) => (
                              <option key={index} value={service}>
                                {service}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={6}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Tell us about your healthcare needs..."
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full">
                        Send Message
                        <Send className="ml-2 h-5 w-5" />
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Office Locations */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Locations</h2>
              
              <div className="space-y-6 mb-8">
                {officeLocations.map((location, index) => (
                  <Card key={index} className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {location.name}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-primary-600 mt-1 mr-3 flex-shrink-0" />
                        <p className="text-gray-600">{location.address}</p>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0" />
                        <p className="text-gray-600">{location.phone}</p>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0" />
                        <p className="text-gray-600">{location.hours}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Interactive Map */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Find Us</h3>
                <div className="rounded-lg h-[400px] overflow-hidden">
                  <iframe
                    title="Clinic Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.2236559456087!2d76.7594!3d30.7217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fee96e0000001%3A0x0!2zMzDCsDQzJzE4LjEiTiA3NsKwNDUnMzMuOSJF!5e0!3m2!1sen!2sin!4v1623456789012!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
                <div className="mt-4 text-gray-600">
                  <p className="flex items-center">
                    <MapPin className="h-5 w-5 text-primary-600 mr-2" />
                    Sector 45C, Chandigarh, India 160047
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-20 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 border-l-4 border-l-red-500">
            <div className="text-center">
              <Heart className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Emergency Services
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                For medical emergencies, please call 911 immediately. For urgent home care needs:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-red-600 hover:bg-red-700">
                  <Phone className="mr-2 h-5 w-5" />
                  Emergency Hotline: +91 9050471087
                </Button>
                <Button variant="outline" size="lg">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  24/7 Support Chat
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 mt-4">
              Quick answers to common questions about our services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How do I schedule a home care visit?
              </h3>
              <p className="text-gray-600">
                You can schedule a visit by calling us at +91 9050471087, using our online form, 
                or through our patient portal. We'll assess your needs and match you with the right caregiver.
              </p>
            </Card>

            

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What areas do you serve?
              </h3>
              <p className="text-gray-600">
                We provide home care services throughout Springfield and surrounding areas within 
                a 50-mile radius. Contact us to confirm service availability in your location.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Are your caregivers licensed and insured?
              </h3>
              <p className="text-gray-600">
                Absolutely. All our caregivers are thoroughly vetted, licensed professionals with 
                comprehensive insurance coverage and ongoing training certification.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
