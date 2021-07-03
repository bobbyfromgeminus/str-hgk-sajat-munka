const { writeFileWrapper } = require('./utils');

const data = 'ez lesz a tartalma';
writeFileWrapper('./example.txt', data);