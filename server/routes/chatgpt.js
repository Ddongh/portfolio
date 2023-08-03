const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');
const config = require("../config/key");

const OPENAI_API_KEY = config.OPENAI_API_KEY; // OpenAi API 키

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
		try { // JSON 형식으로 파싱하여 답변 가져오기
			answer = JSON.parse(output).answer;
		} catch (error) { // 에러처리
			answer = 'OpenAI로부터 답변은 받기 실패했습니다.';
		}

		res.send({ answer }); // 답변 또는 에러을 클라이언트에 전달
	});
});

module.exports = router;
