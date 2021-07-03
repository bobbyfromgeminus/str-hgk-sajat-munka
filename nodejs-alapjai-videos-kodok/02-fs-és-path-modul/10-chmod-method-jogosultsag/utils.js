const { unlink, rename, copyFile, stat, chmod } = require('fs');

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

const statWrapper = ( {  path, callback = fileHandlerCallback } = {}) => {
    stat(path, callback);
}

const chmodWrapper = ( {  path, mode, callback = fileHandlerCallback } = {}) => {
    chmod(path, mode, callback);
}

module.exports = Object.freeze(
    {
        unlinkWrapper,
        renameWrapper,
        copyFileWrapper,
        statWrapper,
        chmodWrapper
    }
)