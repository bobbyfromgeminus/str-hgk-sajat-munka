const { unlinkWrapper, renameWrapper, copyFileWrapper, statWrapper } = require('./utils');

statWrapper({
    path: './example.txt',
    callback(err, stats) {
        if (err) throw err;
        console.log(stats);
    }
});