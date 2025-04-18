import { useEffect, useState } from 'react';

interface ParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  reverse?: boolean;
}

export const useParallax = ({
  speed = 0.1,
  direction = 'up',
  reverse = false,
}: ParallaxOptions = {}) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setOffset(scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getParallaxProps = () => {
    const multiplier = reverse ? -1 : 1;
    const parallaxValue = offset * speed * multiplier;

    let transform;

    switch (direction) {
      case 'up':
        transform = { y: -parallaxValue };
        break;
      case 'down':
        transform = { y: parallaxValue };
        break;
      case 'left':
        transform = { x: -parallaxValue };
        break;
      case 'right':
        transform = { x: parallaxValue };
        break;
      default:
        transform = { y: -parallaxValue };
    }

    return transform;
  };

  return {
    parallaxProps: getParallaxProps(),
    scrollY: offset,
  };
};
