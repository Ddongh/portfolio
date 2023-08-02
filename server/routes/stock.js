const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');
const { Stock } = require("../models/Stock");
const iconv = require('iconv-lite');
const os = require('os');


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
  const platform = os.platform();

  console.log("######### 주식 코드/이름 크롤링 라우터 start #######");

  const pythonProcess = spawn('python3', ['server/pythons/stockCodeName.py']); // 크롤링 파이썬 파일 실행

  let output = '';
  
  pythonProcess.stdout.on('data', (data) => { // 파이썬 파일 실행결과 변환
    
    if (platform === 'win32') { // 윈도우 환경이면
      output += iconv.decode(data, 'euc-kr'); // 윈도우 환경에서 한글깨짐(디코딩)
      console.log("platform >>>> ", platform);
    } else if (platform === 'darwin') { // 맥 환경이면
      output += data;
      console.log("platform >>>> ", platform);
    } else { // 기타환경이면
      console.log('현재 환경은 기타 운영체제입니다.');
    }
  });

  pythonProcess.on('close', (code) => { // 파이썬 파일 종료 시 클라이언트에 전달
    res.json(JSON.parse(output)); // 크롤링 데이터 클라이언트에 전달
  });
});


router.post('/stockAnalyze/rnn', (req, res) => {
  console.log("순환신경망 라우터 시작");
  console.log("#### req.body #### ");
  console.log(req.body);

  const code = req.body.code;     // 종목코드
  const method = req.body.method; // 분석방법
  const start = req.body.start;   // 분석 시작일
  const end = req.body.end;       // 분석 종료일

  console.log("순환신경망 파이썬 파일 실행 시작");
  const pythonProcess = spawn('python3', ['server/pythons/rnn.py', code, method, start, end]); // 파이썬파일에 parameter 전달 및 실행

  let output = '';
  let tmp = "";

  pythonProcess.stdout.on('data', (data) => { // 데이터 변환
    output += data.toString();
    // console.log(output)
  });

  pythonProcess.on('close', (code) => { // 파이썬 파일 실행 종료 시 예외 처리 및 변환 후 클라이언트에 전달
    console.log("순환신경망 파이썬 파일 실행 종료");
    console.log("Exit code: " + code);
    console.log("######output start ######")
    console.log(output.indexOf("Failed download")); // 해당 기간동안 데이터가 수집되지 않으면 출력되는 error 코드
    if(output.indexOf("Failed download") > -1) {
      res.status(500).json({ error: output });
      return
    }
    console.log("######output end ######")
    console.log("####################################");
    console.log(output.split("^")[1]);
    console.log("####################################");
    tmp = output.split("^")[1]; // 필요 데이터 추출
    tmp = JSON.parse(tmp)       // json으로 변환

    res.json(tmp); // JSON 데이터를 클라이언트에 전달
  });
});

module.exports = router;
