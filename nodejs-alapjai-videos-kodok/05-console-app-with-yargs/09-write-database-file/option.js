const Option = ({ alias, describe, type = 'string', demandOption = 'true' } = {}) => ({
    alias, describe, type, demandOption
})

const id = Option({
    alias: 'i',
    describe: 'Movie ID',
    type: 'number'
});

const producer = Option({
    alias: 'p',
    describe: 'Movie Producer',
});

const title = Option({
    alias: 't',
    describe: 'Movie Title',
});

module.exports = Object.freeze({
    id,
    producer,
    title
})