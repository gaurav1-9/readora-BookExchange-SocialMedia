const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

dotenv.config()
app.use(express.json())
app.use(morgan('tiny'))
app.use(helmet())

app.listen(5000, ()=>console.log("Server running on PORT 5000..."))