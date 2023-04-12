/**
 * @author quan2.zhang
 * @description 日期范围方法
 */
import moment from 'dayjs';

const WEEK_ENUMS = {
  0: '日',
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
};
export const dayUnit = 24 * 60 * 60 * 1000;
// 获取时间段间隔天数 [start, end]  'YYYY-MM-DD'
/**
 * @param { [start, end] } 'YYYY-MM-DD' 'YYYY-MM-DD'
 * @returns {day, week, weekOri, dayOri}[]
 */
export const getDistanceDays = ([start, end]) => {
  if (!start || !end) return [];
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  const daysArray = [];
  let curDay = startTime;
  do {
    const obj = {
      day: moment(curDay).format('DD'),
      week: WEEK_ENUMS[new Date(curDay).getDay()],
      weekOri: new Date(curDay).getDay(),
      dayOri: curDay,
    };
    daysArray.push(obj);
    curDay += dayUnit;
  } while (curDay <= endTime);
  return daysArray;
};

// 获取时间间隔
const dayDistance = (days) => {
  const dayTimeStamp = new Date().getTime() + dayUnit * days;
  return dayTimeStamp;
};

// 获取当前天所在的一周
export const getDaysStartAndEnd = (days = 7) => {
  const CUR_WEEK = new Date().getDay() === 0 ? 7 : new Date().getDay();
  const start = moment(dayDistance(1 - CUR_WEEK)).format('YYYY-MM-DD');
  const end = moment(dayDistance(days - CUR_WEEK)).format('YYYY-MM-DD');
  return [start, end];
};

// 获取过去7天
export const getOneWeekDays = () => {
  const start = moment().subtract(6, 'days').format('YYYY-MM-DD');
  const end = moment().format('YYYY-MM-DD');
  return [start, end];
};

// 获取当前天向前/向后 日期区间
export const getGoDistance = (data = new Date().getTime(), distance = 6) => {
  const end = moment(data).add(distance, 'day').format('YYYY-MM-DD');
  const start = moment(data).format('YYYY-MM-DD');
  return [start, end];
};
export const getBackDistance = (data = new Date().getTime(), distance = 6) => {
  const start = moment(data).subtract(distance, 'day').format('YYYY-MM-DD');
  const end = moment(data).format('YYYY-MM-DD');
  return [start, end];
};
