const yargs = require('yargs');
let movies = require('./database/movies');

yargs
    .version('1.0.0')                       // verziószám
    .usage('Usage: <command> [options]')    // helper template
    //.command('get', 'Get all movies', ()=>console.log(movies))

    // GET metódus leírója
    .command({
        command: 'get',
        describe: 'Get all movies',
        handler: () =>
            console.log(movies)
    })

    // FIND metódus leírója
    .command({
        command: 'find',
        describe: 'Find a movie',
        builder: {
            id: {
                alias: 'i',
                describe: 'Movie ID',
                type: 'number',
                demandOption: true
            }
        },
        handler: ({ id }) =>
            console.log(movies.find(movie => movie.id === id))
    })

    // CREATE metódus leírója
    .command({
        command: 'create',
        describe: 'Create a new movie',
        builder: {
            producer: {
                alias: 'p',
                describe: 'Movie Producer',
                type: 'string',
                demandOption: true
            },
            title: {
                alias: 't',
                describe: 'Movie Title',
                type: 'string',
                demandOption: true
            }
        },
        handler: ({ producer, title }) => {
            const sortedMovies = [...movies].sort((a,b) => a.id > b.id );
            const id = sortedMovies[sortedMovies.length-1].id + 1;
            const movie = { id, producer, title };
            movies = [...movies, movie];
            console.log(movies.find(movie => movie.id === id))
        }
    })

    // EDIT metódus leírása
    .command({
        command: 'edit',
        describe: 'Edit a movie',
        builder: {
            id: {
                alias: 'i',
                describe: 'Movie ID',
                type: 'number',
                demandOption: true
            },
            producer: {
                alias: 'p',
                describe: 'Movie Producer',
                type: 'string',
                demandOption: true
            },
            title: {
                alias: 't',
                describe: 'Movie Title',
                type: 'string',
                demandOption: true
            }
        },
        handler: ({ id, producer, title }) => {
            movies = movies.map(movie => movie.id === id ?{ id, producer, title} : movie);
            console.log(movies.find(movie => movie.id === id));
        }
    })

    // REMOVE metódus leírója
    .command({
        command: 'remove',
        describe: 'Remove a movie',
        builder: {
            id: {
                alias: 'i',
                describe: 'Movie ID',
                type: 'number',
                demandOption: true
            }
        },
        handler: ({ id }) => {
            movies = movies.filter(movie => movie.id != id);
            console.log('deleted');
        }
    })

    .locale('en')                           // helper nyelvezete (alapból is en)
    .strict()
    .help()
    .parse()                                // process.argv => args