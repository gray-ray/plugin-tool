import { useState, useCallback, useEffect } from 'react';
import modules from '@/pages/Platform/modules';

const { moduleList } = modules;

const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay || 0));

export default () => {
  const [sortList, setSortList] = useState<string[]>([]);

  const setInitialList = useCallback(async (initialState: any) => {
    setSortList(() => {
      return initialState ?? [];
    });
    await sleep(10);
  }, []);

  useEffect(() => {
    const list = (moduleList as PlatformApi.ModuleProp[])?.map((item) => item.name);
    setSortList(list);
  }, []);

  return { sortList, setSortList, setInitialList };
};
