import {defineConfig} from '@playwright/test';
export default defineConfig({
 testDir:'tests/parity',testMatch:'*.spec.mjs',workers:1,timeout:45000,
 reporter:[['list']],use:{headless:true,launchOptions:{executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,args:['--no-sandbox']},viewport:{width:1440,height:1000},timezoneId:'Africa/Johannesburg',trace:'retain-on-failure'},
 webServer:{command:'node tests/parity/server.mjs',url:'http://127.0.0.1:4100/login',reuseExistingServer:false},
});
