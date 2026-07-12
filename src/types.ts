import { Product } from "./data";

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
}

export type ViewState = 
  | { type: 'home' } 
  | { type: 'thank-you'; orderDetails: OrderDetails };
