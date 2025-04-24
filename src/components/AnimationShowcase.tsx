import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { useMouseParallax } from '../hooks/useParallax';

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
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Animações Disponíveis
      </h2>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex shadow-sm rounded-md">
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
        <span className="text-sm uppercase tracking-wider text-gray-500">
          Mova o mouse para ver o efeito parallax
        </span>
      </motion.div>

      {activeTab === 'page' ? (
        <div>
          <h3 className="text-xl font-medium mb-6">Transições Simples</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {simpleTransitions.map((transition) => (
              <div
                key={transition}
                className="bg-white/10 backdrop-blur-md rounded-lg p-6 shadow hover:shadow-lg transition-shadow cursor-pointer border border-white/20"
                onClick={() => handleTransitionSelect('simple', transition)}
              >
                <h4 className="text-lg font-medium mb-2 capitalize">
                  {transition}
                </h4>
                <p className="text-sm text-gray-400">
                  Transição com efeito de {transition}
                </p>
                <div className="mt-4 flex justify-end">
                  <button
                    className="bg-modern-accent/80 hover:bg-modern-accent text-white px-3 py-1 rounded text-sm transition-colors"
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

          <h3 className="text-xl font-medium mb-6">Transições Avançadas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advancedTransitions.map((transition) => (
              <div
                key={transition}
                className="bg-white/10 backdrop-blur-md rounded-lg p-6 shadow hover:shadow-lg transition-shadow cursor-pointer border border-white/20"
                onClick={() => handleTransitionSelect('advanced', transition)}
              >
                <h4 className="text-lg font-medium mb-2 capitalize">
                  {transition}
                </h4>
                <p className="text-sm text-gray-400">
                  Transição avançada com efeito de {transition}
                </p>
                <div className="mt-4 flex justify-end">
                  <button
                    className="bg-modern-accent/80 hover:bg-modern-accent text-white px-3 py-1 rounded text-sm transition-colors"
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
          <h3 className="text-xl font-medium mb-6">Animações de Scroll</h3>
          <div className="space-y-24 my-16">
            {scrollAnimations.map((animation, index) => (
              <ScrollReveal
                key={animation}
                animation={animation as any}
                direction={index % 2 === 0 ? 'up' : 'left'}
                duration={0.7}
                delay={0.1}
              >
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 shadow-lg border border-white/20">
                  <h4 className="text-xl font-medium mb-4 capitalize">
                    {animation}
                  </h4>
                  <p className="text-gray-300">
                    Esta é uma demonstração da animação de scroll com efeito de{' '}
                    <span className="text-modern-accent font-medium">
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
