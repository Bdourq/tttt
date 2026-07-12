import React from "react";
import { CheckCircle2, MessageCircle, MapPin, Truck } from "lucide-react";
import { motion } from "motion/react";
import { OrderDetails } from "../types";
import { STORE_INFO } from "../data";

interface ThankYouProps {
  details: OrderDetails;
}

export const ThankYou: React.FC<ThankYouProps> = ({ details }) => {
  const whatsappMsg = encodeURIComponent(
    `مرحباً حكاية خيط، أود تأكيد طلبي:\nرقم الطلب: ${details.orderId}\nالاسم: ${details.fullName}\nالموديل: ${details.product.name}\nاللون: ${details.color}\nالمقاس: ${details.notes}\nالمحافظة: ${details.city}`
  );

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4 font-sans text-center" dir="rtl">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white max-w-lg w-full rounded-[2rem] shadow-2xl p-8 md:p-12 border border-zinc-100"
      >
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-12 h-12 text-brand-green" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-black text-zinc-900 mb-2 tracking-tight">تم استلام طلبك بنجاح!</h1>
        <p className="text-zinc-500 font-medium mb-8">شكراً لثقتك بـ حكاية خيط يا {details.fullName.split(' ')[0]}</p>
        
        <div className="bg-zinc-50 rounded-2xl p-6 text-right mb-8 border border-zinc-100">
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-zinc-200">
            <span className="text-zinc-500 text-sm font-bold">رقم الطلب</span>
            <span className="font-mono font-black text-lg">{details.orderId}</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-zinc-500 text-sm">الموديل</span>
              <span className="font-bold text-sm max-w-[180px] truncate">{details.product.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500 text-sm">اللون والمقاس</span>
              <span className="font-bold text-sm">{details.color} - {details.notes}</span>
            </div>
            <div className="flex justify-between text-brand-green font-black pt-2">
              <span>الإجمالي (الدفع عند الاستلام)</span>
              <span>{details.product.price} د.أ</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-blue-50 text-blue-800 p-4 rounded-xl text-sm font-bold text-right border border-blue-100">
            <Truck className="w-6 h-6 shrink-0" />
            <p>سنتواصل معك هاتفياً خلال 24 ساعة لتأكيد موعد التوصيل لـ {details.city}</p>
          </div>
          
          <a 
            href={`https://wa.me/${STORE_INFO.phone}?text=${whatsappMsg}`}
            target="_blank"
            rel="noreferrer"
            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-black py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            تأكيد الطلب فوراً عبر واتساب (أسرع)
          </a>
        </div>
      </motion.div>
    </div>
  );
};
