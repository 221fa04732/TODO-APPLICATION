const mongoose = require('mongoose');
require('dotenv').config()
const URL = process.env.URL

mongoose.connect(URL)

const todoSchema = mongoose.Schema({
    id : String,
    title : String,
    description : String,
    completed : Boolean 
})

const userSchema = mongoose.Schema({
    UserName : String,
    Email : String,
    Password : String
})
 
const todo = mongoose.model('todo' , todoSchema)
const User = mongoose.model('User', userSchema)

module.exports = {
    todo,
    User
}
