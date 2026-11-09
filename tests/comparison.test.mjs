import test from 'node:test';
import assert from 'node:assert/strict';
import { advanceSpring,comparisonPaths,touchIntent } from '../src/scripts/comparison-physics.ts';

test('touch movement preserves vertical scrolling and accepts horizontal drags',()=>{
 assert.equal(touchIntent(2,40),'scroll');
 assert.equal(touchIntent(-3,-25),'scroll');
 assert.equal(touchIntent(40,2),'drag');
 assert.equal(touchIntent(-25,-3),'drag');
 assert.equal(touchIntent(2,3),'pending');
});

test('the divider settles at the chosen position across refresh rates',()=>{
 for(const hz of [30,60,120]){
  const spring={position:.2,velocity:0};
  for(let i=0;i<hz*2;i++)advanceSpring(spring,.85,1/hz);
  assert.ok(Math.abs(spring.position-.85)<.0001);
  assert.ok(Math.abs(spring.velocity)<.0001);
 }
});
test('reversals and a suspended frame keep the spring finite and recoverable',()=>{
 const spring={position:.5,velocity:0};
 for(let i=0;i<100;i++)advanceSpring(spring,i%2, i===50?4:1/120);
 assert.ok(Number.isFinite(spring.position)&&Number.isFinite(spring.velocity));
 for(let i=0;i<240;i++)advanceSpring(spring,.5,1/120);
 assert.ok(Math.abs(spring.position-.5)<.0001);
});
test('the image mask and visible seam share one curve at both bounds',()=>{
 for(const x of [0,.05,.5,.95,1])for(const bend of [-.09,0,.09]){
  const {edge,mask,tip,y}=comparisonPaths(x,bend,-1);
  assert.ok(tip>=0&&tip<=1);
  assert.equal(y,.12);
  assert.ok(mask.includes(edge.slice(edge.indexOf(' L')+1)));
  assert.ok(!/NaN|Infinity/.test(mask));
 }
});
