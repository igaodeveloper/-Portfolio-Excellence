import { useScrollContext } from '../components/SmoothScroll';

export const useParallax = () => {
  const { scrollY } = useScrollContext();

  const getParallaxProps = () => {
    return { y: -scrollY * 0.1 };
  };

  return {
    parallaxProps: getParallaxProps(),
    scrollY,
  };
};
