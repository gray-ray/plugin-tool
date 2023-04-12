import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Table } from 'antd';
import dayjs from 'dayjs';
import Calendar from './components/Calendar';

export const cardSetting = {
  title: [
    <span key="title">今日工作</span>,
    <span key="sub" style={{ opacity: 0.47, fontSize: '14px', paddingLeft: '8px' }}>
      {dayjs().format('YYYY-MM-DD')}
    </span>,
  ],
};

const Index = (_, ref: any) => {
  // console.log(getDaysStartAndEnd(), getDistanceDays(getDaysStartAndEnd()));

  const [taskList, settaskList] = useState([]);
  const coluns = [{}];

  useImperativeHandle(ref, () => ({
    testData: ['d'],
  }));
  return (
    <div>
      <div>
        <Calendar />
      </div>

      <div>今日工作</div>
    </div>
  );
};

export default forwardRef(Index as any);
