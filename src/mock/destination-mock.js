import { getRandomInteger, getRandomElementOfArray } from '../utils.js';
import { CITIES, DESCRIPTIONS,} from '../const.js';

const getPicturesWithDescription = () => ({
  src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 10)}`,
  descript: getRandomElementOfArray(DESCRIPTIONS),
});

const getLinksToImage = () =>
  Array.from({ length: 5 }, getPicturesWithDescription);

const generateDestination = (id) => ({
  id,
  description: getRandomElementOfArray(DESCRIPTIONS),
  name: getRandomElementOfArray(CITIES),
  pictures: getLinksToImage(),
});

export{generateDestination};
