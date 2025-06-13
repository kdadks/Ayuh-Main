import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  DollarSign, 
  Star, 
  Shield, 
  Heart, 
  Users, 
  CheckCircle,
  ArrowRight,
  Home,
  Phone
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { mockHomecareServices } from '../utils/data';

export function Homecare() {
  const whyChooseUs = [
    {
      icon: Shield,
      title: 'Licensed & Certified',
      description: 'All our caregivers are licensed, bonded, and insured with thorough background checks.'
    },
    {
      icon: Heart,
      title: 'Compassionate Care',
      description: 'We provide personalized, empathetic care that treats each client with dignity and respect.'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Round-the-clock care options with emergency response and on-call support when needed.'
    },
    {
      icon: Users,
      title: 'Family Partnership',
      description: 'We work closely with families to ensure seamless communication and coordinated care.'
    }
  ];

  const careProcess = [
    {
      step: '1',
      title: 'Initial Consultation',
      description: 'Free in-home assessment to understand your unique needs and preferences.'
    },
    {
      step: '2',
      title: 'Care Plan Development',
      description: 'Customized care plan created with input from you, your family, and healthcare providers.'
    },
    {
      step: '3',
      title: 'Caregiver Matching',
      description: 'Careful selection of the perfect caregiver based on personality, skills, and availability.'
    },
    {
      step: '4',
      title: 'Ongoing Support',
      description: 'Regular check-ins, care plan adjustments, and 24/7 support for peace of mind.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-primary-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Home className="h-8 w-8 text-primary-600" />
                <span className="text-primary-600 font-semibold">Home Care Services</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Professional Care in the Comfort of Your Home
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Our compassionate caregivers provide personalized assistance with daily activities, 
                medical care, and companionship to help you or your loved ones live independently at home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg">
                    Get Started Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg">
                    <Phone className="mr-2 h-5 w-5" />
                    Free Consultation
                  </Button>
                </Link>
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/5722264/pexels-photo-5722264.jpeg"
                alt="Caregiver helping elderly patient"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Why Choose Our Home Care Services?
            </h2>
            <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
              We're committed to providing exceptional care that allows you to maintain independence 
              and dignity in your own home.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="bg-primary-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <item.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Our Home Care Services
            </h2>
            <p className="text-xl text-gray-600 mt-4">
              Comprehensive care solutions tailored to your specific needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockHomecareServices.map((service) => (
              <Card key={service.id} hover className="overflow-hidden h-full">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-3">
                    <span className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                      {service.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 flex-grow">
                    {service.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{service.duration} minutes</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span>4.9</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-5 w-5 text-primary-600" />
                        <span className="text-2xl font-bold text-primary-600">
                          {service.price}
                        </span>
                        <span className="text-gray-500">/hour</span>
                      </div>
                      <Button size="sm">
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Care Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Our Care Process
            </h2>
            <p className="text-xl text-gray-600 mt-4">
              Simple steps to get the care you need
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {careProcess.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and learn how our home care services 
            can help you or your loved ones live comfortably at home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button variant="secondary" size="lg">
                Schedule Free Consultation
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-primary-600">
                Call Now: (555) 123-4567
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}