const express = require('express')
const router = express.Router()
const {User} = require('./db')
const cors = require('cors')

router.use(cors())
router.use(express.json())

router.post('/user', async(req, res)=>{

    const email= req.body.Email
    const password = req.body.Password
    
    try{
        const findUser =await User.find({
            Email : email
        });

        if(findUser.length===0){
            res.status(201).json({
                msg : "Email Not Register"
            })
            return;
        }

        if(findUser.length!=0 && findUser[0].Password != password){
            res.status(201).json({
                msg : "Incorrect Password"
            })
            return;
        }


        res.status(200).json({
            msg : "SignIn Successful",
            id : findUser[0]._id,
            userName : findUser[0].UserName,
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