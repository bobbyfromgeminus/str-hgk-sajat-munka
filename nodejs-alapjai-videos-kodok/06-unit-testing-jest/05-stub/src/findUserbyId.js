const findUserbyId = (users, id) => 
    users.find(user => user.id === id) || null;
    
module.exports = findUserbyId;