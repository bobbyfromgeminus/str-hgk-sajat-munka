const { resolve, join } = require('path');
const { clearScreenDown } = require('readline');

// visszaadja annak a mappának a teljes elérési útvonalát, amelyben a terminálban épp állok
console.log(resolve()); // az fs metúdusok ezt használják
console.log('-------------------------');

// visszaadja az aktuális munkakönyvárunk relatív útvonalát
console.log(join());
console.log('-------------------------');

// visszaadja az aktuális fájl absolút elérési útvonalát
console.log(__dirname);
console.log('-------------------------');

console.log(resolve('./example.txt'));
console.log('-------------------------');
console.log(join('./example.txt'));
console.log('-------------------------');
// ezzel a megoldással a fájl telejs elérési útvonalát adja vissza
console.log(join(__dirname, './example.txt'));
console.log('-------------------------');