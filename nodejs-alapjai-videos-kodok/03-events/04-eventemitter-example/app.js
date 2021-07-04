// szükségünk van a factory függvényre
const reader = require('./reader');
// valamint az eventEmitterre, amit példányosítunk is
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();
// továbbá a factory függvényeire is, továbbá a factory vár egy eventEmitter példányt
const { readContent, printContent, errorHandler, close } = reader(eventEmitter);

// feliratkozuink valamennyi eseményre
eventEmitter.on('read', readContent);
eventEmitter.on('print', printContent);
eventEmitter.on('close', close);
eventEmitter.on('error', errorHandler);

// és elegendő a read-et emittálni,
// mert a printet majd a read emittálja, ha nincs hiba
eventEmitter.emit('read', './example.txt');