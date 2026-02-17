import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Check if we're on mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // Force scroll to top with multiple methods for better mobile support
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0; // For Safari
    
    // Use instant behavior on mobile, smooth on desktop
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: isMobile ? "instant" : "smooth",
    });

    // Additional timeout for mobile to ensure scroll completes
    if (isMobile) {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;