import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Award, 
  HeartHandshake, 
  ShieldCheck, 
  MapPin, 
  CheckCircle2, 
  ChevronDown,
  MessageCircle,
  Calendar,
  Camera,
  Crown,
  Sparkle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { motion, AnimatePresence } from 'motion/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

declare global {
  interface Window {
    AOS?: {
      init: (options?: any) => void;
      refresh: () => void;
    };
  }
}

// Motion Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
};

const zoomIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
  }
};

const signatureServices = [
  {
    id: 'bridal-makeup',
    icon: Crown,
    title: 'Bridal Artistry',
    title_zh: '高级新娘造型',
    price: 'From RM 1,200',
    price_zh: 'RM 1,200 起',
    tag: 'Bridal',
    description: 'Long-lasting, radiant makeup tailored for your special day. Includes trial session, touch-up kit, and lash installation.',
    description_zh: '专为大喜之日定制的持久焕彩妆容。包含定妆试妆、补妆礼包及睫毛佩戴。',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYV3ptJG-8gouAn8ivF0GfprlC-4NVNizWkyvHlvT1WGOB7zDsME6leB1SugUfvpACuHIv1RPIMvop-a5rxcmqmY53LprLr0gpisyG_3FchAFbyTX658LkGCic1jyoLsgU_SeDTzNOP-VigX51T-hg_IdVCQmyM8o06XCh8k9ACEeLGaRFKtkxfzDwciLoJfc7OGXp23P-fdDpG72n5UMw8LIblnj2gWvUKC-Nh_quRNz9WBuB5IOP-vv8oDEbtmZzaORWd_CWzw'
  },
  {
    id: 'dinner-event',
    icon: Sparkle,
    title: 'Dinner & Event Glam',
    title_zh: '晚宴活动造型',
    price: 'From RM 450',
    price_zh: 'RM 450 起',
    tag: 'Dinner',
    description: 'Sophisticated and striking looks for galas, red carpets, and high-profile evening celebrations.',
    description_zh: '专为晚宴、红毯及高级庆典定制的精致璀璨盛装妆容。',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqGbpH0A8LPDx40IYFj1YEvZ3U36tNtoLr379cQnMkQi2L8IOLAlhLoj1KjI_xHNF8J25E_yP0JCQ_T8QyldziTj7IgiX9ZHWnrd8wdJ_5OdtrlgIVqvf26RssiJuHbpIxzMefA8RC9R1q-WP-pNOTxkBNdVtpenYvO2MeQwu3SurorLDzg95856nlTtwGaZt14Gl90k34yHUKM6ynOd5Sz0IoDQIDcCLuhGg5Hse0-Yw4iyGi-kpGO6YVKDVnokRso1kCWjcejQ'
  },
  {
    id: 'photoshoot-editorial',
    icon: Camera,
    title: 'Photoshoot & Editorial',
    title_zh: '时尚摄影杂志妆容',
    price: 'From RM 650',
    price_zh: 'RM 650 起',
    tag: 'Photoshoot',
    description: 'Camera-ready, HD makeup designed specifically for studio lighting and high-fashion editorial shoots.',
    description_zh: '专为影棚灯光与高级时尚大片设计的超高清抓镜彩妆。',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWrMnm59ZjVovfzt2X0W3n1aIW8msLK7mCl7JwEDPs-R_BI_U5AJwEzHpyg5IEgsjqM0RHR83FegQeozYrS3IsVnWi7t1hyCL_UnvrbDreWfz1CNsJ0uPnSmtQFzGZSbcEGe53YXnD7sqF24lMMmFyLRx7X9cSJCrM8Ir4kIcQfEh6E8HvXy6X2D5T80CLiWO9CsxO3fSFR1_tz5XgGEf3y_bQlZa2jFXvd9CD0Cpl_2nS-JBqhuJJX055qkaIj9vf7--RW2QLCg'
  }
];

