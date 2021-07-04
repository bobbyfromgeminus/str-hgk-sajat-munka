const http = require('http');
const { createReadStream } = require('fs')

const port = 8080;

http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    // szinkron fájlolvasás helyett streamet készítünk, amihez hozzápipe-oljuk a res-t

    const name = 'Bobby';
    const readableStream = createReadStream('./index.html');
    readableStream.on('data', chunk => {
        const htmlFragment = chunk.toString().replace(/\{\{name\}\}/g, name);
        res.write(htmlFragment);
    })
    readableStream.on('end', () => res.end());
}).listen(port);

console.log(`Server is running at http://127.0.0.1:${port}`);