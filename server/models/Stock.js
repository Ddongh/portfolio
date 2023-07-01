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
    data: [
        {
          date: { type: String },
          Open: { type: String },
          High: { type: String },
          Low: { type: String },
          Close: { type: String },
          Adj_Close: { type: String },
          Volume: { type: String },
        },
      ],
    answer: {
        type:String
    },
    question: {
        type:String
    }
    
})

const Stock = mongoose.model('Stock', stockSchema);

module.exports = { Stock }