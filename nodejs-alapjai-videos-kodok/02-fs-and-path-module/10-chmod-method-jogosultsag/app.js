const { unlinkWrapper, renameWrapper, copyFileWrapper, statWrapper, chmodWrapper } = require('./utils');

chmodWrapper({
    path: './example.txt',
    mode: 754
});