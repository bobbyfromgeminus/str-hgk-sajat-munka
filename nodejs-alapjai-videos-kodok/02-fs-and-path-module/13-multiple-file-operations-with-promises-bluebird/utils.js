const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'));


const truncateAndPrintFile = async (file, length, bufferSize) => {
    // megnyitjuk a fájlt
    const fd = await fs.openAsync(file, 'r+');
    // szétdaraboljuk megadott hosszra
    await fs.ftruncateAsync(fd, length);
    // létrehozunk egy buffert
    const buffer = Buffer.alloc(bufferSize);
    // kiolvassuk a fájl tartalmát
    const bytes = await fs.readAsync(fd, buffer, 0, buffer.length, 0);
    // levágjuk 0-tól bytes-ig
    if (bytes > 0) console.log(buffer.slice(0, bytes).toString());
    // bezárjuk a fájlt 
    await fs.closeAsync(fd);
}

module.exports = Object.freeze({
    truncateAndPrintFile
})