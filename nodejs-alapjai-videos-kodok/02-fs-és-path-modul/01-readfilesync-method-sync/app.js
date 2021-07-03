const fs = require('fs');

const data = fs.readFileSync('./a_ket_torony.txt', { encoding: 'utf-8'});

console.log(data);