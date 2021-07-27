npm i mongoose-id-validator


fetch('http://localhost:3000/post', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({title: 'Ez egy cím', body: 'Lorem ipsum dolor sit amet.', author: '60fd153d3c96fe1d8763ff11'})
}).then( r => r.json() )
.then( d => console.log(d) );