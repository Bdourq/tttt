import React from "react";
import { STORE_INFO } from "../data";

interface HeaderProps {
  h: string;
  m: string;
  s: string;
}

export const Header: React.FC<HeaderProps> = ({ h, m, s }) => {
  return (
    <>
      {/* 1. Top Promo Bar */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-gold-500 to-gold-600 text-white py-3.5 px-4 shadow-lg animate-glow">
        <div className="max-w-7xl mx-auto flex items-center justify-center text-center">
          <p className="text-sm md:text-lg font-black tracking-wide">
            🎁 اشتري قطعتين (أي موديلين) واحصلي على الثالثة مجاناً + كل الأسعار تشمل التوصيل ✅
          </p>
        </div>
      </div>

      {/* 2. Secondary Info Bar */}
      <div className="bg-zinc-900 text-white py-2 px-4 flex justify-center gap-3 md:gap-6 text-xs md:text-sm font-bold sticky top-[52px] md:top-[60px] z-40">
        <div className="flex items-center gap-2">
          <span>🔥 العرض ينتهي خلال</span>
          <div className="bg-red-600 px-2 py-0.5 rounded font-mono font-black text-sm tracking-widest">
            {h}:{m}:{s}
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-zinc-400">
          <span>📦 معاينة قبل الدفع في كل الأردن</span>
        </div>
      </div>

      {/* 3. Main Header */}
      <header className="bg-white py-4 px-4 border-b border-zinc-100 shadow-sm sticky top-[88px] md:top-[92px] z-30">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl md:text-4xl font-black text-brand-green tracking-tighter">
              حكاية خيط<span className="text-gold-500">.</span>
            </h1>
          </div>
          <p className="text-[10px] md:text-xs font-bold text-zinc-400 uppercase tracking-widest">
            {STORE_INFO.slogan}
          </p>
        </div>
      </header>

      {/* 4. Social Proof Ticker */}
      <div className="bg-amber-50 border-y border-amber-200/50 py-2 overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-scroll-ticker">
          <div className="flex items-center gap-12 px-4">
            <span className="text-xs md:text-sm font-bold text-amber-800">✅ نورة من الزرقاء طلبت فستان الباموك - قبل دقيقتين</span>
            <span className="text-xs md:text-sm font-bold text-amber-800">🔥 1,384 طلب تم توصيله هذا الشهر</span>
            <span className="text-xs md:text-sm font-bold text-amber-800">✅ سارة من إربد طلبت طقم 3 قطع - قبل 5 دقائق</span>
            <span className="text-xs md:text-sm font-bold text-amber-800">⭐ تقييم 4.9/5 من 312 زبونة</span>
            <span className="text-xs md:text-sm font-bold text-amber-800">✅ أم أحمد من عمان طلبت عباية الكسرات - قبل 9 دقائق</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll-ticker {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-scroll-ticker {
          animation: scroll-ticker 30s linear infinite;
        }
      `}</style>
    </>
  );
};
