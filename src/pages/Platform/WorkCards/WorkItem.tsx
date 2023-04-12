import { forwardRef, useImperativeHandle } from 'react';
export const cardSetting = {
  title: '工作项',
};
const Index = (_, ref: any) => {
  useImperativeHandle(ref, () => ({
    testData: ['e'],
  }));
  return (
    <div>
      <div>工作项</div>
    </div>
  );
};

export default forwardRef(Index as any);
