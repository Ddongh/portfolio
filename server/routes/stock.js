const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');

router.use(express.json());

router.get('/stockAnalyze', (req, res) => {
  const responseData = {
    message: 'stockAnalyze hello'
  };
  res.json(responseData);
});

router.post('/stockAnalyze/rnn', (req, res) => {
  console.log("순환신경망 라우터 시작");
  console.log("#### req.body #### ");
  console.log(req.body);

  const code = req.body.code;
  const method = req.body.method;
  const start = req.body.start;
  const end = req.body.end;

  console.log("순환신경망 파이썬 파일 실행 시작");
  const pythonProcess = spawn('python3', ['server/pythons/rnn.py', code, method, start, end]);

  let output = '';
  let tmp = "";

  pythonProcess.stdout.on('data', (data) => {
    output += data.toString();
    // console.log(output)
  });

  pythonProcess.on('close', (code) => {
    console.log("순환신경망 파이썬 파일 실행 종료");
    console.log("Exit code: " + code);
    // console.log(output)
    // let tmp = output.split("^")
    console.log("####################################");
    console.log(output.split("^")[1]);
    console.log("####################################");
    tmp = output.split("^")[1];
    tmp = JSON.parse(tmp)

    res.json(tmp); // JSON 데이터를 클라이언트에 전달
  });
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
    output += data.toString();
  });

  pythonProcess.on('close', (code) => {
    console.log("선형회귀 파이썬 파일 실행 종료");
    console.log("Exit code: " + code);
    try {

      const jsonData = JSON.parse(output); // JSON 형식으로 파싱
      res.json({ result: jsonData });
    } catch (error) {
      console.log("Error parsing JSON:", error);
      res.status(500).json({ error: "Error parsing JSON" });
    }
  });
});

module.exports = router;
