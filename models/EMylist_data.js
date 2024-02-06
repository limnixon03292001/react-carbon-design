const mongoose = require('mongoose')

const myListDataSchema = mongoose.Schema({
    _id:   mongoose.Schema.Types.ObjectId,
    email: { type: String },
    movie_id: { type: String },
    movie_name: { type: String },
    movie_title: { type: String },
    movie_overview: { type: String },
    movie_poster: { type: String },
    movie_backdrop: { type: String },
    type: { type: String },
    movie_average: { type: String },
}, {timestamps: { createdAt: 'created_at' }});

const MyListData = mongoose.model('myList_data', myListDataSchema);

module.exports = MyListData;