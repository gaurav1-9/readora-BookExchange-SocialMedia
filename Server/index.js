const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const cors = require('cors');

const authRoute = require('./Routes/auth')
const userRoute = require('./Routes/users')
const postRoute = require('./Routes/posts')
const chatRoute = require('./Routes/chats')

dotenv.config()

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60,
    }
}));

app.use(express.json())
app.use(morgan('tiny'))
app.use(helmet())

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/chats", chatRoute)

app.listen(5000, () => console.log("Server running on PORT 5000..."))