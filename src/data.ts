/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Review } from "./types";

export const PRODUCT_IMAGE = "/src/assets/images/tactical_disruption_kit_1784171806419.jpg";

export const MAIN_PRODUCT: Product = {
  id: "apex-5",
  name: "APEX-5 Tactical Area Disruption & Entanglement System",
  codename: "SYS-BEAD-STRING-V5",
  tagline: "Industrial-grade perimeter denial and floor-level traction neutralization.",
  price: 5.00,
  originalPrice: 15.00,
  rating: 4.9,
  reviewCount: 142,
  shortDescription: "A rapid-deploy non-lethal countermeasure. Combines 500 precision bio-polymer micro-spheres and ready-to-pour pre-sprayed co-polymer strands to establish complete floor-level traction neutralization and physical entanglement.",
  longDescription: "The APEX-5 is the gold standard in quick-deploy regional impedance. Engineered for high-stress security environments, corporate prank operations, or residential zone enforcement, it delivers complete traction denial and physical entanglement. By utilizing premium friction-neutralizing micro-spheres and ready-to-pour viscous co-polymer strands, it renders any polished or carpeted entryway, elevator lobby, or bedroom threshold completely impassable.",
  components: [
    {
      name: "Tactical Micro-Spherical Friction-Reduction Units",
      description: "Precisely sorted 0.5mm high-density polymer spheres. Designed to spread uniformly, creating a rolling-contact layer that reduces the coefficient of friction.",
      techSpec: "Material: Bio-degradable PMMA-C",
      count: 500,
      unit: "Spheres",
      category: "friction"
    },
    {
      name: "Pre-Sprayed Polymeric Viscous Foam Strands",
      description: "Already sprayed and cured, high-tensile sticky mesh. Ready to be poured or spread directly onto the floor. No pressurized canisters or active spraying required.",
      techSpec: "Material: Pre-cured high-density poly-isocyanate block strands",
      count: 1,
      unit: "Bundle",
      category: "entanglement"
    }
  ],
  specifications: [
    { label: "Recommended Coverage Zone", value: "5.0 m² (53.8 sq ft) at Peak Efficiency" },
    { label: "Traction Coefficient", value: "μ = 0.038 (Equal to wet ice on highly polished steel)" },
    { label: "Deployment Duration", value: "32 seconds (Single-operator configuration)" },
    { label: "Entanglement Density", value: "85m of cumulative high-tensile co-polymer strands" },
    { label: "Clean-up Protocol", value: "Standard vacuum extraction & warm water wipe" },
    { label: "Operational Classification", value: "Class III Spatial Disruption & Office-Grade Pranking" }
  ],
  inStock: true
};

export const UPSELLS: Product[] = [
  {
    id: "bead-refill",
    name: "Apex Friction Sphere Refill (250 Units)",
    codename: "REFILL-BEAD-250",
    tagline: "Secondary supply of rolling micro-spheres for repeated area deployment.",
    price: 1.99,
    rating: 4.8,
    reviewCount: 39,
    shortDescription: "A pack containing 250 precision friction-reduction spheres.",
    longDescription: "Re-arm your APEX-5 setup. Includes a high-grade moisture-sealed bag containing 250 PMMA-C micro-spheres to recharge your spatial denial area.",
    components: [],
    specifications: [],
    inStock: true
  },
  {
    id: "canister-pack",
    name: "Apex Ready-to-Pour Polymeric Strand Refill (Triple-Pack)",
    codename: "REFILL-STRAND-3X",
    tagline: "Three bundles of pre-sprayed co-polymer strands for maximum binding coverage.",
    price: 3.99,
    rating: 4.9,
    reviewCount: 51,
    shortDescription: "Three ready-to-pour bundles of pre-sprayed high-velocity co-polymer foam strands.",
    longDescription: "Ensure deep spatial lockdown. Features three ready-to-pour, pre-sprayed co-polymer entanglement strands.",
    components: [],
    specifications: [],
    inStock: true
  }
];

export const REVIEWS: Review[] = [
  {
    id: "rev-blc",
    author: "BLC short term maintenance crew",
    designation: "Facility Support Specialists",
    title: "Outstanding! Cleaning up was incredibly fast and easy.",
    rating: 5,
    date: "July 15, 2026",
    content: "Cleaning up this tactical entanglement system was incredibly fast and easy! As the primary maintenance crew, we were originally sweating when we saw the floor covered in polymer beads and viscous strands, but everything gathered up smoothly without any stickiness or persistent residue on the tile. It was a complete breeze to sweep up the 500 micro-spheres and fold the pre-sprayed co-polymer strands back into a tidy bundle. Absolute 5-star performance for facility cleanup crew operations!",
    verified: true,
    clearanceLevel: "Level 1 (Basic Maintenance)"
  },
  {
    id: "rev-1",
    author: "Commander Richard 'Rich' S.",
    designation: "Strategic Officer, Alpha Theta Chapter",
    title: "Complete corridor lockdown achieved.",
    rating: 5,
    date: "June 24, 2026",
    content: "We deployed the APEX-5 across the landing pad right outside the President's suite. The deployment sequence took under 40 seconds. When the target crossed the threshold, the 500 micro-spheres functioned exactly as engineered—all forward momentum was immediately converted into horizontal slide. The pre-sprayed co-polymer strands then wrapped securely around his ankles. Clean-up took only 5 minutes. Outstanding tactical asset.",
    verified: true,
    clearanceLevel: "Level 4 (Executive Prank Operations)"
  },
  {
    id: "rev-2",
    author: "Marcus Vance",
    designation: "VP of Senior Pranking Logistics",
    title: "Highly authentic technical presentation, absolute disruption.",
    rating: 5,
    date: "July 02, 2026",
    content: "My colleagues laughed when I arrived carrying this serious industrial case. Then, they saw the APEX-5 in action. We cordoned off the corridor leading to the server room. The friction coefficient drop is no joke. People were sliding around like they were on butter, while pre-sprayed sticky strands bonded securely to their smart shoes. If you need a serious, professional-grade prank solution, accept no substitutes.",
    verified: true,
    clearanceLevel: "Level 2 (Corporate Intrigue)"
  },
  {
    id: "rev-3",
    author: "Agent Sarah Connor",
    designation: "Special Ops, Office-Pranks Division",
    title: "Exceeds tactical specifications",
    rating: 4,
    date: "July 12, 2026",
    content: "The silly string—excuse me, the pre-sprayed co-polymer strands—have exceptional texture. They adhere to synthetic shirt materials and cotton with high chemical affinity. The beads are very small and round, meaning they roll into cracks if you aren't careful. Keep it within the target area for peak tactical density. Lost 1 star because my boss made me clean it up myself, but the laughter from the accounting floor was worth the audit.",
    verified: true,
    clearanceLevel: "Level 5 (Classified Chaos)"
  }
];
