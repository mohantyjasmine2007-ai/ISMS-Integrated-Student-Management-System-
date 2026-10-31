const { spawn } = require('child_process');
const http = require('http');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const mvnCmd = process.platform === 'win32' ? path.join(rootDir, 'mvnw.cmd') : path.join(rootDir, 'mvnw');

console.log('==========================================================');
console.log('   APSIT ISMS - Unified Full-Stack Runner                 ');
console.log('   Connecting Frontend (3000) <-> Backend (8080) <-> DB   ');
console.log('==========================================================');

// 1. Start Node Frontend & Proxy Server
console.log('[1/2] Starting Frontend & Reverse-Proxy Server (Port 3000)...');
const frontendProcess = spawn('node', [path.join(rootDir, 'scratch', 'server.js')], {
    stdio: 'inherit',
    cwd: rootDir
});

// 2. Start Spring Boot Backend
console.log('[2/2] Launching Spring Boot Backend API & Database (Port 8080)...');
const backendProcess = spawn(mvnCmd, ['spring-boot:run'], {
    stdio: 'inherit',
    cwd: path.join(rootDir, 'backend'),
    shell: true
});

function cleanup() {
    console.log('\nShutting down APSIT ISMS services...');
    try { frontendProcess.kill(); } catch (e) {}
    try { backendProcess.kill(); } catch (e) {}
    process.exit(0);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
