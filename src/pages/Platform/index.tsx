import { PageContainer } from '@ant-design/pro-components';
import { history, useModel } from 'umi';
import { useEffect } from 'react';
import { Card, Button, Row, Col, Select } from 'antd';
import styls from './index.less';
// @ts-ignore
import modules from './modules';
import { useState } from 'react';
const { moduleObject } = modules;

const Index = () => {
  const { sortList, DEV, MANAGER, setInitialList } = useModel('platformSort');
  const [extraProps, setExtraProps] = useState({});

  const handleClick = (e: any) => {
    console.log(e);
  };

  // TODO: 支不同宽度模块排序
  /** 子模块暴露出数据,  */
  // NOTE: 模块初始化时会会调用
  // TODO: 如何在模块拖动时不触发改事件
  // TODO: 每个模块如何刷新
  const getModuleExport = (data: any) => {
    // console.log(data);
  };

  /** Card filter fn */
  const handleFilterFn = (data?: any) => {
    console.log(data);
  };
  /** Card extra fn */
  const handleExtraFn = (data?: any) => {
    console.log(data);
    setExtraProps(data);
  };

  const routePlatformSetting = () => {
    history.push('/platform/setting');
  };

  const handleRoleChange = (key: string) => {
    const mp = {
      dev: DEV,
      manager: MANAGER,
    };
    setInitialList(mp[key]);
  };
  const PageTitle = [
    <Select key="title" defaultValue={'dev'} onChange={handleRoleChange}>
      <Select.Option value={'dev'}>研发工作台</Select.Option>
      <Select.Option value={'manager'}>管理工作台</Select.Option>
    </Select>,
  ];

  useEffect(() => {
    setInitialList(DEV);
  }, []);

  return (
    <PageContainer
      title={PageTitle}
      extra={
        <Button size="small" type="primary" onClick={routePlatformSetting}>
          配置工作台
        </Button>
      }
    >
      <Row className={styls.worksWrap} gutter={[16, 16]}>
        {sortList?.map((item) => {
          const CurrentNode: PlatformApi.ModuleProp = moduleObject[item];
          const { title, Filter, Extra, isFull = false } = CurrentNode;
          return (
            <Col key={item} span={isFull ? 24 : 12}>
              <Card
                title={Filter ? [title, <Filter key={item} filterFn={handleFilterFn} />] : title}
                extra={Extra ? <Extra extraFn={handleExtraFn} /> : ''}
              >
                <CurrentNode.default
                  moduleClick={handleClick}
                  ref={getModuleExport}
                  extraProps={extraProps}
                />
              </Card>
            </Col>
          );
        })}
      </Row>
    </PageContainer>
  );
};

export default Index;
