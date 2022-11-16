const http = require('http');

const requestListener = (req, res) => {
    const { method } = req;
    res.setHeader('content-type', 'text/html');
    res.statusCode = 200;

    if (method === 'GET') {
        res.end('<h1>get method</h1>');
    } 
    else if (method === 'POST') {
        let body = [];

        req.on('data', chunks => {
            body.push(chunks);
        });

        req.on('end', () => {
            body = Buffer.concat(body).toString();
            const { name } = JSON.parse(body)
            res.end(`<h1>post method, you send ${name}!!!</h1>`);
        })
    }
    else if (method === 'PUT') {
        res.end('<h1>put method</h1>');
    }
    else if (method === 'DELETE') {
        res.end('<h1>delete method</h1>');
    }
};

const server = http.createServer(requestListener);

const port = 3000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`running at http://${host}:${port}`);
});