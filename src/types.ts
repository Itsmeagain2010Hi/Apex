/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  codename: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  shortDescription: string;
  longDescription: string;
  components: {
    name: string;
    description: string;
    techSpec: string;
    count: number;
    unit: string;
    category: "friction" | "entanglement" | "chassis";
  }[];
  specifications: {
    label: string;
    value: string;
  }[];
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedCase: "standard" | "tactical_briefcase" | "discreet";
}

export interface Review {
  id: string;
  author: string;
  designation: string;
  title: string;
  rating: number;
  date: string;
  content: string;
  verified: boolean;
  clearanceLevel: string;
}

export interface ShippingDetails {
  email: string;
  fullName: string;
  organization: string;
  address: string;
  apartment: string;
  city: string;
  postalCode: string;
  country: string;
  shippingMethod: "standard" | "priority_tactical" | "classified_drop";
}

export interface PaymentDetails {
  cardHolder: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export type CheckoutStep = "cart" | "shipping" | "payment" | "processing" | "completed";

export interface OrderConfirmation {
  orderId: string;
  date: string;
  shipping: ShippingDetails;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
}
