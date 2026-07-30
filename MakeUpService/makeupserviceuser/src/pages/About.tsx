import React from 'react';
import { PlaneTakeoff, Leaf, BadgeCheck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="px-margin-mobile md:px-margin-desktop py-margin-desktop space-y-section-gap">
      <section className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center min-h-[70vh]">
        <div className="col-span-1 md:col-span-6 order-2 md:order-1 space-y-8 pr-0 md:pr-12">
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-background">
            {t('Unveiling')} <br/><span className="text-primary-container">{t('Natural')}</span> {t('Elegance')}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
            {t('I believe that true beauty lies in enhancing what makes you unique. My approach is rooted in an airy, sophisticated aesthetic, designed for those who appreciate refined artistry.')}
          </p>
        </div>
        <div className="col-span-1 md:col-span-6 order-1 md:order-2">
          <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg">
            <img alt="Professional portrait of Shirley" className="absolute inset-0 w-full h-full object-cover object-center" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALuRE5PTAZl1hIqh0OGrwbx4UIk67ckmXuSTYdW869rSZyU7GqbSCNNHMcn4jywni8sCy31wp8kLV-zz120m1I3edBFU9wZGHHvyZxeATvSNZEhOY1aF3gL4C2LAeUTs1Z4tg3zOndjV3AA0IjNwDGy-RMh7ATefvvy2HuAjTyt0uVorv9mjDfsHy7sJgI592JZ1SG8kLn_nd1UBMVrQe2p77KVTiZgiR8uCu09HnxGuIhOQ8xym4AmtETkfZF6tio6dLKtBBnRA"/>
          </div>
        </div>
      </section>

      <section className="space-y-16 pb-16">
        <div className="text-center">
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background mb-4">{t('Behind the Brush')}</h2>
          <div className="w-16 h-0.5 bg-primary-container mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[minmax(250px,auto)] gap-6">
          <div className="col-span-1 md:col-span-8 bg-surface-container-lowest float-card rounded-xl p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
            <h3 className="font-headline-md text-headline-md text-on-background mb-6 flex items-center gap-3">
              <PlaneTakeoff className="text-primary-container w-8 h-8" />
              {t('Her Journey')}
            </h3>
            <div className="font-body-md text-body-md text-on-surface-variant space-y-4 max-w-2xl">
              <p>{t('Starting over a decade ago in editorial fashion, my career has been a pursuit of perfect light and texture. I transitioned to high-end bridal makeup to bring that same meticulous runway standard to intimate, personal milestones.')}</p>
              <p>{t('Every face is a new canvas, and every journey I\'ve taken—from studying fine arts to training under master cosmetologists—informs the delicate touch I bring to my clients today.')}</p>
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-4 bg-surface-container-low float-card rounded-xl p-8 md:p-10 flex flex-col justify-center items-start group">
            <Leaf className="w-10 h-10 text-primary-container mb-6 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="font-headline-md text-headline-md text-on-background mb-4">{t('Philosophy on Beauty')}</h3>
            <p className="font-body-md text-body-md text-on-surface-variant italic border-l-2 border-primary-container pl-4">
              {t('"Makeup should never act as a mask. It is a tool of revelation—a way to gently coax your innate confidence to the surface."')}
            </p>
          </div>
          
          <div className="col-span-1 md:col-span-12 bg-surface-container-lowest float-card rounded-xl p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center md:items-start border border-outline-variant/10">
            <div className="md:w-1/3 flex-shrink-0">
              <h3 className="font-headline-md text-headline-md text-on-background mb-4">{t('Professional Qualifications')}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6">{t('A commitment to ongoing education and mastering the latest techniques in the industry.')}</p>
              <button className="px-6 py-2 border border-primary-container text-primary-container font-label-md text-label-md rounded-full hover:bg-primary-container/5 transition-colors">
                {t('View Full Resume')}
              </button>
            </div>
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
              <div className="flex gap-4 items-start">
                <BadgeCheck className="text-primary-container mt-1 w-6 h-6 flex-shrink-0" />
                <div>
                  <h4 className="font-label-md text-label-md text-on-background mb-2">{t('Master Cosmetologist License')}</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm">{t('Certified in advanced skin science and high-definition makeup application.')}</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <BadgeCheck className="text-primary-container mt-1 w-6 h-6 flex-shrink-0" />
                <div>
                  <h4 className="font-label-md text-label-md text-on-background mb-2">{t('Editorial Certification')}</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm">{t('Specialized training in lighting-adaptable makeup for photography and film.')}</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <BadgeCheck className="text-primary-container mt-1 w-6 h-6 flex-shrink-0" />
                <div>
                  <h4 className="font-label-md text-label-md text-on-background mb-2">{t('Bridal Masterclass')}</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm">{t('Completed exclusive workshops focusing on longevity and tear-proof techniques.')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
