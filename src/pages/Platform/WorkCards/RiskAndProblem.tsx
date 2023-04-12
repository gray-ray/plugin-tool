import { forwardRef, useImperativeHandle } from 'react';
export const cardSetting = {
  title: '风险/问题',
};

const Index = (_, ref: any) => {
  useImperativeHandle(ref, () => ({
    testData: ['c'],
  }));
  return (
    <div>
      <div>风险/问题</div>
    </div>
  );
};

export default forwardRef(Index as any);
