
import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Code,
  FileJson,
  FileType,
  SquareCode,
  Server,
  GitBranch
} from 'lucide-react';

const skills = [
  { name: "HTML/CSS", level: 90, icon: <Code className="h-5 w-5" /> },
  { name: "JavaScript", level: 85, icon: <FileType className="h-5 w-5" /> },
  { name: "React", level: 80, icon: <SquareCode className="h-5 w-5" /> },
  { name: "Node.js", level: 75, icon: <Server className="h-5 w-5" /> },
  { name: "UI/UX Design", level: 70, icon: <FileJson className="h-5 w-5" /> },
  { name: "Version Control", level: 65, icon: <GitBranch className="h-5 w-5" /> }
];

const Skills = () => {
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
    <section id="skills" className="section-padding bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center">
              <span className="text-secondary mr-2">03.</span> My Expertise
            </h2>
            <p className="text-lg text-gray-600">
              I've spent years honing my skills across multiple technologies and disciplines.
              Here's a more detailed look at my technical proficiency.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {skills.map((skill, index) => (
              <SkillCard 
                key={index} 
                skill={skill} 
                delay={index * 0.1}
              />
            ))}
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-8"
          >
            {[
              "Responsive Design", 
              "Performance Optimization", 
              "RESTful API Integration",
              "Version Control", 
              "Database Design", 
              "Agile Development"
            ].map((speciality, index) => (
              <motion.div 
                key={index} 
                className="flex flex-col items-center text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                }}
              >
                <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center mb-3">
                  <CheckIcon className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-medium">{speciality}</h3>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const SkillCard = ({ 
  skill, 
  delay 
}: { 
  skill: { name: string; level: number; icon: React.ReactNode }; 
  delay: number;
}) => {
  return (
    <motion.div 
      className="flex flex-col items-center bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
      whileHover={{ 
        y: -10,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
    >
      <div className="hex-progress-container mb-5 relative">
        <div className="hex-background">
          <HexagonIcon className="w-28 h-28 text-gray-100" />
        </div>
        <div className="hex-icon absolute inset-0 flex items-center justify-center">
          {skill.icon}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold">{skill.level}%</span>
        </div>
        <svg className="absolute inset-0" width="112" height="112" viewBox="0 0 112 112">
          <defs>
            <linearGradient id={`gradient-${skill.name}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(172, 255, 231)" />
              <stop offset="100%" stopColor="rgb(100, 223, 223)" />
            </linearGradient>
          </defs>
          <motion.path
            d="M56,8 L98,36 L98,76 L56,104 L14,76 L14,36 Z"
            fill="none"
            stroke={`url(#gradient-${skill.name})`}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: skill.level / 100 }}
            transition={{ duration: 1.5, delay }}
          />
        </svg>
      </div>
      <h3 className="text-xl font-medium text-primary mt-4">{skill.name}</h3>
    </motion.div>
  );
};

const CheckIcon = ({ className }: { className: string }) => (
  <svg 
    className={className} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const HexagonIcon = ({ className }: { className: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M21,16.5c0,0.38-0.21,0.71-0.53,0.88l-7.9,4.44c-0.16,0.12-0.36,0.18-0.57,0.18c-0.21,0-0.41-0.06-0.57-0.18l-7.9-4.44 C3.21,17.21,3,16.88,3,16.5v-9c0-0.38,0.21-0.71,0.53-0.88l7.9-4.44c0.16-0.12,0.36-0.18,0.57-0.18c0.21,0,0.41,0.06,0.57,0.18 l7.9,4.44C20.79,6.79,21,7.12,21,7.5V16.5z" />
  </svg>
);

export default Skills;
