# auth mappa refaktorálása



fetch('http://localhost:3000/person', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${temp1}`
    }
}).then( r => r.json() )
.then( d => console.log(d) ); 


fetch('http://localhost:3000/refresh', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({username: 'user', password: 'user_pw', token: rt})     
}).then( r => r.json() )
.then( d => console.log(d) ); 


fetch('http://localhost:3000/logout', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({username: 'user', password: 'user_pw', token: rt})     
}).then( r => r.json() )
.then( d => console.log(d) ); 