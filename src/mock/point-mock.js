import { getRandomInteger, getRandomElementOfArray } from '../utils.js';
import dayjs from 'dayjs';
import { TYPES, PRICE, COUNT } from '../const.js';

const generateEnd = (start, type) => {
  let currentEnd;
  switch (type) {
    case 'taxi': {
      currentEnd = start
        .add(getRandomInteger(1, 10), 'hour')
        .add(getRandomInteger(1, 59), 'minute');
      return currentEnd;
    }
    case 'bus': {
      currentEnd = start
        .add(getRandomInteger(1, 10), 'hour')
        .add(getRandomInteger(1, 59), 'minute');
      return currentEnd;
    }
    case 'train': {
      currentEnd = start
        .add(getRandomInteger(1, 23), 'hour')
        .add(getRandomInteger(1, 59), 'minute');
      return currentEnd;
    }
    case 'ship': {
      currentEnd = start
        .add(getRandomInteger(1, 2), 'day')
        .add(getRandomInteger(1, 10), 'hour');
      return currentEnd;
    }
    case 'drive': {
      currentEnd = start
        .add(getRandomInteger(1, 15), 'hour')
        .add(getRandomInteger(1, 59), 'minute');
      return currentEnd;
    }
    case 'flight': {
      currentEnd = start
        .add(getRandomInteger(1, 23), 'hour')
        .add(getRandomInteger(1, 59), 'minute');
      return currentEnd;
    }
    case 'check-in': {
      currentEnd = start
        .add(getRandomInteger(1, 3), 'day')
        .add(getRandomInteger(1, 10), 'hour');
      return currentEnd;
    }
    case 'sightseeing': {
      currentEnd = start
        .add(getRandomInteger(1, 10), 'hour')
        .add(getRandomInteger(1, 59), 'minute');
      return currentEnd;
    }
    case 'restaurant': {
      currentEnd = start
        .add(getRandomInteger(1, 6), 'hour')
        .add(getRandomInteger(1, 59), 'minute');
      return currentEnd;
    }
    default:
      currentEnd = start.add(getRandomInteger(4, 10), 'day');
  }
  return currentEnd;
};

const dateFromTo = {
  start: dayjs(),
  getStart() {
    return this.start;
  },
  getEnd(type) {
    const currentEnd = generateEnd(this.start, type);
    this.start = currentEnd.add(getRandomInteger(4, 10), 'hour');
    return currentEnd;
  },
};

const generatePoint = (randomType = getRandomElementOfArray(TYPES)) => ({
  basePrice: getRandomInteger(PRICE.MIN, PRICE.MAX),
  type: randomType,
  destinationId: getRandomInteger(1, COUNT.DESTINATIONS),
  offers: [1, 3],
  dateFrom: dateFromTo.getStart(),
  dateTo: dateFromTo.getEnd(randomType),
});

export { generatePoint };
