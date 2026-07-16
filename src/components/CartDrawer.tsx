/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { CartItem, Product } from "../types";
import { Trash2, Plus, Minus, Shield, ArrowRight, Sparkles, X } from "lucide-react";
import { UPSELLS } from "../data";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onAddUpsell: (product: Product) => void;
  onProceedToCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onAddUpsell,
  onProceedToCheckout,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const casePrices = {
    standard: 0,
    tactical_briefcase: 24.99,
    discreet: 39.99,
  };

  const caseLabels = {
    standard: "Standard Carton",
    tactical_briefcase: "Carbon-Fiber Case",
    discreet: "Aluminum Case",
  };

  const getItemPrice = (item: CartItem) => {
    const basePrice = item.product.price;
    const casePrice = item.product.id === "apex-5" ? casePrices[item.selectedCase] : 0;
    return (basePrice + casePrice) * item.quantity;
  };

  const subtotal = cart.reduce((acc, item) => acc + getItemPrice(item), 0);
  const shippingCost = subtotal > 0 ? 15.0 : 0; // standard shipping
  const total = subtotal + shippingCost;

  // Check which upsells are NOT in the cart
  const availableUpsells = UPSELLS.filter(
    (up) => !cart.some((item) => item.product.id === up.id)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="cart-drawer-overlay">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md border-l border-neutral-900 bg-neutral-950 text-white shadow-2xl flex flex-col h-full">
          {/* Header */}
          <div className="px-6 py-5 border-b border-neutral-900 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-indigo-400" />
              <div>
                <h2 className="font-serif text-base font-normal tracking-wider text-neutral-100 uppercase italic">
                  Cargo Inventory Allocation
                </h2>
                <p className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">
                  Secure logistics queue
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white transition-colors cursor-pointer p-1 rounded hover:bg-neutral-900"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Contents */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
            {cart.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-center space-y-4">
                <div className="h-12 w-12 rounded-full border border-neutral-900 bg-neutral-900/50 flex items-center justify-center text-neutral-500">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-serif text-sm font-normal text-neutral-300 italic">Queue is Empty</p>
                  <p className="mt-1 font-mono text-[11px] text-neutral-500 max-w-[240px]">
                    No tactical deployment units are currently allocated to your courier profile.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => {
                  const singlePrice =
                    item.product.price +
                    (item.product.id === "apex-5" ? casePrices[item.selectedCase] : 0);
                  return (
                    <div
                      key={item.product.id}
                      className="rounded-xl border border-neutral-900 bg-neutral-900/40 p-4 flex gap-4 hover:border-neutral-800 transition-colors"
                    >
                      {/* Item Details */}
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <h3 className="font-serif text-sm font-normal text-white truncate italic">
                              {item.product.name}
                            </h3>
                            {item.product.id === "apex-5" && (
                              <p className="font-mono text-[10px] text-indigo-400 mt-0.5">
                                Chassis: {caseLabels[item.selectedCase]}
                              </p>
                            )}
                          </div>
                          <span className="font-mono text-sm font-bold text-white shrink-0">
                            ${getItemPrice(item).toFixed(2)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          {/* Quantity Selector */}
                          {item.product.id === "apex-5" ? (
                            <div className="font-mono text-[10px] text-neutral-400 px-2.5 py-1.5 rounded border border-neutral-900 bg-neutral-950/80">
                              Qty: <span className="text-white font-bold">1</span> (Purchase Limit)
                            </div>
                          ) : (
                            <div className="flex items-center rounded-lg border border-neutral-900 bg-neutral-950">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                className="px-2 py-1 text-neutral-400 hover:text-white cursor-pointer"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="px-2 font-mono text-xs text-white font-bold w-6 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                className="px-2 py-1 text-neutral-400 hover:text-white cursor-pointer"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          )}

                          {/* Delete */}
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-neutral-500 hover:text-indigo-400 cursor-pointer p-1.5 rounded hover:bg-neutral-900 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Upsells Segment */}
            {cart.length > 0 && availableUpsells.length > 0 && (
              <div className="border-t border-neutral-900 pt-6 space-y-4">
                <div className="flex items-center space-x-2 font-mono text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>RECOMMENDED EXTRA WEAPONRY</span>
                </div>
                <div className="space-y-3">
                  {availableUpsells.map((up) => (
                    <div
                      key={up.id}
                      className="rounded-xl border border-dashed border-neutral-900 bg-neutral-950 p-4 flex items-center justify-between gap-4"
                    >
                      <div className="min-w-0">
                        <p className="font-serif text-xs font-normal text-white truncate italic">
                          {up.name}
                        </p>
                        <p className="font-mono text-[10px] text-neutral-500 mt-0.5">
                          ${up.price.toFixed(2)} — Add supplementary ammunition
                        </p>
                      </div>
                      <button
                        onClick={() => onAddUpsell(up)}
                        className="rounded bg-neutral-900 border border-neutral-850 hover:border-neutral-700 text-neutral-200 hover:text-white px-3 py-1.5 font-mono text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0"
                      >
                        + Add Refill
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Checkout pricing sum and trigger */}
          {cart.length > 0 && (
            <div className="border-t border-neutral-900 bg-neutral-950 px-6 py-6 space-y-4 shadow-[0_-8px_24px_rgba(0,0,0,0.4)]">
              <div className="space-y-2 font-mono text-xs text-neutral-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tactical Secure Courier Dispatch</span>
                  <span className="text-white font-semibold">${shippingCost.toFixed(2)}</span>
                </div>
                <div className="border-t border-neutral-900/80 pt-2 flex justify-between font-serif text-base font-normal text-white italic">
                  <span>ESTIMATED TOTAL DUE</span>
                  <span className="text-indigo-400 font-bold">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="w-full flex items-center justify-center space-x-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 py-4 font-serif text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 transition-all cursor-pointer italic"
                id="drawer-checkout-btn"
              >
                <span>Proceed to Checkout Terminal</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <p className="text-center font-mono text-[9px] text-neutral-500 uppercase tracking-wider">
                🔒 Secured by APEX end-to-end 256-bit cryptography ledger
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
