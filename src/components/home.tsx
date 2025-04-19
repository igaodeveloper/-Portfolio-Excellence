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
    <div
      className="w-full min-h-screen bg-[#121214] perspective-[1500px] overflow-x-hidden"
      style={{ perspective: '1500px' }}
    >
      <div className="relative z-10 transform-style-3d">
        <Navbar />
        <main className="transform-style-3d">
          <section className="transform rotateX-[5deg] rotateY-[-3deg] scale-[0.98] transition-all duration-500 hover:scale-[1] hover:rotateX-0 hover:rotateY-0">
            <HeroSection />
          </section>

          <AnimatedSection direction="up" delay={0.2}>
            <div className="transform translate-z-[50px]">
              <AboutSection />
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.2}>
            <div className="transform translate-z-[40px]">
              <ExperienceSection />
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
              <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-white mb-6 text-center">
                  Editor de Código{' '}
                  <span className="text-blue-500">VS Code</span>
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

export default Home;
