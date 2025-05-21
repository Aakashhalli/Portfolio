
import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

const Connect = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
    // Could add toast notification or redirect
  };

  return (
    <section id="connect" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center justify-center">
              <span className="text-secondary mr-2">04.</span> Let's Connect
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              I'm always open to new opportunities, collaborations, or just a friendly chat about web development.
              Feel free to reach out through any of the channels below!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div variants={itemVariants} className="order-2 lg:order-1">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Your Name
                    </label>
                    <Input 
                      id="name" 
                      placeholder="John Doe" 
                      required 
                      className="border-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="john@example.com" 
                      required 
                      className="border-gray-300"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input 
                    id="subject" 
                    placeholder="How can I help you?" 
                    required 
                    className="border-gray-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Your Message
                  </label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell me more about your project..." 
                    rows={5} 
                    required 
                    className="border-gray-300"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-secondary text-primary hover:bg-secondary/90 py-6"
                >
                  Send Message
                </Button>
              </form>
            </motion.div>
            
            <motion.div variants={itemVariants} className="order-1 lg:order-2">
              <div className="bg-gray-50 rounded-xl p-8 h-full">
                <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-secondary/20 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <a href="mailto:akash.halli@example.com" className="text-gray-600 hover:text-secondary transition-colors">
                        akash.halli@example.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-secondary/20 p-3 rounded-full">
                      <Linkedin className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-medium">LinkedIn</h4>
                      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-secondary transition-colors">
                        linkedin.com/in/akash-halli
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-secondary/20 p-3 rounded-full">
                      <Github className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-medium">GitHub</h4>
                      <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-secondary transition-colors">
                        github.com/akashhalli
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-secondary/20 p-3 rounded-full">
                      <Twitter className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Twitter</h4>
                      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-secondary transition-colors">
                        @akash_halli
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Connect;
