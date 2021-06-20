const even = arr => arr.filter(item => item %2 === 0)

const odd = arr => arr.filter(item => item %2 !== 0)

const generateRandom = (to) => Math.floor(Math.random() * to) + 1

const multipliedByRandom = (arr, to) =>
    arr.map(item => item * generateRandom(to))

module.exports = {
    even: even,
    odd: odd,
    multipliedByRandom
}

/* így is lehet
module.exports = {
    even,
    odd
}
*/