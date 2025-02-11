const express = require("express")
const app = express()


require('dotenv').config()
const PORT = process.env.PORT || 5000


const createTodoRoute = require('./Routes/createTodo')
const todoList = require('./Routes/todoList')
const markTodo = require('./Routes/markTodo')
const deleteTodo = require('./Routes/deleteTodo')
const userSignIn = require('./Routes/signIn')
const userSignUp = require('./Routes/signUp')


const cors = require('cors')
app.use(express.json());
app.use(cors())


app.use('/create', createTodoRoute.router)
app.use('/your', todoList.router)
app.use('/todoMark', markTodo.router)
app.use('/delete', deleteTodo.router)
app.use('/signin',userSignIn.router)
app.use('/signup',userSignUp.router)


app.listen(PORT, ()=>{
    console.log(`Server is Listining`);
})