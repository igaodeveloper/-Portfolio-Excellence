import { useEffect } from 'react';
import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'fade';

interface UseScrollAnimationProps {
  threshold?: number;
  triggerOnce?: boolean;
  direction?: AnimationDirection;
  delay?: number;
  duration?: number;
}

export const useScrollAnimation = ({
  threshold = 0.1,
  triggerOnce = true,
  direction = 'up',
  delay = 0,
  duration = 0.5,
}: UseScrollAnimationProps = {}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold,
    triggerOnce,
  });

  // Define os valores de animação baseados na direção
  const getAnimationProps = () => {
    const distance = 50;
    
    const variants = {
      hidden: {
        opacity: 0,
        y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
        x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
      },
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1.0], // Curva de bezier para efeito suave
        },
      },
    };

    return variants;
  };

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  return {
    ref,
    controls,
    variants: getAnimationProps(),
    inView,
  };
}; 