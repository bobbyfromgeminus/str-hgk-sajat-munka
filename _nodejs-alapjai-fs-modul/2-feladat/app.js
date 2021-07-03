const { mkdir, writeFile, unlink } = require('fs').promises;
const { createReadStream, createWriteStream } = require('fs');
const { join } = require('path');
const { createGzip } = require('zlib');

// 1. forrás fájl beolvasása
const sourcePath = join(__dirname, 'data.json');
const readData = createReadStream(
    sourcePath, 
    { encoding: 'utf-8' }
);

// 2. forrás fájl tartalmának írása a cél fájlba
const targetPath = join(__dirname, 'data.json.bak');
const writeBak = createWriteStream(
    targetPath,
    { encoding: 'utf-8' }
);

// 3. Cél fájl tartalámnak olvasása és tömörítése
const readTarget = createReadStream(
    targetPath,
    { encoding: 'utf-8' }
);

// 4. A zippelt tartalom fájlba írása
const writeZip = createWriteStream(
    join(__dirname, 'data.json.bak.gz'), 
    { encoding: 'utf-8' }
)


// forrás beolvasása -> célfájl írása -> célfájl betömörítése
readData.pipe(writeBak);

writeBak.on('finish', () => {
    readTarget
        .pipe(createGzip())
        .pipe(writeZip);
});

// forrás és cél fájlok törlése
writeZip.on('finish', () => {
    unlink(sourcePath);
    unlink(targetPath);
})