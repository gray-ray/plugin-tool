import { useState, useCallback, useEffect } from 'react';
import modules from '@/pages/Platform/modules';

const { moduleList } = modules;

export default () => {
  const [sortList, setSortList] = useState<string[]>([]);
  const DEV = [
    'Todo',
    'KnowledgeBase',
    'WorkItem',
    'Codebase',
    'MyProject',
    'RiskAndProblem',
    'MyPipeline',
  ];
  const MANAGER = [
    'ProjectHealth',
    'ProjectProblem',
    'ProjectRisk',
    'ProjectProblemCount',
    'ProjectRiskCount',
    'ProjectBudget',
  ];

  const setInitialList = useCallback((initialState: any) => {
    setSortList(() => {
      return initialState ?? [];
    });
  }, []);

  // useEffect(() => {
  //   const list = (moduleList as PlatformApi.ModuleProp[])?.map((item) => item.name);
  //   console.log(list);

  //   // MOCK 默认排序
  //   setSortList(list);
  // }, []);

  return { sortList, setSortList, setInitialList, DEV, MANAGER };
};
