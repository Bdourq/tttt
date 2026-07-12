import React, { useState, useEffect, useRef } from "react";
import { Truck, Phone, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PRODUCTS, STORE_INFO } from "./data";
import { ViewState } from "./types";

// Components
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ProductCard } from "./components/ProductCard";
import { FAQ } from "./components/FAQ";
import { CheckoutForm } from "./components/CheckoutForm";
import { ThankYou } from "./components/ThankYou";
import { Footer } from "./components/Footer";

export default function App() {
  const [view, setView] = useState<ViewState>({ type: 'home' });
  const [timeLeft, setTimeLeft] = useState(7198); // 01:59:58
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0].name);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const checkoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 7198 : prev - 1));
    }, 1000);

    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return { h, m, s };
  };

  const { h, m, s } = formatTime(timeLeft);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    height: "",
    weight: "",
    city: "",
    notes: "",
    color: PRODUCTS[0].colors?.[0].name || "أسود",
    bundleOffer: "العرض الذهبي 2+1 مجاناً"
  });

  useEffect(() => {
    const matched = PRODUCTS.find(p => p.name === selectedProduct);
    if (matched) {
      setFormData(prev => ({
        ...prev,
        color: matched.colors?.[0].name || prev.color,
        notes: "" // Reset size selection to force user choice
      }));
    }
  }, [selectedProduct]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.city || !formData.height || !formData.weight || !formData.notes) {
      alert("الرجاء ملء جميع المعلومات المطلوبة لإتمام الحجز (الاسم، الهاتف، المحافظة، الطول، الوزن، والمقاس)");
      return;
    }
    if (!/^07[0-9]{8}$/.test(formData.phone)) {
      alert("رقم الهاتف يجب أن يبدأ بـ 07 ويتكون من 10 أرقام");
      return;
    }

    setIsSubmitting(true);
    // Simulate API call for "Crazy Speed" feel
    setTimeout(() => {
      const randomId = Math.floor(1000 + Math.random() * 9000);
      const orderId = `HK-${randomId}`;
      const matchedProduct = PRODUCTS.find(p => p.name === selectedProduct) || PRODUCTS[0];

      setIsSubmitting(false);
      setView({
        type: 'thank-you',
        orderDetails: {
          orderId,
          product: matchedProduct,
          fullName: formData.fullName,
          phone: formData.phone,
          height: formData.height,
          weight: formData.weight,
          city: formData.city,
          notes: formData.notes,
          color: formData.color,
          bundleOffer: formData.bundleOffer
        }
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1400);
  };

  const scrollToCheckout = (productName: string) => {
    setSelectedProduct(productName);
    checkoutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (view.type === 'thank-you') {
    return <ThankYou details={view.orderDetails} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gold-50 font-sans selection:bg-brand-green selection:text-white" dir="rtl">
      <Header h={h} m={m} s={s} />

      <main className="flex-grow">
        <Hero onOrderClick={() => checkoutRef.current?.scrollIntoView({ behavior: "smooth" })} />

        {/* 4. Mandatory Delivery Notice Banner */}
        <div className="max-w-4xl mx-auto px-4 mb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-brand-green text-white p-5 md:p-6 rounded-2xl shadow-lg flex items-center gap-5 border border-emerald-800"
          >
            <div className="bg-white/10 p-3 rounded-xl shrink-0">
              <Truck className="w-6 h-6 md:w-8 md:h-8 text-gold-300" />
            </div>
            <p className="font-black text-sm md:text-lg leading-tight">
            حكاية خيط تضمن لكِ أفضل تجربة: الأسعار تشمل التوصيل المجاني + المعاينة قبل الدفع في كل الأردن!
            </p>
          </motion.div>
        </div>

        {/* 5. Product Catalog */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PRODUCTS.map((product, idx) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onOrder={scrollToCheckout} 
                idx={idx} 
              />
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm text-center">
            <div className="text-3xl mb-2">📦</div>
            <h4 className="font-black text-sm mb-1">معاينة قبل الدفع</h4>
            <p className="text-zinc-400 text-[10px] font-bold uppercase">افتحي الطرد وافحصي قبل ما تدفعي</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm text-center">
            <div className="text-3xl mb-2">⚡</div>
            <h4 className="font-black text-sm mb-1">توصيل 24 ساعة</h4>
            <p className="text-zinc-400 text-[10px] font-bold uppercase">لكل محافظات الأردن</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm text-center">
            <div className="text-3xl mb-2">↩️</div>
            <h4 className="font-black text-sm mb-1">استبدال مجاني</h4>
            <p className="text-zinc-400 text-[10px] font-bold uppercase">خلال 24 ساعة بدون إحراج</p>
          </div>
        </div>

        <FAQ />

        <CheckoutForm 
          checkoutRef={checkoutRef}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          formData={formData}
          handleInputChange={handleInputChange}
          handleFormSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
        />
      </main>

      <Footer />

      {/* Sticky Bottom Bar for Mobile Conversion */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-[60] bg-white/95 backdrop-blur-md border-t border-zinc-200 p-3 flex items-center justify-between shadow-[0_-10px_30px_-5px_rgba(0,0,0,0.1)] px-6 md:hidden"
          >
            <div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">العرض الذهبي ينتهي خلال</p>
              <p className="font-black text-brand-red text-sm font-mono tracking-widest">{h}:{m}:{s}</p>
            </div>
            <button 
              onClick={() => checkoutRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="bg-brand-green text-white font-black py-3 px-6 rounded-xl shadow-lg flex items-center gap-2 active:scale-95 transition-all text-sm"
            >
              <ShoppingCart className="w-4 h-4" />
              اطلبي الآن
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Speed Dial */}
      <div className="fixed bottom-20 right-6 z-[60] hidden md:block">
        <a 
          href={`https://wa.me/${STORE_INFO.phone}`}
          target="_blank"
          rel="noreferrer"
          className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
        >
          <Phone className="w-8 h-8" />
        </a>
      </div>
    </div>
  );
}
