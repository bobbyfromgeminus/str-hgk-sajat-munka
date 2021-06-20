const even = arr => arr.filter(item => item %2 === 0)
const odd = arr => arr.filter(item => item %2 !== 0)

module.exports = {
    even: even,
    odd: odd
}

/* így is lehet
module.exports = {
    even,
    odd
}
*/