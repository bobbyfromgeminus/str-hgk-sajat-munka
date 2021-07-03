const { unlinkWrapper, renameWrapper } = require('./utils');

renameWrapper({ oldPath: './example.txt', newPath: './newExample.txt' });