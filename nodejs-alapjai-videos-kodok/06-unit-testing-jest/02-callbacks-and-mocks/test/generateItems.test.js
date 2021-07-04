const gerenateItems = require('../src/generateItems');

// megfelelő kimenetek tesztelése
test('gerenateItems call callback count of items times', () => {
    const callback = (x) => x * 2;
    const arr = [1, 2];
    const actual = gerenateItems(arr, callback);
    const expected = [2, 4];
    expect(actual).toEqual(expected);
});

// jest.fn
test('gerenateItems call callback count of items times', () => {
    const mockCallback = jest.fn(x => x * 2);
    const arr = [1, 2];
    const actual = gerenateItems(arr, mockCallback);
    const expected = [2, 4];
    expect(actual).toEqual(expected);
    expect(mockCallback).toHaveBeenCalled();        // meghívódott-e?
    expect(mockCallback).toHaveBeenCalledTimes(2);   // hány alkalommal?
});


// jest.fn
test('gerenateItems call callback count of items times', () => {
    const mockCallback = jest.fn(x => x * 2);
    const arr = [1, 2];
    const actual = gerenateItems(arr, mockCallback);
    // első meghívásakor 1-et kap értékként,
    // ezért 2-vel tér-e vissza?
    expect(mockCallback.mock.results[0].value).toBe(2);
    // második meghívásakor 2-t kap értékként,
    // ezért 4-gyel tér-e vissza?
    expect(mockCallback.mock.results[1].value).toBe(4);
});