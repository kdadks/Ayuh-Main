import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { WhatsAppButton } from './components/whatsapp/WhatsAppButton';
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
import { PatientDashboard } from './pages/patient/Dashboard';
import { AdminDashboard } from './pages/admin/Dashboard';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminPortal } from './pages/admin/AdminPortal';
import { EmployeeDashboard } from './pages/employee/Dashboard';
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
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/homecare" element={<Homecare />} />
            <Route path="/homeopathy" element={<Homeopathy />} />
            <Route path="/services" element={<Services />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminPortal />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/patient/dashboard" element={<PatientDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
            
            {/* Blog Routes */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/homecare" element={<HomeCareBlogs />} />
            <Route path="/blog/homeopathy" element={<HomeopathyBlogs />} />
            <Route path="/blog/homecare/importance-of-homecare-assistance" element={<ImportanceOfHomecareAssistance />} />
            <Route path="/blog/homecare/cost-of-elderly-care" element={<CostOfElderlyCare />} />
            <Route path="/blog/homeopathy/boosting-immunity-naturally" element={<BoostingImmunityNaturally />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
