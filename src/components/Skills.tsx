
import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Progress } from "@/components/ui/progress";
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
              <SkillCircle 
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
                whileHover={{ scale: 1.05 }}
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

const SkillCircle = ({ 
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
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
    >
      <div className="relative h-36 w-36 flex items-center justify-center mb-4">
        {/* Outer circle background */}
        <div className="absolute h-36 w-36 rounded-full border-8 border-gray-100"></div>
        
        {/* Progress circle */}
        <svg className="absolute h-36 w-36" viewBox="0 0 100 100">
          <circle 
            cx="50" 
            cy="50" 
            r="40" 
            fill="none" 
            stroke="#e6e6e6" 
            strokeWidth="8" 
          />
          <motion.circle 
            cx="50" 
            cy="50" 
            r="40" 
            fill="none" 
            stroke="rgb(172, 255, 231)" /* This should match the secondary color */
            strokeWidth="8" 
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 40}`}
            strokeDashoffset={`${2 * Math.PI * 40 * (1 - skill.level/100)}`}
            initial={{ strokeDashoffset: `${2 * Math.PI * 40}` }}
            animate={{ strokeDashoffset: `${2 * Math.PI * 40 * (1 - skill.level/100)}` }}
            transition={{ duration: 1.5, delay }}
          />
        </svg>
        
        {/* Skill icon and percentage */}
        <div className="flex flex-col items-center justify-center z-10">
          <div className="text-4xl font-bold text-primary">
            {skill.level}%
          </div>
          <div className="mt-1 text-secondary">
            {skill.icon}
          </div>
        </div>
      </div>
      
      <h3 className="text-xl font-medium text-primary">{skill.name}</h3>
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

export default Skills;
