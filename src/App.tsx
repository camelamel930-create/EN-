import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { services, projects, tools } from './data';
import { Project } from './types';
import { Header } from './components/Header';
import { SvgMockup } from './components/SvgMockup';
import { ProjectLightbox } from './components/ProjectLightbox';
import { TestimonialCarousel } from './components/TestimonialCarousel';
import { ProjectSkeleton } from './components/ProjectSkeleton';
import { FAQSection } from './components/FAQSection';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Facebook, 
  Send, 
  ArrowRight, 
  ArrowUp,
  Layers, 
  Fingerprint, 
  Share2, 
  FileText,
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  
  // Theme Toggle State
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const isLight = theme === 'light';

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Scroll Progress Bar & Back-to-Top State
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
      setShowBackToTop(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Category Filtering & Skeleton Loading State
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isLoadingProjects, setIsLoadingProjects] = useState<boolean>(false);

  const categories = ['All', 'Brand Identity', 'Book Covers', 'Event Flyers', 'Church Flyers'];

  const handleCategoryChange = (category: string) => {
    if (category === selectedCategory) return;
    setIsLoadingProjects(true);
    setSelectedCategory(category);
    setTimeout(() => {
      setIsLoadingProjects(false);
    }, 350);
  };

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  // Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Map icon names to Lucide icon components
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers':
        return <Layers className="w-6 h-6 text-orange-500" />;
      case 'Fingerprint':
        return <Fingerprint className="w-6 h-6 text-orange-500" />;
      case 'Share2':
        return <Share2 className="w-6 h-6 text-orange-500" />;
      case 'FileText':
        return <FileText className="w-6 h-6 text-orange-500" />;
      default:
        return <Sparkles className="w-6 h-6 text-orange-500" />;
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    
    try {
      // Direct email delivery via FormSubmit service to nwigweemmanuel48@gmail.com
      const response = await fetch('https://formsubmit.co/ajax/nwigweemmanuel48@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Name: formData.name,
          Email: formData.email,
          Subject: formData.subject || `New Portfolio Project Inquiry from ${formData.name}`,
          Message: formData.message,
          _subject: `Portfolio Inquiry: ${formData.subject || formData.name}`,
          _template: 'table'
        })
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        // Fallback to mailto protocol if API response isn't ok
        triggerMailtoFallback();
      }
    } catch {
      // Fallback to mailto protocol if network request fails
      triggerMailtoFallback();
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerMailtoFallback = () => {
    const mailSubject = encodeURIComponent(formData.subject || `Design Inquiry from ${formData.name}`);
    const mailBody = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:nwigweemmanuel48@gmail.com?subject=${mailSubject}&body=${mailBody}`;
    setSubmitSuccess(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleScrollToWork = () => {
    const element = document.getElementById('work');
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const heroHeadlineWords = ["EMMANUEL", "NWIGWE"];

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-300 selection:bg-orange-500 selection:text-black ${
      isLight ? 'bg-[#F9F9FB] text-gray-900' : 'bg-black text-white'
    }`}>
      {/* Scroll Progress Indicator Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-[#E67E22] z-50 transition-all duration-75 ease-out shadow-[0_0_12px_#E67E22]"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Decorative ambient background glows */}
      {!isLight && (
        <>
          <div className="absolute inset-0 bg-radial-gradient(circle_at_top_right,rgba(230,126,34,0.02)_0%,transparent_50%) pointer-events-none" />
          <div className="absolute inset-0 bg-radial-gradient(circle_at_bottom_left,rgba(230,126,34,0.01)_0%,transparent_60%) pointer-events-none" />
        </>
      )}

      {/* Header Navigation */}
      <Header theme={theme} onToggleTheme={toggleTheme} />

      {/* 1. HERO SECTION */}
      <section 
        id="hero" 
        className={`min-h-screen flex flex-col justify-center items-center px-6 sm:px-8 md:px-12 relative transition-colors duration-300 ${
          isLight ? 'bg-slate-50 text-gray-900' : 'bg-black text-white'
        }`}
      >
        <div className={`absolute inset-0 bg-[linear-gradient(rgba(230,126,34,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(230,126,34,0.03)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none ${
          isLight ? 'opacity-30' : 'opacity-40'
        }`} />
        
        <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8 relative z-10">
          
          {/* Staggered Word Reveal Headline */}
          <div className="space-y-4">
            <motion.h1 
              initial="hidden" 
              animate="visible" 
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.22 } }
              }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-extrabold tracking-tighter leading-[0.85] uppercase select-none flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6"
            >
              {heroHeadlineWords.map((word) => (
                <motion.span
                  key={word}
                  variants={{
                    hidden: { opacity: 0, y: 45, filter: 'blur(8px)' },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      filter: 'blur(0px)', 
                      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } 
                    }
                  }}
                  className={`inline-block ${isLight ? 'text-gray-900' : 'text-white'}`}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="text-lg sm:text-xl md:text-2xl text-[#E67E22] font-sans font-light tracking-wide italic max-w-2xl mx-auto leading-relaxed"
          >
            Bringing your imagination to reality.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            className="pt-4"
          >
            <button
              onClick={handleScrollToWork}
              className="group relative inline-flex items-center gap-3 bg-[#E67E22] text-black px-8 py-3.5 sm:px-10 sm:py-4 text-xs font-mono uppercase tracking-widest font-bold transition-all hover:bg-orange-600 shadow-[0_0_20px_rgba(230,126,34,0.3)] cursor-pointer"
            >
              View My Work
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>

        {/* Ambient bottom line hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className={`text-[9px] font-mono tracking-widest uppercase ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>
            Scroll Down
          </span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1 h-3 bg-[#E67E22] rounded-full"
          />
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section 
        id="about" 
        className={`py-24 sm:py-32 border-y transition-colors duration-300 relative ${
          isLight ? 'bg-white border-gray-200' : 'bg-[#121212] border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Section Header */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-4">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#E67E22] font-semibold">
                01 // ABOUT
              </span>
              <h2 className="text-4xl sm:text-5xl font-display font-black uppercase tracking-tight">
                Profile
              </h2>
              <div className="h-0.5 w-12 bg-[#E67E22] mt-2" />
            </div>

            {/* Strategic Bio */}
            <div className="lg:col-span-8 space-y-8 sm:space-y-12">
              <div className={`p-6 sm:p-8 border-l-2 border-[#E67E22] space-y-6 ${
                isLight ? 'bg-gray-50' : 'bg-[#121212]'
              }`}>
                <p className={`text-base sm:text-lg md:text-xl font-light leading-relaxed font-sans ${
                  isLight ? 'text-gray-700' : 'text-gray-300'
                }`}>
                  I'm <strong className={isLight ? 'text-gray-900 font-semibold' : 'text-white font-semibold'}>Emmanuel Nwigwe</strong>, a brand identity designer. I help founders and businesses translate abstract ideas into visual identities that command attention and build trust.
                </p>
                <p className={`text-base sm:text-lg md:text-xl font-light leading-relaxed font-sans ${
                  isLight ? 'text-gray-700' : 'text-gray-300'
                }`}>
                  Branding is not decoration. It's <span className="text-[#E67E22] font-medium italic">strategy made visible</span>. Every logo, every visual system I create is built with intention—designed to communicate your value before a single word is read.
                </p>
                <p className={`text-base sm:text-lg leading-relaxed font-sans font-medium ${
                  isLight ? 'text-gray-800' : 'text-gray-200'
                }`}>
                  You have a vision. I make it unmistakably real.
                </p>
              </div>

              {/* Grid of philosophy points */}
              <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t ${
                isLight ? 'border-gray-200' : 'border-white/5'
              }`}>
                <div className="space-y-2">
                  <span className="font-mono text-[#E67E22] text-xs tracking-widest uppercase font-bold">01 / PURPOSE</span>
                  <h4 className="font-display text-sm font-bold uppercase">Intentionality</h4>
                  <p className={`text-xs leading-relaxed ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>No arbitrary shapes. Every color value and curve maps to strategic commercial objectives.</p>
                </div>
                <div className="space-y-2">
                  <span className="font-mono text-[#E67E22] text-xs tracking-widest uppercase font-bold">02 / CRAFT</span>
                  <h4 className="font-display text-sm font-bold uppercase">Precision</h4>
                  <p className={`text-xs leading-relaxed ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>Pristine typography pairings and meticulous visual hierarchies that guide the viewer's eye.</p>
                </div>
                <div className="space-y-2">
                  <span className="font-mono text-[#E67E22] text-xs tracking-widest uppercase font-bold">03 / GEOGRAPHY</span>
                  <h4 className="font-display text-sm font-bold uppercase">Enugu, Nigeria</h4>
                  <p className={`text-xs leading-relaxed ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>Rooted in Enugu, design engineered to captivate both domestic African markets and global agencies.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section 
        id="services" 
        className={`py-24 sm:py-32 transition-colors duration-300 relative ${
          isLight ? 'bg-slate-50' : 'bg-black'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div className="space-y-4 w-full">
              <div className="flex items-center space-x-4 mb-2">
                <span className="text-xs font-mono uppercase tracking-[0.3em] opacity-50 whitespace-nowrap">
                  02. Services
                </span>
                <div className={`h-[1px] w-full ${isLight ? 'bg-gray-300' : 'bg-gray-800'}`} />
              </div>
              <h2 className="text-4xl sm:text-5xl font-display font-black uppercase tracking-tight">
                Capabilities
              </h2>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group p-8 border hover:border-[#E67E22] rounded-none transition-all duration-300 flex flex-col justify-between ${
                  isLight 
                    ? 'bg-white border-gray-200 hover:shadow-xl' 
                    : 'bg-[#1A1A1A] border-transparent hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)]'
                }`}
              >
                <div className="space-y-6">
                  {/* Accent Top Bar */}
                  <div className="h-1 w-6 bg-[#E67E22] mb-3 transition-all group-hover:w-12" />
                  
                  <div className="space-y-3">
                    <h3 className="text-lg sm:text-xl font-display font-bold uppercase tracking-wide group-hover:text-[#E67E22] transition-colors">
                      {service.title}
                    </h3>
                    <p className={`text-sm sm:text-base leading-relaxed font-sans ${
                      isLight ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className={`pt-6 mt-6 border-t flex justify-between items-center text-xs font-mono transition-colors ${
                  isLight 
                    ? 'border-gray-100 text-gray-500 group-hover:text-gray-900' 
                    : 'border-white/5 text-gray-500 group-hover:text-white'
                }`}>
                  <span>SPECIALIZATION 0{index + 1}</span>
                  <span className="text-orange-500 opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-4px] group-hover:translate-x-0">→</span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 3.5 TESTIMONIAL CAROUSEL SECTION */}
      <TestimonialCarousel theme={theme} />

      {/* 4. PORTFOLIO / SELECTED WORK SECTION */}
      <section 
        id="work" 
        className={`py-24 sm:py-32 border-y transition-colors duration-300 relative ${
          isLight ? 'bg-white border-gray-200' : 'bg-[#121212] border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div className="space-y-4 w-full">
              <div className="flex items-center space-x-4 mb-2">
                <span className="text-xs font-mono uppercase tracking-[0.2em] opacity-50 whitespace-nowrap">
                  03. Selected Work
                </span>
                <div className={`h-[1px] w-full ${isLight ? 'bg-gray-300' : 'bg-gray-800'}`} />
              </div>
              <h2 className="text-4xl sm:text-5xl font-display font-black uppercase tracking-tight">
                Works
              </h2>
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#E67E22] text-black font-bold shadow-[0_0_15px_rgba(230,126,34,0.3)]'
                    : isLight 
                      ? 'bg-gray-100 text-gray-700 hover:text-black border border-gray-300 hover:border-[#E67E22]' 
                      : 'bg-[#1A1A1A] text-gray-400 hover:text-white border border-white/5 hover:border-[#E67E22]/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project Grid / Skeleton State */}
          {isLoadingProjects ? (
            <ProjectSkeleton isLight={isLight} />
          ) : filteredProjects.length === 0 ? (
            <div className={`py-16 text-center font-mono text-xs uppercase tracking-widest border border-dashed p-8 ${
              isLight ? 'text-gray-500 border-gray-300' : 'text-gray-500 border-white/10'
            }`}>
              No projects found in this category.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {filteredProjects.map((project, index) => {
                const isHovered = hoveredProject === project.id;
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                    onClick={() => setSelectedProject(project)}
                    className={`group flex flex-col border-t-2 border-t-[#E67E22] rounded-none overflow-hidden cursor-pointer transition-all duration-300 ${
                      isLight 
                        ? 'bg-gray-50 border-x border-b border-gray-200 shadow-md hover:shadow-xl' 
                        : 'bg-[#1A1A1A] border-x border-b border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)]'
                    }`}
                  >
                    {/* Visualizer Area */}
                    <div className="aspect-[4/3] w-full overflow-hidden relative">
                      <SvgMockup type={project.interactiveSvgType} hovered={isHovered} />
                      
                      {/* View overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="bg-[#E67E22] text-black px-4 py-2 font-mono text-xs uppercase font-bold tracking-widest rounded-none transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 shadow-[0_4px_15px_rgba(230,126,34,0.4)]">
                          Explore Case Study
                        </span>
                      </div>
                    </div>

                    {/* Details Area */}
                    <div className="p-6 sm:p-8 space-y-2 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-mono tracking-widest text-[#E67E22] uppercase font-semibold">
                            {project.tagline}
                          </span>
                          <span className="text-[10px] font-mono text-gray-500 uppercase font-medium">
                            {project.year}
                          </span>
                        </div>
                        <h3 className={`text-xl font-display font-bold group-hover:text-[#E67E22] transition-colors uppercase tracking-wide ${
                          isLight ? 'text-gray-900' : 'text-white'
                        }`}>
                          {project.title}
                        </h3>
                        <p className={`text-sm leading-relaxed font-sans pt-1 ${
                          isLight ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {project.description}
                        </p>
                      </div>

                      <div className={`pt-6 mt-6 border-t flex flex-wrap gap-2 ${
                        isLight ? 'border-gray-200' : 'border-white/5'
                      }`}>
                        {project.tools.slice(0, 2).map((t, idx) => (
                          <span key={idx} className={`text-[9px] font-mono tracking-widest px-2 py-0.5 rounded-none border ${
                            isLight 
                              ? 'text-gray-600 bg-gray-200/50 border-gray-300' 
                              : 'text-gray-400 bg-black/30 border-white/5'
                          }`}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* 5. SKILLS & TOOLS SECTION */}
      <section 
        id="tools" 
        className={`py-24 sm:py-32 transition-colors duration-300 relative ${
          isLight ? 'bg-slate-50 border-t border-gray-200' : 'bg-black'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#E67E22] font-semibold">
                04 // PRODUCTION STACK
              </span>
              <h2 className="text-4xl sm:text-5xl font-display font-black uppercase tracking-tight">
                Tools
              </h2>
              <p className={`text-sm sm:text-base leading-relaxed font-sans max-w-sm ${
                isLight ? 'text-gray-600' : 'text-gray-400'
              }`}>
                These are the professional industrial tools utilized to generate flawless assets, vector geometry, and high-impact layout designs.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="flex flex-wrap gap-3">
                {tools.map((tool, index) => (
                  <motion.div
                    key={tool}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className={`px-4 py-2 border text-[10px] uppercase font-semibold tracking-wider transition-all duration-300 ${
                      isLight 
                        ? 'border-[#E67E22] text-[#E67E22] bg-white hover:bg-[#E67E22] hover:text-white shadow-sm' 
                        : 'border-[#E67E22] text-[#E67E22] hover:bg-orange-500/5'
                    }`}
                  >
                    {tool}
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5.5 FAQ SECTION */}
      <FAQSection theme={theme} />

      {/* 6. CONTACT SECTION */}
      <section 
        id="contact" 
        className={`py-20 sm:py-28 md:py-32 border-t transition-colors duration-300 relative ${
          isLight ? 'bg-white border-gray-200' : 'bg-[#121212] border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 xl:gap-20 items-start">
            
            {/* Contact Info Column */}
            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#E67E22] font-semibold">
                  06 // GET IN TOUCH
                </span>
                <h2 className="text-4xl sm:text-5xl font-display font-black uppercase tracking-tight">
                  Contact
                </h2>
                <div className="h-0.5 w-12 bg-[#E67E22]" />
              </div>

              <p className={`text-sm sm:text-base leading-relaxed font-sans max-w-sm ${
                isLight ? 'text-gray-600' : 'text-gray-400'
              }`}>
                Have a vision that needs to be made unmistakably real? Reach out today. Let's build a visual identity system that commands attention and compounds your value.
              </p>

              {/* Direct Channels */}
              <div className="space-y-4 pt-4">
                <div className={`flex items-center gap-4 ${isLight ? 'text-gray-700' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-none border flex items-center justify-center ${
                    isLight ? 'bg-gray-100 border-gray-300' : 'bg-black border-white/5'
                  }`}>
                    <Mail className="w-4 h-4 text-[#E67E22]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-gray-500 tracking-wider block">Email</span>
                    <a href="mailto:nwigweemmanuel48@gmail.com" className="text-sm font-semibold select-all font-mono hover:text-[#E67E22] transition-colors">
                      nwigweemmanuel48@gmail.com
                    </a>
                  </div>
                </div>

                <div className={`flex items-center gap-4 ${isLight ? 'text-gray-700' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-none border flex items-center justify-center ${
                    isLight ? 'bg-gray-100 border-gray-300' : 'bg-black border-white/5'
                  }`}>
                    <Phone className="w-4 h-4 text-[#E67E22]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-gray-500 tracking-wider block">Phone</span>
                    <a href="tel:+2348169725708" className="text-sm font-semibold font-mono hover:text-[#E67E22] transition-colors">
                      +234 816 972 5708
                    </a>
                  </div>
                </div>

                <div className={`flex items-center gap-4 ${isLight ? 'text-gray-700' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-none border flex items-center justify-center ${
                    isLight ? 'bg-gray-100 border-gray-300' : 'bg-black border-white/5'
                  }`}>
                    <MapPin className="w-4 h-4 text-[#E67E22]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-gray-500 tracking-wider block">Location</span>
                    <span className="text-sm font-semibold">Enugu, Nigeria</span>
                  </div>
                </div>
              </div>

              {/* Social Channels with Hover Effects */}
              <div className="space-y-2 pt-6">
                <span className="text-[10px] font-mono uppercase text-gray-500 tracking-widest block">Digital Footprint</span>
                <div className="flex gap-3">
                  <a 
                    href="https://linkedin.com/in/emmanuel-nwigwe-b875a33a2" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`w-10 h-10 rounded-none border flex items-center justify-center transition-all cursor-pointer ${
                      isLight 
                        ? 'bg-gray-100 border-gray-300 text-gray-800 hover:text-black hover:bg-[#E67E22] hover:border-[#E67E22]' 
                        : 'bg-black border-white/5 text-white hover:text-black hover:bg-[#E67E22] hover:border-[#E67E22]'
                    }`}
                    title="LinkedIn Portfolio"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a 
                    href="https://web.facebook.com/emmanuel.nwigwe.526" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`w-10 h-10 rounded-none border flex items-center justify-center transition-all cursor-pointer ${
                      isLight 
                        ? 'bg-gray-100 border-gray-300 text-gray-800 hover:text-black hover:bg-[#E67E22] hover:border-[#E67E22]' 
                        : 'bg-black border-white/5 text-white hover:text-black hover:bg-[#E67E22] hover:border-[#E67E22]'
                    }`}
                    title="Facebook Channel"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Interactive Form Column */}
            <div className={`lg:col-span-7 border rounded-none p-6 sm:p-10 md:p-12 lg:p-14 xl:p-16 transition-colors ${
              isLight 
                ? 'bg-gray-50 border-gray-200 shadow-lg' 
                : 'bg-[#1A1A1A] border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]'
            }`}>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold uppercase tracking-wide mb-6 sm:mb-8 lg:mb-10">
                Send a Message
              </h3>

              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-orange-500/5 border border-orange-500/20 rounded-none p-8 sm:p-12 lg:p-16 text-center space-y-6"
                >
                  <div className="w-16 h-16 bg-orange-500/10 border border-orange-500/20 rounded-full flex items-center justify-center mx-auto text-orange-500">
                    <CheckCircle className="w-9 h-9" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-display font-bold uppercase">Message Sent Directly To Email</h4>
                    <p className={`text-sm sm:text-base font-sans leading-relaxed max-w-md mx-auto ${
                      isLight ? 'text-gray-700' : 'text-gray-300'
                    }`}>
                      Your inquiry has been transmitted directly to <strong className="text-[#E67E22]">nwigweemmanuel48@gmail.com</strong>. Emmanuel will review your design specifications and get back to you shortly.
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="text-xs uppercase font-mono tracking-widest text-[#E67E22] hover:text-black transition-colors border-b border-[#E67E22]/30 hover:border-black py-1 cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6 sm:space-y-8 lg:space-y-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
                    <div className="space-y-3">
                      <label htmlFor="name" className={`text-xs uppercase font-mono tracking-widest ${
                        isLight ? 'text-gray-700 font-medium' : 'text-gray-400'
                      }`}>
                        Your Name <span className="text-orange-500">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full border rounded-none px-4 py-3.5 sm:px-5 sm:py-4 lg:px-6 lg:py-4.5 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all ${
                          isLight 
                            ? 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400' 
                            : 'bg-[#121212] border-white/10 text-white placeholder:text-gray-600'
                        }`}
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="space-y-3">
                      <label htmlFor="email" className={`text-xs uppercase font-mono tracking-widest ${
                        isLight ? 'text-gray-700 font-medium' : 'text-gray-400'
                      }`}>
                        Your Email <span className="text-orange-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full border rounded-none px-4 py-3.5 sm:px-5 sm:py-4 lg:px-6 lg:py-4.5 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all ${
                          isLight 
                            ? 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400' 
                            : 'bg-[#121212] border-white/10 text-white placeholder:text-gray-600'
                        }`}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="subject" className={`text-xs uppercase font-mono tracking-widest ${
                      isLight ? 'text-gray-700 font-medium' : 'text-gray-400'
                    }`}>
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className={`w-full border rounded-none px-4 py-3.5 sm:px-5 sm:py-4 lg:px-6 lg:py-4.5 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all ${
                        isLight 
                          ? 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400' 
                          : 'bg-[#121212] border-white/10 text-white placeholder:text-gray-600'
                      }`}
                      placeholder="Brand Identity Project"
                    />
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="message" className={`text-xs uppercase font-mono tracking-widest ${
                      isLight ? 'text-gray-700 font-medium' : 'text-gray-400'
                    }`}>
                      Your Message <span className="text-orange-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full border rounded-none px-4 py-3.5 sm:px-5 sm:py-4 lg:px-6 lg:py-4.5 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all resize-none min-h-[160px] lg:min-h-[180px] ${
                        isLight 
                          ? 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400' 
                          : 'bg-[#121212] border-white/10 text-white placeholder:text-gray-600'
                      }`}
                      placeholder="Describe your design specifications and timelines..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full relative inline-flex items-center justify-center gap-3 bg-[#E67E22] disabled:bg-orange-600 text-black py-4 sm:py-4.5 lg:py-5 rounded-none text-xs sm:text-sm font-mono uppercase tracking-widest font-black transition-all hover:bg-orange-600 shadow-[0_0_15px_rgba(230,126,34,0.2)] cursor-pointer mt-4"
                  >
                    {isSubmitting ? (
                      <>
                        <Clock className="w-4 h-4 animate-spin" />
                        Transmitting...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className={`border-t py-16 text-center space-y-8 relative transition-colors duration-300 ${
        isLight ? 'bg-slate-100 border-gray-200' : 'bg-black border-white/5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 flex flex-col items-center">
          
          <div className="space-y-2 mb-8 text-center">
            <span className={`font-display font-black text-lg tracking-[0.15em] uppercase block ${
              isLight ? 'text-gray-900' : 'text-white'
            }`}>
              EMMANUEL NWIGWE
            </span>
            <span className="text-xs font-sans tracking-wide text-gray-500 max-w-sm mx-auto block leading-relaxed uppercase">
              Bringing your imagination to reality.
            </span>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4">
            <a 
              href="https://linkedin.com/in/emmanuel-nwigwe-b875a33a2" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`w-8 h-8 rounded-none border flex items-center justify-center transition-all cursor-pointer ${
                isLight 
                  ? 'bg-white border-gray-300 text-gray-600 hover:text-[#E67E22] hover:border-[#E67E22]' 
                  : 'bg-[#121212] border-white/5 text-gray-400 hover:text-[#E67E22] hover:border-[#E67E22]'
              }`}
              title="LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a 
              href="https://web.facebook.com/emmanuel.nwigwe.526" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`w-8 h-8 rounded-none border flex items-center justify-center transition-all cursor-pointer ${
                isLight 
                  ? 'bg-white border-gray-300 text-gray-600 hover:text-[#E67E22] hover:border-[#E67E22]' 
                  : 'bg-[#121212] border-white/5 text-gray-400 hover:text-[#E67E22] hover:border-[#E67E22]'
              }`}
              title="Facebook"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Glowing Accent line separating copyright */}
          <div className={`max-w-[200px] w-full mx-auto h-[1px] relative my-6 ${isLight ? 'bg-gray-300' : 'bg-gray-900'}`}>
            <div className="absolute inset-0 bg-[#E67E22] h-[1px] w-12 mx-auto" />
          </div>

          <p className="text-[10px] sm:text-xs text-gray-500 font-mono tracking-widest uppercase">
            &copy; 2025 Emmanuel Nwigwe <span className="text-[#E67E22] mx-2">|</span> STRATEGY MADE VISIBLE
          </p>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={handleScrollToTop}
            className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-[#E67E22] text-black font-bold flex items-center justify-center border border-black shadow-[0_4px_20px_rgba(230,126,34,0.4)] hover:bg-black hover:text-[#E67E22] hover:border-[#E67E22] transition-all cursor-pointer group"
            aria-label="Back to top"
            title="Back to top"
          >
            <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Project Lightbox Detail view */}
      <ProjectLightbox 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </div>
  );
}
