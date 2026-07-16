/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Star, ShieldAlert, BadgeCheck, Box, Truck, Sparkles } from "lucide-react";
import { Product } from "../types";
import { PRODUCT_IMAGE } from "../data";

interface ProductHeroProps {
  product: Product;
  onAddToCart: (quantity: number, selectedCase: "standard" | "tactical_briefcase" | "discreet") => void;
}

export default function ProductHero({ product, onAddToCart }: ProductHeroProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedCase, setSelectedCase] = useState<"standard" | "tactical_briefcase" | "discreet">("standard");

  const casePrices = {
    standard: 0,
    tactical_briefcase: 24.99,
    discreet: 39.99,
  };

  const caseDetails = {
    standard: "Standard Cardboard Cargo Container (Fully Recyclable)",
    tactical_briefcase: "Sleek Waterproof Tactical Carbon-Fiber Box with Laser-Cut Foam",
    discreet: "Ultra-Discreet Aluminum Executive Briefcase with Dual Combination Locks",
  };

  const currentPrice = product.price + casePrices[selectedCase];
  const formattedOriginalPrice = product.originalPrice
    ? (product.originalPrice + casePrices[selectedCase]).toFixed(2)
    : null;

  const handleAdd = () => {
    onAddToCart(quantity, selectedCase);
  };

  return (
    <section className="py-12 lg:py-16">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
        {/* Left Side: Product Image & Technical Overlay */}
        <div className="lg:col-span-6 space-y-6">
          <div className="relative overflow-hidden rounded-2xl border border-neutral-900 bg-neutral-950 shadow-2xl group">
            {/* Grid background pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)] bg-[size:24px_24px] opacity-30 pointer-events-none"></div>
 
            {/* Tactical Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
              <span className="inline-flex items-center rounded-md bg-indigo-600/90 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-indigo-600/20 backdrop-blur-sm">
                5m² Certified Scale
              </span>
              <span className="inline-flex items-center rounded-md bg-neutral-950/80 border border-neutral-800 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-widest text-neutral-300 backdrop-blur-sm">
                Active Zone Denial
              </span>
            </div>
 
            <div className="absolute top-4 right-4 z-10">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-950/80 border border-neutral-800 text-amber-500 backdrop-blur-sm shadow-md">
                <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
              </div>
            </div>
 
            {/* Generated Image */}
            <img
              src={PRODUCT_IMAGE}
              alt={product.name}
              className="h-full w-full object-cover aspect-4/3 md:aspect-16/10 lg:aspect-4/3 transition-transform duration-500 group-hover:scale-102"
              referrerPolicy="no-referrer"
            />
 
            {/* Bottom Tech Specifications Overlay */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent p-6 pt-16">
              <div className="grid grid-cols-3 gap-4 border-t border-neutral-800/60 pt-4 font-mono text-xs">
                <div>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Deploy Load</p>
                  <p className="font-semibold text-neutral-200">500 Friction Spheres</p>
                </div>
                <div>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Entanglement</p>
                  <p className="font-semibold text-neutral-200">1x Pre-Sprayed Bundle</p>
                </div>
                <div>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Classification</p>
                  <p className="font-semibold text-indigo-400">Class III Novelty</p>
                </div>
              </div>
            </div>
          </div>
 
          {/* Warning Banner */}
          <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4 flex items-start space-x-3">
            <ShieldAlert className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
            <div className="text-xs text-neutral-400">
              <span className="font-semibold text-indigo-300 font-mono">OPERATIONAL WARNING:</span> Highly slippery upon deployment. Ensure the target zone is demarcated prior to initiating dispersion. Clean-up strictly requires vacuum extraction before applying liquid cleaners.
            </div>
          </div>
        </div>
 
        {/* Right Side: Product Details & Purchase Form */}
        <div className="lg:col-span-6 space-y-8">
          <div>
            <div className="flex items-center space-x-2 font-mono text-xs tracking-wider text-neutral-500">
              <span>{product.codename}</span>
              <span>•</span>
              <span className="text-indigo-400">AVAILABLE DIRECT</span>
            </div>
            <h1 className="mt-2 font-serif text-3xl font-normal tracking-tight text-white sm:text-4xl italic">
              {product.name}
            </h1>
            <p className="mt-3 text-lg font-medium text-indigo-300 font-serif italic">
              {product.tagline}
            </p>
 
            {/* Rating */}
            <div className="mt-4 flex items-center space-x-3">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-amber-500 text-amber-500"
                        : "text-neutral-800"
                    }`}
                  />
                ))}
              </div>
              <span className="font-mono text-xs text-neutral-400">
                {product.rating} ({product.reviewCount} Verified Deployments)
              </span>
            </div>
          </div>
 
          <div className="border-t border-b border-neutral-900 py-6">
            {/* Price section */}
            <div className="flex items-baseline space-x-4">
              <span className="font-serif text-4xl font-normal text-white italic">
                ${currentPrice.toFixed(2)}
              </span>
              {formattedOriginalPrice && (
                <span className="font-mono text-lg text-neutral-500 line-through">
                  ${formattedOriginalPrice}
                </span>
              )}
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-400 uppercase tracking-widest border border-emerald-500/20">
                Save ${( (product.originalPrice || 129.99) - product.price ).toFixed(0)} Surplus Disc.
              </span>
            </div>
            <p className="mt-2 text-xs text-neutral-400 font-mono">
              Invoiced with secure checkout processing. Fully insured regional transit.
            </p>
          </div>
 
          {/* Custom carrying case option selectors */}
          <div className="space-y-4">
            <label className="block font-mono text-xs font-bold uppercase tracking-wider text-neutral-300">
              Deployable Transport Case Config
            </label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {/* Option 1: Standard */}
              <button
                type="button"
                onClick={() => setSelectedCase("standard")}
                className={`relative flex flex-col rounded-xl border p-4 text-left transition-all duration-200 cursor-pointer ${
                  selectedCase === "standard"
                    ? "border-indigo-500 bg-indigo-500/5 ring-1 ring-indigo-500"
                    : "border-neutral-800 bg-neutral-900/50 hover:bg-neutral-900 hover:border-neutral-700"
                }`}
              >
                <span className="font-serif text-sm font-bold text-white">Standard</span>
                <span className="mt-1 font-mono text-xs text-neutral-400">Cardboard Carton</span>
                <span className="mt-3 font-mono text-xs font-semibold text-neutral-200">Included</span>
              </button>
 
              {/* Option 2: Tactical Carbon Box */}
              <button
                type="button"
                onClick={() => setSelectedCase("tactical_briefcase")}
                className={`relative flex flex-col rounded-xl border p-4 text-left transition-all duration-200 cursor-pointer ${
                  selectedCase === "tactical_briefcase"
                    ? "border-indigo-500 bg-indigo-500/5 ring-1 ring-indigo-500"
                    : "border-neutral-800 bg-neutral-900/50 hover:bg-neutral-900 hover:border-neutral-700"
                }`}
              >
                <span className="font-serif text-sm font-bold text-white">Tactical</span>
                <span className="mt-1 font-mono text-xs text-neutral-400">Carbon-Fiber Box</span>
                <span className="mt-3 font-mono text-xs font-semibold text-slate-200">+$24.99</span>
              </button>
 
              {/* Option 3: Executive Aluminum Briefcase */}
              <button
                type="button"
                onClick={() => setSelectedCase("discreet")}
                className={`relative flex flex-col rounded-xl border p-4 text-left transition-all duration-200 cursor-pointer ${
                  selectedCase === "discreet"
                    ? "border-indigo-500 bg-indigo-500/5 ring-1 ring-indigo-500"
                    : "border-neutral-800 bg-neutral-900/50 hover:bg-neutral-900 hover:border-neutral-700"
                }`}
              >
                <span className="font-serif text-sm font-bold text-white">Discreet</span>
                <span className="mt-1 font-mono text-xs text-neutral-400">Aluminum Briefcase</span>
                <span className="mt-3 font-mono text-xs font-semibold text-slate-200">+$39.99</span>
              </button>
            </div>
            <p className="font-mono text-[11px] text-neutral-500 leading-relaxed">
              Selected container: <span className="text-neutral-300 font-medium">{caseDetails[selectedCase]}</span>
            </p>
          </div>          {/* Quantity and Checkout Trigger */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center space-x-3">
              <label className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-300">
                Qty
              </label>
              <div className="flex items-center px-4 py-2 rounded-lg border border-neutral-800 bg-neutral-900 font-mono text-xs text-neutral-400">
                <span className="text-white font-bold mr-1.5">1</span> (Strict Purchase Limit)
              </div>
            </div>

            <button
              onClick={handleAdd}
              className="flex-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-6 py-4 text-center font-serif text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 cursor-pointer"
              id="add-to-cart-hero-btn"
            >
              Add APEX-5 System to Tactical Cart
            </button>
          </div>
 
          {/* Trust badges */}
          <div className="grid grid-cols-1 gap-4 rounded-xl border border-neutral-800 bg-neutral-900/30 p-4 sm:grid-cols-3 font-mono text-[11px] text-neutral-400">
            <div className="flex items-center space-x-2">
              <BadgeCheck className="h-4 w-4 text-indigo-400 shrink-0" />
              <span>Full 5.0m² Compliance</span>
            </div>
            <div className="flex items-center space-x-2">
              <Truck className="h-4 w-4 text-indigo-400 shrink-0" />
              <span>Same-Day Dispatch</span>
            </div>
            <div className="flex items-center space-x-2">
              <Box className="h-4 w-4 text-indigo-400 shrink-0" />
              <span>Secure Heavy Packing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
