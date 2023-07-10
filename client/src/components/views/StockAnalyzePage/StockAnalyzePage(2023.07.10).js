import React, { useState } from "react";
import AnalyzeForm from "./AnalyzeForm";
import CandleStickChart from "./CandleStickChart";
import StockOpenAI from "./StockOpenAI";
import StockQuestion from "./StockQuetion";
import StockInfo from "./StockInfo";

function StockAnalyzePage(props) {

  const [state, setState] = useState({ // state 생성
    stock: '', // 종목코드
    stockName: '', // 종목명
    method: '', // 분석방법
    start: '', // 분석 시작일
    end: '', // 분석종료일
    data: '', // 크롤링 및 예측 주가 데이터
    ai_answer: "....Loading....", // 해당 종목의 한달간 동향(openAI)
    question: '', // 사용자가 작성한 질문
  });
  
  const updateState = (key, value, callback) => { // state 업데이트 함수
    setState(prevState => {                       // state 업데이트 후 동기적으로 callback함수를 처리
      const newState = { ...prevState, [key]: value };
      if (callback) {
        callback(newState);
      }
      return newState;
    });
  };

  if(state.data == "") { // 주식 분석 결과가 없으면 종목, 분석 방법 등을 선택하는 컴포넌트
    return (
      <div className="app">
          <AnalyzeForm
          state={state}
          updateState={updateState}
          />
      </div>
    );
  } else { // 분석 결과값이 존재하면 
    return (
      <div className="app">
        <h1>{state.stockName} 분석결과</h1>
        <CandleStickChart // 분석 및 예측 결과 차트 컴포넌트
        data={state.data.data} 
        stockName={state.stockName}  
        />
        
        <StockInfo state={state} // 주식 정보 테이블 컴포넌트
        /> 

        <StockOpenAI // openAI로 처리한 해당 종목의 최근 한달간 주식 동향 컴포넌트
        stockName={state.stockName} 
        ai_answer={state.ai_answer} 
        />

        <StockQuestion // 질문작성 및 등록 컴포넌트
        state={state}
        updateState={updateState}
        />
      </div>
      
    )
  }
};

export default StockAnalyzePage
