const express = require('express');
const router = express.Router();

const { Comment } = require("../models/Comment");

router.post("/saveComment", (req, res) => {
    const comment = new Comment(req.body);
    
    comment.save((err, comment) => {
        if(err) return res.json({success : false, err})
        
        Comment.find({'_id' : comment._id})
            .populate('writer')
            .exec((err, result) => {
                if(err) return res.json({success : false, err})
                res.status(200).json({success : true, result})
            })
    })
})


router.get('/getComment', (req, res) => {
    console.log(req.query.questionId);
    console.log("1111111111")

    const { questionId } = req.query;
    
    Comment.find({ questionId })
        .sort({ createdAt: 1 }) // 작성일 기준으로 오름차순 정렬
        .populate('writer') // Stock 문서의 writer 필드에 해당하는 User 문서 연결
        .exec((err, comments) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success: true, comments});
        })
});

module.exports = router;
