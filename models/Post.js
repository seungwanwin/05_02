const mongoose = require('mongoose');

//스키마 생성

const PostSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Posts', PostSchema)