import { ReactNode } from 'react';
import PageTransition from './PageTransition';
import AdvancedPageTransition from './AdvancedPageTransition';
import { useAccessibility } from '../contexts/AccessibilityContext';

interface AnimatedLayoutProps {
  children: ReactNode;
  pageTransitionType?: 'simple' | 'advanced';
  transitionVariant?: // Simple transitions
  | 'fade'
    | 'slide'
    | 'scale'
    | 'flip'
    | 'reveal'
    // Advanced transitions
    | 'morph'
    | 'stagger'
    | 'wave'
    | 'portal'
    | 'glitch';
}

const AnimatedLayout = ({
  children,
  pageTransitionType = 'simple',
  transitionVariant = 'fade',
}: AnimatedLayoutProps) => {
  const { reducedMotion } = useAccessibility?.() || { reducedMotion: false };

  // Determine which transition component to use
  const getTransitionComponent = () => {
    // If reduced motion is preferred, don't use transitions
    if (reducedMotion) {
      return <>{children}</>;
    }

    if (pageTransitionType === 'advanced') {
      const advancedVariant =
        transitionVariant === 'fade' ||
        transitionVariant === 'slide' ||
        transitionVariant === 'scale' ||
        transitionVariant === 'flip' ||
        transitionVariant === 'reveal'
          ? 'morph'
          : (transitionVariant as
              | 'morph'
              | 'stagger'
              | 'wave'
              | 'portal'
              | 'glitch');

      return (
        <AdvancedPageTransition transitionType={advancedVariant}>
          {children}
        </AdvancedPageTransition>
      );
    } else {
      const simpleVariant =
        transitionVariant === 'morph' ||
        transitionVariant === 'stagger' ||
        transitionVariant === 'wave' ||
        transitionVariant === 'portal' ||
        transitionVariant === 'glitch' ||
        transitionVariant === 'scale' ||
        transitionVariant === 'flip' ||
        transitionVariant === 'reveal'
          ? 'fade'
          : (transitionVariant as 'fade' | 'slide' | 'morph' | 'portal' | 'glitch');

      return (
        <PageTransition type={simpleVariant}>
          {children}
        </PageTransition>
      );
    }
  };

  return getTransitionComponent();
};

export default AnimatedLayout;
