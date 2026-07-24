import React from 'react';
import { motion } from 'motion/react';

interface SvgMockupProps {
  type: 'church' | 'event' | 'book' | 'coffee';
  hovered?: boolean;
}

export const SvgMockup: React.FC<SvgMockupProps> = ({ type, hovered = false }) => {
  // Common transitions for subtle motion effects on hover
  const glowVariants = {
    initial: { opacity: 0.6, scale: 0.98 },
    hover: { opacity: 1, scale: 1.02 }
  };

  const contentVariants = {
    initial: { y: 0 },
    hover: { y: -4 }
  };

  switch (type) {
    case 'church':
      return (
        <div className="relative w-full h-full min-h-[220px] sm:min-h-[280px] bg-gradient-to-br from-[#0B0D17] to-[#121624] overflow-hidden rounded-md flex items-center justify-center p-4 border border-[#1A2035] group">
          {/* Ambient Gold/Orange background light */}
          <motion.div 
            variants={glowVariants}
            animate={hovered ? "hover" : "initial"}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(230,126,34,0.15)_0%,transparent_70%)]" 
          />
          
          {/* Decorative grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />

          {/* Majestic, Typographic Church Flyer Visual */}
          <motion.div 
            variants={contentVariants}
            animate={hovered ? "hover" : "initial"}
            transition={{ type: "spring", stiffness: 100 }}
            className="relative z-10 w-full max-w-[200px] aspect-[4/5] bg-[#070911] border border-orange-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] rounded-sm p-4 flex flex-col justify-between text-center overflow-hidden"
          >
            {/* Inner decorative frame */}
            <div className="absolute inset-2 border border-orange-500/10 pointer-events-none" />
            
            {/* Top Light Ray */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 bg-[radial-gradient(circle_at_top,rgba(230,126,34,0.3)_0%,transparent_70%)] rounded-full blur-xl" />
            
            {/* Header */}
            <div className="space-y-0.5">
              <span className="text-[7px] tracking-[0.3em] text-orange-500 font-semibold uppercase block">THE ENCOUNTER</span>
              <div className="h-px w-6 bg-orange-500/30 mx-auto" />
            </div>

            {/* Central Icon / Symbol */}
            <div className="my-auto py-2 relative flex justify-center items-center">
              {/* Abstract cross & glow */}
              <div className="absolute w-8 h-8 rounded-full bg-orange-500/10 blur-md" />
              <svg className="w-10 h-10 text-orange-500/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m-6-10h12" />
              </svg>
            </div>

            {/* Title & Metadata */}
            <div className="space-y-1">
              <h4 className="text-[14px] font-display font-extrabold uppercase tracking-wide leading-none text-white">
                GRACE
              </h4>
              <p className="text-[8px] text-gray-400 font-sans tracking-wider leading-none">ANNUAL GATHERING</p>
              
              <div className="pt-2 flex justify-between items-center text-[6px] text-orange-500/90 font-mono border-t border-white/5 mt-1.5">
                <span>OCT 24 - 26</span>
                <span>•</span>
                <span>ENUGU, NG</span>
              </div>
            </div>
          </motion.div>
        </div>
      );

    case 'event':
      return (
        <div className="relative w-full h-full min-h-[220px] sm:min-h-[280px] bg-gradient-to-br from-[#090909] to-[#141414] overflow-hidden rounded-md flex items-center justify-center p-4 border border-white/5 group">
          {/* Intense vibrant orange background radial */}
          <motion.div 
            variants={glowVariants}
            animate={hovered ? "hover" : "initial"}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(230,126,34,0.18)_0%,transparent_60%)]" 
          />
          
          {/* Brutalist Diagonal lines background */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%">
              <line x1="0" y1="100%" x2="100%" y2="0" stroke="white" strokeWidth="2" strokeDasharray="5 5" />
              <line x1="-20%" y1="100%" x2="80%" y2="0" stroke="white" strokeWidth="1" />
              <line x1="20%" y1="100%" x2="120%" y2="0" stroke="white" strokeWidth="1" />
            </svg>
          </div>

          {/* Brutalist Event Flyer */}
          <motion.div 
            variants={contentVariants}
            animate={hovered ? "hover" : "initial"}
            transition={{ type: "spring", stiffness: 100 }}
            className="relative z-10 w-full max-w-[200px] aspect-[4/5] bg-black border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] rounded-sm p-3.5 flex flex-col justify-between overflow-hidden"
          >
            {/* Absolute side branding bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500" />
            
            {/* Corner Bracket decorations */}
            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-orange-500/50" />
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-orange-500/50" />

            {/* Header */}
            <div className="flex justify-between items-center">
              <span className="text-[6px] font-mono text-orange-500 uppercase tracking-widest">[CREATIVE MASTERCLASS]</span>
              <span className="text-[5px] font-mono text-gray-500">2025 // VOL. 04</span>
            </div>

            {/* Huge overlap typography */}
            <div className="my-auto text-left relative">
              <div className="absolute -left-2 top-0 w-8 h-8 rounded-full bg-orange-500/20 blur-md -z-10" />
              <h3 className="text-[18px] font-display font-black leading-none tracking-tighter text-white">
                NEXT<br />
                <span className="text-orange-500">GEN</span><br />
                SUMMIT
              </h3>
              <p className="text-[6.5px] text-gray-400 font-mono mt-1.5 uppercase tracking-wide">
                Translating Ambition into Execution
              </p>
            </div>

            {/* Speakers / Time */}
            <div className="space-y-1.5 border-t border-orange-500/20 pt-2">
              <div className="flex justify-between text-[5.5px] text-gray-300">
                <span className="font-semibold text-white">EMMANUEL NWIGWE</span>
                <span>BRAND LEAD</span>
              </div>
              <div className="flex justify-between items-center text-[5px] font-mono text-orange-500">
                <span>08.24 @ 10:00 AM</span>
                <span className="bg-orange-500 text-black px-1 font-bold rounded-xs">REGISTRATION OPEN</span>
              </div>
            </div>
          </motion.div>
        </div>
      );

    case 'book':
      return (
        <div className="relative w-full h-full min-h-[220px] sm:min-h-[280px] bg-gradient-to-br from-[#0F0F0F] to-[#1E1E1E] overflow-hidden rounded-md flex items-center justify-center p-4 border border-white/5 group">
          {/* Subtle warm backdrop glow */}
          <motion.div 
            variants={glowVariants}
            animate={hovered ? "hover" : "initial"}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(230,126,34,0.1)_0%,transparent_60%)]" 
          />

          {/* Editorial Book cover simulation */}
          <motion.div 
            variants={contentVariants}
            animate={hovered ? "hover" : "initial"}
            transition={{ type: "spring", stiffness: 100 }}
            className="relative z-10 w-full max-w-[190px] aspect-[4/5] bg-[#141414] border-l-4 border-l-black border-y border-r border-white/10 shadow-[8px_20px_40px_rgba(0,0,0,0.9)] p-4 flex flex-col justify-between text-center"
          >
            {/* Elegant double line border */}
            <div className="absolute inset-1.5 border border-white/5 pointer-events-none" />
            <div className="absolute inset-2 border border-orange-500/10 pointer-events-none" />

            {/* Author */}
            <span className="text-[7px] tracking-[0.25em] text-gray-400 font-sans uppercase">CHIDERA MADU</span>

            {/* Book Spine Shadow Overlay */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-r from-black/50 to-transparent pointer-events-none" />

            {/* Emblem */}
            <div className="my-auto py-2 flex flex-col items-center">
              <div className="w-10 h-10 border border-orange-500/30 rounded-full flex items-center justify-center relative p-1.5">
                {/* Thin lines radiating */}
                <div className="absolute inset-0 border border-dashed border-orange-500/10 rounded-full animate-[spin_40s_linear_infinite]" />
                <div className="w-full h-full bg-[#1C1C1C] border border-orange-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-11.314l.707.707m11.314 11.314l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                  </svg>
                </div>
              </div>
              <div className="h-4 w-px bg-orange-500/40 my-1.5" />
            </div>

            {/* Title */}
            <div className="space-y-1.5">
              <h3 className="text-[13px] font-display font-bold leading-tight tracking-wider text-white uppercase">
                THE BOLD<br />
                <span className="text-orange-500 italic">HORIZON</span>
              </h3>
              <p className="text-[6px] text-gray-400 font-sans tracking-wide">A TREATISE ON STRATEGIC LEADERSHIP</p>
            </div>

            {/* Logo placeholder */}
            <span className="text-[5px] tracking-widest text-orange-500/80 uppercase font-mono mt-1">HORIZON PRESS</span>
          </motion.div>
        </div>
      );

    case 'coffee':
      return (
        <div className="relative w-full h-full min-h-[220px] sm:min-h-[280px] bg-gradient-to-br from-[#080808] to-[#121212] overflow-hidden rounded-md flex items-center justify-center p-4 border border-orange-500/5 group">
          {/* Subtle orange/brown gradient flare */}
          <motion.div 
            variants={glowVariants}
            animate={hovered ? "hover" : "initial"}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(230,126,34,0.15)_0%,transparent_60%)]" 
          />

          {/* Premium Minimal Coffee Pouch packaging mockup */}
          <motion.div 
            variants={contentVariants}
            animate={hovered ? "hover" : "initial"}
            transition={{ type: "spring", stiffness: 100 }}
            className="relative z-10 w-[110px] aspect-[1/2] bg-[#161616] border border-white/5 rounded-lg shadow-[12px_24px_50px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col justify-between"
          >
            {/* Top seal notch structure */}
            <div className="h-3 border-b border-black/30 bg-[#121212] relative flex justify-center items-center">
              <div className="w-1/2 h-0.5 bg-black/60 rounded-full" />
              {/* Notch dots */}
              <div className="absolute left-1.5 w-1 h-1 rounded-full bg-black/50" />
              <div className="absolute right-1.5 w-1 h-1 rounded-full bg-black/50" />
            </div>

            {/* Coffee packaging label */}
            <div className="m-2.5 p-2 bg-[#FAF5EF] text-black rounded-md flex-1 flex flex-col justify-between text-center relative border border-orange-500/10">
              
              {/* Coffee Brand Header */}
              <div>
                <span className="text-[5px] tracking-widest text-orange-500 uppercase font-bold block">AFRICAN ROASTERS</span>
                <h4 className="text-[9px] font-display font-black tracking-widest uppercase text-stone-900 leading-tight">
                  KUVILI
                </h4>
                <p className="text-[4px] tracking-wider text-stone-500 font-sans block uppercase">PREMIUM COFFEE</p>
                <div className="h-px w-6 bg-orange-500/40 mx-auto my-1" />
              </div>

              {/* Minimal Emblem in Center */}
              <div className="my-1.5 flex justify-center">
                <svg className="w-5 h-5 text-stone-900" viewBox="0 0 100 100" fill="none">
                  {/* Styled coffee bean monogram logo */}
                  <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" />
                  <path d="M50 15 C65 30, 65 70, 50 85 C35 70, 35 30, 50 15 Z" fill="currentColor" opacity="0.1" />
                  <path d="M50 15 C45 35, 55 65, 50 85" stroke="currentColor" strokeWidth="3" />
                  <circle cx="35" cy="50" r="4" fill="currentColor" />
                  <circle cx="65" cy="50" r="4" fill="currentColor" />
                </svg>
              </div>

              {/* Coffee Subtext */}
              <div className="space-y-0.5">
                <div className="bg-stone-900 text-white text-[4px] py-0.5 px-1 tracking-widest font-mono uppercase rounded-xs inline-block">
                  SINGLE ORIGIN
                </div>
                <div className="text-[4.5px] font-bold text-stone-800 tracking-wider">ETHIOPIA YIRGACHEFFE</div>
                <div className="text-[4px] text-stone-500 flex justify-around border-t border-stone-200 pt-1 mt-1 font-mono">
                  <span>250G</span>
                  <span>•</span>
                  <span>WHOLE BEAN</span>
                </div>
              </div>
            </div>

            {/* Bottom folds */}
            <div className="h-2 bg-[#0F0F0F] border-t border-black/20 flex justify-center items-center">
              <span className="text-[3.5px] text-gray-600 font-mono tracking-widest">© 2025</span>
            </div>
          </motion.div>
        </div>
      );

    default:
      return <div className="w-full h-full bg-[#1A1A1A] rounded-md" />;
  }
};
