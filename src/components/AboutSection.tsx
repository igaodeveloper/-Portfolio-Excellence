import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Briefcase, GraduationCap, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type TimelineItem = {
  id: number;
  title: string;
  organization: string;
  period: string;
  description: string;
  type: "work" | "education" | "award";
};

const timelineItems: TimelineItem[] = [
  {
    id: 1,
    title: "Senior Front-End Developer",
    organization: "Tech Innovations Inc.",
    period: "2021 - Present",
    description:
      "Lead front-end development for enterprise applications, mentoring junior developers and implementing modern React architecture patterns.",
    type: "work",
  },
  {
    id: 2,
    title: "Front-End Developer",
    organization: "Digital Solutions Ltd.",
    period: "2018 - 2021",
    description:
      "Developed responsive web applications using React, TypeScript, and modern CSS frameworks. Collaborated with UX designers to implement pixel-perfect interfaces.",
    type: "work",
  },
  {
    id: 3,
    title: "Bachelor's Degree in Computer Science",
    organization: "University of Technology",
    period: "2014 - 2018",
    description:
      "Specialized in web technologies and user interface design. Graduated with honors.",
    type: "education",
  },
  {
    id: 4,
    title: "Web Development Excellence Award",
    organization: "Regional Tech Conference",
    period: "2020",
    description:
      "Recognized for outstanding contributions to front-end development practices and open-source projects.",
    type: "award",
  },
];

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState<
    "all" | "work" | "education" | "award"
  >("all");

  const filteredItems =
    activeTab === "all"
      ? timelineItems
      : timelineItems.filter((item) => item.type === activeTab);

  return (
    <section id="about" className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A passionate front-end engineer with a keen eye for design and a
            commitment to creating exceptional user experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold">My Journey</h3>
            <p className="text-muted-foreground">
              With over 5 years of experience in front-end development, I've
              dedicated my career to crafting beautiful, functional, and
              accessible web experiences. My approach combines technical
              expertise with a deep understanding of user needs and design
              principles.
            </p>
            <p className="text-muted-foreground">
              I specialize in building responsive, performant applications using
              modern JavaScript frameworks, with a particular focus on React and
              its ecosystem. I'm passionate about clean code, component-based
              architecture, and staying at the forefront of web technologies.
            </p>
            <p className="text-muted-foreground">
              When I'm not coding, you can find me exploring new design trends,
              contributing to open-source projects, or sharing knowledge through
              technical writing and mentorship.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold">Technical Skills</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <SkillCard title="React" level={5} />
              <SkillCard title="TypeScript" level={4} />
              <SkillCard title="JavaScript" level={5} />
              <SkillCard title="HTML/CSS" level={5} />
              <SkillCard title="Tailwind CSS" level={5} />
              <SkillCard title="Next.js" level={4} />
              <SkillCard title="Redux" level={4} />
              <SkillCard title="GraphQL" level={3} />
              <SkillCard title="Jest" level={4} />
              <SkillCard title="Figma" level={3} />
              <SkillCard title="Git" level={4} />
              <SkillCard title="Webpack" level={3} />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold">Experience & Education</h3>
            <div className="flex space-x-2">
              <Badge
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1 cursor-pointer ${activeTab === "all" ? "bg-primary" : "bg-secondary"}`}
              >
                All
              </Badge>
              <Badge
                onClick={() => setActiveTab("work")}
                className={`px-3 py-1 cursor-pointer ${activeTab === "work" ? "bg-blue-500" : "bg-secondary"}`}
              >
                Work
              </Badge>
              <Badge
                onClick={() => setActiveTab("education")}
                className={`px-3 py-1 cursor-pointer ${activeTab === "education" ? "bg-green-500" : "bg-secondary"}`}
              >
                Education
              </Badge>
              <Badge
                onClick={() => setActiveTab("award")}
                className={`px-3 py-1 cursor-pointer ${activeTab === "award" ? "bg-amber-500" : "bg-secondary"}`}
              >
                Awards
              </Badge>
            </div>
          </div>

          <div className="relative border-l-2 border-border pl-8 space-y-12 ml-4">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -left-[42px] bg-background p-1 rounded-full border-2 border-border">
                  {item.type === "work" ? (
                    <Briefcase className="w-5 h-5 text-blue-500" />
                  ) : item.type === "education" ? (
                    <GraduationCap className="w-5 h-5 text-green-500" />
                  ) : (
                    <Award className="w-5 h-5 text-amber-500" />
                  )}
                </div>
                <div className="flex items-center mb-2">
                  <h4 className="text-xl font-semibold">{item.title}</h4>
                  <div className="ml-auto flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-1" />
                    {item.period}
                  </div>
                </div>
                <p className="text-primary font-medium mb-2">
                  {item.organization}
                </p>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const SkillCard = ({ title, level }: { title: string; level: number }) => {
  return (
    <div className="bg-card rounded-lg p-4 border border-border hover:border-primary transition-colors duration-300">
      <h4 className="font-medium mb-2">{title}</h4>
      <div className="flex space-x-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full flex-1 ${i < level ? "bg-primary" : "bg-secondary"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AboutSection;
