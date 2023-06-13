import  React, { useState } from "react";
import AnalyzeForm from "./AnalyzeForm";
import CandleStickChart from "./CandleStickChart";
import StockOpenAI from "./StockOpenAI";

function StockAnalyzePage(props) {

  const [state, setState] = useState({
    stock: '',
    stockName: '',
    method: '',
    start: '',
    end: '',
    data: '',
    // question: '',
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
      </div>
    );
  } else {
    return (
      <div className="app">
        <h1>{state.stockName} 분석결과</h1>
        <CandleStickChart data={state.data.data} stockName={state.stockName}  />
        
        <StockOpenAI stockName={state.stockName} answer={state.answer} />
      </div>
      
    )
  }
};

export default StockAnalyzePage
