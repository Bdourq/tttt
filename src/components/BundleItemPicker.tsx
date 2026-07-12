import React from "react";
import { PRODUCTS } from "../data";
import { BundleItemValue } from "../types";
import { getProductByName } from "../utils/bundle";

interface BundleItemPickerProps {
  label: string;
  value: BundleItemValue;
  onChange: (value: BundleItemValue) => void;
}

export const BundleItemPicker: React.FC<BundleItemPickerProps> = ({ label, value, onChange }) => {
  const productData = value.product ? getProductByName(value.product) : undefined;

  const handleProductChange = (name: string) => {
    const p = getProductByName(name);
    onChange({
      product: name,
      color: p?.colors?.[0]?.name || "",
      size: "",
    });
  };

  return (
    <div className="space-y-3 bg-white p-4 rounded-xl border border-gold-200">
      <label className="block text-[11px] font-black text-gold-600 uppercase tracking-wide">{label}</label>

      <select
        value={value.product}
        onChange={(e) => handleProductChange(e.target.value)}
        required
        aria-label={`${label} - الموديل`}
        className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm font-bold text-brand-green focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all outline-none"
      >
        <option value="" disabled>اختاري الموديل</option>
        {PRODUCTS.map((p) => (
          <option key={p.id} value={p.name}>{p.name} - {p.price} د.أ</option>
        ))}
      </select>

      {productData?.colors && (
        <div className="flex flex-wrap gap-2">
          {productData.colors.map((c) => (
            <label key={c.name} className="cursor-pointer relative">
              <input
                type="radio"
                name={`${label}-color`}
                value={c.name}
                checked={value.color === c.name}
                onChange={() => onChange({ ...value, color: c.name })}
                className="peer sr-only"
              />
              <div className="px-3 py-1.5 bg-white border-2 border-zinc-200 rounded-lg text-[11px] font-bold text-zinc-600 peer-checked:border-brand-green peer-checked:bg-gold-100 peer-checked:text-brand-green transition-all flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ background: c.hex }}></span>
                {c.name}
              </div>
            </label>
          ))}
        </div>
      )}

      {productData && (
        <select
          value={value.size}
          onChange={(e) => onChange({ ...value, size: e.target.value })}
          required
          aria-label={`${label} - المقاس`}
          className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all outline-none"
        >
          <option value="" disabled>اختاري المقاس</option>
          {productData.availableSizes.map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      )}
    </div>
  );
};
