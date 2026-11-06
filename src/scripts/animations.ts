import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

let cleanup: (() => void) | undefined;
function initialize() {
  cleanup?.();
  const mm = gsap.matchMedia();
  mm.add({ motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 901px)' }, context => {
    if (!context.conditions?.motion) return;
    document.querySelectorAll<HTMLElement>('[data-highlight]').forEach(element => {
      const characters = element.querySelectorAll<HTMLElement>('.char');
      let previous = -1;
      ScrollTrigger.create({ trigger: element, start: 'top 82%', end: 'bottom 43%', onUpdate: self => {
        const count = Math.round(self.progress * characters.length);
        if (count === previous) return;
        characters.forEach((c, i) => c.classList.toggle('is-lit', i < count)); previous = count;
      } });
    });
    if (context.conditions.desktop) {
      const hero = document.querySelector('.hero');
      if (hero) gsap.to('.hero-photo img', { yPercent: 9, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
      document.querySelectorAll<HTMLElement>('[data-parallax]').forEach(el => gsap.fromTo(el, { y: 28 }, { y: -28, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: .6 } }));
    }
    document.querySelectorAll<HTMLElement>('[data-blur]').forEach(el => gsap.from(el, { filter: 'blur(5px)', duration: .75, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } }));
  });
  cleanup = () => mm.revert();
}
initialize();
document.addEventListener('astro:page-load', initialize);
document.addEventListener('astro:before-swap', () => cleanup?.());
window.addEventListener('pagehide', () => cleanup?.());
window.addEventListener('pageshow', event => { if (event.persisted) initialize(); });