const portfolioItems = [
  {
    id: '1',
    category: 'Bridal',
    title: 'Timeless Elegance',
    title_zh: '永恒的优雅',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYV3ptJG-8gouAn8ivF0GfprlC-4NVNizWkyvHlvT1WGOB7zDsME6leB1SugUfvpACuHIv1RPIMvop-a5rxcmqmY53LprLr0gpisyG_3FchAFbyTX658LkGCic1jyoLsgU_SeDTzNOP-VigX51T-hg_IdVCQmyM8o06XCh8k9ACEeLGaRFKtkxfzDwciLoJfc7OGXp23P-fdDpG72n5UMw8LIblnj2gWvUKC-Nh_quRNz9WBuB5IOP-vv8oDEbtmZzaORWd_CWzw'
  },
  {
    id: '2',
    category: 'Dinner',
    title: 'Bold & Beautiful',
    title_zh: '大胆与美丽',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqGbpH0A8LPDx40IYFj1YEvZ3U36tNtoLr379cQnMkQi2L8IOLAlhLoj1KjI_xHNF8J25E_yP0JCQ_T8QyldziTj7IgiX9ZHWnrd8wdJ_5OdtrlgIVqvf26RssiJuHbpIxzMefA8RC9R1q-WP-pNOTxkBNdVtpenYvO2MeQwu3SurorLDzg95856nlTtwGaZt14Gl90k34yHUKM6ynOd5Sz0IoDQIDcCLuhGg5Hse0-Yw4iyGi-kpGO6YVKDVnokRso1kCWjcejQ'
  },
  {
    id: '3',
    category: 'Natural',
    title: 'Flawless Glow',
    title_zh: '无瑕光彩',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBF42q1HP9_tpjq14_7TW5KI1a8W0nIBR7M1kggpX4DsUxCxj5cn9upOj7cSovMpAxtvPRKVlBXVu8fOUGEYE8RXkyF2wKiwwD2Vn9qj-PjmHEcU9ZZDAhD5QkUBC8f49isbf-myq3Oea2JapZAjLAcRDQzFaUTo_QEfw-ozLSbkpdHcnupGGad5Zyc8RKZdYrvAG199ijMQ00buvixy6xqx_Il9ipK7ti_O3Dr7WsL1VFCdtjWbaM3sKzA5Rz6atFJyOfARVV31Q'
  },
  {
    id: '4',
    category: 'Photoshoot',
    title: 'High Fashion Editorial',
    title_zh: '高级时尚大片',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWrMnm59ZjVovfzt2X0W3n1aIW8msLK7mCl7JwEDPs-R_BI_U5AJwEzHpyg5IEgsjqM0RHR83FegQeozYrS3IsVnWi7t1hyCL_UnvrbDreWfz1CNsJ0uPnSmtQFzGZSbcEGe53YXnD7sqF24lMMmFyLRx7X9cSJCrM8Ir4kIcQfEh6E8HvXy6X2D5T80CLiWO9CsxO3fSFR1_tz5XgGEf3y_bQlZa2jFXvd9CD0Cpl_2nS-JBqhuJJX055qkaIj9vf7--RW2QLCg'
  },
  {
    id: '5',
    category: 'Bridal',
    title: 'Romantic Glow Bridal',
    title_zh: '浪漫唯美新娘',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiTsxOYEujEbQs0zq38I6_E_zF6b2YLWKhiJtt7ZHsk4zIrqDyYNXjF8bmLpY9uTK0DupnCb5zD0OqPZCKwUWoiJB-y8U1asM_hBFAb4fcbFU0CezJmZjATQQqM4sMdBUo2mcqbgZmMiNunuwi-pEU0TFKt4zIrm-BnJXkYVahjZB_VrrPNCgS-q9E8httNr9PLJvxZCV5yr1cUHqTl0FpITagu-UV0FPFNn5P_gdu0fZYGz4AFa6t8WJ6VRQ3PiEySYfbokaoRQ'
  },
  {
    id: '6',
    category: 'Photoshoot',
    title: 'Vogue Style Portrait',
    title_zh: 'Vogue 风格人像',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZnkawOuldAa08QMAQZshAHHLsIBN-OWQAQoe0Xaq_3tFYxxkcXOzKMWJBif7l9t1_yeKZxpZajq4IlSUixsNJ0Ys1vHy2O7LpeDIhglufVJeULQ6DV242EZMKym2nb42YnafQAKwbP8wUfVNbWX3K_CCbEmKE7R9oh2sLARWL_miFPzLYButV7uUI2LJNVTwTyBz8q-NmECkIHLwC7BVknAjTYsZr_OnpMxkSeKqRpQgCvzGwtoiDWABlmXkgSe6VYvCvO_WVSA'
  }
];

