
import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, Calendar, Users, Code, Tag } from 'lucide-react';

// Sample project data, would typically come from a CMS or data file
const projects = [
  {
    id: 1,
    title: "E-Commerce Website",
    description: "A full-featured e-commerce platform with product catalog, cart functionality, and secure payment processing.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Stripe API"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    github: "#",
    live: "#",
    timeline: "Jan 2023 - Mar 2023",
    role: "Full Stack Developer"
  },
  {
    id: 2,
    title: "Portfolio Dashboard",
    description: "An interactive dashboard for financial portfolio tracking with real-time data visualization and analytics.",
    tech: ["Vue.js", "Tailwind CSS", "Chart.js", "Firebase"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    github: "#",
    live: "#",
    timeline: "Apr 2023 - Jun 2023",
    role: "Frontend Developer"
  },
  {
    id: 3,
    title: "Task Management App",
    description: "A productivity app for managing tasks, projects, and team collaboration with drag-and-drop functionality.",
    tech: ["React", "Redux", "Node.js", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    github: "#",
    live: "#",
    timeline: "Jul 2023 - Sep 2023",
    role: "Lead Developer"
  }
];

const Projects = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
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
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center">
              <span className="text-secondary mr-2">02.</span> My Projects
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Here's a selection of my recent work. Each project reflects my passion for creating 
              intuitive user interfaces and functional applications.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-16">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} variants={itemVariants} />
            ))}
          </div>

          <motion.div variants={itemVariants} className="mt-16 text-center">
            <Button 
              asChild
              variant="outline"
              className="px-6 py-6 bg-transparent border-2 border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary transition duration-300"
            >
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                View More Projects
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const ProjectCard = ({ 
  project, 
  index, 
  variants 
}: { 
  project: typeof projects[0], 
  index: number, 
  variants: any 
}) => {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div 
      variants={variants} 
      className="project-card group relative grid grid-cols-1 lg:grid-cols-2 gap-8 rounded-2xl overflow-hidden"
    >
      {/* Project Image */}
      <motion.div 
        className={`relative overflow-hidden ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <div className="flex gap-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <Button size="icon" className="rounded-full bg-white/20 backdrop-blur-sm border-white/40 hover:bg-white/30" asChild>
              <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                <Github className="w-5 h-5 text-white" />
              </a>
            </Button>
            <Button size="icon" className="rounded-full bg-white/20 backdrop-blur-sm border-white/40 hover:bg-white/30" asChild>
              <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label="Live Project">
                <ExternalLink className="w-5 h-5 text-white" />
              </a>
            </Button>
          </div>
        </div>
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-80 object-cover object-center rounded-xl shadow-lg transition-transform duration-500 group-hover:scale-105"
        />
      </motion.div>
      
      {/* Project Description */}
      <div className={`flex flex-col justify-center ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
        <div className="flex items-center mb-2">
          <div className="w-10 h-0.5 bg-secondary mr-3"></div>
          <h3 className="text-sm font-medium text-secondary">Featured Project</h3>
        </div>
        
        <h3 className="text-2xl lg:text-3xl font-bold mb-4">{project.title}</h3>
        
        <div className="bg-gray-50/80 backdrop-blur-sm p-6 rounded-xl shadow-sm mb-6">
          <p className="text-gray-700">{project.description}</p>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech, i) => (
            <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-secondary/20 transition-colors duration-200">{tech}</span>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-secondary" />
            <span>{project.timeline}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2 text-secondary" />
            <span>{project.role}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
