import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { textContainer, textCharacter } from "@/lib/animations";

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  delayOffset?: number;
  staggerChildren?: number;
  charClassName?: string;
  type?: "heading" | "paragraph" | "custom";
}

export function AnimatedCharacters({
  text,
  className,
  once = true,
  delayOffset = 0,
  staggerChildren = 0.04,
  charClassName,
  type = "heading",
}: AnimatedTextProps) {
  // Divide o texto em palavras e caracteres
  const words = text.split(" ");

  // Variante personalizada baseada nos parâmetros
  const container = {
    hidden: { opacity: 0 },
    show: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: staggerChildren, 
        delayChildren: delayOffset * i 
      },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const baseClassName = type === "heading" 
    ? "inline-block text-modern-white"
    : type === "paragraph"
      ? "inline-block text-modern-gray"
      : "";

  return (
    <motion.div
      className={cn("overflow-hidden flex flex-wrap", className)}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="mr-1 overflow-hidden"
        >
          {Array.from(word).map((char, charIndex) => (
            <motion.span
              key={`${index}-${charIndex}`}
              variants={child}
              className={cn(baseClassName, charClassName)}
            >
              {char}
            </motion.span>
          ))}
          {index !== words.length - 1 && " "}
        </motion.span>
      ))}
    </motion.div>
  );
}

export function AnimatedTitle({ 
  text, 
  className, 
  once = true,
  delayOffset = 0,
}: Omit<AnimatedTextProps, "type" | "charClassName"> & { className?: string }) {
  return (
    <motion.h2
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delayOffset }}
      viewport={{ once }}
    >
      {text}
    </motion.h2>
  );
}

export function AnimatedWords({
  text,
  className,
  once = true,
  delayOffset = 0,
}: Omit<AnimatedTextProps, "type" | "charClassName"> & { className?: string }) {
  const words = text.split(" ");
  
  return (
    <motion.p 
      className={cn("flex flex-wrap", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="mr-1"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: delayOffset + (i * 0.07),
            ease: [0.2, 0.65, 0.3, 0.9]
          }}
          viewport={{ once }}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
} 