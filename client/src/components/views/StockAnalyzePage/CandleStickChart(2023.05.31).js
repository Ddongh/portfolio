import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const CandleStickChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartOptions = {
        rangeSelector: {
          enabled: false,
        },
        title: {
          text: 'Candlestick Chart',
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
            data: data.map((d) => [
              new Date(d.date).getTime(),
              parseFloat(d.Open),
              parseFloat(d.High),
              parseFloat(d.Low),
              parseFloat(d.Close),
            ]),
            color: 'red',
            upColor: 'blue',
            dataGrouping: {
              units: [['day', [1]]],
            },
          },
          {
            type: 'column',
            name: 'Volume',
            data: data.map((d) => [
              new Date(d.date).getTime(),
              parseFloat(d.Volume),
            ]),
            yAxis: 1,
          },
        ],
      };

      chartRef.current.chart.update(chartOptions);
    }
  }, [data]);

  const options = {
    title: {
      text: 'Candlestick Chart',
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
        data: data.map((d) => [
          new Date(d.date).getTime(),
          parseFloat(d.Open),
          parseFloat(d.High),
          parseFloat(d.Low),
          parseFloat(d.Close),
        ]),
        color: 'red',
        upColor: 'blue',
        dataGrouping: {
          units: [['day', [1]]],
        },
      },
      {
        type: 'column',
        name: 'Volume',
        data: data.map((d) => [
          new Date(d.date).getTime(),
          parseFloat(d.Volume),
        ]),
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
