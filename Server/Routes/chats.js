const router = require('express').Router()
const UserSchema = require('../Models/userSchema');

router.get("/", (req,res)=>{
    res.status(200).json({
        msg: "Chat Route"
    })
})

//create a chat
//get all chats
//send a msg
//get all chat msgs

module.exports = router