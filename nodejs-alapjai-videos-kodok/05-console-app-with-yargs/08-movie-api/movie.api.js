const { readFileSync, writeFileSync} = require('fs');

const MovieApi = (path, prop) => ({

    get () {
        const dataString = readFileSync(path);
        const data = JSON.parse(dataString)[prop];
        return data;
    },

    save (data) {
        writeFileSync(path, JSON.stringify({ [prop]: data} ));
    }

});

module.exports = Object.freeze(MovieApi);