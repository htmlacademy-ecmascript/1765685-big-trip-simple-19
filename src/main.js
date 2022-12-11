import { render } from './render.js';
import FilterEventsView from './view/filter-events-view.js';
import EventsPresenter from './presenter/events-presenter.js';

const siteHeaderElement = document.querySelector('.page-header');
const filterControlsHeaderElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const tripEventsContainer = siteMainElement.querySelector('.trip-events');

render(new FilterEventsView(), filterControlsHeaderElement);

const eventsPresenter = new EventsPresenter({eventsContainer: tripEventsContainer});
eventsPresenter.init();
