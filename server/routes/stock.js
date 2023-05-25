const express = require('express');
const router = express.Router();


router.get('/stockAnalyze', (req, res) => {
  const responseData = {
    message: 'stockAnalyze hello'
  };
  res.json(responseData);
});

router.post('/stockAnalyze/linear', (req, res) => {
  // POST 요청의 데이터는 req.body에서 가져올 수 있습니다.
  console.log(req.body);
  const code = req.body.code;
  const method = req.body.method;
  const start = req.body.start;
  const end = req.body.start
  
  res.json({message : "선형회귀분석 posr"});
});



module.exports = router;
