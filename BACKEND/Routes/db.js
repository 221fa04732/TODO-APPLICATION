const mongoose = require('mongoose');
require('dotenv').config()
const URL = process.env.URL

mongoose.connect(URL)

const todoSchema = mongoose.Schema({
    title : String,
    description : String,
    completed : Boolean 
})
 
const todo = mongoose.model('todo' , todoSchema)

module.exports = {
    todo
}
