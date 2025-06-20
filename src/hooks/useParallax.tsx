import { useState, useEffect } from 'react';

/**
 * A hook that creates mouse-based parallax effect
 */
export const useMouseParallax = (
  factor: number = 0.1,
  shouldInvert: boolean = false,
) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  useEffect(() => {
    // Skip effect if user prefers reduced motion
    if (prefersReducedMotion) return;

    const updateMousePosition = (e: MouseEvent) => {
      // Get the center of the window
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Calculate distance from center
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      // Apply factor and invert if needed
      const factorX = distanceX * factor * (shouldInvert ? -1 : 1);
      const factorY = distanceY * factor * (shouldInvert ? -1 : 1);

      setPosition({ x: factorX, y: factorY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, [factor, shouldInvert, prefersReducedMotion]);

  // Return zero movement if user prefers reduced motion
  if (prefersReducedMotion) {
    return { x: 0, y: 0 };
  }

  return position;
};

export default useMouseParallax;
