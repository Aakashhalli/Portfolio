import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Calendar,
  Users,
  Code,
  Award,
  ExternalLink,
  Eye,
  Images,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect } from "react";

// Sample hackathon project data
const hackathonProjects = [
  {
    id: 1,
    title: "MedChain",
    description:
      "An AI-powered web application that bridges the gap between patients and doctors, offering secure sign-ups, disease predictions, and personalized doctor recommendations.",
    role: "AI/ML",
    achievement:
      "Secured 2nd Place at Advitiya National Technical Fest, KLE Institute of Technology, Hubli",
    date: "Nov 2024",
    technologies: [
      "React",
      "Node.js",
      "Python",
      "Machine Learning",
      "NLP",
      "MiniLM",
      "MongoDB",
    ],
    image: "hackathon1.jpg", // replace with actual project screenshot if available
    gallery: ["hackathon1.jpg", "hackathon1_2.jpg", "hackathon1_3.jpg"],
    challenge:
      "Building a robust and secure healthcare web application that predicts diseases from lab reports using AI and seamlessly connects patients to doctors based on medical specialization.",
    solution:
      "Developed a secure, AI-driven web app with features such as patient and doctor management, disease prediction powered by a custom-trained ML model, and intelligent doctor recommendations based on diagnosis.",
    link: "#",
  },
  {
    id: 2,
    title: "Cryptex Vault",
    description:
      "A blockchain-based platform empowering digital creators to prove, verify, and transfer ownership of digital assets like music, images, and art using secure on-chain records.",
    role: "Full Stack Blockchain Developer",
    achievement: "Built during ACM Student Chapter KLSGIT Hackathon, Belagavi",
    date: "April 2025",
    technologies: [
      "Solidity",
      "Truffle",
      "Ganache",
      "Web3.js",
      "React",
      "TypeScript",
      "MongoDB",
      "Tailwind CSS",
      "MetaMask",
    ],
    image: "hackathon2.png", // replace with actual project screenshot if available
    gallery: ["hackathon2.png", "hackathon2_2.png", "hackathon2_3.png"],
    challenge:
      "Designing a decentralized platform to securely prove and transfer ownership of digital assets, while maintaining scalability and ease of use.",
    solution:
      "Developed a full-stack DApp where digital assets are hashed with SHA, stored on-chain for integrity, and metadata managed via MongoDB. Integrated smart contracts and wallet interactions using Web3.js and MetaMask.",
    link: "#", // add GitHub/demo link here
  },
  {
    id: 3,
    title: "CertifyTrust",
    description:
      "A blockchain-powered platform for tamper-proof academic credential verification using unique QR codes linked to on-chain records.",
    role: "Full Stack Blockchain Developer",
    achievement:
      "Secured 2nd Place at Pleiades 2025 Smart Hackathon, KLE Technological University - Hubli",
    date: "May 2025",
    technologies: [
      "Solidity",
      "Truffle",
      "Ganache",
      "Web3.js",
      "React",
      "TypeScript",
      "MongoDB",
      "Tailwind CSS",
    ],
    image: "hackathon3.png", // replace with actual screenshot if available
    gallery: ["hackathon3.png", "hackathon3_3.png", "hackathon3_2.jpg"],
    challenge:
      "Preventing academic certificate fraud while enabling fast, reliable verification for institutions and employers.",
    solution:
      "Implemented blockchain-backed credential storage and QR code generation to allow instant verification and immutable record keeping. Users can scan and validate authenticity via the platform in real-time.",
    link: "#", // add demo or GitHub repo link here
  },
];

