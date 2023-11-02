const mongoose = require('mongoose')

const netflixDataSchema = mongoose.Schema({
    _id:   mongoose.Schema.Types.ObjectId,
    email: { type: String },
    movie_id: { type: String },
    timeStamp: { type: Number }
}, { timestamps: { createdAt: 'created_at' }});

const NetflixData = mongoose.model('netflix_data', netflixDataSchema);

module.exports = NetflixData;