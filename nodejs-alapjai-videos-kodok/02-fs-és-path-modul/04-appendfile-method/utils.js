const { writeFile, appendFile } = require('fs');

const writeFileWrapper = (path, data) => {
    writeFile(path, data, (err) => {
        if (err) throw err;
        console.log('A fájl írása sikeres.');
    })
}

const appendFileWrapper = (path, data) => {
    appendFile(path, data, (err) => {
        if (err) throw err;
        console.log('A fájl módosítása sikeres.');
    })
}

module.exports = Object.freeze(
    {
        writeFileWrapper,
        appendFileWrapper
    }
)