const path = require('path');

const filePath = '/This/Is/A/File/Path/file.js';

// a fájl teljes útvonala fájlnáv nélkül: dirname()
    console.log(`Dirname: ${path.dirname(filePath)}`);

// a fájlnév kiterjesztéssel együtt: basename()
    console.log(`Last part: ${path.basename(filePath)}`);

// a fájl kiterjesztése: extname()
    console.log(`Extension: ${path.extname(filePath)}`);

// csak fájlnév: basename(filePath, path.extname(filePath)) kiterjesztés nélkül
    console.log(`Filename: ${path.basename(filePath, path.extname(filePath))}`);

// az útvonal abszolút útvonal, vagy sem
    console.log(`Is an absolute path: ${path.isAbsolute(filePath)}`);

// egy onjektumra bontja a megkapott útvonalat
    console.log(path.parse(filePath));

// a kapott objektumból összeállít egy útvonal stringet
    const filePathObject = {
        dir: 'c:\\Users\\User', // az escapelés miatt kell még egy \
        base: 'file.js'
    }
    console.log(path.format(filePathObject));