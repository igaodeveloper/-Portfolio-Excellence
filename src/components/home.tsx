import NavigationMenu from "./NavigationMenu";
import HeroSection from "./HeroSection";
import ProjectsSection from "./ProjectsSection";
import SkillsSection from "./SkillsSection";

function Home() {
  return (
    <div className="w-full min-h-screen bg-background">
      <NavigationMenu />
      <main>
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        {/* Other sections will be added here */}
      </main>
    </div>
  );
}

export default Home;
