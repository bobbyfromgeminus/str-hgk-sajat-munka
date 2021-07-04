#NodeJS

## A NodeJS legfontosabb jellemzői

- futtatási környezet (nem a böngészőben futtatjuk a kódokat, hanem a NodeJS segítségével - Runtime Environment)
- nem programozási nyelv
- nem keretrendszer
- nincs böngésző, nincs DOM
- browser API-k nem lesznek elérhetőek, saját beépített API-ja van
- szinte minden művelet aszinkron, ennek az I/O-nak a megvalósítására a libuv-t használja (ez egy olyan, lib, amely a NodeJS egyik legfontosabb függősége a Google V8 engine mellett)
- nincs window object, csak global amikor a NodeJS kijött, nem volt a JS-nek modulrendszere, ezért a commonjs-t használja alapértelmezetten

## Alapfogalmak
- aszinkronitás (egy fő szál van, a V8 engine-t használja; ügyeljünk rá, hogy ne legyen blokkoló a kódunk)
- nem blokkoló I/O (ezen az egy szálon végezzünk minél több műveletet; real-time application-ök fejlesztésére kiváló)
- egy szálas
- eseményvezérelt

___
___

![b7c750ad420d0f423d33949faaeb8860.png](:/4a3c772de1c04d1e94c3906487f3ea07)

## Az egyes elemek szerepe

A V8 futtatja és értelmezi a kódot.

A NodeJS C++-ban megírt feature-öket használ, hív meg (JS-tel sok mindent nem tudunk megcsinálni, ezért azok a műveletek, amelyekre a C++ alkalmas, össze vannak kötve a NodeJS-szel).

A libuv a tényleges aszinkron I/O-t valósítja meg (hasonló az architektúra, mint a frontenden: event queue, event loop, worker threads - minden aszinkron művelethez tartozik 4, max. 128 szál, amellyel a libuv dolgozik, és amikor végzett, a callback meghívódik).

## Előnyök
- npm-mel a függőségeket tudjuk kezelni, több millió előre megírt modul létezik, de sajátot is készíthetünk, publikálhatjuk
- sok kérést tud kezelni egyszerre
- könnyen skálázható
- a cache-elés egyszerű
- gyors
- nem kell egy új nyelvet megtanulni hozzá
- support, nagy közössége van

## Hátrányok
- a relációs adatbázisokhoz nem ideális (vannak ORM-ek, SQL adatbázisok kezelésére jók, de nem kiforrott, nincs elég tapasztalat mögötte)
- időigényes karbantartás a külső csomagok miatt (ráadásul visszafelé ritkán kompatibilis)
- inkonzisztens a kód a callback és a promise miatt (utóbbi használatára törekedjünk)
- 
## Mire használható?
- API szerver készítése
- streaming
- microservice-ek írása
- real-time alkalmazások írása
- weboldalak kiszolgálása
- CLI alkalmazások írása
- keresztplatformos mobil/asztali alkalmazások készítése
- Használói között találjuk a Netflixet és a NASA-t is.

A videóban bemutatott példa: https://medium.com/paypal-engineering/node-js-at-paypal-4e2d1d08ce4f

## Szükséges és javasolt programok, kiegészítők

VSCode: https://code.visualstudio.com/download

NodeJS (LTS): https://nodejs.org/en/download/

Verziók ellenőrzése
```
node -v
npm -v
```

Chocolatey (opcionális): https://chocolatey.org/install 

Extensions: JavaScript (ES6) code snippets
Path Intellisense
Path Autocomplete

## A NodeJS Terminál
### REPL
	R: Read - Felhasználói input fogadása
	E: Eval - Kiértékelés
	P: Print - Eredmény kiírása
	L: Loop - A fenti műveletek ciklikusságának biztosítása
	
Hasonló, mint a böngészőben a konzol fül.
Indítható natívan a node.js alkalmazás futtatásával, de valójában vscode-ban használjuk. Új terminál ablakban node utasítással indítható.

### REPL speciális parancsok
	.help: súgó
	.editor: többsoros kód írását könnyíti meg
	.break: többsoros kifejezés létrehozása
	.clear: a REPL visszaállítása
	.load: JS file betöltése
	.save: REPL munkamenet fájlba mentése
	.exit: kilépés

### REPL gyorsbillentyűk
	Arrow up/down: előző/következő parancs
	Tab:    - lokális/globális változók kiírása
		- kódkiegészítés
	Ctrl + C: .break parancs
	Dupla Ctrl + C: .exit parancs
	Ctrl + D: .exit parancs
	
	
## Új NodeJS projekt létrehozása
**npm init** - (beírhatjuk a verziószámot, szerzőt, melyik fájl fusson le a belépésnél stb.)

vagy

**npm init --yes** (alapértelmezett)

Létrejön a package.json fájl, ez tartalmazza majd a projekt során használt függőségeket.

## ESLint
**npx eslint --init**

A feltett kérdésekre adott válaszok:

	How would you like to use ESLint? (Use arrow keys)
	> To check syntax, find problems, and enforce code style

	What type of modules does your project use?
	> CommonJS (require/exports)

	Which framework does your project use?
	> None of these

	Does your project use TypeScript?
	> No

	Where does your code run? 
	> Node

	How would you like to define a style for your project?
	> Use a popular style guide

	Which style guide do you want to follow?
	> Standard

	What format do you want your config file to be in?
	> JSON

	Would you like to install them now with npm?
	> Y


### Függőségek telepítése
**npm i**


node_modules
(soha nem közlekedtetjük)
	felvesszük egy .gitignore fájlba, vagy
	
	gitignore extension használata (CTRL + SHIFT + p: Add gitignore, Node.gitignore) - ez részletesebb, hasznosabb megoldás
	
## Első NodeJS alkalmazás
Fontos, hogy az indító fájlunk neve ugyanaz legyen, mint ami a package.json fájlban a main-nél szerepel (pl: index.js)!

Futtatni úgy tudjuk, hogy
`node index.js`.
Ám ha szeretnénk az npm start-tal indítani, akkor a package.json fájlban fel kell venni a `"start": "node index.js",` index.js kulcs-érték párt a `"scripts"`-en belül!

## A NodeJS modulrendszere
2009-ben, amikor létrehozták a NodeJS-t, a JS-nek nem volt saját modulrendszere → CommonJS

### Alkalmazás létrehozásakor tipp
Ha az egész egy alkalmazás, akkor az index.js-t használjuk, a minialkalmazásokon belül pedig az app.js elnevezést.

A var kulcsszóval létrehozott változó esetén hibaüzenetet kapunk (az ESLint beállításai szerint ne használjuk ezt). Quick Fix-szel ebben a sorban mellőzhetjük az ellenőrzést: válasszuk ki, hogy: Disable no-var for this line.

### Global object
A frontend a var-ral létrehozott változókat automatikusan a window object-hez köti, míg a backendnél a var-ral létrehozott változó a global object-be nem kerül bele.

### Module object

**A NodeJS alapértelmezetten a CommonJS modulrendszert használja és nem a natív Es modulrendszert!**

Minden egyes fájlon belül elérhető és egyedi a tartalma.
![3f19f6dead960d2d7c2f1938b6413e2d.png](:/671a41aafc15486b83d35bf780c862eb)

A var-ral létrehozott változók (frontenddel ellentétben) nem lesznek hozzákötve a globalhoz (window-hoz), ezért itt undefined-ot kapunk. Ez egy fontos különbség a frontend/backend között. De itt se használjunk var-t!

A global object mindenhol globálisan elérhető, a module object szintén minden fájlon belül ott lesz, a tartalma viszont különböző. **A module object exposrt metódusát használja ki a node modul rendszere.**
A module objektum exports tulajdonsága egy objektum, de ezt felülírtuk, így egy függvényt tartalmaz.

Tartalmának kiíratása: node + útvonal

### Default export

Egyetlen függvény exportálása utils.js-ből:

```module.exports = even;```

Ennek az importálása app.js-be:

```const even = require('./utils');```


Ha importálni szeretném egy másik fájlba, a require beépített function-t használjuk; így adott útvonalon lévő module.exports property értékét kapjuk meg. Ilyenkor nem kötelező kiírni a fájl kiterjesztését.

