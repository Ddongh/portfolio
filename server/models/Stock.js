const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockSchema = mongoose.Schema({
    writer : {
        type: Schema.Types.ObjectId, //User.js - userSchema의 모든 정보를 가져온다
        ref : 'User'
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
    
}, { timestamps : true }) // true -> 생성날짜와 업데이트 날짜 저장

const Stock = mongoose.model('Stock', stockSchema);

module.exports = { Stock }