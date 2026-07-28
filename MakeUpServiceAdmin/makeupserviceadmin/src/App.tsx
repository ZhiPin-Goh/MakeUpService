import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Bookings } from './components/Bookings';
import { Services } from './components/Services';
import { TravelFees } from './components/TravelFees';
import { Areas } from './components/Areas';
import { Schedule } from './components/Schedule';
import { Reviews } from './components/Reviews';
import { Feedbacks } from './components/Feedbacks';
import { Notifications } from './components/Notifications';
import { Settings } from './components/Settings';
import { Login } from './components/Login';
import { ScheduleBlockers } from './components/ScheduleBlockers';

export default function App() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleMenuToggle = () => {
    if (window.innerWidth < 768) {
      setIsMobileOpen(prev => !prev);
    } else {
      setIsDesktopCollapsed(prev => !prev);
    }
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsMobileOpen(false);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="min-h-screen flex bg-background selection:bg-primary-container/20 selection:text-primary">
        <Sidebar isOpen={isMobileOpen} isCollapsed={isDesktopCollapsed} onClose={closeMobileSidebar} onLogout={handleLogout} />
        <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isDesktopCollapsed ? 'md:ml-0' : 'md:ml-[260px]'}`}>
          <Header onMenuToggle={handleMenuToggle} isCollapsed={isDesktopCollapsed} />
          <main className="flex-1 mt-[72px] p-6 md:p-10 overflow-x-hidden">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/services" element={<Services />} />
              <Route path="/areas" element={<Areas />} />
              <Route path="/travel-fees" element={<TravelFees />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/blockers" element={<ScheduleBlockers />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/feedbacks" element={<Feedbacks />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
