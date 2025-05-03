const router = require('express').Router()
const PostSchema = require('../Models/postsSchema')

router.get("/", (req, res) => {
    res.send({
        msg: "Post Route"
    });
})

//create post
router.post("/upload", async (req, res) => {
    try {
        const post = new PostSchema(req.body)
        const userPost = await post.save()
        res.status(200).json({
            err: false,
            msg: "Post uploaded successfully"
        })
        console.log(userPost)
    } catch (err) {
        res.status(500).json({
            err: true,
            msg: "Error uploading post"
        })
    }
})

//edit post
//delete post
router.delete("/:postId/deletePost", async (req, res) => {
    try {
        const postId = await PostSchema.findById(req.params.postId)

        if (!postId) return res.status(400).json({
            err: true,
            msg: "No post found"
        })

        if (postId.userId !== req.body.userId) return res.status(400).json({
            err: true,
            msg: "You can delete only your posts"
        })

        await postId.deleteOne()
        res.status(200).json({
            err: false,
            msg: "Post deleted"
        })
    } catch (err) {
        res.status(500).json({
            err: true,
            msg: "There was an error deleting the post"
        })
    }
})

//like/dislike post
router.put("/:postId/engage", async (req, res) => {
    try {
        const postId = await PostSchema.findById(req.params.postId);
        const userId = req.body.userId
        if (!postId) return res.status(404).json({
            err: true,
            msg: "No post found"
        })

        if (!postId.likes.includes(userId)) {
            postId.likes.push(userId)
            await postId.save()
            return res.status(200).json({
                err: false,
                msg: "Post liked"
            })
        } else {
            postId.likes.pull(userId)
            await postId.save()
            return res.status(200).json({
                err: false,
                msg: "Post disliked"
            })

        }
    } catch (err) {
        res.status(500).json({
            err: true,
            msg: "There was an error, operation aborted"
        })
    }
})

//get all post by user
router.get("/:id/profilePost", async (req, res) => {
    const profileID = req.params.id;
    try {
        const userPosts = await PostSchema.find({ userId: profileID });
        if (!userPosts) return res.status(400).json({
            err: true,
            msg: "No posts uploaded"
        })

        res.status(200).json({
            err: false,
            msg: userPosts,
        })
    } catch (err) {
        res.status(500).json({
            err: true,
            msg: "Error loading post"
        })
    }
})

//home feed post(by following users)

module.exports = router