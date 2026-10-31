const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const BACKEND_PORT = 8080;

const MIME = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.ico': 'image/x-icon',
    '.pdf': 'application/pdf',
    '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
    // 1. Forward /api/* requests to Spring Boot backend
    if (req.url.startsWith('/api/') || req.url === '/api' || req.url.startsWith('/h2-console')) {
        const proxyReq = http.request({
            hostname: '127.0.0.1',
            port: BACKEND_PORT,
            path: req.url,
            method: req.method,
            headers: {
                ...req.headers,
                host: `127.0.0.1:${BACKEND_PORT}`
            }
        }, (proxyRes) => {
            res.writeHead(proxyRes.statusCode, proxyRes.headers);
            proxyRes.pipe(res);
        });

        proxyReq.on('error', (err) => {
            res.writeHead(503, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                status: 'BACKEND_OFFLINE',
                message: 'Spring Boot backend on port 8080 is unreachable.',
                error: err.message
            }));
        });

        req.pipe(proxyReq);
        return;
    }

    // 2. Serve static frontend files
    let reqPath = decodeURI(req.url.split('?')[0]);
    if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
    const filePath = path.join(__dirname, '..', reqPath);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File Not Found');
            return;
        }
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
        res.end(data);
    });
});

server.listen(PORT, '127.0.0.1', () => {
    console.log(`Server listening on http://localhost:${PORT}`);
    console.log(`API reverse proxy -> http://localhost:${BACKEND_PORT}/api`);
});
