import { useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { format } from "date-fns"
import { posts } from "@/data/blog-data"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TableOfContents } from "@/components/blog/TableOfContents"

export default function BlogPostPage() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto max-w-3xl">
          {post.image && (
            <div className="mb-8 aspect-video overflow-hidden rounded-lg">
              <img
                src={post.image}
                alt={post.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div className="mb-8 space-y-4">
            <h1 className="text-4xl font-bold">{post.title}</h1>
            <p className="text-xl text-muted-foreground">{post.description}</p>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{post.category.label}</Badge>
              {post.tags.map((tag) => (
                <Badge key={tag.value} variant="outline">
                  {tag.label}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <div className="font-medium">{post.author.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {post.author.title}
                  </div>
                </div>
              </div>
              <Separator orientation="vertical" className="h-8" />
              <div className="text-sm text-muted-foreground">
                <time dateTime={post.date}>
                  {format(new Date(post.date), "MMMM d, yyyy")}
                </time>
                {post.readingTime && (
                  <>
                    <span className="mx-1">•</span>
                    <span>{post.readingTime}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="relative">
            <article className="prose prose-gray dark:prose-invert max-w-none">
            </article>

            <div className="hidden xl:block">
              <div className="fixed top-20 right-8 w-64">
                <ScrollArea className="h-[calc(100vh-6rem)]">
                  <TableOfContents content={post.content} />
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 