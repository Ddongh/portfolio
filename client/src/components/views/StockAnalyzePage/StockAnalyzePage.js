import  React, { useState } from "react";
import AnalyzeForm from "./AnalyzeForm";
import CandleStickChart from "./CandleStickChart";
import StockOpenAI from "./StockOpenAI";
import StockQuestion from "./StockQuetion";
import StockInfo from "./StockInfo";

function StockAnalyzePage(props) {

  const [state, setState] = useState({
    stock: '',
    stockName: '',
    method: '',
    start: '',
    end: '',
    data: '',
    question: '',
    answer: "....Loading....",
  });

  const updateState = (key, value) => {
    setState(prevState => ({ ...prevState, [key]: value }));
  };

  if(state.data == "") {
    return (
      <div className="app">
          <AnalyzeForm
          state={state}
          updateState={updateState}
          />
          {/* <StockQuestion 
            state={state}
            updateState={updateState}
          /> */}
          {/* <StockInfo /> */}
      </div>
    );
  } else {
    return (
      <div className="app">
        <h1>{state.stockName} 분석결과</h1>
        <CandleStickChart 
        data={state.data.data} 
        stockName={state.stockName}  
        />
        <StockInfo 
        state={state}
        />
        <StockOpenAI 
        stockName={state.stockName} 
        answer={state.answer} 
        />

        <StockQuestion 
        state={state}
        updateState={updateState}
        />
      </div>
      
    )
  }
};

export default StockAnalyzePage
