import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Badge } from '../ui/badge';

interface Category {
  id: string;
  name: string;
  slug: string;
  count?: number;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onChange: (category: string | null) => void;
  showCounts?: boolean;
  variant?: 'dropdown' | 'badges' | 'pills';
}

const CategoryFilter = ({
  categories,
  selectedCategory,
  onChange,
  showCounts = true,
  variant = 'dropdown',
}: CategoryFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (variant === 'badges') {
    return (
      <div className="flex flex-wrap gap-2">
        <Badge
          variant={selectedCategory === null ? 'default' : 'outline'}
          className="transition-all duration-200 shadow-sm cursor-pointer focus:ring-2 focus:ring-blue-400 focus:outline-none hover:scale-105"
          tabIndex={0}
          aria-label="Todas as categorias"
          onClick={() => onChange(null)}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onChange(null); }}
        >
          Todos
          {selectedCategory === null && <Check className="w-3 h-3 ml-1" />}
        </Badge>
        {categories.map((category) => (
          <Badge
            key={category.id}
            variant={selectedCategory === category.name ? 'default' : 'outline'}
            className="transition-all duration-200 shadow-sm cursor-pointer focus:ring-2 focus:ring-blue-400 focus:outline-none hover:scale-105"
            tabIndex={0}
            aria-label={`Categoria ${category.name}`}
            onClick={() => onChange(category.name)}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onChange(category.name); }}
          >
            {category.name}
            {showCounts && category.count !== undefined && ` (${category.count})`}
            {selectedCategory === category.name && (
              <Check className="w-3 h-3 ml-1" />
            )}
          </Badge>
        ))}
      </div>
    );
  }

  if (variant === 'pills') {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? 'default' : 'outline'}
          size="sm"
          className="transition-all duration-200 rounded-full shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none hover:scale-105"
          tabIndex={0}
          aria-label="Todas as categorias"
          onClick={() => onChange(null)}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onChange(null); }}
        >
          Todos
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.name ? 'default' : 'outline'}
            size="sm"
            className="transition-all duration-200 rounded-full shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none hover:scale-105"
            tabIndex={0}
            aria-label={`Categoria ${category.name}`}
            onClick={() => onChange(category.name)}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onChange(category.name); }}
          >
            {category.name}
            {showCounts && category.count !== undefined && ` (${category.count})`}
          </Button>
        ))}
      </div>
    );
  }

  // Default: dropdown
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 transition-all duration-200 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none hover:scale-105">
          <span>
            {selectedCategory ? selectedCategory : 'Todas as categorias'}
          </span>
          <ChevronDown className="w-4 h-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>Categorias</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={selectedCategory === null}
          aria-checked={selectedCategory === null}
          aria-label="Todas as categorias"
          onSelect={() => {
            onChange(null);
            setIsOpen(false);
          }}
        >
          Todas as categorias
        </DropdownMenuCheckboxItem>
        {categories.map((category) => (
          <DropdownMenuCheckboxItem
            key={category.id}
            checked={selectedCategory === category.name}
            aria-checked={selectedCategory === category.name}
            aria-label={`Categoria ${category.name}`}
            onSelect={() => {
              onChange(category.name);
              setIsOpen(false);
            }}
          >
            <div className="flex justify-between w-full">
              <span>{category.name}</span>
              {showCounts && category.count !== undefined && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {category.count}
                </span>
              )}
            </div>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoryFilter;
