const even = arr => arr.filter(item => item %2 === 0)
const odd = arr => arr.filter(item => item %2 !== 0)

module.exports = Object.freeze({
    even: even,
    odd: odd,
    users: {
        name: 'John Doe',
        age: 30
    }
})