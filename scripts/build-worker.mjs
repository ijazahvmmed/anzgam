import { readFile, readdir, mkdir, writeFile, copyFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { gzipSync } from 'node:zlib';
const root=fileURLToPath(new URL('../',import.meta.url));
const client=join(root,'dist/client');
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.webp':'image/webp','.avif':'image/avif','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8','.xml':'application/xml'};
const assets={};
async function walk(dir){for(const entry of await readdir(dir,{withFileTypes:true})){const path=join(dir,entry.name);if(entry.isDirectory())await walk(path);else{const data=await readFile(path);const key='/'+relative(client,path).replaceAll('\\','/');assets[key]={body:data.toString('base64'),type:mime[key.slice(key.lastIndexOf('.'))]||'application/octet-stream',etag:'"'+createHash('sha256').update(data).digest('hex').slice(0,20)+'"'};}}}
await walk(client);
const shared=await readFile(join(root,'shared/enquiry-services.mjs'),'utf8');
const api=shared.replace('export const','const')+'\n'+(await readFile(join(root,'worker/enquiry.mjs'),'utf8')).replace("import { enquiryServices } from '../shared/enquiry-services.mjs';",'');
const source=`${api.replace('export async function','async function')}\nconst assets=${JSON.stringify(assets)};\nexport default {async fetch(request,env){const url=new URL(request.url);if(url.pathname==='/api/enquiry')return handleEnquiry(request,env);if(!['GET','HEAD'].includes(request.method))return new Response('Method not allowed',{status:405});let path;try{path=decodeURIComponent(url.pathname);}catch{return new Response('Bad request',{status:400});}const key=path.endsWith('/')?path+'index.html':path;const asset=assets[key]||assets[path+'/index.html'];const file=asset||assets['/404.html'];if(!file)return new Response('Not found',{status:404});const headers={'Content-Type':file.type,'Cache-Control':file.type.startsWith('text/html')?'no-cache':'public, max-age=31536000, immutable','ETag':file.etag,'X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','X-Frame-Options':'DENY'};if(request.headers.get('if-none-match')===file.etag)return new Response(null,{status:304,headers});const body=request.method==='HEAD'?null:Uint8Array.from(atob(file.body),c=>c.charCodeAt(0));return new Response(body,{status:asset?200:404,headers});}};`;
await mkdir(join(root,'dist/server'),{recursive:true});await mkdir(join(root,'dist/.openai'),{recursive:true});
await writeFile(join(root,'dist/server/index.js'),source);await copyFile(join(root,'.openai/hosting.json'),join(root,'dist/.openai/hosting.json'));
console.log(`Worker: ${Object.keys(assets).length} static files, ${(gzipSync(source).length/1024/1024).toFixed(2)} MB compressed. HTML remains prerendered.`);
