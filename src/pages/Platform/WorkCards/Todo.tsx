import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Table } from 'antd';
import dayjs from 'dayjs';
import Calendar from './components/Calendar';

export const title = '今日工作';

/** Card 卡片 过滤  */
export const Filter = () => {
  return (
    <span key="sub" style={{ opacity: 0.47, fontSize: '14px', paddingLeft: '8px' }}>
      {dayjs().format('YYYY-MM-DD')}
    </span>
  );
};
/** Card 卡片 extra */
export const Extra = () => {
  return <div>extra</div>;
};

/** Card 卡片 是否width : 100% */

// export const isFull = true;

const Index = (_, ref: any) => {
  // console.log(getDaysStartAndEnd(), getDistanceDays(getDaysStartAndEnd()));

  const [taskList, setTaskList] = useState([
    {
      title: 'usb接口修改',
      level: '高',
      status: '进行中',
      project: 'Lambda项目',
      id: '01',
    },
    {
      title: '高德地图APP需求分解',
      level: '高',
      status: '进行中',
      project: 'Lambda项目',
      id: '02',
    },
  ]);
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      ellipsis: true,
    },
    {
      title: '优先级',
      dataIndex: 'level',
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      ellipsis: true,
    },
    {
      title: '归属项目',
      dataIndex: 'project',
      ellipsis: true,
    },
  ];

  useImperativeHandle(ref, () => ({
    testData: ['d'],
  }));
  return (
    <div>
      <div>
        <Calendar />
      </div>
      <div style={{ marginTop: 8 }}>共{taskList?.length ?? 0}个事项</div>
      <Table
        rowKey={'id'}
        pagination={false}
        columns={columns}
        dataSource={taskList}
        style={{ marginTop: 8 }}
        size="small"
      />
    </div>
  );
};

export default forwardRef(Index as any);
