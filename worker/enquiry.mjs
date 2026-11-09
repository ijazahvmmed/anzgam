import { enquiryServices } from '../shared/enquiry-services.mjs';
const services = new Set([...enquiryServices,'Residential garden','Terrace garden','Plantscaping & living walls']);
const headers = { 'Content-Type':'application/json; charset=utf-8', 'Cache-Control':'no-store', 'X-Content-Type-Options':'nosniff' };
const reply=(data,status=200)=>new Response(JSON.stringify(data),{status,headers});
export async function handleEnquiry(request, env) {
 if(request.method!=='POST')return reply({success:false,message:'Method not allowed.'},405);
 const origin=request.headers.get('origin');
 if(origin && origin!==new URL(request.url).origin)return reply({success:false,message:'Please send your enquiry from this website.'},403);
 if(Number(request.headers.get('content-length')||0)>18000)return reply({success:false,message:'Your enquiry is too long.'},413);
 try {
  const type=request.headers.get('content-type')||'';
  if(!type.includes('multipart/form-data')&&!type.includes('application/x-www-form-urlencoded'))return reply({success:false,message:'Use the enquiry form to submit your request.'},415);
  const body=await request.text();
  if(body.length>18000)return reply({success:false,message:'Your enquiry is too long.'},413);
  const form=await new Response(body,{headers:{'content-type':type}}).formData();
  const get=(key)=>String(form.get(key)||'').trim();
  if(get('website'))return reply({success:true,reference:'ANZ-RECEIVED'});
  const name=get('name'),email=get('email'),phone=get('phone'),location=get('location'),service=get('service'),budget=get('budget'),message=get('message');
  if(!name||name.length>100||!/^\S+@\S+\.\S+$/.test(email)||email.length>200||!/^\+?[0-9 ()-]{10,25}$/.test(phone)||phone.replace(/\D/g,'').length<10||!location||location.length>150||!services.has(service)||budget.length>100||message.length>3000||get('consent')!=='on')return reply({success:false,message:'Please check your contact details, project location, service and consent.'},400);
  if(!env.DB)return reply({success:false,message:'Enquiries are temporarily unavailable. Please call +91 98452 92729 or email contact@anzlandscaping.in.'},503);
  const rawIp=request.headers.get('cf-connecting-ip')||'local';
  const hash=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(`${new Date().toISOString().slice(0,10)}:${rawIp}`));
  const ipHash=Array.from(new Uint8Array(hash),b=>b.toString(16).padStart(2,'0')).join('');
  const recent=await env.DB.prepare("SELECT COUNT(*) AS total FROM enquiries WHERE ip_hash = ? AND created_at > datetime('now', '-1 hour')").bind(ipHash).first();
  if(recent && recent.total>=5)return reply({success:false,message:'You have sent several enquiries. Please call us if you need immediate help.'},429);
  const reference=`ANZ-${crypto.randomUUID().slice(0,8).toUpperCase()}`;
  await env.DB.prepare('INSERT INTO enquiries (id,name,email,phone,location,service,budget,message,consent,ip_hash) VALUES (?,?,?,?,?,?,?,?,?,?)').bind(reference,name,email,phone,location,service,budget,message,1,ipHash).run();
  if(!request.headers.get('accept')?.includes('application/json'))return new Response(`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Enquiry received — ANZ</title><body style="font:18px Arial;background:#f4f5ef;color:#173e2e;padding:10vw;line-height:1.6"><h1>Thank you. Your enquiry is received.</h1><p>Your reference is ${reference}.</p><p>For a direct conversation, call <a href="tel:+919845292729">+91 98452 92729</a>.</p><a href="/">Back to ANZ Landscaping</a></body></html>`,{headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store'}});
  return reply({success:true,reference});
 } catch { return reply({success:false,message:'We couldn’t save your enquiry. Please try again, or call +91 98452 92729.'},500); }
}
