import  React, { useState, useEffect }  from "react";
import axios from 'axios';

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
  axios.get('/stockAnalyze')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });

    const handleSubmit = () => {

    }

    const [stockOption, setStockOption] = useState('');
    const options = ['Option 1', 'Option 2', 'Option 3'];

    const onStockOptionChange = (value) => {
        setStockOption(value);
    }

    
    return (
        <div className="app">
            <h2>종목 및 옵션 선택</h2>
            <Form style={{ minWidth: '375px' }} {...formItemLayout} onSubmit={handleSubmit} >

              <Form.Item required label="종목">
              <Select value={stockOption} onChange={onStockOptionChange}>
                {options.map((option, index) => (
                <Option key={index} value={option}>
                    {option}
                </Option>
                ))}
            </Select>
               
              </Form.Item>

              
            </Form>
          </div>
    );

  
    
};


export default StockAnalyzePage
