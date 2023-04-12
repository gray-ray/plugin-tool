import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styls from '../todo.less';
import {
  getDaysStartAndEnd,
  getDistanceDays,
  getGoDistance,
  getBackDistance,
  dayUnit,
} from './date';

/** 日历组件 */
type CalenDarData = { day: string; week: string; weekOri: number; dayOri: number };
type CalenDarProp = {
  selectDate?: (item: CalenDarData) => void;
};
const Calendar: React.FC<CalenDarProp> = (props) => {
  const [dateList, setDateList] = useState<CalenDarData[]>([]);
  const curDay = dayjs().format('DD');
  const [target, setTarget] = useState<string>(curDay);

  const handleDateClick = (item: CalenDarData) => {
    setTarget(item.day);
    props?.selectDate?.(item);
  };

  const handleChange = (type: 'back' | 'go') => {
    const copy = [...dateList];
    const dateMp = {
      back: (copy?.shift() as CalenDarData)?.dayOri - dayUnit,
      go: (copy?.pop() as CalenDarData)?.dayOri + dayUnit,
    };
    const mp = {
      back: getBackDistance,
      go: getGoDistance,
    };
    const dateArr: [string, string] = mp[type](dateMp[type]);
    const newList = getDistanceDays(dateArr);
    setDateList(newList);
  };

  useEffect(() => {
    const initData: CalenDarData[] = getDistanceDays(getDaysStartAndEnd() as [string, string]);
    setDateList(initData);
  }, []);
  return (
    <div className={styls.calendarWrap}>
      <div className={styls.calendarBack}>
        <LeftOutlined onClick={() => handleChange('back')} />
      </div>
      <div className={styls.calendarCon}>
        {dateList?.map((item) => {
          return (
            <div
              key={item?.day}
              className={classNames(styls.dataItem, target === item?.day ? styls.activeDate : '')}
            >
              <div className={styls.dateItemWeek}>{item?.week}</div>
              <div className={styls.dateItemDay} onClick={() => handleDateClick(item)}>
                {item?.day === curDay ? '今' : item?.day}
              </div>
            </div>
          );
        })}
      </div>
      <div className={styls.calendarGo}>
        <RightOutlined onClick={() => handleChange('go')} />
      </div>
    </div>
  );
};

export default Calendar;
