import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown, Code } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NavigationMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      name: "Quem sou",
      path: "/#Quem Sou",
      dropdownItems: [
        { name: "Sobre Mim", path: "/#sobre" },
        { name: "Missão", path: "/#missao" },
        { name: "Valores", path: "/#valores" },
      ],
    },
    {
      name: "Experiências",
      path: "/#Experiências",
      dropdownItems: [
        { name: "Profissional", path: "/#profissional" },
        { name: "Acadêmica", path: "/#academica" },
      ],
    },
    { name: "Projetos", path: "/#Projetos" },
    { name: "Serviços", path: "/#Serviços" },
    { name: "Conhecimentos", path: "/#Conhecimentos" },
    { 
      name: "Landing Page Builder", 
      path: "/landing-page-builder",
      icon: <Code className="w-3 h-3 mr-1" />
    },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-150 py-2 px-3 md:px-6",
        scrolled 
          ? "bg-gray-900/90 backdrop-blur-sm border-b border-gray-800/50" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center h-9">
        <Link
          to="/"
          className="text-lg font-bold text-white shrink-0"
        >
          <span className="text-blue-500">i</span>
          <span className="text-white">devs_</span>
          <span className="text-red-500">404</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-5">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative group"
              onMouseEnter={() => setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={item.path}
                className="flex items-center text-white/80 hover:text-blue-400 font-medium text-xs uppercase tracking-wide"
              >
                {item.icon && item.icon}
                {item.name}
                {item.dropdownItems && <ChevronDown className="ml-0.5 h-2.5 w-2.5" />}
              </Link>

              {item.dropdownItems && activeDropdown === item.name && (
                <motion.div
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  className="absolute top-full left-0 mt-1 w-36 bg-gray-800/90 backdrop-blur-sm rounded-sm shadow py-1"
                >
                  {item.dropdownItems.map((dropdownItem) => (
                    <Link
                      key={dropdownItem.name}
                      to={dropdownItem.path}
                      className="block px-2.5 py-1 text-xs text-white/75 hover:bg-blue-500/10 hover:text-blue-400 transition-colors"
                    >
                      {dropdownItem.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden text-white/80 hover:text-white transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="md:hidden fixed inset-0 top-[44px] bg-gray-900/95 backdrop-blur z-40"
            >
              <ul className="flex flex-col p-4 space-y-2">
                {navItems.map((item) => (
                  <li key={item.name} className="w-full">
                    <div className="flex flex-col w-full">
                      <Link
                        to={item.path}
                        className="flex items-center text-xs uppercase tracking-wide font-medium text-white/80 hover:text-blue-400 transition-colors py-1"
                        onClick={() => !item.dropdownItems && setIsOpen(false)}
                      >
                        {item.icon && item.icon}
                        {item.name}
                      </Link>
                      {item.dropdownItems && (
                        <div className="ml-2 mt-0.5 space-y-1">
                          {item.dropdownItems.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.path}
                              className="block text-white/70 hover:text-blue-400 transition-colors py-0.5 text-xs"
                              onClick={() => setIsOpen(false)}
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default NavigationMenu;
