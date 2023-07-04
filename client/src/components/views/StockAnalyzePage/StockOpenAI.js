import React from 'react';

const StockOpenAI = ({ stockName, ai_answer }) => {
  
  return (
    <div style={{ width:"50%" }}>
      <table>
        <tr>
          <th>최근동향</th>
          <td> {ai_answer } </td>
        </tr>
      </table>
    </div>
  );
}

export default StockOpenAI;
