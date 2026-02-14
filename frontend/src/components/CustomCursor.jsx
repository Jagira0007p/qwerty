// src/components/CustomCursor.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    const handleLinkHoverStart = () => setLinkHovered(true);
    const handleLinkHoverEnd = () => setLinkHovered(false);

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);

    // Add hover effect to links
    const links = document.querySelectorAll("a, button, .cursor-pointer");
    links.forEach((el) => {
      el.addEventListener("mouseenter", handleLinkHoverStart);
      el.addEventListener("mouseleave", handleLinkHoverEnd);
    });

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);

      links.forEach((el) => {
        el.removeEventListener("mouseenter", handleLinkHoverStart);
        el.removeEventListener("mouseleave", handleLinkHoverEnd);
      });
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      <motion.div
        className="fixed w-8 h-8 border-2 border-accent/50 rounded-full pointer-events-none z-[999] 
                   backdrop-blur-sm hidden md:block"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: linkHovered ? 1.5 : 1,
          borderColor: linkHovered ? "#7DD3FC" : "#7DD3FC80",
          backgroundColor: linkHovered ? "#7DD3FC10" : "transparent",
        }}
        transition={{
          type: "spring",
          mass: 0.2,
          stiffness: 100,
          damping: 20,
        }}
      />
      <motion.div
        className="fixed w-2 h-2 bg-accent rounded-full pointer-events-none z-[999] hidden md:block"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: linkHovered ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          mass: 0.1,
          stiffness: 200,
          damping: 15,
        }}
      />
    </>
  );
};

export default CustomCursor; // ✅ Added default export
