const express = require('express');
const router = express.Router();

const { Comment } = require("../models/Comment");

router.post("/saveComment", (req, res) => { // 댓글 저장 라우터
    const comment = new Comment(req.body); // 클라이언트로 전달받은 data를 Commen모델에 넣기
    
    comment.save((err, comment) => { // MongoDB에 저장
        Comment.find({'_id' : comment._id}) // 저장한 Comment 찾기
            .populate('writer') //Commet문서의 writer 필드에 해당하는 User 문서 연결
            .exec((err, result) => {
                if(err) return res.json({success : false, err}) // 에러처리
                res.status(200).json({success : true, result}) // 클라이언트에 저장한 Comment data 전달
            })
    })
})


router.get('/getComment', (req, res) => { // 해당 질문에 대한 댓글 리스트 조회 라우터
    const { questionId } = req.query; // 질문 id
    
    Comment.find({ questionId }) // 질문 id에 해당하는 Comment 조회
        .sort({ createdAt: 1 }) // 작성일 기준으로 오름차순 정렬
        .populate('writer')     // Comment 문서의 writer 필드에 해당하는 User 문서 연결
        .exec((err, comments) => {
            if(err) return res.status(400).send(err); // 에러처리
            res.status(200).json({ success: true, comments}); // 클라이언트에 댓글 리스트 전달
        })
});

module.exports = router;
