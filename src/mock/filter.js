import { filter } from '../utils';

function generateFilter(points) {
  return Object.entries(filter).map(([filterName, filterPoints]) => ({
    name: filterName,
    isCount: filterPoints(points),
  }));
}

export { generateFilter };
