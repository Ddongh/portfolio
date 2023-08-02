import React, { useState } from "react";
import AnalyzeForm from "./AnalyzeForm";
import AnalyzeResult from "./AnalyzeResult";

function StockAnalyzePage(props) {

	const [state, setState] = useState({ // state 생성
		stock: '',                   	 // 종목코드
		stockName: '',                	 // 종목명
		method: '',                   	 // 분석방법
		start: '',                    	 // 분석 시작일
		end: '',                      	 // 분석종료일
		data: '',                      	 // 크롤링 및 예측 주가 데이터
		ai_answer: "....Loading....", 	 // 해당 종목의 한달간 동향(openAI)
		question: '',                 	 // 사용자가 작성한 질문
	});
	
	const updateState = (key, value, callback) => {   // state 업데이트 함수
		setState(prevState => {                       // state 업데이트 후 동기적으로 callback함수를 처리
			const newState = { ...prevState, [key]: value };
			if (callback) {
				callback(newState);
			}
			return newState;
		});
	};

	return (
		<div className={state.data === "" ? "app" : "app_l"}>
			{state.data === "" ? ( // 서버로 받은 data가 없으면 AnalyzeForm, 있으면 AnalyzeResult 컴포넌트 렌더링
				<AnalyzeForm state={state} updateState={updateState} />
			) : (
				<AnalyzeResult state={state} />
			)}
		</div>
	)
};

export default StockAnalyzePage
