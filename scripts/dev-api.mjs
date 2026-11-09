import { createLocalDatabase } from './local-db.mjs';
import { handleEnquiry } from '../worker/enquiry.mjs';

// Keep the localhost enquiry flow functional during Astro hot reload.
export function localEnquiries() {
  return {
    name:'anz-local-enquiries',
    configureServer(server) {
      const database=createLocalDatabase();
      server.httpServer?.once('close',database.close);
      server.middlewares.use(async(req,res,next)=>{
        if(req.url?.split('?')[0]!=='/api/enquiry')return next();
        try {
          const chunks=[];
          let size=0;
          for await(const chunk of req) {
            size+=chunk.length;
            if(size>20000){res.writeHead(413);res.end();return;}
            chunks.push(chunk);
          }
          const body=Buffer.concat(chunks);
          const request=new Request(`http://${req.headers.host}${req.url}`,{
            method:req.method,headers:req.headers,...(body.length?{body}:{}),
          });
          const response=await handleEnquiry(request,{DB:database.DB});
          res.writeHead(response.status,Object.fromEntries(response.headers));
          res.end(Buffer.from(await response.arrayBuffer()));
        } catch {
          res.writeHead(500,{'content-type':'application/json'});
          res.end(JSON.stringify({success:false,message:'Unable to save your enquiry. Please try again.'}));
        }
      });
    },
  };
}
