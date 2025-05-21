
import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const skills = [
  { name: "HTML/CSS", level: 90 },
  { name: "JavaScript", level: 85 },
  { name: "React", level: 80 },
  { name: "Node.js", level: 75 },
  { name: "UI/UX Design", level: 70 },
  { name: "Python", level: 65 }
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

          <div className="grid gap-6">
            {skills.map((skill, index) => (
              <SkillBar 
                key={index} 
                skill={skill} 
                variants={itemVariants}
                delay={index * 0.1}
              />
            ))}
          </div>

          <motion.div 
            variants={itemVariants}
            className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8"
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

const SkillBar = ({ 
  skill, 
  variants,
  delay 
}: { 
  skill: { name: string; level: number }; 
  variants: any;
  delay: number;
}) => {
  return (
    <motion.div variants={variants} className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="font-medium">{skill.name}</span>
        <span className="text-gray-500">{skill.level}%</span>
      </div>
      <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-secondary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: delay + 0.3, ease: "easeInOut" }}
        ></motion.div>
      </div>
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
