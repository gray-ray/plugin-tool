import { PageContainer } from '@ant-design/pro-components';
import { history, useModel } from 'umi';
import { Card, Button } from 'antd';
import styls from './index.less';
// @ts-ignore
import modules from './modules';
const { moduleObject } = modules;

const Index = () => {
  const { sortList } = useModel('platformSort');

  const handleClick = (e: any) => {
    console.log(e);
  };

  // TODO: 支不同宽度模块排序

  /** 子模块暴露出数据,  */
  // NOTE: 模块初始化时会会调用
  // TODO: 如何在模块拖动时不触发改事件
  const getModuleExport = (data: any) => {
    // console.log(data);
  };
  const extra = <div onClick={handleClick}>extra</div>;

  const routePlatformSetting = () => {
    history.push('/platform/setting');
  };

  return (
    <PageContainer
      title="研发工作台"
      extra={
        <Button size="small" type="primary" onClick={routePlatformSetting}>
          配置工作台
        </Button>
      }
    >
      <div className={styls.worksWrap}>
        {sortList?.map((item) => {
          const CurrentNode: PlatformApi.ModuleProp = moduleObject[item];
          return (
            <Card
              id={item}
              title={CurrentNode?.cardSetting?.title}
              key={item}
              extra={CurrentNode?.extra ?? extra}
            >
              <CurrentNode.default moduleClick={handleClick} ref={getModuleExport} />
            </Card>
          );
        })}
      </div>
    </PageContainer>
  );
};

export default Index;
