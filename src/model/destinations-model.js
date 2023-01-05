import { generateDestination } from '../mock/destination-mock.js';
import { COUNT } from '../const.js';

export default class DestinationsModel {
  #destinations = Array.from({ length: COUNT.DESTINATIONS }, (value, key) =>
    generateDestination(key + 1)
  );

  get destinations() {return this.#destinations;}
}
