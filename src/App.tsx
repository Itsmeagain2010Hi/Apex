/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import ProductHero from "./components/ProductHero";
import ProductSpecs from "./components/ProductSpecs";
import ReviewsSection from "./components/ReviewsSection";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import { MAIN_PRODUCT, REVIEWS } from "./data";
import { CartItem, Product } from "./types";
import { Sparkles, Terminal, ShieldAlert, BadgeCheck, CheckCircle2 } from "lucide-react";

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Toast notifier
  const triggerNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  // Add items to cart
  const handleAddToCart = (
    quantity: number,
    selectedCase: "standard" | "tactical_briefcase" | "discreet"
  ) => {
    setCart((prevCart) => {
      // Remove any existing apex-5 to ensure they can order only 1 in total
      const filtered = prevCart.filter((item) => item.product.id !== MAIN_PRODUCT.id);
      return [
        ...filtered,
        {
          product: MAIN_PRODUCT,
          quantity: 1, // STRICTLY LOCKED TO 1
          selectedCase,
        },
      ];
    });

    const caseNames = {
      standard: "Standard Carton",
      tactical_briefcase: "Tactical Carbon Case",
      discreet: "Discreet Aluminum Case",
    };

    triggerNotification(
      `Allocated 1x APEX-5 System (${caseNames[selectedCase]}) to cargo profile. (Maximum limit of 1 unit reached)`
    );
  };

  // Update item quantity
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId 
          ? { ...item, quantity: productId === MAIN_PRODUCT.id ? 1 : quantity } 
          : item
      )
    );
  };

  // Remove item
  const handleRemoveItem = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
    triggerNotification("Removed payload unit from logistics queue.");
  };

  // Add an upsell item directly from the cart drawer
  const handleAddUpsell = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prevCart,
        {
          product,
          quantity: 1,
          selectedCase: "standard", // default
        },
      ];
    });
    triggerNotification(`Allocated ${product.name} to cargo profile.`);
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-indigo-600 selection:text-white">
      {/* Structural visual scan lines on top */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-600 to-transparent opacity-65 z-50"></div>

      {/* Navigation Header */}
      <Navbar
        cartItemCount={cartItemCount}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollToSpecs={() => scrollToSection("product-specs-section")}
        onScrollToReviews={() => scrollToSection("reviews-section")}
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-16">
        {/* Banner Alert indicating surplus batches are direct-to-order */}
        <div className="rounded-xl border border-indigo-500/10 bg-gradient-to-r from-indigo-500/5 to-transparent p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-indigo-500/10 text-indigo-400 font-mono text-xs font-bold border border-indigo-500/20">
              V5
            </div>
            <div>
              <p className="font-serif text-sm font-normal text-white italic">APEX-5 Surplus Allocation Clearance</p>
              <p className="font-mono text-[10px] text-neutral-400">Direct tactical surplus batch sales are authorized. 100% legal amusement-class rating.</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 rounded-full bg-neutral-900 border border-neutral-800 px-3 py-1 font-mono text-[10px] text-neutral-300">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
            <span>SHIPPING DOMESTICALLY TODAY</span>
          </div>
        </div>

        {/* Core Product Hero Presentation */}
        <ProductHero product={MAIN_PRODUCT} onAddToCart={handleAddToCart} />

        {/* Detailed Tabs: Specifications, Components, Cleanup */}
        <ProductSpecs product={MAIN_PRODUCT} />

        {/* Declassified Operator Field Reviews */}
        <ReviewsSection reviews={REVIEWS} />
      </main>

      {/* Footer Design (Highly Serious Industrial Style) */}
      <footer className="border-t border-neutral-900 bg-neutral-950 py-12 mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 font-mono text-xs">
            {/* Column 1: Brand Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="font-serif text-base font-normal text-white italic">APEX</span>
                <span className="rounded bg-indigo-500/15 px-1.5 py-0.5 text-[9px] font-medium text-indigo-400 tracking-wider">TACTICAL</span>
              </div>
              <p className="text-[10px] leading-relaxed text-slate-500">
                A Division of Perimeter Systems Logistics Group. Specializing in high-density non-lethal spatial denial, regional amusement matrixes, and physical entanglement countermeasures.
              </p>
            </div>

            {/* Column 2: Specs Recap */}
            <div className="space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Tactical Specifications</p>
              <ul className="space-y-1.5 text-slate-500 text-[11px]">
                <li>• Baseline Area: 5.0m²</li>
                <li>• Friction Rating: μ = 0.038</li>
                <li>• Deployment Speed: &lt; 45 Seconds</li>
                <li>• Entanglement Factor: 100%</li>
              </ul>
            </div>

            {/* Column 3: Logistics */}
            <div className="space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Secure Logistics</p>
              <ul className="space-y-1.5 text-slate-500 text-[11px]">
                <li>• Priority Freight Delivery</li>
                <li>• Automated Escrow Cleared</li>
                <li>• Vacuum Extraction Safe</li>
                <li>• 36 Month Canister Shelf-Life</li>
              </ul>
            </div>

            {/* Column 4: Legals */}
            <div className="space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Directives</p>
              <ul className="space-y-1.5 text-slate-500 text-[11px]">
                <li>• Play Serious. Play Safe.</li>
                <li>• Non-Hazardous Bio-Polymer</li>
                <li>• Double Pressurized Co-Polymers</li>
                <li>• Fictitious Amusement Brand</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-neutral-900/60 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[9px] text-slate-500 uppercase tracking-widest">
            <div>
              © 2026 APEX TACTICAL PERIMETER SYSTEMS GROUP. ALL RIGHTS SECURED.
            </div>
            <div>
              AUTHORIZED DIRECT CLEARANCE: CODES APX-9482-5M2
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Drawer Panel (Right Slider) */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onAddUpsell={handleAddUpsell}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Secure Checkout Gateway Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onClearCart={handleClearCart}
      />

      {/* Flash Notifications (Tactile feedback) */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl border border-neutral-900 bg-neutral-950 p-4 shadow-2xl flex items-center space-x-3 max-w-sm animate-bounce" id="toast-notification">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <p className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider">LOGISTICS DISPATCH</p>
            <p className="text-xs text-slate-200 mt-0.5">{notification}</p>
          </div>
        </div>
      )}
    </div>
  );
}
