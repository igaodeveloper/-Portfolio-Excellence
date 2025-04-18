import { Author, Category, Tag, BlogPost } from '@/types/blog';

export const authors: Author[] = [
  {
    name: 'John Doe',
    avatar: '/avatars/john-doe.jpg',
    title: 'Senior Front-End Developer',
    twitter: 'johndoe',
    github: 'johndoe',
    linkedin: 'johndoe',
  },
];

export const categories: Category[] = [
  {
    label: 'JavaScript',
    value: 'javascript',
    description: 'Modern JavaScript features, best practices, and patterns',
  },
  {
    label: 'React',
    value: 'react',
    description: 'React ecosystem, hooks, patterns, and performance',
  },
  {
    label: 'CSS',
    value: 'css',
    description: 'Modern CSS techniques, layouts, and animations',
  },
  {
    label: 'Performance',
    value: 'performance',
    description: 'Web performance optimization techniques and metrics',
  },
  {
    label: 'Accessibility',
    value: 'accessibility',
    description: 'Web accessibility guidelines and best practices',
  },
];

export const tags: Tag[] = [
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Next.js', value: 'nextjs' },
  { label: 'Tailwind CSS', value: 'tailwindcss' },
  { label: 'React Hooks', value: 'react-hooks' },
  { label: 'State Management', value: 'state-management' },
  { label: 'Testing', value: 'testing' },
  { label: 'Web APIs', value: 'web-apis' },
  { label: 'CSS Grid', value: 'css-grid' },
  { label: 'Flexbox', value: 'flexbox' },
  { label: 'Animation', value: 'animation' },
];

export const posts: BlogPost[] = [
  {
    title: 'Understanding React Server Components',
    slug: 'understanding-react-server-components',
    description:
      'A deep dive into React Server Components and how they change the way we build React applications',
    date: '2024-03-20',
    author: authors[0],
    content: `
# Understanding React Server Components

React Server Components (RSC) represent a paradigm shift in how we build React applications...

## What are Server Components?

Server Components are a new architectural pattern that allows React components to...

## Benefits of Server Components

1. Improved Performance
2. Reduced Bundle Size
3. Better Developer Experience

## Code Example

\`\`\`tsx
// Server Component
async function BlogPosts() {
  const posts = await getPosts()
  
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
\`\`\`

## When to Use Server Components

Server Components are best suited for...

## Best Practices

1. Keep data fetching close to where it's used
2. Use proper component boundaries
3. Consider the client/server split carefully

## Conclusion

Server Components are a powerful addition to React's toolbox...
    `,
    category: categories[1],
    tags: [tags[0], tags[1]],
    image: '/blog/server-components.jpg',
    readingTime: '8 min read',
    featured: true,
  },
];
