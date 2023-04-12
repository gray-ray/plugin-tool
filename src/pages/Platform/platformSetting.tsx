import { PageContainer } from '@ant-design/pro-components';
import { LeftOutlined } from '@ant-design/icons';
import { history, useModel } from 'umi';
import React, { useState } from 'react';
import { Card, Button } from 'antd';
import styls from './index.less';
import modules from './modules';

const { moduleObject } = modules;

const useDrag = () => {
  const { sortList, setSortList } = useModel('platformSort');
  const [source, setSource] = useState('');
  const [target, setTarget] = useState('');
  const [sourceIndex, setSourceIndex] = useState<number>(-1);
  const [targetIndex, setTargetIndex] = useState<number>(-1);

  const dragEvent = (event: React.DragEvent, key: string, index: number) => {
    const eType = event?.type;
    // TODO: 拖拽效果
    // const ele = document.getElementById(key);
    // ele?.classList.add(`${styls.movingItem}`);
    if (eType === 'dragstart') {
      setSource(key);
      setSourceIndex(index);
    }
    if (eType === 'dragover') {
      if (key === target) return;
      setTarget(key);
      setTargetIndex(index);
    }

    if (eType !== 'dragend' || target === source) return;
    const copy = [...sortList];
    [copy[sourceIndex], copy[targetIndex]] = [copy[targetIndex], copy[sourceIndex]];
    setSortList(copy);
  };

  return {
    dragEvent,
  };
};

const Index = () => {
  const { sortList } = useModel('platformSort');
  const { dragEvent } = useDrag();

  const handleBack = () => {
    history.push('/platform');
  };

  return (
    <PageContainer
      title={
        <span style={{ cursor: 'pointer' }} onClick={handleBack}>
          <LeftOutlined />
          配置工作台
        </span>
      }
      backIcon={<LeftOutlined />}
      breadcrumbRender={false}
      extra={
        <Button size="small" type="primary">
          新建工作台
        </Button>
      }
    >
      <div className={styls.pageWrap}>
        <div className={styls.workList}></div>
        <div className={styls.worksWrap}>
          {(sortList as string[])?.map((item, index) => {
            const CurrentNode = moduleObject[item];
            return (
              <Card
                id={item}
                draggable={true}
                onDragStart={(e) => dragEvent(e, item, index)}
                onDragOver={(e) => dragEvent(e, item, index)}
                onDragEnd={(e) => dragEvent(e, item, index)}
                title={CurrentNode?.cardSetting?.title}
                key={item}
              />
            );
          })}
        </div>
      </div>
    </PageContainer>
  );
};

export default Index;
