# Routing - tesztelés

## CREATE
fetch('http://localhost:3000/person', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({first_name: 'Jack', last_name: 'London', email: 'jl.gemail.com'})
}).then( r => r.json() )
.then( d => console.log(d) );

## UPDATE
fetch('http://localhost:3000/person/101', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({first_name: 'Jack', last_name: 'London', email: 'jack.london.gmail.com'})
}).then( r => r.json() )
.then( d => console.log(d) );

## DELETE
fetch('http://localhost:3000/person/101', {
    method: 'DELETE'
}).then( r => r.json() )
.then( d => console.log(d) );