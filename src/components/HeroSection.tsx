import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCharacters, AnimatedWords } from "@/components/ui/animated-text";
import { fadeIn, pulseVariants, staggerContainer } from "@/lib/animations";
import { PulsatingIcon } from "@/components/ui/floating-icon";
import { useParallax } from "@/lib/useParallax";
import { useRef } from "react";

const socialLinks = [
  { icon: <Github size={24} />, url: "https://github.com/igaodeveloper", label: "GitHub" },
  { icon: <Linkedin size={24} />, url: "https://www.linkedin.com/in/igor-costa-oliveira-673866169/", label: "LinkedIn" },
  { icon: <Mail size={24} />, url: "mailto:igorhawking@gmail.com", label: "Email" }
];

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  // Efeitos de paralaxe para diferentes elementos
  const textY = useTransform(scrollY, [0, 500], [0, -150]);
  const imageY = useTransform(scrollY, [0, 500], [0, 50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  
  // Efeito de paralaxe para ícones sociais
  const { parallaxProps: socialParallax } = useParallax({ 
    speed: 0.2, 
    direction: 'left' 
  });
  
  return (
    <section ref={sectionRef} id="home" className="min-h-screen flex flex-col justify-center items-center bg-modern-dark px-6 py-20 relative overflow-hidden">
      {/* Fundo com efeito de paralaxe */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        style={{ y: useTransform(scrollY, [0, 500], [0, 150]) }}
      >
        <div className="absolute top-0 left-0 w-32 h-32 bg-modern-accent rounded-full blur-3xl" />
        <div className="absolute top-20 right-20 w-40 h-40 bg-modern-accent2 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/3 w-52 h-52 bg-modern-accent rounded-full blur-3xl" />
      </motion.div>
      
      <motion.div 
        variants={staggerContainer(0.1, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10"
        style={{ y: textY, opacity }}
      >
        <motion.div
          variants={fadeIn("right", 0.2)}
          className="flex flex-col space-y-8"
        >
          <motion.div className="overflow-hidden">
            <AnimatedCharacters
              text="Bem-vindo ao meu portfólio"
              className="text-xl md:text-2xl font-medium text-modern-accent"
              delayOffset={0.4}
            />
          </motion.div>
          
          <div className="space-y-2">
            <motion.div className="overflow-hidden">
              <AnimatedCharacters
                text="Desenvolvedor"
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-modern-white tracking-tight"
                delayOffset={0.5}
              />
            </motion.div>
            
            <motion.div className="overflow-hidden">
              <AnimatedCharacters
                text="Front-end & UI Designer"
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
                charClassName="text-modern-accent"
                delayOffset={0.6}
              />
            </motion.div>
          </div>

          <motion.div className="overflow-hidden">
            <AnimatedWords
              text="Criando experiências digitais modernas e acessíveis com foco em usabilidade e performance."
              className="text-lg md:text-xl text-modern-gray max-w-xl"
              delayOffset={0.7}
            />
          </motion.div>

          <motion.div
            variants={fadeIn("up", 0.8)}
            className="flex flex-wrap gap-6 pt-4"
          >
            <Button
              size="lg"
              className="rounded bg-modern-accent hover:bg-modern-accent/80 text-modern-white font-medium group flex items-center gap-2 transition-all duration-300"
              onClick={() => {
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <motion.span>Ver projetos</motion.span>
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: [0, 5, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  duration: 1.5,
                  ease: "easeInOut" 
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
                  variants={fadeIn("up", 0.1 * index)}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-modern-gray hover:text-modern-accent transition-colors duration-300"
                  aria-label={link.label}
                  whileHover={{ 
                    y: -5,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeIn("left", 0.5)}
          className="relative aspect-square max-w-md mx-auto lg:ml-auto hidden lg:block"
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
                "0 0 0 0 rgba(0, 210, 223, 0.2)",
                "0 0 0 20px rgba(0, 210, 223, 0.2)",
                "0 0 0 40px rgba(0, 210, 223, 0.2)",
                "0 0 0 60px rgba(0, 210, 223, 0)",
              ],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatType: "loop" 
            }}
          />
          
          <motion.div
            className="relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-modern-light/10 shadow-xl"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <img
              src="/assets/perfil.jpg"
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
            <motion.div
              className="w-8 h-12 border-2 border-modern-gray/30 rounded-full flex justify-center items-start p-1"
            >
              <motion.div
                className="w-1 h-3 bg-modern-accent2 rounded-full"
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            </motion.div>
          }
          pulseColor="rgba(0, 210, 223, 0.15)"
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          className="cursor-pointer"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
