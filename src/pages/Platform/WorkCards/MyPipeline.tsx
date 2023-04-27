import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Dropdown, Space, Table, Button } from 'antd';
import type { MenuProps } from 'antd';
import {
  DownOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

export const title = '我的流水线';

/** Card 卡片 过滤  */
type FilterProps = {
  filterFn: (data?: any) => void;
};
export const Filter: React.FC<FilterProps> = (props) => {
  const onClick: MenuProps['onClick'] = ({ key }) => {
    props?.filterFn?.(key);
  };

  const items: MenuProps['items'] = [
    {
      label: '我参与的',
      key: '1',
    },
    {
      label: '我收藏的',
      key: '2',
    },
    {
      label: '我常用的',
      key: '3',
    },
  ];

  const [list, setList] = useState(items);

  return (
    <Dropdown menu={{ items: list, onClick }} key="dropdown">
      <span onClick={(e) => e.preventDefault()} style={{ fontSize: '14px', paddingLeft: '8px' }}>
        <span>
          我参与的 <DownOutlined />
        </span>
      </span>
    </Dropdown>
  );
};

/** Card 卡片 extra */
// type ExtraProps = {
//   extraFn: (data?: any) => void;
// };
// export const Extra: React.FC<ExtraProps> = (props) => {
//   const onClick = (key: any) => {
//     props?.extraFn?.(key);
//   };
//   return <div onClick={onClick}>extra</div>;
// };

// ---
export const BuildEnum = {
  1: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
  2: <CloseCircleOutlined style={{ color: 'red' }} />,
  3: <ClockCircleOutlined style={{ color: '#108ee9' }} />,
};

const Index = (_, ref: any) => {
  const [taskList, setTaskList] = useState([
    {
      pipeline: 'andriod solution pipeline',
      buildId: '2',
      buildStatus: '1',
      buildDuration: '耗时50min',
      triggerTime: '2023-03-01 18:51:31',
      id: '01',
    },
    {
      pipeline: 'andriod solution pipeline2',
      buildId: '17',
      buildStatus: '2',
      buildDuration: '耗时30min',
      triggerTime: '2023-03-01 18:51:31',
      id: '02',
    },
    {
      pipeline: 'E371 solution',
      buildId: '12',
      buildStatus: '3',
      buildDuration: '',
      triggerTime: '2023-03-01 18:51:31',
      id: '03',
    },
  ]);
  const columns = [
    {
      title: '标题',
      dataIndex: 'pipeline',
      ellipsis: true,
      render: (text: string) => <a style={{ color: '#108ee9' }}>{text}</a>,
    },
    {
      title: '构建ID',
      dataIndex: 'buildId',
      ellipsis: true,
      render: (text: string, record: any) => {
        return (
          <span>
            <span style={{ paddingRight: 8 }}>#{text}</span>
            {BuildEnum[record?.buildStatus]}
          </span>
        );
      },
    },
    {
      title: '构建时长',
      dataIndex: 'buildDuration',
      ellipsis: true,
    },
    {
      title: '触发时间',
      dataIndex: 'triggerTime',
      ellipsis: true,
    },
  ];

  useImperativeHandle(ref, () => ({
    testData: ['e'],
  }));

  return (
    <div>
      <Button type="primary" size="small">
        任务
      </Button>

      <Table
        rowKey={'id'}
        columns={columns}
        dataSource={taskList}
        style={{ marginTop: 8 }}
        size="small"
        pagination={false}
      />
    </div>
  );
};

export default forwardRef(Index as any);
