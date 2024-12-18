const express = require('express')
const router = express.Router()
const cors = require('cors')
const {todo} = require('./db')

router.use(cors())
router.use(express.json())

router.put('/mark-as-done', async(req, res)=>{
    const todoId = req.body.id;
    const todoStatus = req.body.todoStatus
    
    try{
        await todo.updateOne({
            _id : todoId
        },
            todoStatus ? { $set :{ completed : false }} : {$set :{ completed : true }}   
        )
        if(todoStatus){
            res.status(200).json({
                msg : "Todo Unmarked"
            })
        }
        else{
            res.status(200).json({
                msg : "Todo Marked"
            })
        }
        
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