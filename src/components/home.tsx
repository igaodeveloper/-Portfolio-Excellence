import NavigationMenu from "./NavigationMenu";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import ProjectsSection from "./ProjectsSection";
import SkillsSection from "./SkillsSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";
import ExperienceSection from "./ExperienceSection";
import ServicesSection from "./ServicesSection";
import WhatsAppButton from "./WhatsAppButton";
import AnimatedSection from "./AnimatedSection";

function Home() {
  return (
    <div className="w-full min-h-screen bg-[#121214]">
      <NavigationMenu />
      <main>
        <HeroSection />
        <AnimatedSection direction="up" delay={0.2}>
          <AboutSection />
        </AnimatedSection>
        <AnimatedSection direction="right" delay={0.2}>
          <ExperienceSection />
        </AnimatedSection>
        <AnimatedSection direction="left" delay={0.2}>
          <ServicesSection />
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
      <WhatsAppButton phoneNumber="+55 (11)98292-8508" />
    </div>
  );
}

export default Home;
