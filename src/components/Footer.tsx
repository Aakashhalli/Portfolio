
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white py-8 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600">&copy; 2025 Akash Halli. All rights reserved.</p>
          </div>
          
          <div className="flex space-x-4">
            <SocialLink href="mailto:akash.halli@example.com" aria-label="Email">
              <Mail className="h-5 w-5" />
            </SocialLink>
            <SocialLink href="https://github.com" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </SocialLink>
            <SocialLink href="https://linkedin.com" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </SocialLink>
            <SocialLink href="https://twitter.com" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </SocialLink>
          </div>
        </div>
        
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>"Creativity is intelligence having fun." - Albert Einstein</p>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ 
  href, 
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { 
  children: React.ReactNode 
}) => {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-secondary hover:text-white transition-colors duration-300"
      {...props}
    >
      {children}
    </a>
  );
};

export default Footer;
