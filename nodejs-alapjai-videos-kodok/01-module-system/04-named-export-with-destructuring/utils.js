const even = array => array.filter(item => item %2 === 0);
const odd = array => array.filter(item => item %2 !== 0);

module.exports = {
    even: even,
    odd: odd
}