import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart, CheckCircle, Play } from "lucide-react";
import { Product } from "../data";
import { toWebp, toPoster } from "../utils/media";

interface ProductCardProps {
  product: Product;
  onOrder: (name: string) => void;
  idx?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOrder, idx = 0 }) => {
  const [activeMedia, setActiveMedia] = useState({ url: product.images[0], type: 'image' });

  // Sync active media if product object changes
  useEffect(() => {
    setActiveMedia({ url: product.images[0], type: 'image' });
  }, [product.id]);

  const badgeColors = {
    free: "bg-gold-500 animate-pulse",
    best: "bg-gold-600",
    off: "bg-rose-600",
    default: "bg-brand-dark"
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      className="bg-white rounded-2xl border border-zinc-100 shadow-lg overflow-hidden flex flex-col relative group"
    >
      {product.badge && (
        <div className={`absolute top-4 right-4 text-white font-black text-[10px] md:text-xs px-3 py-1.5 rounded-lg shadow-lg z-10 ${badgeColors[product.badgeType || 'default']}`}>
          {product.badge}
        </div>
      )}

      <div className="relative aspect-[3/4] w-full bg-zinc-50 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeMedia.type === 'video' ? (
            <motion.video
              key={activeMedia.url}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={toPoster(activeMedia.url)}
              className="w-full h-full object-cover"
            >
              <source src={activeMedia.url} type="video/mp4" />
            </motion.video>
          ) : (
            <picture>
              <source srcSet={toWebp(activeMedia.url)} type="image/webp" />
              <motion.img 
                key={activeMedia.url}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={activeMedia.url} 
                alt={`${product.name} - صورة المنتج`} 
                className="w-full h-full object-cover" 
                decoding="async"
                fetchPriority={idx === 0 ? "high" : "auto"}
                loading={idx === 0 ? "eager" : "lazy"}
              />
            </picture>
          )}
        </AnimatePresence>
        
        {/* Quality Seal */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-brand-green font-black text-[9px] px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1.5 border border-zinc-100">
          <CheckCircle className="w-3 h-3" />
          معاينة قبل الدفع
        </div>
      </div>

      <div className="p-5 md:p-8 flex-grow flex flex-col justify-between text-center">
        <div>
          <h3 className="text-lg md:text-xl font-black text-zinc-900 mb-2 leading-tight tracking-tight">
            {product.name}
          </h3>
          <p className="text-zinc-500 text-xs md:text-sm font-medium leading-relaxed mb-4 line-clamp-2">
            {product.details}
          </p>
          
          <div className="flex gap-2 justify-center mb-6 overflow-x-auto pb-1 scrollbar-hide">
            {/* Video Thumbnails First */}
            {product.videos?.map((vid, i) => (
              <button
                key={`vid-${i}`}
                onClick={() => setActiveMedia({ url: vid, type: 'video' })}
                className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 relative bg-zinc-100 ${activeMedia.url === vid ? "border-gold-500 scale-105" : "border-transparent opacity-60 hover:opacity-100"}`}
              >
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white z-10">
                  <Play className="w-4 h-4 fill-white" />
                </div>
                <img src={toPoster(vid)} alt="" className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
            {/* Image Thumbnails - showing all images instead of slicing at 5 */}
            {product.images.map((img, i) => (
              <button
                key={`img-${i}`}
                onClick={() => setActiveMedia({ url: img, type: 'image' })}
                className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${activeMedia.url === img ? "border-gold-500 scale-105" : "border-transparent opacity-60 hover:opacity-100"}`}
              >
                <picture>
                  <source srcSet={toWebp(img)} type="image/webp" />
                  <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                </picture>
              </button>
            ))}
          </div>

          {product.colors && (
            <div className="space-y-3 mb-6">
              <p className="text-[10px] font-black text-zinc-400 text-center uppercase tracking-widest">الألوان المتوفرة - اضغطي للطلب</p>
              <div className="flex flex-wrap justify-center gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    className="group relative flex flex-col items-center gap-1.5 transition-all hover:scale-110 active:scale-95"
                    onClick={() => onOrder(product.name)}
                  >
                    <div 
                      className="w-9 h-9 rounded-full border-2 border-white shadow-md ring-1 ring-zinc-200" 
                      style={{ background: c.hex }}
                    ></div>
                    <span className="text-[9px] font-black text-zinc-500">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-baseline justify-center gap-3 mb-1">
            <span className="text-3xl font-black text-brand-green">{product.price} د.أ</span>
            <span className="text-sm text-zinc-300 line-through font-bold">{product.oldPrice} د.أ</span>
          </div>
          
          <div className="bg-gold-100 text-gold-600 py-1.5 px-4 rounded-full font-black text-[10px] md:text-xs mb-6 inline-flex items-center gap-2 mx-auto border border-gold-200">
            السعر يشمل التوصيل بالكامل 🚚
          </div>

          {product.saveAmount && (
            <div className="text-[11px] font-black text-brand-red mb-1 bg-rose-50 py-1 rounded-md border border-rose-100">
              🔥 {product.saveAmount}
            </div>
          )}
          
          <div className="text-[10px] font-bold text-zinc-400 mb-4 animate-pulse">
            ⚠️ بقي فقط 4 قطع في المخزن
          </div>

          <button
            onClick={() => onOrder(product.name)}
            className="w-full bg-brand-dark hover:bg-brand-green text-white font-black py-4 rounded-xl shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-3 text-sm md:text-base"
          >
            <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
            اطلبي هذا الموديل الآن
          </button>
        </div>
      </div>
    </motion.div>
  );
};
