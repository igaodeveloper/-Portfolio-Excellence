import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimationShowcase from '../components/AnimationShowcase';
import ScrollReveal from '../components/ScrollReveal';
import { useMouseParallax } from '../hooks/useParallax';

const AnimationDemo = () => {
  const [transitionType, setTransitionType] = useState<'simple' | 'advanced'>(
    'advanced',
  );
  const [transitionVariant, setTransitionVariant] = useState('morph');
  const navigate = useNavigate();
  const mouseParallax = useMouseParallax(0.02, false);

  const handleTransitionChange = (
    type: 'simple' | 'advanced',
    variant: string,
  ) => {
    setTransitionType(type);
    setTransitionVariant(variant);

    // Store the selected transition in localStorage to be used across pages
    localStorage.setItem('preferredTransitionType', type);
    localStorage.setItem('preferredTransitionVariant', variant);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 text-white">
      <header className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40"></div>
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white/5 rounded-full"
              style={{
                width: Math.random() * 200 + 50,
                height: Math.random() * 200 + 50,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                x: mouseParallax.x * (i % 3 === 0 ? 2 : i % 3 === 1 ? -1 : 0.5),
                y: mouseParallax.y * (i % 3 === 0 ? -1 : i % 3 === 1 ? 2 : 0.5),
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 1, delay: i * 0.1 }}
            />
          ))}
        </div>

        <motion.div
          className="container mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
            style={{
              x: mouseParallax.x * 0.5,
              y: mouseParallax.y * 0.5,
            }}
          >
            Animações de{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-indigo-400 to-purple-500">
              Transição
            </span>
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl mb-8 max-w-2xl mx-auto"
            style={{
              x: mouseParallax.x * -0.5,
              y: mouseParallax.y * -0.5,
            }}
          >
            Explore transições modernas, elegantes e impressionantes entre
            páginas e componentes
          </motion.p>

          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-6 py-3 rounded-full font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
            >
              Voltar para Home
            </motion.button>
            <motion.div
              className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-full font-medium inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Transição Atual:{' '}
              {transitionType === 'simple' ? 'Simples' : 'Avançada'} -{' '}
              {transitionVariant}
            </motion.div>
          </div>
        </motion.div>
      </header>

      <main>
        <ScrollReveal animation="fade" duration={0.7}>
          <div className="py-8 bg-black/30 backdrop-blur-sm">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-4">
                Como usar as transições
              </h2>
              <p className="mb-6">
                Selecione qualquer estilo de transição abaixo para visualizar
                como ele funciona. As transições selecionadas serão aplicadas
                automaticamente ao navegar entre páginas.
              </p>

              <div className="bg-white/5 rounded-lg p-4 mb-8">
                <code className="text-sm block text-pink-300 font-mono">
                  {`<AnimatedLayout pageTransitionType="${transitionType}" transitionVariant="${transitionVariant}">`}
                  <br />
                  {'  {children}'}
                  <br />
                  {'</AnimatedLayout>'}
                </code>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <AnimationShowcase onTransitionChange={handleTransitionChange} />

        <ScrollReveal animation="slide" direction="up" duration={0.7}>
          <div className="py-16 bg-gradient-to-b from-transparent to-black/40">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-8">
                Melhore a experiência dos seus usuários
              </h2>
              <p className="max-w-2xl mx-auto mb-10 text-lg">
                Animações bem implementadas aumentam o engajamento, reduzem a
                percepção de tempo de carregamento e tornam sua aplicação mais
                agradável e profissional.
              </p>

              <motion.button
                className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-4 rounded-full font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
              >
                Voltar para Home
              </motion.button>
            </div>
          </div>
        </ScrollReveal>
      </main>
    </div>
  );
};

export default AnimationDemo;
