import { forwardRef, useImperativeHandle } from 'react';

export const cardSetting = {
  title: '我的项目',
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
      <div onClick={handleClick}>我的项目</div>
    </div>
  );
};

export default forwardRef(Index as any);
