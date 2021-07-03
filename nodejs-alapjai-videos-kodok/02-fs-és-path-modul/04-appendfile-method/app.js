const { writeFileWrapper, appendFileWrapper } = require('./utils');

const data = 'ez lesz a tartalma';
//writeFileWrapper('./example.txt', data);
appendFileWrapper('./example.txt', data);