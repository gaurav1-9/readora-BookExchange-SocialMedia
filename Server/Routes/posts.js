const router = require('express').Router()
const PostSchema = require('../Models/postsSchema')

router.get("/", (req, res) => {
    res.send({
        msg: "Post Route"
    });
})

//create post
router.post("/upload", async(req,res)=>{
    try{
        const post = new PostSchema(req.body)
        const userPost = await post.save()
        res.status(200).json({
            err:false,
            msg:"Post uploaded successfully"
        })
        console.log(userPost)
    }catch(err){
        res.status(500).json({
            err:true,
            msg: "Error uploading post"
        })
    }
})

//edit post
//delete post
//like post
//unlike post
//home feed post(by following users)

module.exports = router