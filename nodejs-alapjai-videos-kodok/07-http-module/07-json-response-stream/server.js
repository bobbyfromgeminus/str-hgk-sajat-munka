const http = require('http');
const { createReadStream } = require('fs');

const port = 8081;
const json = './database/movies.json';

http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    createReadStream(json).pipe(res);
}).listen(port);

console.log(`Server is running at http://127.0.0.1:${port}`);