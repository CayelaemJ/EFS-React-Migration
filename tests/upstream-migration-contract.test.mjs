import assert from 'node:assert/strict';
import {prisma,hashPassword,verifyPassword} from '../dist/services/authService.js';
import {ensureSectionDefaults,SECTION_DEFS} from '../dist/services/sectionService.js';
import {updateUser} from '../dist/services/userService.js';

const hash=hashPassword('isolated-test-password');
assert.equal(verifyPassword('isolated-test-password',hash),true);
assert.equal(verifyPassword('wrong-password',hash),false);
for(const invalid of ['',null,{},'v2$broken','v2$salt:abc','v2$salt:'+ 'x'.repeat(128),'v2$salt:'+ 'a'.repeat(128)+':extra','v2$'+ 'a'.repeat(513)])assert.equal(verifyPassword('password',invalid),false);

const upsert=prisma.dashboardSection.upsert;
const stored=new Map(SECTION_DEFS.map(def=>[def.key,{...def,enabled:false,allowedRoles:'VIEWER'}]));
try{
  prisma.dashboardSection.upsert=async({where,update,create})=>{const previous=stored.get(where.key);const next=previous?{...previous,...update}:create;stored.set(where.key,next);return next;};
  await ensureSectionDefaults();await ensureSectionDefaults();
  for(const item of stored.values()){assert.equal(item.enabled,false);assert.equal(item.allowedRoles,'VIEWER');}
}finally{prisma.dashboardSection.upsert=upsert;}

const sessions=prisma.session.updateMany,userUpdate=prisma.user.update,events=[];
try{
  prisma.session.updateMany=async()=>{events.push('revoke');return {count:1};};
  prisma.user.update=async()=>{events.push('write');throw new Error('isolated failed user update');};
  for(const patch of [{role:'VIEWER'},{active:true},{partnerId:null}]){
    events.length=0;await assert.rejects(updateUser('isolated',patch),/isolated failed user update/);assert.deepEqual(events,['revoke','write']);
  }
  events.length=0;await assert.rejects(updateUser('isolated',{name:'Updated name'}),/isolated failed user update/);assert.deepEqual(events,['write']);
}finally{prisma.session.updateMany=sessions;prisma.user.update=userUpdate;}
console.log('PASS: malformed hashes fail safely, section defaults retain permissions, access changes revoke sessions before writes');
