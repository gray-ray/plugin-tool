import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Dropdown, Button } from 'antd';
import type { MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';

export const title = '我的项目';
/** Card 卡片 过滤  */

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

const Index = (props: any, ref: any) => {
  const [list, setList] = useState([
    {
      id: 1,
      title: 'E371项目',
      url: '',
    },
    {
      id: 2,
      title: 'DX11项目',
      url: '',
    },
    {
      id: 3,
      title: 'XE08项目',
      url: '',
    },
    {
      id: 4,
      title: 'HY11项目',
      url: '',
    },
  ]);

  const handleClick = (e: any) => {
    props?.moduleClick?.('ddd');
  };

  useImperativeHandle(ref, () => ({
    testData: ['a'],
  }));
  return (
    <div>
      {list?.map((item) => {
        return (
          <div key={item?.id} style={{ margin: '8px 0' }}>
            <a href={item.url}>{item?.title}</a>
          </div>
        );
      })}
    </div>
  );
};

export default forwardRef(Index as any);
