import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ProjectsSection from './ProjectsSection';
import SkillsSection from './SkillsSection';
import ContactSection from './ContactSection';
import Footer from './Footer';
import ExperienceSection from './ExperienceSection';
import EducationSection from './EducationSection';
import ServicesSection from './ServicesSection';
import WhatsAppButton from './WhatsAppButton';
import AnimatedSection from './AnimatedSection';
import CodeEditor from './CodeEditor';
import Navbar from './Navbar';

function Home() {
  return (
    <div className="w-full min-h-screen bg-[#121214]">
      <Navbar />
      <main>
        <HeroSection />
        <AnimatedSection direction="up" delay={0.2}>
          <AboutSection />
        </AnimatedSection>
        <AnimatedSection direction="right" delay={0.2}>
          <ExperienceSection />
        </AnimatedSection>
        <AnimatedSection direction="left" delay={0.2}>
          <EducationSection />
        </AnimatedSection>
        <AnimatedSection direction="left" delay={0.2}>
          <ServicesSection />
        </AnimatedSection>
        <AnimatedSection direction="up" delay={0.2}>
          <div id="code-editor" className="py-20 px-4 md:px-6 lg:px-12">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-bold text-white mb-6 text-center">
                Editor de Código <span className="text-blue-500">VS Code</span>
              </h2>
              <p className="text-gray-300 text-center max-w-3xl mx-auto mb-12">
                Experimente nosso editor de código integrado, com suporte para
                HTML, CSS e JavaScript. Desenvolva suas landing pages com
                preview em tempo real.
              </p>
              <CodeEditor className="shadow-2xl shadow-blue-500/10" />
            </div>
          </div>
        </AnimatedSection>
        <AnimatedSection staggerChildren={true} staggerDelay={0.1}>
          <ProjectsSection />
        </AnimatedSection>
        <AnimatedSection direction="up" delay={0.2}>
          <SkillsSection />
        </AnimatedSection>
        <AnimatedSection direction="up" delay={0.2}>
          <ContactSection />
        </AnimatedSection>
      </main>
      <AnimatedSection direction="up" delay={0.1}>
        <Footer />
      </AnimatedSection>
      <WhatsAppButton />
    </div>
  );
}

export default Home;
