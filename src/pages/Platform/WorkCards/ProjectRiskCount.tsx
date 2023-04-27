import { forwardRef, useImperativeHandle, useEffect, useRef } from 'react';

import { Bar } from '@antv/g2plot';
/**
 * @description 必须   1. 使用forwardRef 需要 hasForwardRef https://zh-hans.reactjs.org/reference/react/forwardRef#forwardref
 * @description forwardRef returns a React component that you can render in JSX.
 * @description  Unlike React components defined as plain functions, a component returned by forwardRef is also able to receive a ref prop.
 */

export const title = '项目维度未关闭风险数量TOP5';

/** Card 卡片 是否width : 100% */

export const isFull = false;

const ProjectRiskCount = (props: any, ref: any) => {
  const barPlot = useRef(null);
  const data = [
    {
      type: '项目1',
      value: 8,
    },
    {
      type: '项目2',
      value: 4,
    },
    {
      type: '项目3',
      value: 4,
    },
    {
      type: '项目4',
      value: 2,
    },
    {
      type: '项目5',
      value: 6,
    },
  ];

  const defaultConfig = {
    appendPadding: 10,
    xField: 'value',
    yField: 'type',
    seriesField: 'type',
    color: ['#FF6500', '#52C41A', '#52C41A', '#52C41A', '#52C41A'],
    radius: 1,
    innerRadius: 0.6,
    xAxis: {
      grid: null,
    },
    label: {
      style: {
        textAlign: 'center',
        fontSize: 14,
        fill: '#fff',
      },
    },
    legend: false,
  };

  const initData = () => {
    barPlot.current = new Bar('projectRiskCount', {
      ...defaultConfig,
      data,
    });

    (barPlot.current as any)?.render();
  };

  useImperativeHandle(ref, () => ({
    testData: ['a'],
  }));

  useEffect(() => {
    initData();
  }, []);

  return (
    <div style={{ width: '100%', height: '250px' }}>
      <div id="projectRiskCount" style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
};

export default forwardRef(ProjectRiskCount as any);
