import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Github, ExternalLink, Calendar, Users, Code, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Sample project data, would typically come from a CMS or data file
const projects = [
  {
    id: 1,
    title: "AlgoVisual",
    description:
      "An interactive React.js application was created to illustrate graph traversal and shortest path algorithms such as Bellman-Ford and Dijkstra, adapted the application with an accessible user interface for students.",
    tech: ["React.js", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    image: "algovisual2.png",
    github: "https://github.com/Aakashhalli/Algovisual",
    live: "#",
    timeline: "Jan 2023 - Mar 2023",
    role: "Full Stack Developer",
  },
  {
    id: 2,
    title: "HireAI",
    description:
      "Hire-Al aims to bridge this gap by providing a unified, student-centered platform that integrates LLM-based learning, resume assistance, mock interviews, and career guidance, making placement prep smarter and more efficient.",
    tech: ["Gemini API", "React.js", "Typtescript", "Tailwind CSS"],
    image: "hireai.png",
    github: "https://github.com/Aakashhalli/HireAI",
    live: "#",
    timeline: "Apr 2023 - Jun 2023",
    role: "Frontend Developer",
  },
  {
    id: 3,
    title:
      "Exploratory Data Analysis and Machine Learning Classification of Chronic Kidney Disease: Insights into Causes and Complications",
    description:
      "Research paper publication in 10th International Conference on Signal Processing and Communication (ICSC), Noida, India, 2025.",
    tech: ["CKD", "Exploratory Data Analysis", "Machine Learning"],
    image: "./eda.png",
    github: "https://ieeexplore.ieee.org/abstract/document/10967962",
    live: "",
    timeline: "Jul 2023 - Sep 2023",
    role: "Lead Developer",
  },
];

const Projects = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
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
            {/* <p className="text-lg text-gray-600 max-w-2xl">
              Here's a selection of my recent work. Each project reflects my passion for creating 
              intuitive user interfaces and functional applications.
            </p> */}
          </motion.div>

          <div className="grid grid-cols-1 gap-16">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                variants={itemVariants}
              />
            ))}
          </div>

          <motion.div variants={itemVariants} className="mt-16 text-center">
            <Button
              asChild
              className="relative overflow-hidden group px-8 py-6 bg-transparent border-2 border-secondary text-secondary hover:bg-secondary/5 transition-all duration-300"
            >
              <a
                href="https://github.com/Aakashhalli"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <span>View More Projects</span>
                <motion.div
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Github className="w-5 h-5" />
                </motion.div>
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-secondary"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
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
  variants,
}: {
  project: (typeof projects)[0];
  index: number;
  variants: any;
}) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      variants={variants}
      className="project-card group relative grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 rounded-2xl overflow-hidden px-4 sm:px-6 lg:px-7 py-6 items-center max-w-full"
    >
      {/* Project Image */}
      <Card
        className={`col-span-12 lg:col-span-6 ${
          isEven ? "lg:order-1" : "lg:order-2"
        } overflow-hidden relative h-[85%] border-none shadow-lg `}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
          <div className="flex gap-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
            <Button
              size="icon"
              className="rounded-full bg-white/20 backdrop-blur-sm border border-white/40 hover:bg-white/30 transform hover:scale-110 transition-all duration-300"
              asChild
            >
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Repository"
              >
                <ExternalLink className="w-5 h-5 text-white" />
              </a>
            </Button>
            {/* <Button
              size="icon"
              className="rounded-full bg-white/20 backdrop-blur-sm border border-white/40 hover:bg-white/30 transform hover:scale-110 transition-all duration-300"
              asChild
            >
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Live Project"
              >
                <ExternalLink className="w-5 h-5 text-white" />
              </a>
            </Button> */}
          </div>
        </div>
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-auto max-w-full object-cover object-center "
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
        />
      </Card>

      {/* Project Description */}
      <div
        className={`col-span-12 lg:col-span-6 ${
          isEven ? "lg:order-2" : "lg:order-1"
        } flex flex-col justify-center`}
      >
        <div className="flex items-center mb-2">
          <div className="h-px w-12 bg-secondary mr-3"></div>
          <motion.h3
            className="text-sm uppercase tracking-wider font-medium text-secondary"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Featured Project
          </motion.h3>
        </div>

        <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-primary bg-gradient-to-r from-primary to-secondary bg-clip-text">
          {project.title}
        </h3>

        <Card className="mb-6 group-hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <p className="text-gray-700 text-justify">{project.description}</p>
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech, i) => (
            <motion.span
              key={i}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-secondary/20 transition-colors duration-200 cursor-default"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgb(172, 255, 231, 0.3)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600">
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <Calendar className="w-4 h-4 mr-2 text-secondary" />
            <span>{project.timeline}</span>
          </motion.div>
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <Users className="w-4 h-4 mr-2 text-secondary" />
            <span>{project.role}</span>
          </motion.div>
        </div> */}
      </div>
    </motion.div>
  );
};

export default Projects;
