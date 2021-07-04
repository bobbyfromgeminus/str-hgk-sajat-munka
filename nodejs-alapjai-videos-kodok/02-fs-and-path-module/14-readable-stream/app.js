const { createReadStream } = require('fs');


const readableStream = createReadStream('./example.txt', {
    encoding: 'utf-8',
    highWaterMark: 11     // mekkora darabbal dolgozzon
})

// "felíratkozunk" a data eseményre, és ha van adat, kiíratjuk
readableStream.on('data', (chunk) => {
    // console.log(chunk);
    // a console.log a standard outputot formázva írja ki
    // mi most ezt a formázást nem szeretnénk.
    process.stdout.write(chunk);
})