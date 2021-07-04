const sum = require('../src/sum');

// .toBe - egész számoknál egyenlőséget vizsgál:
test('sum 1 + 2 should be 3', () => {
    const actual = sum(1, 2);
    const expected = 3;
    expect(actual).toBe(expected);
})

// .toBeCloseTo - lebegőpontos számoknál egyenlőséget vizsgál:
test('sum 0.1 + 0.2 should be close to 0.3', () => {
    const actual = sum(0.1, 0.2);
    const expected = 0.3;
    expect(actual).toBeCloseTo(expected);
})

// kivétel tesztelés
test('sum gine an Error if one or more paramerers are not a finite numbers', () => {
    // hiába kezeltem hibát a függvényben, már a teszt előtt hibát dob.
    // expect(sum(1, '2')).toThrow();
    // ezért becsomagolom egy callback-be
    expect(() => sum(1, '2')).toThrow();
})
test('sum gine an Error if one or more paramerers are not a finite numbers', () => {
    const wrongParameters = [null, undefined, NaN, '', Infinity];
    wrongParameters.forEach(parameter => {
        expect(() => sum(1, parameter)).toThrow();
    })
})