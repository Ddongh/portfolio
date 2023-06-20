import React from 'react';

const StockOpenAI = ({ stockName, answer }) => {
  return (
    <div style={{ width:"50%" }}>
      <table>
        <tr>
          <th>최근동향</th>
          <td> {answer } </td>
        </tr>
      </table>
    </div>
  );
}

export default StockOpenAI;
