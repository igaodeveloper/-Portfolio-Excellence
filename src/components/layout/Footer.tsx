import { Link } from 'react-router-dom';
import {
  Github,
  Twitter,
  Linkedin,
  Heart,
  Mail,
  ArrowUp,
  ExternalLink,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [hovered, setHovered] = useState<string | null>(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      url: 'https://github.com',
      name: 'GitHub',
    },
    {
      icon: <Twitter className="h-5 w-5" />,
      url: 'https://twitter.com',
      name: 'Twitter',
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      url: 'https://linkedin.com',
      name: 'LinkedIn',
    },
    {
      icon: <Mail className="h-5 w-5" />,
      url: 'mailto:contact@example.com',
      name: 'Email',
    },
  ];

  return (
    <motion.footer
      className="border-t bg-background relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
    >
      <div className="absolute inset-x-0 -top-5 flex justify-center">
        <motion.button
          onClick={scrollToTop}
          className="rounded-full p-2 bg-primary text-primary-foreground shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-1"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowUp className="h-4 w-4" />
        </motion.button>
      </div>

      <div className="container mx-auto px-6 py-12 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 md:mb-0">
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-base font-semibold">About</h3>
            <p className="text-sm text-muted-foreground">
              Professional portfolio and development platform built with modern
              technologies to showcase your skills and projects.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-base font-semibold">Quick Links</h3>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/minigame"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Mini Game
                </Link>
              </li>
              <li>
                <Link
                  to="/super-minigame"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Super Minigame
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-base font-semibold">Connect</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="relative flex items-center justify-center p-2 rounded-full bg-background border border-border hover:border-primary hover:text-primary transition-colors"
                  whileHover={{ scale: 1.1 }}
                  onMouseEnter={() => setHovered(link.name)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {link.icon}
                  {hovered === link.name && (
                    <motion.span
                      className="absolute -top-8 px-2 py-1 bg-background border border-border rounded text-xs whitespace-nowrap"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                    >
                      {link.name}
                    </motion.span>
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground"
        >
          <div className="flex items-center">
            <p>© {currentYear} Portfolio Excellence. All rights reserved.</p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="flex items-center gap-1">
              Made with{' '}
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'reverse',
                  duration: 1,
                }}
              >
                <Heart className="h-4 w-4 text-red-500 fill-red-500" />
              </motion.span>
            </p>

            <div className="flex items-center gap-4">
              <a
                href="https://react.dev"
                target="_blank"
                rel="noreferrer"
                className="font-medium hover:text-primary transition-colors inline-flex items-center gap-1"
              >
                React <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href="https://tailwindcss.com"
                target="_blank"
                rel="noreferrer"
                className="font-medium hover:text-primary transition-colors inline-flex items-center gap-1"
              >
                Tailwind <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href="https://www.framer.com/motion/"
                target="_blank"
                rel="noreferrer"
                className="font-medium hover:text-primary transition-colors inline-flex items-center gap-1"
              >
                Framer Motion <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
