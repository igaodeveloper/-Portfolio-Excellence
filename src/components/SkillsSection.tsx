import { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { AnimatedTitle } from '@/components/ui/animated-text';
import { FloatingIconGrid } from '@/components/ui/floating-icon';
import { fadeIn, staggerContainer } from '@/lib/animations';
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiSass,
  SiGit,
  SiFigma,
  SiNodedotjs,
  SiAdobephotoshop,
  SiPython,
  SiVuedotjs,
  SiVite,
  SiAngular,
  SiIonic,
  SiReactivex,
  SiExpo,
  SiWordpress,
  SiUnity,
  SiGithub,
  SiPhp,
  SiJira,
  SiSharp, // Alterado de SiCsharp para SiSharp
  SiDotnet,
  SiSlack,
  SiBitbucket,
} from 'react-icons/si';

type Skill = {
  name: string;
  level: number; // 1-5
  category: string;
  icon: React.ReactNode;
  color: string;
};

type SkillCategory = {
  name: string;
};

const skillCategories: SkillCategory[] = [
  { name: 'Todos' },
  { name: 'Frontend' },
  { name: 'Backend' },
  { name: 'Mobile' },
  { name: 'Design' },
  { name: 'Ferramentas' },
  { name: 'Games' },
];

const skills: Skill[] = [
  {
    icon: <SiHtml5 className="w-8 h-8" />,
    name: 'HTML',
    color: 'text-[#E34F26]',
    level: 5,
    category: 'Frontend',
  },
  {
    icon: <SiCss3 className="w-8 h-8" />,
    name: 'CSS',
    color: 'text-[#1572B6]',
    level: 5,
    category: 'Frontend',
  },
  {
    icon: <SiJavascript className="w-8 h-8" />,
    name: 'JavaScript',
    color: 'text-[#F7DF1E]',
    level: 5,
    category: 'Frontend',
  },
  {
    icon: <SiReact className="w-8 h-8" />,
    name: 'React',
    color: 'text-[#61DAFB]',
    level: 5,
    category: 'Frontend',
  },
  {
    icon: <SiTypescript className="w-8 h-8" />,
    name: 'TypeScript',
    color: 'text-[#3178C6]',
    level: 4,
    category: 'Frontend',
  },
  {
    icon: <SiTailwindcss className="w-8 h-8" />,
    name: 'Tailwind',
    color: 'text-[#06B6D4]',
    level: 5,
    category: 'Frontend',
  },
  {
    icon: <SiNextdotjs className="w-8 h-8" />,
    name: 'Next.js',
    color: 'text-white',
    level: 4,
    category: 'Frontend',
  },
  {
    icon: <SiVuedotjs className="w-8 h-8" />,
    name: 'Vue',
    color: 'text-[#4FC08D]',
    level: 4,
    category: 'Frontend',
  },
  {
    icon: <SiAngular className="w-8 h-8" />,
    name: 'Angular',
    color: 'text-[#DD0031]',
    level: 3,
    category: 'Frontend',
  },
  {
    icon: <SiSass className="w-8 h-8" />,
    name: 'Sass',
    color: 'text-[#CC6699]',
    level: 5,
    category: 'Frontend',
  },
  {
    icon: <SiVite className="w-8 h-8" />,
    name: 'Vite',
    color: 'text-[#646CFF]',
    level: 4,
    category: 'Ferramentas',
  },
  {
    icon: <SiReactivex className="w-8 h-8" />,
    name: 'React Native',
    color: 'text-[#61DAFB]',
    level: 4,
    category: 'Mobile',
  },
  {
    icon: <SiExpo className="w-8 h-8" />,
    name: 'Expo',
    color: 'text-white',
    level: 4,
    category: 'Mobile',
  },
  {
    icon: <SiIonic className="w-8 h-8" />,
    name: 'Ionic',
    color: 'text-[#3880FF]',
    level: 3,
    category: 'Mobile',
  },
  {
    icon: <SiNodedotjs className="w-8 h-8" />,
    name: 'Node.js',
    color: 'text-[#339933]',
    level: 4,
    category: 'Backend',
  },
  {
    icon: <SiPython className="w-8 h-8" />,
    name: 'Python',
    color: 'text-[#3776AB]',
    level: 4,
    category: 'Backend',
  },
  {
    icon: <SiWordpress className="w-8 h-8" />,
    name: 'WordPress',
    color: 'text-[#21759B]',
    level: 4,
    category: 'Frontend',
  },
  {
    icon: <SiUnity className="w-8 h-8" />,
    name: 'Unity',
    color: 'text-white',
    level: 3,
    category: 'Games',
  },
  {
    icon: <SiGit className="w-8 h-8" />,
    name: 'Git',
    color: 'text-[#F05032]',
    level: 4,
    category: 'Ferramentas',
  },
  {
    icon: <SiGithub className="w-8 h-8" />,
    name: 'GitHub',
    color: 'text-[#181717]',
    level: 5,
    category: 'Ferramentas',
  },
  {
    icon: <SiPhp className="w-8 h-8" />,
    name: 'PHP',
    color: 'text-[#777BB3]',
    level: 3,
    category: 'Backend',
  },
  {
    icon: <SiJira className="w-8 h-8" />,
    name: 'Jira',
    color: 'text-[#0052CC]',
    level: 4,
    category: 'Ferramentas',
  },
  {
    icon: <SiSharp className="w-8 h-8" />, // Usando o SiSharp aqui
    name: 'C#',
    color: 'text-[#68217A]',
    level: 3,
    category: 'Backend',
  },
  {
    icon: <SiDotnet className="w-8 h-8" />,
    name: '.NET',
    color: 'text-[#512BD4]',
    level: 3,
    category: 'Backend',
  },
  {
    icon: <SiSlack className="w-8 h-8" />,
    name: 'Slack',
    color: 'text-[#4A154B]',
    level: 5,
    category: 'Ferramentas',
  },
  {
    icon: <SiBitbucket className="w-8 h-8" />,
    name: 'Bitbucket',
    color: 'text-[#0052CC]',
    level: 4,
    category: 'Ferramentas',
  },
];

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Todos');

  const filteredSkills =
    activeCategory === 'Todos'
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  return (
    <section id="skills" className="py-20 px-6 bg-modern-dark">
      <div className="container-section">
        <AnimatedTitle
          text="Conhecimentos"
          className="section-title text-modern-white mb-12"
        />

        <motion.div
          variants={staggerContainer(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.name}
              variants={fadeIn('up', index * 0.05)}
            >
              <Badge
                onClick={() => setActiveCategory(category.name)}
                className={`px-4 py-2 cursor-pointer text-sm border-none text-modern-white ${
                  activeCategory === category.name
                    ? 'bg-modern-accent hover:bg-modern-accent/90'
                    : 'bg-modern-darker hover:bg-modern-darker/90'
                }`}
              >
                {category.name}
              </Badge>
            </motion.div>
          ))}
        </motion.div>

        <FloatingIconGrid
          icons={filteredSkills.map((skill) => ({
            id: skill.name,
            icon: (
              <div className="relative group">
                <motion.div
                  className="flex flex-col items-center justify-center bg-modern-darker p-6 rounded-xl relative z-10 overflow-hidden border border-modern-accent/10"
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className={`mb-3 ${skill.color}`}>{skill.icon}</div>
                  <h3 className="text-modern-white font-medium text-center">
                    {skill.name}
                  </h3>
                  <div className="mt-3 w-full space-y-1">
                    <div className="w-full h-1.5 bg-modern-dark rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-modern-accent rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level * 20}%` }}
                        transition={{
                          duration: 0.8,
                          delay: 0.2,
                          ease: 'easeOut',
                        }}
                        viewport={{ once: true }}
                      />
                    </div>
                    <p className="text-xs text-modern-gray text-right">
                      {skill.level}/5
                    </p>
                  </div>

                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-1 bg-modern-accent"
                    initial={{ scaleX: 0, originX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                <motion.div className="absolute inset-0 bg-gradient-to-t from-modern-accent/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ),
            className: 'p-1',
          }))}
          gridClassName="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
          staggerDelay={0.05}
        />

        {filteredSkills.length === 0 && (
          <div className="text-center py-12">
            <p className="text-modern-gray">
              Nenhuma habilidade encontrada nesta categoria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;
