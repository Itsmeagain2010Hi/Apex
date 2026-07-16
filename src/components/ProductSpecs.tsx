/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Product } from "../types";
import { FileText, Sliders, RefreshCw, AlertTriangle, CheckCircle2 } from "lucide-react";

interface ProductSpecsProps {
  product: Product;
}

type TabType = "components" | "specs" | "cleanup";

export default function ProductSpecs({ product }: ProductSpecsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("components");

  return (
    <section className="py-8 border-t border-neutral-900" id="product-specs-section">
      <div className="flex border-b border-neutral-800 font-mono text-xs overflow-x-auto">
        <button
          onClick={() => setActiveTab("components")}
          className={`flex items-center space-x-2 border-b-2 px-6 py-3 font-semibold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
            activeTab === "components"
              ? "border-indigo-600 text-white bg-neutral-900/40"
              : "border-transparent text-neutral-400 hover:text-neutral-200"
          }`}
        >
          <Sliders className="h-4 w-4" />
          <span>Tactical Components</span>
        </button>

        <button
          onClick={() => setActiveTab("specs")}
          className={`flex items-center space-x-2 border-b-2 px-6 py-3 font-semibold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
            activeTab === "specs"
              ? "border-indigo-600 text-white bg-neutral-900/40"
              : "border-transparent text-neutral-400 hover:text-neutral-200"
          }`}
        >
          <FileText className="h-4 w-4" />
          <span>Technical specifications</span>
        </button>

        <button
          onClick={() => setActiveTab("cleanup")}
          className={`flex items-center space-x-2 border-b-2 px-6 py-3 font-semibold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
            activeTab === "cleanup"
              ? "border-indigo-600 text-white bg-neutral-900/40"
              : "border-transparent text-neutral-400 hover:text-neutral-200"
          }`}
        >
          <RefreshCw className="h-4 w-4" />
          <span>Extraction & Cleanup</span>
        </button>
      </div>

      <div className="py-8">
        {/* Tab 1: Components breakdown */}
        {activeTab === "components" && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {product.components.map((comp, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-neutral-900 bg-neutral-950 p-5 space-y-4 hover:border-neutral-800 transition-all duration-200"
              >
                <div className="flex justify-between items-start">
                  <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 font-mono text-[9px] font-bold text-indigo-400 uppercase tracking-wider">
                    {comp.category === "friction" ? "Traction Neutralizer" : comp.category === "entanglement" ? "Entanglement Agent" : "Zoning"}
                  </span>
                  <span className="font-mono text-xs text-neutral-500">
                    Qty: {comp.count.toLocaleString()} {comp.unit}
                  </span>
                </div>
                <div>
                  <h4 className="font-serif text-base font-normal text-white italic">
                    {comp.name}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                    {comp.description}
                  </p>
                </div>
                <div className="border-t border-neutral-900/60 pt-3 font-mono text-[10px] text-neutral-500">
                  <span className="font-semibold text-neutral-400">Specs:</span> {comp.techSpec}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Detailed Specs Grid */}
        {activeTab === "specs" && (
          <div className="max-w-3xl rounded-xl border border-neutral-900 bg-neutral-950 overflow-hidden">
            <table className="min-w-full divide-y divide-neutral-900 font-mono text-xs">
              <tbody className="divide-y divide-neutral-900 bg-neutral-950/20">
                {product.specifications.map((spec, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-neutral-900/10" : "bg-transparent"}
                  >
                    <td className="px-6 py-4 font-semibold text-neutral-400 w-1/3">
                      {spec.label}
                    </td>
                    <td className="px-6 py-4 text-neutral-200">
                      {spec.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 3: Extraction / Cleanup Steps */}
        {activeTab === "cleanup" && (
          <div className="max-w-4xl space-y-6">
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5 flex items-start space-x-4">
              <AlertTriangle className="h-6 w-6 text-amber-500 shrink-0" />
              <div className="space-y-1">
                <h4 className="font-mono text-sm font-bold text-amber-400 uppercase tracking-wider">
                  IMPORTANT EXTRACTION WARNING
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Do not apply liquid cleaners, mops, or excessive water directly onto deployed micro-spheres prior to vacuuming. Moisture activates the surface sliding potential, compounding the friction-denial effect and making clean-up twice as challenging.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-4 rounded-xl border border-neutral-900 bg-neutral-950 p-5">
                <h4 className="font-serif text-sm font-normal text-white italic flex items-center space-x-2">
                  <CheckCircle2 className="h-4.5 w-4.5 text-indigo-400" />
                  <span>Phase 1: Micro-Sphere Capture</span>
                </h4>
                <ol className="list-decimal pl-4 space-y-2 text-xs text-neutral-400">
                  <li>Allow active zone to settle completely.</li>
                  <li>Equip a standard filtration-grade vacuum cleaner with a floor utility brush.</li>
                  <li>Slowly vacuum in overlapping rows. The 0.5mm spheres are engineered to lift easily from hardwood, tile, and corporate carpets.</li>
                  <li>Empty container in solid trash recycling once captured.</li>
                </ol>
              </div>

              <div className="space-y-4 rounded-xl border border-neutral-900 bg-neutral-950 p-5">
                <h4 className="font-serif text-sm font-normal text-white italic flex items-center space-x-2">
                  <CheckCircle2 className="h-4.5 w-4.5 text-indigo-400" />
                  <span>Phase 2: Polymeric Strand Removal</span>
                </h4>
                <ol className="list-decimal pl-4 space-y-2 text-xs text-neutral-400">
                  <li>Allow the pre-sprayed co-polymer strands to settle onto the floor and coalesce into a dry structural matrix.</li>
                  <li>Peel the main sticky strands by hand. They naturally stick to themselves, grouping into a convenient foam mass.</li>
                  <li>Use a warm damp sponge with mild soap to wipe away any microscopic adhesive residues on walls or handles.</li>
                  <li>Rest assured that both components are non-toxic and clothing-safe.</li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
