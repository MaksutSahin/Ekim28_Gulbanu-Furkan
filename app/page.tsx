'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [lang, setLang] = useState<'tr' | 'en'>('tr');
  const [isOpen, setIsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const t = {
    tr: {
      note: "Katılım teyidiniz (LCV) için lütfen davetiye üzerindeki butonu kullanınız. ✨",
      contactLink: "Yanıtınızı değiştirmek, doğrulamak veya başka bir konu için buradan bize ulaşın.",
      formTitle: "Kıymetli Misafirimiz,",
      namePlaceholder: "Adınız ve soyadınız...",
      attendanceLabel: "Katılım Durumunuz",
      attendingYes: "Seve seve aranızda olacağız! ✨",
      attendingNo: "Maalesef katılamayacağız, kalbimiz sizinle. 🕊️",
      guestCountLabel: "Kişi Sayısı",
      submitBtn: "Yanıtı İlet",
      submitting: "Yanıtınız iletiliyor...",
      success: "Teşekkür ederiz! Yanıtınız başarıyla alındı.",
      error: "Bir hata oluştu, lütfen tekrar deneyin.",
      contactTitle: "İletişim & Teyit",
      contactDesc: "Yanıtınızı güncellemek, katılım durumunuzu doğrulamak veya sorularınız için doğrudan bizimle iletişime geçebilirsiniz.",
      whatsappBtn: "WhatsApp İle İletişime Geç",
      whatsappMsg: "Merhaba,%20davetiye%20yanıtımı%20güncellemek/doğrulamak%20istiyorum.",
      address: "Rhoneweg 12-14, 1043 AH Amsterdam"
    },
    en: {
      note: "Please use the button on the invitation to RSVP. ✨",
      contactLink: "Contact us here to update your RSVP or for any other questions.",
      formTitle: "Dear Guest,",
      namePlaceholder: "Your first and last name...",
      attendanceLabel: "Attendance Status",
      attendingYes: "Joyfully accepts! ✨",
      attendingNo: "Regretfully declines, our hearts are with you. 🕊️",
      guestCountLabel: "Number of Guests",
      submitBtn: "Submit RSVP",
      submitting: "Submitting your response...",
      success: "Thank you! Your response has been successfully received.",
      error: "An error occurred, please try again.",
      contactTitle: "Contact & Verification",
      contactDesc: "You can reach out to us directly to update your response, verify details, or ask any questions.",
      whatsappBtn: "Contact via WhatsApp",
      whatsappMsg: "Hello,%20I%20would%20like%20to%20update/verify%20my%20RSVP.",
      address: "Rhoneweg 12-14, 1043 AH Amsterdam"
    }
  };

  const [formData, setFormData] = useState({ 
    name: '', 
    attending: t.tr.attendingYes, 
    guests: '1' 
  });
  const [status, setStatus] = useState('');

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      attending: prev.attending === t.tr.attendingYes || prev.attending === t.en.attendingYes
        ? t[lang].attendingYes 
        : t[lang].attendingNo
    }));
  }, [lang]);

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxMDlp2V7CmJsM9fBrSImZg271D1BMs33y-Z4oX-aqepjxxehlMTyFDLkTU-WM5vKPA/exec';
  const WHATSAPP_NUMBER = '15148844131';

  const isAttending = formData.attending === t[lang].attendingYes;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(t[lang].submitting);

    const finalData = {
      ...formData,
      guests: isAttending ? formData.guests : '-'
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      });

      setStatus(t[lang].success);
      setTimeout(() => {
        setIsOpen(false);
        setStatus('');
        setFormData({ name: '', attending: t[lang].attendingYes, guests: '1' });
      }, 2500);
    } catch (error) {
      setStatus(t[lang].error);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');
        .elegant-font { font-family: 'Cormorant Garamond', serif; }

        @keyframes roseBloom {
          0% { opacity: 0; transform: scale(0.85) rotate(-2deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        .animate-rose-bloom { animation: roseBloom 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        @keyframes sparkleSweep {
          0% { transform: translateX(-100%) rotate(25deg); }
          100% { transform: translateX(200%) rotate(25deg); }
        }
        .animate-sparkle { animation: sparkleSweep 1.2s ease-in-out 0.3s forwards; }

        @keyframes softGlow {
          0%, 100% { 
            background-color: rgba(212, 175, 55, 0.15); 
            box-shadow: 0 0 15px rgba(212, 175, 55, 0.4);
          }
          50% { 
            background-color: rgba(212, 175, 55, 0.45); 
            box-shadow: 0 0 25px rgba(212, 175, 55, 0.8);
          }
        }
        .animate-soft-glow {
          animation: softGlow 2s infinite ease-in-out;
        }
      `}} />

      {/* DİL SEÇİCİ - ORTALAMA KUTUSUNDAN TAMAMEN BAĞIMSIZ - KESİN SAĞ ÜST KÖŞE */}
      <div>
        <button 
          onClick={() => setLang('tr')} 
          className={`text-lg sm:text-2xl transition-all duration-300 ${lang === 'tr' ? 'text-[#C5A880] font-bold scale-110 drop-shadow-md' : 'text-slate-200 hover:text-white hover:scale-105'}`}
        >
          TR
        </button>
        <span className="text-white/30 text-lg sm:text-2xl font-light">|</span>
        <button 
          onClick={() => setLang('en')} 
          className={`text-lg sm:text-2xl transition-all duration-300 ${lang === 'en' ? 'text-[#C5A880] font-bold scale-110 drop-shadow-md' : 'text-slate-200 hover:text-white hover:scale-105'}`}
        >
          EN
        </button>
      </div>

      <main className="min-h-screen w-full bg-slate-900 flex flex-col items-center justify-center p-2 sm:p-4 py-8 relative">
        
        {/* ÜST KISIM: ZARİF BİLGİLENDİRME NOTU */}
        <div className="text-center elegant-font max-w-md px-4 mb-4 mt-16 sm:mt-0">
          <p className="text-slate-300 text-lg italic tracking-wide">
            {t[lang].note}
          </p>
        </div>

        {/* 1. KISIM: DAVETİYE GÖRSELİ VE HAYALET BUTON */}
        <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-slate-800">
          
          {/* SEÇİLEN DİLE GÖRE DEĞİŞEN GÖRSEL (Dinamik src) */}
          <img
            key={lang} 
            src={lang === 'tr' ? "/davetiye-arkaplan.png" : "/davetiye-arkaplan-en.png"}
            alt={lang === 'tr' ? "Davetiye" : "Invitation"}
            className="w-full h-auto block animate-in fade-in duration-700"
          />

          <button
            onClick={() => setIsOpen(true)}
            className="animate-soft-glow rounded-lg transition-all"
            style={{
              position: 'absolute',
              left: '11.5%',
              top: '39.1%',
              width: '11.66%',
              height: '5.7%',
              backgroundColor: 'transparent',
              border: 'none',
              zIndex: 30,
              cursor: 'pointer'
            }}
            title={lang === 'tr' ? "LCV Formunu Aç" : "Open RSVP Form"}
            aria-label={lang === 'tr' ? "LCV Formunu Aç" : "Open RSVP Form"}
          />
        </div>

        {/* 2. KISIM: RESMİN ALTINDAKİ YALIN YAZI */}
        <div className="mt-6 text-center elegant-font max-w-md px-4">
          <p 
            onClick={() => setIsContactOpen(true)}
            className="text-slate-300 hover:text-white text-lg tracking-wide cursor-pointer underline underline-offset-4 decoration-[#C5A880]/60 hover:decoration-white transition-all italic"
          >
            {t[lang].contactLink}
          </p>
        </div>

        {/* 3. KISIM: LCV FORM POP-UP */}
        {isOpen && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity">
            
            <div className="relative w-full max-w-sm">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-4 -right-4 z-50 w-11 h-11 flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#C5A880] to-[#9E7B4F] text-white hover:from-[#B0936C] hover:to-[#89683F] font-bold text-lg border-2 border-[#FDFBF7] shadow-[0_4px_15px_rgba(0,0,0,0.3)] transition-all transform hover:scale-110"
              >
                ✕
              </button>

              <div className="w-full max-h-[95vh] overflow-y-auto relative flex flex-col animate-rose-bloom elegant-font bg-[#FDFBF7] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border-[5px] border-[#C5A880] rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-xl rounded-bl-xl p-8 pt-10">
                
                <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden rounded-tl-[3rem] rounded-br-[3rem]">
                  <div className="absolute -inset-full top-0 block w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-sparkle" />
                </div>

                <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://www.svgrepo.com/show/308892/rose-flower-nature-floral.svg" 
                    alt="Rose Background" 
                    className="w-full h-auto opacity-[0.04] rotate-12 scale-125 mix-blend-multiply"
                  />
                </div>

                <div className="relative z-10 flex flex-col w-full h-full">
                  <div className="text-center mb-6 pb-4 border-b border-[#C5A880]/30">
                    <p className="text-lg text-slate-700 italic tracking-wide">
                      {t[lang].address}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
                    
                    <div className="flex flex-col">
                      <label className="block text-xl font-bold text-slate-800 mb-2 italic">{t[lang].formTitle}</label>
                      <input 
                        type="text" 
                        required 
                        placeholder={t[lang].namePlaceholder}
                        className="w-full p-4 rounded-xl border-2 border-[#C5A880]/40 focus:outline-none focus:border-[#9E7B4F] focus:ring-2 focus:ring-[#9E7B4F]/20 text-slate-800 bg-white/95 backdrop-blur-sm text-lg transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.03)] placeholder:text-slate-400 placeholder:italic" 
                        value={formData.name} 
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                      />
                    </div>
                    
                    <div className="flex flex-col">
                      <label className="block text-xl font-bold text-slate-800 mb-2 italic">{t[lang].attendanceLabel}</label>
                      <select 
                        className="w-full p-4 rounded-xl border-2 border-[#C5A880]/40 focus:outline-none focus:border-[#9E7B4F] focus:ring-2 focus:ring-[#9E7B4F]/20 text-slate-800 bg-white/95 backdrop-blur-sm text-[16px] transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.03)] cursor-pointer" 
                        value={formData.attending} 
                        onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                      >
                        <option value={t[lang].attendingYes}>{t[lang].attendingYes}</option>
                        <option value={t[lang].attendingNo}>{t[lang].attendingNo}</option>
                      </select>
                    </div>
                    
                    {isAttending && (
                      <div className="flex flex-col items-center animate-in fade-in duration-300 pb-6">
                        <label className="block text-xl font-bold text-slate-800 mb-2 italic text-center w-full">{t[lang].guestCountLabel}</label>
                        <select 
                          className="w-1/2 p-4 rounded-xl border-2 border-[#C5A880]/40 focus:outline-none focus:border-[#9E7B4F] focus:ring-2 focus:ring-[#9E7B4F]/20 text-slate-800 bg-white/95 backdrop-blur-sm text-lg text-center transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.03)] cursor-pointer"
                          value={formData.guests} 
                          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                            <option key={num} value={num}>
                              {num} {lang === 'tr' ? 'Kişi' : (num === 1 ? 'Guest' : 'Guests')}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div className="pt-2 flex justify-center">
                      <button 
                        type="submit" 
                        className="w-1/2 min-w-[160px] bg-gradient-to-r from-[#C5A880] to-[#9E7B4F] hover:from-[#B0936C] hover:to-[#89683F] text-white text-xl font-bold tracking-wider py-3.5 px-6 rounded-2xl border-[2.5px] border-[#FDFBF7]/60 shadow-[0_8px_20px_-4px_rgba(157,123,79,0.4)] transition-all duration-300 transform hover:-translate-y-1"
                      >
                        {t[lang].submitBtn}
                      </button>
                    </div>

                    {status && (
                      <p className="text-center text-lg font-bold text-slate-700 mt-2 italic">{status}</p>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. KISIM: İRTİBAT & DÜZELTME POP-UP */}
        {isContactOpen && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity">
            
            <div className="relative w-full max-w-sm">
              <button
                onClick={() => setIsContactOpen(false)}
                className="absolute -top-4 -right-4 z-50 w-11 h-11 flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#C5A880] to-[#9E7B4F] text-white hover:from-[#B0936C] hover:to-[#89683F] font-bold text-lg border-2 border-[#FDFBF7] shadow-[0_4px_15px_rgba(0,0,0,0.3)] transition-all transform hover:scale-110"
              >
                ✕
              </button>

              <div className="w-full relative flex flex-col overflow-hidden animate-rose-bloom elegant-font bg-[#FDFBF7] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border-[5px] border-[#C5A880] rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-xl rounded-bl-xl p-8 pt-10">
                
                <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden rounded-tl-[3rem] rounded-br-[3rem]">
                  <div className="absolute -inset-full top-0 block w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-sparkle" />
                </div>

                <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://www.svgrepo.com/show/308892/rose-flower-nature-floral.svg" 
                    alt="Rose Background" 
                    className="w-full h-auto opacity-[0.04] rotate-12 scale-125 mix-blend-multiply"
                  />
                </div>

                <div className="relative z-10 flex flex-col w-full text-center space-y-6">
                  <h3 className="text-2xl font-bold text-slate-800 italic pb-3 border-b border-[#C5A880]/30">
                    {t[lang].contactTitle}
                  </h3>
                  <p className="text-lg text-slate-700 italic leading-relaxed">
                    {t[lang].contactDesc}
                  </p>
                  <div className="pt-2 flex justify-center">
                    <a 
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${t[lang].whatsappMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full bg-gradient-to-r from-[#C5A880] to-[#9E7B4F] hover:from-[#B0936C] hover:to-[#89683F] text-white text-lg font-bold tracking-wider py-3.5 px-6 rounded-2xl border-[2.5px] border-[#FDFBF7]/60 shadow-[0_8px_20px_-4px_rgba(157,123,79,0.4)] transition-all duration-300 transform hover:-translate-y-1"
                    >
                      {t[lang].whatsappBtn}
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

      </main>
    </>
  );
}
