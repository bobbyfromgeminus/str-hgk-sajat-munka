const { unlink } = require('fs');

const fileHandlerCallback = (err) => {
    if (err) throw err;
    console.log('The file has been deleted.');
}

const unlinkWrapper = ( {  path, callback = fileHandlerCallback } = {}) => {
    unlink(path, callback);
}

module.exports = Object.freeze(
    {
        unlinkWrapper
    }
)