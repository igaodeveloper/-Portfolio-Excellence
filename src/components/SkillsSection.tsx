import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

type Skill = {
  name: string;
  level: number; // 1-5
  category: string;
  icon: string;
};

type SkillCategory = {
  name: string;
  color: string;
};

const skillCategories: SkillCategory[] = [
  { name: "Frontend", color: "bg-blue-500" },
  { name: "Backend", color: "bg-purple-500" },
  { name: "Design", color: "bg-pink-500" },
  { name: "Tools", color: "bg-amber-500" },
  { name: "Soft Skills", color: "bg-emerald-500" },
];

const skills: Skill[] = [
  // Frontend
  { name: "React", level: 5, category: "Frontend", icon: "⚛️" },
  { name: "TypeScript", level: 4, category: "Frontend", icon: "TS" },
  { name: "JavaScript", level: 5, category: "Frontend", icon: "JS" },
  { name: "HTML5", level: 5, category: "Frontend", icon: "🌐" },
  { name: "CSS3", level: 5, category: "Frontend", icon: "🎨" },
  { name: "Tailwind CSS", level: 5, category: "Frontend", icon: "🌊" },
  { name: "Next.js", level: 4, category: "Frontend", icon: "⏭️" },
  { name: "Vue.js", level: 3, category: "Frontend", icon: "🟢" },

  // Backend
  { name: "Node.js", level: 4, category: "Backend", icon: "🟩" },
  { name: "Express", level: 4, category: "Backend", icon: "🚂" },
  { name: "MongoDB", level: 3, category: "Backend", icon: "🍃" },
  { name: "Firebase", level: 4, category: "Backend", icon: "🔥" },
  { name: "GraphQL", level: 3, category: "Backend", icon: "⚙️" },

  // Design
  { name: "Figma", level: 4, category: "Design", icon: "🎭" },
  { name: "Adobe XD", level: 3, category: "Design", icon: "🎨" },
  { name: "UI/UX", level: 4, category: "Design", icon: "🖌️" },
  { name: "Responsive Design", level: 5, category: "Design", icon: "📱" },

  // Tools
  { name: "Git", level: 4, category: "Tools", icon: "🔄" },
  { name: "Webpack", level: 3, category: "Tools", icon: "📦" },
  { name: "Jest", level: 3, category: "Tools", icon: "🃏" },
  { name: "Docker", level: 2, category: "Tools", icon: "🐳" },

  // Soft Skills
  { name: "Communication", level: 5, category: "Soft Skills", icon: "🗣️" },
  { name: "Teamwork", level: 5, category: "Soft Skills", icon: "👥" },
  { name: "Problem Solving", level: 5, category: "Soft Skills", icon: "🧩" },
  { name: "Time Management", level: 4, category: "Soft Skills", icon: "⏰" },
];

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  return (
    <section id="skills" className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency
            levels across various technologies and domains.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <Badge
            onClick={() => setActiveCategory("All")}
            className={`px-4 py-2 cursor-pointer text-sm ${activeCategory === "All" ? "bg-primary" : "bg-secondary"}`}
          >
            All
          </Badge>
          {skillCategories.map((category) => (
            <Badge
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`px-4 py-2 cursor-pointer text-sm ${activeCategory === category.name ? category.color : "bg-secondary"}`}
            >
              {category.name}
            </Badge>
          ))}
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredSkills.map((skill) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-6 border border-border hover:border-primary transition-all duration-300 relative"
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 flex items-center justify-center text-xl bg-primary/10 rounded-lg mr-3">
                  {skill.icon}
                </div>
                <h3 className="font-medium text-lg">{skill.name}</h3>
              </div>

              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level * 20}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  viewport={{ once: true }}
                  className={`h-full ${getColorForLevel(skill.level)}`}
                />
              </div>

              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>Beginner</span>
                <span>Expert</span>
              </div>

              {hoveredSkill === skill.name && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground px-3 py-2 rounded-md shadow-lg text-sm whitespace-nowrap z-10"
                >
                  {getLevelLabel(skill.level)}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-popover"></div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const getColorForLevel = (level: number): string => {
  switch (level) {
    case 1:
      return "bg-red-500";
    case 2:
      return "bg-orange-500";
    case 3:
      return "bg-yellow-500";
    case 4:
      return "bg-blue-500";
    case 5:
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

const getLevelLabel = (level: number): string => {
  switch (level) {
    case 1:
      return "Basic Knowledge";
    case 2:
      return "Familiar";
    case 3:
      return "Proficient";
    case 4:
      return "Advanced";
    case 5:
      return "Expert";
    default:
      return "Unknown";
  }
};

export default SkillsSection;
