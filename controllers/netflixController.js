const mongoose = require('mongoose');
const NetflixData = require('../models/ENetflix_data.js');
const MyListData = require('../models/Mylist_data');

exports.saveTimeStamp = async (req,res) => {
    const { email, movieId, timestamp } = req.body;

    try{
        const movie = await NetflixData.findOne({movie_id: movieId, email: email});
        console.log(movie)
        if(movie === null) {
            const data = await new NetflixData({
                _id: new mongoose.Types.ObjectId(),
                email: email,
                movie_id: movieId,
                timeStamp: timestamp
            });

            await data.save();
            return res.status(200).json("successfully saved!");
        }else {
            const x = await NetflixData.findByIdAndUpdate({_id: movie?._id, email: email }, { timeStamp: timestamp })
            return res.status(201).json("successfully updated!");
        }
       
    }catch(err){
        console.log(err);
        return res.status(400).json(err)
    }
};

exports.getSaveTimeStamp = async (req,res) => {
    const { movieId, email } = req.query;
   
    try{
        const movie = await NetflixData.findOne({movie_id: movieId, email: email});
        console.log(movie)
        if(movie !== null) {
            return res.status(201).json({timeStamp: movie?.timeStamp});
        } else {
            return res.status(201).json({timeStamp: 0});
        }
       
    }catch(err){
        console.log(err);
        return res.status(400).json(err)
    }
};

exports.saveMyList = async (req,res) => {
    const { email, movieId, movieName, movieTitle, movieOverview, moviePoster, movieBackdrop, movieAverage, type } = req.body?.data;
    console.log(req.body)
    try {
        const movie = await MyListData.findOne({ movie_id: movieId, email: email });
        console.log("Found?", movie)
        if(movie === null) {
            const data = await new MyListData({
                _id: new mongoose.Types.ObjectId(),
                email: email,
                movie_id: movieId,
                movie_name: movieName,
                movie_overview: movieOverview,
                movie_title: movieTitle,
                movie_poster: moviePoster,
                movie_backdrop: movieBackdrop,
                movie_average: movieAverage,
                type: type
            });
            await data.save();
            return res.status(201).json("Successfully added to your list!");
        }else {
            console.log("Already added to the list!")
            return res.status(200).json("Already Added to the List!");
        }
    }catch(err){
        console.log(err);
        return res.status(400).json(err)
    }
};

exports.getSaveList = async (req,res) => {
    const { email } = req.query;
   
    try{
        const movie = await MyListData.find({ email: email });
 
        if(movie !== null) {
            return res.status(200).json(movie);
        } else {
            return res.status(201).json('No List Found!');
        }
       
    }catch(err){
        console.log(err);
        res.status(400).json(err)
    }
};

exports.checkIfListed = async (req,res) => {
    const { email, movieId } = req.query;
   
    try{
        const movie = await MyListData.findOne({ movie_id: movieId, email: email });
 
        if(movie !== null) {
            //return true if listed
            return res.status(200).json(true);
        } else {
            //return false if not listed
            return res.status(200).json(false);
        }
       
    }catch(err){
        console.log(err);
        res.status(400).json(err)
    }
};

exports.deleteFromList = async (req,res) => {
    const { email, movieId } = req.body;
    try{
        await MyListData.findOneAndDelete ({ movie_id: movieId, email: email });
        res.status(200).json({msg: "Removed from the List!"});
    }catch(err){
        console.log(err);
        res.status(400).json(err)
    }
};