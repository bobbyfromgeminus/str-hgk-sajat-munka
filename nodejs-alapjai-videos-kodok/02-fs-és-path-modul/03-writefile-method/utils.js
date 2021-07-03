const { writeFile } = require('fs');

const writeFileWrapper = (path, data) => {
    writeFile(path, data, (err) => {
        if (err) throw err;
        console.log('A fájl írása sikeres.');
    })
}

module.exports = Object.freeze(
    {
        writeFileWrapper
    }
)