Ha az Intellisense nem ajánlja fel a require-t, akkor szükségünk lesz egy újabb node package-re: 

`npm i @types/node --save-dev` 

vagy 

`npm i @types/node –D`

Így mentjük ezt is a devDependencies közé.

Dokumentáció
require(id)
https://nodejs.org/api/modules.html#modules_require_id

### Named export

Egyszerre több függvényt is exportálhatunk; megadhatjuk azt is, hogy milyen néven – ennek hiányában automatikusan az eredeti néven exportálunk.

Ügyeljünk rá, hogy a bemutatott példa esetében az app.js-ben az utils egy objektum, amelynek a utils.even és odd property-jét használjuk!
```
const utils = require('./utils');
utils.even(array);
utils.odd(array);
```

![f2bcf76a6a65822a63084e2d11bd8ea3.png](:/d0c66bd77fb84925b12762461fdd2b71)

Adhatunk egyedi nevet is:
```
module.exports = {
    even: even,
    odd: odd
}
```

De megtartható az eredeti is:
```
module.exports = {
    even,
    odd
}
```

### Named export object desctructuring használatával

Hasznos akkor, ha nem szeretnénk mindent használni, amit exportálunk. 

```
const { even } = require('./utils');
console.log(even(array));
```

Előnye
- memóriát tudunk vele spórolni, hiszen nem húzzuk be, amire nincs szükségünk
- az adott függvény nevével tudunk hivatkozni rá
![785eff5ed5eee907f59d1f70e20bc2f0.png](:/6a0c9681382c48cdbb1b59b3e612247e)

Dokumentáció - Object destructuring
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

https://hacks.mozilla.org/2015/05/es6-in-depth-destructuring/ 

### Privát adatok
Ez akkor praktikus, ha azt szeretnénk, hogy egy függvény csak adott fájlban működjön, mert máshol nem akarjuk felhasználni, vagy azt szeretnénk, hogy máshol ne legyen elérhető.

A privátnak megtartandó függvényt ne exportáljuk, így az csak a fájlon belül lesz elérhető!

### A module.exports és az exports közötti hasonlóságok
A module.exports kitehető közvetlenül a függvény neve elé is.

```
module.exports.even = array => array.filter(item => item %2 === 0);
module.exports.odd = array => array.filter(item => item %2 !== 0);
```
Az alábbi két módszer teljesen ekvivalens egymással.
```
module.exports.even = array => array.filter(item => item %2 === 0);
exports.even = array => array.filter(item => item %2 === 0);
```

### A module.exports és az exports közötti különbségek

Ha az exports után kitesszük az egyenlőségjelet, értéket adunk neki, akkor megváltozik a tartalma, és nem a module.exports-ra mutat. A require viszont mindig a module.exports értékét adja vissza. 

Mindig a module.exports-ot használjuk, mert az mindig jól fog működni.
A példában az exports nem fog működni a fenti okból kifolyólag.
```
const even = require('./use-module-exports');
module.exports = even;

const even = require('./use-exports');
exports = even;
```
### Az Object.freeze() metódus használata exportáláskor

Az Object.freeze() metódus módosíthatatlanná teszi az objektumot, de nem teljes mélységben, azaz csak a legfelsőbb szintű property-t hagyja módosítatlanul. Ha ezek közül bármelyik maga is egy objektum, akkor annak az értékeit már tudom módosítani abban a fájlban, ahová importáltuk.

Így véletlenül sem írjuk felül az értékeket, ám a belső objektumokhoz hozzáférünk.

![1acc8d8aea27cb182a4b403396f60810.png](:/3ba1f01c73a14cabaf15cbd287535507)

```
module.exports = Object.freeze({
    even: even,
    odd: odd
});
```

### A natív ES modulrendszer használata

A NodeJS alapértelmezetten a CommonJS modulrendszert használja, de lehetőséget biztosít arra, hogy natív JS-es modulrendszert használjunk; ezt nekünk kell beállítani. 

Ha csak bizonyos fájloknál használjuk, a kiterjesztés  legyen .mjs. Ha mindenhol ezt szeretnénk használni, akkor a package.json-ben vegyük fel a "type”-ot, és adjuk meg neki értéknek a "module”-t.

```
export const even = array => array.filter(item => item %2 === 0);

import * as utils from './utils.mjs';
// import { even } from './utils.mjs';
```

Dokumentáció
https://nodejs.org/api/esm.html#esm_enabling

___
___


## Az fs és a path modul használata


### Fájl beolvasása szinkron művelettel

A beépített fs modul fájlműveletek végzésére alkalmas, ennek használatához először importálnunk kell. Ilyen esetben elég beírni a nevét, automatikusan betöltődik a node_modules mappából, hiszen nem saját fájlról van szó.

A fájl tartalmának beolvasásához az fs.readFileSync() metódust használjuk: az options-ben megadhatjuk az encoding-ot (hogy a kimenetet megfelelően lássuk), a flag segítségével pedig azt, hogy hogyan szeretnénk megnyitni.

Az elérési útvonalat többféleképpen is megadhatjuk. A teljes útvonal hátránya, hogy ha átírom a befoglaló mappa nevét, akkor már nem fog működni. Praktikusabb mindig belépnünk az adott mappába, és a képen látható módon megadni az útvonalat.

![b5eaee13400cd3345b37718d5e4939d8.png](:/ac073f9471c44a2eaa0240697113e718)

Dokumentáció
NodeJS File System
https://nodejs.org/api/fs.html 

#### Az fs.readFileSync() metódus

`fs.readFileSync('filename.txt');`
Visszatérési értéke egy Buffer, azaz egy fix méretű memória terület.

Ha a példa szöveges fájl tartalmát szeretnénk visszakapni, nem egy buffer datát, akkor az options objektumnál meg kell adni az encodingot!

`fs.readFileSync('filename.txt', { encoding: 'utf-8'});`

https://www.geeksforgeeks.org/node-js-fs-readfilesync-method/ 



### Fájl beolvasása aszinkron művelettel

**Lehetőség szerint mindig aszinkron műveleteket használjunk, hogy ne blokkoljuk a kódunk futását (esetleg a konfigurációs fájl lehet szinkron).**

Egy konfigurációs fájl beolvasása lehet szinkron.

Az aszinkron fs.readFile() metódus ugyanazon paramétereket várja, mint a szinkron metódus, ám ezen kívül vár egy error-first callback function-t is.

A videóban látható példában wrapper-t építünk a függvények köré, importáljuk őket a utils.js-ből, így az app.js-ben már csak paraméterként megadom az adatokat.

![3c488082bba71cda1b03a87a84bbf37b.png](:/359551235b514ad4848a3b5a0afc5957)

Ezeket az elkészített függvényeket később is bármikor fel tudjuk használni, ha szeretnénk kilogolni fájlok tartalmát.

![81b018df52809c7ed1195371a694cccf.png](:/51675bc7bf9943e08aa848a5a372fd75)

```
fs.readFile(path, options,
    (err, data) => {
        if (err) throw err;
        console.log(data);
    });
```
	
Egy error-first callback-et ad vissza, ahol elsőként a hibá kell lekezelni, majd másodikként kaphatjuk meg a beolvasott fájl tartalmát.

Kiegészítés: 
A feladatban a metódust becsomagoltuk egy wrapper function-be, és az egészet kiszerveztük egy utils.js fájlba, amelyből aztán a wrapper függvényt exportáltuk (module.exports), az app.js-be pedig importáltuk (require) és átadtuk neki a kívánt paramétereket (path és options object).

```
const readFileLog = (path, options = {}) => {
    fs.readFile(path, options,
    (err, data) => {
        if (err) throw err;
        console.log(data);
    });
}
```

Dokumentáció
NodeJS File System
https://nodejs.org/api/fs.html 

Az fs.readFile() metódus
https://www.geeksforgeeks.org/node-js-fs-readfile-method/


### Fájl írása - writeFile()

Az fs.writeFile() metódussal módosíthatjuk egy fájl tartalmát, illetve ha az még nem létezik, ezzel a művelettel létre is hozhatjuk magát a fájlt.

![a84ade4192eb4244780bb606d6b79eac.png](:/d13b406f1cd44264836b4b7a29e6b275)

