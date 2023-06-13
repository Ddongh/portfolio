const mongoose = require('mongoose');

const stockSchema = mongoose.Schema({
    name: {
        type:String,
        maxlength:50
    },
    email: {
        type:String,
        maxlength:50
    },
    image: String,
    gptAnswer: {
        type:String,
        maxlength:99999
    },
    question: {
        type:String,
        maxlength:99999
    }
    
})