# TASK-02

Ebben a feladatban már json fájlból dolgozunk.
```
'./db/cars.json'
```

## utils.js
A utils.js-ben négy függvényt hoztunk létre (get, create, update, remove).

Importáljuk az fs modult promises "módban", valamint a path modulból a join metódust.
```
const fsp = require('fs').promises;
const { join } = require('path');
```

Egy változóban eltároljuk a json fájlunk teljes elérési útját a __dirname-mel és a db mappával join,olva.
```
const jsonPath = join(__dirname, 'db', 'cars.json');
```
### getList
Készítünk egy getList függvényt, amely a readFile metódussal beolvassa és eltárolja egy változóban a json fájl tartalmát, mindezt aszinkron módon.
A függvény visszaadja ezt a tartalmat, amit természetesen JSON.parse-szal tömbbé kell alakítani.
```
const getList = async () => {
    const content = await fsp.readFile(jsonPath, 'utf8');
    return JSON.parse(content); // string -> array
};
```
### get
Készítünk egy get aszinkron függvényt.
- amely kap egy id-t
- meghívja a getList-et, a kapott (megvárt) eredmény a list változóban tárolja
- a find tömb metódussal megkeresi a kívánt id-jű objektumot, amellyel visszatér
```
const get = async (id = 0) => {
    const list = await getList();
    return list.find( item => item.id === id );
};
```

### Exportálás
Exportáljuk a get függvényt.
```
module.exports = {
    get,
};
```

## index.js

Kezdésként importáljuk a get függvényt a utils-tól.
```
const { get } = require('./utils');
```

Majd egy IIFE-ként, aszinkron módon meghívjuk a get-et a kívánt id-val, amelyet kiíratunk a konzolra.
```
( async () => {
    console.log( await get(9) );
})();
```