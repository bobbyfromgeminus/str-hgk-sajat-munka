const even = array => array.filter(item => item %2 === 0);
const odd = array => array.filter(item => item %2 !== 0);

module.exports = Object.freeze({
    even: even,
    odd: odd
});