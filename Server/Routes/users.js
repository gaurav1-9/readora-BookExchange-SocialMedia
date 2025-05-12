const router = require('express').Router();
const userSchema = require('../Models/userSchema');
const mongoose = require('mongoose');

// Get profile (no sensitive data like password)
router.get("/:id", async (req, res) => {
    try {
        const user = await userSchema.findById(req.params.id).select("-password -__v");
        if (!user) {
            return res.status(404).json({
                err: true,
                msg: "User not found"
            });
        }
        res.status(200).json({
            err: false,
            msg: user
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            msg: "Server error"
        });
    }
});

// Show details of followed users (Bulk fetch)
router.get("/details/following", async (req, res) => {
    try {
        const idsParam = req.query.ids;
        if (!idsParam) {
            return res.status(400).json({ message: 'No IDs provided' });
        }
        const idsArray = idsParam.split(',').map(id => id.trim());
        const users = await userSchema.find({ _id: { $in: idsArray } }).select('_id username name');
        res.json(users);
    } catch (err) {
        console.error('Error fetching users by IDs:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Toggle follow/unfollow state
router.post('/toggle-follow', async (req, res) => {
    const { userId, targetUserId } = req.body;

    try {
        const user = await userSchema.findById(userId);
        if (!user) return res.status(404).json({ msg: "User not found" });

        const targetUser = await userSchema.findById(targetUserId);
        if (!targetUser) return res.status(404).json({ msg: "Target user not found" });

        if (user.followings.includes(targetUserId)) {
            user.followings.pull(targetUserId);
        } else {
            user.followings.push(targetUserId);
        }

        await user.save();
        res.status(200).json({ msg: 'Follow state updated.' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update follow state' });
    }
});

// Update user profile (only the current user can edit their own profile)
router.put("/:id", async (req, res) => {
    const userIdUpdate = req.params.id;
    const currentUserIdUpdate = req.body.id;

    if (userIdUpdate !== currentUserIdUpdate) return res.status(403).json({
        err: true,
        msg: "You can edit only your own account"
    });

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
});

// Follow a user
router.put("/:id/follow", async (req, res) => {
    const currentUserID = req.body.id;
    const targetUserID = req.params.id;

    if (currentUserID === targetUserID) return res.status(400).json({
        err: true,
        msg: "Cannot follow yourself",
    });

    try {
        const currentUser = await userSchema.findById(currentUserID);
        const targetUser = await userSchema.findById(targetUserID);

        if (!currentUser || !targetUser)
            return res.status(404).json({
                err: true,
                msg: "No user found",
            });

        if (currentUser.followings.includes(targetUserID)) {
            return res.status(400).json({
                err: true,
                msg: "You already follow this user",
            });
        } else {
            currentUser.followings.push(targetUserID);
            targetUser.followers.push(currentUserID);

            await targetUser.save();
            await currentUser.save();

            res.status(200).json({
                err: false,
                msg: `${targetUser.username} followed`,
            });
        }

    } catch (err) {
        res.status(500).json({
            err: true,
            msg: "There was an error"
        });
    }
});

// Unfollow a user
router.put("/:id/unfollow", async (req, res) => {
    const currentUserID = req.body.id;
    const targetUserID = req.params.id;

    if (currentUserID === targetUserID) return res.status(400).json({
        err: true,
        msg: "Cannot unfollow yourself",
    });

    try {
        const currentUser = await userSchema.findById(currentUserID);
        const targetUser = await userSchema.findById(targetUserID);

        if (!currentUser || !targetUser)
            return res.status(404).json({
                err: true,
                msg: "No user found",
            });

        if (!currentUser.followings.includes(targetUserID)) {
            return res.status(400).json({
                err: true,
                msg: "You do not follow this user",
            });
        } else {
            currentUser.followings.pull(targetUserID);
            targetUser.followers.pull(currentUserID);

            await targetUser.save();
            await currentUser.save();

            res.status(200).json({
                err: false,
                msg: `${targetUser.username} unfollowed`,
            });
        }

    } catch (err) {
        res.status(500).json({
            err: true,
            msg: "There was an error"
        });
    }
});

// Show followers
router.get("/:id/followers", async (req, res) => {
    try {
        const user = await userSchema.findById(req.params.id);
        if (!user) return res.status(404).json({ err: true, msg: "User not found" });

        res.status(200).json({
            err: false,
            msg: user.followers,
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            msg: "Server error"
        });
    }
});

// Show followings
router.get("/:id/followings", async (req, res) => {
    try {
        const user = await userSchema.findById(req.params.id);
        if (!user) return res.status(404).json({ err: true, msg: "User not found" });

        res.status(200).json({
            err: false,
            msg: user.followings,
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            msg: "Server error"
        });
    }
});

module.exports = router;
