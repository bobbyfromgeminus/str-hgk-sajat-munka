const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

// függvények, amelyek majd lefutnak
const scream = () => console.log('I hear a scream.');
const tooLateToHelp = () => console.log('Too late, she is dead.');
const describeTheMurderer = ({height, hairColor}) => 
    console.log(`Height: ${height}, Hair Color: ${hairColor}`);

// feliratkozások az eseményekre
eventEmitter.on('scream', scream);
eventEmitter.on('scream', tooLateToHelp);
// az on-t többször is lefuttathatom, az once-t csak egyszer
eventEmitter.once('witness', describeTheMurderer);


eventEmitter.emit('scream');
eventEmitter.emit('scream');
eventEmitter.emit('witness', {height: '180 cm', hairColor: 'black'});
eventEmitter.emit('witness', {height: '180 cm', hairColor: 'black'});
// az off-fal leíratkozhatok egy eseményről egy adott föggvény vonatkozásában,
// így az a következőkben már nem hívódik meg
eventEmitter.off('scream', tooLateToHelp);
// emiatt itt már csak a scream fut le, a tooLateToHelp már nem
eventEmitter.emit('scream');