const Hackathons = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [selectedProject, setSelectedProject] = useState<
    null | (typeof hackathonProjects)[0]
  >(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const handleOpenProject = (project: (typeof hackathonProjects)[0]) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  const handleNextImage = () => {
    if (!selectedProject) return;
    setCurrentImageIndex((prev) =>
      prev === selectedProject.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = () => {
    if (!selectedProject) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedProject.gallery.length - 1 : prev - 1
    );
  };

  return (
    <section
      id="hackathons"
      className="section-padding bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center">
              <span className="text-secondary mr-2">03.</span> Hackathons
            </h2>
            {/* <p className="text-lg text-gray-600 max-w-2xl">
              I love participating in hackathons to challenge myself, learn new
              technologies, and collaborate with talented individuals. Here are
              some of my favorite hackathon projects.
            </p> */}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {hackathonProjects.map((project) => (
              <HackathonCard
                key={project.id}
                project={project}
                variants={itemVariants}
                onView={() => handleOpenProject(project)}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Project Details Dialog */}
      {selectedProject && (
        <Dialog open={!!selectedProject} onOpenChange={handleCloseProject}>
          <DialogContent className="max-w-3xl p-0 overflow-hidden rounded-2xl text-justify">
            <div className="max-h-[90vh] overflow-y-auto custom-scrollbar p-8">
              <DialogHeader>
                <DialogTitle className="flex items-center flex-col text-3xl font-bold">
                  {selectedProject.title}
                  {selectedProject.achievement && (
                    <span className="text-sm px-3 py-1 bg-secondary/10 text-secondary text-center rounded-full m-2">
                      <span className="text-secondary mr-2">
                        <Award className="inline-block w-6 h-6" />
                      </span>
                      {selectedProject.achievement}
                    </span>
                  )}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Image Gallery with Navigation */}
                <div className="relative rounded-xl overflow-hidden aspect-video bg-gray-100">
                  <img
                    src={selectedProject.gallery[currentImageIndex]}
                    alt={`${selectedProject.title} screenshot ${
                      currentImageIndex + 1
                    }`}
                    className="w-full h-full object-cover object-center"
                  />

                  {/* Image Navigation */}
                  <div className="absolute inset-0 flex items-center justify-between px-4">
                    <Button
                      onClick={handlePrevImage}
                      size="icon"
                      variant="ghost"
                      className="h-10 w-10 rounded-full bg-black/30 hover:bg-secondary text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-chevron-left"
                      >
                        <path d="m15 18-6-6 6-6" />
                      </svg>
                      <span className="sr-only">Previous</span>
                    </Button>

                    <Button
                      onClick={handleNextImage}
                      size="icon"
                      variant="ghost"
                      className="h-10 w-10 rounded-full bg-black/30 hover:bg-secondary text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-chevron-right"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                      <span className="sr-only">Next</span>
                    </Button>
                  </div>

                  {/* Image Counter */}
                  <div className="absolute bottom-3 right-3 bg-black/50 text-white px-2 py-1 rounded text-sm">
                    {currentImageIndex + 1} / {selectedProject.gallery.length}
                  </div>
                </div>

                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-secondary" />
                  <span className="text-gray-700">{selectedProject.date}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-secondary" />
                  <span className="text-gray-700">{selectedProject.role}</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-14 h-14 mr-2 text-secondary" />
                  <span className="text-gray-700">
                    {selectedProject.achievement}
                  </span>
                </div>
              </div> */}

                <div>
                  <h3 className="text-lg font-medium mb-2">Description</h3>
                  <p className="text-gray-700">{selectedProject.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Challenge</h3>
                    <p className="text-gray-700">{selectedProject.challenge}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Solution</h3>
                    <p className="text-gray-700">{selectedProject.solution}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        <Code className="w-3.5 h-3.5 mr-1 text-secondary" />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedProject.link && (
                  <div className="flex justify-center pt-4">
                    <Button
                      asChild
                      className="bg-secondary text-primary hover:bg-secondary/90"
                    >
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        Visit Project <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

const HackathonCard = ({
  project,
  variants,
  onView,
}: {
  project: (typeof hackathonProjects)[0];
  variants: any;
  onView: () => void;
}) => {
  return (
    <motion.div
      variants={variants}
      // whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col border border-gray-200 text-j">
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 flex items-end">
            <div className="p-4 text-white">
              {/* <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-secondary/90 text-primary font-medium mb-2">
                <Award className="w-3 h-3 mr-1" />
                {project.achievement}
              </span> */}
            </div>
          </div>

          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-110"
          />
        </div>
        <span className="inline-flex items-center px-2 py-1 text-xs rounded-sm h-16 bg-secondary/90 text-primary font-medium mt-4 mx-4">
          <Award className="w-3 h-3 mr-1 min-w-4" />
          {project.achievement}
        </span>
        <CardContent className="flex-grow flex flex-col p-5">
          <h3 className="text-xl font-bold mb-2 text-primary">
            {project.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 flex-grow">
            {project.description}
          </p>

          <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1.5 text-secondary" />
              <span>{project.date}</span>
            </div>
            {/* <div className="flex items-center">
              <Users className="w-4 h-4 mr-1.5 text-secondary" />
              <span>{project.role}</span>
            </div> */}
          </div>

          <Button
            onClick={onView}
            variant="outline"
            className="border-secondary text-secondary hover:bg-secondary/5 w-full group"
          >
            <Eye className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
            View Details
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Hackathons;
