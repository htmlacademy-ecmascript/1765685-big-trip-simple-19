import { generatePoint } from '../mock/point-mock.js';
import { COUNT } from '../const.js';

export default class PointsModel {
  events = Array.from({ length: COUNT.POINTS }, generatePoint);
  getEvents() {return this.events;}
}
