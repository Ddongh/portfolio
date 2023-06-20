import React from 'react';

const StockInfo = (props) => {
    debugger;
    const {stock, stockName, method, start, end} = props.state;
    
    return (
        <div>
            <table>
                <tr>
                    <th>종목명</th>
                    <td>{ stockName }</td>
                    <th>종목코드</th>
                    <td>{ stock }</td>
                </tr>
                <tr>
                    <th>분석 시작일</th>
                    <td>{ start }</td>
                    <th>분석 종료일</th>
                    <td>{ end }</td>
                </tr>
                <tr>
                    <th>분석방법</th>
                    <td>{ method }</td>
                </tr>
            </table>

        </div>
        
    );
}

export default StockInfo