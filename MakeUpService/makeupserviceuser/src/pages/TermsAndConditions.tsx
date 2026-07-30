import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ShieldCheck, FileText, Calendar, AlertCircle } from 'lucide-react';

export default function TermsAndConditions() {
  const { t, language } = useLanguage();

  return (
    <div className="px-margin-mobile md:px-margin-desktop py-12 md:py-20 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="mb-12 text-left" data-aos="fade-up">
        <span className="inline-flex items-center gap-2 text-secondary font-label-md text-xs uppercase tracking-widest mb-3">
          <FileText className="w-4 h-4 text-primary" />
          <span>{t('Legal & Policies')}</span>
        </span>
        <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary mb-4">
          {t('Terms & Conditions')}
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          <strong>{t('Effective Date:')}</strong> {t('1 August 2026')}
        </p>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-10 text-on-surface font-body-md text-body-md leading-relaxed" data-aos="fade-up" data-aos-delay="100">
        <div className="p-6 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl shadow-xs">
          <p>
            {t('Welcome to Shirley Beauty. Please read these Terms and Conditions carefully before confirming your appointment. By making a booking deposit or reserving a date with Shirley Beauty, you agree to be bound by the terms outlined below.')}
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="font-headline-md text-xl text-primary flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary-container/10 text-primary text-xs flex items-center justify-center font-bold">1</span>
            <span>{t('1. Booking Deposit & Date Confirmation')}</span>
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
            <li>{t('A 30% non-refundable deposit of the total quoted package price is required to secure your appointment date and time.')}</li>
            <li>{t('Dates are allocated on a strict first-come, first-served basis upon receipt of payment verification.')}</li>
            <li>{t('Provisional date holds without a paid deposit will automatically expire after 24 hours.')}</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="font-headline-md text-xl text-primary flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary-container/10 text-primary text-xs flex items-center justify-center font-bold">2</span>
            <span>{t('2. Travel Fees & Early Morning Surcharges')}</span>
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
            <li>{t('Travel within central Klang Valley is flat-rate. Outstation or overseas locations will incur additional travel, accommodation, and per-diem allowances.')}</li>
            <li>{t('Appointments requiring a call time before 6:00 AM incur an early morning fee of RM 100 per hour.')}</li>
            <li>{t('Parking fees, hotel valet charges, or venue entry passes on the event day must be provided or reimbursed by the client.')}</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="font-headline-md text-xl text-primary flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary-container/10 text-primary text-xs flex items-center justify-center font-bold">3</span>
            <span>{t('3. Payment Terms')}</span>
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
            <li>{t('The remaining balance of 70% must be paid on or before the day of the appointment prior to beginning the session.')}</li>
            <li>{t('We accept DuitNow FPX transfers, major Credit Cards, and cash.')}</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="font-headline-md text-xl text-primary flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary-container/10 text-primary text-xs flex items-center justify-center font-bold">4</span>
            <span>{t('4. Cancellation, Rescheduling & Refund Policy')}</span>
          </h2>
          <div className="bg-amber-500/10 border border-amber-500/20 p-5 rounded-xl space-y-2 text-on-surface">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{t('Deposit Policy Notice')}</span>
            </div>
            <p className="text-sm text-on-surface-variant">
              {t('All booking deposits are strictly non-refundable under any circumstances as dates reserved prevent other clients from securing the artist.')}
            </p>
          </div>
          <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
            <li>{t('If you wish to reschedule your date due to unforeseen circumstances, written notice must be provided at least 30 days prior to the original booking date.')}</li>
            <li>{t('Rescheduled dates are subject to Shirley Beauty’s calendar availability within 12 calendar months of the original date.')}</li>
            <li>{t('Cancellations made less than 14 days prior to the event date require 100% payment of the total agreed package cost.')}</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="font-headline-md text-xl text-primary flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary-container/10 text-primary text-xs flex items-center justify-center font-bold">5</span>
            <span>{t('5. Client Responsibilities & Skin Allergies')}</span>
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
            <li>{t('Clients must inform the artist of any known skin allergies, sensitivities, or contagious eye/skin conditions prior to the application.')}</li>
            <li>{t('Shirley Beauty cannot be held liable for adverse reactions to products if undisclosed beforehand.')}</li>
            <li>{t('Clients must provide a clean, well-lit workspace with access to a power outlet and mirror.')}</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="font-headline-md text-xl text-primary flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary-container/10 text-primary text-xs flex items-center justify-center font-bold">6</span>
            <span>{t('6. Photography & Social Media Consent')}</span>
          </h2>
          <p className="text-on-surface-variant">
            {t('Shirley Beauty reserves the right to take high-resolution before/after photographs and video recordings during the makeup transformation for portfolio, website, and social media showcase. If you prefer to opt out of public photo sharing, please notify us in writing prior to your appointment.')}
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="font-headline-md text-xl text-primary flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary-container/10 text-primary text-xs flex items-center justify-center font-bold">7</span>
            <span>{t('7. Artist Emergency & Liability')}</span>
          </h2>
          <p className="text-on-surface-variant">
            {t('In the extremely unlikely event that Shirley is unable to attend due to severe illness or emergency, Shirley Beauty will make every reasonable effort to assign an equivalent senior artist. If a suitable replacement cannot be arranged, 100% of the deposit and fees paid will be immediately refunded.')}
          </p>
        </section>

        {/* Contact Us */}
        <section className="pt-8 border-t border-outline-variant/30">
          <h2 className="font-headline-md text-xl text-primary mb-4">{t('Questions Regarding Terms?')}</h2>
          <p className="mb-4 text-on-surface-variant">{t('If you have any questions or require clarification regarding these Terms and Conditions, please contact us:')}</p>
          <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
            <li><strong>{t('Email:')}</strong> hello@shirleymakeup.com</li>
            <li><strong>{t('Phone/WhatsApp:')}</strong> +60 12-345 6789</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
