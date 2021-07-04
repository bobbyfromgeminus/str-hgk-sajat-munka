/*
    http://127.0.0.1 - index.html
    http://127.0.0.1/about - about.html
    http://127.0.0.1/contact - contact.html
*/

const http = require('http');
const siteRouter = require('./router/site.router');

const port = process.env.PORT || 8080;

http.createServer(({ url }, res) => {
    siteRouter[url]
        ? siteRouter[url](res)
        : siteRouter['/404'](res)
})
.on('error', err => console.log(`Server error: ${err.message}`))
.on('listening', ()=> console.log(`Server is running at http://127.0.0.1:${port}`))
.listen(port);

