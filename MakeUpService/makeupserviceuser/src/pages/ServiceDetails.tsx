import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { servicesData } from '../data';
import { useLanguage } from '../contexts/LanguageContext';

export default function ServiceDetails() {
  const { id } = useParams();
  const service = servicesData.find(s => s.id === id);
  const { t, language } = useLanguage();

  if (!service) {
    return (
      <div className="px-margin-mobile md:px-margin-desktop py-24 text-center">
        <h1 className="font-headline-lg text-headline-lg mb-4">{t('Service Not Found')}</h1>
        <Link to="/services" className="text-primary hover:underline">{t('Back to Services')}</Link>
      </div>
    );
  }

  return (
    <div className="px-margin-mobile md:px-margin-desktop py-12 md:py-24">
      <Link to="/services" className="inline-flex items-center text-secondary hover:text-primary transition-colors mb-8 group">
        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        {t('Back to Services')}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24">
        <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-20px-blur">
          {service.image ? (
            <img alt={service.title} className="w-full h-full object-cover" src={service.image} />
          ) : (
            <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
              <span className="text-secondary">No image available</span>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <span className="inline-block px-3 py-1 bg-primary-container/10 text-primary font-label-md text-label-md rounded-full mb-6 w-fit">{t(service.tag)}</span>
          <h1 className="font-display-md text-display-md-mobile md:text-display-md text-on-background mb-4">{language === 'zh' ? (service as any).title_zh || service.title : service.title}</h1>
          <p className="font-headline-sm text-headline-sm text-primary mb-8">{language === 'zh' ? (service as any).price_zh || service.price : service.price}</p>
          <p className="font-body-lg text-body-lg text-secondary mb-12 leading-relaxed">{language === 'zh' ? (service as any).description_zh || service.description : service.description}</p>
          
          <Link to="/booking" className="bg-primary text-on-primary px-8 py-4 rounded-full font-label-lg text-label-lg hover:bg-primary/90 transition-colors text-center w-full md:w-auto shadow-sm hover:shadow-md">
            {t('Book Now')}
          </Link>
        </div>
      </div>
    </div>
  );
}
