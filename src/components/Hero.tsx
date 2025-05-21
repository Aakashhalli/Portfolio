
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section id="hero" className="h-screen flex flex-col justify-center items-start px-8 md:px-16 lg:px-24 relative overflow-hidden">
      <div className="max-w-3xl z-10">
        <motion.p 
          className="text-secondary mb-3 font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Hello, my name is
        </motion.p>
        
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Akash Halli.
        </motion.h1>
        
        <motion.h2 
          className="text-3xl md:text-5xl font-bold text-muted-foreground mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          I build things for the web.
        </motion.h2>
        
        <motion.p 
          className="text-lg text-muted-foreground mb-10 max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          I'm a passionate web developer specializing in creating exceptional digital experiences. 
          Currently focusing on building accessible, human-centered websites and applications.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button 
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-6 bg-transparent border-2 border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary transition duration-300"
          >
            View My Work
          </Button>
        </motion.div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
          className="animate-bounce"
        >
          <svg 
            className="w-6 h-6 text-secondary" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </motion.div>
      </div>

      <div className="absolute inset-0 -z-10 h-full bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      </div>
    </section>
  );
};

export default Hero;
