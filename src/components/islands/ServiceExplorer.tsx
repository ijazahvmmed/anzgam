import { useState, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { ResponsiveImage } from './types';
interface Service { slug: string; title: string; label: string; short: string; items: string[]; photo: ResponsiveImage; }
export default function ServiceExplorer({ services }: { services: Service[] }) {
 const [active, setActive] = useState(0);
 const reduced = useReducedMotion();
 const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
 return <div className="service-explorer">
  <div className="service-visual" aria-hidden="true"><AnimatePresence initial={false}><motion.img key={active} src={services[active].photo.src} srcSet={services[active].photo.srcSet} sizes="(max-width: 900px) 90vw, 45vw" width={services[active].photo.width} height={services[active].photo.height} alt="" loading="lazy" initial={{ clipPath: reduced ? 'inset(0)' : 'inset(100% 0 0 0)', scale: reduced ? 1 : 1.035 }} animate={{ clipPath: 'inset(0% 0 0 0)', scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .65, ease: [.22, 1, .36, 1] }} /></AnimatePresence><span className="service-visual-note">Made for your space.<br />Cared for by ANZ.</span></div>
  <div className="service-list">{services.map((service, index) => <div className={`service-item ${active === index ? 'active' : ''}`} key={service.slug} onMouseEnter={() => { clearTimeout(timer.current); timer.current = setTimeout(() => setActive(index), 100); }} onMouseLeave={() => clearTimeout(timer.current)}>
   <button type="button" aria-expanded={active === index} aria-controls={`service-${index}`} onClick={() => setActive(index)}><span className="service-number">{service.label}</span><span>{service.title}</span><span className="plus-icon" aria-hidden="true">{active === index ? '−' : '+'}</span></button>
   <div className="service-detail" id={`service-${index}`} hidden={active !== index}><p>{service.short}</p><ul>{service.items.map(item => <li key={item}>{item}</li>)}</ul><img className="service-mobile-image" src={service.photo.src} srcSet={service.photo.srcSet} sizes="92vw" width={service.photo.width} height={service.photo.height} alt={service.title} loading="lazy" /><a className="text-link" href={`/services/${service.slug}/`}>Explore this service <span aria-hidden="true">↗</span></a></div>
  </div>)}<a className="all-services" href="https://anzlandscaping.in/services/">See all ANZ services <span aria-hidden="true">↗</span></a></div>
 </div>;
}
