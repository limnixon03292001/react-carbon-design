const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

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

app.use('/netflix', netflixRoute);

if(process.env.NODE_ENV === "production") {
    // app.use(express.static(path.join(__dirname, "client/build")));

    app.use(express.static("client/build"));
    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    })
}

const server = app.listen(PORT, () => {
    console.log(`The server is running.`)
});