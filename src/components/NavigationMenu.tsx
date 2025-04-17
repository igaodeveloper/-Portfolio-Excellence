import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NavigationMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4 px-6 md:px-12",
        scrolled ? "bg-gray-900 shadow-lg" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold transition-colors text-white"
        >
          <span className="text-blue-600">Port</span>
          <span className="text-white">dev</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative group"
              onMouseEnter={() => setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={item.path}
                className="flex items-center text-white hover:text-blue-600 transition-colors font-medium text-sm"
              >
                {item.name}
                {item.dropdownItems && <ChevronDown className="ml-1 h-4 w-4" />}
              </Link>

              {item.dropdownItems && activeDropdown === item.name && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2"
                >
                  {item.dropdownItems.map((dropdownItem) => (
                    <Link
                      key={dropdownItem.name}
                      to={dropdownItem.path}
                      className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors"
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
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-0 top-16 bg-gray-900 z-40"
            >
              <ul className="flex flex-col items-start p-6 space-y-4">
                {navItems.map((item) => (
                  <li key={item.name} className="w-full">
                    <div className="flex flex-col w-full">
                      <Link
                        to={item.path}
                        className="text-lg font-medium text-white hover:text-blue-600 transition-colors py-2"
                        onClick={() =>
                          !item.dropdownItems && setIsOpen(false)
                        }
                      >
                        {item.name}
                      </Link>
                      {item.dropdownItems && (
                        <div className="ml-4 mt-2 space-y-2">
                          {item.dropdownItems.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.path}
                              className="block text-white hover:text-blue-600 transition-colors py-1 text-sm"
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
