import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Detect if on mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // Force immediate scroll to top
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0; // For Safari

    // Use multiple timeouts for mobile to ensure DOM is ready
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: isMobile ? "auto" : "smooth",
      });
    };

    // Immediate scroll
    scrollToTop();

    // First timeout - after a tiny delay
    const timeout1 = setTimeout(scrollToTop, 50);

    // Second timeout - after DOM likely updated
    const timeout2 = setTimeout(scrollToTop, 100);

    // Third timeout - final check
    const timeout3 = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 200);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;
