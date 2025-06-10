import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

type TocItem = {
  id: string;
  title: string;
  level: number;
};

interface TableOfContentsProps {
  toc: TocItem[];
}

const TableOfContents = ({ toc }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -80% 0px',
        threshold: 0,
      },
    );

    // Observe all headings
    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      // Cleanup observer
      toc.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [toc]);

  if (toc.length === 0) {
    return null;
  }

  return (
    <Card className="mb-6 p-0 bg-white/80 dark:bg-gray-900/80 shadow-lg border border-gray-200 dark:border-gray-800 backdrop-blur rounded-xl">
      <CardContent className="p-4">
        <ScrollArea className="max-h-72 pr-2">
          <ul className="space-y-1">
            {toc.map((item) => (
              <li
                key={item.id}
                className={[
                  'transition-colors rounded',
                  item.level === 2 ? 'ml-2 font-semibold text-base' : '',
                  item.level === 3 ? 'ml-6 font-medium text-sm' : '',
                  item.level === 4 ? 'ml-10 font-normal text-xs' : '',
                ].join(' ')}
              >
                <a
                  href={`#${item.id}`}
                  role="button"
                  tabIndex={0}
                  className={[
                    'block px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400',
                    'transition-colors',
                    activeId === item.id
                      ? 'text-blue-600 dark:text-blue-400 font-bold bg-blue-100/60 dark:bg-blue-900/40 border-l-4 border-blue-500 pl-3'
                      : 'text-gray-800 dark:text-gray-200 hover:bg-blue-100/40 dark:hover:bg-blue-900/30',
                  ].join(' ')}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(item.id);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      const el = document.getElementById(item.id);
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }
                  }}
                  aria-current={activeId === item.id ? 'location' : undefined}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TableOfContents;
