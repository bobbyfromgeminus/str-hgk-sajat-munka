# TASK-01

Ebben a feladatban autó objektumok tömbjével dolgozunk.

## utils.js
A utils.js-ben négy függvényt hoztunk létre (get, create, update, remove).


### get
- kap egy tömböt és egy id-t
- megkeresi és visszaadja a tömbből a kívánt objektumot.
```
get = (list = [], id = 0) => {
    return list.find( item => item.id === id );
};
```

### create
- egy tömböt és egy objektumot kap
- elsőként megállapítja, hogy mely szám lesz a következő kiadható id
- elmenti az új entitást egy változóba ezzel id-val
- a kapott tömbbe bepusholja az új entitást
- visszadja az új tömböt
```
const create = (list = [], entity = {}) => {
    const id = list[list.length - 1].id + 1;
    const newEntity = {...entity, id};
    list.push( newEntity );
    return newEntity;
};
```

### update
- egy tömböt és egy objektumot kap
- megvizsgálja, hogy a lista nem üres-e és hogy van-e id-ja az átadott objektumnak
- módosításhoz elsőként a findindex metódussal mentünk egy indexet a kapott id alapján
- majd a tömb adott indexű elemét módosítjuk a spread operátor segítségével
- a függvény visszadja ezt a tömböt
```
const update = (list = [], entity = {}) => {
    if (list.length < 1 || !entity.id) {
        return false;
    }
    const index = list.findIndex( item => item.id === entity.id );
    list[index] = {...list[index], ...entity};
    return list[index];
};
```
### remove
- egy tömböt és egy id-t kap
- megvizsgálja, hogy a lista nem üres-e és hogy van-e id-nk
- törléshez elsőként szintén a findIndex metódussal mentünk egy indexet a kapott id alapján
- majd a splice tömb metódus segítségével kivesszük az adott indexű elemet.
- siker esetén true, hiba esetén false értékkel tér vissza
```
const remove = (list = [], id = 0) => {
    if (list.length < 1 || !id) {
        return false;
    }
    const index = list.findIndex( item => item.id === id );
    list.splice(index, 1);
    return true;
};
```

### Exportálás
Végül exportáljuk a négy függvényünket.
```
module.exports = {
    get,
    create,
    update,
    remove,
};
```

## index.js

Kezdésként importáljuk a négy függvényt a utils-tól.

Ezt követően elhelyezzük a cars tömbünket, benne car objektumokkal.

Végezetük meghívjuk a függvényeket a szükséges paraméterekkel, az eredményeiket konzolra íratva.
```
console.log( get(cars, 4) );

console.log( create(cars, {
    "model": "Sentra",
    "maker": "Nissan",
    "year": 2003,
    "color": "Crimson",
    "price": 32390
}) );

console.log( update(cars, {
    "id": 7,
    "model": "Cordia",
    "year": 2001,
    "color": "Red",
    "price": 5000
}) );

console.log( remove(cars, 11) );

console.log(cars);
```