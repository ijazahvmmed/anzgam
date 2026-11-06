import type { APIRoute } from 'astro';
import { projects,services } from '../data/content';
export const GET: APIRoute = ({ site }) => {
 const pages=['/',...projects.map(p=>`/projects/${p.slug}/`),...services.map(s=>`/services/${s.slug}/`)];
 return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(path=>`<url><loc>${new URL(path,site)}</loc></url>`).join('')}</urlset>`,{headers:{'content-type':'application/xml'}});
};
