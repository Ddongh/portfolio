import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const CandleStickChart = ({ props }) => {
  const { data, stockName } = props;
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartOptions = {
        rangeSelector: {
          enabled: false,
        },
        title: {
        text: stockName,
        },
        chart: {
          height: '70%', // Set the height of the price chart
        },
        yAxis: [
          {
            title: {
              text: 'Price',
            },
            height: '70%', // Set the height of the price chart
            top: '0', // Position the price chart at the top
          },
          {
            title: {
              text: 'Volume',
            },
            opposite: true,
            height: '20%', // Set the height of the volume chart
            top: '80%', // Position the volume chart below the price chart
          },
        ],
        series: [
          {
            type: 'candlestick',
            name: 'Stock Price',
            data: calculateChartData(data),
            color: 'red',
            upColor: 'blue',
            dataGrouping: {
              units: [['day', [1]]],
            },
          },
          {
            type: 'column',
            name: 'Volume',
            data: calculateVolumeData(data),
            yAxis: 1,
          },
        ],
      };

      chartRef.current.chart.update(chartOptions);
    }
  }, [data]);

  const calculateChartData = (data) => {
    // Calculate chart data
    const chartData = data.slice(0, -7).map((d) => [
      new Date(d.date).getTime(),
      parseFloat(d.Open),
      parseFloat(d.High),
      parseFloat(d.Low),
      parseFloat(d.Close),
    ]);

    // Append predicted data
    const predictedData = data.slice(-7).map((d, index) => [
      new Date().getTime() + (index + 1) * 24 * 60 * 60 * 1000, // Add one day for each predicted data point
      parseFloat(d.Open),
      parseFloat(d.High),
      parseFloat(d.Low),
      parseFloat(d.Close),
    ]);

    return chartData.concat(predictedData);
  };

  const calculateVolumeData = (data) => {
    // Calculate volume data
    const volumeData = data.slice(0, -7).map((d) => [
      new Date(d.date).getTime(),
      parseFloat(d.Volume),
    ]);

    // Append predicted data
    const predictedVolumeData = data.slice(-7).map((d, index) => [
      new Date().getTime() + (index + 1) * 24 * 60 * 60 * 1000, // Add one day for each predicted data point
      parseFloat(d.Volume),
    ]);

    return volumeData.concat(predictedVolumeData);
  };

  const options = {
    title: {
    //   text: 'Candlestick Chart',
    text: stockName,
    },
    chart: {
      height: '70%', // Set the height of the price chart
    },
    yAxis: [
      {
        title: {
          text: 'Price',
        },
        height: '70%', // Set the height of the price chart
        top: '0', // Position the price chart at the top
      },
      {
        title: {
          text: 'Volume',
        },
        opposite: true,
        height: '20%', // Set the height of the volume chart
        top: '80%', // Position the volume chart below the price chart
      },
    ],
    series: [
      {
        type: 'candlestick',
        name: 'Stock Price',
        data: calculateChartData(data),
        color: 'red',
        upColor: 'blue',
        dataGrouping: {
          units: [['day', [1]]],
        },
      },
      {
        type: 'column',
        name: 'Volume',
        data: calculateVolumeData(data),
        yAxis: 1,
      },
    ],
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={'stockChart'}
      options={options}
      ref={chartRef}
    />
  );
};

export default CandleStickChart;
