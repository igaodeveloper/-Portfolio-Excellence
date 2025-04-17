import { useState } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { posts, categories } from "@/data/blog-data"
import { BlogPost } from "@/types/blog"
import { Input } from "@/components/ui/input"
import CategoryFilter from "@/components/blog/CategoryFilter"

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesCategory =
      activeCategory === "all" || post.category.value === activeCategory
    return matchesSearch && matchesCategory
  })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-4xl font-bold">Blog</h1>
      
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <CategoryFilter
          categories={[
            { label: "All", value: "all", description: "All posts" },
            ...categories,
          ]}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filteredPosts.map((post) => (
          <motion.div
            key={post.slug}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}
          >
            
          </motion.div>
        ))}
      </motion.div>

      {filteredPosts.length === 0 && (
        <div className="text-center text-muted-foreground">
          No posts found. Try adjusting your search or filter.
        </div>
      )}
    </div>
  )
} 