![24b30c741a5af8f6140d62928e21a4dc.png](:/29052da456d84e3b9cade5a35fdc0e87)

Kiegészítés:
Ha a fájl már létezik, akkor felülírja a tartalmát, ha nem látezik, létrehozza és beleírja az átadott tartalmat.

Dokumentáció
Az fs.writeFile() metódus
https://nodejs.dev/learn/writing-files-with-nodejs

https://www.geeksforgeeks.org/node-js-fs-writefile-method/

### Adatok hozzáfűzése a fájlhoz

Az fs.appendFile() függvénnyel adatokat fűzhetünk hozzá egy fájlhoz, illetve ha a fájl még nem létezik, ez a művelet létre is hozza azt.

Kiegészítés:
Ha a fájl már létezik, akkor hozzáírja a tartalmát, ha nem látezik, létrehozza és beleírja az átadott tartalmat.

Dokumentáció
NodeJS File System
https://nodejs.org/api/fs.html

Az fs.appendFile() függvény
https://www.geeksforgeeks.org/node-js-fs-appendfile-function/


### Metódusok összevonása, refaktorálás

Előnye

- számos műveletet össze tudunk vonni
- van egy default callback-ünk
- a paraméterek sorrendjére sem kell ügyelnünk, mivel object-ként definiáltuk őket

![1a094a1b31b99fbba9e5a68020b5f936.png](:/a46150c72be443269a14ee306bc8f219)

Készítettünk egy wrapper függvényt, amelyben még a metódust is paraméterként, pontosabban egy objektumban adtuk meg az adattal és a callback függvénnyel együtt.

```
const fileHandlerWrapper = ( { method, path, data, callback = fileHandlerCallback } = {}) => {
    method(path, data, callback);
}
```

A callbacket is kiszerveztük. Error-firts, azaz először a hibát, majd a sikeres futás esetét kezeltük le benne.

```
const fileHandlerCallback = (err) => {
    if (err) throw err;
    console.log('file method successful');
}
```

A wrappert exportáltuk, az app.js-be pedig importáltuk és felparaméterezve a kívánt metódussal és adattal meghívtuk.

```
fileHandlerWrapper({
    method: appendFile,
    path: './example.txt',
    data: ' Ez egy tartalom kiegészítés. '
});
```

### Fájl törlése

Dokumentáció
NodeJS File System
https://nodejs.org/api/fs.html

Az fs.unlink() metódus
https://www.geeksforgeeks.org/node-js-fs-unlink-method/

`unlink(path, callback);`

### Fájl átnevezése

Dokumentáció
NodeJS File System
https://nodejs.org/api/fs.html

Az fs.rename() metódus
https://www.geeksforgeeks.org/node-js-fs-rename-method/

`rename(oldPath, newPath, callback);`

Dokumentáció
NodeJS File System
https://nodejs.org/api/fs.html

### Fájl másolása

Az fs.copyFile() metódus
https://www.geeksforgeeks.org/node-js-fs-copyfile-function/

`copyFile(src, dest, callback);`

### Fájl adatainak lekérdezése

Dokumentáció
NodeJS File System
https://nodejs.org/api/fs.html

Az fs.stat() metódus
https://www.geeksforgeeks.org/node-js-fs-stat-method/ 

`stat(path, callback);`

Meghíváskor a callback-et kidolgoztuk, hogy a visszaadott statisztikát ki tudjuk íratni. Ar eredeti callback wrapperünk ezt nem kezelte le.

```
statWrapper({
    path: './example.txt',
    callback(err, stats) {
        if (err) throw err;
        console.log(stats);
    }
});
```

### Fájl jogosultságának módosítása

Ezzel a metódussal tudjuk módosítani a hozzáférést (ki és hogyan).

A mode egy háromjegyű szám, amelyből az első a tulajdonosnak, a második a csoport többi tagjának, a harmadik pedig az egyéb felhasználóknak a jogosultságait állítja be egy fájlra nézve.

Maximum érték 7, összetevői:

read: 4
write: 2
execute: 1
A 777-es jelentése tehát az, hogy mindenkinek van jogosultsága írni, olvasni és futtatni.

Három jegyű szám, max 777.
1. szám: tulajdonos
2. szám: csoport többi tagja
3. szám: egyéb userek

Az egyes számjegyek a read, write, execute értékek összegeiből adódnak össze.

Dokumentáció
NodeJS File System
https://nodejs.org/api/fs.html

Az fs.chmod() metódus
https://www.geeksforgeeks.org/node-js-fs-chmod-method/ 

```
chmod(path, mode, callback);

chmodWrapper({
    path: './example.txt',
    mode: 754
});
```


### Több fájlművelet elvégzése

Egy saját függvényt írunk, amely megnyitja a fájlt, elvégez rajta néhány műveletet, majd bezárja a fájlt (utóbbit ne felejtsük el).

![2a084a8e9fdde6236e01359b668b4b90.png](:/f4f72e9b94324fa2a414eb105d34ecd2)

![13b74582b80e6082bab2b93742915b2b.png](:/695243c8b29d4b1b852722e5fe887793)

A példában használt metódusok
Buffer.alloc()

https://www.geeksforgeeks.org/node-js-buffer-alloc-method/

fs.open()

https://www.geeksforgeeks.org/node-js-fs-open-method/

fs.ftruncate()

https://www.geeksforgeeks.org/node-js-fs-ftruncate-method/

fs.read()

https://www.geeksforgeeks.org/node-js-fs-read-method/

fs.close()

https://www.geeksforgeeks.org/node-js-fs-close-method/



Zászlók (flag-ek)
- r: Megnyitja olvasásra; kivétel keletkezik, ha a fájl nem létezik.

- r+: Megnyitja olvasásra és írásra; kivétel keletkezik, ha a fájl nem létezik.

- rs: Szinkron módban megnyitja olvasásra.

- rs+: Szinkron módban megnyitja olvasásra és írásra.

- w: Megnyitja írásra; ha a fájl nem létezik, létrehozza. Ha a fájl már létezik, végrehajtja a műveletet.

- wx: A w-hez hasonló flag. A fájl exkluzív módban nyílik meg: ez azt jelenti, hogy a flag csak újonnan létrehozott fájloknál működik.

- w+: Megnyitja olvasásra és írásra; ha a fájl nem létezik, létrehozza. Ha a fájl már létezik, végrehajtja a műveletet.

- wx+: A w+-hoz hasonló flag. A fájl exkluzív módban nyílik meg.

- a: Megnyitja adatok hozzáfűzésére; ha a fájl nem létezik, létrehozza. 

- ax: A a-hoz hasonló flag. A fájl exkluzív módban nyílik meg.

- a+: Megnyitja olvasásra és adatok hozzáfűzésére; ha a fájl nem létezik, létrehozza.

- ax+: A a+-hoz hasonló flag. A fájl exkluzív módban nyílik meg.

Dokumentáció
NodeJS File System
https://nodejs.org/api/fs.html


### Fájlműveletek Promise-ok használatával

Fájl beolvasása aszinkron módon
Egyszerűbb és átláthatóbb a kód, ha Promise-ok segítségével írjuk meg callback-ek helyett (elkerülhető a callback hell).

Az alábbi módon érhetjük el azokat a műveleteket a require segítségével, amelyeknek van Promise-verziója:

![1c29ff0a2657c7942823387ed0f75118.png](:/f36cd56cea9e410cb81316d8ae64adb2)

Ügyeljünk arra, hogy ha nem kell az egész fs modul, akkor csak azt húzzuk be, amire szükségünk van.

![9e46ea7c8f161f461afd77615709f7f5.png](:/6040531b7a76480e8405e8bebfba9b21)

A példában használt metódus
fsPromises.readFile()

https://www.geeksforgeeks.org/node-js-fspromises-readfile-method/

```
const readFileWrapper =  async (file, options = {}) => {
    try {
        const result = await readFile(file, options); // nem kell callbacket megadni!
        console.log(result);
    }
    catch(err) {
        console.log(err);
    }
}
```

```
readFileWrapper('./a_ket_torony.txt', { encoding: 'utf-8' });
```


### Több fájlművelet elvégzése Promise-ok használatával

Számos metódusnak létezik callback- és Promise-változata, ám gyakran nem ugyanaz a nevük.

