import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const StockLineChart = ({ data }) => (
  <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
    <XAxis dataKey="date" />
    <YAxis />
    <CartesianGrid strokeDasharray="3 3" />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="Close" stroke="#8884d8" />
    <Line type="monotone" dataKey="Open" stroke="#8884d8" />
  </LineChart>
);

export default StockLineChart;
