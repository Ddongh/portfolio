import React from 'react';
import { Form, Input, Select, Button } from 'antd';

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

function AnalyzeForm(props) {
  const {
    stock,
    stockName,
    onStockChange,
    method,
    onMethodChange,
    onStartChange,
    onEndChange,
    handleSubmit,
  } = props;

  

  return (
    <>
      <h2>종목 및 옵션 선택</h2>
      <Form style={{ minWidth: '375px', textAlign: 'center' }} {...formItemLayout} onSubmit={handleSubmit} >
        <Form.Item required label="종목">
          <Select stockName={stockName} value={stock} onChange={onStockChange}>
            <Option value="005930" >삼성전자</Option>
            <Option value="035720">카카오</Option>
            <Option value="035420">네이버</Option>
          </Select>
        </Form.Item>

        <Form.Item required label="분석방법">
          <Select value={method} onChange={onMethodChange}>
            {/* <Option value="linear_regression">선형회귀</Option> */}
            <Option value="rnn" >RNN(순환신경망)</Option>
          </Select>
        </Form.Item>

        <Form.Item required label="시작일">
          <Input type="date" onChange={onStartChange}></Input>
        </Form.Item>

        <Form.Item required label="종료일">
          <Input type="date" onChange={onEndChange}></Input>
        </Form.Item>

        <Button type='primary' size="large" onClick={handleSubmit}>
          분석하기
        </Button>
      </Form>
    </>
  );
}

export default AnalyzeForm;
