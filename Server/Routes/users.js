const router = require('express').Router()
const userSchema = require('../Models/userSchema')

router.get("/", (req, res) => {
    res.send({
        msg: "user route"
    })
})

// get profile
router.get("/:id", async (req, res) => {
    try {
        const user = await userSchema.findById(req.params.id).select("-password -__v");
        res.status(200).json({
            err: false,
            msg: user,
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            msg: "No user found",
        });
    }
});

//update
//follow user
//unfollow user

//show followers
router.get("/:id/followers", async (req, res) => {
    try {
        const user = await userSchema.findById(req.params.id);
        const followersList = user.followers
        res.status(200).json({
            err: false,
            msg: followersList,
        })
    } catch (err) {
        res.status(404).json({
            err: true,
            msg: "Invalid User ID given"
        })
    }
})

//show followings
router.get("/:id/followings", async (req, res) => {
    try {
        const user = await userSchema.findById(req.params.id);
        const followingList = user.followings
        res.status(200).json({
            err: false,
            msg: followingList,
        })
    } catch (err) {
        res.status(404).json({
            err: true,
            msg: "Invalid User ID given"
        })
    }
})

module.exports = router