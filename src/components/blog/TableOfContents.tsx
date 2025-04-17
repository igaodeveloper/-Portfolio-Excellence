import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")
  const [headings, setHeadings] = useState<Heading[]>([])

  useEffect(() => {
    // Extract headings from markdown content
    const headingRegex = /^(#{1,6})\s+(.+)$/gm
    const matches = Array.from(content.matchAll(headingRegex))
    const extractedHeadings = matches.map((match) => ({
      id: match[2].toLowerCase().replace(/[^\w]+/g, "-"),
      text: match[2],
      level: match[1].length,
    }))
    setHeadings(extractedHeadings)
  }, [content])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-80px 0px -80% 0px" }
    )

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [headings])

  if (headings.length === 0) {
    return null
  }

  return (
    <nav className="space-y-1">
      <div className="font-medium">Table of Contents</div>
      {headings.map((heading) => (
        <Link
          key={heading.id}
          to={`#${heading.id}`}
          className={`block text-sm transition-colors ${
            activeId === heading.id
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
          style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
        >
          {heading.text}
        </Link>
      ))}
    </nav>
  )
} 