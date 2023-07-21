const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');
const { Stock } = require("../models/Stock");
const iconv = require('iconv-lite');

router.use(express.json());

router.get('/stockAnalyze', (req, res) => {
  const responseData = {
    message: 'stockAnalyze hello'
  };
  res.json(responseData);
});

router.post('/stockAnalyze/question', (req, res) => {
  console.log("게시물 등록 라우터!!!!!!!!!!!!!!!!!!!!");
  console.log("req.body >>> " + req.body);
  const stock = new Stock(req.body);

  stock.save((err, doc) => {
    if(err) {
      console.log(err);
      return res.json({success : false, err});
    }
    return res.status(200).json({success : true})
  })
})

router.get('/stockCodeName', (req, res) => {
  console.log("주식 코드/이름 크롤링");
  const pythonProcess = spawn('python3', ['server/pythons/stockCodeName.py']);

  let output = '';
  
  pythonProcess.stdout.on('data', (data) => {
    // output += data;
    output += iconv.decode(data, 'euc-kr'); // 한글깨짐 (디코딩)
  });

  pythonProcess.on('close', (code) => {
    console.log("######output start ######");
    console.log(output);
    console.log("######output end ######");
    const validJSON = output.replace(/'/g, '"');
    
    res.json(JSON.parse(validJSON));
  });
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
    console.log("######output start ######")
    console.log(output)
    console.log("######output end ######")
    // let tmp = output.split("^")
    console.log("####################################");
    console.log(output.split("^")[1]);
    console.log("####################################");
    tmp = output.split("^")[1];
    tmp = JSON.parse(tmp)

    res.json(tmp); // JSON 데이터를 클라이언트에 전달
  });
});


module.exports = router;
