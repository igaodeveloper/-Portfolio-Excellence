import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { useMouseParallax } from '../hooks/useParallax';
import ParallaxScrollShowcase from './ParallaxScrollShowcase';

interface AnimationShowcaseProps {
  onTransitionChange?: (type: 'simple' | 'advanced', variant: string) => void;
}

const AnimationShowcase = ({ onTransitionChange }: AnimationShowcaseProps) => {
  const [activeTab, setActiveTab] = useState<'page' | 'scroll'>('page');
  const mouseParallax = useMouseParallax(0.05);

  const simpleTransitions = ['fade', 'slide', 'scale', 'flip', 'reveal'];
  const advancedTransitions = ['morph', 'stagger', 'wave', 'portal', 'glitch'];
  const scrollAnimations = ['fade', 'slide', 'zoom', 'flip', 'rotate'];

  const handleTransitionSelect = (
    type: 'simple' | 'advanced',
    variant: string,
  ) => {
    if (onTransitionChange) {
      onTransitionChange(type, variant);
    }
  };

  return (
    <div className="container px-4 py-12 mx-auto">
      <h2 className="mb-8 text-3xl font-bold text-center">
        Animações Disponíveis
      </h2>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-md shadow-sm">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-md ${
              activeTab === 'page'
                ? 'bg-modern-accent text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('page')}
          >
            Transições de Página
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-md ${
              activeTab === 'scroll'
                ? 'bg-modern-accent text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('scroll')}
          >
            Animações de Scroll
          </button>
        </div>
      </div>

      {/* Parallax title */}
      <motion.div
        className="mb-12 text-center"
        style={{
          x: mouseParallax.x,
          y: mouseParallax.y,
        }}
        transition={{
          type: 'spring',
          stiffness: 75,
          damping: 30,
        }}
      >
        <span className="text-sm tracking-wider text-gray-500 uppercase">
          Mova o mouse para ver o efeito parallax
        </span>
      </motion.div>

      {/* Parallax Scroll Showcase */}
      <div className="mb-16">
        <h3 className="mb-4 text-xl font-bold text-center text-modern-accent">Parallax Scroll Avançado</h3>
        <ParallaxScrollShowcase />
      </div>

      {activeTab === 'page' ? (
        <div>
          <h3 className="mb-6 text-xl font-medium">Transições Simples</h3>
          <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2 lg:grid-cols-3">
            {simpleTransitions.map((transition) => (
              <div
                key={transition}
                className="p-6 transition-shadow border rounded-lg shadow cursor-pointer bg-white/10 backdrop-blur-md hover:shadow-lg border-white/20"
                onClick={() => handleTransitionSelect('simple', transition)}
              >
                <h4 className="mb-2 text-lg font-medium capitalize">
                  {transition}
                </h4>
                <p className="text-sm text-gray-400">
                  Transição com efeito de {transition}
                </p>
                <div className="flex justify-end mt-4">
                  <button
                    className="px-3 py-1 text-sm text-white transition-colors rounded bg-modern-accent/80 hover:bg-modern-accent"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTransitionSelect('simple', transition);
                    }}
                  >
                    Aplicar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h3 className="mb-6 text-xl font-medium">Transições Avançadas</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {advancedTransitions.map((transition) => (
              <div
                key={transition}
                className="p-6 transition-shadow border rounded-lg shadow cursor-pointer bg-white/10 backdrop-blur-md hover:shadow-lg border-white/20"
                onClick={() => handleTransitionSelect('advanced', transition)}
              >
                <h4 className="mb-2 text-lg font-medium capitalize">
                  {transition}
                </h4>
                <p className="text-sm text-gray-400">
                  Transição avançada com efeito de {transition}
                </p>
                <div className="flex justify-end mt-4">
                  <button
                    className="px-3 py-1 text-sm text-white transition-colors rounded bg-modern-accent/80 hover:bg-modern-accent"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTransitionSelect('advanced', transition);
                    }}
                  >
                    Aplicar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h3 className="mb-6 text-xl font-medium">Animações de Scroll</h3>
          <div className="my-16 space-y-24">
            {scrollAnimations.map((animation, index) => (
              <ScrollReveal
                key={animation}
                animation={animation as any}
                direction={index % 2 === 0 ? 'up' : 'left'}
                duration={0.7}
                delay={0.1}
              >
                <div className="p-8 border rounded-lg shadow-lg bg-white/10 backdrop-blur-md border-white/20">
                  <h4 className="mb-4 text-xl font-medium capitalize">
                    {animation}
                  </h4>
                  <p className="text-gray-300">
                    Esta é uma demonstração da animação de scroll com efeito de{' '}
                    <span className="font-medium text-modern-accent">
                      {animation}
                    </span>
                    . Continue descendo a página para ver mais efeitos.
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimationShowcase;
