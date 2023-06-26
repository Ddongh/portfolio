import  React, { useState } from "react";
import AnalyzeForm from "./AnalyzeForm";
import CandleStickChart from "./CandleStickChart";
import StockOpenAI from "./StockOpenAI";
import StockQuestion from "./StockQuetion";

function StockAnalyzePage(props) {

  const [state, setState] = useState({
    stock: '',
    stockName: '',
    method: '',
    start: '',
    end: '',
    data: '',
    answer: "....Loading....",
    question: '',
  });

  const updateState = (key, value, callback) => {
    setState(prevState => {
      const newState = { ...prevState, [key]: value };
      if (callback) {
        callback(newState);
      }
      return newState;
    });
  };

  if(state.data == "") {
    return (
      <div className="app">
          <AnalyzeForm
          state={state}
          updateState={updateState}
          />
          {/* <StockQuestion /> */}
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
