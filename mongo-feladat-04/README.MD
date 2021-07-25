# MongoDB feladat #4

> A kész feladat feltöltésének helye:
> Repo: str-hgk-sajat-munka
> Almappa: mongo-feladat-04
> Például: http://github.com/cherryApp/str-hgk-sajat-munka/mongo-feladat-04

**Listák közötti kapcsolatok, aggregáció gyakorlása, Embed vs. Referencing**

Ha egy objektum (dokumentum) egy másik dokumentum egyik mezőjében van, akkor beszélhetünk „embed”, beágyazott dokumentumról.

## Használjuk a videoStore adatbázist!
```
use videostore;
```

## Hozzunk létre benne egy új „cinemas” listát, amely a következő kikötésekkel rendelkezik:
- _id: kötelező megadni és csak egész számokból (integer) állhat
- 'name' mező: string lehet, kötelező megadni. Csak számokból, betűkből (angol) és szóközből állhat
- 'movies' mező: 'array' lehet és kötelező megadni
- 'address' mező: objektum lehet és kötelező megadni (az objektumban majd elég egy „city” mezővel játszani)
```
db.createCollection("cinemas", {
    validator: {
        $jsonSchema: {
            required: ["_id", "name", "movies", "address"],
            properties: {
                _id: { bsonType: "int" },
                name: { bsonType: "string", pattern: "[A-Za-z0-9 ]"},
                movies: { bsonType: "array" },
                address: { 
                    bsonType: "object", 
                    properties: { 
                        city: { 
                            bsonType: "string"
                        }
                    }
                }
            },
            required: ["_id", "name", "movies", "address"]
        }
    }
});
```

## Ha még nem tettük meg, a cinema listánk rendelkezzen 3 cinema dokumentummal, és minden cinema dokumentum „játsszon” legalább 3 különböző filmet => adjunk hozzá legalább 3 cinema dokumentum egyes movies listájához 3 db "_id" értéket a movies listából!
```
db.cinemas.insertMany([
    { _id: NumberInt(1), name: "Berény Szálló", movies: [ObjectId("60fd80ce5cacae7728f2ebb2"), ObjectId("60fd80ce5cacae7728f2ebb3"), ObjectId("60fd80ce5cacae7728f2ebb4")], address: { city: "Mezőberény" } },
    { _id: NumberInt(2), name: "Fédra", movies: [ObjectId("60fd80ce5cacae7728f2ebb1"), ObjectId("60fd80ce5cacae7728f2ebb5"), ObjectId("60fd80ce5cacae7728f2ebb6")], address: { city: "Békéscsaba" } },
    { _id: NumberInt(3), name: "Király", movies: [ObjectId("60fd80ce5cacae7728f2ebaf"), ObjectId("60fd80ce5cacae7728f2ebb7"), ObjectId("60fd80ce5cacae7728f2ebb8")], address: { city: "Békés" } }
]);
```

## Kérdezzük le, hogy az első helyen lévő mozink milyen filmeket játszik, jelenjen meg minden film tulajdonsága!
```
db.cinemas.aggregate([
    { $lookup: {
            from: "movies",
            localField: "movies",
            foreignField: "_id",
            as: "justPlayedMovies"
        }
    }, { $limit: 1 }
]).pretty();
```

## Ismételjük meg a fenti lekérdezést úgy, hogy csak a játszott film listája, adatai jelenjenek meg (tipp: „project” operator)!
```
db.cinemas.aggregate([
    { $lookup: {
            from: "movies",
            localField: "movies",
            foreignField: "_id",
            as: "justPlayedMovies"
        }
    },
    { $limit: 1 },
    { $project: { 
            "_id": 0,
            "Movie Titles": "$justPlayedMovies.title", 
            "Releases": "$justPlayedMovies.releaseYear", 
            "Categories": "$justPlayedMovies.category"
        }
    }  
]).pretty();
```
```
    {
        "Movie Titles" : [
            "Star Wars IV: A New Hope",
            "Star Wars V: The Empire Strickes Back",
            "Star Wars VI: The Return of the Jedi"
        ],
        "Releases" : [
            1977,
            1980,
            1983
        ],
        "Categories" : [
            "FANTASY",
            "FANTASY",
            "FANTASY"
        ]
    }
```

