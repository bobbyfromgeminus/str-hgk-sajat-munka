# MongoDB feladat #2

A kész feladat feltöltésének helye:
Repo: str-hgk-sajat-munka
Almappa: mongo-feladat-02
Például: http://github.com/cherryApp/str-hgk-sajat-munka/mongo-feladat-02

A videoStore feladat folytatása (update, find, projection)

> Normalization elve: Csak a közvetlen összetartozó elemeket tároljuk egy táblázatban (listában). Minél összetettebb egy adat (több tulajdonsággal rendelkezhet, pl.: rendezőnek lehet neve, díjai, filmjei, születési adatai), annál inkább külön listába kell kiszervezni a tárolását.

## Készíts el egy „directors” listát, amelyben filmrendezőket fogunk tárolni!
```
use('videoStore');
db.createCollection('directors');
```

## Ments el benne 3 „rendező” dokumentumot az insertOne() parancs segítségével:
"_id": egész szám 1-estől indulva
"name": Steven Spielberg, Clint Eastwood, James Cameron
"birthYear": születési év (tetszőlegesen megadott egész szám)
"movies": kezdetben egy üres lista
```
db.directors.insertOne({ _id: 1, name: 'Steven Spielberg', birthYear: 1946, movies: [] });
db.directors.insertOne({ _id: 2, name: 'Clint Eastwood', birthYear: 1935, movies: [] });
db.directors.insertOne({ _id: 3, name: 'James Cameron', birthYear: 1954, movies: [] });
```

## Frissítsd a rendezők dokumentumait, helyezd el a „movies” listájukba a megfelelő filmek id-jait (ha ObjectId-t használsz, akkor figyelj arra, hogy ObjectId-ként mentsd el őket). Tipp: kérdezd le a rendezőket, és alájuk listázd a filmeket úgy, hogy csak az id-jük és a rendező nevét adja vissza a lekérdezés:
```
db.directors.find();
```
```
    { "_id" : 1, "name" : "Steven Spielberg", "birthYear" : 1946, "movies" : [ ] }
    { "_id" : 2, "name" : "Clint Eastwood", "birthYear" : 1935, "movies" : [ ] }
    { "_id" : 3, "name" : "James Cameron", "birthYear" : 1954, "movies" : [ ] }
```
```
db.movies.find({},{director:1}).sort({director: 1});
```
```
    { "_id" : ObjectId("60fd80ce5cacae7728f2ebb0"), "director" : "Clint Eastwood" }
    { "_id" : ObjectId("60fd80ce5cacae7728f2ebb4"), "director" : "Clint Eastwood" }
    { "_id" : ObjectId("60fd80ce5cacae7728f2ebb7"), "director" : "Clint Eastwood" }
    { "_id" : ObjectId("60fd80ce5cacae7728f2ebb1"), "director" : "James Cameron" }
    { "_id" : ObjectId("60fd80ce5cacae7728f2ebb2"), "director" : "James Cameron" }
    { "_id" : ObjectId("60fd80ce5cacae7728f2ebb5"), "director" : "James Cameron" }
    { "_id" : ObjectId("60fd80ce5cacae7728f2ebb8"), "director" : "James Cameron" }
    { "_id" : ObjectId("60fd80ce5cacae7728f2ebaf"), "director" : "Steven Spielberg" }
    { "_id" : ObjectId("60fd80ce5cacae7728f2ebb3"), "director" : "Steven Spielberg" }
    { "_id" : ObjectId("60fd80ce5cacae7728f2ebb6"), "director" : "Steven Spielberg" }
```
```
db.directors.updateOne( {_id: 1}, {$set: {movies: [ObjectId("60fd80ce5cacae7728f2ebaf"), ObjectId("60fd80ce5cacae7728f2ebb3"), ObjectId("60fd80ce5cacae7728f2ebb6")]}});
db.directors.updateOne( {_id: 2}, {$set: {movies: [ObjectId("60fd80ce5cacae7728f2ebb0"), ObjectId("60fd80ce5cacae7728f2ebb4"), ObjectId("60fd80ce5cacae7728f2ebb7")]}});
db.directors.updateOne( {_id: 3}, {$set: {movies: [ObjectId("60fd80ce5cacae7728f2ebb1"), ObjectId("60fd80ce5cacae7728f2ebb2"), ObjectId("60fd80ce5cacae7728f2ebb5"), ObjectId("60fd80ce5cacae7728f2ebb8")]}});
```

## Ha frissítetted a rendezőket, ellenőrzés gyanánt kérdezd le a dokumentumokat a „directors” listából (használd a pretty() metódust a szebb megjelenítéshez)! Ehhez hasonló eredményt kell látnod:
```
db.directors.find().pretty();
```

## Ha elkészültél a rendezői listával, frissítsd a movies listát („táblázatot”): távolítsd el a director mezőt ($unset operátor segítségével). Ezentúl a rendezőn keresztül fogjuk elérni a hozzájuk tartozó filmeket.
```
db.movies.updateMany({}, { $unset: { director: '' } });
```

## Kérdezd le az egy bizonyos év előtt készült filmeket, majd az egy bizonyos év után készült filmeket! ($gt, $gte, $lt, $lte)
```
// Jelenleg az összes film 1979-es.
db.movies.find({ releaseYear: { $gt: 1979 } });     // üres
db.movies.find({ releaseYear: { $gte: 1979 } });    // összes
db.movies.find({ releaseYear: { $lt: 1979 } });     // üres
db.movies.find({ releaseYear: { $lte: 1979 } });    // összes
```

## Kérdezz le két év között készült filmeket! (Próbáld ki $and operátorral is!)
```
db.movies.find({ releaseYear: { $gt: 1978, $lt:1980 } });
db.movies.find({ $and: [{ releaseYear: { $gt: 1978 } }, { releaseYear: { $lt: 1980 } }] });
```

## Kérdezz le két év közötti filmeket, amelyek egy bizonyos kategóriával rendelkeznek!
```
db.movies.find({ releaseYear: { $gt: 1978, $lt: 1980 }, category: "ACTION" });
db.movies.find({ $and: [{ releaseYear: { $gt: 1978 } }, { releaseYear: { $lt: 1980 } }, { category: "FANTASY" } ] });
```

## Kérdezd le a filmeket, amelyeknek a kategóriája NEM FANTASY ($ne)!
```
db.movies.find({ category: { $ne: "FANTASY" } });
```