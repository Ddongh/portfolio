import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockOpenAI = ({ stockName }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('....Loading....');

  let tmp = "최근 한달간 " + stockName + "의 동향을 분석해서 요약해줘"

  useEffect(() => {
    setQuestion(tmp);
    if(question !== "") {
      axios.post('/api/chatgpt', { question })
      .then(response => {
        const answer = response.data.answer;
        setAnswer(answer);
      })
      .catch(error => {
        console.error('An error occurred:', error);
        // 에러 처리 로직 추가
      });
    }
    
  }, [question]); // question을 의존성 배열에 추가

  return (
    <div>
      {answer}
    </div>
  );
}

export default StockOpenAI;
