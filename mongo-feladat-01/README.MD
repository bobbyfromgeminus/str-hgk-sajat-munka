# MongoDB feladat #1

MongoDB alapfeladatok terminálban (Mongo shell-ben)
Elsőként olvasd végig az összes pontot!

## Készíts egy videoStore nevű MongoDB adatbázist!
```
use('videoStore');
```

## Hozz létre benne egy movies listát!
```
db.createCollection('movies');
```

## Ments el benne 10 új filmet (save()) a következő mezőkkel:
- _id: legyen generált, ObjectId
- title: egy-egy kedvenc film címe, szöveges tartalom
- category: szöveges tartalom (3 típus lehet: fantasy, action, romantic) => legyenek vegyesen a filmek, amennyire lehet
- director: szöveges tartalom, 3 rendező közül vegyesen szétválogatva => Steven Spielberg, Clint Eastwood, James Cameron
```
db.movies.insertMany([
    {title: "Indiana Jones and the Temple of Doom", category: "action", director: "Steven Spielberg"},
    {title: "The Bridges of Madison County", category: "romantic", director: "Clint Eastwood"},
    {title: "Avatar", category: "fantasy", director: "James Cameron"},
    {title: "Star Wars IV: A New Hope", category: "fantasy", director: "James Cameron"},
    {title: "Star Wars V: The Empire Strikes Back", category: "fantasy", director: "Steven Spielberg"},
    {title: "Star Wars VI: The Return of the Jedi", category: "fantasy", director: "Clint Eastwood"},
    {title: "Starship Troopers", category: "action", director: "James Cameron"},
    {title: "Minority Report", category: "action", director: "Steven Spielberg"},
    {title: "The Lord of the Rings: The Fellowship of the Ring", category: "fantasy", director: "Clint Eastwood"},
    {title: "Big Fish", category: "romantic", director: "James Cameron"},
]);
```

## Frissítsd a listádat (updateMany), mindenki kapjon egy „ratings” mezőt, amely egy üres listát tartalmaz (1-5 ig lehet benne tárolni a szavazatokat)!
```
db.movies.updateMany({}, {$set: {ratings: []}});
```

## Adj 3 különböző filmre legalább 2 különböző szavazatot (használd a $push operátort)!
```
db.movies.updateOne( {title: "Minority Report"}, {$push:{ratings: 4}} ),
db.movies.updateOne( {title: "Minority Report"}, {$push:{ratings: 5}} ),
db.movies.updateOne( {title: "Minority Report"}, {$push:{ratings: 3}} ),
db.movies.updateOne( {title: "Avatar"}, {$push:{ratings: 1}} ),
db.movies.updateOne( {title: "Avatar"}, {$push:{ratings: 5}} ),
db.movies.updateOne( {title: "Avatar"}, {$push:{ratings: 3}} ),
db.movies.updateOne( {title: "Star Wars V: The Empire Strikes Back"}, {$push:{ratings: 5}} ),
db.movies.updateOne( {title: "Star Wars V: The Empire Strikes Back"}, {$push:{ratings: 4}} );
```

## Adj hozzá minden filmhez egy „releaseYear” (megjelenés éve) mezőt: kezdetnek állíts be egy tetszőleges évet minden filmnek (pl.: 2000)!
```
db.movies.updateMany( {}, {$set: { releaseYear: 1979 }} );
```

## Írd át category típusonként csupa nagybetűre a kategóriákat (pl.: action ==> ACTION legyen mindenhol). Használd az updateMany parancsot!
> Tipp: db.courses.updateMany( {}, [{$set: {title: >{$toUpper: "$title"} }}] )
```
db.movies.updateMany( {}, [{$set: {category: {$toUpper: "$category"} }}] );
```