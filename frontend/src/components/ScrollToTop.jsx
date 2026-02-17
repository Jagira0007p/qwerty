import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Check if we're on mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // Force immediate scroll to top
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0; // For Safari

    // Use a small delay for mobile to ensure DOM is ready
    if (isMobile) {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "auto",
        });

        // Double-check with another timeout
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 100);
      }, 50);
    } else {
      // Smooth scroll for desktop
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }

    // Cleanup timeouts
    return () => {
      const timeouts = setTimeout(() => {}, 0);
      clearTimeout(timeouts);
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;
