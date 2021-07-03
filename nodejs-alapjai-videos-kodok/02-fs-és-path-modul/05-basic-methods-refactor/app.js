const { writeFile, appendFile } = require('fs');
const { fileHandlerWrapper } = require('./utils');

fileHandlerWrapper({
    method: writeFile,
    path: './example.txt',
    data: ' Ez egy új tartalom. '
});

fileHandlerWrapper({
    method: appendFile,
    path: './example.txt',
    data: ' Ez egy tartalom kiegészítés. '
});