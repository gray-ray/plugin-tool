import { PageContainer } from '@ant-design/pro-components';
import { LeftOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { history, useModel } from 'umi';
import React, { useState } from 'react';
import { Card, Button, Select, Checkbox, Row, Col } from 'antd';
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
  const [selectedList, setSelectedList] = useState(sortList);
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
      ghost={true}
      backIcon={<LeftOutlined />}
      breadcrumbRender={false}
      extra={
        <Button size="small" type="primary">
          新建工作台
        </Button>
      }
    >
      <div className={styls.pageWrap}>
        <div className={styls.workList}>
          <h4>选择工作台</h4>
          <Select
            size="small"
            style={{ width: '100%', marginTop: 20 }}
            allowClear
            placeholder="请输入"
            options={sortList?.map((item) => ({
              label: moduleObject?.[item]?.title,
              value: item,
            }))}
          />
          {/* 列表 */}
          <div style={{ paddingTop: 20 }}>
            <Checkbox.Group defaultValue={selectedList}>
              <Row>
                {sortList?.map((item, index) => {
                  return (
                    <Col
                      span={24}
                      key={item}
                      style={{ height: '40px', lineHeight: '40px', verticalAlign: 'center' }}
                      draggable={true}
                      onDragStart={(e) => dragEvent(e, item, index)}
                      onDragOver={(e) => dragEvent(e, item, index)}
                      onDragEnd={(e) => dragEvent(e, item, index)}
                    >
                      <Checkbox value={item}>{moduleObject?.[item]?.title}</Checkbox>
                    </Col>
                  );
                })}
              </Row>
            </Checkbox.Group>
          </div>
        </div>
        <Row className={styls.worksWrap} gutter={[16, 16]}>
          {sortList?.map((item, index) => {
            const CurrentNode: PlatformApi.ModuleProp = moduleObject[item];
            const { title, isFull = false } = CurrentNode;
            return (
              <Col
                key={item}
                span={isFull ? 24 : 12}
                id={item}
                draggable={true}
                onDragStart={(e) => dragEvent(e, item, index)}
                onDragOver={(e) => dragEvent(e, item, index)}
                onDragEnd={(e) => dragEvent(e, item, index)}
              >
                <Card
                  title={title}
                  extra={<MinusCircleOutlined style={{ cursor: 'pointer', color: 'red' }} />}
                />
              </Col>
            );
          })}
        </Row>
      </div>
    </PageContainer>
  );
};

export default Index;
