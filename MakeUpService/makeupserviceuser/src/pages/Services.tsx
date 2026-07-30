import React from 'react';
import { Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { servicesData } from '../data';
import { useLanguage } from '../contexts/LanguageContext';

export default function Services() {
  const { t, language } = useLanguage();

  return (
    <div className="px-margin-mobile md:px-margin-desktop py-12 md:py-24">
      <div className="text-center mb-16 md:mb-24">
        <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary mb-4">{t('Curated Services')}</h1>
        <p className="font-body-lg text-body-lg text-secondary max-w-2xl mx-auto">{t('Tailored makeup artistry for your most memorable moments. Editorial quality, refined for every occasion.')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-section-gap md:gap-y-32">
        {servicesData.map((service, idx) => (
          <Link to={`/services/${service.id}`} key={service.id} className={`group flex flex-col gap-6 ${idx % 2 !== 0 ? 'md:pt-24' : ''}`}>
            <div className={`relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-20px-blur ${!service.image ? 'bg-surface-container-high flex items-center justify-center' : ''}`}>
              <img alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={service.image} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-end border-b border-outline-variant/30 pb-4">
                <div>
                  <span className="inline-block px-3 py-1 bg-primary-container/10 text-primary font-label-md text-label-md rounded-full mb-3">{t(service.tag)}</span>
                  <h2 className="font-headline-md text-headline-md text-on-background group-hover:text-primary transition-colors">{language === 'zh' ? (service as any).title_zh || service.title : service.title}</h2>
                </div>
                <p className="font-label-md text-label-md text-primary text-right">{language === 'zh' ? (service as any).price_zh || service.price : service.price}</p>
              </div>
              <p className="font-body-md text-body-md text-secondary">{language === 'zh' ? (service as any).description_zh || service.description : service.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-24 p-8 bg-surface-container-low rounded-xl border border-outline-variant/20 text-center max-w-3xl mx-auto">
        <Info className="text-primary mb-2 mx-auto" />
        <p className="font-body-md text-body-md text-secondary italic">{t('Note: Final price may include travel fees based on location distance. All services require a non-refundable deposit to secure the booking date.')}</p>
      </div>
    </div>
  );
}
