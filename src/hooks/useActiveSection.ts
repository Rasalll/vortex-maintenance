import { useEffect, useState } from 'react';

/** Tracks the active section id based on scroll position, for nav highlighting. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY + 140;
      let current = ids[0] ?? '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) current = id;
      }
      setActive(current);
    };
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [ids]);

  return active;
}
