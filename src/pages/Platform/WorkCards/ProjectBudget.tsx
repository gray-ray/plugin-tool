import { forwardRef, useImperativeHandle, useEffect, useRef } from 'react';
import { Column } from '@antv/g2plot';
/**
 * @description 必须   1. 使用forwardRef 需要 hasForwardRef https://zh-hans.reactjs.org/reference/react/forwardRef#forwardref
 * @description forwardRef returns a React component that you can render in JSX.
 * @description  Unlike React components defined as plain functions, a component returned by forwardRef is also able to receive a ref prop.
 */

export const title = '项目风险类统计';

/** Card 卡片 是否width : 100% */

export const isFull = false;

/** Card 卡片 extra */
export const Extra = () => {
  return <p>总和(单位：万元) 预算 82647.1 成本 3035.7</p>;
};

const ProjectBudget = (props: any, ref: any) => {
  const columnPlot = useRef(null);

  const data = [
    {
      type: '预算',
      name: '人力',
      value: 120,
    },
    {
      type: '成本',
      name: '人力',
      value: 40,
    },
    {
      type: '预算',
      name: '会议',
      value: 100,
    },
    {
      type: '成本',
      name: '会议',
      value: 36,
    },
    {
      type: '预算',
      name: '培训',
      value: 108,
    },
    {
      type: '成本',
      name: '培训',
      value: 20,
    },
    {
      type: '预算',
      name: '差旅',
      value: 60,
    },
    {
      type: '成本',
      name: '差旅',
      value: 22,
    },
  ];

  const defaultConfig = {
    appendPadding: 10,
    isGroup: true,
    xField: 'name',
    yField: 'value',
    seriesField: 'type',
    color: ['#1890FF', '#52C41A'],
    legend: false,
  };

  const initData = () => {
    columnPlot.current = new Column('projectBudget', {
      ...defaultConfig,
      data,
    });

    (columnPlot.current as any)?.render();
  };

  useImperativeHandle(ref, () => ({
    testData: ['a'],
  }));

  useEffect(() => {
    initData();
  }, []);

  return (
    <div style={{ width: '100%', height: '250px' }}>
      <div id="projectBudget" style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
};

export default forwardRef(ProjectBudget as any);
