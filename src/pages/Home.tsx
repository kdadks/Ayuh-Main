import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Shield, 
  Clock, 
  Users, 
  Star, 
  CheckCircle,
  ArrowRight,
  Phone,
  Leaf,
  Stethoscope,
  Home as HomeIcon
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';

export function Home() {
  const services = [
    {
      icon: HomeIcon,
      title: 'Home Care Services',
      description: 'Professional caregivers providing personalized care in the comfort of your home.',
      link: '/homecare',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: Leaf,
      title: 'Homeopathy Clinic',
      description: 'Natural healing through classical homeopathy for holistic wellness.',
      link: '/homeopathy',
      color: 'bg-green-50 text-green-600'
    }
  ];

  const features = [
    {
      icon: Heart,
      title: 'Compassionate Care',
      description: 'Our certified professionals provide empathetic care tailored to your unique needs.'
    },
    {
      icon: Shield,
      title: 'Licensed & Insured',
      description: 'All our practitioners are thoroughly vetted, licensed professionals with comprehensive coverage.'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Round-the-clock care options available, including emergency response and on-call support.'
    },
    {
      icon: Users,
      title: 'Family-Centered',
      description: 'We work closely with families to ensure seamless communication and coordinated care plans.'
    }
  ];

  const testimonials = [
    {
      name: 'Margaret Thompson',
      role: 'Home Care Client',
      content: 'The care my mother receives from Ayuh Clinic is exceptional. The caregivers are professional, kind, and truly care about her wellbeing.',
      rating: 5
    },
    {
      name: 'Robert Chen',
      role: 'Homeopathy Patient',
      content: 'Dr. Thompson\'s homeopathic treatment helped me overcome chronic migraines that conventional medicine couldn\'t address.',
      rating: 5
    },
    {
      name: 'Susan Williams',
      role: 'Family Member',
      content: 'Ayuh Clinic has been a blessing for our family. The integrated approach to health and wellness is remarkable.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Comprehensive Healthcare
                <span className="text-primary-600"> Solutions</span>
              </h1>
              <p className="text-xl text-gray-600 mt-6 leading-relaxed">
                From professional home care services to natural homeopathic healing - 
                we provide integrated healthcare solutions with compassion and expertise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    <Phone className="mr-2 h-5 w-5" />
                    Call Us Now
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:pl-12 animate-slide-up">
              <img
                src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg"
                alt="Healthcare professional with patient"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Our Healthcare Services
            </h2>
            <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
              Discover our comprehensive range of healthcare solutions designed to meet your unique needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {services.map((service, index) => (
              <Link key={index} to={service.link}>
                <Card className="text-center p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full">
                  <div className={`${service.color} rounded-full p-6 w-20 h-20 mx-auto mb-6`}>
                    <service.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                  <Button variant="outline" className="group">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Why Choose Ayuh Clinic?
            </h2>
            <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
              We're committed to providing the highest quality care with the personal touch that makes all the difference.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="bg-primary-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 mt-4">
              Real experiences from the families and patients we serve
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Experience Better Healthcare?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of families who trust Ayuh Clinic for their comprehensive healthcare needs. 
            Get a free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button variant="secondary" size="lg">
                Start Your Journey
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-primary-600">
                Schedule Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}