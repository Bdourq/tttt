import { Product } from "./data";

export interface BundleItemValue {
  product: string;
  color: string;
  size: string;
}

export interface CheckoutFormData {
  fullName: string;
  phone: string;
  height: string;
  weight: string;
  city: string;
  notes: string;
  color: string;
  bundleOffer: string;
  bundleItem2: BundleItemValue;
  bundleItem3: BundleItemValue;
}

export interface BundleSummaryItem {
  productName: string;
  price: number;
  color: string;
  size: string;
  isFree: boolean;
}

export interface OrderDetails {
  orderId: string;
  product: Product;
  fullName: string;
  phone: string;
  height: string;
  weight: string;
  city: string;
  notes: string;
  color?: string;
  bundleOffer: string;
  bundleItems?: BundleSummaryItem[];
  totalPrice: number;
}

export type ViewState = 
  | { type: 'home' } 
  | { type: 'thank-you'; orderDetails: OrderDetails };
