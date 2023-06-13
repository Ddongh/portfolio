import React from 'react';

const StockOpenAI = ({ stockName, answer }) => {
  return (
    <div>
      <h1>{stockName}의 최근 한달간 동향 요약</h1>
      {answer}
    </div>
  );
}

export default StockOpenAI;
