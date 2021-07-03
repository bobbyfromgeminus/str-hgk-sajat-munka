const { unlink, rename } = require('fs');

const fileHandlerCallback = (err) => {
    if (err) throw err;
    console.log('File method successfuly.');
}

const unlinkWrapper = ( {  path, callback = fileHandlerCallback } = {}) => {
    unlink(path, callback);
}

const renameWrapper = ( {  oldPath, newPath, callback = fileHandlerCallback } = {}) => {
    rename(oldPath, newPath, callback);
}

module.exports = Object.freeze(
    {
        unlinkWrapper,
        renameWrapper
    }
)