const { unlink } = require('fs').promises;
const { createReadStream, createWriteStream } = require('fs');
const { createGzip } = require('zlib');

const srcFile = './files/example.txt';
const tmpFile = `${srcFile}.bak`;
const gzFile = `${srcFile}.gz`;

const srcStream = createReadStream(srcFile, {
    encoding: 'utf-8',
    highWaterMark: 42
})

const createTempFile = createWriteStream(tmpFile);
const createCompressedFile = createWriteStream(gzFile);

srcStream.pipe(createTempFile);

srcStream
    .pipe(createGzip())
    .pipe(createCompressedFile);

createCompressedFile.on('finish', () => {
    unlink(srcFile);
    unlink(tmpFile);
})


/*
    2. feladat megoldásának lépései:
    
        01. fs modul promise-osított metódusainak importálása (unlink)
        02. fs modul stream metódusainak importálása (createReadStream, createWriteStream)
        03. createGzip metódus importálása a zlib modulból
        04. url változók deklarálása (srcFile, tmpFile, gzFile)
        05. fájl olvasó/író streamek deklarálása (srcStream, createTempFile, createCompressedFile)
        06. forrás fájl streamelése, melyre pipe-pal belenyúlva meghívjuk az ideiglenes fájlt író streamet
        07. forrás fájl streamelése, melyre pipe-pal belenyúlva meghívjuk a createGzip metódust
        08. majd ebbe újabb pipe-pal belenyúlva meghívjuk a tömörített fájl író streamet
        09. az utolsó művelet, azaz a tömörített fájl író stream 'finish' eseményére feliratkozva töröljük az eredeti és a temp fájlt
*/