Ilyenkor több módszert alkalmazhatunk, hogy a promise-osított változattal dolgozhassunk:

- kikeressük, hogy adott metódusnak van-e promise-os megfelelője, és ha igen, mi a neve
- egy olyan külső package-et használunk, mint pl. az fs-extra
- olyan third party library-t használunk, mint pl. a bluebird

Bluebird telepítése: npm i bluebird --save (automatikusan a függőségek közé kerül a package.json fájlban)

Használjuk a Promise.promisifyAll() metódusát az alábbi módon

![897879cfa43ab5abaf9af02b2f3a445a.png](:/2132784c162340769255bd5837747d00)

A bluebird a névhez alapértelmezetten az Async-et fűzi hozzá
![c6988a0823a478eb6ada82f32932bcb6.png](:/4c94758160a74d66bf49a40ee748a649)

Dokumentáció
fs-extra
https://www.npmjs.com/package/fs-extra

bluebird
https://www.npmjs.com/package/bluebird

bluebird Promise.promisifyAll()
http://bluebirdjs.com/docs/api/promise.promisifyall.html

FS modul importálásakor a Bluebird promisosítja az összes metódust.
A metódusnevek végére hozzáfűz egy Async-et ( p.: fs.openAsync() ).
```
const fs = Promise.promisifyAll(require('fs'));
```

```
const truncateAndPrintFile = async (file, length, bufferSize) => {
    // megnyitjuk a fájlt
    const fd = await fs.openAsync(file, 'r+');
    // szétdaraboljuk megadott hosszra
    await fs.ftruncateAsync(fd, length);
    // létrehozunk egy buffert
    const buffer = Buffer.alloc(bufferSize);
    // kiolvassuk a fájl tartalmát
    const bytes = await fs.readAsync(fd, buffer, 0, buffer.length, 0);
    // levágjuk 0-tól bytes-ig
    if (bytes > 0) console.log(buffer.slice(0, bytes).toString());
    // bezárjuk a fájlt 
    await fs.closeAsync(fd);
}
```

### Olvasható adatfolyamok - readable stream

Stream
- Adatok sorozata, adatfolyam
- Nagy mennyiségű adatok kezelésénél hasznos
- Nem kell a teljes tartalmat a memóriában tartani
- Buffer-eket, fix méretű tárolókat használ

Típusai
- Readable - adatok kiolvasása
- Writable - adatok írása
- Duplex - adatok írása és olvasása
_ Transform - adatok módosítása írás/olvasás közben

Módok
- **Standard** - a nodejs ezzel dolgozik
	- Alapértelmezett mód
	- String, Buffer vagy UInt8Array típussal dolgozik
	- A belső folyamatoknál csak ezt használja a NodeJS
- Object
	- Az objektumokat és nem a bájtokat számolja

A videóban bemutatott példa
![45245ac68d5cb9b986a8ce228f1be861.png](:/64c65e6f90054ec48ee3db348819eca7)

Dokumentáció
Az fs.createReadStream() metódus
https://nodejs.org/en/knowledge/advanced/streams/how-to-use-fs-create-read-stream/

https://www.geeksforgeeks.org/node-js-fs-createreadstream-method/

Az emitter.on() metódus
https://nodejs.org/docs/latest/api/events.html#events_emitter_on_eventname_listener

Process
https://nodejs.org/api/process.html#process_process_stdout 

Stream
https://nodejs.org/api/stream.html#stream_stream

### Írható adatfolyamok - writeable stream

A videóban bemutatott példa
![1ec227319a08ad01d7d71235d39262e8.png](:/cd8f831599ec4ecfb4a8ef576925ad26)

```
const readableStream = createReadStream('./example.txt', {
    encoding: 'utf-8',
    highWaterMark: 11     // mekkora darabbal dolgozzon
})

const writeableSteam = createWriteStream('./exampleCopy.txt');

// ahogy beolvasok 11 bytenyi adatot, beírom a copy fájlba
readableStream.pipe(writeableSteam);
```

Dokumentáció
Az fs.createWriteStream() metódus
https://www.geeksforgeeks.org/node-js-fs-createwritestream-method/

Stream
https://nodejs.org/api/stream.html

```
const { createReadStream, createWriteStream } = require('fs');
const { createGzip } = require('zlib');

const readableStream = createReadStream('./example.txt', {
    encoding: 'utf-8',
    highWaterMark: 11     // mekkora darabbal dolgozzon
})

const writeableSteam = createWriteStream('./exampleCopy.txt');
const createCompressedFile = createWriteStream('./example.txt.gz');

readableStream.pipe(writeableSteam);

readableStream
    .pipe(createGzip())
    .pipe(createCompressedFile);
```

### A path modul használata - útvonalakkal kapcsolatos hasznos metódusok

A videóban bemutatott példa
![7edc8b1713cb5f97ed9a433251aae48a.png](:/a720af73e8e34ee48847404dd1131f91)

Dokumentáció       
Path és az egyes metódusok
https://nodejs.org/api/path.html

```
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
```

### A path modul használata - a path resolve(), és join() metódusok használata és a __dirname változó

A videóban bemutatott példa
![4953ea1f1e3901999b0f02628e3f644b.png](:/aa60c74003d84e08908ab53641e01304)

```
const { resolve, join } = require('path');
const { clearScreenDown } = require('readline');

// visszaadja annak a mappának a teljes elérési útvonalát, amelyben a terminálban épp állok
console.log(resolve()); // az fs metúdusok ezt használják
console.log('-------------------------');

// visszaadja az aktuális munkakönyvárunk relatív útvonalát
console.log(join());
console.log('-------------------------');

// visszaadja az aktuális fájl absolút elérési útvonalát
console.log(__dirname);
console.log('-------------------------');

console.log(resolve('./example.txt'));
console.log('-------------------------');
console.log(join('./example.txt'));
console.log('-------------------------');
// ezzel a megoldással a fájl telejs elérési útvonalát adja vissza
console.log(join(__dirname, './example.txt'));
console.log('-------------------------');
```

A path.resolve() az abszolút elérési útvonalat adja vissza – mindig annak a mappának az útvonalát, ahol a terminálban állok.

A path.join()-nal útvonalakat fűzhetünk össze – mindig az aktuális munkakönyvtár relatív útvonalát adja vissza.

A __dirname globális változó az aktuális fájl abszolút elérési útvonalát adja vissza.

A path.join() és a __dirname együttes alkalmazásával minden esetben a fájl helyes elérési útvonalát kapjuk meg.



Dokumentáció       
A path.resolve() metódus
https://nodejs.org/api/path.html#path_path_resolve_paths

https://www.geeksforgeeks.org/node-js-path-resolve-method/ 

A path.join() metódus
https://nodejs.org/api/path.html#path_path_join_paths

https://www.geeksforgeeks.org/node-js-path-join-method/

__dirname
https://nodejs.org/docs/latest/api/modules.html#modules_dirname 



### Mappaműveletek

A videóban bemutatott példa
![e50190cbb28ab01ff7c409e8b60c25c2.png](:/5da341efc3d043768a7579427298bd57)

![13ebd5c8bc5d7b2ada8602426012ade9.png](:/48d2f0d227034c07ba0f5776d666ce0e)

```
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
```

```
const createStarterTemplates = require('./utils');

createStarterTemplates();
```

Dokumentáció       
Mappaműveletek példákkal
https://nodejs.dev/learn/working-with-folders-in-nodejs

https://coderrocketfuel.com/article/7-methods-for-working-with-directories-in-node-js

Színkódok
https://gist.github.com/abritinthebay/d80eb99b2726c83feb0d97eab95206c4
___
___

## Az events modul

### Az eseménykibocsátó (event emitter) működésének bemutatása

A videóban bemutatott példa
![2e399dbaf2a82912d47e78c9894e60aa.png](:/9f095a23f7f0463f89120cd1a2654532)

![87cc6068c556ab70086fca51ebaba098.png](:/9cc53fe6ca9d495d975837fb34df05db)

Fontos, hogy az event emitter az aszinkron I/O része, aszinkron működik, de a listener-ök szinkron fognak lefutni egymás után.

Amennyiben olyan eseményt futtatunk le, amely nem létezik, nem történik semmi.

