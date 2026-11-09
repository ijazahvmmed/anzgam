import gsap from 'gsap';

export function enhanceAccordions() {
 const controller=new AbortController();
 const items=[...document.querySelectorAll<HTMLDetailsElement>('.faq-list details,details[data-disclosure]')];
 const names=items.map(item=>item.getAttribute('name'));
 items.forEach(item=>item.removeAttribute('name'));
 function setOpen(item:HTMLDetailsElement,open:boolean) {
  const summary=item.querySelector('summary');
  if(!summary)return;
  const start=item.getBoundingClientRect().height;
  gsap.killTweensOf(item);
  item.dataset.closing=String(!open);
  if(open) {
   item.open=true;
   item.style.height='auto';
   const end=item.getBoundingClientRect().height;
   gsap.fromTo(item,{height:start,overflow:'hidden'},{height:end,duration:.42,ease:'power3.out',clearProps:'height,overflow',onComplete:()=>{delete item.dataset.closing;}});
  } else {
   gsap.to(item,{height:summary.getBoundingClientRect().height,overflow:'hidden',duration:.3,ease:'power2.inOut',onComplete:()=>{item.open=false;delete item.dataset.closing;gsap.set(item,{clearProps:'height,overflow'});}});
  }
 }
 items.forEach(item=>item.querySelector('summary')?.addEventListener('click',event=>{
  event.preventDefault();
  const open=!item.open||item.dataset.closing==='true';
  if(open)items.filter(other=>other!==item&&other.parentElement===item.parentElement&&other.open).forEach(other=>setOpen(other,false));
  setOpen(item,open);
 },{signal:controller.signal}));
 return ()=>{controller.abort();items.forEach((item,index)=>{gsap.killTweensOf(item);if(item.dataset.closing==='true')item.open=false;gsap.set(item,{clearProps:'height,overflow'});delete item.dataset.closing;if(names[index])item.setAttribute('name',names[index]!);});};
}
