'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AnimatedCharacters,
  AnimatedWords,
} from '@/components/ui/animated-text';
import { fadeIn, pulseVariants, staggerContainer } from '@/lib/animations';
import { PulsatingIcon } from '@/components/ui/floating-icon';
import { useParallax } from '@/lib/useParallax';
import { useRef, useState } from 'react';

const socialLinks = [
  {
    icon: <Github size={24} />,
    url: 'https://github.com/igaodeveloper',
    label: 'GitHub',
  },
  {
    icon: <Linkedin size={24} />,
    url: 'https://www.linkedin.com/in/igor-costa-oliveira-673866169/',
    label: 'LinkedIn',
  },
  {
    icon: <Mail size={24} />,
    url: 'mailto:igorhawking@gmail.com',
    label: 'Email',
  },
];

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const textY = useTransform(scrollY, [0, 500], [0, -150]);
  const imageY = useTransform(scrollY, [0, 500], [0, 50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  const { parallaxProps: socialParallax } = useParallax({
    speed: 0.2,
    direction: 'left',
  });

  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -30;
    setRotate({ x, y });
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-screen flex flex-col justify-center items-center bg-modern-dark px-4 sm:px-6 md:px-12 py-16 md:py-20 relative overflow-hidden perspective-[1200px]"
    >
      {/* Fundo com camadas 3D animadas */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{ y: useTransform(scrollY, [0, 500], [0, 150]) }}
      >
        <motion.div
          className="absolute top-0 left-0 w-32 h-32 bg-modern-accent rounded-full blur-3xl"
          animate={{ rotateZ: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-20 right-20 w-40 h-40 bg-modern-accent2 rounded-full blur-3xl"
          animate={{ rotateZ: [360, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-52 h-52 bg-modern-accent rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <motion.div
        variants={staggerContainer(0.1, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 gap-y-20 sm:gap-y-24 items-center relative z-10"
        style={{ y: textY, opacity }}
      >
        {/* Texto com rotação 3D interativa */}
        <motion.div
          variants={fadeIn('right', 0.2)}
          className="flex flex-col space-y-8"
          initial={{ opacity: 0, rotateX: -30, z: -200 }}
          whileInView={{ opacity: 1, rotateX: 0, z: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <motion.div
            className="relative z-10"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setRotate({ x: 0, y: 0 })}
            style={{
              transform: `rotateX(${rotate.y}deg) rotateY(${rotate.x}deg)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.2s ease-out',
            }}
          >
            <motion.div className="overflow-hidden">
              <AnimatedCharacters
                text="Bem-vindo ao meu portfólio"
                className="text-xl sm:text-2xl md:text-3xl font-medium text-modern-accent"
                delayOffset={0.4}
              />
            </motion.div>

            <div className="space-y-2">
              <motion.div className="overflow-hidden">
                <AnimatedCharacters
                  text="Desenvolvedor"
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-modern-white tracking-tight"
                  delayOffset={0.5}
                />
              </motion.div>

              <motion.div className="overflow-hidden">
                <AnimatedCharacters
                  text="Full-Stack & UI Designer"
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                  charClassName="text-modern-accent"
                  delayOffset={0.6}
                />
              </motion.div>
            </div>

            <motion.div className="overflow-hidden">
              <AnimatedWords
                text="Arquitetando experiências digitais modernas, escaláveis e acessíveis — com obsessão por usabilidade, performance e código limpo."
                className="text-base sm:text-lg md:text-xl text-modern-gray max-w-xl"
                delayOffset={0.7}
              />
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeIn('up', 0.8)}
            className="flex flex-wrap gap-6 pt-4"
          >
            <Button
              size="lg"
              className="rounded bg-modern-accent hover:bg-modern-accent/80 text-modern-white font-medium group flex items-center gap-2 transition-all duration-300"
              onClick={() => {
                document
                  .getElementById('projects')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <motion.span>Ver projetos</motion.span>
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: [0, 5, 0] }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'reverse',
                  duration: 1.5,
                  ease: 'easeInOut',
                }}
              >
                <ArrowRight size={18} />
              </motion.div>
            </Button>

            <motion.div
              variants={staggerContainer(0.1, 1)}
              initial="hidden"
              animate="show"
              className="flex items-center space-x-6"
              style={socialParallax}
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  variants={fadeIn('up', 0.1 * index)}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-modern-gray hover:text-modern-accent transition-colors duration-300"
                  aria-label={link.label}
                  whileHover={{
                    y: -5,
                    transition: { type: 'spring', stiffness: 300 },
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Imagem com efeito 3D flutuante */}
        <motion.div
          variants={fadeIn('left', 0.5)}
          className="relative aspect-[1/1] w-64 sm:w-72 md:w-80 lg:w-96 mx-auto lg:ml-auto"
          style={{ y: imageY }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-modern-accent to-modern-accent2 rounded-full opacity-20 blur-3xl"
            variants={pulseVariants}
            initial="initial"
            animate="animate"
          />

          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(0, 210, 223, 0.2)',
                '0 0 0 20px rgba(0, 210, 223, 0.2)',
                '0 0 0 40px rgba(0, 210, 223, 0.2)',
                '0 0 0 60px rgba(0, 210, 223, 0)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'loop',
            }}
          />

          <motion.div
            className="relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-modern-light/10 shadow-xl"
            whileHover={{
              scale: 1.05,
              rotateX: 8,
              rotateY: -8,
              z: 50,
              boxShadow: '0 20px 50px rgba(0, 210, 223, 0.35)',
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <img
              src="/perfil.jpg"
              alt="Developer Portrait"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{ opacity: useTransform(scrollY, [0, 150], [1, 0]) }}
      >
        <PulsatingIcon
          icon={
            <motion.div className="w-8 h-12 border-2 border-modern-gray/30 rounded-full flex justify-center items-start p-1">
              <motion.div
                className="w-1 h-3 bg-modern-accent2 rounded-full"
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            </motion.div>
          }
          pulseColor="rgba(0, 210, 223, 0.15)"
          onClick={() =>
            document
              .getElementById('about')
              ?.scrollIntoView({ behavior: 'smooth' })
          }
          className="cursor-pointer"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