## Ha még nem tettük meg, készítsünk el a videoStore-ban egy directors listát (a 2. feladat leírása alapján), és minden rendezőhöz rendeljünk 2-3 db filmet a „movies” mezőjükhöz.
- Elkészült a 2. feladatban.

## Kérdezzük le az egyik rendező által rendezett filmek adatait!
```
db.directors.aggregate([
    {
        $lookup: {
            from: "movies",
            localField: "movies",
            foreignField: "_id",
            as: "Director"
        }
    },
    {
        $match: {
            name: "Steven Spielberg"
        }
    }
]).pretty();
```
```
    {
        "_id" : 1,
        "name" : "Steven Spielberg",
        "birthYear" : 1946,
        "movies" : [
            ObjectId("60fd80ce5cacae7728f2ebaf"),
            ObjectId("60fd80ce5cacae7728f2ebb3"),
            ObjectId("60fd80ce5cacae7728f2ebb6")
        ],
        "Directed by" : [
            {
                "_id" : ObjectId("60fd80ce5cacae7728f2ebaf"),
                "title" : "Indiana Jones and the Temple of Doom",
                "category" : "ACTION",
                "ratings" : [ ],
                "releaseYear" : 1984
            },
            {
                "_id" : ObjectId("60fd80ce5cacae7728f2ebb3"),
                "title" : "Star Wars V: The Empire Strickes Back",
                "category" : "FANTASY",
                "ratings" : [
                    5,
                    4
                ],
                "releaseYear" : 1980
            },
            {
                "_id" : ObjectId("60fd80ce5cacae7728f2ebb6"),
                "title" : "Minority Report",
                "category" : "ACTION",
                "ratings" : [
                    4,
                    5,
                    3
                ],
                "releaseYear" : 2002
            }
        ]
    }
```

## Kérdezzük le egy másik rendező filmjeit úgy, hogy csak a rendező neve és a filmek „title”-jei, vagyis címei jelennek meg (tipp: $project operátor)!
```
db.directors.aggregate([
    { $lookup: 
        {
            from: "movies",
            localField: "movies",
            foreignField: "_id",
            as: "Director"
        }
    },
    { $match: {
            name: "James Cameron"
        }
    },
    { $project: { 
            "_id": 0,
            "Movie Titles": "$Director.title", 
            "Releases": "$Director.releaseYear", 
            "Categories": "$Director.category"
        }
    } 
]).pretty();
```
```
    {
        "Movie Titles" : [
            "Avatar",
            "Star Wars IV: A New Hope",
            "Starship Troopers",
            "Big Fish"
        ],
        "Releases" : [
            2009,
            1977,
            1997,
            2003
        ],
        "Categories" : [
            "FANTASY",
            "FANTASY",
            "ACTION",
            "ROMANTIC"
        ]
    }
```

## Adj pár szavazatot egy-egy filmre ("ratings"), ha még nem tetted meg. Írj egy lekérdezést az aggregáció segítségével, amely visszaadja annak a filmnek a címét, amely a legjobb átlagszavazattal rendelkezik! Két mezőt adjon vissza: "title" és egy új mező: "rateAvg" => pl.: { "title" : "E.T.", "rateAvg" : 4.5 }. Csak aggregációt használj, Cursor metódusok használata nélkül!
```
db.movies.aggregate([    
    { $project: { _id: 0, title: 1, rateAvg: { $avg: "$ratings" } }},
    { $sort: { rateAvg: -1 } },
    { $limit: 1 }
]);
db.movies.aggregate([
    { $project: {
        _id: 0,
        title: 1,
        rateAvg: { $avg: "$ratings" }}
    },
    { $sort: { rateAvg: -1 } },
    { $limit: 1 }
]).pretty();
```
```
    { "title" : "Star Wars V: The Empire Strickes Back", "rateAvg" : 4.5 }
```