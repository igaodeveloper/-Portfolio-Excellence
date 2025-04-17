import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Search, Code } from "lucide-react"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/#code-editor", label: "Editor de Código", icon: <Code className="h-4 w-4 mr-1" /> },
  { href: "/blog", label: "Blog" },
  { href: "/cheatsheets", label: "Cheatsheets" },
  { href: "/glossary", label: "Glossary" },
  { href: "/about", label: "About" },
]

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="font-bold text-xl"
          >
            ModernFront
          </motion.div>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="flex items-center transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {item.icon && item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </div>
    </header>
  )
} 