let dispose:(()=>void)|undefined;
function setupMarquees(){
 dispose?.();
 const strips=[...document.querySelectorAll<HTMLElement|SVGSVGElement>('[data-marquee],.cta-glow')];
 const controller=new AbortController();
 const visible=new Set<HTMLElement|SVGSVGElement>();
 const update=()=>strips.forEach(strip=>{strip.dataset.running=String(visible.has(strip)&&!document.hidden);});
 const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{const strip=entry.target as HTMLElement|SVGSVGElement;if(entry.isIntersecting)visible.add(strip);else visible.delete(strip);});update();});
 strips.forEach(strip=>{strip.dataset.enhanced='';observer.observe(strip);});
 document.addEventListener('visibilitychange',update,{signal:controller.signal});
 dispose=()=>{observer.disconnect();controller.abort();strips.forEach(strip=>{delete strip.dataset.enhanced;delete strip.dataset.running;});};
}
setupMarquees();
document.addEventListener('astro:page-load',setupMarquees);
document.addEventListener('astro:before-swap',()=>dispose?.());
window.addEventListener('pagehide',()=>dispose?.());
window.addEventListener('pageshow',event=>{if(event.persisted)setupMarquees();});
export {};
