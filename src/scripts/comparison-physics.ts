export interface ComparisonSpring { position:number; velocity:number; }
export const clamp=(value:number,min:number,max:number)=>Math.max(min,Math.min(max,value));
export function touchIntent(deltaX:number,deltaY:number){
 const dx=Math.abs(deltaX),dy=Math.abs(deltaY);
 if(dy>dx&&dy>8)return 'scroll';
 return dx>=6?'drag':'pending';
}

// Fixed substeps keep a fast gesture stable on both 60Hz and 120Hz screens.
export function advanceSpring(state:ComparisonSpring,target:number,seconds:number){
 const steps=Math.ceil(clamp(seconds,0,.064)*120)||1;
 const dt=clamp(seconds,0,.064)/steps;
 for(let i=0;i<steps;i++){
  state.velocity+=((target-state.position)*210-state.velocity*25)*dt;
  state.position+=state.velocity*dt;
 }
 return state;
}

export function comparisonPaths(position:number,bend:number,pointerY:number){
 const x=clamp(position,0,1);
 const y=clamp(pointerY,.12,.88);
 const tip=clamp(x+bend,0,1);
 const a=Math.max(0,y-.38),b=Math.min(1,y+.38);
 const f=(n:number)=>n.toFixed(5);
 const edge=`M${f(x)} 0 L${f(x)} ${f(a)} C${f(x)} ${f(a+(y-a)*.55)} ${f(tip)} ${f(y-(y-a)*.45)} ${f(tip)} ${f(y)} C${f(tip)} ${f(y+(b-y)*.45)} ${f(x)} ${f(b-(b-y)*.55)} ${f(x)} ${f(b)} L${f(x)} 1`;
 return {edge,mask:`M0 0 L${f(x)} 0 ${edge.slice(edge.indexOf(' L')+1)} L0 1 Z`,tip,y};
}
