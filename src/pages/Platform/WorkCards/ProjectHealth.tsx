import { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import { Select, Form, FormInstance, Table } from 'antd';

/**
 * @description 必须   1. 使用forwardRef 需要 hasForwardRef https://zh-hans.reactjs.org/reference/react/forwardRef#forwardref
 * @description forwardRef returns a React component that you can render in JSX.
 * @description  Unlike React components defined as plain functions, a component returned by forwardRef is also able to receive a ref prop.
 */

export const title = '项目健康度（效率、质量）';

/** Card 卡片 是否width : 100% */

export const isFull = true;

const { Option } = Select;

type ProjectItemProp = {
  projectName: string;
  score: string;
  completionRate: string;
  milestoneDeviation: string;
  baselineDeviation: string;
  demandRate: string;
  DefectResolutionRate: string;
  DefectClosureRate: string;
};

const ProjectHealth = (props: any, ref: any) => {
  const [confirmRef] = Form.useForm<FormInstance>();
  const [projectList, setProjectList] = useState<{ id: string; name: string }[]>([
    { id: 'E371', name: 'E371' },
    { id: 'DX11', name: 'DX11' },
    { id: 'Lambda', name: 'Lambda' },
  ]);
  const [dataSource, setDataSource] = useState<ProjectItemProp[]>([]);

  const getList = async (params?: { project: number }) => {
    const mock: Record<string, ProjectItemProp[]> = {
      E371: [
        {
          projectName: 'E371',
          score: '89',
          completionRate: '30',
          milestoneDeviation: '21',
          baselineDeviation: '',
          demandRate: '',
          DefectResolutionRate: '',
          DefectClosureRate: '',
        },
      ],
      DX11: [
        {
          projectName: 'DX11',
          score: '',
          completionRate: '',
          milestoneDeviation: '',
          baselineDeviation: '',
          demandRate: '',
          DefectResolutionRate: '',
          DefectClosureRate: '',
        },
      ],
      Lambda: [
        {
          projectName: 'Lambda',
          score: '',
          completionRate: '',
          milestoneDeviation: '',
          baselineDeviation: '',
          demandRate: '',
          DefectResolutionRate: '',
          DefectClosureRate: '',
        },
      ],
    };
    if (params?.project) {
      setDataSource(mock[params.project]);
    } else {
      setDataSource([...mock.E371, ...mock.DX11, ...mock.Lambda]);
    }
  };

  const filterChange = (changedValues: { project: number } | undefined) => {
    getList(changedValues);
  };

  const columns = [
    {
      title: '项目名称',
      dataIndex: 'projectName',
      key: 'projectName',
      ellipsis: true,
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: '得分',
      dataIndex: 'score',
      key: 'score',
      ellipsis: true,
    },
    {
      title: '任务完成率',
      dataIndex: 'completionRate',
      key: 'completionRate',
      ellipsis: true,
    },
    {
      title: '里程碑偏差',
      dataIndex: 'milestoneDeviation',
      key: 'milestoneDeviation',
      ellipsis: true,
    },
    {
      title: '基准计划偏差',
      dataIndex: 'baselineDeviation',
      key: 'baselineDeviation',
      ellipsis: true,
    },
    {
      title: '需求按时交付率',
      dataIndex: 'demandRate',
      key: 'demandRate',
      ellipsis: true,
    },
    {
      title: '缺陷解决率',
      dataIndex: 'DefectResolutionRate',
      key: 'DefectResolutionRate',
      ellipsis: true,
    },
    {
      title: '缺陷关闭率',
      dataIndex: 'DefectClosureRate',
      key: 'DefectClosureRate',
      ellipsis: true,
    },
  ];

  useImperativeHandle(ref, () => ({
    testData: ['a'],
  }));

  useEffect(() => {
    getList();

    return () => {};
  }, []);

  return (
    <div>
      <Form form={confirmRef} onValuesChange={filterChange}>
        <Form.Item label="项目" name="project">
          <Select style={{ width: '240px' }} placeholder="请选择项目" allowClear={true}>
            {projectList?.map((project) => {
              const { id, name } = project;
              return (
                <Option value={id} label={name} key={id}>
                  {name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
      <Table
        size="small"
        rowKey="projectName"
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      />
    </div>
  );
};

export default forwardRef(ProjectHealth as any);
