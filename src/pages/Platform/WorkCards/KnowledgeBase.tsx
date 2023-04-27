import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Dropdown, Table } from 'antd';
import type { MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';

export const title = '知识库';

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
      label: '我收藏的',
      key: '1',
    },
    {
      label: '我输出的',
      key: '2',
    },
  ];

  const [list, setList] = useState(items);

  return (
    <Dropdown menu={{ items: list, onClick }} key="dropdown">
      <span onClick={(e) => e.preventDefault()} style={{ fontSize: '14px', paddingLeft: '8px' }}>
        <span>
          我收藏的 <DownOutlined />
        </span>
      </span>
    </Dropdown>
  );
};
/** Card 卡片 extra */
// export const Extra = () => {
//   return <div>extra</div>;
// };

/** Card 卡片 是否width : 100% */

// export const isFull = true;

const Index = (_, ref: any) => {
  // console.log(getDaysStartAndEnd(), getDistanceDays(getDaysStartAndEnd()));

  const [taskList, setTaskList] = useState([
    {
      title: 'E04/project',
      owner: '张三',
      updateTime: '2023-03-01 18:31:31',
      id: '01',
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
      title: '作者',
      dataIndex: 'owner',
      ellipsis: true,
    },
    {
      title: '时间',
      dataIndex: 'updateTime',
      ellipsis: true,
    },
  ];

  useImperativeHandle(ref, () => ({
    testData: ['d'],
  }));
  return (
    <div>
      <Table
        rowKey={'id'}
        showHeader={false}
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
