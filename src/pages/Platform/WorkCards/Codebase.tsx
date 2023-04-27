import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Dropdown, Table, Input } from 'antd';
import type { MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';

export const title = '代码仓库';

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
      label: '我参与的',
      key: '2',
    },
  ];

  const [list, setList] = useState(items);

  return (
    <>
      <Input.Search
        size="small"
        style={{ width: '120px', marginRight: 8, marginLeft: 8 }}
        allowClear
        placeholder="请输入"
      />
      <Dropdown menu={{ items: list, onClick }} key="dropdown">
        <span onClick={(e) => e.preventDefault()} style={{ fontSize: '14px', paddingLeft: '8px' }}>
          <span>
            我收藏的 <DownOutlined />
          </span>
        </span>
      </Dropdown>
    </>
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
      site: 'E04/saftyos/project',
      project: 'DX11，XE08',
      platform: 'E04平台',
      id: '01',
    },
  ]);
  const columns = [
    {
      title: '仓库',
      dataIndex: 'site',
      ellipsis: true,
    },
    {
      title: '项目',
      dataIndex: 'project',
      ellipsis: true,
    },
    {
      title: '平台',
      dataIndex: 'platform',
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
