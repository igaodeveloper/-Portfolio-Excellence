import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToNext = () => {
    if (scrollRef.current) {
      const nextSection = scrollRef.current.nextElementSibling as HTMLElement;
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      ref={scrollRef}
      className="relative min-h-screen flex flex-col justify-center items-center bg-background px-6 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 to-transparent dark:from-blue-950/10 dark:to-transparent z-0" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col space-y-6"
        >
          <div className="space-y-2">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-xl md:text-2xl font-medium text-blue-600 dark:text-blue-400"
            >
              Hello, I'm
            </motion.h2>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight"
            >
              Front-End Engineer
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground max-w-xl"
          >
            I build exceptional digital experiences with modern technologies,
            focusing on responsive design, performance, and accessibility.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <Button size="lg" className="rounded-full">
              View My Work
            </Button>
            <Button size="lg" variant="outline" className="rounded-full">
              Download Resume
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative aspect-square max-w-md mx-auto lg:ml-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full opacity-20 blur-3xl" />
          <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-background shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
              alt="Front-End Engineer Portrait"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={scrollToNext}
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm text-muted-foreground">Scroll Down</span>
          <ArrowDown className="animate-bounce text-muted-foreground" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
