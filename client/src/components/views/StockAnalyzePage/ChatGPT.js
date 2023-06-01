import React, { useState } from 'react';
import axios from 'axios';

function ChatGPT() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("question >>> " + question)
    // POST 요청 보내기
    axios.post('/api/chatgpt', { question })
      .then(response => {
        const answer = response.data.answer;
        console.log(answer);
        setAnswer(answer);
      })
      .catch(error => {
        console.error('An error occurred:', error);
        // 에러 처리 로직 추가
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          질문:
          <input type="text" value={question} onChange={handleQuestionChange} />
        </label>
        <button type="submit">질문 보내기</button>
      </form>
      <div>
        <strong>답변:</strong> {answer}
      </div>
    </div>
  );
}

export default ChatGPT;
