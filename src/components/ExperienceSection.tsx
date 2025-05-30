import { motion } from 'framer-motion';
import { Building2, Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ExperienceAPI } from '@/services/api';

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  startDate?: string;
  title?: string;
}

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    ExperienceAPI.getAll()
      .then((data) => {
        setExperiences(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Erro ao carregar experiências.');
        setLoading(false);
      });
  }, []);

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

        {loading ? (
          <div className="text-modern-gray">Carregando experiências...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
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
                    {exp.period || exp.startDate || ''}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-modern-white mb-2">
                  {exp.company}
                </h3>
                <h4 className="text-modern-accent2 font-medium mb-3">
                  {exp.role || exp.title}
                </h4>
                <p className="text-modern-gray">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
