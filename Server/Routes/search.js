const router = require('express').Router()
const userSchema = require('../Models/userSchema')
const PostSchema = require('../Models/postsSchema');

router.get('/users', async (req, res) => {
    const userQuery = req.query.searchText
    try {
        const usersList = await userSchema.find({
            $or: [
                { username: { $regex: userQuery, $options: "i" } },
                { name: { $regex: userQuery, $options: "i" } }
            ]
        })

        res.status(200).json({
            err: false,
            msg: usersList
        })

    } catch {
        res.status(500).json({
            err: true,
            msg: "Couldnt reach server"
        })
    }
})
router.get('/post', async (req, res) => {
    const postQuery = req.query.searchText
    try {
        const postlist = await PostSchema.find({
            $or: [
                { caption: { $regex: postQuery, $options: "i" } },
                { tags: { $regex: postQuery, $options: "i" } }
            ]
        })

        res.status(200).json({
            err: false,
            msg: postlist
        })

    } catch {
        res.status(500).json({
            err: true,
            msg: "Couldnt reach server"
        })
    }
})

module.exports = router