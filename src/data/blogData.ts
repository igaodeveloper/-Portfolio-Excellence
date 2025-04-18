export interface Category {
  value: string;
  label: string;
}

export const categories: Category[] = [
  { value: 'all', label: 'All Posts' },
  { value: 'web-development', label: 'Web Development' },
  { value: 'programming', label: 'Programming' },
  { value: 'design', label: 'Design' },
  { value: 'technology', label: 'Technology' },
];

export const getCategories = (): Category[] => {
  return categories;
};
