import { motion } from "framer-motion";
import { Building2, Calendar } from "lucide-react";

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

const experiences: Experience[] = [
  {
    company: "Company Name 1",
    role: "Frontend Developer",
    period: "2023 - Present",
    description: "Led the development of modern web applications using React, TypeScript, and Tailwind CSS. Implemented responsive designs and optimized performance."
  },
  {
    company: "Company Name 2",
    role: "UX Designer & Frontend Developer",
    period: "2022 - 2023",
    description: "Designed and developed user interfaces for various clients. Created intuitive user experiences and implemented them using modern web technologies."
  },
  {
    company: "Company Name 3",
    role: "Junior Web Developer",
    period: "2021 - 2022",
    description: "Worked on maintaining and improving existing websites. Collaborated with the design team to implement new features and layouts."
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 px-6 bg-modern-dark">
      <div className="container-section">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="section-title text-modern-white">Experiências</h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card-hover bg-modern-darker rounded-lg p-6 border border-modern-accent/10"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="bg-modern-accent/10 p-2 rounded-lg">
                  <Building2 className="text-modern-accent w-6 h-6" />
                </div>
                <div className="flex items-center text-modern-gray text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  {exp.period}
                </div>
              </div>
              <h3 className="text-xl font-bold text-modern-white mb-2">{exp.company}</h3>
              <h4 className="text-modern-accent2 font-medium mb-3">{exp.role}</h4>
              <p className="text-modern-gray">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
