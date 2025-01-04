const express = require('express')
const router = express.Router()
const {User} = require('./db')
const {userValidation} = require('./type')
const cors = require('cors')

router.use(cors())
router.use(express.json())


router.post('/user', async(req, res)=>{

    const UserName = req.body.UserName
    const Email = req.body.Email
    const Password = req.body.Password

    const validateUser = userValidation.safeParse({
        UserName :UserName,
        Email :Email,
        Password :Password
    })
    if(!validateUser.success){
        res.status(401).json({
            msg : "Invalid Credentials"
        })
        return;
    }
    
    try{

        // too avoid duplicate
        const findUser=await User.findOne({
            Email : Email
        });

        if(findUser){
            res.status(409).json({
                msg : "User already exists"
            })
            return;
        }

        // ceating new-user
        await User.create({
            UserName: UserName,
            Email: Email,
            Password: Password
        })

        res.status(200).json({
            msg : "SignUp Sucessful"
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