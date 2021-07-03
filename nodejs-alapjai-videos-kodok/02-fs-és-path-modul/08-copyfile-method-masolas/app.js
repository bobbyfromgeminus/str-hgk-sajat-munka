const { unlinkWrapper, renameWrapper, copyFileWrapper } = require('./utils');

copyFileWrapper({
    src: './example.txt',
    dest: './new-destination/example.txt'
});