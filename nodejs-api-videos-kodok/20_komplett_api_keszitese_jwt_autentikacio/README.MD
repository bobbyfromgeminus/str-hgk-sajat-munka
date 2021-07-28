npm i jsonwebtoken


## Hibás listázás
fetch('http://localhost:3000/person', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer asajksdhajkdhakj'
    }
}).then( r => r.json() )
.then( d => console.log(d) ); 


## Bejelentkezés
fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({username: 'user', password: 'user_pw'})
}).then( r => r.json() )
.then( d => console.log(d) ); 

## Sikeres lista lekérés
fetch('http://localhost:3000/person', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJyb2xlIjoidXNlciIsImlhdCI6MTYyNzQ5NjgzMn0.HD_iWfgBn-YHFgbUc14rhboe7tQ9RSuUMgp34K4d1kM'
    }
}).then( r => r.json() )
.then( d => console.log(d) ); 
