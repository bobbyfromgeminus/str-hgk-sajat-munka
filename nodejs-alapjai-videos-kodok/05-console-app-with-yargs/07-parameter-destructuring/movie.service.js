let movies = require('./database/movies');

const getAllMovies = () => movies;

const findMovieByID = (id) => movies.find(movie => movie.id === id);

const generateNewMovieID = () => {
    const sortedMovies = [...movies].sort((a,b) => a.id > b.id );
    return sortedMovies[sortedMovies.length - 1].id + 1;
}

const createNewMovie = ({ producer, title }) => {
    const movie = { id: generateNewMovieID(), producer, title };
    movies = [...movies, movie];
    return movie;
}

const editMovie = ({ id, producer, title }) => {
    movies = movies.map(movie => movie.id === id ?{ id, producer, title} : movie);
    return findMovieByID(id);
}

const removeMovie = (id) => {
    movies = movies.filter(movie => movie.id != id);
}

module.exports = Object.freeze({
    getAllMovies,
    findMovieByID,
    createNewMovie,
    editMovie,
    removeMovie
})