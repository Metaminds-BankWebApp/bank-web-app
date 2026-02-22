"use client";

import { motion } from "framer-motion";

export function LandingBackground() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-(--primecore-background) pointer-events-none">
      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.4]"
        style={{
            backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
        }}
      />
      
      {/* Anime Blobs */}
      <motion.div
        className="absolute -left-[10%] -top-[10%] h-[60vh] w-[60vw] rounded-full bg-blue-300/15 blur-[120px]"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute -right-[10%] top-[20%] h-[70vh] w-[50vw] rounded-full bg-indigo-300/10 blur-[130px]"
        animate={{
          x: [0, -30, 0],
          y: [0, 60, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="absolute left-[20%] bottom-[-20%] h-[60vh] w-[60vw] rounded-full bg-sky-200/15 blur-[120px]"
        animate={{
          x: [0, 40, 0],
          y: [0, -40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />
    </div>
  );
}
