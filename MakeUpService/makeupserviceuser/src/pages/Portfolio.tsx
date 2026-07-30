import React, { useRef, useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Portfolio() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const beforeImageRef = useRef<HTMLImageElement>(null);

  const [isDragging, setIsDragging] = useState(false);

  const updateSlider = (clientX: number) => {
    if (!containerRef.current || !overlayRef.current || !handleRef.current || !beforeImageRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let pos = ((clientX - rect.left) / rect.width) * 100;
    pos = Math.max(0, Math.min(pos, 100));
    
    overlayRef.current.style.width = `${pos}%`;
    handleRef.current.style.left = `${pos}%`;
    beforeImageRef.current.style.width = `${(100 / pos) * 100}%`;
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: globalThis.MouseEvent) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  };
  
  const handleTouchMove = (e: globalThis.TouchEvent) => {
    if (!isDragging) return;
    updateSlider(e.touches[0].clientX);
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchend', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging]);

  return (
    <div className="px-margin-mobile md:px-margin-desktop py-16 space-y-section-gap">
      <section className="text-center space-y-6">
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-background">{t('Curated Artistry')}</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">{t('A selection of high-fashion editorial and precision bridal looks designed for the modern muse.')}</p>
        
        <div className="flex flex-wrap justify-center gap-4 pt-8">
          <button className="font-label-md text-label-md px-4 py-2 rounded-full bg-primary-container text-on-primary shadow-20px-blur">{t('All')}</button>
          <button className="font-label-md text-label-md px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest transition-colors">{t('Bridal')}</button>
          <button className="font-label-md text-label-md px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest transition-colors">{t('Glamour')}</button>
          <button className="font-label-md text-label-md px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest transition-colors">{t('Natural')}</button>
        </div>
      </section>

      <section className="masonry-grid">
        <div className="masonry-item relative group overflow-hidden rounded-xl shadow-20px-blur">
          <img alt="Bridal Makeup" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYV3ptJG-8gouAn8ivF0GfprlC-4NVNizWkyvHlvT1WGOB7zDsME6leB1SugUfvpACuHIv1RPIMvop-a5rxcmqmY53LprLr0gpisyG_3FchAFbyTX658LkGCic1jyoLsgU_SeDTzNOP-VigX51T-hg_IdVCQmyM8o06XCh8k9ACEeLGaRFKtkxfzDwciLoJfc7OGXp23P-fdDpG72n5UMw8LIblnj2gWvUKC-Nh_quRNz9WBuB5IOP-vv8oDEbtmZzaORWd_CWzw"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
            <div>
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full font-label-md text-label-md text-white mb-2">{t('Bridal')}</span>
              <h3 className="font-headline-md text-headline-md text-white">{t('Classic Elegance')}</h3>
            </div>
          </div>
        </div>
        
        <div className="masonry-item relative group overflow-hidden rounded-xl shadow-20px-blur">
          <img alt="Glamour Makeup" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqGbpH0A8LPDx40IYFj1YEvZ3U36tNtoLr379cQnMkQi2L8IOLAlhLoj1KjI_xHNF8J25E_yP0JCQ_T8QyldziTj7IgiX9ZHWnrd8wdJ_5OdtrlgIVqvf26RssiJuHbpIxzMefA8RC9R1q-WP-pNOTxkBNdVtpenYvO2MeQwu3SurorLDzg95856nlTtwGaZt14Gl90k34yHUKM6ynOd5Sz0IoDQIDcCLuhGg5Hse0-Yw4iyGi-kpGO6YVKDVnokRso1kCWjcejQ"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
            <div>
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full font-label-md text-label-md text-white mb-2">{t('Glamour')}</span>
              <h3 className="font-headline-md text-headline-md text-white">{t('Evening Noir')}</h3>
            </div>
          </div>
        </div>
        
        <div className="masonry-item relative group overflow-hidden rounded-xl shadow-20px-blur">
          <img alt="Natural Makeup" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBF42q1HP9_tpjq14_7TW5KI1a8W0nIBR7M1kggpX4DsUxCxj5cn9upOj7cSovMpAxtvPRKVlBXVu8fOUGEYE8RXkyF2wKiwwD2Vn9qj-PjmHEcU9ZZDAhD5QkUBC8f49isbf-myq3Oea2JapZAjLAcRDQzFaUTo_QEfw-ozLSbkpdHcnupGGad5Zyc8RKZdYrvAG199ijMQ00buvixy6xqx_Il9ipK7ti_O3Dr7WsL1VFCdtjWbaM3sKzA5Rz6atFJyOfARVV31Q"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
            <div>
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full font-label-md text-label-md text-white mb-2">{t('Natural')}</span>
              <h3 className="font-headline-md text-headline-md text-white">{t('Dewy Skin')}</h3>
            </div>
          </div>
        </div>
        
        <div className="masonry-item relative group overflow-hidden rounded-xl shadow-20px-blur">
          <img alt="Editorial Makeup" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRxorSQMDdTu3pQgTVAcn_aUnnTx7-mw7BkGjZxbXWe564ggndKCCvL_bRGIwiDK3Vx3FQECnKDMzI_mdUC48VPKJWjd7rNfE_bgCUN7oUNry7Kn7dq2XnbMeUhURu-n4cfZJie7YRrszOCIng0i8QT071FYZK5a-r5u79IUiRsnTnOrvkUSLnC1K-PtjrnLbhs6lBUw2YqHfafwshS47xxrgMz7epaj1uyEEk-m9fewPUO7jC_kYhspobKCVaCiI4G1hnBfYWgA"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
            <div>
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full font-label-md text-label-md text-white mb-2">{t('Editorial')}</span>
              <h3 className="font-headline-md text-headline-md text-white">{t('Golden Hour')}</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto space-y-8 pb-16">
        <div className="text-center">
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background">{t('The Transformation')}</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">{t('Drag the slider to reveal the artistry.')}</p>
        </div>
        
        <div ref={containerRef} className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-20px-blur select-none">
          <img alt="After Makeup" className="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfI4GNf9FtoDeVj5Fs-0TEXt_bp7GTj5B0ItVhjVKANTIoGtCck257Eh3PWK89-3329ArvJaP_ywjxJC0pmS_OLJP9Nf2-WmKRLAlCEicOtIB7pdhw0BUmDLUEyFV-OThkgCnC1vE9rVI12606lCZZALKhgZ9CkTBkN2IGPru0wCZbAUCIjl8K0jD_fuxFY1YaD-g1zy5fuKMDpxqDs2bj94os94w7zbFtufnuQbI4Vf5rzyj06tybdLlXns3Zf2GDpz2SFKwOFQ"/>
          
          <div ref={overlayRef} className="slider-overlay w-1/2">
            <img ref={beforeImageRef} alt="Before Makeup" className="absolute inset-0 w-full h-full object-cover max-w-none" style={{ width: '200%' }} src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6Ci4XWAH2AQYlKvb54iecMnTi2CnwVWfWtMra0mDjF2LBLMf0m13beJNoNZzTRDaIrV12aSNxgL5NFATUXa8_jqCRJoTZUPGDg61mCiqhOXyXRcK1bz1aniqznfBG9KgqcQqMKTDpXamry8oEveyyLzV5AQ80yeylN_mxufMwGFJo2msErIfMWD7T_3K2dTnFxkcgEKDsnCo1l-VBB5gN8HyRSGSxzjsReg55TrAx5MiZADjAzT1DNav9X5tQPWydwjpM4eKZrA" />
          </div>
          
          <div 
            ref={handleRef} 
            className="slider-handle left-1/2"
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
          ></div>
        </div>
      </section>
    </div>
  );
}
