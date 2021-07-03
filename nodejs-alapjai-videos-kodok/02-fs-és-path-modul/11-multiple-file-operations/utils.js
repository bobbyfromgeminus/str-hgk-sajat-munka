const fs = require('fs');


const truncateAndPrintFile = (file, length, bufferSize) => {
    fs.open(file, 'r+', (err, fd) => {
        if (err) throw err;
        fs.ftruncate(fd, length, (err) => {
            if (err) throw err;
            const buffer = Buffer.alloc(bufferSize);
            fs.read(fd, buffer, 0, buffer.length, 0, (err, bytes) => {
                if (err) throw err;
                if (bytes > 0) console.log(buffer.slice(0, bytes).toString());
                fs.close(fd, (err) => {
                    if (err) throw err;
                })
            })
        })
    })
}

module.exports = Object.freeze({
    truncateAndPrintFile
})