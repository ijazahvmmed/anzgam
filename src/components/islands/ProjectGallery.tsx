import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion, useIsPresent, useReducedMotion } from 'motion/react';
import type { ResponsiveImage } from './types';
interface Project { slug: string; name: string; category: string; location: string; photo: ResponsiveImage; }
const categories = ['All projects', 'Residential', 'Commercial'];
const ease = [.22, 1, .36, 1] as const;

function ProjectGrid({ projects, reduced }: { projects: Project[]; reduced: boolean | null }) {
 const present = useIsPresent();
 return <motion.div className="project-grid" initial={{ opacity: reduced ? 1 : 0 }} animate={{ opacity: 1, transition:{duration:reduced?0:.28,ease} }} exit={{ opacity: reduced ? 1 : 0,transition:{duration:reduced?0:.12,ease} }} aria-hidden={!present} inert={!present}>
  {Array.from({length:Math.ceil(projects.length/2)},(_,row)=><div className="project-row" key={row}>{projects.slice(row*2,row*2+2).map(p => <a className="project-card" key={p.slug} href={`/projects/${p.slug}/`}>
   <div className="project-photo"><img src={p.photo.src} srcSet={p.photo.srcSet} sizes="(max-width: 700px) calc(100vw - 44px), (min-width: 1800px) 850px, 46vw" width={p.photo.width} height={p.photo.height} alt={p.photo.alt} loading="lazy" decoding="async" /><span className="image-tag">{p.category}</span></div>
   <div className="project-caption"><h3>{p.name}</h3><span>{p.location}</span></div>
</a>)}</div>)}
 </motion.div>;
}

export default function ProjectGallery({ projects }: { projects: Project[] }) {
 const [filter, setFilter] = useState('All projects');
 const [height, setHeight] = useState<number>();
 const measure = useRef<HTMLDivElement>(null);
 const reduced = useReducedMotion();
 const selectionId=useId();
 const visible = projects.filter(p => filter === 'All projects' || p.category === filter);
 useEffect(() => {
  const element = measure.current;
  if (!element) return;
  // Animate the measured frame height, never the scale of the photographs.
  const observer = new ResizeObserver(() => {
   const next = element.getBoundingClientRect().height;
   if (next > 0) setHeight(previous => previous !== undefined && Math.abs(previous - next) < .5 ? previous : next);
  });
  observer.observe(element);
  return () => observer.disconnect();
 }, []);
 return <div>
  <div className="project-toolbar"><LayoutGroup id={selectionId}><div className="segmented" role="group" aria-label="Filter projects">{categories.map(label => <button key={label} type="button" onClick={() => setFilter(label)} aria-pressed={filter === label} aria-controls="project-results" className={`choice-surface${filter === label ? ' active' : ''}`}>
   {filter===label&&<motion.span className="selection-indicator" layoutId="project-selection" initial={false} style={{borderRadius:999}} transition={{layout:reduced?{duration:0}:{type:'spring',stiffness:420,damping:38,mass:.85}}} aria-hidden="true"/>}
   <span className="control-label">{label}</span></button>)}</div></LayoutGroup><span className="project-count">Selected ANZ projects</span></div>
  <p className="project-status" role="status">Showing {visible.length} {filter === 'All projects' ? '' : filter.toLowerCase() + ' '}projects.</p>
  <motion.div id="project-results" className="project-results" initial={false} animate={{ height: height ?? 'auto' }} transition={{ duration: reduced ? 0 : .42, ease }}>
   <div ref={measure}><AnimatePresence initial={false} mode="wait"><ProjectGrid key={filter} projects={visible} reduced={reduced}/></AnimatePresence></div>
  </motion.div>
 </div>;
}
