// 1. Feladat
// Hozz létre egy utils.js nevű fájlt!
// Ebben a fájlban készíts el egy függvényt increaseDate névvel!
// A függvény paraméterként egy dátumot vár és egy napszámot. A napszám alapértelmezett értéke 3.
// A visszatérési értéke az adott dátum napszámmal megnövelt értéke, azaz az 1970 óta eltelt idő milliszekundumban.

// Készíts el egy másik függvényt increaseAndFormatDate névvel! Paraméterként egy tömböt vár, ami dátum objektumokat tartalmaz.
// A függvény visszaad egy olyan új tömböt, ahol a dátumokhoz +3 nap hozzá van adva,
// és már magyar lokalizáció szerint vannak formázva. (pl.: 2021. július 3.)

// Exportáld az increaseAndFormatDate függvényt! Csak ezt!

// Hozz létre egy index.js fájlt, és importáld az increaseAndFormatDate függvényt a utils.js fájlból!
// Hívd meg a increaseAndFormatDate függvényt paraméterként egy dátumokat tartalmazó tömböt megadva neki,
// és a konzolra írasd ki a visszatérési értékét!

const increaseDate = (date, days = 3) => {
    const myDate = date.split('-');
    const newDate = new Date( myDate[0], myDate[1] - 1, myDate[2] );
    return new Date(newDate.getTime() + days * 1000 * 60 * 60 * 24, );
}

const increaseAndFormatDate = (dates = []) => {
    const newDates = new Array;
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    dates.forEach(item => {
        newDates.push(increaseDate(item).toLocaleDateString('hu-HU', options));
    });
    return newDates;
}

module.exports = Object.freeze({
    increaseAndFormatDate
})