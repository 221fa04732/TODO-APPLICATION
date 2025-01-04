const express = require('express')
const router = express.Router()
const {todo} = require('./db')
const {createTodo} = require('./type')
const cors = require('cors')

router.use(cors())
router.use(express.json())

router.post('/new-todo', async(req, res)=>{
    const payLoad = req.body;

    const validateTodo=createTodo.safeParse(payLoad)
    if(!validateTodo.success){
        res.status(401).json({
            msg : "Invalid Input"
        })
        return;
    }

    try{
        await todo.create({
            id : payLoad.id,
            title : payLoad.title,
            description : payLoad.description,
            completed : false
        })
    
        res.status(200).json({
            msg : "Todo Created Sucessfully"
        })
    }

    catch(error){
        res.status(404).json({
            msg : "Server Error"
        })
    }

})

module.exports={
    router
}