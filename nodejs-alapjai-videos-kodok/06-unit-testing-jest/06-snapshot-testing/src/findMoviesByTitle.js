const movies = [
    { title: 'Flipper', emoji: ':)' },
    { title: 'Game of Thrones', emoji: ':O' },
    { title: 'Harry Potter', emoji: ':(' },
    { title: 'Star Wars', emoji: 'X' },
    { title: 'Star Wars IV', emoji: 'X' },
    { title: 'Star Wars V', emoji: 'X' }
]


const findMoviesByTitle = title => 
    movies.filter(movie => movie.title.includes(title));

module.exports = findMoviesByTitle;