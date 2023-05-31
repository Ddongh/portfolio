import  React, { useState, useEffect, useReact, useRef } from "react";
import Axios from 'axios';
import AnalyzeForm from "./AnalyzeForm";
import AnalyzeResult from "./AnalyzeResult"
import StockLineChart from "./StockLineChart";
import StockCandleChart from "./StockCandleChart";
import CandleStickChart from "./CandleStickChart"

import {
  Form,
  Input,
  Button,
  Select,
  message,
} from 'antd';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

function StockAnalyzePage(props) {

  

  const stockRef = useRef();
  const methodRef = useRef();
  const startRef = useRef();
  const endRef = useRef();

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
      method : method,
      start : start,
      end : end,

    }
    if(method === "rnn") {
      Axios.post('/api/stock/stockAnalyze/rnn', variable)
      .then(response => {
          console.log(response.data);
          setData(response.data);
      })
    }
  
  
    // Axios.post('/api/stock/stockAnalyze/linear', variable)
    // .then(response => {
    //     console.log(response.data);
    // })
  }

  const [stock, setStock] = useState('');
  const [stockName, setStockName] = useState("");
  const [method, setMethod] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [data, setData] = useState("")

  // useEffect(() => {
  //   // 작업 수행
  //   debugger;
  //   setStockName(stockRef.current.innerText);
  // }, [stock]);
  
  const onStockChange = (value, option) => {
    // debugger;
    setStock(value);
    setStockName(option.props.children);
  }

  const onMethodChange = (value) => {
    setMethod(value);
  }

  const onStartChange = (e) => {
    // console.log(e.target.value);
    setStart(e.target.value);
  }

  const onEndChange = (e) => {
    setEnd(e.target.value);
  }

  if(data == "") {
    return (
      <div className="app">
          <AnalyzeForm
          stockRef={stockRef}
          stock={stock}
          stockName={stockName}
          onStockChange={onStockChange}
          methodRef={methodRef}
          method={method}
          onMethodChange={onMethodChange}
          startRef={startRef}
          onStartChange={onStartChange}
          endRef={endRef}
          onEndChange={onEndChange}
          handleSubmit={handleSubmit}
          />
      </div>
    );
  } else {
    return (
      // <AnalyzeResult data={data.data} />
      <div className="app">
        {/* <h1>LineChart</h1>
        <StockLineChart data={data.data} /> */}

        {/* <h1>CandleChart</h1>
        <StockCandleChart data={data.data} /> */}

        <h1>{stockName} 분석결과</h1>
        <CandleStickChart data={data.data} stockName={stockName}  />
      </div>
      
    )
  }
  
};

export default StockAnalyzePage
