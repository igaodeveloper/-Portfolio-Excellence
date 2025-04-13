import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
};

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Dashboard",
    description:
      "A comprehensive dashboard for e-commerce businesses with real-time analytics, inventory management, and customer insights.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    tags: ["React", "TypeScript", "Tailwind CSS", "Chart.js"],
    liveUrl: "https://example.com/ecommerce-dashboard",
    githubUrl: "https://github.com/username/ecommerce-dashboard",
    featured: true,
  },
  {
    id: 2,
    title: "Social Media App",
    description:
      "A modern social media application with real-time messaging, post sharing, and user authentication.",
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
    tags: ["React", "Firebase", "Tailwind CSS", "Redux"],
    liveUrl: "https://example.com/social-media-app",
    githubUrl: "https://github.com/username/social-media-app",
    featured: true,
  },
  {
    id: 3,
    title: "Weather Forecast App",
    description:
      "A weather application that provides accurate forecasts, interactive maps, and location-based weather alerts.",
    image:
      "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&q=80",
    tags: ["JavaScript", "API Integration", "CSS3", "HTML5"],
    liveUrl: "https://example.com/weather-app",
    githubUrl: "https://github.com/username/weather-app",
    featured: false,
  },
  {
    id: 4,
    title: "Task Management System",
    description:
      "A productivity tool for managing tasks, projects, and team collaboration with drag-and-drop functionality.",
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    liveUrl: "https://example.com/task-management",
    githubUrl: "https://github.com/username/task-management",
    featured: false,
  },
  {
    id: 5,
    title: "Portfolio Website",
    description:
      "A responsive portfolio website showcasing projects, skills, and professional experience with a modern design.",
    image:
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&q=80",
    tags: ["React", "Tailwind CSS", "Framer Motion", "TypeScript"],
    liveUrl: "https://example.com/portfolio",
    githubUrl: "https://github.com/username/portfolio",
    featured: true,
  },
  {
    id: 6,
    title: "Recipe Finder App",
    description:
      "A culinary application that helps users discover recipes based on available ingredients, dietary restrictions, and preferences.",
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80",
    tags: ["JavaScript", "API Integration", "CSS3", "HTML5"],
    liveUrl: "https://example.com/recipe-finder",
    githubUrl: "https://github.com/username/recipe-finder",
    featured: false,
  },
];

const categories = [
  "All",
  "React",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "API Integration",
  "Tailwind CSS",
];

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.tags.includes(activeCategory));

  return (
    <section id="projects" className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore my recent work and personal projects that showcase my skills
            and expertise in front-end development.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl overflow-hidden shadow-lg border border-border hover:shadow-xl transition-shadow duration-300"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
                  style={{
                    transform:
                      hoveredProject === project.id
                        ? "scale(1.05)"
                        : "scale(1)",
                  }}
                />
                {project.featured && (
                  <div className="absolute top-4 left-4">
                    <Badge
                      variant="default"
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      Featured
                    </Badge>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="font-normal"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={`GitHub repository for ${project.title}`}
                      >
                        <Github size={20} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={`Live demo for ${project.title}`}
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                  <Button variant="ghost" size="sm" className="group">
                    View Details
                    <ArrowRight
                      size={16}
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                    />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No projects found in this category.
            </p>
          </div>
        )}

        <div className="text-center mt-12">
          <Button size="lg" className="rounded-full">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
