import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Sparkles, Calendar, Search, ArrowLeft, HelpCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function NotFound() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-margin-mobile md:px-margin-desktop py-16 md:py-24">
      <div className="max-w-2xl mx-auto text-center" data-aos="fade-up">
        {/* 404 Display Number */}
        <div className="relative inline-block mb-6">
          <span className="font-display-lg text-[100px] md:text-[140px] leading-none font-extrabold text-primary/15 select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-primary-container/10 border border-primary-container/30 text-primary px-4 py-1.5 rounded-full font-label-md text-xs uppercase tracking-widest flex items-center gap-2 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{t('Page Not Found')}</span>
            </span>
          </div>
        </div>

        {/* Heading & Subtitle */}
        <h1 className="font-display-lg-mobile text-2xl md:text-3xl md:font-display-lg text-primary mb-4">
          {language === 'zh' ? '抱歉，您访问的页面不存在或已被移走' : 'The page you are looking for does not exist.'}
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg mx-auto mb-10 leading-relaxed">
          {language === 'zh'
            ? '您输入的网址可能拼写有误，或者该页面已被更新。不用担心，您可以从下方快速导航找到需要的内容。'
            : 'It looks like the link might be broken or the URL was entered incorrectly. Let us help you get back on track.'}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            to="/"
            className="w-full sm:w-auto bg-primary-container text-white px-8 py-3.5 rounded-full font-label-md text-xs flex items-center justify-center gap-2 shadow-sm hover:bg-primary-fixed hover:text-on-primary-fixed transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('Back to Home')}</span>
          </Link>
          <Link
            to="/booking"
            className="w-full sm:w-auto border border-primary-container text-primary-container hover:bg-primary-container hover:text-white px-8 py-3.5 rounded-full font-label-md text-xs flex items-center justify-center gap-2 transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>{t('Book Session')}</span>
          </Link>
        </div>

        {/* Quick Links Navigation Card */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 md:p-8 text-left shadow-xs">
          <h3 className="font-headline-md text-sm text-secondary uppercase tracking-wider mb-4 font-semibold text-center sm:text-left">
            {language === 'zh' ? '推荐快捷访问' : 'Popular Destinations'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              to="/services"
              className="p-3.5 rounded-xl border border-outline-variant/20 hover:border-primary/40 hover:bg-surface-container/30 transition-all flex items-center gap-3 group"
            >
              <div className="p-2 rounded-lg bg-primary-container/10 text-primary">
                <Search className="w-4 h-4" />
              </div>
              <div>
                <div className="font-headline-md text-xs text-on-background group-hover:text-primary transition-colors">
                  {t('Services')}
                </div>
                <div className="text-[11px] text-on-surface-variant/70">
                  {language === 'zh' ? '浏览精选新娘与晚宴造型' : 'Explore makeup packages'}
                </div>
              </div>
            </Link>

            <Link
              to="/faq"
              className="p-3.5 rounded-xl border border-outline-variant/20 hover:border-primary/40 hover:bg-surface-container/30 transition-all flex items-center gap-3 group"
            >
              <div className="p-2 rounded-lg bg-primary-container/10 text-primary">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <div className="font-headline-md text-xs text-on-background group-hover:text-primary transition-colors">
                  {t('FAQ')}
                </div>
                <div className="text-[11px] text-on-surface-variant/70">
                  {language === 'zh' ? '解答预约与试妆疑问' : 'Common booking queries'}
                </div>
              </div>
            </Link>

            <Link
              to="/chat"
              className="p-3.5 rounded-xl border border-outline-variant/20 hover:border-primary/40 hover:bg-surface-container/30 transition-all flex items-center gap-3 group"
            >
              <div className="p-2 rounded-lg bg-primary-container/10 text-primary">
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
              <div>
                <div className="font-headline-md text-xs text-on-background group-hover:text-primary transition-colors">
                  {t('Beauty AI')}
                </div>
                <div className="text-[11px] text-on-surface-variant/70">
                  {language === 'zh' ? '24/7 在线造型建议' : 'Interactive assistant'}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
