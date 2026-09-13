import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ProtectedRoute from './routes/ProtectedRoute';

import Home from './pages/Home';
import Services from './pages/Services';
import ContactUs from './pages/ContactUs';
import MemberPortfolio from './pages/MemberPortfolio';
import OrganizationProjects from './pages/OrganizationProjects';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import SuperAdminDashboard from './pages/SuperAdminDashboard';

import './index.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-center" />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/portfolio/:slug" element={<MemberPortfolio />} />
              <Route path="/organization-projects" element={<OrganizationProjects />} />
              <Route path="/login" element={<AdminLogin />} />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute role="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/superadmin/dashboard"
                element={
                  <ProtectedRoute role="superadmin">
                    <SuperAdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
