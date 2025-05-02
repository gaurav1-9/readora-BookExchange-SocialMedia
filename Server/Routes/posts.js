const router = require('express').Router()
const PostSchema = require('../Models/postsSchema')

router.get("/",(req,res)=>{
    res.send("Post Route");
})

//create post
//edit post
//delete post
//like post
//unlike post
//home feed post(by following users)

module.exports = router