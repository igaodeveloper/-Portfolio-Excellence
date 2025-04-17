import NavigationMenu from "./NavigationMenu";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import ProjectsSection from "./ProjectsSection";
import SkillsSection from "./SkillsSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";

function Home() {
  return (
    <div className="w-full min-h-screen bg-[#121214]">
      <NavigationMenu />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
