const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const netflixRoute = require('./routes/netflixRoute');

const PORT = 5000;
 
const app = express();

dotenv.config();
app.use(express.json({limit: '30mb'}));
app.use(cors());

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use('/netflix', netflixRoute); //login user

const server = app.listen(PORT, () => {
    console.log(`The server is running at localhost ${PORT}`)
});