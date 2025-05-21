
import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Connect from '@/components/Connect';
import Footer from '@/components/Footer';

const Index = () => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Add useRef hooks for each section
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const connectRef = useRef<HTMLDivElement>(null);

  // Track scroll position to determine active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for header
      
      // Get section positions
      const sections = [
        { id: 'hero', position: heroRef.current?.offsetTop || 0 },
        { id: 'about', position: aboutRef.current?.offsetTop || 0 },
        { id: 'projects', position: projectsRef.current?.offsetTop || 0 },
        { id: 'skills', position: skillsRef.current?.offsetTop || 0 },
        { id: 'connect', position: connectRef.current?.offsetTop || 0 },
      ];
      
      // Find the current active section
      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollPosition >= sections[i].position) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track scroll position to show/hide the header
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  });
  
  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation Header */}
      <motion.header 
        variants={headerVariants}
        animate={visible ? "visible" : "hidden"}
        transition={{ ease: "easeInOut", duration: 0.3 }}
        className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 shadow-sm"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 py-4">
          <div className="flex justify-between items-center">
            <a href="#" className="text-xl font-bold text-primary">
              <span className="text-secondary">A</span>H
            </a>
            
            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                <NavItem href="#about" active={activeSection === 'about'}>About</NavItem>
                <NavItem href="#projects" active={activeSection === 'projects'}>Projects</NavItem>
                <NavItem href="#skills" active={activeSection === 'skills'}>Skills</NavItem>
                <NavItem href="#connect" active={activeSection === 'connect'}>Connect</NavItem>
              </ul>
            </nav>
            
            <Button 
              asChild
              className="hidden md:flex bg-transparent border-2 border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary transition duration-300"
            >
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                Resume
              </a>
            </Button>
            
            <button className="md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main>
        <div ref={heroRef}>
          <Hero />
        </div>
        <div ref={aboutRef}>
          <About />
        </div>
        <div ref={projectsRef}>
          <Projects />
        </div>
        <div ref={skillsRef}>
          <Skills />
        </div>
        <div ref={connectRef}>
          <Connect />
        </div>
      </main>
      
      <Footer />
      
      {/* Scroll to top button */}
      <ScrollToTopButton />
    </div>
  );
};

// Add missing imports and components
import { useState, useRef } from 'react';

const NavItem = ({ 
  href, 
  children, 
  active 
}: { 
  href: string; 
  children: React.ReactNode; 
  active: boolean 
}) => {
  return (
    <li>
      <a 
        href={href} 
        className={`relative text-gray-600 hover:text-secondary transition-colors duration-300 py-2 ${
          active ? 'text-secondary' : ''
        }`}
      >
        {children}
        {active && (
          <motion.span 
            layoutId="activeSection"
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary"
            transition={{ type: "spring", duration: 0.5 }}
          />
        )}
      </a>
    </li>
  );
};

const ScrollToTopButton = () => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 400) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  return (
    <motion.button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 h-12 w-12 bg-secondary text-white rounded-full shadow-lg flex items-center justify-center z-40"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: visible ? 1 : 0, 
        scale: visible ? 1 : 0
      }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <svg 
        className="w-6 h-6" 
        fill="none" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth="2" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </motion.button>
  );
};

export default Index;
