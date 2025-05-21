
import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Html, 
  Css, 
  Javascript, 
  React as ReactIcon, 
  NodeJs, 
  Git, 
  Figma 
} from 'lucide-react';

const About = () => {
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

  return (
    <section id="about" className="section-padding bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          <div>
            <motion.h2 
              variants={itemVariants} 
              className="text-3xl md:text-4xl font-bold mb-6 flex items-center"
            >
              <span className="text-secondary mr-2">01.</span> About Me
            </motion.h2>
            
            <motion.div variants={itemVariants}>
              <p className="text-lg mb-4">
                Hi, I'm Akash Halli, a passionate web developer with a love for creating intuitive, clean, and responsive websites. 
                I specialize in full-stack development, UI/UX design, and front-end technologies.
              </p>
              
              <p className="text-lg mb-4">
                My journey in web development began during my college years, where I discovered my passion for creating digital experiences 
                that are both functional and aesthetically pleasing. Since then, I've been continuously expanding my skillset and 
                exploring new technologies.
              </p>
              
              <p className="text-lg mb-6">
                When I'm not coding, you can find me exploring design trends, contributing to open-source projects, or 
                experimenting with new development tools and frameworks.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold mb-4">Education</h3>
              <div className="flex items-start mb-3">
                <div className="h-2 w-2 bg-secondary rounded-full mt-2 mr-3"></div>
                <div>
                  <p className="font-medium">Bachelor of Technology in Computer Science</p>
                  <p className="text-gray-600">XYZ University, 2023</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div>
            <motion.h3 
              variants={itemVariants} 
              className="text-2xl font-semibold mb-6"
            >
              My Skills
            </motion.h3>
            
            <motion.div 
              variants={itemVariants} 
              className="mb-8"
            >
              <h4 className="text-lg font-medium mb-4">Technologies I work with:</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                <SkillItem icon={<Html size={40} />} name="HTML" />
                <SkillItem icon={<Css size={40} />} name="CSS" />
                <SkillItem icon={<Javascript size={40} />} name="JavaScript" />
                <SkillItem icon={<ReactIcon size={40} />} name="React" />
                <SkillItem icon={<NodeJs size={40} />} name="Node.js" />
                <SkillItem icon={<Git size={40} />} name="Git" />
                <SkillItem icon={<Figma size={40} />} name="Figma" />
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-medium mb-4">Other skills:</h4>
              <ul className="grid grid-cols-2 gap-2">
                {["Responsive Design", "API Integration", "UI/UX Design", "Performance Optimization", "SEO Principles", "Problem Solving"].map((skill, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="w-5 h-5 text-secondary mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const SkillItem = ({ icon, name }: { icon: React.ReactNode, name: string }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.1 }}
      className="flex flex-col items-center"
    >
      <div className="skill-icon mb-2">
        {icon}
      </div>
      <p className="font-medium text-center">{name}</p>
    </motion.div>
  );
};

export default About;
