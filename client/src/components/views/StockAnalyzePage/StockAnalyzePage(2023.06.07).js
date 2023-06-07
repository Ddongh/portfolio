import  React, { useState, useEffect, useReact, useRef } from "react";
import Axios from 'axios';
import AnalyzeForm from "./AnalyzeForm";
import CandleStickChart from "./CandleStickChart";
import StockOpenAI from "./StockOpenAI";

function StockAnalyzePage(props) {

  const [stock, setStock] = useState('');
  const [stockName, setStockName] = useState("");
  const [method, setMethod] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [data, setData] = useState("")

  const validate = () => {
    if(stock === "") {
      alert("종목을 선택해주십시오");
      return false;
    } else if(method === "") {
      alert("분석방법을 선택하여 주십시오");
      return false;
    } else if(start === "") {
      alert("시작일을 선택하여 주십시오.");
      return false;
    } else if(end === "") {
      alert("종료일을 선택하여주십시오.");
      return false;
    }
    return true;
  }

  const handleSubmit = (e) => {
    if(!validate()) {
      return
    };
    
    const variable = {
      code : stock,
      start : start,
      end : end,

    }
    if(method === "rnn") {
      Axios.post('/api/stock/stockAnalyze/'+method, variable)
      .then(response => {
          console.log(response.data);
          setData(response.data);
      })
    }
  }
  
  const onStockChange = (value, option) => {
    setStock(value);
    setStockName(option.props.children);
  }

  const onMethodChange = (value) => {
    setMethod(value);
  }

  const onStartChange = (e) => {
    setStart(e.target.value);
  }

  const onEndChange = (e) => {
    setEnd(e.target.value);
  }

  if(data == "") {
    return (
      <div className="app">
          <AnalyzeForm
          stock={stock}
          stockName={stockName}
          onStockChange={onStockChange}
          method={method}
          onMethodChange={onMethodChange}
          onStartChange={onStartChange}
          onEndChange={onEndChange}
          handleSubmit={handleSubmit}
          />
      </div>
    );
  } else {
    return (
      <div className="app">
        <h1>{stockName} 분석결과</h1>
        <CandleStickChart data={data.data} stockName={stockName}  />
        <h1>{stockName}의 최근 한달간 동향 요약</h1>
        <StockOpenAI stockName={stockName} />
      </div>
      
    )
  }
};

export default StockAnalyzePage
