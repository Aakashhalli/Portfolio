import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { databases } from "../config/appwriteConfig";
import { toast } from "sonner";
import { Client } from "appwrite";
const Connect = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
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
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };
  const client = new Client();
  client
    .setEndpoint("https://fra.cloud.appwrite.io/v1")
    .setProject("682ffe8400340dc2bd67");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nameInput = document.getElementById("name") as HTMLInputElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const subjectInput = document.getElementById("subject") as HTMLInputElement;
    const messageInput = document.getElementById(
      "message"
    ) as HTMLTextAreaElement;

    const name = nameInput.value;
    const email = emailInput.value;
    const subject = subjectInput.value;
    const message = messageInput.value;

    try {
      const response = await databases.createDocument(
        "682fff490038856660e6", // database ID
        "682fff50000f1f169359", // collection ID
        "unique()",
        { name, email, subject, message }
      );
      console.log("Message stored:", response);
      toast.success("Message sent successfully!");

      nameInput.value = "";
      emailInput.value = "";
      subjectInput.value = "";
      messageInput.value = "";
    } catch (error) {
      console.error("Error storing message:", error);
      toast.error("Failed to send message. Please try again.");
    }
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
            <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center ">
              I'm always open to new opportunities, collaborations. Feel free to
              reach out through any of the channels below!
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
                      placeholder="Full Name"
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
                      placeholder="Email Address"
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
                    placeholder="More..."
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
                <h3 className="text-2xl font-semibold mb-6">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-secondary/20 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <a
                        href="mailto:akashhallidev@gmail.com"
                        className="text-gray-600 hover:text-secondary transition-colors"
                      >
                        akashhallidev@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-secondary/20 p-3 rounded-full">
                      <Linkedin className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-medium">LinkedIn</h4>
                      <a
                        href="https://www.linkedin.com/in/akash-halli-3ab6aa231/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-secondary transition-colors"
                      >
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
                      <a
                        href="https://github.com/Aakashhalli"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-secondary transition-colors"
                      >
                        github.com/Aakashhalli
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-secondary/20 p-3 rounded-full">
                      <Twitter className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Twitter</h4>
                      <a
                        href="https://x.com/HalliAkash?t=x9hQ4sbZta-G271tEzODog&s=09"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-secondary transition-colors"
                      >
                        @HalliAkash
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
