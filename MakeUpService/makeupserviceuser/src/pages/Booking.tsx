import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Info, 
  ChevronDown, 
  ArrowRight, 
  User, 
  Mail, 
  Phone, 
  Users, 
  Home, 
  Sparkles, 
  CheckCircle2, 
  Calculator, 
  DollarSign, 
  ShieldCheck, 
  MessageCircle,
  Plus
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

export interface BookingPriceDetails {
  basePrice: number;
  serviceLabel: string;
  extraGuests: number;
  extraGuestsFee: number;
  locationFee: number;
  locationLabel: string;
  earlyCallFee: number;
  earlyCallLabel: string;
  addonsFee: number;
  selectedAddonLabels: string[];
  subtotal: number;
  total: number;
  deposit: number;
  balance: number;
}

export function getBookingPrice(params: {
  serviceType: string;
  area: string;
  callTime: string;
  paxCount: number;
  addons: string[];
  language: 'en' | 'zh';
}): BookingPriceDetails {
  const { serviceType, area, callTime, paxCount, addons, language } = params;

  // 1. Service Base Prices
  let basePrice = 1800;
  let serviceLabel = language === 'zh' ? '新娘彩妆与发型全天套餐' : 'Bridal Full Day Makeup & Hair';

  if (serviceType === 'bridal-half') {
    basePrice = 1200;
    serviceLabel = language === 'zh' ? '新娘单款造型套餐' : 'Bridal Half Day / Single Look';
  } else if (serviceType === 'event-glam') {
    basePrice = 450;
    serviceLabel = language === 'zh' ? '晚宴与活动盛装造型' : 'Special Event & Dinner Glam';
  } else if (serviceType === 'editorial') {
    basePrice = 750;
    serviceLabel = language === 'zh' ? '商业与时尚大片造型' : 'Editorial & Commercial Shoot';
  } else if (serviceType === 'trial') {
    basePrice = 380;
    serviceLabel = language === 'zh' ? '新娘试妆体验' : 'Pre-Wedding Trial Session';
  }

  // 2. Extra Guests Fee
  const extraGuests = Math.max(0, paxCount - 1);
  const extraGuestsFee = extraGuests * 250;

  // 3. Area / Location Fee
  let locationFee = 0;
  let locationLabel = language === 'zh' ? '巴生谷中心地区 (免路费)' : 'Central Klang Valley (No Travel Fee)';

  if (area === 'outer-kv') {
    locationFee = 60;
    locationLabel = language === 'zh' ? '巴生谷偏远地区 (巴生/赛城/布城/万挠)' : 'Outer Klang Valley (Klang/Cyberjaya/Putrajaya/Rawang)';
  } else if (area === 'melaka') {
    locationFee = 180;
    locationLabel = language === 'zh' ? '马六甲 / 芙蓉差旅' : 'Melaka / Seremban Travel';
  } else if (area === 'johor') {
    locationFee = 300;
    locationLabel = language === 'zh' ? '柔佛新山差旅' : 'Johor Bahru Outstation Travel';
  } else if (area === 'penang') {
    locationFee = 350;
    locationLabel = language === 'zh' ? '槟城差旅' : 'Penang Outstation Travel';
  } else if (area === 'destination') {
    locationFee = 850;
    locationLabel = language === 'zh' ? '海外与海岛婚礼差旅' : 'International Destination Wedding Travel';
  }

  // 4. Early Call Time Fee
  let earlyCallFee = 0;
  let earlyCallLabel = language === 'zh' ? '标准开工时间 (07:00 后)' : 'Standard Start (07:00 AM or later)';

  if (callTime === 'early-6am') {
    earlyCallFee = 100;
    earlyCallLabel = language === 'zh' ? '早班开工 (06:00 - 06:59 AM)' : 'Early Call Time (06:00 - 06:59 AM)';
  } else if (callTime === 'early-5am') {
    earlyCallFee = 180;
    earlyCallLabel = language === 'zh' ? '超早班开工 (05:00 - 05:59 AM)' : 'Early Call Time (05:00 - 05:59 AM)';
  } else if (callTime === 'early-4am') {
    earlyCallFee = 280;
    earlyCallLabel = language === 'zh' ? '深夜/凌晨班底 (05:00 AM 前)' : 'Super Early Call (Before 05:00 AM)';
  }

  // 5. Add-ons Fee
  let addonsFee = 0;
  const selectedAddonLabels: string[] = [];

  if (addons.includes('groom')) {
    addonsFee += 150;
    selectedAddonLabels.push(language === 'zh' ? '新郎妆发造型 (+RM 150)' : 'Groom Touch-up & Hair (+RM 150)');
  }
  if (addons.includes('airbrush')) {
    addonsFee += 120;
    selectedAddonLabels.push(language === 'zh' ? '喷枪高清底妆升级 (+RM 120)' : 'Airbrush HD Upgrade (+RM 120)');
  }
  if (addons.includes('bridesmaid')) {
    addonsFee += 280;
    selectedAddonLabels.push(language === 'zh' ? '伴娘/妈妈妆发造型 (+RM 280)' : 'Bridesmaid/Mom Makeup (+RM 280)');
  }

  // Total Calculations
  const subtotal = basePrice + extraGuestsFee + locationFee + earlyCallFee + addonsFee;
  const total = subtotal;
  const deposit = Math.round(total * 0.3);
  const balance = total - deposit;

  return {
    basePrice,
    serviceLabel,
    extraGuests,
    extraGuestsFee,
    locationFee,
    locationLabel,
    earlyCallFee,
    earlyCallLabel,
    addonsFee,
    selectedAddonLabels,
    subtotal,
    total,
    deposit,
    balance
  };
}