Dokumentáció       
Events modul
https://nodejs.org/api/events.html

Event emitter megírása lépésről lépésre
https://www.freecodecamp.org/news/how-to-code-your-own-event-emitter-in-node-js-a-step-by-step-guide-e13b7e7908e1/

```
class EventEmitter {
    constructor () {
        this.events = [];
    }

    on (eventType, listener) {
        this.events[eventType] = this.events[eventType] || [];
        this.events[eventType] = [...this.events[eventType], listener];
    }

    emit (eventType) {
        if (this.events[eventType]) {
            this.events[eventType].forEach(listener => listener());        
        }
    }

}

module.exports = EventEmitter;
```

```
const EventEmitter = require('./eventemitter');
const eventEmitter = new EventEmitter();

eventEmitter.on('speak', () => console.log('Zombie says Grrr!'));
eventEmitter.on('speak', () => console.log('Hungry Zombie says harr harr!'));
eventEmitter.on('walk', () => console.log('Deads are walking.'));

eventEmitter.emit('speak');
eventEmitter.emit('walk');
```

Az emitter.on() metódus
https://nodejs.org/docs/latest/api/events.html#events_emitter_on_eventname_listener

Az emitter.emit() metódus
https://nodejs.org/api/events.html#events_emitter_emit_eventname_args

### A beépített EventEmitter osztály
A nodeJS-ben van saját EventEmitter osztály, ezért ezt nem kell nekünk megírni.
A videóban látott kód annyiban változott az előzőtől, hogy a nodeJS events moduljából importáltuk az EventEmittert és nem a saját megvalósításunkból.

`const EventEmitter = require('events');`

A videóban bemutatott példa
![b66fbea148c0911fa604bfe329f8c919.png](:/e2eedad45667406eb7dc50a8d707cd75)


Dokumentáció       
Events modul (beépített EventEmitter)
https://nodejs.org/api/events.html


### Az EventEmitter osztály egyéb hasznos metódusai

A videóban bemutatott példa
![c5f500963528a5676dd6d2e7113467d5.png](:/64ac054cd03e4e5e9601a1fca3fd5d4c)

```
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

// függvények, amelyek majd lefutnak
const scream = () => console.log('I hear a scream.');
const tooLateToHelp = () => console.log('Too late, she is dead.');
const describeTheMurderer = ({height, hairColor}) => 
    console.log(`Height: ${height}, Hair Color: ${hairColor}`);

// feliratkozások az eseményekre
eventEmitter.on('scream', scream);
eventEmitter.on('scream', tooLateToHelp);
// az on-t többször is lefuttathatom, az once-t csak egyszer
eventEmitter.once('witness', describeTheMurderer);


eventEmitter.emit('scream');
eventEmitter.emit('scream');
eventEmitter.emit('witness', {height: '180 cm', hairColor: 'black'});
eventEmitter.emit('witness', {height: '180 cm', hairColor: 'black'});
// az off-fal leíratkozhatok egy eseményről egy adott föggvény vonatkozásában,
// így az a következőkben már nem hívódik meg
eventEmitter.off('scream', tooLateToHelp);
// emiatt itt már csak a scream fut le, a tooLateToHelp már nem
eventEmitter.emit('scream');
```

Dokumentáció       
Events modul
https://nodejs.org/api/events.html

Az emitter.once() metódus
https://nodejs.org/api/events.html#events_emitter_once_eventname_listener

Az emitter.off() metódus
https://nodejs.org/api/events.html#events_emitter_off_eventname_listener

### Az EventEmitter osztály használata, filereader készítése

A videóban bemutatott példa
![acb0dee86e2f73688012bbd0489b0ea2.png](:/cc2459d4de3744a4a09de6b63e7308d2)

![adcfd3f6f76d811ecdadd183fa9fc626.png](:/ce3852f4893f4edcad3aed0a74de4fd8)

```
const { readFile } = require('fs').promises;

// Factory függvény
const reader = (eventEmitter) => {

    const readContent = async (file) => {
        console.log('Reading process started. \nFile:', file);
        try {
            const data = await readFile(file, { encoding: 'utf-8' });
            console.log('Reading process done succesfuly.');
            eventEmitter.emit('print', data);
        }
        catch {
            eventEmitter.emit('error', error);
        }
    }

    const printContent = (content) => {
        console.log('Content: \n', content);
        eventEmitter.emit('close');
    }

    const errorHandler = (err) => {
        console.log('An error occurred: ', err.message);
    }

    const close = () => {
        console.log('Printing process done. App closed.');
    }

    return {
        readContent,
        printContent, 
        errorHandler, 
        close
    }
}

module.exports = reader;
```

```
// szükségünk van a factory függvényre
const reader = require('./reader');
// valamint az eventEmitterre, amit példányosítunk is
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();
// továbbá a factory függvényeire is, továbbá a factory vár egy eventEmitter példányt
const { readContent, printContent, errorHandler, close } = reader(eventEmitter);

// feliratkozuink valamennyi eseményre
eventEmitter.on('read', readContent);
eventEmitter.on('print', printContent);
eventEmitter.on('close', close);
eventEmitter.on('error', errorHandler);

// és elegendő a read-et emittálni,
// mert a printet majd a read emittálja, ha nincs hiba
eventEmitter.emit('read', './example.txt');
```

Dokumentáció       
Factory és constructor függvények
https://chamikakasun.medium.com/javascript-factory-functions-vs-constructor-functions-585919818afe

### Az EventEmitter osztály kiterjesztése

A videóban bemutatott példa
![dc65995773e85ec1484401ec64de4097.png](:/a06fa14119c241f28d25212d2978a340)

![c4cdc684da275dfc8c5d30bcb4dcab9d.png](:/286b18df49e347829e94e95e8e5b9b8f)

```
const EventEmitter = require('events');


class Calculator extends EventEmitter {
    sum (a, b) {
        this.emit('start');
        console.log('Working is process');
        this.emit('end', a+b)
    }
}

module.exports = Calculator;
```

```
const Calculator = require('./calculator');
const calculator = new Calculator();

calculator.on('start', () =>
    console.log('Start callback called'));

calculator.on('end', (sum) =>
console.log('End callback called. Sum:', sum));

calculator.sum(10, 20);
```


## Az OS modul

### Operációs rendszerrel kapcsolatos adatok lekérdezése

A videóban bemutatott példa
![1a108c1c552caddebe576fa73a981d0d.png](:/46d15bf9acbf41e4a6bbadf2ea8b7106)

```
const os = require('os');

// Operációs rendszer információ - win32
console.log('Platform:', os.platform());

// Architektúra - x64
console.log('Architect:', os.arch());

// Op. rendszer verziószáma - Windows 10 Enterprise
console.log('OS version:', os.version());

// OS Build number - 10.0.19042
console.log('OS Build number:', os.release());

// Processzorok - AMD Ryzen 7 3700X 8-Core Processor
console.log('Processors:', os.cpus());

// Processzor model - AMD Ryzen 7 3700X 8-Core Processor
console.log('Processors:', os.cpus()[0].model);

// Teljes memória byteban
console.log('Total memory size:', os.totalmem());

// Teljes memória GB-ban
console.log('Total memory size:', (os.totalmem() / 1024 / 1024 / 1024).toFixed(2), 'GB');

// Szabad memória GB-ban
console.log('Free memory size:', (os.freemem() / 1024 / 1024 / 1024).toFixed(2), 'GB');

// Username
console.log('Username:', os.userInfo());
console.log('Username:', os.userInfo().username);

// IP cím
console.log('IP address:', os.networkInterfaces());
console.log('IP address:', os.networkInterfaces().Ethernet[1].address);
```

Dokumentáció       
Operating System (OS) modul
https://nodejs.org/api/os.html

os.platform()
https://nodejs.org/api/os.html#os_os_platform

os.arch()
https://nodejs.org/api/os.html#os_os_arch

os.version()
https://nodejs.org/api/os.html#os_os_version

os.release()
https://nodejs.org/api/os.html#os_os_release

os.cpus()
https://nodejs.org/api/os.html#os_os_cpus

os.totalmem()
https://nodejs.org/api/os.html#os_os_totalmem

os.freemem()
https://nodejs.org/api/os.html#os_os_freemem

