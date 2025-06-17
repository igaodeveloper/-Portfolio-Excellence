import { useScrollContext } from '../components/SmoothScroll';

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
  const { scrollY } = useScrollContext();

  const getParallaxProps = () => {
    const multiplier = reverse ? -1 : 1;
    const parallaxValue = scrollY * speed * multiplier;

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
    scrollY,
  };
};
