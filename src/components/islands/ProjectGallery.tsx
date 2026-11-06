import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { ResponsiveImage } from './types';
interface Project { slug: string; name: string; category: string; location: string; photo: ResponsiveImage; }
export default function ProjectGallery({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState('All projects');
  const reduced = useReducedMotion();
  const categories = ['All projects', 'Residential', 'Commercial'];
  return <div>
    <div className="project-toolbar"><div className="segmented" role="group" aria-label="Filter projects">{categories.map(label => <button key={label} type="button" onClick={() => setFilter(label)} aria-pressed={filter === label} className={filter === label ? 'active' : ''}>{label}</button>)}</div><span className="project-count">A few places we’ve brought to life <span>↙</span></span></div>
    <motion.div layout={!reduced} className="project-grid" aria-live="polite"><AnimatePresence initial={false} mode="popLayout">{projects.filter(p => filter === 'All projects' || p.category === filter).map((p, i) => <motion.a layout={!reduced} initial={false} animate={{ scale: 1, opacity: 1 }} exit={{ scale: reduced ? 1 : .97, opacity: 0 }} transition={{ duration: reduced ? 0 : .35, ease: [.22, 1, .36, 1] }} className="project-card" key={p.slug} href={`/projects/${p.slug}/`}>
      <div className="project-photo"><img src={p.photo.src} srcSet={p.photo.srcSet} sizes="(max-width: 700px) 92vw, 48vw" width={p.photo.width} height={p.photo.height} alt={p.photo.alt} loading="lazy" decoding="async" /><span className="image-tag">{p.category}</span><span className="project-open" aria-hidden="true">↗</span><span className="image-index" aria-hidden="true">0{i + 1}</span></div><div className="project-caption"><h3>{p.name}</h3><span>{p.location}</span></div>
    </motion.a>)}</AnimatePresence></motion.div>
  </div>;
}
