const http = require('http');

// menambahkan status code pada listener jika request tidak memenuhi controlflow
const requestListener = (req, res) => {
    const { method, url } = req;
    // mengubah response header menjadi application/json
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('X-Powered-By','NodeJS');
    res.statusCode = 200;

    if (url === '/') {
        if (method === 'GET') {
            res.end('ini adalah homepage');
        } 
        else {
            res.statusCode = 404;
            res.end('request tidak valid!');
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
        } else {
            res.statusCode = 404;
            res.end('request tidak valid!');
        }
    } else {
        res.statusCode = 400;
        res.end('halaman tidak ditemukan!');
    }
};

const server = http.createServer(requestListener);

const port = 3000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`running at http://${host}:${port}`);
});