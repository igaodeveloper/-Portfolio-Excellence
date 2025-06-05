'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AnimatedCharacters,
  AnimatedWords,
} from '@/components/ui/animated-text';
import { fadeIn, pulseVariants, staggerContainer } from '@/lib/animations';
import { useParallax } from '@/lib/useParallax';
import { useRef, useState, useEffect } from 'react';
import { Parallax } from 'react-scroll-parallax';
import AnimatedParticles from './AnimatedParticles';

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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  const { parallaxProps: socialParallax } = useParallax({
    speed: 0.2,
    direction: 'left',
  });

  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -30;
    setRotate({ x, y });
    
    // Update mouse position for particle effects
    setMousePosition({ x: e.clientX, y: e.clientY });
  };
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-screen flex flex-col justify-center items-center bg-modern-dark px-4 sm:px-6 md:px-12 py-16 md:py-20 relative overflow-hidden perspective-[1200px]"
      onMouseMove={handleMouseMove}
    >
      {/* Parallax avançado: camadas de fundo e efeitos */}
      <Parallax speed={-40} className="absolute inset-0 z-0 pointer-events-none">
        <img src="/parallax-bg1.svg" alt="Montanhas Parallax" className="w-full h-full object-cover opacity-70" />
      </Parallax>
      <Parallax speed={-25} className="absolute inset-0 z-0 pointer-events-none">
        <img src="/parallax-bg2.svg" alt="Árvores Parallax" className="w-full h-full object-cover opacity-80" />
      </Parallax>
      <Parallax speed={-10} className="absolute inset-0 z-0 pointer-events-none">
        <img src="/parallax-bg3.svg" alt="Nuvens Parallax" className="w-full h-full object-cover opacity-60" />
      </Parallax>
      <Parallax speed={8} className="absolute inset-0 z-0 pointer-events-none">
        <img src="/parallax-particles.svg" alt="Partículas Parallax" className="w-full h-full object-cover opacity-80" />
      </Parallax>
      <Parallax speed={-50} className="absolute inset-0 z-0 pointer-events-none">
        <img src="/parallax-fog.svg" alt="Neblina Parallax" className="w-full h-full object-cover opacity-70" />
      </Parallax>
      <Parallax speed={-35} className="absolute inset-0 z-0 pointer-events-none">
        <img src="/parallax-lights.svg" alt="Luzes Parallax" className="w-full h-full object-cover opacity-60" />
      </Parallax>
      <Parallax speed={-20} className="absolute inset-0 z-0 pointer-events-none">
        <img src="/parallax-shapes.svg" alt="Shapes Parallax" className="w-full h-full object-cover opacity-50" />
      </Parallax>
      <Parallax speed={-5} className="absolute inset-0 z-0 pointer-events-none">
        <img src="/parallax-planet.svg" alt="Planeta Parallax" className="w-full h-full object-cover opacity-80" />
      </Parallax>
      <Parallax speed={-60} className="absolute inset-0 z-0 pointer-events-none">
        <img src="/parallax-gradient.svg" alt="Gradiente Parallax" className="w-full h-full object-cover opacity-80" />
      </Parallax>
      <Parallax speed={-45} className="absolute inset-0 z-0 pointer-events-none">
        <img src="/parallax-aurora.svg" alt="Aurora Parallax" className="w-full h-full object-cover opacity-70" />
      </Parallax>
      <Parallax speed={-30} className="absolute inset-0 z-0 pointer-events-none">
        <img src="/parallax-meteor.svg" alt="Meteoros Parallax" className="w-full h-full object-cover opacity-80" />
      </Parallax>
      <Parallax speed={-15} className="absolute inset-0 z-0 pointer-events-none">
        <img src="/parallax-satellite.svg" alt="Satélite Parallax" className="w-full h-full object-cover opacity-90" />
      </Parallax>
      {/* Fim das camadas parallax */}

      {/* Partículas animadas interativas */}
      <AnimatedParticles />

      {/* Fundo com camadas 3D animadas */}
      <motion.div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-0 left-0 w-32 h-32 rounded-full bg-modern-accent blur-3xl"
          animate={{ rotateZ: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute w-40 h-40 rounded-full top-20 right-20 bg-modern-accent2 blur-3xl"
          animate={{ rotateZ: [360, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute rounded-full bottom-20 left-1/3 w-52 h-52 bg-modern-accent blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <motion.div
        variants={staggerContainer(0.1, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="relative z-10 grid items-center w-full grid-cols-1 gap-12 mx-auto max-w-7xl lg:grid-cols-2 gap-y-20 sm:gap-y-24"
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
            style={{
              transform: `rotateX(${rotate.y}deg) rotateY(${rotate.x}deg)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.2s ease-out',
            }}
          >
            <motion.div className="overflow-hidden">
              <AnimatedCharacters
                text="Bem-vindo ao meu portfólio"
                className="text-xl font-medium sm:text-2xl md:text-3xl text-modern-accent"
                delayOffset={0.4}
              />
            </motion.div>

            <div className="space-y-2">
              <motion.div className="overflow-hidden">
                <AnimatedCharacters
                  text="Desenvolvedor Front End Sênior"
                  className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl text-modern-white"
                  delayOffset={0.5}
                />
              </motion.div>
            </div>

            <motion.div className="overflow-hidden">
              <AnimatedWords
                text="Arquitetando experiências digitais modernas, escaláveis e acessíveis — com obsessão por usabilidade, performance e código limpo. Foco em interfaces de alta qualidade, acessibilidade e experiência do usuário."
                className="max-w-xl text-base sm:text-lg md:text-xl text-modern-gray"
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
              className="relative flex items-center gap-2 overflow-hidden font-medium transition-all duration-300 rounded bg-modern-accent hover:bg-modern-accent/80 text-modern-white group"
              onClick={() => {
                document
                  .getElementById('projects')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <motion.span className="relative z-10">Ver projetos</motion.span>
              <motion.div
                className="relative z-10"
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
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-modern-accent to-modern-accent2"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4 }}
              />
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
                  className="relative transition-all duration-300 text-modern-gray hover:text-modern-accent group"
                  aria-label={link.label}
                  whileHover={{
                    y: -5,
                    transition: { type: 'spring', stiffness: 300 },
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  {link.icon}
                  <span className="absolute text-xs transition-opacity duration-300 transform -translate-x-1/2 opacity-0 -bottom-8 left-1/2 text-modern-accent group-hover:opacity-100">
                    {link.label}
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Imagem com efeito 3D flutuante */}
        <motion.div
          variants={fadeIn('left', 0.5)}
          className="relative aspect-[1/1] w-64 sm:w-72 md:w-80 lg:w-96 mx-auto lg:ml-auto"
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-modern-accent to-modern-accent2 opacity-20 blur-3xl"
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
            className="relative z-10 w-full h-full overflow-hidden border-4 rounded-full shadow-xl border-modern-light/10"
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
              className="object-cover w-full h-full"
            />
            
            {/* Efeito de brilho na imagem */}
            <motion.div 
              className="absolute inset-0 opacity-0 bg-gradient-to-tr from-transparent via-white to-transparent hover:opacity-20"
              initial={{ rotate: 0, scale: 1.5 }}
              animate={{ rotate: 360, scale: 1.5 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Indicador de rolagem */}
      <motion.div 
        className="absolute transform -translate-x-1/2 cursor-pointer bottom-10 left-1/2"
        initial={{ y: 0, opacity: 0.5 }}
        animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={scrollToNext}
      >
        <ChevronDown size={32} className="text-modern-accent" />
        <span className="block mt-2 text-xs text-center text-modern-gray">Rolar para baixo</span>
      </motion.div>
    </section>
  );
};

export default HeroSection;
