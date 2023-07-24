import React, {useEffect, useState} from 'react';
import Axios from 'axios';
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
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
function AnalyzeForm(props) {
  const {
    state,
    updateState
  } = props;

  const {stock, stockName, method, start, end} = state;

  const [codeName, setCodeName] = useState([])

  useEffect(() => {
    if(sessionStorage.getItem("codeNameList") == null) { // 세션 스토리지에 종목 코드와 이름이 없으면 서버에 요청
      const s = performance.now();
      Axios.get('/api/stock/stockCodeName')
      .then(response => {
         sessionStorage.setItem("codeNameList", JSON.stringify(response.data)); // 세션 스토리지에 저장
        //  sessionStorage.setItem("codeName", response.data);
         
          console.log(response.data);
          setCodeName(response.data)
          const e = performance.now();
          console.log("서버요청 소요 시간(ms) : ", e-s);
      })
      .catch(error => {
        console.error(error);
        // 에러 처리 로직 추가
      });
    } else { // 세션 스토리지에 데이터가 있으면 서버에 요청하지 않고 사용
      const s = performance.now();
      const codeNameList = sessionStorage.getItem("codeNameList");
      setCodeName(JSON.parse(codeNameList));
      const e = performance.now()
      console.log("세션 스토리지 사용 소요시간(ms) : ", e-s);
    }
    
  }, [])
  
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

  const handleSubmit = () => {
    if(!validate()) {
      return
    };
    
    const variable = {
      code : stock,
      start : start,
      end : end,
    }

    Axios.post('/api/stock/stockAnalyze/'+method, variable)
      .then(response => {
          console.log(response.data);
          updateState("data", response.data.data);
      })
    
    let tmp = "최근 한달간 " + stockName + "의 동향을 분석해서 요약해줘. ";
    tmp += "html태그를 적절히 넣어줘"
    
    Axios.post('/api/chatgpt', { question:tmp })
    .then(response => {
      const answer = response.data.answer;
      updateState("ai_answer", answer);
    })
    .catch(error => {
      console.error('An error occurred:', error);
      // 에러 처리 로직 추가
    });
  }
  
  const onStockChange = (value, option) => {
    debugger;
    updateState("stock", value);
    updateState("stockName", option.props.label);
  }

  const onMethodChange = (value) => {
    updateState("method", value)
  }

  const onStartChange = (e) => {
    updateState("start", e.target.value);
  }

  const onEndChange = (e) => {
    updateState("end", e.target.value);
  }

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log('search:', value);
  };

  return (
    <>
      <h2>종목 및 옵션 선택</h2>
      <Form style={{ minWidth: '375px', textAlign: 'center' }} {...formItemLayout} onSubmit={handleSubmit} >
        <Form.Item required label="종목">
          <Select
            showSearch
            placeholder="Select a stock"
            optionFilterProp="children"
            onChange={onStockChange}
            onSearch={onSearch}
            filterOption={(input, option) => {
              const nameB = (option?.props.label ?? '').toLowerCase().includes(input.toLowerCase());
              const codeB = (option?.props.value ?? '').toLowerCase().includes(input.toLowerCase());
              if(nameB) return nameB;
              return codeB;
            }
              
            }
          >
            {Object.keys(codeName).map(key => (
              <Option key={codeName[key].code} value={codeName[key].code} label={codeName[key].name}>
                {codeName[key].name} ({codeName[key].code})
              </Option>
            ))}
            {/* <Option value="005930" label="삼성전자">삼성전자(005930)</Option>
            <Option value="373220" label="LG에너지솔루션">LG에너지솔루션</Option>
            <Option value="000660" label="SK하이닉스">SK하이닉스</Option> */}
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
