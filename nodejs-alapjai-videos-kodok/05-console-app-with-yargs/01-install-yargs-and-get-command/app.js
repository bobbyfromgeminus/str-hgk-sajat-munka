const yargs = require('yargs');

const movies = require('./database/movies');

yargs
    .version('1.0.0')                       // verziószám
    .usage('Usage: <command> [options]')    // helper template
    //.command('get', 'Get all movies', ()=>console.log(movies))
    .command({
        command: 'get',
        describe: 'Get all movies',
        handler: () => console.log(movies)
    })
    .locale('en')                           // helper nyelvezete (alapból is en)
    .strict()
    .help()
    .parse()                                // process.argv => args