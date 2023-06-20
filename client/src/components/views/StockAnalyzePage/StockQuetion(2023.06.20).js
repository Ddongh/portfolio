import React from 'react';
import { Input, Button } from 'antd';

const StockQuestion = (props) => {

    const {
        state,
        updateState
    } = props;
    
    const {stock, stockName, method, start, end} = state;

    const handleSubmit = () => {
        alert("질문등록!!!!");
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Input.TextArea style={{ marginRight: '10px' }} />
            <Button type='primary' size="large" onClick={handleSubmit}>
                질문등록
            </Button>
        </div>
        
    );
}

export default StockQuestion;