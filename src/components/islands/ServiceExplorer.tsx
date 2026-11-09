import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { ResponsiveImage } from './types';
interface Service { slug: string; title: string; label: string; short: string; items: string[]; links?: {slug:string;title:string}[]; photo: ResponsiveImage; }
export default function ServiceExplorer({ services }: { services: Service[] }) {
 const [active, setActive] = useState(0);
 const reduced = useReducedMotion();
 const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
 useEffect(() => () => clearTimeout(timer.current), []);
 return <div className="service-explorer">
  <div className="service-visual" aria-hidden="true"><AnimatePresence initial={false}><motion.img key={active} src={services[active].photo.src} srcSet={services[active].photo.srcSet} sizes="(max-width: 900px) 90vw, 45vw" width={services[active].photo.width} height={services[active].photo.height} alt="" loading="lazy" initial={{ clipPath: reduced ? 'inset(0)' : 'inset(100% 0 0 0)', scale: reduced ? 1 : 1.035 }} animate={{ clipPath: 'inset(0% 0 0 0)', scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .65, ease: [.22, 1, .36, 1] }} /></AnimatePresence><span className="service-visual-note">Made for your space.<br />Cared for by ANZ.</span></div>
  <div className="service-list">{services.map((service, index) => <div className={`service-item ${active === index ? 'active' : ''}`} key={service.slug} onMouseEnter={() => { clearTimeout(timer.current); timer.current = setTimeout(() => setActive(index), 100); }} onMouseLeave={() => clearTimeout(timer.current)}>
   <button type="button" aria-expanded={active === index} aria-controls={`service-${index}`} onClick={() => setActive(index)}><span className="service-number">{service.label}</span><span>{service.title}</span><span className="plus-icon" aria-hidden="true">{active === index ? '−' : '+'}</span></button>
   <motion.div className="accordion-shell" id={`service-${index}`} initial={false} animate={{ height: active === index ? "auto" : 0 }} transition={{ duration: reduced ? 0 : .48, ease: [.22, 1, .36, 1] }} aria-hidden={active !== index} inert={active !== index}><div className="service-detail"><p>{service.short}</p><ul>{service.links ? service.links.map(item => <li key={item.slug}><a href={`/services/${item.slug}/`}>{item.title}<span aria-hidden="true">↗</span></a></li>) : service.items.map(item => <li key={item}>{item}</li>)}</ul><img className="service-mobile-image" src={service.photo.src} srcSet={service.photo.srcSet} sizes="92vw" width={service.photo.width} height={service.photo.height} alt={service.title} loading="lazy" /><a className="text-link" href={`/services/${service.slug}/`}>Explore this service <span aria-hidden="true">↗</span></a></div></motion.div>
  </div>)}</div>
 </div>;
}
