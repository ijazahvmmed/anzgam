import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
let dispose: (() => void) | undefined;

function initializeSmoothScroll() {
 dispose?.();
 const media = gsap.matchMedia();
 // Touch devices keep their own momentum; reduced motion never loads Lenis.
 media.add('(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)', () => {
  let active = true;
  let destroy: (() => void) | undefined;
  void import('lenis').then(({ default: Lenis }) => {
   if (!active) return;
   const lenis = new Lenis({
    autoRaf: false,
    lerp: .075,
    wheelMultiplier: .9,
    smoothWheel: true,
    syncTouch: false,
    anchors: false,
    stopInertiaOnNavigate: true,
    respectReducedMotion: true,
   });
   const controller = new AbortController();
   const { signal } = controller;
   const focusTargets = new Set<HTMLElement>();
   const tick = (seconds: number) => lenis.raf(seconds * 1000);
   const update = () => ScrollTrigger.update();
   const refresh = () => lenis.resize();
   const removeScroll = lenis.on('scroll', update);
   gsap.ticker.lagSmoothing(0);
   gsap.ticker.add(tick);
   ScrollTrigger.addEventListener('refresh', refresh);

   // Native, independently scrollable controls must not drive the page.
   // Their data-lenis-prevent attributes are also respected by Lenis itself.
   const focusTarget = (target: HTMLElement) => {
    if (!target.matches('a[href],button,input,select,textarea,[tabindex]')) {
     target.setAttribute('tabindex', '-1');
     focusTargets.add(target);
     target.addEventListener('blur', () => {
      target.removeAttribute('tabindex');
      focusTargets.delete(target);
     }, { once: true, signal });
    }
    target.focus({ preventScroll: true });
   };
   document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null;
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash) return;
    let target: HTMLElement | null;
    try { target = document.getElementById(decodeURIComponent(url.hash.slice(1))); } catch { return; }
    if (!target) return;
    const destination = target;
    event.preventDefault();
    if (url.href !== location.href) history.pushState(history.state, '', url.href);
    // One scroll owner: Lenis also honours CSS scroll padding and margins.
    lenis.scrollTo(destination, {
     duration: 1.05,
     lerp: 0,
     easing: t => 1 - Math.pow(1 - t, 4),
     immediate: link.classList.contains('skip-link'),
     onComplete: () => focusTarget(destination),
    });
   }, { signal });

   const cancelInertia = () => lenis.scrollTo(window.scrollY, { immediate: true });
   document.addEventListener('keydown', event => {
    if (!['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) return;
    if (event.target instanceof Element && event.target.closest('input,textarea,select,[contenteditable=true]')) return;
    cancelInertia();
   }, { signal });
   document.addEventListener('visibilitychange', cancelInertia, { signal });
   window.addEventListener('popstate', cancelInertia, { signal });

   // Filtering and accordions change page height without a viewport resize.
   let refreshTimer: ReturnType<typeof setTimeout>;
   let height = document.body.scrollHeight;
   const observer = new ResizeObserver(() => {
    if (document.body.scrollHeight === height) return;
    height = document.body.scrollHeight;
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 140);
   });
   observer.observe(document.body);
   destroy = () => {
    controller.abort();
    observer.disconnect();
    clearTimeout(refreshTimer);
    focusTargets.forEach(target => target.removeAttribute('tabindex'));
    removeScroll();
    ScrollTrigger.removeEventListener('refresh', refresh);
    gsap.ticker.remove(tick);
    lenis.destroy();
    gsap.ticker.lagSmoothing(500, 33);
   };
  }).catch(() => { /* Native scrolling remains available if enhancement fails. */ });
  return () => { active = false; destroy?.(); };
 });
 dispose = () => media.revert();
}

initializeSmoothScroll();
document.addEventListener('astro:page-load', initializeSmoothScroll);
document.addEventListener('astro:before-swap', () => dispose?.());
window.addEventListener('pagehide', () => dispose?.());
window.addEventListener('pageshow', event => { if (event.persisted) initializeSmoothScroll(); });
