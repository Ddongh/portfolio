const express = require('express');
const router = express.Router();
const { Stock } = require("../models/Stock");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

router.get('/total', (req, res) => {
    Stock.countDocuments({}, (err, totalCount) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({ totalCount });
    });
});

router.get('/', (req, res) => {
    const page  = parseInt(req.query.page); // pageNumber 
    const perPage = parseInt(req.query.perPage); // 페이지당 출력된 문서 개수
    console.log("Landing Page Router Start!!!!!");
    console.log(req.query.page); // 클라이언트에서 보낸 page 값 출력
    console.log(req.query.perPage); // 클라이언트에서 보낸 perPage 값 출력

    // 페이지네이션 처리를 위해 skip 값과 limit 값 계산
    const skip = (page - 1) * perPage;
    const limit = perPage;

    Stock.find()
        .sort({ createdAt: -1 }) // 작성일 기준으로 내림차순 정렬
        .skip(skip)
        .limit(limit)
        .populate('writer') // Stock 문서의 writer 필드에 해당하는 User 문서 연결
        .exec((err, questions) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success: true, questions});
        })
});

router.get('/getQuestion', (req, res) => { 
    console.log('getQuestino Start !!!!!!!!!!!!!!!!')
    const { questionId } = req.query; // 질문 id
    console.log("questionId >>> ", questionId);
    const questionObjectId = ObjectId(questionId);
    
    Stock.find({ _id: questionObjectId })
        .populate('writer') // Stock 문서의 writer 필드에 해당하는 User 문서 연결
        .exec((err, questions) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success: true, questions});
        })
});

module.exports = router;