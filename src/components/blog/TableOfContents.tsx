import { useState, useEffect } from "react"
import { Link } from "react-scroll"

type TocItem = {
  id: string
  title: string
  level: number
}

interface TableOfContentsProps {
  toc: TocItem[]
}

const TableOfContents = ({ toc }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-100px 0px -80% 0px",
        threshold: 0,
      }
    )

    // Observe all headings
    toc.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      // Cleanup observer
      toc.forEach((item) => {
        const element = document.getElementById(item.id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [toc])

  if (toc.length === 0) {
    return null
  }

  return (
    <nav className="table-of-contents text-sm">
      <ul className="space-y-2 text-gray-600 dark:text-gray-400">
        {toc.map((item) => (
          <li
            key={item.id}
            className={`${
              item.level === 2 ? "pl-0" : item.level === 3 ? "pl-4" : "pl-6"
            }`}
          >
            <Link
              to={item.id}
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              className={`block py-1 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors ${
                activeId === item.id
                  ? "text-blue-600 dark:text-blue-400 font-medium"
                  : ""
              }`}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default TableOfContents 