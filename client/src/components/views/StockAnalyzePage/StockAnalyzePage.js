import  React, { useState, useEffect }  from "react";
import Axios from 'axios';

import {
    Form,
    Input,
    Button,
    Select,
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
  useEffect(() => {
      Axios.get('api/stock/stockAnalyze')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
    });

}, [])

    const handleSubmit = () => {

    }

    const [stock, setStock] = useState('');
    const [method, setMethod] = useState("");

    const [start, setStart] = useState("");
    const [End, setEnd] = useState("");
    // const stockNames = ['삼성전자', '카카오', '네이버'];
    // const stockCodes = [005930, 035720, 035420];
    

    const onStockChange = (value) => {
      setStock(value);
    }

    const onMethodChange = (value) => {
      setMethod(value);
    }

    const onStartChange = (value) => {
      setStart(value);
    }

    const onEndChange = (value) => {
      setEnd(value);
    }



    
    return (
        <div className="app">
            <h2>종목 및 옵션 선택</h2>
            <Form style={{ minWidth: '375px' }} {...formItemLayout} onSubmit={handleSubmit} >

              <Form.Item required label="종목">
                <Select value={stock} onChange={onStockChange}>
                  <Option value="005930">삼성전자</Option>
                  <Option value="035720">카카오</Option>
                  <Option value="035420">네이버</Option>
                </Select>
               
              </Form.Item>

              <Form.Item required label="분석방법">
                <Select value={method} onChange={onMethodChange}>
                  <Option value="linear_regression">선형회귀</Option>
                </Select>
               
              </Form.Item>

              <Form.Item required label="시작일">
                <Input type="date" onChange={onStartChange}></Input>               
              </Form.Item>

              <Form.Item required label="종료일">
                <Input type="date" onChange={onEndChange}></Input>
              </Form.Item>              
            </Form>

            
          </div>
    );

  
    
};


export default StockAnalyzePage
