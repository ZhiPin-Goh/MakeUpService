import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  Sparkles, 
  Globe, 
  Instagram, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Clock, 
  Calendar, 
  ArrowRight 
} from 'lucide-react';
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { t, language, setLanguage } = useLanguage();
  const [showLangMenu, setShowLangMenu] = useState(false);

  const navLinks = [
    { name: t('Home'), path: '/' },
    { name: t('Services'), path: '/services' },
    { name: t('Portfolio'), path: '/portfolio' },
    { name: t('About'), path: '/about' },
    { name: t('FAQ'), path: '/faq' },
  ];

  const isChat = location.pathname === '/chat';

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
    setShowLangMenu(false);
  };

  return (
    <div className={`flex flex-col min-h-screen pt-24 font-body-md antialiased overflow-x-hidden ${isChat ? 'h-screen overflow-y-hidden' : ''}`}>
      <header className="fixed top-0 w-full z-50 glass-nav shadow-sm transition-all duration-300">
        <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
          <Link to="/" className="font-headline-md text-headline-md tracking-tighter text-primary dark:text-primary-fixed uppercase hover:opacity-80 transition-all duration-300">
            SHIRLEY
          </Link>
          <nav className="hidden md:flex space-x-8 items-center font-label-md text-label-md uppercase tracking-widest">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={
                  location.pathname === link.path
                    ? "text-primary dark:text-primary-fixed relative after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-primary after:rounded-full hover:opacity-80 transition-all duration-300"
                    : "text-secondary hover:text-primary transition-colors hover:opacity-80 transition-all duration-300"
                }
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-secondary hover:text-primary transition-colors"
              title="Toggle Language"
            >
              <Globe className="w-5 h-5" />
              <span className="font-label-md text-sm uppercase font-bold">{language === 'en' ? 'EN' : 'CN'}</span>
            </button>
            <Link to="/booking" className="flex items-center justify-center bg-primary-container text-on-tertiary px-6 py-2 rounded-full font-label-md text-label-md uppercase tracking-widest hover:opacity-90 transition-opacity active:scale-95">
              {t('Book Now')}
            </Link>
          </div>
          <div className="md:hidden flex items-center space-x-4">
             <button 
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-primary hover:opacity-80 transition-opacity"
            >
              <Globe className="w-5 h-5" />
              <span className="font-label-md text-sm font-bold uppercase">{language === 'en' ? 'EN' : 'CN'}</span>
            </button>
            <button className="text-primary focus:outline-none">
              <Menu />
            </button>
          </div>
        </div>
      </header>

      <main className={`flex-grow w-full mx-auto ${isChat ? 'flex flex-col h-full overflow-hidden' : 'max-w-container-max'}`}>
        {children}
      </main>

      {!isChat && (
        <footer className="w-full mt-section-gap bg-surface-container-lowest dark:bg-surface-container-high border-t border-outline-variant/20 pt-16 pb-12">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 mb-12">
              {/* Brand & Mission Column (5 cols) */}
              <div className="md:col-span-5 flex flex-col justify-between">
                <div>
                  <Link to="/" className="inline-block font-headline-md text-xl tracking-tighter text-primary dark:text-primary-fixed uppercase mb-4">
                    SHIRLEY BEAUTY
                  </Link>
                  <p className="font-body-md text-sm md:text-base text-on-surface-variant max-w-sm mb-5 leading-relaxed">
                    {t('Elevating natural beauty through refined, editorial-inspired artistry.')}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-on-surface-variant/80 mb-6">
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    <span>{t('Klang Valley, Malaysia & Destination Weddings Worldwide')}</span>
                  </div>
                </div>

                {/* Social / Direct Connect Badges */}
                <div className="flex items-center gap-3">
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Instagram"
                    className="w-10 h-10 rounded-full bg-surface-container/60 hover:bg-primary-container hover:text-white text-on-surface-variant flex items-center justify-center transition-all duration-300 shadow-xs"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a 
                    href="https://wa.me/60123456789" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="WhatsApp"
                    className="w-10 h-10 rounded-full bg-surface-container/60 hover:bg-emerald-600 hover:text-white text-on-surface-variant flex items-center justify-center transition-all duration-300 shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                  <a 
                    href="mailto:hello@shirleymakeup.com" 
                    aria-label="Email"
                    className="w-10 h-10 rounded-full bg-surface-container/60 hover:bg-primary-container hover:text-white text-on-surface-variant flex items-center justify-center transition-all duration-300 shadow-xs"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Navigation Links Column (3 cols) */}
              <div className="md:col-span-3">
                <h4 className="font-label-md text-xs uppercase tracking-widest text-primary font-bold mb-5">
                  {t('Explore')}
                </h4>
                <ul className="space-y-3 font-body-md text-sm text-on-surface-variant">
                  <li>
                    <Link to="/services" className="hover:text-primary transition-colors">{t('Services & Packages')}</Link>
                  </li>
                  <li>
                    <Link to="/portfolio" className="hover:text-primary transition-colors">{t('Bridal Portfolio')}</Link>
                  </li>
                  <li>
                    <Link to="/about" className="hover:text-primary transition-colors">{t('About Shirley')}</Link>
                  </li>
                  <li>
                    <Link to="/chat" className="hover:text-primary transition-colors flex items-center gap-1.5">
                      <span>{t('AI Beauty Assistant')}</span>
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/faq" className="hover:text-primary transition-colors">{t('FAQs & Help')}</Link>
                  </li>
                </ul>
              </div>

              {/* Studio & Reservation Column (4 cols) */}
              <div className="md:col-span-4 bg-surface-container/30 border border-outline-variant/15 p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-secondary font-label-md text-[11px] uppercase tracking-wider mb-2 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    <span>{t('Studio Hours')}</span>
                  </span>
                  <h4 className="font-headline-md text-base text-primary mb-2">
                    {t('By Appointment Only')}
                  </h4>
                  <p className="font-body-md text-xs text-on-surface-variant/80 mb-5 leading-relaxed">
                    {t('Private bridal trials and event bookings available Monday to Sunday. Early morning call times accommodated upon request.')}
                  </p>
                </div>
                <Link 
                  to="/booking" 
                  className="inline-flex items-center justify-center gap-2 w-full bg-primary-container text-white py-3 rounded-xl font-label-md text-xs hover:bg-primary-fixed hover:text-on-primary-fixed transition-all shadow-xs group"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{t('Reserve Your Session')}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Bottom Bar Divider */}
            <div className="pt-8 border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant/70 font-body-md">
              <p>{t('© 2026 Shirley Beauty. All rights reserved.')}</p>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                <Link to="/faq" className="hover:text-primary transition-colors">{t('FAQ')}</Link>
                <Link to="/terms-and-conditions" className="hover:text-primary transition-colors">{t('Terms & Conditions')}</Link>
                <Link to="/privacy-policy" className="hover:text-primary transition-colors">{t('Privacy Policy')}</Link>
              </div>
            </div>
          </div>
        </footer>
      )}

      {!isChat && (
        <div className="fixed bottom-8 right-8 z-50 flex items-center justify-center group">
          <Link to="/chat" aria-label="Beauty Assistant" className="bg-primary text-on-primary rounded-full h-14 w-14 shadow-20px-blur flex items-center justify-center hover:scale-110 transition-transform duration-300 active:scale-90 focus:outline-none">
            <Sparkles />
          </Link>
          <div className="absolute right-full mr-4 bg-surface p-3 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity w-48 text-left">
            <div className="font-label-md text-label-md text-primary mb-1">{t('Beauty Assistant')}</div>
            <div className="text-xs text-on-surface-variant">{t('Ask me anything about my services')}</div>
          </div>
        </div>
      )}
    </div>
  );
}
