const mongodb = require('mongoose');

const usersSchema = new mongodb.Schema({
    userName: String,
    email: String
})


module.exports = mongodb.model("User Schema",usersSchema);