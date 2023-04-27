import { forwardRef, useImperativeHandle, useEffect, useState } from 'react';
import { Radio } from 'antd';
import { Pie } from '@antv/g2plot';

/**
 * @description 必须   1. 使用forwardRef 需要 hasForwardRef https://zh-hans.reactjs.org/reference/react/forwardRef#forwardref
 * @description forwardRef returns a React component that you can render in JSX.
 * @description  Unlike React components defined as plain functions, a component returned by forwardRef is also able to receive a ref prop.
 */

export const title = '项目问题类统计';

/** Card 卡片 是否width : 100% */

export const isFull = false;

/** Card 卡片 extra */
export const Extra = () => {
  return (
    <Radio.Group defaultValue="a" size="small">
      <Radio.Button value="a">未解决</Radio.Button>
      <Radio.Button value="b">已解决</Radio.Button>
      <Radio.Button value="c">所有</Radio.Button>
    </Radio.Group>
  );
};

const Index = (props: any, ref: any) => {
  const [data, setData] = useState([
    { type: '高', value: 1 },
    { type: '中', value: 4 },
    { type: '低', value: 6 },
  ]);

  // const handleClick = (e: any) => {
  //   props?.moduleClick?.('ddd');
  // };

  const initData = () => {
    const piePlot = new Pie('projectProblem', {
      appendPadding: 10,
      data,
      angleField: 'value',
      colorField: 'type',
      radius: 1,
      innerRadius: 0.6,
      label: {
        type: 'inner',
        offset: '-50%',
        content: '{value}',
        style: {
          textAlign: 'center',
          fontSize: 14,
        },
      },
      interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
      statistic: {
        title: false,
        // content: {
        //   style: {
        //     whiteSpace: 'pre-wrap',
        //     overflow: 'hidden',
        //     textOverflow: 'ellipsis',
        //   },
        // content: 'AntV\nG2Plot',
        // },
      },
    });

    piePlot.render();
  };

  useImperativeHandle(ref, () => ({
    testData: ['a'],
  }));

  useEffect(() => {
    initData();
  }, []);

  return (
    <div style={{ width: '100%', height: '250px' }}>
      <div id="projectProblem" style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
};

export default forwardRef(Index as any);