os.userInfo()
https://nodejs.org/api/os.html#os_os_userinfo_options

os.networkInterfaces()
https://nodejs.org/api/os.html#os_os_networkinterfaces



## Parancssoros alkalmazás készítése a yargs modul használatával

### A get parancs megírása

Egy harmadik féltől származó csomagot alkalmazunk: yargs

npm i yargs

A videóban bemutatott példában egy tömböt használunk objektumokkal.
![60e93501c801542abac779440ae70546.png](:/db8104fcd0df48fe948e6518a7dd4f27)


A parancsok esetében érdemes egy objektummal dolgozni, így átláthatóbb a munkánk (ez esetben ne felejtsük el megadni a property-ket).

Dokumentáció
https://www.npmjs.com/package/yargs 

### A find és a create parancs

Mielőtt megírjuk a create parancsot, érdemes elkészíteni a get mellett a find command-ot.
![8c5afd6a617c90cb292556413a34acfd.png](:/3a5b35198426499081173029b362894c)


A create parancs
![f26007c5cadda3ffdc970ebd0b69b211.png](:/e24feaec298241d69bcf50384bacb81c)

Ne felejtsük el, hogy ilyen esetben kapunk visszajelzést arról, hogy megtörtént az új elem létrehozása, mert egy pillanatra beleírtuk a tömbbe, ám a fájl tartalma nem változott meg (a create-nek a .json fájloknál lesz eredménye).

### Az edit parancs megírása

A videóban bemutatott példa
![ff21760ba0725faa602b29647be92eaa.png](:/8250849e590446da891d02a12dd1044e)

### Az edit parancs

A videóban bemutatott példa
![ab71b271151e265f77a694116d290f68.png](:/896cb108538b489cbe03749c4f2877cb)


### A remove parancs

A videóban bemutatott példa
![6cb71217fe6bf4ffcea7048c9993c879.png](:/a73f3e888d0742b0811893de103f88e1)

### Az alkalmazás strukturálása - movies service készítése

A videóban bemutatott példa
![9a872eadb263b794d73d8757048b3e25.png](:/708177406cca4ffdbb2c7454de8c10e3)

![3b7273ad1fb5c3636098ce0e2239d2b5.png](:/9cfdc3d4bb714e64a3c15664046857ea)

![84d237c1a0099fa8515de9ea596c6053.png](:/edc5f25b70df4066a00898dbb3b64455)


### Az alkalmazás strukturálása - option factory készítése

A videóban bemutatott példa
![eed2cadf49134296252de0c7633d8bf5.png](:/5afd11ba4a974fff8c0a14759b9d1308)

Az egyes command-öket így tudjuk egyszerűsíteni az app.js-ben:
![6128c6f63722b7ef16ab4c00412bfaf9.png](:/82201817be36467b9e5538d4acfbfd7f)


### Az alkalmazás strukturálása - paraméterátadás objektumok átalakításával

A videóban bemutatott példa
Az egyes command-öket így tudjuk egyszerűsíteni az app.js-ben:
![777f14e6e7200555ce0dbaa8dfd5090d.png](:/0dec7e9fd3d84fd5929d531c50ef8cd4)
![3f92042d16d23ae4efe1f46628c70cfd.png](:/2d7c1bb7df4a43f5a6481e3ef756a014)

A movies.service.js:



## Egységtesztelés

### Egységtesztelés és TDD elméleti bevezető


Tesztpiramis
![00bc151751375d15a00cbad89a072c03.png](:/57390f31b181418481e5ec4785ca74dd)

A piramis alján van a unit teszt, ez az egységteszt: a programunk lehető legkisebb, önállóan is működőképes részét, egységét vizsgálja (ez a függvény jelen esetben).

Az integrációs tesztekkel azt vizsgálhatjuk, hogy a modulok hogyan képesek együttműködni, kommunikálni, rendben működnek-e (pl. API-k tesztelése).

Az E2E (End-to-End) teszt esetén az egész alkalmazást teszteljük felhasználói szempontból.

A unit tesztek főbb jellemzői
Unit: a legkisebb tesztelhető egység (függvény)
Gyors futás
Egymástól függetlenek
Megismételve ugyanazt az eredményt adják
Automatikusak
Önellenőrzők: vagy sikeres a teszt, vagy nem (boolean-t kapok)
Nem nyúlnak a fájlrendszerhez, adatbázishoz, stb.
Tehát a FIRST-elvek vonatkoznak rájuk:
![518dcfeda43c9ba1ae1bc13b6dad5343.png](:/a2a19da08d134d2896c231503b7ba01d)


A test-driven development (TDD jellemzői)
Red-Green-Refactor

![24b7dadbe139cd49740243cb694207d4.png](:/a245aa78f131497faf4d9347d4aba77e)



Az AAA-elv

![8e3d0e05a9a1620774c180b6dd556adf.png](:/f404b1991a154a05b49d7e4391a269fc)

Dokumentáció
A tesztek főbb típusai magyarázattal, ábrákkal
https://kentcdodds.com/blog/unit-vs-integration-vs-e2e-tests 

Egyéb tesztfajták
https://www.softwaretestinghelp.com/types-of-software-testing/ 

### A Jest telepítése, beállítása, az első teszt megírása

A Jest mindent tartalmaz egyben, amire szükségünk van a tesztek írásához, futtatásához.

Telepítése:

npm i jest -D

![cf79feaf4473f0c50b4081f880df55a3.png](:/ecb9591040e04fa19175547fbf1863ec)

A Jest a test.js kiterjesztésű fájlokat fésüli át: a kiterjesztésből tudja, hogy ezek tesztfájlok, ezeket kell lefuttatni.

Ha az ESLint nem ismeri fel a Jest metódusait, telepítünk egy plugint, így nem jelez rájuk hibát:

npm i eslint-plugin-jest -D



Az ESLint konfigurációs fájljában hajtsuk végre a szükséges módosításokat:

                env -> jest/globals: true

                plugins -> jest

![a2c57f652c340e1f67c5413405092906.png](:/92e8c5c675264f78b2998b596e512470)

A teszt futtatásához módosítsuk a package.json fájlt.
![1b424e07f942c9e31f6febc8e6cb1a8f.png](:/726d89e106294191b5e647db2c0e3ea2)


Majd adjuk ki az npm run test parancsot.

Jöhet a Red-Green-Refactor-ból a kód implementálása.
![d3808f2b8455938eccf5a2c648379fc3.png](:/61420383f2474afabfccff06efb40527)

Végül adjuk ki ismét az npm run test parancsot.



Dokumentáció
Jest
https://jestjs.io/

Jest – Az első lépések (test metódus)
https://jestjs.io/docs/getting-started

Jest – Expect (összes metódus az értékvizsgálathoz)
https://jestjs.io/docs/expect

.toBe(value)
https://jestjs.io/docs/expect#tobevalue

eslint-plugin-jest
https://www.npmjs.com/package/eslint-plugin-jest


### A Jest extension és a --watchAll kapcsoló

Ha változtatunk a teszten, azt automatikusan újrafuttatja a Jest extension, de a --watchAll kapcsoló segítségével is beállíthatjuk ezt. Inkább utóbbit használjuk, ugyanis az extension erőforrásigényes lehet, és olykor kis csúszással működik, nem olyan megbízható.

Dokumentáció
Jest extension (VSC)
![775ea13cb098439ebd9839464bf1d018.png](:/c92067cafbed416695dab167ef143192)

https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest

--watchAll kapcsoló
![84f70cada55b66ad5f1099b8433399c6.png](:/276a5fa22782473c8e824adabc6a0bbf)

https://jestjs.io/docs/cli

### Lebegőpontos értékek tesztelése

Lebegőpontos számoknál ügyeljünk arra, hogy a számok a kettes számrendszerbe konvertálódva adódnak össze (az alábbi esetben hibát kapunk):
![e39d589147a9e36f967eeaa58dd478bc.png](:/a8e2ff1f9e9b4331b6a531b0dd40bb38)


Mivel nem a pontos elvárt eredményt kapjuk, alakítsuk át az alábbi módon a tesztünket:
![aae53f46cd050fa1b9e57e0ba8ba8c07.png](:/4a3095671a244d6b927edbe61a533b45)


