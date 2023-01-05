import { TYPES } from '../const.js';
import { generateOffer } from '../mock/offers-mock.js';

const offersArray = [];
TYPES.forEach((type)=>{
  offersArray.push(generateOffer(type));
});

export default class OffersModel {
  #offers = offersArray;
  get offers() {return this.#offers;}
}
