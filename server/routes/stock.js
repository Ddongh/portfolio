const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');
const { Stock } = require("../models/Stock");
const { StockCodeName} = require("../models/StockCodeName")
const iconv = require('iconv-lite');
const os = require('os');

router.use(express.json());

router.get('/stockAnalyze', (req, res) => {
	const responseData = {
		message: 'stockAnalyze hello'
	};
	res.json(responseData);
});

router.get('/stockCodeNameUpdate', (req, res) => { // 종목 코드/이름 리스트 update
  
	console.log("##### 주식 코드/이름 업데이트 라우터 START #####");
	const platform = os.platform();

	console.log("##### 주식 코드/이름 크롤링 파이썬 파일 실행 START #####");
	const pythonProcess = spawn('python3', ['server/pythons/stockCodeName.py']); // 크롤링 파이썬 파일 실행

	let output = '';
	
	pythonProcess.stdout.on('data', (data) => { // 파이썬 파일 실행결과 변환
		if (platform === 'win32') {         // 윈도우 환경이면
			output += iconv.decode(data, 'euc-kr'); // 윈도우 환경에서 한글깨짐(디코딩)
			console.log("platform >>>> ", platform);
		} else if (platform === 'darwin') { // 맥 환경이면
			output += data;
			console.log("platform >>>> ", platform);
		} else {                            // 기타환경이면
			console.log('현재 환경은 기타 운영체제입니다.');
		}
  });

	pythonProcess.on('close', (code) => { // 파이썬 파일 종료 시 
			console.log("%%%%% output %%%%%");
			const parsedOutput = JSON.parse(output); // JSON 데이터로 파싱
			console.log(parsedOutput[0]);
			console.log(parsedOutput[0].code)
			console.log(parsedOutput[0].name)
			console.log(typeof(parsedOutput))

			// StockCodeName 스키마로 저장된 모든 데이터 삭제
			StockCodeName.deleteMany({}, (err) => {
				if (err) {
				console.log('Error occurred while deleting data:', err);
				return;
				}
				console.log('All data in StockCodeName collection has been deleted.');
			});

			const stockCodeNameData = Object.values(parsedOutput).map(item => ({ code: item.code, name: item.name }));

			StockCodeName.insertMany(stockCodeNameData, (err, docs) => { // MongoDB에 데이터를 배열 형태로 저장
				if (err) { // 에러 처리
					console.log(err);
					return res.json({ success: false, err });
				}
				return res.status(200).json({ success: true }); // 성공시 클라이언트에 200코드와 success true 전달
			});
	});
});

router.post('/stockAnalyze/question', (req, res) => { // 질문 저장 라우터
	console.log("##### 질문 등록 라우터 START ##### ");
	const stock = new Stock(req.body); // 클라이언트로부터 받아온 데이터를 Stock Model에 담기

	stock.save((err, doc) => { // MongoDB에 저장
		if(err) { // 에러처리
		console.log(err);
		return res.json({success : false, err});
		}
		return res.status(200).json({success : true}) // 성공시 클라이언트에 200코드와 success true 전달
	})
})

router.get('/stockCodeName', (req, res) => { // 종목 코드/이름 리스트 크롤링 라우터
	const start  = parseInt(req.query.start); // 조회할 코드/이름 정보 start index 
    const cnt = parseInt(req.query.cnt); 	  // 조회할 코드/이름 정보 end index 
    console.log("Landing Page Router Start!!!!!");
    console.log("start: ", start); 
    console.log("end : ", cnt); 

    // 페이지네이션 처리를 위해 skip 값과 limit 값 계산

    StockCodeName.find()
        .sort({ name: 1 }) // 이름 기준으로 오름차순 정렬
        .skip(start)
        .limit(cnt)
        .exec((err, codeNames) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success: true, codeNames});
        })
});

// router.get('/stockCodeName', (req, res) => { // 종목 코드/이름 리스트 크롤링 라우터
  
// 	console.log("##### 주식 코드/이름 크롤링 라우터 START #####");
// 	const platform = os.platform();

// 	console.log("##### 주식 코드/이름 크롤링 파이썬 파일 실행 START #####");
// 	const pythonProcess = spawn('python3', ['server/pythons/stockCodeName.py']); // 크롤링 파이썬 파일 실행

// 	let output = '';
	
// 	pythonProcess.stdout.on('data', (data) => { // 파이썬 파일 실행결과 변환
		
// 		if (platform === 'win32') {         // 윈도우 환경이면
// 			output += iconv.decode(data, 'euc-kr'); // 윈도우 환경에서 한글깨짐(디코딩)
// 			console.log("platform >>>> ", platform);
// 		} else if (platform === 'darwin') { // 맥 환경이면
// 			output += data;
// 			console.log("platform >>>> ", platform);
// 		} else {                            // 기타환경이면
// 			console.log('현재 환경은 기타 운영체제입니다.');
// 		}
//   });

//   pythonProcess.on('close', (code) => { // 파이썬 파일 종료 시 
//     	res.json(JSON.parse(output));       // 크롤링 데이터 클라이언트에 전달
//   });
// });


router.post('/stockAnalyze/rnn', (req, res) => { // 순환신경망 분석 및 예측 라우터
	console.log("##### 순환신경망 라우터 START #####");

	const code = req.body.code;     // 종목코드
	const method = req.body.method; // 분석방법
	const start = req.body.start;   // 분석 시작일
	const end = req.body.end;       // 분석 종료일

	console.log("##### 순환신경망 분석 파이썬 파일 실행 START #####");
	const pythonProcess = spawn('python3', ['server/pythons/rnn.py', code, method, start, end]); // 파이썬파일에 parameter 전달 및 실행

	let output = '';
	let tmp = "";

	pythonProcess.stdout.on('data', (data) => { // 파이썬 파일 실행결과 변환
		output += data.toString();
	});

	pythonProcess.on('close', (code) => { // 파이썬 파일 실행 종료 시 예외 처리 및 변환 후 클라이언트에 전달
		if(output.indexOf("Failed download") > -1) { // 에러처리(해당기간동안 주가 데이터가 존재하지 않을때)
			res.status(500).json({ error: output });
		return
		}
		tmp = output.split("^")[1]; // 필요 데이터 추출(파이썬파일에서 미리 구분자로 구분해둠)
		tmp = JSON.parse(tmp)       // json으로 변환
		res.json(tmp); // JSON 데이터를 클라이언트에 전달
	});
});

module.exports = router;
