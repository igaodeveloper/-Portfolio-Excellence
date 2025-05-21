import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import styles from './TableOfContents.module.css';

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
    <nav className={styles.tocContainer}>
      <ul className={styles.tocList}>
        {toc.map((item) => (
          <li
            key={item.id}
            className={`${styles.tocItem} ${item.level === 2 ? styles.tocItemLevel2 : item.level === 3 ? styles.tocItemLevel3 : styles.tocItemLevel4}`}
          >
            <Link
              to={item.id}
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              className={`${styles.tocLink} ${activeId === item.id ? styles.tocLinkActive : ''}`}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
