import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, User, Briefcase, Code, Send, Menu, X, Moon, Sun, BookOpen } from "lucide-react";
import { useAccessibility } from "../contexts/AccessibilityContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { highContrast, toggleHighContrast } = useAccessibility();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation items with icons
  const navItems = [
    { name: "Home", icon: <Home className="w-4 h-4" />, href: "#home" },
    { name: "Sobre", icon: <User className="w-4 h-4" />, href: "#about" },
    { name: "Experiência", icon: <Briefcase className="w-4 h-4" />, href: "#experience" },
    { name: "Projetos", icon: <Code className="w-4 h-4" />, href: "#projects" },
    { name: "Contato", icon: <Send className="w-4 h-4" />, href: "#contact" },
    { name: "Blog", icon: <BookOpen className="w-4 h-4" />, href: "/blog", isExternalLink: true },
  ];

  // Smooth scroll to section
  const scrollToSection = (sectionId: string, isExternalLink = false) => {
    setIsOpen(false);
    if (isExternalLink) return; // Skip scrolling for external links
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-md py-3 shadow-md" : "bg-transparent py-5"}`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold transition-colors text-white">
          <span className="text-blue-500">igao</span>
          <span className="text-white">devs_</span>
          <span className="text-red-500">404</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            item.isExternalLink ? (
              <Link
                key={item.name}
                to={item.href}
                className="px-3 py-2 rounded-full text-white/80 hover:text-white flex items-center gap-1.5 text-sm font-medium transition-colors hover:bg-white/10"
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
            )
          ))}
          <button
            onClick={toggleHighContrast}
            className="ml-2 p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle high contrast mode"
          >
            {highContrast ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={toggleHighContrast}
            className="mr-2 p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle high contrast mode"
          >
            {highContrast ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
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
          className="absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md shadow-lg py-4 px-4 md:hidden"
        >
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              item.isExternalLink ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className="px-4 py-2 rounded-lg text-white/80 hover:text-white flex items-center gap-2 transition-colors hover:bg-white/10"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ) : (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="px-4 py-2 rounded-lg text-white/80 hover:text-white flex items-center gap-2 transition-colors hover:bg-white/10"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </button>
              )
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
