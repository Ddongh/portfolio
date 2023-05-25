const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');


router.get('/stockAnalyze', (req, res) => {
  const responseData = {
    message: 'stockAnalyze hello'
  };
  res.json(responseData);
});

router.post('/stockAnalyze/linear', (req, res) => {
  // POST 요청의 데이터는 req.body에서 가져올 수 있습니다.
  // console.log(req.body);
  console.log("선형회귀분석 라우터 시작")
  console.log("#### req.body #### ")
  console.log(req.body)
  const code = req.body.code;
  const method = req.body.method;
  const start = req.body.start;
  const end = req.body.end
  
  const pythonProcess = spawn('python3', ['server/pythons/linear.py', code, method, start, end]);
  
  pythonProcess.stdout.on('data', (data) => {
    const output = data.toString();
    console.log(output);

    // 파이썬 프로세스의 결과값을 클라이언트에 응답합니다.
    res.json({ result: output });
  });

  // res.json({message : "선형회귀분석 posr"});
});



module.exports = router;
