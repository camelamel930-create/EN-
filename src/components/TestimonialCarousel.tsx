import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { testimonials } from '../data';

interface TestimonialCarouselProps {
  theme?: 'dark' | 'light';
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ theme = 'dark' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const isLight = theme === 'light';

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (!isAutoplayPaused) {
      timerRef.current = setInterval(() => {
        nextTestimonial();
      }, 6000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoplayPaused, currentIndex]);

  const current = testimonials[currentIndex];

  return (
    <section className={`py-24 transition-colors duration-300 relative overflow-hidden ${
      isLight ? 'bg-gray-100/50 border-y border-gray-200' : 'bg-[#0A0A0A] border-y border-white/5'
    }`}>
      {/* Subtle ambient orange glow in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#E67E22]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 relative">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-4 w-full">
            <div className="flex items-center space-x-4 mb-2">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#E67E22] font-semibold">
                Client Proof & Endorsements
              </span>
              <div className={`h-[1px] w-full ${isLight ? 'bg-gray-300' : 'bg-gray-800'}`} />
            </div>
            <h2 className={`text-4xl sm:text-5xl font-display font-black uppercase tracking-tight ${
              isLight ? 'text-gray-900' : 'text-white'
            }`}>
              Client Feedback
            </h2>
          </div>
        </div>

        {/* Testimonial Card Display */}
        <div 
          className={`relative p-8 sm:p-12 md:p-16 border transition-all duration-300 min-h-[320px] flex flex-col justify-between ${
            isLight 
              ? 'bg-white border-gray-200 shadow-lg' 
              : 'bg-[#121212] border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.8)]'
          }`}
          onMouseEnter={() => setIsAutoplayPaused(true)}
          onMouseLeave={() => setIsAutoplayPaused(false)}
        >
          {/* Top Quote Icon & Rating */}
          <div className="flex justify-between items-center mb-8">
            <div className="w-10 h-10 bg-[#E67E22]/10 border border-[#E67E22]/30 flex items-center justify-center text-[#E67E22]">
              <Quote className="w-5 h-5" />
            </div>
            
            <div className="flex items-center gap-1">
              {[...Array(current.rating || 5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#E67E22] text-[#E67E22]" />
              ))}
            </div>
          </div>

          {/* Testimonial Content with AnimatePresence */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-6 my-auto"
            >
              <p className={`text-lg sm:text-2xl font-sans font-light leading-relaxed italic ${
                isLight ? 'text-gray-800' : 'text-gray-200'
              }`}>
                "{current.quote}"
              </p>

              <div className={`pt-6 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                isLight ? 'border-gray-200' : 'border-white/5'
              }`}>
                <div>
                  <h4 className={`font-display font-bold uppercase tracking-wide text-base ${
                    isLight ? 'text-gray-900' : 'text-white'
                  }`}>
                    {current.author}
                  </h4>
                  <p className="text-[#E67E22] text-xs font-mono tracking-wider uppercase">
                    {current.role} <span className={isLight ? 'text-gray-400' : 'text-gray-600'}>|</span> {current.organization}
                  </p>
                </div>

                {current.projectAssociated && (
                  <span className={`text-[10px] font-mono tracking-widest border px-3 py-1 uppercase self-start sm:self-auto ${
                    isLight 
                      ? 'text-gray-600 bg-gray-100 border-gray-200' 
                      : 'text-gray-400 bg-black/50 border-white/5'
                  }`}>
                    {current.projectAssociated}
                  </span>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls Bar */}
          <div className={`flex justify-between items-center pt-8 mt-6 border-t ${
            isLight ? 'border-gray-200' : 'border-white/5'
          }`}>
            {/* Progress Dots */}
            <div className="flex gap-2 items-center">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 transition-all duration-300 cursor-pointer ${
                    currentIndex === idx 
                      ? 'w-8 bg-[#E67E22]' 
                      : isLight ? 'w-2 bg-gray-300 hover:bg-gray-400' : 'w-2 bg-gray-800 hover:bg-gray-600'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={prevTestimonial}
                className={`w-10 h-10 border flex items-center justify-center transition-colors cursor-pointer ${
                  isLight 
                    ? 'bg-gray-100 border-gray-300 text-gray-700 hover:border-[#E67E22] hover:text-[#E67E22]' 
                    : 'bg-black border-white/10 text-gray-300 hover:border-[#E67E22] hover:text-[#E67E22]'
                }`}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className={`w-10 h-10 border flex items-center justify-center transition-colors cursor-pointer ${
                  isLight 
                    ? 'bg-gray-100 border-gray-300 text-gray-700 hover:border-[#E67E22] hover:text-[#E67E22]' 
                    : 'bg-black border-white/10 text-gray-300 hover:border-[#E67E22] hover:text-[#E67E22]'
                }`}
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
