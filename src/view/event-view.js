import { createElement } from '../render';
import dayjs from 'dayjs';

function createEventTemplate(point, destinationArray, offersArray) {
  const { basePrice, type, destinationId, dateFrom, dateTo } =
    point;
  const pointTypeDestination = destinationArray.find(
    (destination) => destination.id === destinationId
  );

  const pointTypeOffer = offersArray.find((offer) => offer.type === point.type);
  const pointOfferSelected = pointTypeOffer.offer.filter((offer) =>
    point.offers.includes(offer.i)
  );

  const getOffersTemplate = (offers) =>
    `${offers
      .map(
        (offer) => ` <li class="event__offer">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
    </li>`
      )
      .join('')}`;

  return `<li class="trip-events__item">
  <div class="event">
  <time class="event__date" datetime="${dayjs(dateFrom).format('YYYY-MM-DD')}">${dayjs(dateFrom).format(
  'MMM D'
)}</time>
  <div class="event__type">
    <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
  </div>
  <h3 class="event__title">${type} ${pointTypeDestination.name}</h3>
  <div class="event__schedule">
    <p class="event__time">
      <time class="event__start-time" datetime="${dayjs(dateFrom).format('YYYY-MM-DDTHH:mm')}">${dayjs(
  dateFrom
).format('HH:mm')}</time>
      &mdash;
      <time class="event__end-time" datetime="${dayjs(dateTo).format('YYYY-MM-DDTHH:mm')}">${dayjs(
  dateTo
).format('HH:mm')}</time>
    </p>
  </div>
  <p class="event__price">
    &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
  </p>
  <h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers">
    ${getOffersTemplate(pointOfferSelected)}
  </ul>
  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
</div>
</li>`;
}

export default class EventView {
  constructor(point, destinationArray, offersArray) {
    this.point = point;
    this.destinationArray = destinationArray;
    this.offersArray = offersArray;
  }

  getTemplate() {
    return createEventTemplate(
      this.point,
      this.destinationArray,
      this.offersArray
    );
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
