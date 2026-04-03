import type { Database, OrderStatus, GalleryItemType } from './database.types';

export type { OrderStatus, GalleryItemType };

// Row type helpers
type Tables = Database['public']['Tables'];
export type CategoryRow = Tables['categories']['Row'];
export type BrandRow = Tables['brands']['Row'];
export type ProductRow = Tables['products']['Row'];
export type ServiceRow = Tables['services']['Row'];
export type GalleryItemRow = Tables['gallery_items']['Row'];
export type TestimonialRow = Tables['testimonials']['Row'];
export type CustomerRow = Tables['customers']['Row'];
export type OrderRow = Tables['orders']['Row'];
export type OrderItemRow = Tables['order_items']['Row'];
export type SiteSettingRow = Tables['site_settings']['Row'];

// Domain types with joins
export interface Product extends ProductRow {
  brand?: BrandRow;
  category?: CategoryRow;
}

export interface Order extends OrderRow {
  items?: OrderItemRow[];
  customer?: CustomerRow;
}

// Cart types
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  imageUrl: string | null;
  brandName: string;
  quantity: number;
  slug: string;
}

export interface CartState {
  items: CartItem[];
}

// Checkout form
export interface CheckoutFormData {
  name: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  notes: string;
}

// Product filters
export interface ProductFilters {
  categorySlug?: string;
  brandSlug?: string;
  search?: string;
}

// Indian states for checkout dropdown
export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Puducherry', 'Chandigarh',
  'Andaman & Nicobar Islands', 'Dadra & Nagar Haveli and Daman & Diu', 'Lakshadweep',
] as const;
