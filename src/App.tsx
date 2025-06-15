import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { WhatsAppButton } from './components/whatsapp/WhatsAppButton';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
// Import auth test for development debugging
import './utils/authTest';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { Homecare } from './pages/Homecare';
import { Homeopathy } from './pages/Homeopathy';
import { Services } from './pages/Services';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { TestLogin } from './pages/TestLogin';
import { PatientDashboard } from './pages/patient/Dashboard';
import { AdminDashboard } from './pages/admin/Dashboard';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminPortal } from './pages/admin/AdminPortal';
import { EmployeeDashboard } from './pages/employee/Dashboard';
import { CandidateDashboard } from './pages/candidate/Dashboard';
import Blog from './pages/Blog';
import HomeCareBlogs from './pages/blog/HomeCareBlogs';
import HomeopathyBlogs from './pages/blog/HomeopathyBlogs';
import ImportanceOfHomecareAssistance from './pages/blog/homecare/ImportanceOfHomecareAssistance';
import CostOfElderlyCare from './pages/blog/homecare/CostOfElderlyCare';
import BoostingImmunityNaturally from './pages/blog/homeopathy/BoostingImmunityNaturally';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white relative">
        <Header />
        <main>
          {/* WhatsApp Button */}
          <div className="fixed bottom-4 right-4 z-50">
            <WhatsAppButton />
          </div>
          <Routes>
            {/* Public Routes - No authentication required */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/homecare" element={<Homecare />} />
            <Route path="/homeopathy" element={<Homeopathy />} />
            <Route path="/test-login" element={<TestLogin />} />
            <Route path="/services" element={<Services />} />
            
            {/* Public Blog Routes */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/homecare" element={<HomeCareBlogs />} />
            <Route path="/blog/homeopathy" element={<HomeopathyBlogs />} />
            <Route path="/blog/homecare/importance-of-homecare-assistance" element={<ImportanceOfHomecareAssistance />} />
            <Route path="/blog/homecare/cost-of-elderly-care" element={<CostOfElderlyCare />} />
            <Route path="/blog/homeopathy/boosting-immunity-naturally" element={<BoostingImmunityNaturally />} />
            
            {/* Authentication Routes - Public when not authenticated */}
            <Route path="/login" element={
              <ProtectedRoute requireAuth={false}>
                <Login />
              </ProtectedRoute>
            } />
            <Route path="/register" element={
              <ProtectedRoute requireAuth={false}>
                <Register />
              </ProtectedRoute>
            } />
            
            {/* Admin Portal Routes - Public access for admin login */}
            <Route path="/admin" element={<AdminPortal />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Protected Dashboard Routes - Role-based access */}
            <Route path="/patient/dashboard" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <PatientDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/employee/dashboard" element={
              <ProtectedRoute allowedRoles={['employee']}>
                <EmployeeDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/candidate/dashboard" element={
              <ProtectedRoute allowedRoles={['candidate']}>
                <CandidateDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/candidate" element={
              <ProtectedRoute allowedRoles={['candidate']}>
                <CandidateDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/dashboard" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
            {/* Future role routes - ready for caregiver and homeopath */}
            <Route path="/caregiver/dashboard" element={
              <ProtectedRoute allowedRoles={['caregiver']}>
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Caregiver Dashboard</h1>
                    <p className="text-gray-600">Coming Soon - Caregiver dashboard is under development</p>
                  </div>
                </div>
              </ProtectedRoute>
            } />
            
            <Route path="/homeopath/dashboard" element={
              <ProtectedRoute allowedRoles={['homeopath']}>
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Homeopath Dashboard</h1>
                    <p className="text-gray-600">Coming Soon - Homeopath dashboard is under development</p>
                  </div>
                </div>
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
