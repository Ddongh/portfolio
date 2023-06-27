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
    stock: {
        type:String
    },
    stockName: {
        type:String
    },
    method: {
        type:String
    },
    start: {
        type:String
    },
    end: {
        type:String
    },
    data: {
        type:String
    },
    answer: {
        type:String
    },
    question: {
        type:String
    }
    
})

const User = mongoose.model('Stock', stockSchema);