const express = require('express')
const router = express.Router()
const {todo} = require('./db')
const cors = require('cors')

router.use(cors())
router.use(express.json())

router.post('/todo-list', async(req, res)=>{

    const id = req.body.id;
    
    try{
        const todoLists =await todo.find({id : id});
        res.status(200).json({
            todo : todoLists
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