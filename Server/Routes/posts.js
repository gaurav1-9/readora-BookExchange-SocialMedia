const router = require('express').Router()
const PostSchema = require('../Models/postsSchema');
const UserSchema = require('../Models/userSchema');

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
router.put("/:postId/edit", async (req, res) => {
    try {
        const post = await PostSchema.findById(req.params.postId)
        const user = await UserSchema.findById(req.body.userId)

        if (!post) return res.status(404).json({
            err: true,
            msg: "No post found"
        })
        if (!user) return res.status(404).json({
            err: true,
            msg: "No user found"
        })

        if (post.userId !== user._id.toString()) return res.status(403).json({
            err: true,
            msg: "You can edit only your posts"
        })

        const { caption, img, tags } = req.body
        if (caption) post.caption = caption
        if (img) post.img = img
        if (tags) post.tags = tags

        await post.save()
        res.status(200).json({
            err: false,
            msg: "Post updated sucessully", post
        })
    } catch (err) {
        res.status(500).json({
            err: true,
            msg: "Could'nt edit post; Server Error"
        })
    }
})

//delete post
router.delete("/:postId/deletePost", async (req, res) => {
    try {
        const postId = await PostSchema.findById(req.params.postId)
        const validUser = await UserSchema.findById(req.body.userId)

        if (!validUser) return res.status(404).json({
            err: true,
            msg: "No user found"
        })
        if (!postId) return res.status(404).json({
            err: true,
            msg: "No post found"
        })

        if (postId.userId !== validUser._id.toString()) return res.status(400).json({
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
        const userId = await UserSchema.findById(req.body.userId)

        if (!userId) return res.status(404).json({
            err: true,
            msg: "No user found"
        })
        if (!postId) return res.status(404).json({
            err: true,
            msg: "No post found"
        })

        if (!postId.likes.includes(userId._id.toString())) {
            postId.likes.push(userId._id.toString())
            await postId.save()
            return res.status(200).json({
                err: false,
                msg: "Post liked"
            })
        } else {
            postId.likes.pull(userId._id.toString())
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
router.get("/:userId/timeline", async (req, res) => {
    try {
        const currentUser = await UserSchema.findById(req.params.userId)

        if(!currentUser) return res.status(404).json({
            err: true,
            msg: "No user found"
        })

        const feedPost = await Promise.all(
            currentUser.followings.map(followedUser =>(
                PostSchema.find({userId: followedUser})
            ))
        );
        const timelinePost = [].concat(...feedPost).sort((a, b) => b.createdAt - a.createdAt)
        res.status(200).json({
            err:false,
            msg: timelinePost
        })

    } catch (err) {
        res.status(500).json({
            err: true,
            msg: "Could'nt load feed"
        })
    }
})

module.exports = router