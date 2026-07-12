import React from "react";
import { STORE_INFO } from "../data";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-24 md:pb-8 border-t-[8px] border-gold-500 mt-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-black mb-4 tracking-tighter">حكاية خيط<span className="text-gold-500">.</span></h2>
        <p className="text-zinc-400 text-sm mb-8 max-w-md mx-auto">{STORE_INFO.slogan}</p>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm font-bold text-zinc-300 mb-12">
          <span>{STORE_INFO.address}</span>
          <span className="hidden md:inline text-zinc-600">•</span>
          <span dir="ltr">{STORE_INFO.formattedPhone}</span>
          <span className="hidden md:inline text-zinc-600">•</span>
          <span>الدفع عند الاستلام فقط</span>
        </div>

        <p className="text-xs text-zinc-600 font-medium">
          جميع الحقوق محفوظة © {new Date().getFullYear()} حكاية خيط
        </p>
      </div>
    </footer>
  );
};
