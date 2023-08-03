const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockCodeNameSchema = mongoose.Schema({
    code: {
        type:String
    },
    name: {
        type:String
    },
}, { timestamps : true }) // true -> 생성날짜와 업데이트 날짜 저장

const StockCodeName = mongoose.model('stockCodeName', stockCodeNameSchema);

module.exports = { StockCodeName }