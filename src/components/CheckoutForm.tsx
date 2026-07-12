import React from "react";
import { CheckCircle2, ShieldCheck, MapPin, Phone, Ruler, User } from "lucide-react";
import { PRODUCTS } from "../data";

interface CheckoutFormProps {
  checkoutRef: React.RefObject<HTMLDivElement>;
  selectedProduct: string;
  setSelectedProduct: (val: string) => void;
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleFormSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  checkoutRef,
  selectedProduct,
  setSelectedProduct,
  formData,
  handleInputChange,
  handleFormSubmit,
  isSubmitting
}) => {
  const selectedProductData = PRODUCTS.find(p => p.name === selectedProduct);

  return (
    <div className="max-w-xl mx-auto px-4 py-12 mb-20 md:mb-0" ref={checkoutRef}>
      <div className="bg-white p-6 md:p-10 rounded-[2rem] shadow-2xl border border-zinc-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600"></div>
        
        <div className="text-center mb-8 pt-4">
          <span className="inline-block bg-brand-green text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3">الخطوة الأخيرة</span>
          <h2 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight">أدخلي بياناتك لإتمام الحجز</h2>
          <p className="text-zinc-500 text-xs md:text-sm mt-3 font-medium">الدفع عند الاستلام - السعر يشمل التوصيل</p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="bg-zinc-50 p-5 rounded-2xl border border-zinc-100 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-brand-green text-white flex items-center justify-center text-xs font-bold">1</span>
              <h3 className="font-black text-sm">اختاري الموديل والعرض</h3>
            </div>
            
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-zinc-500 uppercase">الموديل المطلوب</label>
              <select 
                name="productName" 
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3.5 text-sm font-bold text-brand-green focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all outline-none"
              >
                {PRODUCTS.map(p => (
                  <option key={p.id} value={p.name}>{p.name} - {p.price} د.أ (توصيل مجاني)</option>
                ))}
              </select>
            </div>

            {selectedProductData?.colors && (
              <div className="space-y-2 pt-2">
                <label className="block text-[11px] font-bold text-zinc-500 uppercase">اللون المطلوب</label>
                <div className="flex flex-wrap gap-2">
                  {selectedProductData.colors.map(c => (
                    <label key={c.name} className="cursor-pointer relative">
                      <input 
                        type="radio" 
                        name="color" 
                        value={c.name}
                        checked={formData.color === c.name}
                        onChange={handleInputChange}
                        className="peer sr-only"
                      />
                      <div className="px-4 py-2 bg-white border-2 border-zinc-200 rounded-xl text-xs font-bold text-zinc-600 peer-checked:border-brand-green peer-checked:bg-emerald-50 peer-checked:text-brand-green transition-all flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full shadow-sm" style={{ background: c.hex }}></span>
                        {c.name}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2 pt-2">
              <label className="block text-[11px] font-bold text-zinc-500 uppercase">تفعيل عرض 2+1 مجاناً؟</label>
              <select 
                name="bundleOffer" 
                value={formData.bundleOffer}
                onChange={handleInputChange}
                className="w-full bg-amber-50 border-2 border-amber-200 rounded-xl px-4 py-3.5 text-sm font-black text-amber-900 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all outline-none"
              >
                <option value="قطعة واحدة فقط">لا، أريد قطعة واحدة فقط ({selectedProductData?.price} د.أ)</option>
                <option value="العرض الذهبي 2+1 مجاناً">نعم! أريد عرض 2+1 مجاناً (التوصيل مجاني)</option>
              </select>
            </div>
            
            <div className="space-y-2 pt-2">
              <label className="block text-[11px] font-bold text-zinc-500 uppercase">المقاس المطلوب ({selectedProductData?.sizeType === 'weight' ? 'بالوزن' : selectedProductData?.sizeType === 'numbers' ? 'بالأرقام' : 'فري سايز'}) <span className="text-red-500">*</span></label>
              <select
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                required
                className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm font-medium focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all outline-none"
              >
                <option value="" disabled>اختاري المقاس المناسب لكِ</option>
                {selectedProductData?.availableSizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
              <p className="text-[10px] text-zinc-400 mt-1">إذا محتارة، اختاري الأقرب وسنتواصل معك لتأكيد المقاس المناسب 100%</p>
            </div>
          </div>

          <div className="bg-zinc-50 p-5 rounded-2xl border border-zinc-100 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-brand-green text-white flex items-center justify-center text-xs font-bold">2</span>
              <h3 className="font-black text-sm">بيانات التوصيل (سرية وآمنة)</h3>
            </div>

            <div>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-zinc-400" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  placeholder="الاسم الثلاثي *"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white border border-zinc-200 rounded-xl pr-11 pl-4 py-3.5 text-sm focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all outline-none"
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-zinc-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="رقم الهاتف (يبدأ بـ 07) *"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  dir="ltr"
                  className="w-full bg-white border border-zinc-200 rounded-xl pr-11 pl-4 py-3.5 text-sm focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all outline-none text-right font-mono"
                />
              </div>
              <p className="text-[10px] text-zinc-400 mt-1.5 px-2">يجب أن يكون رقم صحيح لنتواصل معك لتأكيد الطلب</p>
            </div>

            <div>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-zinc-400" />
                </div>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white border border-zinc-200 rounded-xl pr-11 pl-4 py-3.5 text-sm focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all outline-none appearance-none"
                >
                  <option value="" disabled>المحافظة *</option>
                  {["عمان", "إربد", "الزرقاء", "المفرق", "جرش", "عجلون", "البلقاء", "مأدبا", "الكرك", "الطفيلة", "معان", "العقبة"].map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Ruler className="h-4 w-4 text-zinc-400" />
                </div>
                <input
                  type="number"
                  name="height"
                  placeholder="الطول (سم) *"
                  value={formData.height}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white border border-zinc-200 rounded-xl pr-9 pl-3 py-3 text-sm focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all outline-none"
                />
              </div>
              <div className="relative">
                 <input
                  type="number"
                  name="weight"
                  placeholder="الوزن (كغم) *"
                  value={formData.weight}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white border border-zinc-200 rounded-xl px-3 py-3 text-sm focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all outline-none"
                />
              </div>
            </div>
            <p className="text-[10px] text-zinc-400 mt-1 text-center">نطلب الطول والوزن لضمان إرسال المقاس المطابق 100%</p>
          </div>

          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-xs font-bold text-emerald-800 leading-relaxed">
              لن تدفعي أي مبلغ الآن. الدفع يكون فقط عند استلام الطلب وبعد المعاينة. التوصيل مجاني تماماً.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full text-white font-black py-5 rounded-2xl shadow-[0_15px_30px_-10px_rgba(44,94,67,0.5)] transition-all flex items-center justify-center gap-3 text-lg ${
              isSubmitting ? "bg-zinc-400 cursor-not-allowed scale-100" : "bg-brand-green hover:bg-emerald-800 active:scale-[0.98]"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                جاري تأكيد الطلب...
              </span>
            ) : (
              <>
                تأكيد الطلب (الدفع عند الاستلام)
                <CheckCircle2 className="w-6 h-6" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
