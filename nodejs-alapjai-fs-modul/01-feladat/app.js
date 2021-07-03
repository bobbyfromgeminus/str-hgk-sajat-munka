const { mkdir, writeFile } = require('fs').promises;

const createWebTemplate = () => {
    mkdir('controllers')
        .then(() => writeFile('./controllers/site.controller.js', '// Site Controller'))
        .then(() => mkdir('routers'))
        .then(() => writeFile('./routers/site.router.js', '// Site Router'))
        .then(() => mkdir('views'))
        .then(() => writeFile('./views/index.html', '<!-- Starting Page -->'))
        .catch((err) => console.log(err.message));
}

createWebTemplate();

/*
    1. feladat megoldásának lépései:
    
        01. fs modul promise-osított metódusainak importálása (mkdir, writeFile)
        02. wrapper függvény létrehozása (createWebTemplate)
        03. controllers mappa létrehozása
        04. site.controller.js fájl létrehozása a controllers mappán belül, egyszerű kezdő tartalommal
        05. routers mappa létrehozása
        06. site.router.js fájl létrehozása a routers mappán belül, egyszerű kezdő tartalommal
        07. views mappa létrehozása
        08. index.html fájl létrehozása a views mappán belül, egyszerű kezdő tartalommal
        09. egyszerű hibakezelés
        10. wrapper függvény meghívása
*/