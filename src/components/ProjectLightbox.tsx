import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { SvgMockup } from './SvgMockup';
import { X, Copy, Check, Calendar, User, Briefcase, Award } from 'lucide-react';

interface ProjectLightboxProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectLightbox: React.FC<ProjectLightboxProps> = ({ project, onClose }) => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  // Esc key closes the lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Disable body scroll when lightbox is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  if (!project) return null;

  const handleCopyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => {
      setCopiedColor(null);
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Dark Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/95 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-5xl bg-[#121212] border border-[#E67E22]/30 rounded-none overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.9)] max-h-[90vh] flex flex-col md:flex-row z-10"
        >
          {/* Close button top right */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-gray-400 hover:text-white bg-black/40 hover:bg-black/80 rounded-none border border-white/5 hover:border-[#E67E22]/50 transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Side: Mockup Presentation */}
          <div className="w-full md:w-[45%] bg-[#0A0A0A] p-6 sm:p-8 flex flex-col justify-center items-center border-b md:border-b-0 md:border-r border-white/10 relative overflow-y-auto">
            <span className="absolute top-4 left-6 text-[10px] font-mono tracking-widest text-[#E67E22] uppercase font-bold">
              Brand Artifact Visualizer
            </span>
            
            <div className="w-full max-w-[280px] aspect-[4/5] mt-6 mb-4 relative">
              <SvgMockup type={project.interactiveSvgType} hovered={true} />
            </div>

            <div className="w-full text-center max-w-[280px]">
              <span className="text-[11px] text-gray-500 font-mono tracking-wider block">
                Generated interactive brand simulation
              </span>
            </div>
          </div>

          {/* Right Side: Detailed Story & Specifications */}
          <div className="w-full md:w-[55%] p-6 sm:p-8 md:p-10 overflow-y-auto flex flex-col justify-between">
            <div>
              {/* Project Title and Header info */}
              <div className="border-b border-white/5 pb-4 mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-[#E67E22] mb-1 block font-semibold">
                  {project.tagline}
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight">
                  {project.title}
                </h2>
              </div>

              {/* Specifications pills */}
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <User className="w-4 h-4 text-[#E67E22]" />
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500 block font-semibold">Client</span>
                    <span className="text-white font-medium">{project.client}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar className="w-4 h-4 text-[#E67E22]" />
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500 block font-semibold">Year</span>
                    <span className="text-white font-medium">{project.year}</span>
                  </div>
                </div>
              </div>

              {/* Design Strategy / Detailed description */}
              <div className="space-y-3 mb-6 bg-[#1A1A1A] p-4 border-l-2 border-[#E67E22]">
                <h4 className="text-xs uppercase font-mono tracking-widest text-gray-400 flex items-center gap-1.5 font-bold">
                  <Briefcase className="w-3.5 h-3.5 text-[#E67E22]" />
                  Design Strategy
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed font-sans font-light">
                  {project.longDescription}
                </p>
              </div>

              {/* Deliverables List */}
              <div className="mb-6">
                <h4 className="text-xs uppercase font-mono tracking-widest text-gray-400 flex items-center gap-1.5 mb-3 font-bold">
                  <Award className="w-3.5 h-3.5 text-[#E67E22]" />
                  Strategic Deliverables
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {project.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-300 py-0.5">
                      <span className="w-1.5 h-1.5 bg-[#E67E22] mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Interactive Color System Visualizer */}
              <div className="mb-6">
                <span className="text-xs uppercase font-mono tracking-widest text-gray-400 block mb-3 font-bold">
                  Color System (Click to copy)
                </span>
                <div className="flex flex-wrap gap-3">
                  {project.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleCopyColor(color)}
                      className="group flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#222222] border border-white/5 hover:border-[#E67E22]/30 px-3 py-1.5 rounded-none text-xs font-mono transition-all duration-200 text-gray-300 hover:text-white cursor-pointer"
                    >
                      <span
                        className="w-4.5 h-4.5 rounded-none border border-white/10 shrink-0"
                        style={{ backgroundColor: color }}
                      />
                      <span>{color}</span>
                      {copiedColor === color ? (
                        <Check className="w-3.5 h-3.5 text-green-500" />
                      ) : (
                        <Copy className="w-3 h-3 text-gray-500 group-hover:text-[#E67E22] opacity-60 group-hover:opacity-100 transition-all" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer tags */}
            <div className="border-t border-white/5 pt-4 flex flex-wrap gap-2 text-xs">
              <span className="text-gray-500 font-mono">Tools:</span>
              {project.tools.map((tool, idx) => (
                <span key={idx} className="text-[#E67E22] font-mono bg-[#E67E22]/5 border border-[#E67E22]/15 px-2 py-0.5 rounded-none text-[10px] uppercase font-semibold">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
