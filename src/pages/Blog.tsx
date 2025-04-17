import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Tag } from "lucide-react";
import { BlogPost, BlogCategory } from "@/types/blog";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Exemplo de categorias - você pode substituir por dados reais
  const categories: BlogCategory[] = [
    { id: "1", name: "Desenvolvimento Web", slug: "web-dev", count: 5 },
    { id: "2", name: "React", slug: "react", count: 3 },
    { id: "3", name: "TypeScript", slug: "typescript", count: 4 },
    { id: "4", name: "UI/UX", slug: "ui-ux", count: 2 },
  ];

  // Exemplo de posts - você pode substituir por dados reais
  const posts: BlogPost[] = [
    {
      id: "1",
      title: "Construindo Aplicações Modernas com React e TypeScript",
      slug: "react-typescript-apps",
      excerpt: "Aprenda as melhores práticas para desenvolver aplicações robustas usando React e TypeScript...",
      content: "",
      coverImage: "/blog/react-typescript.jpg",
      author: {
        name: "Igor Henrique",
        avatar: "/avatar.jpg",
      },
      tags: ["React", "TypeScript", "Frontend"],
      publishedAt: "2024-03-20",
      readingTime: "5 min",
    },
    // Adicione mais posts aqui
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || post.tags.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-modern-dark text-modern-white pt-24 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Blog<span className="text-modern-accent">.</span>
          </h1>
          <p className="text-modern-gray-400 text-lg max-w-2xl mx-auto">
            Compartilhando conhecimento e experiências sobre desenvolvimento web,
            tecnologia e inovação.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-modern-gray-400" />
              <input
                type="text"
                placeholder="Pesquisar artigos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-modern-dark-800 border border-modern-gray-700 focus:border-modern-accent focus:outline-none transition-colors"
              />
            </div>
          </div>
          <div className="flex gap-4 flex-wrap">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.name === selectedCategory ? null : category.name)}
                className={`px-4 py-2 rounded-full border transition-colors ${
                  category.name === selectedCategory
                    ? "border-modern-accent text-modern-accent"
                    : "border-modern-gray-700 text-modern-gray-400 hover:border-modern-accent hover:text-modern-accent"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-modern-dark-800 rounded-xl overflow-hidden border border-modern-gray-700 hover:border-modern-accent transition-colors"
            >
              <div className="relative h-48">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-full bg-modern-accent/10 text-modern-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl font-bold mb-2 hover:text-modern-accent transition-colors">
                  {post.title}
                </h2>
                <p className="text-modern-gray-400 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm text-modern-gray-400">
                      {post.author.name}
                    </span>
                  </div>
                  <span className="text-sm text-modern-gray-400">
                    {post.readingTime}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Blog; 