import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';
import { projects } from './ProjectsSection';
import { blogPosts } from '../data/blog-posts';
import { workItems } from './AboutSection';

interface Result {
  type: 'project' | 'post' | 'experience';
  id: number | string;
  title: string;
  description?: string;
  url?: string;
}

const getAllResults = (query: string): Result[] => {
  const q = query.toLowerCase();
  const projectResults = projects
    .filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    )
    .map((p) => ({
      type: 'project' as const,
      id: p.id,
      title: p.title,
      description: p.description,
      url: p.liveUrl,
    }));
  const postResults = blogPosts
    .filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q),
    )
    .map((p) => ({
      type: 'post' as const,
      id: p.id,
      title: p.title,
      description: p.excerpt,
      url: `/blog/${p.slug}`,
    }));
  const expResults = workItems
    .filter(
      (w) =>
        w.title.toLowerCase().includes(q) ||
        w.organization.toLowerCase().includes(q),
    )
    .map((w) => ({
      type: 'experience' as const,
      id: w.id,
      title: w.title,
      description: w.organization,
    }));
  return [...projectResults, ...postResults, ...expResults];
};

export const GlobalSearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (query.length > 1) setResults(getAllResults(query));
    else setResults([]);
  }, [query]);

  return (
    <>
      <button
        className="fixed z-50 p-3 text-white transition rounded-full shadow-lg bottom-8 right-8 bg-modern-accent hover:scale-105"
        onClick={() => setOpen(true)}
        aria-label="Abrir busca global (Ctrl+K)"
      >
        <FiSearch size={22} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-lg p-6 bg-white shadow-xl dark:bg-gray-900 rounded-xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <button
                className="absolute text-gray-400 top-4 right-4 hover:text-red-500"
                onClick={() => setOpen(false)}
                aria-label="Fechar busca"
              >
                <FiX size={22} />
              </button>
              <input
                ref={inputRef}
                className="w-full p-3 mb-4 text-lg bg-gray-100 rounded outline-none dark:bg-gray-800"
                placeholder="Buscar projetos, posts, experiências..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Buscar"
              />
              <div className="overflow-y-auto max-h-64">
                {results.length === 0 && query.length > 1 && (
                  <div className="py-8 text-center text-gray-400">
                    Nenhum resultado encontrado.
                  </div>
                )}
                {results.map((r) => (
                  <div
                    key={r.type + r.id}
                    className="p-3 mb-2 transition rounded cursor-pointer hover:bg-modern-accent/10"
                  >
                    <div className="font-semibold">
                      {r.title}{' '}
                      <span className="ml-2 text-xs text-gray-400">
                        [{r.type}]
                      </span>
                    </div>
                    {r.description && (
                      <div className="text-sm text-gray-500">
                        {r.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
