import { DatabaseSync } from 'node:sqlite';
import { mkdirSync,readFileSync } from 'node:fs';

export function createLocalDatabase() {
  mkdirSync('.sites-runtime',{recursive:true});
  const db=new DatabaseSync('.sites-runtime/enquiries.sqlite');
  if(!db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='enquiries'").get()) {
    db.exec(readFileSync('drizzle/0000_enquiries.sql','utf8'));
  }
  const DB={prepare(sql){return{bind(...values){return{
    async first(){return db.prepare(sql).get(...values)},
    async run(){return db.prepare(sql).run(...values)}
  }}}}};
  return {DB,close:()=>db.close()};
}
