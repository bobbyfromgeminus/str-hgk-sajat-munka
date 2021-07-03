const { createReadStream, createWriteStream } = require('fs');


const readableStream = createReadStream('./example.txt', {
    encoding: 'utf-8',
    highWaterMark: 11     // mekkora darabbal dolgozzon
})

const writeableSteam = createWriteStream('./exampleCopy.txt');

// ahogy beolvasok 11 bytenyi adatot, beírom a copy fájlba
readableStream.pipe(writeableSteam);