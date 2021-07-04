const EventEmitter = require('./eventemitter');
const eventEmitter = new EventEmitter();

eventEmitter.on('speak', () => console.log('Zombie says Grrr!'));
eventEmitter.on('speak', () => console.log('Hungry Zombie says harr harr!'));
eventEmitter.on('walk', () => console.log('Deads are walking.'));

eventEmitter.emit('speak');
eventEmitter.emit('walk');