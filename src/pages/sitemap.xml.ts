import type { APIRoute } from 'astro';
import { projects } from '../data/content';
import { allServices } from '../data/services';
export const GET: APIRoute = ({ site }) => {
 const pages=['/','/services/',...projects.map(p=>`/projects/${p.slug}/`),...allServices.map(s=>`/services/${s.slug}/`)];
 return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(path=>`<url><loc>${new URL(path,site)}</loc></url>`).join('')}</urlset>`,{headers:{'content-type':'application/xml'}});
};
