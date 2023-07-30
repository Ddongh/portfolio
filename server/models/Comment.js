const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
    writer : {
        type: Schema.Types.ObjectId, //
        ref : 'User'
    },
    questionId : {
        type: Schema.Types.ObjectId, //
        ref : 'Stock'
    },
    responseId : {
        type: Schema.Types.ObjectId, //
        ref : 'User'
    },
    content : {
        type: String,
    }
 
}, { timestamps : true }) // true -> 생성날짜와 업데이트 날짜 저장

const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment }