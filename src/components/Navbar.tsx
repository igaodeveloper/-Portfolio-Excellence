import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  User,
  Briefcase,
  Code,
  Send,
  Menu,
  X,
  BookOpen,
  FileText,
  Play,
} from 'lucide-react';
import { useAccessibility } from '../contexts/AccessibilityContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { highContrast, toggleHighContrast } = useAccessibility();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Open CV in a new tab
  const openCV = () => {
    window.open('/curriculum.pdf', '_blank');
  };

  // Navigation items with icons
  const navItems = [
    { name: 'Home', icon: <Home className="w-4 h-4" />, href: '#home' },
    { name: 'Sobre', icon: <User className="w-4 h-4" />, href: '#about' },
    {
      name: 'Experiência',
      icon: <Briefcase className="w-4 h-4" />,
      href: '#experience',
    },
    { name: 'Projetos', icon: <Code className="w-4 h-4" />, href: '#projects' },
    { name: 'Contato', icon: <Send className="w-4 h-4" />, href: '#contact' },
    {
      name: 'Blog',
      icon: <BookOpen className="w-4 h-4" />,
      href: '/blog',
      isExternalLink: true,
    },
    {
      name: 'Videos',
      icon: <Play className="w-4 h-4" />,
      href: '/video-player',
      isExternalLink: true,
      highlighted: true,
    },
    {
      name: 'Mini Game',
      icon: <Play className="w-4 h-4 text-yellow-400" />,
      href: '/minigame',
      isExternalLink: true,
    },
    {
      name: 'Super Minigame',
      icon: <Play className="w-4 h-4 text-green-500" />,
      href: '/super-minigame',
      isExternalLink: true,
    },
  ];

  // Smooth scroll or navigate to section
  const scrollToSection = (sectionId: string, isExternalLink = false) => {
    setIsOpen(false);
    if (isExternalLink) return; // Skip scrolling for external links
    if (location.pathname !== '/') {
      // Se não está na home, navega para home com hash
      navigate(`/${sectionId}`);
      return;
    }
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md py-3 shadow-md' : 'bg-transparent py-5'}`}
    >
      <div className="container flex items-center justify-between px-2 mx-auto sm:px-4">
        {/* Logo */}
        <Link to="/" className="text-lg font-bold text-white transition-colors sm:text-xl">
          <span className="text-blue-500">igao</span>
          <span className="text-white">devs_</span>
          <span className="text-red-500">404</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="items-center hidden space-x-1 md:flex">
          {navItems.map((item) =>
            item.isExternalLink ? (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-full text-white/80 hover:text-white flex items-center gap-1.5 text-sm font-medium transition-colors hover:bg-white/10 ${item.highlighted ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ) : (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="px-3 py-2 rounded-full text-white/80 hover:text-white flex items-center gap-1.5 text-sm font-medium transition-colors hover:bg-white/10"
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            ),
          )}

          {/* CV Button */}
          <motion.button
            onClick={openCV}
            className="px-3 py-2 rounded-full text-white/80 hover:text-white flex items-center gap-1.5 text-sm font-medium transition-colors hover:bg-white/10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FileText className="w-4 h-4" />
            <span>Currículo</span>
          </motion.button>

          {/* Animated Programming Button */}
          <motion.button
            onClick={toggleHighContrast}
            className="p-2 ml-2 transition-colors rounded-full text-white/80 hover:text-white hover:bg-white/10"
            aria-label="Programming Mode"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
          >
            <span className="font-mono text-xl">{`{}`}</span>
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <motion.button
            onClick={toggleHighContrast}
            className="mr-2 p-2 min-w-[44px] min-h-[44px] rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-modern-accent"
            aria-label="Programming Mode"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
          >
            <span className="font-mono text-xl">{`{}`}</span>
          </motion.button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 min-w-[44px] min-h-[44px] rounded-full hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-modern-accent"
            aria-label="Open menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute left-0 right-0 z-50 w-full max-w-full px-2 py-4 shadow-lg top-full bg-black/90 backdrop-blur-md md:hidden"
        >
          <div className="flex flex-col space-y-2 sm:space-y-3">
            {navItems.map((item) =>
              item.isExternalLink ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-3 sm:px-4 rounded-lg text-white/80 hover:text-white flex items-center gap-2 transition-colors hover:bg-white/10 w-full text-base ${item.highlighted ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}
                  style={{ minHeight: 44 }}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ) : (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="flex items-center w-full gap-2 px-3 py-3 text-base transition-colors rounded-lg sm:px-4 text-white/80 hover:text-white hover:bg-white/10"
                  style={{ minHeight: 44 }}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </button>
              ),
            )}
            {/* CV Button Mobile */}
            <button
              onClick={openCV}
              className="flex items-center w-full gap-2 px-3 py-3 text-base transition-colors rounded-lg sm:px-4 text-white/80 hover:text-white hover:bg-white/10"
              style={{ minHeight: 44 }}
            >
              <FileText className="w-4 h-4" />
              <span>Currículo</span>
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
