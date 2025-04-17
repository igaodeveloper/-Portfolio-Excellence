export interface Author {
  name: string
  avatar: string
  title: string
  twitter?: string
  github?: string
  linkedin?: string
}

export interface Category {
  label: string
  value: string
  description?: string
}

export interface Tag {
  label: string
  value: string
}

export interface BlogPost {
  title: string
  slug: string
  description: string
  date: string
  author: Author
  content: string
  category: Category
  tags: Tag[]
  image?: string
  readingTime?: string
  featured?: boolean
}

export interface BlogStats {
  totalPosts: number
  totalCategories: number
  totalTags: number
  postsPerCategory: Record<string, number>
  postsPerTag: Record<string, number>
}

export type BlogCategory = {
  id: string;
  name: string;
  slug: string;
  count: number;
} 