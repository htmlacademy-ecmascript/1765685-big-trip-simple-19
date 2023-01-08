import { FilterType } from './const';
import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomElementOfArray = (array)=> array[getRandomInteger(0, (array.length) - 1)];

const isPointFuture = (dateFrom)=>dateFrom && dayjs().isBefore(dateFrom);

const filter = {
  [FilterType.EVERYTHING]: (events)=> events.length,
  [FilterType.FUTURE]: (events)=> events.some((eventPoint)=>isPointFuture(eventPoint.dateFrom)),
};

export {getRandomInteger, getRandomElementOfArray, filter};
