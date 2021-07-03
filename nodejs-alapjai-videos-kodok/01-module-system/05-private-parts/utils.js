const even = array => array.filter(item => item %2 === 0);
const odd = array => array.filter(item => item %2 !== 0);

// ez a függvény csak itt lesz használható, mert nem exportáltuk
const generateRandom = (to) => Math.floor(Math.random() * to) + 1;

const multipleByRandom = (array, to) => 
    array.map(item => item * generateRandom(to));

module.exports = {
    even,
    odd,
    multipleByRandom
}