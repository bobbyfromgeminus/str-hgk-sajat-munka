const { generateUserList, getUserNames } = require('./utils');

const users = [
    {
        firstName: 'John',
        lastName: 'Doe',
        age: 23
    },
    {
        firstName: 'Agnes',
        lastName: 'Doe',
        age: 16
    },
    {
        firstName: 'William',
        lastName: 'Doe',
        age: 45
    },
];

console.log(generateUserList(users));
console.log(getUserNames(users));