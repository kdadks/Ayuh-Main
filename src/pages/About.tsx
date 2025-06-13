import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Users, 
  Award, 
  Target,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Stethoscope,
  Home as HomeIcon,
  Leaf
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';

export function About() {
  const values = [
    {
      icon: Heart,
      title: 'Patient-Centered Care',
      description: 'We focus on understanding each patient\'s unique constitution and providing individualized treatment.'
    },
    {
      icon: Award,
      title: 'Classical Homeopathy',
      description: 'We follow the principles of classical homeopathy for effective and lasting healing.'
    },
    {
      icon: Users,
      title: 'Holistic Approach',
      description: 'We treat the person as a whole, addressing both physical and mental aspects of health.'
    },
    {
      icon: Target,
      title: 'Natural Healing',
      description: 'We promote the body\'s natural healing abilities through gentle and effective homeopathic remedies.'
    }
  ];

  const team = [
    {
      name: 'Dr. Nidhi Sharma',
      role: 'Chief Medical Officer',
      specialization: 'Classical Homeopathy',
      description: 'BHMS graduate with extensive experience in treating chronic diseases and acute conditions using classical homeopathy.'
    },
    {
      name: 'Deepti Sharma',
      role: 'Clinical Director',
      specialization: 'Patient Care Management',
      description: 'Experienced healthcare professional focused on enhancing patient experience and ensuring high-quality care at Ayuh Clinic.'
    },
  
  {
      name: 'Nishtha Sharma',
      role: 'Patient Care Coordinator',
      specialization: 'Patient Relations',
      description: 'Dedicated to improving patient experience and ensuring smooth communication between patients and healthcare providers.'
      
    }
  ];

  const milestones = [
    {
      year: '2019',
      title: 'Ayuh Clinic Founded',
      description: 'Established as a specialized homeopathic clinic in Chandigarh.'
    },
    {
      year: '2020',
      title: 'Pandemic Response',
      description: 'Successfully adapted to provide continuous care during COVID-19 through teleconsultations.'
    },
    {
      year: '2022',
      title: 'Expansion of Services',
      description: 'Added specialized treatments for chronic diseases and constitutional care.'
    },
    {
      year: '2023',
      title: 'Growing Community Impact',
      description: 'Established as a trusted healthcare provider in Chandigarh with a growing patient base.'
    },
        {
      year: '2025',
      title: 'Homecare Services Launched',
      description: 'Expanded our reach with homecare services, bringing healthcare assistant services directly to patients, elderly care, and nursing.'
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                About 
                <span className="text-primary-600"> Ayuh Clinic</span>
              </h1>
              <p className="text-xl text-gray-600 mt-6 leading-relaxed">
                Founded with a mission to provide expert homeopathic care in Chandigarh, 
                following the principles of classical homeopathy to deliver natural and 
                effective healing solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link to="/contact">
                  <Button size="lg">
                    Get In Touch
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="outline" size="lg">
                    Our Services
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:pl-12">
              <img
                src="/assets/team.png"
                alt="Ayuh Clinic team"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <Card className="p-8 border-l-4 border-l-primary-600">
              <CardHeader>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-600 leading-relaxed">
At Ayuh Clinic, our vision is to be the leading healthcare provider that offers personalized and comprehensive medical care tailored to each patient's unique needs and preferences. We strive to deliver exceptional healthcare by integrating your medical history, lifestyle, goals, and expectations into our treatment plans. Our dedicated team of experienced doctors and medical professionals is committed to providing the highest quality care, utilizing the latest medical technology and evidence-based practices. We aim to help you achieve your health goals and enhance your quality of life through our wide range of services, including preventive care, diagnosis, treatment of acute and chronic illnesses, and home care.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-l-4 border-l-secondary-600">
              <CardHeader>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-600 leading-relaxed">
                  At Ayuh Clinic, we understand that each patient has unique needs and preferences when it comes to their health care. That's why we offer a tailored approach that takes into account your medical history, lifestyle, goals, and expectations. Our team of experienced doctors and medical professionals are dedicated to providing you with the best care possible.
​                  Our clinic provides a wide range of medical services, including preventive care, diagnosis, and treatment of acute and chronic illnesses. We use the latest medical technology and evidence-based practices to ensure that you receive the most effective treatment possible. Let us help you achieve your health goals and improve your quality of life.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
              The principles that guide everything we do at Ayuh Clinic
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="bg-primary-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 mt-4">
              Building a legacy of healing and compassionate care
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-200"></div>
            
            {milestones.map((milestone, index) => (
              <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <Card className="p-6">
                    <div className="text-primary-600 font-bold text-lg mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </Card>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white shadow-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 mt-4">
              Expert homeopaths dedicated to providing classical homeopathic care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="w-24 h-24 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Stethoscope className="h-12 w-12 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-secondary-600 text-sm font-medium mb-3">
                  {member.specialization}
                </p>
                <p className="text-gray-600 text-sm">
                  {member.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              What We Offer
            </h2>
            <p className="text-xl text-gray-600 mt-4">
              Comprehensive healthcare services tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
            <Card className="p-8 hover:shadow-xl transition-shadow duration-300 max-w-2xl mx-auto">
              <div className="bg-green-50 rounded-full p-4 w-16 h-16 mb-6">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Homeopathy Clinic
              </h3>
              <p className="text-gray-600 mb-6">
              Comprehensive homeopathic care following classical principles. We specialize in treating 
              both acute and chronic conditions through constitutional treatment and individualized care.
              </p>
              <Link to="/homeopathy">
                <Button variant="outline">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Start Your Healing Journey?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of patients who have experienced the Ayuh Clinic difference. 
            Let us help you achieve optimal health and wellness.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button variant="secondary" size="lg">
                Get Started Today
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-primary-600">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
