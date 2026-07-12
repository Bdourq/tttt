import React from "react";
import { motion } from "motion/react";
import { ShoppingCart } from "lucide-react";
import { toWebp } from "../utils/media";

interface HeroProps {
  onOrderClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderClick }) => {
  return (
    <section className="relative bg-white max-w-7xl mx-auto my-6 rounded-[2rem] overflow-hidden shadow-2xl border border-zinc-100 min-h-[400px] md:min-h-[500px] flex flex-col md:flex-row items-center">
      {/* Visual Content */}
      <div className="w-full md:w-1/2 h-[300px] md:h-full relative overflow-hidden">
        <picture>
          <source srcSet={toWebp("/images/p3-1.jpg")} type="image/webp" />
          <img 
            src="/images/p3-1.jpg" 
            alt="أزياء حكاية خيط - جودة تركية أصلية" 
            className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-1000"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:bg-gradient-to-l md:from-white md:to-transparent"></div>
        
        {/* Floating Badge on Image */}
        <div className="absolute bottom-6 right-6 md:right-12 bg-gold-500 text-white px-4 py-2 rounded-xl shadow-xl font-black text-sm md:text-base animate-bounce">
          خصم لغاية 50% 🔥
        </div>
      </div>

      {/* Text Content */}
      <div className="w-full md:w-1/2 p-8 md:p-16 text-right md:text-center flex flex-col items-center md:items-center">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 bg-zinc-100 px-3 py-1 rounded-full mb-6">
            <span className="w-2 h-2 bg-brand-red rounded-full animate-ping"></span>
            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">مجموعة صيف 2026 وصلت!</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-brand-green leading-[1.2] mb-6 tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            أناقة شرعية تليق بكِ <br /> 
            <span className="text-gold-600 underline decoration-gold-200 underline-offset-8">بجودة تركية أصلية</span>
          </h2>

          <p className="text-zinc-500 text-sm md:text-lg font-medium leading-relaxed max-w-md mb-10">
            تألقي بأحدث الموديلات التركية. أقمشة باردة، ألوان مميزة، وتوصيل مجاني لباب بيتك مع معاينة قبل الدفع.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["✅ توصيل مجاني", "📦 معاينة قبل الدفع", "↩️ استبدال سهل"].map((badge, i) => (
              <span key={i} className="bg-gold-100 text-brand-green border border-gold-200 px-4 py-2 rounded-xl text-xs md:text-sm font-black shadow-sm">
                {badge}
              </span>
            ))}
          </div>

          <button 
            onClick={onOrderClick}
            className="group bg-brand-green hover:bg-brand-dark text-white px-12 py-5 rounded-2xl font-black text-xl md:text-2xl shadow-[0_20px_40px_-10px_rgba(18,15,13,0.35)] transition-all active:scale-95 flex items-center gap-3"
          >
            تسوقي الآن
            <ShoppingCart className="w-6 h-6 group-hover:translate-x-[-4px] transition-transform" />
          </button>
          
          <p className="mt-6 text-[11px] md:text-xs text-zinc-400 font-bold tracking-tight bg-zinc-50 px-4 py-2 rounded-lg">
            العرض الذهبي: اشتري 2 + الثالث مجاناً - العرض ينتهي قريباً
          </p>
        </motion.div>
      </div>
    </section>
  );
};
