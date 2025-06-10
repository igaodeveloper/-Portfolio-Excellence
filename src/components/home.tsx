import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ProjectsSection from './ProjectsSection';
import SkillsSection from './SkillsSection';
import ContactSection from './ContactSection';
import Footer from './Footer';
import EducationSection from './EducationSection';
import ServicesSection from './ServicesSection';
import WhatsAppButton from './WhatsAppButton';
import AnimatedSection from './AnimatedSection';
import React, { Suspense } from 'react';
import Navbar from './Navbar';
import CommentsSection from './CommentsSection';
import { Mail } from 'lucide-react';
import { subscribeToMailchimp } from '@/services/mailchimp';
import { useState } from 'react';

const CodeEditor = React.lazy(() => import('./CodeEditor'));

function Home() {
  return (
    <div
      className="w-full bg-[#121214] perspective-[1500px] overflow-x-hidden"
      style={{ perspective: '1500px' }}
    >
      <div className="relative z-10 transform-style-3d">
        <Navbar />
        <main className="transform-style-3d pt-16 md:pt-0">
          <section className="transform rotateX-[5deg] rotateY-[-3deg] scale-[0.98] transition-all duration-500 hover:scale-[1] hover:rotateX-0 hover:rotateY-0">
            <HeroSection />
          </section>

          {/* Banner Newsletter */}
          <NewsletterBannerInline />

          <AnimatedSection direction="up" delay={0.2}>
            <div className="transform translate-z-[50px]">
              <AboutSection />
            </div>
          </AnimatedSection>

          <AnimatedSection direction="left" delay={0.2}>
            <div className="transform translate-z-[30px]">
              <EducationSection />
            </div>
          </AnimatedSection>

          <AnimatedSection direction="left" delay={0.2}>
            <div className="transform translate-z-[20px]">
              <ServicesSection />
            </div>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.2}>
            <div
              id="code-editor"
              className="py-20 px-4 md:px-6 lg:px-12 transform translate-z-[60px]"
            >
              <div className="mx-auto max-w-7xl">
                <h2 className="mb-6 text-4xl font-bold text-center text-white">
                  Editor de Código{' '}
                  <span className="text-blue-500">VS Code</span>
                </h2>
                <p className="max-w-3xl mx-auto mb-12 text-center text-gray-300">
                  Experimente nosso editor de código integrado, com suporte para
                  HTML, CSS e JavaScript. Desenvolva suas landing pages com
                  preview em tempo real.
                </p>
                <Suspense fallback={<div>Carregando editor...</div>}>
                  <CodeEditor className="shadow-2xl shadow-blue-500/10" />
                </Suspense>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection staggerChildren={true} staggerDelay={0.1}>
            <div className="transform translate-z-[45px]">
              <ProjectsSection />
            </div>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.2}>
            <div className="transform translate-z-[30px]">
              <SkillsSection />
            </div>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.2}>
            <div className="transform translate-z-[25px]">
              <CommentsSection />
            </div>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.2}>
            <div className="transform translate-z-[20px]">
              <ContactSection />
            </div>
          </AnimatedSection>
        </main>

        <AnimatedSection direction="up" delay={0.1}>
          <div className="transform translate-z-[10px]">
            <Footer />
          </div>
        </AnimatedSection>
      </div>

      <WhatsAppButton />
    </div>
  );
}

function NewsletterBannerInline() {
  const [form, setForm] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const result = await subscribeToMailchimp(form.name, form.email);
    setLoading(false);
    if (result.success) {
      setSuccess(true);
      setForm({ name: '', email: '' });
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="px-2 py-4 my-6 text-center text-white rounded-lg shadow-md bg-gradient-to-r from-blue-600 to-indigo-700 sm:px-4 sm:py-6 sm:my-8">
      <span className="block mb-2 mr-2 text-base sm:text-lg font-semibold">Receba novidades e conteúdos exclusivos!</span>
      {success ? (
        <div className="font-semibold text-green-200">Inscrição realizada com sucesso!</div>
      ) : (
        <form className="flex flex-col items-center justify-center gap-2 sm:flex-row" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Seu nome"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 text-gray-900 rounded sm:w-48"
            disabled={loading}
          />
          <input
            type="email"
            name="email"
            placeholder="seu@email.com"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 text-gray-900 rounded sm:w-64"
            disabled={loading}
          />
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 font-semibold text-blue-700 transition-colors bg-white rounded-lg shadow hover:bg-gray-100 mt-2 sm:mt-0"
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Assinar Newsletter'}
          </button>
        </form>
      )}
      {error && <div className="mt-2 text-red-200">{error}</div>}
    </div>
  );
}

export default Home;
