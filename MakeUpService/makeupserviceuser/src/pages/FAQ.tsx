import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  MessageCircle, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  DollarSign, 
  MapPin,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';

interface FAQItem {
  id: string;
  category: 'booking' | 'services' | 'travel' | 'preparation' | 'payment';
  categoryLabel: { en: string; zh: string };
  question: { en: string; zh: string };
  answer: { en: string; zh: string };
}

export default function FAQ() {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'b1': true, // Keep first open by default
  });

  const categories = [
    { id: 'all', label: { en: 'All Questions', zh: '全部问题' } },
    { id: 'booking', label: { en: 'Booking & Trial', zh: '预订与试妆' } },
    { id: 'services', label: { en: 'Services & Products', zh: '服务与产品' } },
    { id: 'travel', label: { en: 'Travel & Location', zh: '差旅与位置' } },
    { id: 'preparation', label: { en: 'On the Day', zh: '当日准备' } },
    { id: 'payment', label: { en: 'Payment & Policy', zh: '付款与政策' } },
  ];

  const faqList: FAQItem[] = [
    {
      id: 'b1',
      category: 'booking',
      categoryLabel: { en: 'Booking & Trial', zh: '预订与试妆' },
      question: { 
        en: 'How far in advance should I book my bridal makeup?', 
        zh: '我应该提前多久预订新娘彩妆？' 
      },
      answer: { 
        en: 'It is recommended to book 6 to 12 months in advance, especially for peak wedding seasons (October to February). Popular dates fill up quickly, but we also welcome last-minute inquiries subject to schedule availability.', 
        zh: '建议提前 6 至 12 个月预订，特别是在结婚旺季（10月至次年2月）。热门档期非常抢手，但我们也欢迎在有空档的情况下进行临时询问。' 
      }
    },
    {
      id: 'b2',
      category: 'booking',
      categoryLabel: { en: 'Booking & Trial', zh: '预订与试妆' },
      question: { 
        en: 'Is a makeup trial session included or recommended?', 
        zh: '是否包含试妆服务？建议做试妆吗？' 
      },
      answer: { 
        en: 'Trial sessions are highly recommended for brides to test skin compatibility, discuss style preferences, and refine your final look. Bridal trials can be booked separately or added as part of your bridal package at a discounted rate.', 
        zh: '强烈建议新娘进行试妆，以测试皮肤过敏反应、沟通造型喜好并完善最终的新娘妆容。新娘试妆可以单独预订，也可以作为新娘套餐的一部分以优惠价格选购。' 
      }
    },
    {
      id: 'b3',
      category: 'booking',
      categoryLabel: { en: 'Booking & Trial', zh: '预订与试妆' },
      question: { 
        en: 'How do I confirm my booking date?', 
        zh: '如何正式确认并锁定我的预订日期？' 
      },
      answer: { 
        en: 'To secure your date on Shirley’s calendar, a 30% non-refundable deposit is required along with a signed service agreement. Dates cannot be held without a deposit.', 
        zh: '要在 Shirley 的日历中锁定您的日期，需要支付 30% 的不可退还定金并签署服务协议。在未收到定金前，无法预留日期。' 
      }
    },
    {
      id: 's1',
      category: 'services',
      categoryLabel: { en: 'Services & Products', zh: '服务与产品' },
      question: { 
        en: 'What cosmetics and skincare brands do you use?', 
        zh: '您使用的是哪些化妆品和护肤品牌？' 
      },
      answer: { 
        en: 'Shirley uses only premium luxury and high-performance brands including Charlotte Tilbury, Tom Ford, Dior Beauty, CHANEL, NARS, Laura Mercier, and Giorgio Armani. All products are long-wearing and HD photo-ready.', 
        zh: 'Shirley 仅使用高级奢华和高性能知名品牌，包括 Charlotte Tilbury, Tom Ford, Dior Beauty, CHANEL, NARS, Laura Mercier 和 Giorgio Armani。所有产品均具有极佳的持久度，适合高清晰度摄影。' 
      }
    },
    {
      id: 's2',
      category: 'services',
      categoryLabel: { en: 'Services & Products', zh: '服务与产品' },
      question: { 
        en: 'Does the session include hair styling and lashes?', 
        zh: '服务中是否包含发型设计和假睫毛？' 
      },
      answer: { 
        en: 'Yes! Premium hand-crafted faux mink false eyelashes, skin prep facial massage, and customized hair styling (updo, waves, or braid work) are included in all signature bridal and event packages.', 
        zh: '是的！所有招牌新娘及晚宴套餐均包含高级手工仿貂毛假睫毛、妆前精致护肤按摩以及量身定制的发型设计（盘发、波浪卷或编发）。' 
      }
    },
    {
      id: 's3',
      category: 'services',
      categoryLabel: { en: 'Services & Products', zh: '服务与产品' },
      question: { 
        en: 'Do you cater to sensitive or allergy-prone skin?', 
        zh: '您能为敏感肌或易过敏皮肤提供服务吗？' 
      },
      answer: { 
        en: 'Absolutely. Please inform us of any known allergies or skin sensitivities during booking. We utilize hypoallergenic, non-comedogenic primers and sanitized brushes for every client.', 
        zh: '完全可以。请在预订时告知我们任何已知的过敏原或皮肤敏感情况。我们为每一位客户使用低致敏性、不致粉刺的妆前产品以及彻底消毒的专业刷具。' 
      }
    },
    {
      id: 't1',
      category: 'travel',
      categoryLabel: { en: 'Travel & Location', zh: '差旅与位置' },
      question: { 
        en: 'Do you provide door-to-door or venue travel services?', 
        zh: '您提供上门或到场地的服务吗？' 
      },
      answer: { 
        en: 'Yes, Shirley provides mobile door-to-door makeup services across Klang Valley, Penang, Johor, and international destinations upon request.', 
        zh: '是的，Shirley 提供覆盖巴生谷、槟城、柔佛以及应要求提供海外国际差旅的上门彩妆服务。' 
      }
    },
    {
      id: 't2',
      category: 'travel',
      categoryLabel: { en: 'Travel & Location', zh: '差旅与位置' },
      question: { 
        en: 'How are travel and early morning fees calculated?', 
        zh: '交通费和早班费是如何计算的？' 
      },
      answer: { 
        en: 'Travel within central Klang Valley is flat-rate. For locations outside Klang Valley or requiring early start times before 6:00 AM, a nominal distance surcharge or early call-time fee will be transparently calculated during instant online booking.', 
        zh: '巴生谷中心地区的交通费为固定费用。对于巴生谷以外的地点或需要早于凌晨 6:00 开始的预约，将在在线预订时透明化计算相应的路程附加费或早班费。' 
      }
    },
    {
      id: 'p1',
      category: 'preparation',
      categoryLabel: { en: 'On the Day', zh: '当日准备' },
      question: { 
        en: 'How should I prepare my hair and skin on the appointment day?', 
        zh: '预约当天我应该如何准备头发和皮肤？' 
      },
      answer: { 
        en: 'Please wash your hair the night before (dry, no heavy oils or serum) and arrive with a clean, freshly moisturized face with zero makeup. Wear a button-up shirt or front-zippered top so changing into your dress is effortless.', 
        zh: '请在前一天晚上清洗头发（干发，不要涂抹重油或发膜），并在预约当天保持素颜干净的面部。请穿纽扣衬衫或前拉链上衣，以便在化妆完成后轻松更换服装而不破坏妆发。' 
      }
    },
    {
      id: 'p2',
      category: 'preparation',
      categoryLabel: { en: 'On the Day', zh: '当日准备' },
      question: { 
        en: 'How long does a makeup and hair session take?', 
        zh: '一次化妆和发型设计需要多长时间？' 
      },
      answer: { 
        en: 'A full bridal makeup and hair session takes approximately 2 to 2.5 hours. Event and dinner glam sessions take around 1.5 hours.', 
        zh: '一次完整的新娘妆发造型大约需要 2 至 2.5 小时。晚宴及活动盛装造型大约需要 1.5 小时。' 
      }
    },
    {
      id: 'pay1',
      category: 'payment',
      categoryLabel: { en: 'Payment & Policy', zh: '付款与政策' },
      question: { 
        en: 'What payment methods do you accept?', 
        zh: '您接受哪些付款方式？' 
      },
      answer: { 
        en: 'We accept Online Bank Transfers (DuitNow / FPX), Credit/Debit Cards, and Cash. Balance payments are due on or before the event date prior to starting the makeup session.', 
        zh: '我们接受在线银行转账（DuitNow / FPX）、信用卡/借记卡以及现金。余款需在活动当天开始造型前或之前付清。' 
      }
    },
    {
      id: 'pay2',
      category: 'payment',
      categoryLabel: { en: 'Payment & Policy', zh: '付款与政策' },
      question: { 
        en: 'What is your cancellation or postponement policy?', 
        zh: '您的取消或延期政策是什么？' 
      },
      answer: { 
        en: 'Deposits are non-refundable. However, if you need to postpone due to unforeseen circumstances, your deposit can be transferred to a new available date within 12 months, provided at least 30 days’ advance notice is given.', 
        zh: '定金不可退还。但是，如果您因不可抗力需要延期，只要提前至少 30 天通知，您的定金可以转移到 12 个月内的新的可用日期（视档期情况而定）。' 
      }
    }
  ];

  const toggleAccordion = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredFaqs = faqList.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const qText = language === 'zh' ? item.question.zh : item.question.en;
    const aText = language === 'zh' ? item.answer.zh : item.answer.en;
    const matchesSearch = searchQuery.trim() === '' || 
      qText.toLowerCase().includes(searchQuery.toLowerCase()) || 
      aText.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="px-margin-mobile md:px-margin-desktop py-12 md:py-20 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-12" data-aos="fade-up">
        <span className="inline-flex items-center gap-2 text-secondary font-label-md text-xs uppercase tracking-widest mb-3">
          <HelpCircle className="w-4 h-4 text-primary" />
          <span>{t('Help Center & FAQs')}</span>
        </span>
        <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary mb-4">
          {t('Frequently Asked Questions')}
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
          {t('Everything you need to know about booking, trial sessions, products, travel, and skin preparation.')}
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-10 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-on-surface-variant/60 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'zh' ? '搜索关键词，如：新娘、定金、试妆、试用...' : 'Search questions (e.g. bridal, deposit, trial, travel)...'}
            className="w-full pl-12 pr-4 py-3.5 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl font-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-xs transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 text-xs font-label-md text-secondary hover:text-primary"
            >
              {t('Clear')}
            </button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-12" data-aos="fade-up" data-aos-delay="150">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full font-label-md text-xs transition-all ${
              selectedCategory === cat.id
                ? 'bg-primary-container text-white shadow-sm'
                : 'bg-surface-container-lowest border border-outline-variant/20 text-on-surface-variant hover:border-primary/40'
            }`}
          >
            {language === 'zh' ? cat.label.zh : cat.label.en}
          </button>
        ))}
      </div>

      {/* Accordion FAQ List */}
      <div className="space-y-4 mb-16">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-16 bg-surface-container-lowest rounded-3xl border border-outline-variant/20 p-8">
            <HelpCircle className="w-12 h-12 text-on-surface-variant/40 mx-auto mb-4" />
            <h3 className="font-headline-md text-lg text-primary mb-2">
              {language === 'zh' ? '未找到相关问题' : 'No matching questions found'}
            </h3>
            <p className="font-body-md text-sm text-on-surface-variant max-w-md mx-auto mb-6">
              {language === 'zh' 
                ? '尝试使用其他关键词搜索，或直接向我们的 AI 美容助手提问。' 
                : 'Try searching with different keywords, or chat directly with our AI Beauty Assistant.'}
            </p>
            <Link 
              to="/chat" 
              className="inline-flex items-center gap-2 bg-primary-container text-white px-6 py-2.5 rounded-full font-label-md text-xs"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t('Ask AI Assistant')}</span>
            </Link>
          </div>
        ) : (
          filteredFaqs.map((faq, index) => {
            const isOpen = !!openItems[faq.id];
            const qStr = language === 'zh' ? faq.question.zh : faq.question.en;
            const aStr = language === 'zh' ? faq.answer.zh : faq.answer.en;
            const catStr = language === 'zh' ? faq.categoryLabel.zh : faq.categoryLabel.en;

            return (
              <div 
                key={faq.id}
                data-aos="fade-up"
                data-aos-delay={(index % 4) * 100}
                className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/30 shadow-xs"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full text-left p-6 flex items-start justify-between gap-4 focus:outline-none group"
                >
                  <div className="flex flex-col gap-1.5">
                    <span className="inline-block self-start bg-primary-container/10 text-primary px-2.5 py-0.5 rounded-md font-label-md text-[11px] font-semibold">
                      {catStr}
                    </span>
                    <h3 className="font-headline-md text-base md:text-lg text-on-background group-hover:text-primary transition-colors leading-snug">
                      {qStr}
                    </h3>
                  </div>
                  <div className={`p-2 rounded-full bg-surface-container/50 text-primary flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-primary-container/10' : ''}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-on-surface-variant font-body-md text-sm md:text-base leading-relaxed border-t border-outline-variant/10">
                        {aStr}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Help Banner */}
      <div 
        data-aos="fade-up" 
        className="bg-surface-container-high rounded-3xl p-8 md:p-12 border border-outline-variant/20 text-center relative overflow-hidden shadow-md"
      >
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-primary-container/10 text-primary flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-6 h-6" />
          </div>
          <h3 className="font-headline-md text-headline-md text-primary mb-3">
            {language === 'zh' ? '还有其他未解答的疑问？' : 'Still have unanswered questions?'}
          </h3>
          <p className="font-body-md text-on-surface-variant mb-8 text-sm md:text-base leading-relaxed">
            {language === 'zh' 
              ? '我们的 AI 美容助手 24/7 在线，随时回答您的化妆需求与预算问题，或者您也可以直接通过 WhatsApp 与 Shirley 沟通。' 
              : 'Our AI Beauty Assistant is available 24/7 to answer custom inquiries, or you can message Shirley directly on WhatsApp.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/chat" 
              className="w-full sm:w-auto bg-primary-container text-white px-8 py-3.5 rounded-full font-label-md text-xs flex items-center justify-center gap-2 shadow-sm hover:bg-primary-fixed hover:text-on-primary-fixed transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t('Chat with Beauty AI')}</span>
            </Link>
            <a 
              href="https://wa.me/60123456789" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-full font-label-md text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{language === 'zh' ? 'WhatsApp 咨询' : 'WhatsApp Us'}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
