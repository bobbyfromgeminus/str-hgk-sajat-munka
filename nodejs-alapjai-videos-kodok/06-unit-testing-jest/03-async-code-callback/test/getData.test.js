const getData = require('../src/getData');


// a done-nal tudjuk megváratni a tesztet
test('getData should be "DATA', (done) => {
    const callback = (str) => {
        expect(str).toBe('data');
        done();
    }
    getData(callback);
});
