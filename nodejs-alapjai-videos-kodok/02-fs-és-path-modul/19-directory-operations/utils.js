const { access, mkdir, writeFile, readdir, rmdir, rename } = require('fs').promises;

const capitalizeFirstLetter = (str) => {
    str.charAt(0).toUpperCase() + str.slice(1);
}

const createStarterTemplate = () => {
    // megnézzük, látezik-e a views mappa
    access('views')
        .catch(() => mkdir('views'))                            // mappa létrehozása
        .then(() => writeFile('./views/index.html', 'INDEX'))   // benne egy index.html
        .then(() => writeFile('./views/about.html', 'ABOUT'))   // mellé egy about.html
        .then(() => readdir('views'))
        .then(console.log)
        .then(() => rmdir('tmp'))
        .then(() => {
            const folder = 'controllers';
            // mappá étnevezése
            rename(folder, capitalizeFirstLetter(filder))
        })
        .catch((err) => console.log('\x1b[5m', err.message));
}

module.exports = createStarterTemplate;