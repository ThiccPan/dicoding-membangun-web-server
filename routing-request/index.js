const http = require('http');

const requestListener = (req, res) => {
    const { method, url } = req;
    res.setHeader('content-type', 'text/html');
    res.statusCode = 200;

    if (url === '/') {
        if (method === 'GET') {
            res.end('ini adalah homepage');
        } 
        else {
            res.end(`tidak dapat diakses dengan method ${method}`);
        }
    } else if (url === '/about') {
        if (method === 'GET') {
            res.end('halaman about');
        } else if (method === 'POST') {
            let data = [];
            req.on('data',(stream) => {
                data.push(stream);
            });
            req.on('end', () => {
                data = Buffer.concat(data);
                const { name = 'anon' } = JSON.parse(data);
                res.end(`halo ${name}, ini halaman about!`);
            });
        }
    } else {
        res.end('halaman tidak ditemukan!');
    }
};

const server = http.createServer(requestListener);

const port = 3000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`running at http://${host}:${port}`);
});