"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const items = [
  "ASTM D-2846 Certified",
  "ASTM D-1785 Compliant",
  "IS 13592 Standard",
  "IS 4985 Quality Assured",
  "20 Years of Trust",
  "Premium PVC Pipes",
  "CPVC & UPVC Fittings",
  "100% Leak-Proof",
];

export default function TrustMarquee() {
  return (
    <div className="w-full overflow-hidden bg-[var(--color-rio-surface)] border-y border-[var(--color-rio-line)] py-4 flex flex-col items-center">
      <div
        className="w-full relative flex items-center overflow-hidden"
        style={{
          WebkitMask: "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)",
          mask: "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)",
        }}
      >
        <motion.div 
          className="flex w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          {/* We duplicate the array to ensure seamless infinite scrolling */}
          {[...items, ...items, ...items].map((item, index) => (
            <div key={index} className="flex items-center mx-8 gap-8">
              <span className="text-sm font-semibold tracking-wider text-[var(--color-rio-slate)] uppercase whitespace-nowrap">
                {item}
              </span>
              <Star className="w-4 h-4 text-[var(--color-rio-blue)] opacity-50" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
