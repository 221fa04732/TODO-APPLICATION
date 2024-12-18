const express = require('express')
const router = express.Router()
const cors = require('cors')
const {todo} = require('./db')


router.use(cors())
router.use(express.json())


router.put('/delete-todo', async(req, res)=>{
    const todoId = req.body.id;
    
    try{
        await todo.deleteOne({_id : todoId})

        res.status(200).json({
            msg : "Todo Deleted"
        })

    }
    catch(error){
        res.status(400).json({
            msg : "Server Error"
        })
    }
})


module.exports={
    router
}