Dokumentáció
.toBeCloseTo(number, numDigits?)
https://jestjs.io/docs/expect#tobeclosetonumber-numdigits


### Kivétel tesztelése

A videóban bemutatott példa
sum.js
![4535e0daecc283f4fc2ca83213e94ef7.png](:/1dc1c8f259074f71ac9e53655246865a)


sum.test.js
![a764df7a4d2f19925cc99790f35970d3.png](:/4ac7180079a7455eacea2d79495e8fff)

**Ahhoz, hogy a teszt lefutása előtt ne adjon hibát, csomagoljuk be a függvényt egy callback-be, ennek az eredményét már a Jest fogja ellenőrizni.**

Dokumentáció
.toThrow(error?)
https://jestjs.io/docs/expect#tothrowerror

### Tesztlefedettség

A code coverage egy százalékos mérőszám, megmutatja, hogy egy általunk írt kód sorai milyen arányban vannak tesztekkel lefedve, beleértve az utasításokat, elágazásokat (if – else mindegyik ága, a vagy (or) művelet minden lehetősége stb.).

Érdemes globálisan telepíteni a Jest-et, hogy mindenhonnan elérhessük:

npm i jest –g

Így a jest parancs az adott útvonalon elérhető összes tesztet lefuttatja.

A jest --watchAll ebben az esetben ugyanaz, mint az npm run test.

A táblázatos összefoglaláshoz, kimutatáshoz használjuk az alábbi parancsot:

jest --coverage
![0d253fad484240da9647375c123a40ee.png](:/f070e95051bb44d1be581e7c397b8de7)


Dokumentáció
--coverage[=<boolean>]
https://jestjs.io/docs/cli#--coverageboolean


### Callback függvények tesztelése

A videóban szereplő példában mock function-t hoztunk létre. Ezek olyan függvények, amelyeknek nem vagyunk kíváncsiak a belső implementációjukra. Segítségükkel például meg tudjuk állapítani, hogy hányszor (az alábbi kódban y alkalommal) futott le a callback.

A videóban bemutatott példa
![1700f03b869a0ed3c2856db346d4207b.png](:/ddfadd4f26554b35b03a386e183ae832)

![7bb554702c3f2c120a1995ffb053b269.png](:/e62415296a484f05a98e6fae3872bcab)

Dokumentáció
Mock Functions
https://jestjs.io/docs/mock-functions

.toEqual(value)
https://jestjs.io/docs/expect#toequalvalue

A jest.fn() működése
https://www.pluralsight.com/guides/how-does-jest.fn()-work

.toHaveBeenCalled()
https://jestjs.io/docs/expect#tohavebeencalled

.toHaveBeenCalledTimes(number)
https://jestjs.io/docs/expect#tohavebeencalledtimesnumber


### Aszinkron callback függvény tesztelése

Az aszinkron függvények tesztelésénél fontos, hogy a Jest várja meg, hogy lefusson a callback (különben téves eredményt kapunk). Ehhez használjuk a done-t paraméterként.

A videóban bemutatott példa
![56d3381382e6dced01a406f17f7748ae.png](:/a44d42904ded4c73aeefb42b6f548362)

![a6bc11f7e2c5521edcbcef6df53b6a91.png](:/39803656462e4b0d881b18fefab5158d)

Dokumentáció
Az aszinkron kód tesztelése és a done()
https://jestjs.io/docs/asynchronous


### Promise-ok tesztelése

Kétféleképpen tudjuk tesztelni a Promise-okat:

then és catch metódushívások (a return-t ne felejtsük el)
async – await
A videóban bemutatott példa
![87f20171588e1af68c686ba75caae2f7.png](:/f7a0eb4848a249c99712f915bd4b5ac3)

![c6e2206ed1b23888f48f40abea03ed86.png](:/7e73467951b648f8ae527b0471b58ac3)

Dokumentáció
Promise-ok tesztelése
https://jestjs.io/docs/asynchronous#promises

### Stubs - tesztadatok

Stubs: olyan adatok, amelyeket sehol nem használunk fel, kizárólag a tesztnél.

Dokumentáció
Mi az a stub? (Fókuszban: fakes, mocks, stubs)
https://blog.pragmatists.com/test-doubles-fakes-mocks-and-stubs-1a7491dfa3da


### Parancssoros alkalmazás tesztelése - előkészítés

Sok esetben a tesztek futtatása előtt inicializálni kell adatokat, ezeket pedig vissza kell állítani a tesztek elején vagy végén. A beforeAll() a callback függvényben megadott kódot egyszer lefuttatja a tesztjeink előtt, míg a beforeEach() mindegyik teszt metódushívás előtt lefuttatja a kódot, inicializálás jelleggel. Az afterAll() és az afterEach() hasonló elv alapján működik.

A videóban bemutatott példa
![72b3a2a796cb4706fcab874029029baf.png](:/64dd7136303e47f5b876f4c670abcef4)

Tipp
A jest-es metódusokhoz segítséget nyújt (telepíthetjük ezt a csomagot):

npm i @types/jest

https://www.npmjs.com/package/@types/jest



Dokumentáció
describe(name, fn)
https://jestjs.io/docs/api#describename-fn

afterAll(fn, timeout)
https://jestjs.io/docs/api#afterallfn-timeout

afterEach(fn, timeout)
https://jestjs.io/docs/api#aftereachfn-timeout

beforeAll(fn, timeout)
https://jestjs.io/docs/api#beforeallfn-timeout

beforeEach(fn, timeout)
https://jestjs.io/docs/api#beforeeachfn-timeout

jest.createMockFromModule(moduleName)
https://jestjs.io/docs/jest-object#jestcreatemockfrommodulemodulename
___
___


## A http modul

### Egyszerű webszerver létrehozása

Elsőként beimportáljuk a http modult, majd megadunk egy portszámot.

Ezután létrehozunk egy szervert: beérkező kérés esetén a callback megkapja a request és response object-eket. A response egy stream, a write metódus segítségével tudunk bele írni, akár többször is meghívhatjuk.

Végül lezárjuk a választ, és kiadjuk a parancsot, hogy kezdje el a szerver figyelni a megadott portot.

A videóban bemutatott példa
![a41ccd36fdb7e69b8ee8ff1420ece7fc.png](:/561b8a85a26743d8be95f66f89c8a336)

