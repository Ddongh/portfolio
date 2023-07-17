import React, { useEffect, useState } from 'react';
import Axios from 'axios';

function LandingPage() {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    Axios.get('/api/landing')
      .then(response => {
        setQuestions(response.data.questions);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleQuestionClick = question => {
    setSelectedQuestion(question);
    debugger;
  };

  return (
    <div className="app_l">
      <h2>질문 목록</h2>
      <table style={{width:"50%"}}>
        <thead>
          <tr>
            <th>제목</th>
            <th>주식명</th>
            <th>분석방법</th>
            <th>분석 시작일</th>
            <th>분석 종료일</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={index} 
            onClick={() => handleQuestionClick(question)}
            style={{ cursor: 'pointer'}}
            >
                <td>{question.title}</td>
                <td>{question.stockName}</td>
                <td>{question.method}</td>
                <td>{question.start}</td>
                <td>{question.end}</td>
                <td>{question.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedQuestion && (
        <div>
          <h3>선택된 질문</h3>
          <p>주식: {selectedQuestion.stockName}</p>
          <p>분석 방법: {selectedQuestion.method}</p>
          <p>분석 시작일: {selectedQuestion.start}</p>
          {/* 추가적인 정보를 필요에 맞게 출력할 수 있습니다 */}
        </div>
      )}
    </div>
  );
}

export default LandingPage;
