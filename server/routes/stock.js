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
  console.log("선형회귀분석 라우터 시작");
  console.log("#### req.body #### ");
  console.log(req.body);

  const code = req.body.code;
  const method = req.body.method;
  const start = req.body.start;
  const end = req.body.end;

  console.log("선형회귀 파이썬 파일 실행 시작");
  const pythonProcess = spawn('python3', ['server/pythons/linear.py', code, method, start, end]);

  let output = '';

  pythonProcess.stdout.on('data', (data) => {
    console.log("data >>> " + data);
    output += data.toString();
    console.log("output >>>" + output)
  });

  pythonProcess.on('close', (code) => {
    console.log("선형회귀 파이썬 파일 실행 종료");
    console.log("Exit code: " + code);

    try {
      const jsonData = JSON.parse(output); // JSON 형식으로 파싱
      console.log("JSON Data:", jsonData);
  
      // 파이썬 프로세스의 결과값을 클라이언트에 응답합니다.
      res.json({ result: jsonData });
    } catch (error) {
      console.log("Error parsing JSON:", error);
      // 오류 발생 시 클라이언트에 오류 응답을 보낼 수 있습니다.
      res.status(500).json({ error: "Error parsing JSON" });
    }
  });
});



module.exports = router;
