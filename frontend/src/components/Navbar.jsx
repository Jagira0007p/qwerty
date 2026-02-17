import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome,
  FiInfo,
  FiBriefcase,
  FiMail,
  FiFileText,
  FiMenu,
  FiX,
} from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20); // Reduced threshold for earlier blur
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/", icon: <FiHome className="w-4 h-4" /> },
    { name: "About", path: "/about", icon: <FiInfo className="w-4 h-4" /> },
    {
      name: "Services",
      path: "/services",
      icon: <FiBriefcase className="w-4 h-4" />,
    },
    { name: "Contact", path: "/contact", icon: <FiMail className="w-4 h-4" /> },
    {
      name: "Project",
      path: "/project-request",
      icon: <FiFileText className="w-4 h-4" />,
    },
  ];

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled || isOpen
            ? "bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-[#222222] shadow-lg"
            : "bg-transparent"
        }`}
        style={{
          backdropFilter: scrolled || isOpen ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled || isOpen ? "blur(12px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-xl md:text-2xl font-display font-bold tracking-tight"
              >
                <span className="text-text-primary">QWERTY</span>
                <span className="text-text-tertiary ml-2">Infosys</span>
              </motion.div>
            </Link>

            {/* Desktop Navigation with Icons */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`group flex items-center space-x-2 text-sm font-medium tracking-wide transition-all duration-300 hover:text-text-primary ${
                      isActive ? "text-text-primary" : "text-text-tertiary"
                    }`}
                  >
                    <span
                      className={`transition-colors duration-300 ${
                        isActive
                          ? "text-text-primary"
                          : "text-text-tertiary group-hover:text-text-primary"
                      }`}
                    >
                      {link.icon}
                    </span>
                    <span>{link.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-text-primary"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-text-secondary hover:text-text-primary transition-colors p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <FiX className="h-5 w-5" />
              ) : (
                <FiMenu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation with Icons */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.2, 0.9, 0.3, 1] }}
              className="md:hidden overflow-hidden bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-[#222222]"
              style={{
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                        isActive
                          ? "bg-[#222222] text-text-primary"
                          : "text-text-tertiary hover:bg-[#1A1A1A] hover:text-text-primary"
                      }`}
                    >
                      <span
                        className={
                          isActive ? "text-text-primary" : "text-text-tertiary"
                        }
                      >
                        {link.icon}
                      </span>
                      <span className="text-sm font-medium">{link.name}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeMobileNav"
                          className="ml-auto w-1 h-1 rounded-full bg-text-primary"
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer to prevent content from hiding under navbar */}
      <div className="h-16 md:h-20" />
    </>
  );
};

export default Navbar;
