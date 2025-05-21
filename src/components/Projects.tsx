
import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink } from 'lucide-react';

// Sample project data, would typically come from a CMS or data file
const projects = [
  {
    id: 1,
    title: "E-Commerce Website",
    description: "A full-featured e-commerce platform with product catalog, cart functionality, and secure payment processing.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Stripe API"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    github: "#",
    live: "#"
  },
  {
    id: 2,
    title: "Portfolio Dashboard",
    description: "An interactive dashboard for financial portfolio tracking with real-time data visualization and analytics.",
    tech: ["Vue.js", "Tailwind CSS", "Chart.js", "Firebase"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    github: "#",
    live: "#"
  },
  {
    id: 3,
    title: "Task Management App",
    description: "A productivity app for managing tasks, projects, and team collaboration with drag-and-drop functionality.",
    tech: ["React", "Redux", "Node.js", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    github: "#",
    live: "#"
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} variants={itemVariants} />
            ))}
          </div>

          <motion.div variants={itemVariants} className="mt-12 text-center">
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
  return (
    <motion.div 
      variants={variants} 
      className="project-card group"
      whileHover={{ y: -5 }}
    >
      <div className="relative h-60 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition-opacity duration-300 z-10 flex items-center justify-center">
          <div className="flex gap-4">
            <Button size="icon" variant="outline" asChild className="rounded-full bg-white/20 border-white/40 backdrop-blur-sm">
              <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                <Github className="w-5 h-5 text-white" />
              </a>
            </Button>
            <Button size="icon" variant="outline" asChild className="rounded-full bg-white/20 border-white/40 backdrop-blur-sm">
              <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label="Live Project">
                <ExternalLink className="w-5 h-5 text-white" />
              </a>
            </Button>
          </div>
        </div>
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech, i) => (
            <span key={i} className="text-xs px-3 py-1 bg-gray-100 rounded-full">{tech}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