```
const http = require('http');

const port = 8080;

http.createServer((req, res) => {
    res.write('Hello Holly Node!');
    res.end();
}).listen(port);

console.log(`Server is running at http://127.0.0.1:${port}`);
```

Dokumentáció
A http modul
https://nodejs.org/api/http.html

http.createServer([options][, requestListener])
https://nodejs.org/api/http.html#http_http_createserver_options_requestlistener

http.ServerResponse
https://nodejs.org/api/http.html#http_class_http_serverresponse

server.listen()
https://nodejs.org/api/http.html#http_server_listen

### HTML válasz küldése

A videóban bemutatott példában egy html állományt szolgálunk ki webszerver segítségével, azaz az a beérkező kérésekre az index.html fájlt küldi vissza.

A writeHead() metódusnál megadjuk, hogy mi lesz a státuszkód, illetve hogy milyen jellegű a tartalom, amit visszaküldünk.

A videóban bemutatott példa
![d219491a6035e8620f5338ce45988874.png](:/fc35394c132e4e36be16a99a59b57f64)

Dokumentáció
A http modul
https://nodejs.org/api/http.html

http.createServer([options][, requestListener])
https://nodejs.org/api/http.html#http_http_createserver_options_requestlistener

http.ServerResponse
https://nodejs.org/api/http.html#http_class_http_serverresponse

server.listen()
https://nodejs.org/api/http.html#http_server_listen

response.writeHead(statusCode[, statusMessage][, headers])
https://nodejs.org/api/http.html#http_response_writehead_statuscode_statusmessage_headers

https://www.geeksforgeeks.org/node-js-response-writehead-method/#:~:text=writeHead()%20(Added%20in%20v1,headers%2C%20are%20the%20response%20headers.

fs.readFileSync(path[, options]) 
https://nodejs.org/api/fs.html#fs_fs_readfilesync_path_options

https://www.geeksforgeeks.org/node-js-fs-readfilesync-method/

### HTML válasz küldése stream használatával

Szervereknél nem szerencsés szinkron műveletet használni, hiszen ha érkezik egy kérés, akkor meg kell várni, amíg a fájl beolvasásra kerül; ez egy blokkoló művelet.

Ezért készítsünk egy readable stream-et, olvassuk be a fájlt, és pipe-oljuk össze a response-zal.

A videóban bemutatott példa
![dcb7d2721593c1f0cf9602cffef4d771.png](:/650114daf2ba4db98ad191c16c9ce093)

Dokumentáció
A http modul
https://nodejs.org/api/http.html

fs.createReadStream(path[, options])
https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options

server.listen()
https://nodejs.org/api/http.html#http_server_listen

response.writeHead(statusCode[, statusMessage][, headers])
https://nodejs.org/api/http.html#http_response_writehead_statuscode_statusmessage_headers

https://www.geeksforgeeks.org/node-js-response-writehead-method/#:~:text=writeHead()%20(Added%20in%20v1,headers%2C%20are%20the%20response%20headers.


### Változó behelyettesítése a HTML fájlba - templating

A template nyelvek a HTML nyelv szintaxisát bővítik, módosítják, plusz funkciókat adnak hozzá.

A videóban látható példában a name helyére behelyettesítjük egy változó értékét, azaz egy szerver oldalról kapott információt.

(A speciális karaktereket ne felejtsük el escape-elni.)

A videóban bemutatott példa
![69cd2aae8451bc8d9a3977702ca577db.png](:/3bbf1b61e72e4a79aa80fba7f8b21898)

![5d7a67392ac5f97f98b5108140ffcc90.png](:/c5b46d346d074876bc0ebf0084dcb0ad)

Dokumentáció
A http modul
https://nodejs.org/api/http.html

fs.readFileSync(path[, options]) 
https://nodejs.org/api/fs.html#fs_fs_readfilesync_path_options

További példa
https://stackoverflow.com/questions/35730080/nodejs-how-to-replace-client-side-template-with-a-stream

### Változó behelyettesítése a HTML fájlba - templating adatfolyammal

A videóban bemutatott példa
![71c8e7e116146d9927f947bf5bd65426.png](:/d9cc6af35292459186e399b59cd65c5d)

```
const http = require('http');
const { createReadStream } = require('fs')

const port = 8080;

http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    // szinkron fájlolvasás helyett streamet készítünk, amihez hozzápipe-oljuk a res-t

    const name = 'Bobby';
    const readableStream = createReadStream('./index.html');
    readableStream.on('data', chunk => {
        const htmlFragment = chunk.toString().replace(/\{\{name\}\}/g, name);
        res.write(htmlFragment);
    })
    readableStream.on('end', () => res.end());
}).listen(port);

console.log(`Server is running at http://127.0.0.1:${port}`);
```

Dokumentáció
A http modul
https://nodejs.org/api/http.html

fs.createReadStream(path[, options])
https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options


### JSON válasz küldése a require használatával

A videóban bemutatott példa
A require szinkron importálja be a fájlokat és cache-eli őket.
![f17579c5f67f7b5de6852b775672b326.png](:/6332536633814b0fbabbeea02345b3e2)


### JSON válasz küldése stream használatával

A require és a stream közötti különbségek
A require:
szinkron művelet
teljes fájl tartalmát beolvassa, cache-el
minify-olt JSON fájl jön létre (rövidebb időt vesz igénybe, kisebb méretű)
A videóban bemutatott példa
![d1f2d98aba8cf5493c1348e1c2620eef.png](:/591c9645b25d485db36ec03a1aea5aae)

Ügyeljünk az alábbi beállításra:

'Content-Type': 'application/json'

Dokumentáció
A http modul
https://nodejs.org/api/http.html

Stream
https://nodejs.org/api/stream.html#stream_stream

require(id)
https://nodejs.org/api/modules.html#modules_require_id


### Útvonalválasztás

Az útvonalválasztás lehetőséget ad arra, hogy bármilyen útvonalra beérkező kérésre valamilyen speciális választ adjunk. A példában ehhez külön-külön definiáltunk HTML-fájlokat az egyes útvonalakhoz, a nem létező útvonalaknál pedig egy 404-es hibakódot adtunk vissza.

A videóban bemutatott példa
![6ef8b60e2670c3ab3548df277bcf7817.png](:/e76ead23fd624e00bed35f560a83279f)

Dokumentáció
A http modul
https://nodejs.org/api/http.html

require(id)
https://nodejs.org/api/modules.html#modules_require_id

http.createServer([options][, requestListener])
https://nodejs.org/api/http.html#http_http_createserver_options_requestlistener

response.writeHead(statusCode[, statusMessage][, headers])
https://nodejs.org/api/http.html#http_response_writehead_statuscode_statusmessage_headers

fs.createReadStream(path[, options])
https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options

server.listen()
https://nodejs.org/api/http.html#http_server_listen

### Egyedi hiba oldal készítése

Mi magunk is definiálhatunk egyedi hibaoldalakat, így nem csak státuszkódot adunk vissza.

A videóban bemutatott példa
![d9f6598b58ebe3dd02bf0c6ccf6abb24.png](:/c20385667bfb4aafb750edf259bf6156)

![250802bbc8d84659bd33b6df2cb6ce6a.png](:/17d36e6b61ba4d02bec6f3ff9913a9c3)

### Az alkalmazás refaktorálása, route fájl készítése

Valós alkalmazás felépítéséhez nagyon hasonlót készítünk.

Átstrukturáljuk az alkalmazást, készítünk egy route fájlt és egy htmlResponse függvénybe kiszervezzük a választ.

Ehhez a path built-in modulból használjuk a join metódust, illetve a streameket.

A videóban bemutatott példa
![eac32a8ea0a29ad4121aad1e9788ae59.png](:/0e442716cd1d431d89b346bf213c5c12)

Paraméterként kell opcionálisan egy státuszkód (a default a 200), fixen kell a fájl útvonala, illetve a response object-re is szükség van.
![8b6dfab175d55f2bb5cabdde0ef7f218.png](:/fd386842694c4b0cb8ed73e7f3a562d2)




Dokumentáció
A path.join() metódus
https://nodejs.org/api/path.html#path_path_join_paths

https://www.geeksforgeeks.org/node-js-path-join-method/

response.writeHead(statusCode[, statusMessage][, headers])
https://nodejs.org/api/http.html#http_response_writehead_statuscode_statusmessage_headers

fs.createReadStream(path[, options])
https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options

### Az alkalmazás refaktorálása, controller írása

A controller kap egy kérést, ad rá egy adott választ, nem valósít meg bonyolult üzleti logikát. Összetettebb logika esetén ezt service-ekben oldjuk meg, és a controller azokat a függvényeket hívja meg.

Mivel a valóságban sok controller is lehet (product, customer, site stb.), és ezen belül is lehetnek ugyanilyen elnevezésű függvények, inkább így érjük el őket, egy objektumon keresztül.

A videóban bemutatott példa
![f132250bd4c87982af04f9ba2f52e932.png](:/fd2df915a5da4527a8a55fd46538b7b5)

![bbb4a7acb63a58747bdeb36c762780f6.png](:/5e08565ee7ad4fcfaf6d68d7902d2b77)

![3163d4b039720fe97463149454138a5b.png](:/94af56dda8a04d0c8958fe40b5667b49)


### Események, környezeti változók és a nodemon csomag

A videóban bemutatott példa
Feliratkozunk az error és a listening eseményekre, valamint a portszámot környezeti változóból adjuk meg:
![6e88a0c8c1a69f4a41a5c1c408cbfce2.png](:/6ab66207abf2496caf44b4f950e6a794)


A process.env-en keresztül férünk hozzá a környezeti változókhoz: ha van ilyen (PORT), kiolvassa az értékét, és itt fog futni az alkalmazás.

`const port = process.env.PORT || 8080;`

A nodemon csomag minden egyes mentésnél automatikusan újrafuttatja az alkalmazást.

```
npm i nodemon –g
```

Dokumentáció
process.env
https://nodejs.org/dist/latest-v8.x/docs/api/process.html#process_process_env 

nodemon
https://www.npmjs.com/package/nodemon

