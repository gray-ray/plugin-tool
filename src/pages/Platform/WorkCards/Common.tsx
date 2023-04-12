import { forwardRef, useImperativeHandle } from 'react';

/**
 * @description 必须  1. 文件名称需唯一. 2. 使用forwardRef 需要 hasForwardRef https://zh-hans.reactjs.org/reference/react/forwardRef#forwardref
 * @description forwardRef returns a React component that you can render in JSX.
 * @description  Unlike React components defined as plain functions, a component returned by forwardRef is also able to receive a ref prop.
 */

export const cardSetting = {
  title: '常用功能',
};

const Index = (props: any, ref: any) => {
  const handleClick = (e: any) => {
    props?.moduleClick?.('ddd');
  };

  useImperativeHandle(ref, () => ({
    testData: ['a'],
  }));

  return (
    <div>
      <div onClick={handleClick}>常用功能</div>
    </div>
  );
};

export default forwardRef(Index as any);
