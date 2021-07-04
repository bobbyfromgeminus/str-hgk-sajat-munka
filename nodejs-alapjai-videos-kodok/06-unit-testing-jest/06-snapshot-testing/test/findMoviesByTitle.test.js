const findMoviesByTitle = require('../src/findMoviesByTitle');


test ('findMoviesByTitle should be an array of movie objects', () => {
    // expect(findMoviesByTitle('Star')).toEqual([
    //     { title: 'Star Wars', emoji: 'X' }
    // ])
    expect.addSnapshotSerializer({
        test: ({ title, emoji }) => title && emoji,
        print: ({ title, emoji }) => `${emoji} ${title}`
    })
    expect(findMoviesByTitle('Star')).toMatchSnapshot();
});