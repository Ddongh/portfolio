const express = require('express');
const router = express.Router();
const { Stock } = require("../models/Stock");

router.get('/', (req, res) => {
    console.log("Landing Page Router Start!!!!!");
    // const responseData = {
    //   message: 'Landing Page Router!!!!!'
    // };
    // res.json(responseData);
    Stock.find()
        .populate('writer')
        .exec((err, questions) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success: true, questions});
        })
});

module.exports = router;