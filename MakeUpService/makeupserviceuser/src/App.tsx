/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LanguageProvider } from './contexts/LanguageContext';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import Booking from './pages/Booking';
import Chat from './pages/Chat';
import PrivacyPolicy from './pages/PrivacyPolicy';
import FAQ from './pages/FAQ';
import TermsAndConditions from './pages/TermsAndConditions';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetails />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </LanguageProvider>
  );
}
