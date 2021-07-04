const yargs = require('yargs');
const { id, producer, title } = require('./option');
const MovieApi = require('./movie.api');
const MovieService = require('./movie.service');

const movieApi = MovieApi('./database/movies.json', 'movies');
const { 
    getAllMovies,
    findMovieByID,
    createNewMovie,
    editMovie,
    removeMovie
 } = MovieService(movieApi);

 const { 
    id,
    producer,
    title
 } = require('./option');

yargs
    .version('1.0.0')
    .usage('Usage: <command> [options]')

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
        builder: { id },
        handler: (args) =>
            console.log(findMovieByID(id))
    })

    // CREATE metódus leírója
    .command({
        command: 'create',
        describe: 'Create a new movie',
        builder: { producer, title },
        handler: ({ producer, title }) => {
            console.log(createNewMovie(args));
        }
    })

    // EDIT metódus leírása
    .command({
        command: 'edit',
        describe: 'Edit a movie',
        builder: { id, producer, title },
        handler: (args) => {
            console.log(editMovie(args))
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
        handler: (args) => {
            removeMovie(args.id);
            console.log('deleted');
        }
    })

    .locale('en')
    .strict()
    .help()
    .parse()