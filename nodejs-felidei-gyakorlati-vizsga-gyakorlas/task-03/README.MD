# TASK-03

Ebben a feladatban is json fájlból dolgozunk.
```
'./db/cars.json'
```

## utils.js
Az előző feladatot kiegészítve készítünk a getList függvény mellé egy saveList függvényt is.

### saveList
A writeFile metódussal írjuk a json fájlt.
- JSON.stringify segítségével a kapott listát stringgé alakítjuk.
- formázzuk (list, null, 4), ahol az első értél a losta, a második a kezdő sor szóköze, a 4 pedig a beljebb tördelt sorok szóköze
- utf encode-oldást nem felejtjük el
- a függvény true értékkel tér vissza
```
const saveList = async (list = []) => {
    await fsp.writeFile(jsonPath, JSON.stringify(list, null, 4), 'utf8');
    return true;
};
```

### update
Készítünk egy update aszinkron függvényt, amely kap egy entitást, objektumot.
- a függvény lekéri getListtel a json tarlmát és eltárolja list változóban
- findIndex segítségével megkeressük a kívánt elem indexét
- módosítjuk a listát az entitással
- majd meghívjuk a saveList függvényt átadva neki a list változót (await)
- a föggvény a módosult listával tér vissza

```
const update = async (entity = {}) => {
    const list = await getList();

    const index = list.findIndex( item => item.id === entity.id );
    list[index] = {...list[index], ...entity};
    
    await saveList(list);
    
    return list[index];
};
```

### Exportálás
Exportáljuk az update függvényt.
```
module.exports = {
    update,
};
```

## index.js

Kezdésként importáljuk a get függvényt a utils-tól.
```
const { update } = require('./utils');
```

Majd egy IIFE-ként, aszinkron módon meghívjuk az update-et a kívánt entitással, amelyet kiíratunk a konzolra.
```
(async () => {
    console.log(await update({
        "id": 5,
        "color": "Purple",
        "price": 10000
    }));
})();
```