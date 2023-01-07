import { render } from './framework/render.js';
import FilterEventsView from './view/filter-events-view.js';
import EventsPresenter from './presenter/events-presenter.js';
import DestinationsModel from './model/destinations-model.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';

const destinationsModel = new DestinationsModel();
const pointsModel = new PointsModel();
const offersModel = new OffersModel();

const siteHeaderElement = document.querySelector('.page-header');
const filterControlsHeaderElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const tripEventsContainer = siteMainElement.querySelector('.trip-events');

render(new FilterEventsView(), filterControlsHeaderElement);
const eventsPresenter = new EventsPresenter({eventsContainer: tripEventsContainer, pointsModel, destinationsModel, offersModel});
eventsPresenter.init();