export default function Home() {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.AOS) {
      window.AOS.init({
        duration: 800,
        once: true,
        offset: 100
      });
      window.AOS.refresh();
    }
  }, []);

  const slides = [
    {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCiTsxOYEujEbQs0zq38I6_E_zF6b2YLWKhiJtt7ZHsk4zIrqDyYNXjF8bmLpY9uTK0DupnCb5zD0OqPZCKwUWoiJB-y8U1asM_hBFAb4fcbFU0CezJmZjATQQqM4sMdBUo2mcqbgZmMiNunuwi-pEU0TFKt4zIrm-BnJXkYVahjZB_VrrPNCgS-q9E8httNr9PLJvxZCV5yr1cUHqTl0FpITagu-UV0FPFNn5P_gdu0fZYGz4AFa6t8WJ6VRQ3PiEySYfbokaoRQ",
      title: 'Elevate Your Beauty',
      subtitle: 'Professional makeup artistry tailored to enhance your natural grace for every occasion.'
    },
    {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYV3ptJG-8gouAn8ivF0GfprlC-4NVNizWkyvHlvT1WGOB7zDsME6leB1SugUfvpACuHIv1RPIMvop-a5rxcmqmY53LprLr0gpisyG_3FchAFbyTX658LkGCic1jyoLsgU_SeDTzNOP-VigX51T-hg_IdVCQmyM8o06XCh8k9ACEeLGaRFKtkxfzDwciLoJfc7OGXp23P-fdDpG72n5UMw8LIblnj2gWvUKC-Nh_quRNz9WBuB5IOP-vv8oDEbtmZzaORWd_CWzw",
      title: 'Timeless Elegance',
      subtitle: 'Curated bridal makeup designed for the modern muse.'
    },
    {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqGbpH0A8LPDx40IYFj1YEvZ3U36tNtoLr379cQnMkQi2L8IOLAlhLoj1KjI_xHNF8J25E_yP0JCQ_T8QyldziTj7IgiX9ZHWnrd8wdJ_5OdtrlgIVqvf26RssiJuHbpIxzMefA8RC9R1q-WP-pNOTxkBNdVtpenYvO2MeQwu3SurorLDzg95856nlTtwGaZt14Gl90k34yHUKM6ynOd5Sz0IoDQIDcCLuhGg5Hse0-Yw4iyGi-kpGO6YVKDVnokRso1kCWjcejQ",
      title: 'Bold & Beautiful',
      subtitle: 'Glamour looks for events and special occasions.'
    }
  ];

  const categories = ['All', 'Bridal', 'Dinner', 'Photoshoot', 'Natural'];

  const filteredPortfolio = activeCategory === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  const scrollToAbout = () => {
    const el = document.getElementById('about-artist');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const serviceDelays = [undefined, '150', '300'];

  return (
    <div className="overflow-x-hidden bg-background text-on-background">
      {/* 1. HERO BANNER SECTION */}
      <section 
        data-aos="fade-up"
        className="relative w-full h-[90vh] min-h-[640px] flex items-center justify-center -mt-24"
      >
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="w-full h-full absolute inset-0 z-0 hero-swiper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="absolute inset-0 z-0">
                <img alt={`Slide ${index + 1}`} className="w-full h-full object-cover object-top" src={slide.image} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30"></div>
              </div>
              <div className="relative z-10 w-full h-full flex items-center justify-center text-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto pointer-events-none pt-16">
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                  className="flex flex-col items-center"
                >
                  <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 py-1.5 rounded-full font-label-md text-xs mb-6 tracking-widest uppercase shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    Klang Valley & Destination Artistry
                  </span>
                  <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-white mb-6 drop-shadow-lg max-w-4xl">{t(slide.title)}</h1>
                  <p className="font-body-lg text-body-lg text-white/90 max-w-2xl mb-10 drop-shadow-md leading-relaxed">{t(slide.subtitle)}</p>
                  <div className="flex flex-col sm:flex-row items-center gap-4 pointer-events-auto">
                    <Link 
                      to="/booking" 
                      className="bg-primary-container text-white font-label-md text-label-md px-9 py-4 rounded-full hover:bg-primary-fixed hover:text-on-primary-fixed transition-all shadow-lg hover:shadow-xl flex items-center gap-2 group"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>{t('Book Now')}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link 
                      to="/services" 
                      className="bg-white/10 backdrop-blur-md text-white border border-white/30 font-label-md text-label-md px-8 py-4 rounded-full hover:bg-white hover:text-primary transition-all shadow-sm"
                    >
                      {t('View Services')}
                    </Link>
                  </div>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToAbout}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ opacity: { delay: 1 }, y: { repeat: Infinity, duration: 2, ease: "easeInOut" } }}
          className="absolute bottom-6 z-20 text-white/80 hover:text-white flex flex-col items-center gap-1 cursor-pointer transition-colors"
          aria-label="Scroll down to About the Artist"
        >
          <span className="text-[11px] uppercase tracking-widest font-label-md text-white/70">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.button>
      </section>

      {/* 2. ABOUT THE ARTIST SECTION (Two-column: Image Left, Text Right) */}
      <section 
        id="about-artist"
        className="py-20 md:py-28 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image Fades In from Left */}
          <div 
            data-aos="fade-right"
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border border-outline-variant/30 relative z-10">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZnkawOuldAa08QMAQZshAHHLsIBN-OWQAQoe0Xaq_3tFYxxkcXOzKMWJBif7l9t1_yeKZxpZajq4IlSUixsNJ0Ys1vHy2O7LpeDIhglufVJeULQ6DV242EZMKym2nb42YnafQAKwbP8wUfVNbWX3K_CCbEmKE7R9oh2sLARWL_miFPzLYButV7uUI2LJNVTwTyBz8q-NmECkIHLwC7BVknAjTYsZr_OnpMxkSeKqRpQgCvzGwtoiDWABlmXkgSe6VYvCvO_WVSA" 
                  alt="Shirley Makeup Artist" 
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-2 md:-right-6 z-20 bg-surface-container-lowest p-5 rounded-2xl shadow-lg border border-outline-variant/30 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-container/10 text-primary flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-headline-md text-headline-md text-primary">{t('10+ Years Experience')}</p>
                  <p className="font-body-md text-xs text-on-surface-variant">{t('Editorial & Bridal Artistry')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Text Fades In from Right */}
          <div 
            data-aos="fade-left"
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 text-secondary font-label-md text-xs uppercase tracking-widest mb-3">
              <span className="w-8 h-[1px] bg-secondary"></span>
              <span>{t('About the Artist')}</span>
            </div>
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary mb-6">
              {t('Behind the Brush')}
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-8">
              {t('Based in the heart of Klang Valley, Malaysia, Shirley specializes in high-end bridal and editorial makeup. With a passion for precision and a calming presence, every session is designed to make you feel as exquisite as you look.')}
            </p>

            {/* Feature Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/20 shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-primary-container/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-label-md text-label-md text-on-background mb-1">{t('500+ Happy Brides')}</h3>
                  <p className="font-body-md text-xs text-on-surface-variant leading-normal">Tailored bridal consultations & trials.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/20 shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-primary-container/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-label-md text-label-md text-on-background mb-1">{t('Luxury Products')}</h3>
                  <p className="font-body-md text-xs text-on-surface-variant leading-normal">100% premium, skin-safe cosmetics.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/20 shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-primary-container/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-label-md text-label-md text-on-background mb-1">Skin-First Glow</h3>
                  <p className="font-body-md text-xs text-on-surface-variant leading-normal">Luminous, lightweight, tear-proof finishes.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/20 shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-primary-container/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-label-md text-label-md text-on-background mb-1">{t('Mobile & Travel Service')}</h3>
                  <p className="font-body-md text-xs text-on-surface-variant leading-normal">Klang Valley & destination events.</p>
                </div>
              </div>
            </div>

            <div>
              <Link 
                to="/about" 
                className="inline-flex items-center gap-3 bg-primary-container text-white font-label-md text-label-md px-7 py-3.5 rounded-full hover:bg-primary-fixed hover:text-on-primary-fixed transition-all shadow-md group"
              >
                <span>{t('Learn More About Shirley')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIGNATURE SERVICES SECTION */}
      <section className="py-20 md:py-28 bg-surface-container-lowest relative">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          {/* Section Headers with data-aos="fade-up" */}
          <div 
            data-aos="fade-up"
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="inline-flex items-center gap-2 text-secondary font-label-md text-xs uppercase tracking-widest mb-3">
              <span className="w-8 h-[1px] bg-secondary"></span>
              <span>{t('Signature Services')}</span>
              <span className="w-8 h-[1px] bg-secondary"></span>
            </span>
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary mb-4">
              {t('Tailored Beauty Experiences')}
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              {t('Tailored makeup artistry for your most memorable moments. Editorial quality, refined for every occasion.')}
            </p>
          </div>

          {/* 3-Column Service Cards with Staggered data-aos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {signatureServices.map((service, idx) => {
              const IconComp = service.icon;
              const delayVal = serviceDelays[idx];
              return (
                <div 
                  key={service.id} 
                  data-aos="fade-up"
                  data-aos-delay={delayVal}
                  className="bg-white/70 backdrop-blur-xl border border-white/60 dark:bg-black/30 dark:border-white/10 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1.5"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-label-md text-primary shadow-sm flex items-center gap-1.5">
                      <IconComp className="w-3.5 h-3.5" />
                      <span>{t(service.tag)}</span>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <div className="mb-4">
                      <h3 className="font-headline-md text-headline-md text-on-background mb-1">
                        {language === 'zh' ? service.title_zh : service.title}
                      </h3>
                      <p className="font-label-md text-sm text-secondary font-semibold">
                        {language === 'zh' ? service.price_zh : service.price}
                      </p>
                    </div>

                    <p className="font-body-md text-xs text-on-surface-variant leading-relaxed mb-8 flex-grow">
                      {language === 'zh' ? service.description_zh : service.description}
                    </p>

                    <div className="pt-5 border-t border-outline-variant/20 flex items-center justify-between">
                      <Link 
                        to={`/services/${service.id}`} 
                        className="font-label-md text-xs text-primary hover:underline flex items-center gap-1"
                      >
                        <span>{t('View Details')}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link 
                        to="/booking" 
                        className="bg-primary-container text-white hover:bg-primary-fixed hover:text-on-primary-fixed px-4 py-2 rounded-full font-label-md text-xs transition-colors shadow-sm"
                      >
                        {t('Book Now')}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Button with data-aos="zoom-in" data-aos-delay="400" */}
          <div className="mt-14 text-center">
            <Link 
              to="/services" 
              data-aos="zoom-in"
              data-aos-delay="400"
              className="inline-flex items-center gap-2 border border-primary-container text-primary-container hover:bg-primary-container hover:text-white font-label-md text-label-md px-8 py-3.5 rounded-full transition-all shadow-xs group"
            >
              <span>{t('View Services')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. PORTFOLIO / GALLERY SECTION */}
      <section className="py-20 md:py-28 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            {/* Title Block with data-aos="fade-right" */}
            <div data-aos="fade-right">
              <span className="inline-flex items-center gap-2 text-secondary font-label-md text-xs uppercase tracking-widest mb-3">
                <span className="w-8 h-[1px] bg-secondary"></span>
                <span>{t('Featured Portfolio')}</span>
              </span>
              <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary">
                {t('Recent Artistry & Looks')}
              </h2>
            </div>

            {/* Filter Pills with data-aos="fade-left" */}
            <div data-aos="fade-left" className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full font-label-md text-xs transition-all ${
                    activeCategory === cat
                      ? 'bg-primary-container text-white shadow-sm'
                      : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-variant/40'
                  }`}
                >
                  {t(cat)}
                </button>
              ))}
            </div>
          </div>

          {/* Portfolio Grid with Staggered data-aos="zoom-in" (0, 150, 300) */}
          <motion.div 
            layout 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredPortfolio.map((item, index) => {
                const rowDelayVal = (index % 3) * 150;
                const delayAttr = rowDelayVal === 0 ? undefined : rowDelayVal.toString();
                return (
                  <div
                    key={item.id}
                    data-aos="zoom-in"
                    data-aos-delay={delayAttr}
                    className="group cursor-pointer bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/20 shadow-sm hover:shadow-lg transition-all"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <span className="text-white font-label-md text-xs flex items-center gap-2">
                          <span>{t('Explore Full Portfolio')}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <span className="inline-block bg-primary-container/10 text-primary px-3 py-0.5 rounded-full font-label-md text-[11px] mb-2">
                        {t(item.category)}
                      </span>
                      <h3 className="font-headline-md text-base text-on-background">
                        {language === 'zh' ? item.title_zh : item.title}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          <div className="mt-14 text-center">
            <Link 
              to="/portfolio" 
              data-aos="zoom-in"
              className="inline-flex items-center gap-2 bg-primary-container text-white font-label-md text-label-md px-8 py-4 rounded-full hover:bg-primary-fixed hover:text-on-primary-fixed transition-all shadow-md"
            >
              <span>{t('Explore Full Portfolio')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. FINAL CALL TO ACTION SECTION */}
      <section 
        data-aos="fade-up"
        className="py-20 md:py-28 px-margin-mobile md:px-margin-desktop bg-surface-container-high relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-primary-container/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto float-card bg-surface p-10 md:p-16 rounded-3xl border border-outline-variant/30 text-center relative z-10 shadow-lg">
          <span className="inline-flex items-center gap-2 text-secondary font-label-md text-xs uppercase tracking-widest mb-4">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>{t('Book Your Session')}</span>
          </span>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary mb-6">
            {t('Ready to Create Your Perfect Look?')}
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed">
            {t('Book your appointment today to secure your date for bridal, events, or editorial shoots.')}
          </p>

          {/* Highlights checklist */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 text-xs font-label-md text-on-surface-variant">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Fast Confirmation via WhatsApp</span>
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Klang Valley & Travel Available</span>
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Pre-Wedding Trials Included</span>
            </span>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              to="/booking" 
              className="w-full sm:w-auto bg-primary-container text-white font-label-md text-label-md px-9 py-4 rounded-full hover:bg-primary-fixed hover:text-on-primary-fixed transition-all shadow-md flex items-center justify-center gap-2 group"
            >
              <Calendar className="w-4 h-4" />
              <span>{t('Book Now')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/chat" 
              className="w-full sm:w-auto border border-primary-container text-primary-container font-label-md text-label-md px-8 py-4 rounded-full hover:bg-primary-container/10 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t('Beauty Assistant')}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}




