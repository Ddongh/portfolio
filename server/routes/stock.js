const express = require('express');
const router = express.Router();


router.get('/stockAnalyze', (req, res) => {
  const responseData = {
    message: 'stockAnalyze hello'
  };
  res.json(responseData);
});

router.post('/stockAnalyze', (req, res) => {
  // POST 요청의 데이터는 req.body에서 가져올 수 있습니다.
  const requestData = req.body;

  // 요청 데이터를 기반으로 분석 작업을 수행하고 결과를 생성합니다.
  const analysisResult = performStockAnalysis(requestData);

  // 분석 결과를 클라이언트에 응답합니다.
  res.json(analysisResult);
});



module.exports = router;
