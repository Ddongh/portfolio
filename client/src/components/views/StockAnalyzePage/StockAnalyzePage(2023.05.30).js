import  React, { useState, useEffect, useReact, useRef } from "react";
import Axios from 'axios';

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
  const [method, setMethod] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [data, setData] = useState("")
  
  const onStockChange = (value) => {
    setStock(value);
  }

  const onMethodChange = (value) => {
    setMethod(value);
  }

  const onStartChange = (e) => {
    console.log(e.target.value);
    setStart(e.target.value);
  }

  const onEndChange = (e) => {
    setEnd(e.target.value);
  }



    
  return (
    <div className="app">
        <h2>종목 및 옵션 선택</h2>
        <Form style={{ minWidth: '375px' }} {...formItemLayout} onSubmit={handleSubmit} >

          <Form.Item required label="종목">
            <Select ref={stockRef} value={stock} onChange={onStockChange}>
              <Option value="005930" default>삼성전자</Option>
              <Option value="035720">카카오</Option>
              <Option value="035420">네이버</Option>
            </Select>
            
          </Form.Item>

          <Form.Item required label="분석방법">
            <Select ref={methodRef} value={method} onChange={onMethodChange}>
              {/* <Option value="linear_regression">선형회귀</Option> */}
              <Option value="rnn">RNN(순환신경망)</Option>
            </Select>
            
          </Form.Item>

          <Form.Item required label="시작일">
            <Input ref={startRef} type="date" onChange={onStartChange}></Input>               
          </Form.Item>

          <Form.Item required label="종료일">
            <Input ref={endRef} type="date" onChange={onEndChange}></Input>
          </Form.Item>              

          <Button type='primary' size="large" onClick={handleSubmit}>
                분석하기
            </Button>

        </Form>
      </div>
  );
};

export default StockAnalyzePage
