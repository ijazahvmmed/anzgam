import { createServer } from 'node:http';
import { createLocalDatabase } from './local-db.mjs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { gzipSync } from 'node:zlib';
const {DB}=createLocalDatabase();
const worker=(await import(pathToFileURL(resolve('dist/server/index.js')).href)).default;
const port=Number(process.env.PORT||4321);
createServer(async(req,res)=>{try{const chunks=[];let length=0;for await(const chunk of req){chunks.push(chunk);length+=chunk.length;if(length>20000){res.writeHead(413);res.end();return;}}const body=Buffer.concat(chunks);const request=new Request(`http://127.0.0.1:${port}${req.url}`,{method:req.method,headers:req.headers,...(body.length?{body}: {})});const response=await worker.fetch(request,{DB});const output=Buffer.from(await response.arrayBuffer());const headers=Object.fromEntries(response.headers);const compress=output.length>1000&&/text|json|xml/.test(headers['content-type'])&&req.headers['accept-encoding']?.includes('gzip');if(compress){headers['content-encoding']='gzip';headers.vary='Accept-Encoding';}res.writeHead(response.status,headers);res.end(compress?gzipSync(output):output);}catch{res.writeHead(500);res.end('Server error');}}).listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}/`));
