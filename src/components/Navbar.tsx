/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Shield, ShoppingCart, Terminal } from "lucide-react";

interface NavbarProps {
  cartItemCount: number;
  onOpenCart: () => void;
  onScrollToReviews: () => void;
  onScrollToSpecs: () => void;
}

export default function Navbar({
  cartItemCount,
  onOpenCart,
  onScrollToReviews,
  onScrollToSpecs,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-900 bg-neutral-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo and Tactical Name */}
        <div className="flex items-center space-x-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-400">
            <Shield className="h-5 w-5" />
            <div className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-indigo-500 pulse-indigo"></div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-display text-lg font-bold tracking-wider text-white">APEX</span>
              <span className="rounded bg-indigo-500/15 px-1.5 py-0.5 font-mono text-[10px] font-medium tracking-widest text-indigo-400">TACTICAL</span>
            </div>
            <p className="font-mono text-[9px] tracking-wider text-neutral-400">PERIMETER SYSTEMS GROUP</p>
          </div>
        </div>

        {/* Live System Status Indicator (Serious / Military / Security style) */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center space-x-2 rounded-full border border-neutral-800 bg-neutral-900/50 px-3 py-1 font-mono text-xs text-neutral-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 pulse-indigo"></span>
            <span className="text-[10px] text-neutral-400">GATEWAY SECURE</span>
          </div>
          <div className="flex items-center space-x-2 rounded-full border border-neutral-800 bg-neutral-900/50 px-3 py-1 font-mono text-xs text-neutral-300">
            <Terminal className="h-3 w-3 text-indigo-400" />
            <span className="text-[10px] text-neutral-400">INVENTORY: <span className="text-white font-medium">ALLOCATED</span></span>
          </div>
        </div>

        {/* Navigation & Cart Actions */}
        <div className="flex items-center space-x-4">
          <nav className="hidden sm:flex items-center space-x-6 text-sm font-medium text-neutral-400">
            <button
              onClick={onScrollToSpecs}
              className="hover:text-white transition-colors duration-150 cursor-pointer"
            >
              Specifications
            </button>
            <button
              onClick={onScrollToReviews}
              className="hover:text-white transition-colors duration-150 cursor-pointer"
            >
              Deployments & Reviews
            </button>
          </nav>

          <span className="hidden sm:inline-block h-4 w-px bg-neutral-800"></span>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="group relative flex h-10 items-center space-x-2 rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2 hover:bg-neutral-800 hover:border-neutral-700 transition-all duration-200"
            id="nav-cart-btn"
          >
            <ShoppingCart className="h-4 w-4 text-neutral-300 group-hover:text-white transition-colors" />
            <span className="font-mono text-xs font-semibold text-neutral-200 group-hover:text-white">Cart</span>
            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 font-mono text-[10px] font-bold text-white shadow-lg shadow-indigo-600/20">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
