var userName = 'John Doe';

console.log('username', userName);

// A var-ral létrehozott változók (frontenddel ellentétben) nem lesznek hozzákötve a globalhoz (window-hoz),
// ezért itt undefined-ot kapunk.
// Ez egy fontos különbség a frontend/backend között.
// De itt se használjunk var-t!

console.log('global username', global.userName);

// A global object mindenhol globálisan elérhető,
// a module object szintén minden fájlon belül ott lesz, a tartalma viszont különböző.
console.log(global);
console.log(module);