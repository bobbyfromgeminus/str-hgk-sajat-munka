const yargs = require('yargs');
const { 
    getAllMovies,
    findMovieByID,
    createNewMovie,
    editMovie,
    removeMovie
 } = require('./movie.service');

yargs
    .version('1.0.0')                       // verziószám
    .usage('Usage: <command> [options]')    // helper template
    //.command('get', 'Get all movies', ()=>console.log(movies))

    // GET metódus leírója
    .command({
        command: 'get',
        describe: 'Get all movies',
        handler: () =>
            console.log(getAllMovies())
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
            console.log(findMovieByID(id))
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
            console.log(createNewMovie(producer, title));
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
            console.log(editMovie(id, producer, title))
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
            removeMovie(id);
            console.log('deleted');
        }
    })

    .locale('en')                           // helper nyelvezete (alapból is en)
    .strict()
    .help()
    .parse()                                // process.argv => args