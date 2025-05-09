const router = require('express').Router()
const UserSchema = require('../Models/userSchema')

router.post("/register", async (req, res) => {
    const { name, username, email, password } = req.body;
    try {
        const newUser = new UserSchema({ name, username, email, password, })
        const savedUser = await newUser.save();
        res.status(200).json({
            err: false,
            msg: "user registered successfully"
        })
        console.log(savedUser);
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            res.status(400).json({
                err: true,
                msg: messages
            });
        } else if (err.code === 11000) {
            res.status(400).json({
                err: true,
                msg: 'Username or email already exists'
            });
        } else {
            res.status(500).json({
                err: true,
                msg: 'Server error'
            });
        }
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await UserSchema.findOne({ username });
        if (!user) return res.status(400).json({
            isValidated: false,
            err: false,
            msg: "Invalid username or password",
        })
        if (user.password !== password) return res.status(400).json({
            isValidated: false,
            err: false,
            msg: "Incorrect password",
        })

        //saving user session
        req.session.user = user._id.toString()
        console.log("Session after login:", req.session)
        res.status(200).json({
            isValidated: true,
            err: false,
            msg: "Login Succesfull",
            user: user
        })
    } catch (err) {
        res.status(500).json({
            err: true,
            msg: "Internal Server Error"
        })
    }
})

router.get('/session', (req, res) => {
    if (req.session.user) {
        res.json({
            user: req.session.user,
            sessionId: req.sessionID // send this only for debugging
        })
    } else {
        res.status(401).json({ message: 'Not authenticated' })
    }
})

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Logout error:', err)
            return res.status(500).json({ err: true, msg: 'Logout failed' })
        }
        res.clearCookie('connect.sid')
        res.status(200).json({ err: false, msg: 'Logged out successfully' })
    })
})

router.get("/me", (req, res) => {
    if (req.session.user) {
      return res.status(200).json({ user: req.session.user })
    }
    res.status(401).json({ msg: "Unauthorized" })
  })
  


module.exports = router