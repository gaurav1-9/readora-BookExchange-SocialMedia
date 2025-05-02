const router = require('express').Router()
const UserSchema = require('../Models/userSchema')

router.get("/", (req, res) => {
    res.send('auth route');
})

router.post("/register", async (req, res) => {
    const { name, username, email, password } = req.body;
    try {
        const newUser = new UserSchema({ name, username, email, password, })
        const savedUser = await newUser.save();
        res.status(200).json({err:false,msg:"user saved successfully"})
        console.log(savedUser);
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            res.status(400).json({ err:true,msg: messages });
          } else if (err.code === 11000) {
            res.status(400).json({ err:true,msg: 'Username or email already exists' });
          } else {
            res.status(500).json({ err:true,msg: 'Server error' });
          }
    }
})

module.exports = router