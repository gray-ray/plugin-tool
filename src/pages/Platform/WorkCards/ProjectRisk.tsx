import { forwardRef, useImperativeHandle, useEffect, useRef } from 'react';
import { Radio } from 'antd';
import { measureTextWidth, Pie } from '@antv/g2plot';
/**
 * @description 必须   1. 使用forwardRef 需要 hasForwardRef https://zh-hans.reactjs.org/reference/react/forwardRef#forwardref
 * @description forwardRef returns a React component that you can render in JSX.
 * @description  Unlike React components defined as plain functions, a component returned by forwardRef is also able to receive a ref prop.
 */

export const title = '项目风险类统计';

/** Card 卡片 是否width : 100% */

export const isFull = false;

/** Card 卡片 extra */
export const Extra = (props: any) => {
  const filterChange = (e: any) => {
    props?.extraFn({ status: e.target.value });
  };
  return (
    <Radio.Group defaultValue="notClosed" onChange={filterChange}>
      <Radio.Button value="notClosed">未关闭</Radio.Button>
      <Radio.Button value="closed">已关闭</Radio.Button>
      <Radio.Button value="all">所有</Radio.Button>
    </Radio.Group>
  );
};

const ProjectRisk = (props: any, ref: any) => {
  const {
    extraProps: { status = 'notClosed' },
  } = props;
  const piePlot = useRef(null);

  const mock: Record<string, { type: string; value: number }[]> = {
    notClosed: [
      { type: '高', value: 5 },
      { type: '中', value: 4 },
      { type: '低', value: 3 },
    ],
    closed: [
      { type: '高', value: 10 },
      { type: '中', value: 14 },
      { type: '低', value: 13 },
    ],
    all: [
      { type: '高', value: 15 },
      { type: '中', value: 18 },
      { type: '低', value: 16 },
    ],
  };

  const renderStatistic = (containerWidth: number, text: string, style: any) => {
    const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
    const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

    let scale = 1;

    if (containerWidth < textWidth) {
      scale = Math.min(
        Math.sqrt(
          Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2))),
        ),
        1,
      );
    }

    const textStyleStr = `width:${containerWidth}px;`;
    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${
      scale < 1 ? 1 : 'inherit'
    };">${text}</div>`;
  };

  const defaultConfig = {
    appendPadding: 10,
    angleField: 'value',
    colorField: 'type',
    color: ['#F10D0D', '#FF9B21', '#FFCC24'],
    radius: 1,
    innerRadius: 0.6,
    label: false,
    // label: {
    //   type: 'inner',
    //   offset: '-50%',
    //   content: '{value}',
    //   style: {
    //     textAlign: 'center',
    //     fontSize: 14,
    //   },
    // },
    legend: {
      layout: 'horizontal',
      position: 'bottom',
    },
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
    statistic: {
      title: {
        customHtml: (container, view, datum) => {
          const { width, height } = container.getBoundingClientRect();
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
          const text = datum ? datum.type : '风险';
          return renderStatistic(d, text, {
            fontSize: 20,
          });
        },
      },
      // content: {
      //   style: {
      //     whiteSpace: 'pre-wrap',
      //     overflow: 'hidden',
      //     textOverflow: 'ellipsis',
      //   },
      // content: 'AntV\nG2Plot',
      // },
    },
  };

  const initData = () => {
    piePlot.current = new Pie('projectRisk', {
      ...defaultConfig,
      data: mock[status],
    });

    (piePlot.current as any)?.render();
  };

  const updateData = () => {
    (piePlot.current as any)?.update({
      ...defaultConfig,
      data: mock[status],
    });
  };

  useImperativeHandle(ref, () => ({
    testData: ['a'],
  }));

  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    updateData();
  }, [status]);

  return (
    <div style={{ width: '100%', height: '250px' }}>
      <div id="projectRisk" style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
};

export default forwardRef(ProjectRisk as any);
