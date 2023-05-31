import React from "react";
import { ChartCanvas, Chart } from 'react-stockcharts';
import { CandlestickSeries } from 'react-stockcharts/lib/series';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import { fitWidth } from 'react-stockcharts/lib/helper';
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale';
import { last } from 'react-stockcharts/lib/utils';

const AnalyzeResult = ({ data, width, ratio }) => {
    debugger;
    // data = data.data;
    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor((d) => new Date(d.date));
    const { data: chartData, xScale, xAccessor, displayXAccessor } = xScaleProvider(data);
  
    const start = xAccessor(last(chartData));
    const end = xAccessor(chartData[Math.max(0, chartData.length - 150)]);
    const xExtents = [start, end];
  
    return (
      <ChartCanvas width={width} height={400} ratio={ratio} margin={{ left: 50, right: 50, top: 10, bottom: 30 }} type="svg" seriesName="MSFT" data={chartData} xScale={xScale} xAccessor={xAccessor} displayXAccessor={displayXAccessor} xExtents={xExtents}>
        <Chart id={1} yExtents={(d) => [d.High, d.Low]}>
          <XAxis axisAt="bottom" orient="bottom" ticks={6} />
          <YAxis axisAt="left" orient="left" ticks={5} />
  
          <CandlestickSeries />
        </Chart>
      </ChartCanvas>
    );
  };
  
  export default fitWidth(AnalyzeResult);