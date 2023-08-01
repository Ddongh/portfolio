import React, {useEffect, useState, useRef} from 'react';
import Axios from 'axios';
import { Form, Input, Select, Button, message } from 'antd';

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
    state,
    updateState
  } = props;

  const {stock, stockName, method, start, end} = state;

  const [codeName, setCodeName] = useState([]); // 주식 코드/이름 리스트

  useEffect(() => {
    const localCodeNameList = JSON.parse(localStorage.getItem("codeNameList")); // 로컬 스토리지에 저장된 주식 코드/이름 리스트 가져오기
    
    if(localCodeNameList == null || localCodeNameList.expire < Date.now()) { // 로컬스토리지에 저장여부 확인 및 만료일자 체크
      const s = performance.now(); 
      Axios.get('/api/stock/stockCodeName') 
      .then(response => {
        setCodeName(response.data) // state update
        localStorage.removeItem("codeNameList") // 로컬스토리지 데이터 삭제
        response.data["expire"] = Date.now() + 60 * 60 * 24 * 1000; // 만료일자 지정(초*분*시*1000)
        localStorage.setItem("codeNameList", JSON.stringify(response.data)); // 로컬스토리지에 저장
        const e = performance.now();
        console.log("서버요청 소요 시간(ms) : ", e-s);
      })
      .catch(error => {
        console.error(error);
      });
    } else { // 로컬스토리지에 데이터가 있고 만료일이 지나지 않으면 그대로 사용
      const s = performance.now();
      setCodeName(localCodeNameList); // state update
      const e = performance.now()
      console.log("세션 스토리지 사용 소요시간(ms) : ", e-s);
    }
  }, [])
  
  const validate = () => { // validation check

    const now = new Date();
    const startDate = new Date(start); // 선택한 시작일
    const endDate = new Date(end); // 선택한 종료일
    const sevenDaysLater = new Date(start); // 시작일 기준 7일뒤 날짜
    sevenDaysLater.setDate(startDate.getDate() + 7);

    if(stock === "") {
      message.warn("종목을 선택하여 주십시오.");
      return false;
    } else if(method === "") {
      message.warn("분석방법을 선택하여 주십시오.")
      return false;
    } else if(start === "") {
      message.warn("시작일을 선택하여 주십시오.")
      return false;
    } else if(end === "") {
      message.warn("종료일을 선택하여 주십시오.")
      return false;
    } else if(startDate > now) {
      message.warn("분석 시작일은 현재 날짜 이후로 지정할 수 없습니다.");
      return false;
    } else if(sevenDaysLater > endDate) {
      message.warn("분석 기간을 최소 7일 이상이 되게 지정해주십시오.");
      return false;
    } else if(endDate > now) {
      message.warn("분석 종료일은 현재보다 미래로 지정할 수 없습니다");
      return false;
    }
    return true;
  }

  const handleSubmit = () => { // 분석하기 버튼 이벤트
    if(!validate()) {
      return
    };
    
    const variable = { // 분석에 필요한 데이터
      code : stock,   // 종목코드
      start : start,  // 시작일
      end : end,      // 종료일
    }

    Axios.post('/api/stock/stockAnalyze/'+method, variable) // method에 해당하는 라우터 실행
      .then(response => {
          console.log(response.data);
          updateState("data", response.data.data); // 크롤링 및 예측 데이터로 data state update
      })
      .catch(err => { // 에러처리
        console.log(err.response.data);
        message.error({
          content: stockName + "의 " + start + " ~ " + end + "기간에 대한 주가 수집에 실패했습니다.",
          top: 2000, 
          duration: 5,
        });
      });
    
    let tmp = "최근 한달간 " + stockName + "의 동향을 분석해서 요약해줘.";
    
    Axios.post('/api/chatgpt', { question:tmp }) // 선택한 종목에 대한 한달간 동향 파악 라우터실행(openAI)
    .then(response => {
      const answer = response.data.answer; 
      updateState("ai_answer", answer); // answer state update
    })
    .catch(error => { // 에러 처리 로직 추가
      console.error('An error occurred:', error);
    });
  }
  
  const onStockChange = (value, option) => { // 종목 선택시 stock state update
    updateState("stock", value);
    updateState("stockName", option.props.label);
  }

  const onMethodChange = (value) => { // 분석방법 선택시 method state update
    updateState("method", value)
  }

  const onStartChange = (e) => { // 시작일 선택시 start state update
    updateState("start", e.target.value);
  }

  const onEndChange = (e) => { // 종료일 선택시 end state update
    updateState("end", e.target.value);
  }

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
            filterOption={(input, option) => { // SELECT BOX 필터링(검색기능)
              const nameB = (option?.props.label ?? '').toLowerCase().includes(input.toLowerCase()); // option의 label(주식명)에 input 데이터가 포함되는지 체크
              const codeB = (option?.props.value ?? '').toLowerCase().includes(input.toLowerCase()); // option의 value(주식코드)에 input 데이터가 포함되는지 체크
              if(nameB) return nameB;
              return codeB;
              }}
          >
            {Object.keys(codeName).map((key, index) => ( // 주식 code,name 데이터로 select option 생성
              <Option key={index} value={codeName[key].code} label={codeName[key].name}>
                {codeName[key].name} ({codeName[key].code})
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item required label="분석방법">
          <Select 
          placeholder="Select a method"
          value={method} 
          onChange={onMethodChange}
          >
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
