const { createReadStream, createWriteStream } = require('fs');
const { createGzip } = require('zlib');

const readableStream = createReadStream('./example.txt', {
    encoding: 'utf-8',
    highWaterMark: 11     // mekkora darabbal dolgozzon
})

const writeableSteam = createWriteStream('./exampleCopy.txt');
const createCompressedFile = createWriteStream('./example.txt.gz');

readableStream.pipe(writeableSteam);

readableStream
    .pipe(createGzip())
    .pipe(createCompressedFile);