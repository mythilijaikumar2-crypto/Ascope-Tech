import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Smoothly scroll the window to the very top upon route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Instant behavior prevents visually jarring page transitions
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
