import { advanceSpring,clamp,comparisonPaths,touchIntent } from './comparison-physics';

let dispose:(()=>void)|undefined;
function enhance(root:HTMLElement){
 const stage=root.querySelector<HTMLElement>('[data-comparison-stage]')!;
 const before=root.querySelector<HTMLElement>('[data-comparison-before]')!;
 const mask=root.querySelector<SVGPathElement>('[data-comparison-mask]')!;
 const line=root.querySelector<SVGPathElement>('[data-comparison-line]')!;
 const handle=root.querySelector<HTMLButtonElement>('[data-comparison-handle]')!;
 const clip=mask.parentElement!.id;
 const motion=matchMedia('(prefers-reduced-motion:reduce)');
 const controller=new AbortController(),{signal}=controller;
 const spring={position:.5,velocity:0};
 let target=.5,pointerY=.5,bend=0,frame=0,lastTime=0;
 let active:number|null=null,dragging=false,startX=0,startY=0;
 let bounds=stage.getBoundingClientRect();
 const labels=[root.dataset.beforeLabel!,root.dataset.afterLabel!];
 const render=()=>{
  const width=Math.max(bounds.width,1);
  bend=motion.matches?0:clamp(target-spring.position,-Math.min(.09,85/width),Math.min(.09,85/width));
  // The handle stays under the pointer; only the ends of the seam trail it.
  const {edge,mask:shape,tip,y}=comparisonPaths(target-bend,bend,pointerY);
  mask.setAttribute('d',shape);line.setAttribute('d',edge);
  handle.style.left=(tip*100)+'%';handle.style.top=(y*100)+'%';
  const value=Math.round(target*100);
  handle.setAttribute('aria-valuenow',String(value));
  handle.setAttribute('aria-valuetext',`${value}% ${labels[0].toLowerCase()}, ${100-value}% ${labels[1].toLowerCase()}`);
  root.querySelector<HTMLElement>('.comparison-label--before')!.style.opacity=target<.16?'0':'1';
  root.querySelector<HTMLElement>('.comparison-label--after')!.style.opacity=target>.84?'0':'1';
 };
 const stop=()=>{cancelAnimationFrame(frame);frame=0;lastTime=0;};
 const tick=(time:number)=>{
  frame=0;
  advanceSpring(spring,target,lastTime?(time-lastTime)/1000:1/60);lastTime=time;
  if(Math.abs(target-spring.position)<.00004&&Math.abs(spring.velocity)<.0004){spring.position=target;spring.velocity=0;lastTime=0;render();return;}
  render();frame=requestAnimationFrame(tick);
 };
 const update=()=>{
  if(motion.matches){stop();spring.position=target;spring.velocity=0;render();}
  else if(!frame){lastTime=0;frame=requestAnimationFrame(tick);}
 };
 const locate=(event:PointerEvent)=>{
  target=clamp((event.clientX-bounds.left)/Math.max(bounds.width,1),0,1);
  pointerY=clamp((event.clientY-bounds.top)/Math.max(bounds.height,1),.12,.88);
  update();
 };
 const release=()=>{
  if(active!==null&&stage.hasPointerCapture(active))stage.releasePointerCapture(active);
  active=null;dragging=false;delete stage.dataset.dragging;
 };
 stage.addEventListener('pointerdown',event=>{
  if(!event.isPrimary||event.button!==0)return;
  bounds=stage.getBoundingClientRect();active=event.pointerId;
  startX=event.clientX;startY=event.clientY;
  dragging=event.pointerType!=='touch';
  stage.setPointerCapture(event.pointerId);
  if(dragging){stage.dataset.dragging='';handle.focus({preventScroll:true});locate(event);}
 },{signal});
 stage.addEventListener('pointermove',event=>{
  if(event.pointerId!==active)return;
  if(!dragging){
   const intent=touchIntent(event.clientX-startX,event.clientY-startY);
   if(intent==='scroll'){release();return;}
   if(intent==='pending')return;
   dragging=true;stage.dataset.dragging='';handle.focus({preventScroll:true});
  }
  locate(event);
 },{signal});
 stage.addEventListener('pointerup',event=>{
  if(event.pointerId!==active)return;
  // A tap chooses a point; vertical touch gestures remain native scrolling.
  if(dragging||Math.hypot(event.clientX-startX,event.clientY-startY)<6)locate(event);
  release();
 },{signal});
 stage.addEventListener('pointercancel',release,{signal});
 stage.addEventListener('lostpointercapture',release,{signal});
 handle.addEventListener('keydown',event=>{
  const increment=event.shiftKey?.1:.02;
  const values:Record<string,number>={ArrowLeft:target-increment,ArrowRight:target+increment,ArrowDown:target-increment,ArrowUp:target+increment,PageDown:target-.1,PageUp:target+.1,Home:0,End:1};
  if(!(event.key in values))return;
  event.preventDefault();target=clamp(values[event.key],0,1);pointerY=.5;update();
 },{signal});
 const reset=()=>{release();stop();spring.position=target;spring.velocity=0;render();};
 motion.addEventListener('change',reset,{signal});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)reset();},{signal});
 const resize=new ResizeObserver(()=>{bounds=stage.getBoundingClientRect();reset();});resize.observe(stage);
 const visibility=new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)reset();});visibility.observe(stage);
 before.style.clipPath=`url("#${clip}")`;stage.dataset.ready='';handle.disabled=false;render();
 return()=>{reset();controller.abort();resize.disconnect();visibility.disconnect();before.style.clipPath='';delete stage.dataset.ready;handle.disabled=true;};
}

export function initializeComparisons(){
 dispose?.();
 const cleanups=[...document.querySelectorAll<HTMLElement>('[data-comparison]')].map(enhance);
 dispose=()=>cleanups.forEach(cleanup=>cleanup());
}
document.addEventListener('astro:page-load',initializeComparisons);
document.addEventListener('astro:before-swap',()=>dispose?.());
window.addEventListener('pagehide',()=>dispose?.());
window.addEventListener('pageshow',event=>{if(event.persisted)initializeComparisons();});
