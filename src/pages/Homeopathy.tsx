import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Leaf, 
  Clock, 
  DollarSign, 
  Star, 
  CheckCircle, 
  ArrowRight,
  Phone,
  Award,
  Heart,
  Shield,
  Users
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { mockHomeopathyServices, mockCaseStudies, mockTreatmentPlans } from '../utils/data';

export function Homeopathy() {
  const whyChooseUs = [
    {
      icon: Leaf,
      title: 'Natural Healing',
      description: 'Gentle, non-toxic remedies that work with your body\'s natural healing mechanisms.'
    },
    {
      icon: Award,
      title: 'Experienced Practitioners',
      description: 'Board-certified homeopaths with years of clinical experience and proven results.'
    },
    {
      icon: Heart,
      title: 'Holistic Approach',
      description: 'We treat the whole person, not just symptoms, addressing root causes of illness.'
    },
    {
      icon: Shield,
      title: 'Safe & Effective',
      description: 'No side effects or drug interactions, safe for all ages including infants and pregnant women.'
    }
  ];

  const treatmentProcess = [
    {
      step: '1',
      title: 'Detailed Case Taking',
      description: 'Comprehensive consultation covering physical, mental, and emotional symptoms.'
    },
    {
      step: '2',
      title: 'Constitutional Analysis',
      description: 'Understanding your unique constitution and susceptibility patterns.'
    },
    {
      step: '3',
      title: 'Remedy Selection',
      description: 'Careful selection of the most appropriate homeopathic remedy for your case.'
    },
    {
      step: '4',
      title: 'Follow-up & Monitoring',
      description: 'Regular follow-ups to monitor progress and adjust treatment as needed.'
    }
  ];

  const conditions = [
    'Allergies & Asthma',
    'Anxiety & Depression',
    'Arthritis & Joint Pain',
    'Digestive Disorders',
    'Skin Conditions',
    'Hormonal Imbalances',
    'Chronic Fatigue',
    'Migraines & Headaches',
    'Sleep Disorders',
    'Children\'s Health Issues'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-secondary-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="h-8 w-8 text-secondary-600" />
                <span className="text-secondary-600 font-semibold">Homeopathy Clinic</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Natural Healing Through Classical Homeopathy
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Experience the gentle power of homeopathic medicine. Our experienced practitioners 
                use time-tested natural remedies to stimulate your body's innate healing abilities 
                and restore optimal health.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="bg-secondary-600 hover:bg-secondary-700">
                    Book Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg">
                    <Phone className="mr-2 h-5 w-5" />
                    Call Us Today
                  </Button>
                </Link>
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg"
                alt="Homeopathic remedies and consultation"
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
              Why Choose Our Homeopathy Clinic?
            </h2>
            <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
              Discover the benefits of classical homeopathy with our experienced practitioners 
              who are dedicated to your holistic wellness journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="bg-secondary-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <item.icon className="h-8 w-8 text-secondary-600" />
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
              Our Homeopathy Services
            </h2>
            <p className="text-xl text-gray-600 mt-4">
              Comprehensive natural healing solutions for all ages
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockHomeopathyServices.map((service) => (
              <Card key={service.id} hover className="overflow-hidden h-full">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-3">
                    <span className="inline-block bg-secondary-100 text-secondary-800 text-xs px-2 py-1 rounded-full">
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
                        <DollarSign className="h-5 w-5 text-secondary-600" />
                        <span className="text-2xl font-bold text-secondary-600">
                          {service.price}
                        </span>
                      </div>
                      <Button size="sm" className="bg-secondary-600 hover:bg-secondary-700">
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

      {/* Treatment Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Our Treatment Process
            </h2>
            <p className="text-xl text-gray-600 mt-4">
              A systematic approach to natural healing
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {treatmentProcess.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-secondary-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
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

      {/* Conditions We Treat */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Conditions We Treat
            </h2>
            <p className="text-xl text-gray-600 mt-4">
              Homeopathy can help with a wide range of acute and chronic conditions
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {conditions.map((condition, index) => (
              <div key={index} className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                <CheckCircle className="h-6 w-6 text-secondary-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">{condition}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 mt-4">
              Real cases demonstrating the effectiveness of homeopathic treatment
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockCaseStudies.map((caseStudy) => (
              <Card key={caseStudy.id} className="overflow-hidden">
                <img
                  src={caseStudy.image}
                  alt={caseStudy.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="mb-3">
                    <span className="inline-block bg-secondary-100 text-secondary-800 text-xs px-2 py-1 rounded-full">
                      {caseStudy.condition}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {caseStudy.title}
                  </h3>
                  <div className="text-sm text-gray-600 mb-3">
                    <span>{caseStudy.age} • {caseStudy.gender} • {caseStudy.duration}</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    <strong>Outcome:</strong> {caseStudy.outcome}
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Read Full Case
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Plan Example */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Sample Treatment Plan
            </h2>
            <p className="text-xl text-gray-600 mt-4">
              See how we create personalized treatment plans for our patients
            </p>
          </div>
          
          {mockTreatmentPlans.map((plan) => (
            <Card key={plan.id} className="p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Treatment for {plan.condition}
                </h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>Duration: {plan.duration}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    plan.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {plan.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Prescribed Remedies</h4>
                  <div className="space-y-4">
                    {plan.remedies.map((remedy, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium text-gray-900">{remedy.name}</h5>
                          <span className="text-sm text-gray-600">{remedy.potency}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          <strong>Dosage:</strong> {remedy.dosage} - {remedy.frequency}
                        </p>
                        <p className="text-sm text-gray-600 mb-1">
                          <strong>Duration:</strong> {remedy.duration}
                        </p>
                        <p className="text-xs text-gray-500">{remedy.instructions}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Lifestyle Recommendations</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Dietary Guidelines</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {plan.dietaryRecommendations.map((rec, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-secondary-600 mt-0.5 flex-shrink-0" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Lifestyle Changes</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {plan.lifestyleChanges.map((change, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-secondary-600 mt-0.5 flex-shrink-0" />
                            <span>{change}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Follow-up Schedule</h4>
                <div className="flex flex-wrap gap-2">
                  {plan.followUpSchedule.map((followUp, index) => (
                    <span key={index} className="bg-secondary-100 text-secondary-800 px-3 py-1 rounded-full text-sm">
                      {followUp}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Start Your Natural Healing Journey
          </h2>
          <p className="text-xl text-secondary-100 mb-8 max-w-2xl mx-auto">
            Experience the gentle power of homeopathy. Book your consultation today 
            and discover how natural medicine can transform your health.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button variant="secondary" size="lg" className="bg-white text-secondary-600 hover:bg-gray-100">
                Book Initial Consultation
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-secondary-600">
                Call: (555) 123-4567
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}