/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { CartItem, ShippingDetails, PaymentDetails, OrderConfirmation } from "../types";
import { X, Shield, Lock, CreditCard, ChevronRight, CheckCircle2, Truck, Terminal, Download } from "lucide-react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onClearCart: () => void;
}

type CheckoutStep = "shipping" | "payment" | "processing" | "receipt";

export default function CheckoutModal({ isOpen, onClose, cart, onClearCart }: CheckoutModalProps) {
  if (!isOpen) return null;

  const [step, setStep] = useState<CheckoutStep>("shipping");

  // Shipping form state
  const [shipping, setShipping] = useState<ShippingDetails>({
    email: "",
    fullName: "",
    organization: "",
    address: "",
    apartment: "",
    city: "",
    postalCode: "",
    country: "United States",
    shippingMethod: "standard",
  });

  // Payment form state
  const [payment, setPayment] = useState<PaymentDetails>({
    cardHolder: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  // Live terminal logs during transaction processing
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [logProgress, setLogProgress] = useState(0);

  // Final confirmation receipt
  const [confirmation, setConfirmation] = useState<OrderConfirmation | null>(null);

  // Form error tracking
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const casePrices = {
    standard: 0,
    tactical_briefcase: 24.99,
    discreet: 39.99,
  };

  const shippingPrices = {
    standard: 15.0,
    priority_tactical: 35.0,
    classified_drop: 75.0,
  };

  const getSubtotal = () => {
    return cart.reduce((acc, item) => {
      const casePrice = item.product.id === "apex-5" ? casePrices[item.selectedCase] : 0;
      return acc + (item.product.price + casePrice) * item.quantity;
    }, 0);
  };

  const getShippingCost = () => {
    return shippingPrices[shipping.shippingMethod];
  };

  const getTotal = () => {
    return getSubtotal() + getShippingCost();
  };

  // Custom Form Validation for Shipping
  const validateShipping = () => {
    const newErrors: { [key: string]: string } = {};
    if (!shipping.email.includes("@")) newErrors.email = "Valid operational email required.";
    if (!shipping.fullName.trim()) newErrors.fullName = "Consignee full name is required.";
    if (!shipping.address.trim()) newErrors.address = "Deployment street address required.";
    if (!shipping.city.trim()) newErrors.city = "City / Quadrant required.";
    if (!shipping.postalCode.trim()) newErrors.postalCode = "Postal indexing code required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Custom Form Validation for Payment
  const validatePayment = () => {
    const newErrors: { [key: string]: string } = {};
    const cleanCard = payment.cardNumber.replace(/\s+/g, "");
    if (cleanCard.length < 15 || cleanCard.length > 16) newErrors.cardNumber = "Valid credit ledger number required (15-16 digits).";
    if (!payment.cardHolder.trim()) newErrors.cardHolder = "Cardholder legal name required.";
    if (!payment.expiryDate.includes("/")) newErrors.expiryDate = "Valid expiration code (MM/YY) required.";
    if (payment.cvv.length < 3 || payment.cvv.length > 4) newErrors.cvv = "CVV validation key required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Transition from Step 1 to Step 2
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateShipping()) {
      setStep("payment");
      setErrors({});
    }
  };

  // Trigger processing terminal simulation (Step 2 to Step 3)
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePayment()) {
      setStep("processing");
      setErrors({});
      startConsoleProcessing();
    }
  };

  // Simulating military security/financial transaction ledger outputs
  const startConsoleProcessing = () => {
    const processLogs = [
      "SECURE: Handshake protocol established with central commercial node...",
      "LEDGER: Authorizing credit reserve allocations (Visa/MC SecureGateway)...",
      "INTEGRITY: Performing 256-bit hash validation on consignee details...",
      "WAREHOUSE: Scanning inventory slot 'APEX-GRID-5'... Allocated.",
      "COMPLIANCE: Certifying beads to 5.0m² operational density standard...",
      "LOGISTICS: Generating unique APX dead-drop routing ledger...",
      "LEDGER: Transaction authorized. Settling vault clearing codes...",
      "SYSTEM: Dispatch sequence successfully armed!"
    ];

    setConsoleLogs([]);
    setLogProgress(0);

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < processLogs.length) {
        setConsoleLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${processLogs[currentLogIndex]}`]);
        setLogProgress((prev) => prev + 12.5);
        currentLogIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          // Generate final receipt
          const orderId = `APX-${Math.floor(100000 + Math.random() * 900000)}-SL`;
          const dateStr = new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          setConfirmation({
            orderId,
            date: dateStr,
            shipping,
            items: [...cart],
            subtotal: getSubtotal(),
            shippingCost: getShippingCost(),
            total: getTotal(),
          });
          setStep("receipt");
          onClearCart();
        }, 1000);
      }
    }, 600);
  };

  // Utility to handle credit card spacing
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    const matches = value.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      setPayment({ ...payment, cardNumber: parts.join(" ") });
    } else {
      setPayment({ ...payment, cardNumber: value });
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 2) {
      setPayment({ ...payment, expiryDate: `${value.slice(0, 2)}/${value.slice(2, 4)}` });
    } else {
      setPayment({ ...payment, expiryDate: value });
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-6" id="checkout-gateway-modal">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-neutral-950/90 backdrop-blur-md transition-opacity"></div>

      <div className="relative w-full max-w-4xl rounded-2xl border border-neutral-900 bg-neutral-950 text-white shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Left column: Order summary and serious logos (Hidden on processing/receipt steps for clean view) */}
        {step !== "processing" && step !== "receipt" && (
          <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-neutral-900 bg-neutral-900/20 p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-indigo-400" />
                <span className="font-serif text-sm font-normal tracking-wider uppercase italic">Escrow Checkout</span>
              </div>

              {/* Items Summary list */}
              <div className="space-y-4">
                <p className="font-mono text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                  Allocated Payload Items
                </p>
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-xs">
                      <div>
                        <p className="font-serif text-xs font-normal text-neutral-200 italic">{item.product.name}</p>
                        <p className="font-mono text-[10px] text-neutral-500">
                          Qty: {item.quantity} {item.product.id === "apex-5" ? `(${item.selectedCase === "tactical_briefcase" ? "Carbon Case" : item.selectedCase === "discreet" ? "Aluminum Case" : "Carton"})` : ""}
                        </p>
                      </div>
                      <span className="font-mono text-neutral-300 ml-2">
                        ${((item.product.price + (item.product.id === "apex-5" ? casePrices[item.selectedCase] : 0)) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sum breakdown */}
            <div className="border-t border-neutral-900 pt-6 mt-6 space-y-2.5 font-mono text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Cargo Subtotal</span>
                <span>${getSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Courier Transport</span>
                <span>${getShippingCost().toFixed(2)}</span>
              </div>
              <div className="border-t border-neutral-900/80 pt-2 flex justify-between text-sm font-bold text-white">
                <span>TOTAL COST</span>
                <span className="text-indigo-400">${getTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Right column: Interactive Form steps */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
          {/* Header toolbar */}
          {step !== "processing" && step !== "receipt" && (
            <div className="flex justify-between items-center border-b border-neutral-900 pb-4 mb-6">
              <div className="flex items-center space-x-3 font-mono text-xs">
                <span className={`px-2 py-0.5 rounded ${step === "shipping" ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20" : "text-neutral-500"}`}>
                  1. Logistics
                </span>
                <ChevronRight className="h-3 w-3 text-neutral-700" />
                <span className={`px-2 py-0.5 rounded ${step === "payment" ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20" : "text-neutral-500"}`}>
                  2. Settlement
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-neutral-500 hover:text-white p-1 rounded hover:bg-neutral-900 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}

          {/* Form Content switcher */}
          <div className="flex-1">
            {/* STEP 1: SHIPPING LOGISTICS */}
            {step === "shipping" && (
              <form onSubmit={handleShippingSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-normal text-white italic">Operational Consignment Details</h3>
                  <p className="text-xs text-neutral-500 font-mono">Specify destination ledger coordinates for rapid deployment.</p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2">
                  <div className="space-y-1.5 col-span-1 sm:col-span-2">
                    <label className="font-mono text-[10px] uppercase text-neutral-400 tracking-wider">Operational Email Address</label>
                    <input
                      required
                      type="email"
                      value={shipping.email}
                      onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                      placeholder="operator@security-agency.org"
                      className="w-full rounded-lg border border-neutral-900 bg-neutral-900/50 px-4 py-2.5 text-xs text-white focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 transition-colors"
                    />
                    {errors.email && <p className="text-[10px] text-indigo-400 font-mono">{errors.email}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] uppercase text-neutral-400 tracking-wider">Consignee Full Name</label>
                    <input
                      required
                      type="text"
                      value={shipping.fullName}
                      onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })}
                      placeholder="Commander Alex Mercer"
                      className="w-full rounded-lg border border-neutral-900 bg-neutral-900/50 px-4 py-2.5 text-xs text-white focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 transition-colors"
                    />
                    {errors.fullName && <p className="text-[10px] text-indigo-400 font-mono">{errors.fullName}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] uppercase text-neutral-400 tracking-wider">Affiliation / Organization</label>
                    <input
                      type="text"
                      value={shipping.organization}
                      onChange={(e) => setShipping({ ...shipping, organization: e.target.value })}
                      placeholder="Prank Defense Division (Optional)"
                      className="w-full rounded-lg border border-neutral-900 bg-neutral-900/50 px-4 py-2.5 text-xs text-white focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5 col-span-1 sm:col-span-2">
                    <label className="font-mono text-[10px] uppercase text-neutral-400 tracking-wider">Deployment Street Address</label>
                    <input
                      required
                      type="text"
                      value={shipping.address}
                      onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                      placeholder="101 Sector Bravo Corridor"
                      className="w-full rounded-lg border border-neutral-900 bg-neutral-900/50 px-4 py-2.5 text-xs text-white focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 transition-colors"
                    />
                    {errors.address && <p className="text-[10px] text-indigo-400 font-mono">{errors.address}</p>}
                  </div>

                  <div className="space-y-1.5 col-span-1 sm:col-span-2">
                    <label className="font-mono text-[10px] uppercase text-neutral-400 tracking-wider">Suite / Apartment / Grid Coordinate</label>
                    <input
                      type="text"
                      value={shipping.apartment}
                      onChange={(e) => setShipping({ ...shipping, apartment: e.target.value })}
                      placeholder="Office 301, 3rd Floor East Threshold"
                      className="w-full rounded-lg border border-neutral-900 bg-neutral-900/50 px-4 py-2.5 text-xs text-white focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] uppercase text-neutral-400 tracking-wider">City / Quadrant</label>
                    <input
                      required
                      type="text"
                      value={shipping.city}
                      onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                      placeholder="New York"
                      className="w-full rounded-lg border border-neutral-900 bg-neutral-900/50 px-4 py-2.5 text-xs text-white focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 transition-colors"
                    />
                    {errors.city && <p className="text-[10px] text-indigo-400 font-mono">{errors.city}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] uppercase text-neutral-400 tracking-wider">Postal Index Code (Zip)</label>
                    <input
                      required
                      type="text"
                      value={shipping.postalCode}
                      onChange={(e) => setShipping({ ...shipping, postalCode: e.target.value })}
                      placeholder="10001"
                      className="w-full rounded-lg border border-neutral-900 bg-neutral-900/50 px-4 py-2.5 text-xs text-white focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 transition-colors"
                    />
                    {errors.postalCode && <p className="text-[10px] text-indigo-400 font-mono">{errors.postalCode}</p>}
                  </div>
                </div>

                {/* Shipping Method Selectors */}
                <div className="pt-2 space-y-2.5">
                  <label className="font-mono text-[10px] uppercase text-neutral-400 tracking-wider block">Security Routing Dispatch Agent</label>
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                    
                    <button
                      type="button"
                      onClick={() => setShipping({ ...shipping, shippingMethod: "standard" })}
                      className={`rounded-lg border p-3 text-left transition-all cursor-pointer flex flex-col justify-between h-20 ${
                        shipping.shippingMethod === "standard"
                          ? "border-indigo-600 bg-indigo-500/5"
                          : "border-neutral-900 bg-neutral-900/30 hover:bg-neutral-900/50"
                      }`}
                    >
                      <span className="font-serif text-xs font-normal block text-white italic">Priority Freight</span>
                      <span className="font-mono text-[9px] text-neutral-400 block mt-1">Ground Courier Box</span>
                      <span className="font-mono text-[10px] text-indigo-400 font-semibold block mt-auto">$15.00</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShipping({ ...shipping, shippingMethod: "priority_tactical" })}
                      className={`rounded-lg border p-3 text-left transition-all cursor-pointer flex flex-col justify-between h-20 ${
                        shipping.shippingMethod === "priority_tactical"
                          ? "border-indigo-600 bg-indigo-500/5"
                          : "border-neutral-900 bg-neutral-900/30 hover:bg-neutral-900/50"
                      }`}
                    >
                      <span className="font-serif text-xs font-normal block text-white italic">Drone-Drop Air</span>
                      <span className="font-mono text-[9px] text-neutral-400 block mt-1">Under-radar drone delivery</span>
                      <span className="font-mono text-[10px] text-indigo-400 font-semibold block mt-auto">$35.00</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShipping({ ...shipping, shippingMethod: "classified_drop" })}
                      className={`rounded-lg border p-3 text-left transition-all cursor-pointer flex flex-col justify-between h-20 ${
                        shipping.shippingMethod === "classified_drop"
                          ? "border-indigo-600 bg-indigo-500/5"
                          : "border-neutral-900 bg-neutral-900/30 hover:bg-neutral-900/50"
                      }`}
                    >
                      <span className="font-serif text-xs font-normal block text-white italic">Dead-Drop Undercover</span>
                      <span className="font-mono text-[9px] text-neutral-400 block mt-1">Discreet agent drop inside grid</span>
                      <span className="font-mono text-[10px] text-indigo-400 font-semibold block mt-auto">$75.00</span>
                    </button>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 py-3.5 font-serif text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 transition-all cursor-pointer italic"
                  >
                    Proceed to Escrow Settlement
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: FINANCIAL SETTLEMENT */}
            {step === "payment" && (
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-normal text-white italic">Financial Settlement Protocol</h3>
                  <p className="text-xs text-neutral-500 font-mono">Input secure commercial clearing details to authorize production queue.</p>
                </div>

                {/* Visually stunning credit card mockup */}
                <div className="relative h-44 w-full rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border border-neutral-850 p-5 flex flex-col justify-between shadow-2xl overflow-hidden max-w-sm mx-auto">
                  {/* Background grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:20px_20px] opacity-10 pointer-events-none"></div>

                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-mono text-[9px] font-bold text-indigo-400 tracking-widest uppercase">APEX SECURE VIP</span>
                      <p className="font-mono text-[8px] text-neutral-500">TITANIUM ESCROW LEDGER</p>
                    </div>
                    <Lock className="h-5 w-5 text-indigo-400" />
                  </div>

                  <div className="font-mono text-base tracking-widest text-neutral-100 font-bold">
                    {payment.cardNumber || "•••• •••• •••• ••••"}
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <p className="font-mono text-[7px] text-neutral-600 uppercase">Cardholder</p>
                      <p className="font-mono text-[10px] text-neutral-300 uppercase truncate max-w-[200px]">
                        {payment.cardHolder || "COMMANDER MERCER"}
                      </p>
                    </div>
                    <div className="flex space-x-4">
                      <div>
                        <p className="font-mono text-[7px] text-neutral-600 uppercase">Expires</p>
                        <p className="font-mono text-[10px] text-neutral-300">{payment.expiryDate || "MM/YY"}</p>
                      </div>
                      <div>
                        <p className="font-mono text-[7px] text-neutral-600 uppercase">CVV</p>
                        <p className="font-mono text-[10px] text-neutral-300">{"•".repeat(payment.cvv.length) || "•••"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form fields */}
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                  <div className="col-span-2 space-y-1.5">
                    <label className="font-mono text-[10px] uppercase text-neutral-400 tracking-wider">Secure Cardholder Legal Name</label>
                    <input
                      required
                      type="text"
                      value={payment.cardHolder}
                      onChange={(e) => setPayment({ ...payment, cardHolder: e.target.value })}
                      placeholder="Alex Mercer"
                      className="w-full rounded-lg border border-neutral-900 bg-neutral-900/50 px-4 py-2.5 text-xs text-white focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 transition-colors"
                    />
                    {errors.cardHolder && <p className="text-[10px] text-indigo-400 font-mono">{errors.cardHolder}</p>}
                  </div>

                  <div className="col-span-2 space-y-1.5">
                    <label className="font-mono text-[10px] uppercase text-neutral-400 tracking-wider">Credit Card Number</label>
                    <input
                      required
                      type="text"
                      value={payment.cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="4000 1234 5678 9010"
                      className="w-full rounded-lg border border-neutral-900 bg-neutral-900/50 px-4 py-2.5 text-xs text-white focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 transition-colors"
                    />
                    {errors.cardNumber && <p className="text-[10px] text-indigo-400 font-mono">{errors.cardNumber}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] uppercase text-neutral-400 tracking-wider">Expiration (MM/YY)</label>
                    <input
                      required
                      type="text"
                      value={payment.expiryDate}
                      onChange={handleExpiryChange}
                      placeholder="12/28"
                      className="w-full rounded-lg border border-neutral-900 bg-neutral-900/50 px-4 py-2.5 text-xs text-white focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 transition-colors"
                    />
                    {errors.expiryDate && <p className="text-[10px] text-indigo-400 font-mono">{errors.expiryDate}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] uppercase text-neutral-400 tracking-wider">Security Key (CVV)</label>
                    <input
                      required
                      type="password"
                      value={payment.cvv}
                      onChange={(e) => setPayment({ ...payment, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                      placeholder="•••"
                      className="w-full rounded-lg border border-neutral-900 bg-neutral-900/50 px-4 py-2.5 text-xs text-white focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 transition-colors"
                    />
                    {errors.cvv && <p className="text-[10px] text-indigo-400 font-mono">{errors.cvv}</p>}
                  </div>
                </div>

                <div className="pt-4 flex gap-3 max-w-md mx-auto">
                  <button
                    type="button"
                    onClick={() => setStep("shipping")}
                    className="w-1/3 rounded-xl border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/40 py-3 font-serif text-xs font-bold uppercase tracking-wider text-neutral-300 transition-all cursor-pointer text-center italic"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 py-3.5 font-serif text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 transition-all cursor-pointer italic"
                  >
                    Authorize Escrow Settlement
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: LOGS & PROCESSING TERMINAL */}
            {step === "processing" && (
              <div className="space-y-6 py-6 max-w-xl mx-auto flex flex-col items-center">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 mb-2">
                  <Terminal className="h-7 w-7" />
                  <div className="absolute inset-0 rounded-full border border-indigo-500/40 animate-ping opacity-20"></div>
                </div>

                <div className="text-center space-y-1.5">
                  <h3 className="font-serif text-lg font-normal text-white italic">Securing Transaction Authorization Ledger</h3>
                  <p className="text-xs text-neutral-500 font-mono">Running secure cryptography handshake loop. Do not disconnect.</p>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-neutral-900 border border-neutral-800 overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 transition-all duration-300"
                    style={{ width: `${logProgress}%` }}
                  ></div>
                </div>

                {/* Running Log Screen */}
                <div className="w-full rounded-xl border border-neutral-900 bg-neutral-950 p-5 font-mono text-[10px] leading-relaxed text-neutral-300 h-56 overflow-y-auto space-y-2 shadow-inner">
                  {consoleLogs.map((log, idx) => (
                    <p key={idx} className={idx === consoleLogs.length - 1 ? "text-indigo-400 font-bold" : "text-neutral-400"}>
                      {log}
                    </p>
                  ))}
                  {consoleLogs.length < 8 && <p className="animate-pulse text-neutral-500">_ INGESTING STREAM PROTOCOL...</p>}
                </div>
              </div>
            )}

            {/* STEP 4: ORDER CONFIRMED (RECEIPT) */}
            {step === "receipt" && confirmation && (
              <div className="space-y-6 py-4 max-w-xl mx-auto">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-md">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-normal text-white italic">Perimeter Payload Dispatch Armed</h3>
                    <p className="text-xs text-neutral-500 font-mono">Operational Order {confirmation.orderId} registered in global ledger.</p>
                  </div>
                </div>

                {/* High-Fidelity Printable Receipt Design */}
                <div className="rounded-xl border border-neutral-900 bg-neutral-900/10 p-6 space-y-6 font-mono text-[11px] text-neutral-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-16 w-16 bg-neutral-900/40 rotate-45 translate-x-8 -translate-y-8 flex items-center justify-center"></div>

                  {/* Receipt Header details */}
                  <div className="grid grid-cols-2 gap-4 border-b border-neutral-800/60 pb-4">
                    <div>
                      <p className="text-[10px] text-neutral-500 uppercase">Dispatch Date</p>
                      <p className="font-semibold text-neutral-200 mt-0.5">{confirmation.date}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-neutral-500 uppercase">Courier Method</p>
                      <p className="font-semibold text-neutral-200 mt-0.5 uppercase">
                        {confirmation.shipping.shippingMethod === "standard" ? "Priority Ground" : 
                         confirmation.shipping.shippingMethod === "priority_tactical" ? "Drone Air Drop" : "Classified Dead-Drop"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-neutral-500 uppercase col-span-2">Consignee Address</p>
                      <p className="text-neutral-300 mt-0.5 leading-relaxed">
                        {confirmation.shipping.fullName}<br />
                        {confirmation.shipping.organization && `${confirmation.shipping.organization}\n`}
                        {confirmation.shipping.address}, {confirmation.shipping.apartment && `${confirmation.shipping.apartment}, `}{confirmation.shipping.city}, {confirmation.shipping.postalCode}, {confirmation.shipping.country}
                      </p>
                    </div>
                    <div className="text-right flex flex-col justify-end">
                      <p className="text-[9px] text-emerald-400 font-bold tracking-wider">VAULT CLEARANCE STATUS</p>
                      <p className="text-xs font-extrabold text-emerald-400 uppercase mt-0.5">ESCROW SECURED</p>
                    </div>
                  </div>

                  {/* Items summary */}
                  <div className="space-y-2 border-b border-neutral-800/60 pb-4">
                    <p className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest mb-2">Itemized Payload Configuration</p>
                    {confirmation.items.map((item) => (
                      <div key={item.product.id} className="flex justify-between">
                        <span>
                          {item.product.name} × {item.quantity}
                          {item.product.id === "apex-5" && (
                            <span className="text-[9px] text-indigo-400 block ml-2">
                              ↳ Case: {item.selectedCase === "tactical_briefcase" ? "Carbon-Fiber Carrier" : item.selectedCase === "discreet" ? "Executive Aluminum" : "Standard Carton"}
                            </span>
                          )}
                        </span>
                        <span>
                          ${((item.product.price + (item.product.id === "apex-5" ? casePrices[item.selectedCase] : 0)) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Financial calculation */}
                  <div className="space-y-1.5 text-right font-semibold">
                    <div className="flex justify-between text-neutral-400">
                      <span>Payload Subtotal</span>
                      <span>${confirmation.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                      <span>Secure Transit Drop</span>
                      <span>${confirmation.shippingCost.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-neutral-800 pt-2 flex justify-between font-serif text-sm font-bold text-white italic">
                      <span>TOTAL DEBITED VAULT BALANCE</span>
                      <span className="text-indigo-400">${confirmation.total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Highly convincing barcode rendering */}
                  <div className="flex flex-col items-center pt-4 border-t border-neutral-800/40">
                    <div className="flex items-end h-8 space-x-[2px] opacity-80 select-none">
                      {[1, 3, 1, 2, 4, 1, 2, 3, 1, 4, 1, 2, 1, 3, 2, 4, 1, 3, 1, 2, 4, 1, 2, 3, 1, 2, 4, 1, 3, 1, 2].map((width, idx) => (
                        <div
                          key={idx}
                          className="bg-white h-full"
                          style={{ width: `${width}px` }}
                        ></div>
                      ))}
                    </div>
                    <span className="text-[9px] text-neutral-500 font-mono mt-1.5 uppercase tracking-widest">{confirmation.orderId}</span>
                  </div>

                  {/* Fictitious Legal Disclosure / Fun Prank reveal */}
                  <div className="border-t border-neutral-800/80 pt-4 mt-2">
                    <p className="text-[8px] leading-relaxed text-neutral-500 text-center">
                      <span className="font-bold text-indigo-400">OPERATIONAL NOVELTY DISCLOSURE:</span> While this checkout gateway adheres to high-fidelity commercial industrial logistics models, the items being sold are novelty amusement toys. The "Micro-Spherical Friction-Reduction Units" are high-precision premium plastic beads, and the "Pre-Sprayed Polymeric Viscous Foam Strands" are standard prank silly string. This is a secure simulation with mock transaction ledger logic. Enjoy pranking your targets responsibly!
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      window.print();
                    }}
                    className="flex-1 rounded-xl border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/40 py-3.5 font-serif text-xs font-bold uppercase tracking-wider text-neutral-300 transition-all cursor-pointer flex items-center justify-center space-x-2 italic"
                  >
                    <Download className="h-4 w-4" />
                    <span>Print Packing Slip</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 py-3.5 font-serif text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 transition-all cursor-pointer text-center italic"
                  >
                    Complete Sequence
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
