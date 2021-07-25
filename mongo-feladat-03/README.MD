# MongoDB feladat #3

> A kész feladat feltöltésének helye:
> Repo: str-hgk-sajat-munka
> Almappa: mongo-feladat-03
> Például: http://github.com/cherryApp/str-hgk-sajat-munka/mongo-feladat-03

**Cursor függvényeinek gyakorlása videoStore adatbázissal**

## Használd a videoStore adatbázist (az első gyakorló feladatokból)!
```
use videoStore;
```

## Számold meg, hány akció- és romantikus filmed van összesen!
```
db.movies.find({ $or: [{ category: "ACTION" }, { category: "ROMANTIC" }] }).count();
```

## Kérdezd le a „FANTASY” filmek nevét és a kategóriáját. Mentsd le a listát (Cursor-t) egy változóba!
```
const fantasyMovieList = db.movies.find({ category: "FANTASY" }, { _id: 0, title: 1, category: 1 });
```
```
fantasyMovieList;
    { "title" : "Avatar", "category" : "FANTASY" }
    { "title" : "Star Wars IV: A New Hope", "category" : "FANTASY" }
    { "title" : "Star Wars V: The Empire Strickes Back", "category" : "FANTASY" }
    { "title" : "Star Wars VI: The Return of the Jedi", "category" : "FANTASY" }
    { "title" : "The Lord of the Rings: The Fellowship of the Ring", "category" : "FANTASY" }
```

## Írj egy ciklust, amely végigiterál a listán, és kiírja filmek a nevét és kategóriáját => példa: Végtelen történet: FANTASY (tipp: print() függvénnyel lehet kiíratni az értékeket Mongo shell-ben)!
```
fantasyMovieList.forEach(item => print(item.title, ": ", item.category));
```
```
    Avatar :  FANTASY
    Star Wars IV: A New Hope :  FANTASY
    Star Wars V: The Empire Strickes Back :  FANTASY
    Star Wars VI: The Return of the Jedi :  FANTASY
    The Lord of the Rings: The Fellowship of the Ring :  FANTASY
```

## Készíts egy lekérdezést, amely fordított sorrendben (_id) adja vissza csak a filmcímeket!
```
db.movies.find( {}, { _id: 0, title: 1 } ).sort( {_id: -1} );
db.movies.find().sort( {_id: -1}).forEach( item => print( item.title ) );
```

## Készíts egy lekérdezést, amely első lépésként a kategóriák szerint rakja sorba az elemeket, majd utána a megjelenés éve szerint fordítva sorolja fel! A lekérdezés csak a film címét, kategóriáját és megjelenési évét adja vissza.
```
db.movies.find({}, { title: 1, category: 1, releaseYear: 1, _id: 0, }).sort({ category: 1, releaseYear: -1 });
```
```
    { "title" : "Minority Report", "category" : "ACTION", "releaseYear" : 2002 }
    { "title" : "Starship Troopers", "category" : "ACTION", "releaseYear" : 1997 }
    { "title" : "Indiana Jones and the Temple of Doom", "category" : "ACTION", "releaseYear" : 1984 }
    { "title" : "Avatar", "category" : "FANTASY", "releaseYear" : 2009 }
    { "title" : "The Lord of the Rings: The Fellowship of the Ring", "category" : "FANTASY", "releaseYear" : 2001 }
    { "title" : "Star Wars VI: The Return of the Jedi", "category" : "FANTASY", "releaseYear" : 1983 }
    { "title" : "Star Wars V: The Empire Strickes Back", "category" : "FANTASY", "releaseYear" : 1980 }
    { "title" : "Star Wars IV: A New Hope", "category" : "FANTASY", "releaseYear" : 1977 }
    { "title" : "Big Fish", "category" : "ROMANTIC", "releaseYear" : 2003 }
    { "title" : "The Bridges of Madison County", "category" : "ROMANTIC", "releaseYear" : 1995 }
```

## Kérdezd le az ACTION kategóriából a legutóbb készült filmet (szigorúan a query-nek kell megkeresnie, manuálisan kinézni a DB-ből nem ér)!
Ehhez manuálisa aktualizálom a compass-ben a filmek megjelenési idejét, mert eddig az összes 1979 volt.
```
db.movies.find({ category: "ACTION" }).sort({ releaseYear: -1 }).limit(1);
```

## Kérdezd le az adatbázisból a két legrégebben készült film címét és gyártási évét!
```
db.movies.find({}, { _id:0, title: 1, releaseYear: 1 }).sort({ releaseYear: 1 }).limit(2);
```
```
    { "title" : "Star Wars IV: A New Hope", "releaseYear" : 1977 }
    { "title" : "Star Wars V: The Empire Strickes Back", "releaseYear" : 1980 }
```

## Kérdezd le a ROMANTIC kategóriából a második legfrissebben megjelent film nevét és megjelenési évét!
```
db.movies.find({ category: "ROMANTIC" }, { _id: 0, title: 1, releaseYear: 1 }).sort({ releaseYear: -1 }).skip(1).limit(1);
```
```
    { "title" : "The Bridges of Madison County", "releaseYear" : 1995 }
```

## Készíts egy scriptet egy javaScript fájlban! A script feladata, hogy egyetlen függvényben lekérdezze a mozifilmek számát kimentve egy változóba, majd ennek segítségével egy ciklus keretében 3-asával lapozva írja ki a konzolra a filmek címeit és kategóriáit (kisbetűvel a kategóriát) a következő módon =>
pl.: „Terminator : action movie”
Minden egyes oldal alján jelenjen meg a szöveg: --page over--!
Segítségül egy lehetséges eredmény:
```
(() => {
    const count = db.movies.find().count();
    const pages = Math.ceil( count / 3 );

    for (let i = 0; i < pages; i++) {
        db.movies.find()
            .skip(i*3)
            .limit(3)
            .forEach(item => {
                print(`${item.title} : ${item.category.toLowerCase()} movie`);
            });
        if (i < pages - 1) {
            print('--page over--');
        }
    }
})();
```
```
load('/mnt/data/Work/Training360/str-hgk-sajat-munka/mongo-feladat-03/script.js');
    Indiana Jones and the Temple of Doom : action movie
    The Bridges of Madison County : romantic movie
    Avatar : fantasy movie
    --page over--
    Star Wars IV: A New Hope : fantasy movie
    Star Wars V: The Empire Strickes Back : fantasy movie
    Star Wars VI: The Return of the Jedi : fantasy movie
    --page over--
    Starship Troopers : action movie
    Minority Report : action movie
    The Lord of the Rings: The Fellowship of the Ring : fantasy movie
    --page over--
    Big Fish : romantic movie
```