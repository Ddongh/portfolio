const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');
const config = require("../config/key");

const OPENAI_API_KEY = config.OPENAI_API_KEY;
console.log("OPENAI_API_KEY >>> " + OPENAI_API_KEY)
router.use(express.json());

router.post('/', (req, res) => {
  console.log("Chat 라우터 시작");
  console.log("#### req.body #### ");
  console.log(req.body);

  const question = req.body.question; // 클라이언트에서 받은 질문
  console.log("question >>> " + question)
  console.log("ChatGPT 파이썬 파일 실행 시작");
  const pythonProcess = spawn('python3', ['server/pythons/chatgpt.py', question, OPENAI_API_KEY]);

  let output = '';

  pythonProcess.stdout.on('data', (data) => {
    output += data.toString();
  });

  pythonProcess.on('close', (code) => {
    console.log("ChatGPT 파이썬 파일 실행 종료");
    console.log("Exit code: " + code);
    console.log("####################################");
    console.log(output);
    console.log("####################################");

    let answer;
    try {
      // JSON 형식으로 파싱하여 답변 가져오기
      answer = JSON.parse(output).answer;
      // answer = JSON.parse(output)
    } catch (error) {
      console.error('An error occurred while parsing the answer:', error);
      answer = 'An error occurred while processing the request.';
    }

    res.send({ answer }); // 답변을 클라이언트에 JSON 형식으로 전달
  });
});

module.exports = router;
