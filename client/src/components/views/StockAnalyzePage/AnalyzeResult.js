// import React from 'react';
// import { ChartCanvas, Chart } from 'react-stockcharts';
// import { CandlestickSeries, BarSeries } from 'react-stockcharts/lib/series';
// import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
// import { CrossHairCursor, MouseCoordinateX, MouseCoordinateY } from 'react-stockcharts/lib/coordinates';
// import { discontinuousTimeScaleProviderBuilder } from 'react-stockcharts/lib/scale';
// import { last } from 'react-stockcharts/lib/utils';
// import { timeFormat } from 'd3-time-format';

// const AnalyzeResult = ({ data }) => {
//   // 데이터 전처리
//   const processedData = data.map((d) => ({
//     date: new Date(d.date),
//     open: parseFloat(d.Open),
//     high: parseFloat(d.High),
//     low: parseFloat(d.Low),
//     close: parseFloat(d.Close),
//     volume: parseInt(d.Volume),
//   }));

//   // 시간 스케일 프로바이더 생성
//   const xScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor((d) => d.date).build();

//   // 데이터에 스케일 적용
//   const { data: chartData, xScale, xAccessor, displayXAccessor } = xScaleProvider(processedData);

//   // 차트 높이 계산
//   const height = 400;

//   // 차트 영역 설정
//   const margin = { left: 50, right: 50, top: 10, bottom: 30 };
//   const width = 800; // 차트의 너비
//   const ratio = 1; // 차트의 비율

//   const gridHeight = height - margin.top - margin.bottom;

//   return (
//     <ChartCanvas height={height} width={width} ratio={ratio} margin={margin} type="svg" seriesName="StockChart" data={chartData} xScale={xScale} xAccessor={xAccessor} displayXAccessor={displayXAccessor}>
//       <Chart id={1} yExtents={(d) => [d.high, d.low]} height={gridHeight}>
//         <XAxis axisAt="bottom" orient="bottom" />
//         <YAxis axisAt="left" orient="left" ticks={5} />
//         <MouseCoordinateX at="bottom" orient="bottom" displayFormat={timeFormat('%Y-%m-%d')} />
//         <MouseCoordinateY at="left" orient="left" displayFormat={(value) => `${value}`} />
//         <CandlestickSeries />
//       </Chart>
//       <Chart id={2} yExtents={(d) => d.volume} height={150} origin={(w, h) => [0, h - 150]}>
//         <YAxis axisAt="left" orient="left" ticks={5} tickFormat={(value) => `${value / 1000000}M`} />
//         <BarSeries yAccessor={(d) => d.volume} />
//       </Chart>
//       <CrossHairCursor />
//     </ChartCanvas>
//   );
// };

// export default AnalyzeResult;
// s