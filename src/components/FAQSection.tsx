import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'What is your brand identity design process?',
    answer: 'My process begins with a strategic discovery phase where we define your brand core, audience, and positioning. From there, I craft visual concepts, logo geometry, typography, and color systems. Once approved, I build a complete brand style guide and deliver production-ready assets.'
  },
  {
    id: '2',
    question: 'What deliverables will I receive at project completion?',
    answer: 'You will receive a complete master asset bundle including editable vector files (AI, EPS, SVG), high-resolution web formats (PNG, JPG), print-ready files (CMYK PDFs), color specification breakdowns, typography documentation, and a Brand Standards Manual.'
  },
  {
    id: '3',
    question: 'How long does a typical branding or flyer project take?',
    answer: 'Full brand identity systems typically take between 2 to 4 weeks depending on scope and feedback cycles. High-impact event flyer and church program series are executed with priority turnaround within 48 to 72 hours.'
  },
  {
    id: '4',
    question: 'Do you offer special packages for churches and ministries?',
    answer: 'Yes! I design tailored sermon series visuals, service broadcast banners, and event flyer systems specifically structured for ministries, balancing spiritual reverence with modern, high-contrast visual clarity.'
  },
  {
    id: '5',
    question: 'How do we kick off a new project together?',
    answer: 'Simply fill out the contact form at the bottom of this page or email me directly at nwigweemmanuel48@gmail.com. I will review your requirements and get back to you within 24 hours to schedule an initial discovery call.'
  }
];

interface FAQSectionProps {
  theme?: 'dark' | 'light';
}

export const FAQSection: React.FC<FAQSectionProps> = ({ theme = 'dark' }) => {
  const [openId, setOpenId] = useState<string | null>('1');

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const isLight = theme === 'light';

  return (
    <section 
      id="faq" 
      className={`py-24 sm:py-32 transition-colors duration-300 relative ${
        isLight ? 'bg-gray-100/80 text-gray-900 border-t border-gray-200' : 'bg-black text-white border-t border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Section Header */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#E67E22] font-semibold">
                06 // COMMON INQUIRIES
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-display font-black uppercase tracking-tight">
              Frequently Asked Questions
            </h2>

            <div className="h-0.5 w-12 bg-[#E67E22]" />

            <p className={`text-sm sm:text-base font-sans leading-relaxed ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
              Have questions about deliverables, project timelines, or design strategy? Here are answers to common questions clients ask before starting a collaboration.
            </p>

            <div className={`p-6 border ${isLight ? 'bg-white border-gray-200' : 'bg-[#121212] border-white/5'} space-y-3`}>
              <div className="flex items-center gap-2 text-[#E67E22] font-mono text-xs uppercase font-bold tracking-wider">
                <HelpCircle className="w-4 h-4" />
                <span>Need a Custom Quote?</span>
              </div>
              <p className={`text-xs font-sans leading-relaxed ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                If your specific question isn't listed here, reach out directly via the contact form below for a tailored response.
              </p>
            </div>
          </div>

          {/* Accordion List */}
          <div className="lg:col-span-7 space-y-4">
            {faqData.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className={`border transition-all duration-300 ${
                    isLight 
                      ? isOpen ? 'bg-white border-[#E67E22] shadow-md' : 'bg-white/80 border-gray-200 hover:border-gray-300'
                      : isOpen ? 'bg-[#121212] border-[#E67E22] shadow-[0_10px_30px_rgba(0,0,0,0.5)]' : 'bg-[#121212]/60 border-white/5 hover:border-white/20'
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(item.id)}
                    className="w-full text-left p-6 flex justify-between items-center gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display font-bold text-base sm:text-lg uppercase tracking-wide">
                      {item.question}
                    </span>
                    <div className={`w-8 h-8 rounded-none flex items-center justify-center shrink-0 border transition-transform duration-300 ${
                      isOpen 
                        ? 'bg-[#E67E22] text-black border-[#E67E22] rotate-180' 
                        : isLight ? 'bg-gray-100 text-gray-700 border-gray-200' : 'bg-black text-gray-400 border-white/10'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className={`p-6 pt-0 border-t ${isLight ? 'border-gray-100 text-gray-600' : 'border-white/5 text-gray-300'} font-sans text-sm sm:text-base leading-relaxed`}>
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
