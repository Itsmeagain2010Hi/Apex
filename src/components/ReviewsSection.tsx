/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Review } from "../types";
import { Star, Shield, BadgeCheck } from "lucide-react";

interface ReviewsSectionProps {
  reviews: Review[];
}

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
  return (
    <section className="py-12 border-t border-neutral-900" id="reviews-section">
      <div className="text-center md:text-left space-y-2 mb-10">
        <div className="inline-flex items-center space-x-2 text-indigo-400 font-mono text-xs">
          <Shield className="h-4 w-4" />
          <span>DECLASSIFIED OPERATION LOGS</span>
        </div>
        <h2 className="font-serif text-3xl font-normal tracking-tight text-white italic">
          Field Deployment Reports & Operator Reviews
        </h2>
        <p className="text-sm text-neutral-400 max-w-2xl">
          Actual feedback logging from regional coordinators, corporate security analysts, and private containment operators who deployed the APEX-5.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="flex flex-col justify-between rounded-xl border border-neutral-900 bg-neutral-950 p-6 space-y-6 hover:border-neutral-800 transition-all duration-200"
          >
            <div className="space-y-4">
              {/* Stars & Verification Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < rev.rating ? "fill-amber-500 text-amber-500" : "text-neutral-800"
                      }`}
                    />
                  ))}
                </div>
                {rev.verified && (
                  <div className="inline-flex items-center space-x-1 font-mono text-[9px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    <BadgeCheck className="h-3 w-3 shrink-0" />
                    <span>VERIFIED DEPLOYMENT</span>
                  </div>
                )}
              </div>

              {/* Title & Body */}
              <div>
                <h4 className="font-serif text-base font-normal text-neutral-100 italic">
                  "{rev.title}"
                </h4>
                <p className="mt-2.5 font-sans text-xs leading-relaxed text-neutral-400">
                  {rev.content}
                </p>
              </div>
            </div>

            {/* Author Footer */}
            <div className="border-t border-neutral-900/60 pt-4 font-mono">
              <div className="text-xs font-bold text-neutral-200">{rev.author}</div>
              <div className="text-[10px] text-indigo-400 mt-0.5">{rev.designation}</div>
              <div className="text-[9px] text-neutral-500 mt-1 uppercase tracking-wider">
                Clearance: {rev.clearanceLevel}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
