const { unlink, rename, copyFile } = require('fs');

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

const copyFileWrapper = ( {  src, dest, callback = fileHandlerCallback } = {}) => {
    copyFile(src, dest, callback);
}

module.exports = Object.freeze(
    {
        unlinkWrapper,
        renameWrapper,
        copyFileWrapper
    }
)