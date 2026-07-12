import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { FAQS } from "../data";

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h2 className="text-2xl md:text-4xl font-black text-center text-brand-green mb-12 tracking-tight">أسئلة شائعة (اقرئي قبل الطلب)</h2>
      <div className="space-y-4">
        {FAQS.map((faq, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden transition-all hover:shadow-md">
            <button
              onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
              className="w-full text-right p-5 md:p-6 flex items-center justify-between font-black text-zinc-900 bg-white"
            >
              <span>{faq.question}</span>
              {index === openIndex ? (
                <Minus className="w-5 h-5 text-gold-500 shrink-0" />
              ) : (
                <Plus className="w-5 h-5 text-brand-green shrink-0" />
              )}
            </button>
            <AnimatePresence>
              {index === openIndex && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-zinc-50 border-t border-zinc-100"
                >
                  <p className="p-5 md:p-6 text-sm font-medium text-zinc-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};
