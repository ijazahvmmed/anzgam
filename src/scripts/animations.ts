import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { enhanceAccordions } from './accordions';

gsap.registerPlugin(ScrollTrigger);
const revealed = new WeakSet<HTMLElement>();
const ease = 'power3.out';
let cleanup: (() => void) | undefined;

function initialize() {
  cleanup?.();
  const mm = gsap.matchMedia();
  mm.add({ motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 901px)' }, context => {
    if (!context.conditions?.motion) {
      delete document.documentElement.dataset.motionPending;
      return;
    }
    const desktop = context.conditions.desktop;
    const cleanupAccordions=enhanceAccordions();

    // The hero is composed as a short sequence; it never waits for a scroll.
    const heroHeading = document.querySelector<HTMLElement>('[data-hero-reveal]');
    if (heroHeading && !revealed.has(heroHeading) && window.scrollY < 80 && document.documentElement.hasAttribute('data-motion-pending')) {
      const hero = gsap.timeline({ defaults: { ease }, onComplete: () => { revealed.add(heroHeading); } });
      hero.fromTo('.hero-card > .eyebrow', { y: 5, filter: 'blur(2px)' }, { y: 0, filter: 'blur(0px)', duration: .7, clearProps: 'transform,filter' }, 0);
      hero.fromTo(heroHeading.querySelectorAll('.reveal-line-inner'), { yPercent: 108, rotate: .65 }, { yPercent: 0, rotate: 0, duration: 1.12, stagger: .105, clearProps: 'transform' }, .06);
      hero.fromTo('.hero-card > p', { y: 7, filter: 'blur(2px)' }, { y: 0, filter: 'blur(0px)', duration: .85, clearProps: 'transform,filter' }, .3);
      hero.fromTo('.hero-card > .button, .hero-secondary', { y: 6 }, { y: 0, duration: .9, stagger: .06, clearProps: 'transform' }, .43);
    }
    delete document.documentElement.dataset.motionPending;

    // Phrase masks retain natural line breaks and the accessible heading name.
    document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-hero-reveal])').forEach(heading => {
      if (revealed.has(heading)) return;
      const soft = heading.dataset.reveal === 'soft';
      const parts = heading.querySelectorAll<HTMLElement>('.reveal-line-inner');
      const reveal = gsap.timeline({ scrollTrigger: { trigger: heading, start: 'top 89%', once: true }, onComplete: () => { revealed.add(heading); } });
      if (soft) {
        reveal.fromTo(parts, { y: 8, filter: 'blur(2px)' }, { y: 0, filter: 'blur(0px)', duration: 1.05, stagger: .09, ease: 'power2.out', clearProps: 'transform,filter' });
      } else {
        reveal.fromTo(parts, { yPercent: 108, rotate: .35 }, { yPercent: 0, rotate: 0, duration: 1.02, stagger: .105, ease, clearProps: 'transform' });
      }
      const eyebrow = heading.parentElement?.querySelector<HTMLElement>('.eyebrow');
      if (eyebrow) reveal.fromTo(eyebrow, { x: -6 }, { x: 0, duration: .9, ease, clearProps: 'transform' }, 0);
    });

    // Characters are always present. Scroll changes colour directly, never opacity.
    document.querySelectorAll<HTMLElement>('[data-highlight]').forEach(element => {
      const characters = element.querySelectorAll<HTMLElement>('.char');
      let previous = -1;
      const update = (progress: number) => {
        const count = Math.round(progress * characters.length);
        if (count === previous) return;
        characters.forEach((c, i) => c.classList.toggle('is-lit', i < count));
        previous = count;
      };
      ScrollTrigger.create({ trigger: element, start: 'top 84%', end: 'bottom 44%', onUpdate: self => update(self.progress), onRefresh: self => update(self.progress) });
    });

    // Small photographic movement; no pinned sections or hijacked scroll.
    document.querySelectorAll<HTMLElement>('[data-scroll-shape]').forEach(shape=>{
      const turn=Number(shape.dataset.turn||0);
      gsap.fromTo(shape,{rotate:-turn*.45,scale:shape.hasAttribute('data-grow') ? .65 : .82},{rotate:turn,scale:1.04,ease:'none',scrollTrigger:{trigger:shape.closest('section')||shape,start:'top 85%',end:'bottom 35%',scrub:.55}});
    });
    if (desktop) {
      const hero = document.querySelector('.hero');
      if (hero) gsap.to('.hero-photo img', { yPercent: 7, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: .35 } });
      document.querySelectorAll<HTMLElement>('[data-parallax]').forEach(el => gsap.fromTo(el, { y: 24 }, { y: -24, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: .45 } }));
    }
    return () => { cleanupAccordions(); delete document.documentElement.dataset.motionPending; };
  });
  cleanup = () => mm.revert();
}
initialize();
document.addEventListener('astro:page-load', initialize);
document.addEventListener('astro:before-swap', () => cleanup?.());
window.addEventListener('pagehide', () => cleanup?.());
window.addEventListener('pageshow', event => { if (event.persisted) initialize(); });
