import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './pages/Home/Home.jsx';
import Footer from './components/Footer/Footer.jsx';
import BackToTop from './components/BackToTop/BackToTop.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';
import Search from './pages/Search/Search.jsx';
import GlobalLoading from './components/GlobalLoading/GlobalLoading.jsx';
import Dashboard from './pages/dashboard/DashboardLayout.jsx';
import Overview from './pages/dashboard/Overview.jsx';
import Fleet from './pages/dashboard/Fleet.jsx';
import DashboardRoutes from './pages/dashboard/Routes.jsx';
import Fines from './pages/dashboard/Fines.jsx';
import Financial from './pages/dashboard/Financial.jsx';
import RegisterDriver from './pages/dashboard/RegisterDriver.jsx';
import RegisterEmployee from './pages/dashboard/RegisterEmployee.jsx';
import Analytics from './pages/dashboard/Analytics.jsx';
import Announcements from './pages/dashboard/Announcements.jsx';
import UserProfile from './pages/profiles/UserProfile.jsx';
import CompanyProfile from './pages/profiles/CompanyProfile.jsx';
import EmployeeProfile from './pages/profiles/EmployeeProfile.jsx';
import { NotificationProvider } from './contexts/NotificationContext.jsx';
import Support from './pages/Support/Support.jsx';
import Planos from './pages/Planos/Planos.jsx';
import Settings from './pages/Settings/Settings.jsx';
import ProtectedRoute from './components/Auth/ProtectedRoute.jsx';
import Login from './components/Auth/Login.jsx';
import Privacy from './pages/Privacy/Privacy.jsx';
import Empresa from './pages/Empresa/Empresa.jsx';
import { useAuth } from './context/AuthContext.jsx';
import Billing from './pages/Planos/Billing.jsx';
import DevelopmentPopup from './components/DevelopmentPopup/DevelopmentPopup.jsx';

export default function AppContent() {
  const { user } = useAuth();
  const [globalLoading, setGlobalLoading] = useState(true);
  const [showDevPopup, setShowDevPopup] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const isAuthenticated = !!user;

  useEffect(() => {
    const hasSeenDevPopup = localStorage.getItem('hasSeenDevPopup');
    if (!hasSeenDevPopup) setShowDevPopup(true);
  }, []);

  const handleGlobalLoadingComplete = () => setGlobalLoading(false);
  const handleLogin = () => {};
  const handleDevPopupClose = () => {
    setShowDevPopup(false);
    localStorage.setItem('hasSeenDevPopup', 'true');
  };

  const handleLogout = async () => {
    // logout handled by Navbar via context
  };

  return (
    <NotificationProvider>
      <div className="app">
        {globalLoading && <GlobalLoading onComplete={handleGlobalLoadingComplete} />}
        <DevelopmentPopup isVisible={showDevPopup} onClose={handleDevPopupClose} />

        <Navbar onLogout={handleLogout} />

        <div className="app-content">
          <main className={`main-content ${isAuthenticated ? 'with-navbar' : ''}`}>
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/login" element={<Login initialMode={searchParams.get('mode') || 'login'} onLogin={handleLogin} />} />

              <Route path="/support" element={<Support />} />
              <Route path="/planos" element={<Planos />} />
              <Route path="/search" element={<Search />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/empresa" element={<Empresa />} />

              {/* Rotas Protegidas */}
              <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
              <Route path="/profile/company" element={<ProtectedRoute><CompanyProfile /></ProtectedRoute>} />
              <Route path="/profile/employee" element={<ProtectedRoute><EmployeeProfile /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
                <Route index element={<Overview />} />
                <Route path="fleet" element={<Fleet />} />
                <Route path="routes" element={<DashboardRoutes />} />
                <Route path="fines" element={<Fines />} />
                <Route path="financial" element={<Financial />} />
                <Route path="register-driver" element={<RegisterDriver />} />
                <Route path="register-employee" element={<RegisterEmployee />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="announcements" element={<Announcements />} />
              </Route>
              <Route path="/billing" element={<Billing />} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>

        <Footer />
      </div>
    </NotificationProvider>
  );
}
