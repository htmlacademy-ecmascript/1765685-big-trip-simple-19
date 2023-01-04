import { getRandomInteger, getRandomElementOfArray } from '../utils.js';
import { TITLES, PRICE_OFFER } from '../const.js';

const generateOffersByType = () => {
  const arrayOffersByType = [];
  for (let i = 1; i <= 7; i++) {
    const offerByType = {
      i,
      title: getRandomElementOfArray(TITLES),
      price: getRandomInteger(PRICE_OFFER.MIN, PRICE_OFFER.MAX),
    };
    arrayOffersByType.push(offerByType);
  }
  return arrayOffersByType;
};

const generateOffer = (type) => ({
  type,
  offer: generateOffersByType(),
});

export { generateOffer };
