import { useState, useEffect } from 'react';
import { useScroll, useTransform, MotionValue } from 'framer-motion';

interface ParallaxOptions {
  scrollYProgress?: MotionValue<number>;
  range?: [number, number];
  outputRange?: [number, number];
  shouldScaleOppositeDirection?: boolean;
  axis?: 'x' | 'y';
}

/**
 * A hook that creates parallax motion values based on scroll progress
 */
export const useParallax = ({
  scrollYProgress,
  range = [0, 1],
  outputRange = [-100, 100],
  shouldScaleOppositeDirection = false,
  axis = 'y',
}: ParallaxOptions = {}) => {
  // If no scrollYProgress is provided, create one
  const defaultScrollYProgress = useScroll()?.scrollYProgress;
  const scrollProgress = scrollYProgress || defaultScrollYProgress;

  // Respect reduced motion preferences
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

  // If user prefers reduced motion, return zero movement
  if (prefersReducedMotion) {
    return {
      x: { current: 0 },
      y: { current: 0 },
      rotate: { current: 0 },
      scale: { current: 1 },
    };
  }

  // Scale the output range in the opposite direction if needed
  const finalOutputRange = shouldScaleOppositeDirection
    ? [outputRange[1], outputRange[0]]
    : outputRange;

  // Create motion values for different transformations
  const transformValue = useTransform(scrollProgress, range, finalOutputRange);

  // Create motion values for x, y, rotation and scale
  const x = axis === 'x' ? transformValue : { current: 0 };
  const y = axis === 'y' ? transformValue : { current: 0 };
  const rotate = useTransform(scrollProgress, range, [
    0,
    shouldScaleOppositeDirection ? -10 : 10,
  ]);
  const scale = useTransform(scrollProgress, range, [
    1,
    shouldScaleOppositeDirection ? 0.9 : 1.1,
  ]);

  return { x, y, rotate, scale };
};

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

export default useParallax;
