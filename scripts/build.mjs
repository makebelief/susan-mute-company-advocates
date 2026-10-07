import { cp, rm, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root=resolve(process.cwd());

function run(command,args){
  const result=spawnSync(
    command,
    args,
    {
      cwd:root,
      stdio:'inherit'
    }
  );

  if(result.error){
    throw result.error;
  }

  if(result.status!==0){
    process.exit(result.status??1);
  }
}

console.log('Generating production website...');
run('python3',['generate.py']);

console.log('Running production validation...');
run(process.execPath,['scripts/check.mjs']);

await rm(
  resolve(root,'dist'),
  {
    recursive:true,
    force:true
  }
);

await mkdir(
  resolve(root,'dist'),
  {
    recursive:true
  }
);

await cp(
  resolve(root,'site'),
  resolve(root,'dist'),
  {
    recursive:true
  }
);

console.log('Built validated production website to dist/');
