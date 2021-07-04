const convertToUppercase = require('../src/convertToUppercase');

// a promise esetében ha return-ként adatom vissza a föggvény értékét, akkor megvárja az eredményt
describe('convertToUppercase', () => {

    // THEN / CATCH megoldás

        // resolve ág tesztje
        test ('"test" should be "TEST"', () => {
            return convertToUppercase('test')
                .then(str => {
                    expect(str).toBe('TEST');
                })
        })

        // reject ág tesztje
        test ('Give a TypeError if parameter is not a string', () => {
            return convertToUppercase('test')
                .catch(err => {
                    expect(err).toEqual(TypeError());
                })
        })

    // ASYNC/AWAIT MEGOLDÁS
    
        // resolve ág tesztje async/await megoldással
        test ('"test" should be "TEST"', async () => {
            await expect(convertToUppercase('test')).resolves.toBe('TEST');
        })

        // reject ág tesztje async/await megoldással
        test ('Give a TypeError if parameter is not a string', async () => {
            await expect(convertToUppercase(10)).rejects.toEqual(TypeError());
        })

})
