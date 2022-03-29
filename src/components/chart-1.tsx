import React, {useEffect, useRef} from 'react';
import * as echarts from 'echarts';
import {px} from '../shared/px';
import {baseEchartOptions} from '../shared/base-echart-options';
import {createEchartsOptions} from '../shared/create-echarts-options';

export const Chart1 = () => {
  const divRef = useRef(null);
  const myChart = useRef(null);
  const data = [
    {name: '广东省', number: 10},
    {name: '浙江省', number: 20},
    {name: '福建省', number: 36},
    {name: '湖北省', number: 41},
    {name: '湖南省', number: 15},
  ];
  useEffect(() => {
    setInterval(() => {
      const newData = [
        {name: '广东省', number: 10 + Math.random() * 50},
        {name: '浙江省', number: 20 - Math.random() * 10},
        {name: '福建省', number: 36 + Math.random() * 10},
        {name: '湖北省', number: 41},
        {name: '湖南省', number: 15 + Math.random() * 40},
      ];
      x(newData);
    }, 1000);
  }, []);
  const x = (data) => {
    myChart.current.setOption(createEchartsOptions({
      xAxis: {
        data: data.map(i => i.name),
        axisTick: {show: false},
        axisLine: {
          lineStyle: {color: '#083B70'}
        },
        axisLabel: {
          formatter(val) {
            if (val.length > 2) {
              const array = val.split('');
              array.splice(2, 0, '\n');
              return array.join('');
            } else {
              return val;
            }
          }
        },
      },

      yAxis: {
        splitLine: {show: false},
        axisLine: {
          show: true,
          lineStyle: {color: '#083B70'}
        }
      },
      series: [{
        type: 'bar',
        data: data.map(i => i.number)
      }]
    }));
  };
  useEffect(() => {
    myChart.current = echarts.init(divRef.current);
    x(data);
  }, []);

  return (
    <div className="bordered 管辖统计">
      <h2>案发派出所管辖统计</h2>
      <div ref={divRef} className="chart">

      </div>
    </div>
  );
};
