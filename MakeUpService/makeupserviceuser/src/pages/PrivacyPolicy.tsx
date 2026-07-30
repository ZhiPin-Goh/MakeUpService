import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function PrivacyPolicy() {
  const { t } = useLanguage();

  return (
    <div className="px-margin-mobile md:px-margin-desktop py-16 max-w-3xl mx-auto">
      <div className="mb-12 text-left">
        <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary mb-4">{t('Privacy Policy')}</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          <strong>{t('Effective Date:')}</strong> {t('1 August 2026')}
        </p>
      </div>

      <div className="space-y-8 text-on-surface font-body-md text-body-md leading-relaxed">
        <p>
          {t('Welcome to Shirley Makeup. We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and protect the information you provide when using our booking system.')}
        </p>

        <section>
          <h2 className="font-headline-md text-headline-md text-primary mb-4">{t('1. What Information We Collect')}</h2>
          <p className="mb-4">{t('When you make an appointment through our website, we only collect the necessary information to provide our services, which includes:')}</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t('Your full name')}</li>
            <li>{t('Contact number (Phone/WhatsApp)')}</li>
            <li>{t('Email address')}</li>
            <li>{t('Appointment date and time')}</li>
            <li>{t('Location/Address (for mobile service and travel fee calculation)')}</li>
          </ul>
        </section>

        <section>
          <h2 className="font-headline-md text-headline-md text-primary mb-4">{t('2. How We Use Your Information')}</h2>
          <p className="mb-4">{t('We use the collected information solely for the following purposes:')}</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t('To process and confirm your makeup appointment.')}</li>
            <li>{t('To calculate accurate travel fees based on your location.')}</li>
            <li>{t('To contact you regarding your booking (e.g., reminders, updates, or emergencies).')}</li>
            <li>{t('To maintain our internal client records for future bookings.')}</li>
          </ul>
        </section>

        <section>
          <h2 className="font-headline-md text-headline-md text-primary mb-4">{t('3. Data Sharing and Protection')}</h2>
          <p>
            {t('Your privacy is our priority.')} <strong>{t('We do not sell, rent, or share your personal information with any third parties or marketing agencies.')}</strong> {t('Your data is stored securely in our system and is only accessible by our authorized admin and makeup artist.')}
          </p>
        </section>

        <section>
          <h2 className="font-headline-md text-headline-md text-primary mb-4">{t('4. Data Retention')}</h2>
          <p>
            {t('We retain your booking details in our system to keep track of our business operations and to serve you better in future appointments.')}
          </p>
        </section>

        <section>
          <h2 className="font-headline-md text-headline-md text-primary mb-4">{t('5. Your Rights')}</h2>
          <p>
            {t('If you wish to view, update, or request the deletion of your personal data from our system, please feel free to contact us at any time.')}
          </p>
        </section>

        <section className="pt-8 border-t border-outline-variant/30">
          <h2 className="font-headline-md text-headline-md text-primary mb-4">{t('Contact Us')}</h2>
          <p className="mb-4">{t('If you have any questions about this Privacy Policy or your personal data, please contact us at:')}</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>{t('Email:')}</strong> hello@shirleymakeup.com</li>
            <li><strong>{t('Phone/WhatsApp:')}</strong> +60 12-345 6789</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
