const router = require('express').Router()
const userSchema = require('../Models/userSchema')
const mongoose = require('mongoose')

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

router.get("/details/following", async (req, res) => {
    try {
        const idsParam = req.query.ids
        if (!idsParam) {
            return res.status(400).json({ message: 'No IDs provided' })
        }
        const idsArray = idsParam.split(',').map(id => id.trim())

        const users = await userSchema.find({ _id: { $in: idsArray } }).select('_id username name')

        res.json(users)
    } catch (err) {
        console.error('Error fetching users by IDs:', err)
        res.status(500).json({ message: 'Server error' })
    }
});

//update
router.put("/:id", async (req, res) => {
    const userIdUpdate = req.params.id
    const currentUserIdUpdate = req.body.id

    if (userIdUpdate !== currentUserIdUpdate) return res.status(403).json({
        err: true,
        msg: "You can edit only your account"
    })

    try {
        const updatedUser = await userSchema.findByIdAndUpdate(
            userIdUpdate,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        const { password, __v, ...userWithoutSensitiveData } = updatedUser._doc;

        res.status(200).json({
            err: false,
            msg: "User updated successfully",
            user: userWithoutSensitiveData,
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            msg: "Update failed",
        });
    }
})

//follow user
router.put("/:id/follow", async (req, res) => {
    const currentUserID = req.body.id;
    const targetUserID = req.params.id;

    if (currentUserID === targetUserID) return res.status(400).json({
        err: true,
        msg: "Cannot follow yourself",
    })

    try {
        const currentUser = await userSchema.findById(currentUserID)
        const targetUser = await userSchema.findById(targetUserID)

        if (!currentUser || !targetUser)
            return res.status(404).json({
                err: true,
                msg: "No user found",
            })

        if (targetUser.followers.includes(currentUser._id)) {
            return res.status(400).json({
                err: true,
                msg: "You already follow this user",
            })
        } else {
            currentUser.followings.push(targetUser._id);
            targetUser.followers.push(currentUser._id);

            await targetUser.save()
            await currentUser.save()

            res.status(200).json({
                err: false,
                msg: `${targetUser.username} followed`
            })
        }

    } catch (err) {
        res.status(500).json({
            err: true,
            msg: "There was an error"
        });
    }
})

//unfollow user
router.put("/:id/unfollow", async (req, res) => {
    const currentUserID = req.body.id;
    const targetUserID = req.params.id;

    if (currentUserID === targetUserID) return res.status(400).json({
        err: true,
        msg: "Cannot unfollow yourself",
    })

    try {
        const currentUser = await userSchema.findById(currentUserID)
        const targetUser = await userSchema.findById(targetUserID)

        if (!currentUser || !targetUser)
            return res.status(404).json({
                err: true,
                msg: "No user found",
            })

        if (!targetUser.followers.includes(currentUser._id)) {
            return res.status(400).json({
                err: true,
                msg: "You do not follow this user",
            })
        } else {
            currentUser.followings.pull(targetUser._id);
            targetUser.followers.pull(currentUser._id);

            await targetUser.save()
            await currentUser.save()

            res.status(200).json({
                err: false,
                msg: `${targetUser.username} unfollowed`
            })
        }

    } catch (err) {
        res.status(500).json({
            err: true,
            msg: "There was an error"
        });
    }
})


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