export default function Booking() {
  const { t, language } = useLanguage();

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState('bridal-full');
  const [paxCount, setPaxCount] = useState(1);
  const [eventDate, setEventDate] = useState('');
  const [callTime, setCallTime] = useState('standard');
  const [unitBlock, setUnitBlock] = useState('');
  const [area, setArea] = useState('central-kv');
  const [address, setAddress] = useState('');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Dynamic Price Calculation
  const priceDetails = useMemo(() => {
    return getBookingPrice({
      serviceType,
      area,
      callTime,
      paxCount,
      addons: selectedAddons,
      language: (language as 'en' | 'zh') || 'en'
    });
  }, [serviceType, area, callTime, paxCount, selectedAddons, language]);

  const toggleAddon = (addonKey: string) => {
    setSelectedAddons(prev => 
      prev.includes(addonKey) 
        ? prev.filter(a => a !== addonKey)
        : [...prev, addonKey]
    );
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const generateWhatsAppMessage = () => {
    const text = language === 'zh'
      ? `你好 Shirley！我想预约彩妆服务，以下是计算出的预订详情：\n\n` +
        `👤 姓名：${fullName}\n` +
        `📱 电话：${phone}\n` +
        `📧 邮箱：${email}\n` +
        `📅 日期：${eventDate || '未指定'}\n` +
        `⏰ 时间：${callTime}\n` +
        `📍 地点：${address} (${priceDetails.locationLabel})\n\n` +
        `💄 服务项目：${priceDetails.serviceLabel} (RM ${priceDetails.basePrice})\n` +
        `👥 人数：${paxCount} 人\n` +
        `🚗 地区交通费：RM ${priceDetails.locationFee}\n` +
        `⏰ 早班开工费：RM ${priceDetails.earlyCallFee}\n` +
        `✨ 额外加购项目：${priceDetails.selectedAddonLabels.join(', ') || '无'}\n\n` +
        `💰 估算总额：RM ${priceDetails.total}\n` +
        `💳 30% 预订定金：RM ${priceDetails.deposit}\n` +
        `尾款：RM ${priceDetails.balance}\n\n` +
        `请帮我确认档期！谢谢！`
      : `Hi Shirley! I would like to request a makeup booking with the calculated price details below:\n\n` +
        `👤 Name: ${fullName}\n` +
        `📱 Phone: ${phone}\n` +
        `📧 Email: ${email}\n` +
        `📅 Date: ${eventDate || 'TBD'}\n` +
        `⏰ Call Time: ${callTime}\n` +
        `📍 Location: ${address} (${priceDetails.locationLabel})\n\n` +
        `💄 Service: ${priceDetails.serviceLabel} (RM ${priceDetails.basePrice})\n` +
        `👥 Pax: ${paxCount}\n` +
        `🚗 Area Travel Fee: RM ${priceDetails.locationFee}\n` +
        `⏰ Early Call Fee: RM ${priceDetails.earlyCallFee}\n` +
        `✨ Add-ons: ${priceDetails.selectedAddonLabels.join(', ') || 'None'}\n\n` +
        `💰 Estimated Total: RM ${priceDetails.total}\n` +
        `💳 30% Deposit: RM ${priceDetails.deposit}\n` +
        `Balance Due: RM ${priceDetails.balance}\n\n` +
        `Please confirm availability. Thank you!`;

    return `https://wa.me/60123456789?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="px-margin-mobile md:px-margin-desktop py-12 md:py-20 max-w-container-max mx-auto">
      {/* Page Header */}
      <div className="text-center mb-12 max-w-3xl mx-auto" data-aos="fade-up">
        <span className="inline-flex items-center gap-2 text-secondary font-label-md text-xs uppercase tracking-widest mb-3">
          <Calculator className="w-4 h-4 text-primary" />
          <span>{t('Instant Transparent Estimate')}</span>
        </span>
        <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary mb-4">
          {t('Request a Booking')}
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
          {t('Select your location, service, and call time to instantly calculate your total price and deposit.')}
        </p>
      </div>

      {/* Main 2-Column Calculator & Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form Column (7 Cols) */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-3xl border border-outline-variant/30 p-6 md:p-10 shadow-xs relative overflow-hidden" data-aos="fade-right">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

          <form onSubmit={handleBookingSubmit} className="space-y-8 relative z-10">
            
            {/* Step 1: Personal Details */}
            <div className="space-y-4">
              <label className="block font-label-md text-xs uppercase tracking-widest text-primary border-b border-outline-variant/30 pb-2 flex items-center gap-2 font-bold">
                <User className="w-4 h-4 text-primary" />
                <span>{t('Step 1: Contact Information')}</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 w-4 h-4" />
                  <input 
                    className="w-full bg-surface border border-outline-variant/40 rounded-xl pl-11 pr-4 py-3 font-body-md text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-on-surface-variant/40" 
                    placeholder={t('Full Name')} 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required 
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 w-4 h-4" />
                  <input 
                    className="w-full bg-surface border border-outline-variant/40 rounded-xl pl-11 pr-4 py-3 font-body-md text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-on-surface-variant/40" 
                    placeholder={t('Email Address')} 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
                <div className="relative md:col-span-2">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 w-4 h-4" />
                  <input 
                    className="w-full bg-surface border border-outline-variant/40 rounded-xl pl-11 pr-4 py-3 font-body-md text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-on-surface-variant/40" 
                    placeholder={t('Phone Number / WhatsApp')} 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required 
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Service & Pax */}
            <div className="space-y-4 pt-2">
              <label className="block font-label-md text-xs uppercase tracking-widest text-primary border-b border-outline-variant/30 pb-2 flex items-center gap-2 font-bold">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>{t('Step 2: Service & Number of Pax')}</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative md:col-span-2">
                  <select 
                    className="w-full bg-surface border border-outline-variant/40 rounded-xl px-4 py-3 font-body-md text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer" 
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    required
                  >
                    <option value="bridal-full">{language === 'zh' ? '新娘彩妆与发型全天套餐 (RM 1,800)' : 'Bridal Full Day Makeup & Hair (RM 1,800)'}</option>
                    <option value="bridal-half">{language === 'zh' ? '新娘单款造型 / 半天套餐 (RM 1,200)' : 'Bridal Half Day / Single Look (RM 1,200)'}</option>
                    <option value="event-glam">{language === 'zh' ? '晚宴与活动盛装造型 (RM 450)' : 'Special Event & Dinner Glam (RM 450)'}</option>
                    <option value="editorial">{language === 'zh' ? '商业与时尚大片造型 (RM 750)' : 'Editorial & Commercial Shoot (RM 750)'}</option>
                    <option value="trial">{language === 'zh' ? '新娘试妆体验 (RM 380)' : 'Pre-Wedding Trial Session (RM 380)'}</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none w-4 h-4" />
                </div>
                
                <div className="relative md:col-span-2 flex items-center justify-between bg-surface p-3.5 border border-outline-variant/40 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="font-body-md text-sm text-on-surface">{t('Number of Guests / Clients:')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      type="button" 
                      onClick={() => setPaxCount(Math.max(1, paxCount - 1))}
                      className="w-8 h-8 rounded-lg bg-surface-container text-on-surface font-bold hover:bg-primary-container hover:text-white transition-colors"
                    >
                      -
                    </button>
                    <span className="font-headline-md text-base w-6 text-center">{paxCount}</span>
                    <button 
                      type="button" 
                      onClick={() => setPaxCount(paxCount + 1)}
                      className="w-8 h-8 rounded-lg bg-surface-container text-on-surface font-bold hover:bg-primary-container hover:text-white transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Date & Call Time */}
            <div className="space-y-4 pt-2">
              <label className="block font-label-md text-xs uppercase tracking-widest text-primary border-b border-outline-variant/30 pb-2 flex items-center gap-2 font-bold">
                <Calendar className="w-4 h-4 text-primary" />
                <span>{t('Step 3: Date & Early Call Time')}</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <input 
                    className="w-full bg-surface border border-outline-variant/40 rounded-xl px-4 py-3 font-body-md text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer appearance-none" 
                    type="date" 
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    required 
                  />
                  <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none w-4 h-4" />
                </div>

                <div className="relative">
                  <select 
                    className="w-full bg-surface border border-outline-variant/40 rounded-xl px-4 py-3 font-body-md text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                    value={callTime}
                    onChange={(e) => setCallTime(e.target.value)}
                    required
                  >
                    <option value="standard">{language === 'zh' ? '标准开工 (07:00 AM 后) [+RM 0]' : 'Standard Start (07:00 AM+) [+RM 0]'}</option>
                    <option value="early-6am">{language === 'zh' ? '早班开工 (06:00 - 06:59 AM) [+RM 100]' : 'Early Call (06:00 - 06:59 AM) [+RM 100]'}</option>
                    <option value="early-5am">{language === 'zh' ? '超早班开工 (05:00 - 05:59 AM) [+RM 180]' : 'Super Early (05:00 - 05:59 AM) [+RM 180]'}</option>
                    <option value="early-4am">{language === 'zh' ? '深夜/凌晨班底 (05:00 AM 前) [+RM 280]' : 'Midnight / Dawn (Before 05:00 AM) [+RM 280]'}</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Step 4: Location & Area Selection */}
            <div className="space-y-4 pt-2">
              <label className="block font-label-md text-xs uppercase tracking-widest text-primary border-b border-outline-variant/30 pb-2 flex items-center gap-2 font-bold">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{t('Step 4: Area & Location Address')}</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative md:col-span-2">
                  <select 
                    className="w-full bg-surface border border-outline-variant/40 rounded-xl px-4 py-3 font-body-md text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    required
                  >
                    <option value="central-kv">{language === 'zh' ? '巴生谷中心地区 (KL / PJ / Subang / Bangsar) [免交通费]' : 'Central Klang Valley (KL/PJ/Subang/Bangsar) [Free Travel]'}</option>
                    <option value="outer-kv">{language === 'zh' ? '巴生谷偏远地区 (巴生/赛城/布城/万挠) [+RM 60]' : 'Outer Klang Valley (Klang/Cyberjaya/Putrajaya/Rawang) [+RM 60]'}</option>
                    <option value="melaka">{language === 'zh' ? '马六甲 / 芙蓉差旅 [+RM 180]' : 'Melaka / Seremban Outstation [+RM 180]'}</option>
                    <option value="johor">{language === 'zh' ? '柔佛新山差旅 [+RM 300]' : 'Johor Bahru Outstation [+RM 300]'}</option>
                    <option value="penang">{language === 'zh' ? '槟城差旅 [+RM 350]' : 'Penang Outstation [+RM 350]'}</option>
                    <option value="destination">{language === 'zh' ? '海外与海岛婚礼差旅 [+RM 850]' : 'International Destination Wedding [+RM 850]'}</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none w-4 h-4" />
                </div>

                <div className="relative">
                  <Home className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 w-4 h-4" />
                  <input 
                    className="w-full bg-surface border border-outline-variant/40 rounded-xl pl-11 pr-4 py-3 font-body-md text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-on-surface-variant/40" 
                    placeholder={t('Unit / House / Hotel Name')} 
                    type="text" 
                    value={unitBlock}
                    onChange={(e) => setUnitBlock(e.target.value)}
                  />
                </div>

                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 w-4 h-4" />
                  <input 
                    className="w-full bg-surface border border-outline-variant/40 rounded-xl pl-11 pr-4 py-3 font-body-md text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-on-surface-variant/40" 
                    placeholder={t('Full Street Address')} 
                    type="text" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required 
                  />
                </div>
              </div>

              {/* Dynamic Interactive Google Map Preview */}
              {address.trim() !== '' && (
                <div className="w-full h-52 mt-3 rounded-2xl overflow-hidden border border-outline-variant/30 shadow-xs">
                  <iframe
                    title="Location Map Preview"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(address + ' ' + area)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                  ></iframe>
                </div>
              )}
            </div>

            {/* Step 5: Optional Add-ons */}
            <div className="space-y-4 pt-2">
              <label className="block font-label-md text-xs uppercase tracking-widest text-primary border-b border-outline-variant/30 pb-2 flex items-center gap-2 font-bold">
                <Plus className="w-4 h-4 text-primary" />
                <span>{t('Step 5: Optional Luxury Add-ons')}</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => toggleAddon('groom')}
                  className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    selectedAddons.includes('groom')
                      ? 'border-primary bg-primary-container/10 text-primary'
                      : 'border-outline-variant/30 bg-surface hover:border-primary/40 text-on-surface-variant'
                  }`}
                >
                  <span className="font-headline-md text-xs font-semibold mb-1 block">
                    {language === 'zh' ? '新郎妆发造型' : 'Groom Touch-Up'}
                  </span>
                  <span className="font-label-md text-xs text-primary font-bold">+RM 150</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleAddon('airbrush')}
                  className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    selectedAddons.includes('airbrush')
                      ? 'border-primary bg-primary-container/10 text-primary'
                      : 'border-outline-variant/30 bg-surface hover:border-primary/40 text-on-surface-variant'
                  }`}
                >
                  <span className="font-headline-md text-xs font-semibold mb-1 block">
                    {language === 'zh' ? '喷枪高清底妆' : 'Airbrush HD Base'}
                  </span>
                  <span className="font-label-md text-xs text-primary font-bold">+RM 120</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleAddon('bridesmaid')}
                  className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    selectedAddons.includes('bridesmaid')
                      ? 'border-primary bg-primary-container/10 text-primary'
                      : 'border-outline-variant/30 bg-surface hover:border-primary/40 text-on-surface-variant'
                  }`}
                >
                  <span className="font-headline-md text-xs font-semibold mb-1 block">
                    {language === 'zh' ? '伴娘/妈妈彩妆' : 'Bridesmaid/Mom'}
                  </span>
                  <span className="font-label-md text-xs text-primary font-bold">+RM 280</span>
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="pt-2 flex items-start gap-3">
              <input 
                type="checkbox" 
                id="privacy" 
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                required 
                className="mt-1 w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer" 
              />
              <label htmlFor="privacy" className="font-body-md text-xs text-on-surface-variant cursor-pointer leading-relaxed">
                {t('I agree to the')} <Link to="/terms-and-conditions" className="text-primary underline font-medium" target="_blank">{t('Terms & Conditions')}</Link> {t('and understand that a 30% deposit is required to lock in my date.')}
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button 
                type="submit"
                className="w-full bg-primary-container text-white rounded-full py-4 font-label-md text-xs uppercase tracking-widest hover:bg-primary-fixed hover:text-on-primary-fixed transition-all shadow-md flex items-center justify-center space-x-2 group"
              >
                <span>{t('Generate Instant Breakdown & WhatsApp Request')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
        </div>

        {/* Right Dynamic Live Price Breakdown Column (5 Cols - Sticky) */}
        <div className="lg:col-span-5 sticky top-28" data-aos="fade-left">
          <div className="bg-surface-container-lowest rounded-3xl border border-primary/20 p-6 md:p-8 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/30 mb-6">
              <div className="flex items-center gap-2 text-primary font-headline-md text-base font-bold">
                <Calculator className="w-5 h-5 text-amber-500" />
                <span>{t('Live Price Breakdown')}</span>
              </div>
              <span className="bg-primary-container/10 text-primary px-3 py-1 rounded-full font-label-md text-[11px] font-semibold">
                {language === 'zh' ? '实时估算' : 'Real-time'}
              </span>
            </div>

            {/* Itemized Calculation List */}
            <div className="space-y-4 font-body-md text-xs md:text-sm text-on-surface-variant mb-6">
              {/* Base Service */}
              <div className="flex justify-between items-start">
                <span className="font-medium text-on-surface">{priceDetails.serviceLabel}</span>
                <span className="font-bold text-on-surface">RM {priceDetails.basePrice}</span>
              </div>

              {/* Extra Guests if any */}
              {priceDetails.extraGuests > 0 && (
                <div className="flex justify-between items-start text-xs text-on-surface-variant/80">
                  <span>{language === 'zh' ? `额外同行人数 (${priceDetails.extraGuests} 人 x RM 250)` : `Additional Guests (${priceDetails.extraGuests} pax x RM 250)`}</span>
                  <span className="font-semibold">+RM {priceDetails.extraGuestsFee}</span>
                </div>
              )}

              {/* Location Fee */}
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="font-medium text-on-surface">{t('Location / Travel Surcharge')}</span>
                  <span className="text-[11px] text-on-surface-variant/70">{priceDetails.locationLabel}</span>
                </div>
                <span className="font-bold text-on-surface">
                  {priceDetails.locationFee === 0 ? (
                    <span className="text-emerald-600 font-semibold">{language === 'zh' ? '免路费' : 'FREE'}</span>
                  ) : (
                    `+RM ${priceDetails.locationFee}`
                  )}
                </span>
              </div>

              {/* Early Call Time Fee */}
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="font-medium text-on-surface">{t('Early Morning Call Fee')}</span>
                  <span className="text-[11px] text-on-surface-variant/70">{priceDetails.earlyCallLabel}</span>
                </div>
                <span className="font-bold text-on-surface">
                  {priceDetails.earlyCallFee === 0 ? (
                    <span className="text-emerald-600 font-semibold">{language === 'zh' ? '标准时间' : 'Standard'}</span>
                  ) : (
                    `+RM ${priceDetails.earlyCallFee}`
                  )}
                </span>
              </div>

              {/* Add-ons Fee */}
              {priceDetails.addonsFee > 0 && (
                <div className="flex justify-between items-start pt-2 border-t border-dashed border-outline-variant/30">
                  <div className="flex flex-col">
                    <span className="font-medium text-on-surface">{t('Selected Add-ons')}</span>
                    <span className="text-[11px] text-on-surface-variant/70">
                      {priceDetails.selectedAddonLabels.join(', ')}
                    </span>
                  </div>
                  <span className="font-bold text-on-surface">+RM {priceDetails.addonsFee}</span>
                </div>
              )}
            </div>

            {/* Total Highlight Box */}
            <div className="bg-surface-container/60 rounded-2xl p-5 border border-outline-variant/20 mb-6 space-y-3">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span>{t('Total Estimated Price:')}</span>
                <span className="font-display-lg text-xl md:text-2xl text-primary font-bold">
                  RM {priceDetails.total}
                </span>
              </div>

              <div className="pt-3 border-t border-outline-variant/20 grid grid-cols-2 gap-2 text-xs">
                <div className="bg-primary-container/10 p-3 rounded-xl">
                  <span className="text-on-surface-variant/70 block mb-0.5">{t('30% Required Deposit')}</span>
                  <span className="font-bold text-primary text-sm">RM {priceDetails.deposit}</span>
                </div>
                <div className="bg-surface p-3 rounded-xl border border-outline-variant/20">
                  <span className="text-on-surface-variant/70 block mb-0.5">{t('70% Balance Due On Day')}</span>
                  <span className="font-bold text-on-surface text-sm">RM {priceDetails.balance}</span>
                </div>
              </div>
            </div>

            {/* Safety & Guarantee Note */}
            <div className="flex items-start gap-2.5 text-xs text-on-surface-variant/80 bg-emerald-500/10 p-3.5 rounded-xl border border-emerald-500/20">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                {language === 'zh' 
                  ? '无任何隐藏费用。档期以支付 30% 定金及签署服务协议为准。' 
                  : 'Zero hidden fees. Your date is guaranteed upon payment of the 30% deposit.'}
              </span>
            </div>

            {/* Direct WhatsApp Action Button */}
            <a
              href={generateWhatsAppMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-full py-3.5 font-label-md text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t('Direct WhatsApp Query With Breakdown')}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Confirmation Modal upon form submit */}
      {submitted && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest max-w-lg w-full rounded-3xl border border-outline-variant/30 p-8 text-center shadow-2xl relative" data-aos="zoom-in">
            <div className="w-14 h-14 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-headline-md text-xl text-primary mb-2">
              {language === 'zh' ? '预订详情已生成！' : 'Booking Summary Ready!'}
            </h3>
            <p className="font-body-md text-xs text-on-surface-variant mb-6 leading-relaxed">
              {language === 'zh' 
                ? '我们已经按照您的选择计算出完整的服务与差旅明细。点击下方按钮即可直接通过 WhatsApp 将明细发送给 Shirley 确认档期。' 
                : 'We have calculated your exact breakdown based on your location and preferences. Click below to send your request directly to Shirley via WhatsApp.'}
            </p>

            <div className="bg-surface p-4 rounded-2xl text-left font-body-md text-xs space-y-2 mb-6 border border-outline-variant/20">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">{t('Service:')}</span>
                <span className="font-semibold text-on-surface">{priceDetails.serviceLabel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">{t('Location:')}</span>
                <span className="font-semibold text-on-surface">{priceDetails.locationLabel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">{t('Total Amount:')}</span>
                <span className="font-bold text-primary">RM {priceDetails.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">{t('30% Deposit:')}</span>
                <span className="font-bold text-emerald-600">RM {priceDetails.deposit}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={generateWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-full py-3.5 font-label-md text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t('Send WhatsApp Message Now')}</span>
              </a>
              <button
                onClick={() => setSubmitted(false)}
                className="w-full bg-surface-container text-on-surface rounded-full py-3 font-label-md text-xs hover:bg-surface-container-high transition-colors"
              >
                {t('Close & Edit Details')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
