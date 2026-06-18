import { useState, useEffect, useRef } from 'react';

export function useScrollNavBar(threshold = 100) {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Clear previous timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Debounce the scroll event for performance
      scrollTimeoutRef.current = setTimeout(() => {
        const scrollY = window.scrollY;
        setIsScrolled(scrollY > threshold);
      }, 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Check initial scroll position on mount
    setIsScrolled(window.scrollY > threshold);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [threshold]);

  return isScrolled;
}
