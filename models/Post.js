const mongoose = require('mongoose');

//스키마 생성

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now 
    } 
});

/*
mongoose.Schema({
    username: String
})*/

module.exports = mongoose.model('Posts', PostSchema)