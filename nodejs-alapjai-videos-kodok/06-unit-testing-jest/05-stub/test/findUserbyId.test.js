const findUserById = require('../src/findUserbyId');

// Stubs: olyan adatok, amelyeket sehol nem használunk fel,
// kizárólag a tesztnél.

test ('findUserById should return a user object', () => {
    const users = [{ id: 1 }];
    const id = 1;
    expect(findUserById(users, id)).toEqual(users[0]);
});