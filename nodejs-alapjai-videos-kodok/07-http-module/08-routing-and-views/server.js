/*
    http://127.0.0.1 - index.html
    http://127.0.0.1/about - about.html
    http://127.0.0.1/contact - contact.html
*/

const http = require('http');
const { createReadStream } = require('fs');

const port = 8080;

http.createServer((req, res) => {
    // console.log(req.url);
    
    // ROOT
    if (req.url === '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        createReadStream('./views/index.html').pipe(res);
    }

    // ABOUT
    else if (req.url === '/about') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        createReadStream('./views/about.html').pipe(res);
    }

    // CONTACT
    else if (req.url === '/contact') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        createReadStream('./views/contact.html').pipe(res);
    }

    // Minden más esetben
    else  {
        res.statusCode = 404;
        res.end();
    }

}).listen(port);

console.log(`Server is running at http://127.0.0.1:${port}`);