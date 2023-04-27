import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Dropdown, Space, Table, Button } from 'antd';
import type { MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';

export const title = '工作项';

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
      label: '我负责的',
      key: '1',
    },
  ];

  const [list, setList] = useState(items);

  return (
    <Dropdown menu={{ items: list, onClick }} key="dropdown">
      <span onClick={(e) => e.preventDefault()} style={{ fontSize: '14px', paddingLeft: '8px' }}>
        <span>
          我负责的 <DownOutlined />
        </span>
      </span>
    </Dropdown>
  );
};

/** Card 卡片 extra */
type ExtraProps = {
  extraFn: (data?: any) => void;
};
export const Extra: React.FC<ExtraProps> = (props) => {
  const onClick = (key: any) => {
    props?.extraFn?.(key);
  };
  return <div onClick={onClick}>全部</div>;
};

// ---

export const LevelEnum = {
  1: '高',
  2: '中',
  3: '低',
};
export const StatusEnum = {
  1: '进行中',
  2: '未开始',
};

const Index = (_, ref: any) => {
  const [taskList, setTaskList] = useState([
    {
      title: 'usb接口修改',
      level: '1',
      status: '1',
      project: 'Lambda项目',
      id: '01',
    },
    {
      title: '高德地图APP需求分解',
      level: '2',
      status: '2',
      project: 'Lambda项目',
      id: '02',
    },
  ]);
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      ellipsis: true,
      render: (text: string) => <a style={{ color: '#108ee9' }}>{text}</a>,
    },
    {
      title: '优先级',
      dataIndex: 'level',
      ellipsis: true,
      render: (text: string) => {
        return (
          <span>
            <span
              style={{
                display: 'inline-block',
                width: '6px',
                height: '6px',
                marginRight: '8px',
                verticalAlign: 'middle',
                background: '#1677ff',
                borderRadius: '50%',
              }}
            />
            {LevelEnum[text]}
          </span>
        );
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      ellipsis: true,
      render: (text: string) => {
        const items: MenuProps['items'] = [
          {
            label: '进行中',
            key: '1',
          },
          {
            label: '未开始',
            key: '2',
          },
        ];
        return (
          <Dropdown.Button icon={<DownOutlined />} menu={{ items }} type="primary" size="small">
            {StatusEnum[text]}
          </Dropdown.Button>
        );
      },
    },
    {
      title: '归属项目',
      dataIndex: 'project',
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
