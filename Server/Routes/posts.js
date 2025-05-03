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
router.delete("/:postId/deletePost", async(req,res)=>{
    try{
        const postID =await PostSchema.findById(req.params.postId)

        if(!postID) return res.status(400).json({
            err:true,
            msg: "No post found"
        })

        if(postID.userId !== req.body.userId) return res.status(400).json({
            err:true,
            msg: "You can delete only your posts"
        })

        await postID.deleteOne()
        res.status(200).json({
            err:false,
            msg: "Post deleted"
        })
    }catch(err){
        res.status(500).json({
            err:true,
            msg: "There was an error deleting the post"
        })
    }
})

//like/unlike post
//get all post by user
router.get("/:id/profilePost", async(req,res)=>{
    const profileID = req.params.id;
    try{
        const userPosts = await PostSchema.find({userId:profileID});
        if(!userPosts) return res.status(400).json({
            err: true,
            msg: "No posts uploaded"
        })

        res.status(200).json({
            err: false,
            msg: userPosts,
        })
    } catch(err){
        res.status(500).json({
            err: true,
            msg: "Error loading post"
        })
    }
})

//home feed post(by following users)

module.exports = router