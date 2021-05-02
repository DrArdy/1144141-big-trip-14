import {createTripInfo} from './view/trip-info.js';
import {createTripPrice} from './view/trip-price.js';
import {createMenu} from './view/menu.js';
import {createFilters} from './view/filters.js';
import {createSortingAndList} from './view/sorting-and-list.js';
import {createEditingForm} from './view/editing-form.js';
import {createCreationForm} from './view/creation-form.js';
import {createWaypoint} from './view/waypoint.js';

const tripInfoContainer = document.querySelector('.trip-main');
const tripMenuContainer = document.querySelector('.trip-controls__navigation');
const tripFiltersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(tripInfoContainer, createTripInfo(), 'afterbegin');

const tripPriceContainer = document.querySelector('.trip-info');

render(tripPriceContainer, createTripPrice(), 'beforeend');

render(tripMenuContainer, createMenu(), 'beforeend');

render(tripFiltersContainer, createFilters(), 'beforeend');

render(tripEventsContainer, createSortingAndList(), 'beforeend');

const tripWaypointContainer = document.querySelector('.trip-events__list');

render(tripWaypointContainer, createEditingForm(), 'beforeend');

render(tripWaypointContainer, createCreationForm(), 'beforeend');

render(tripWaypointContainer, createWaypoint(), 'beforeend');

render(tripWaypointContainer, createWaypoint(), 'beforeend');

render(tripWaypointContainer, createWaypoint(), 'beforeend');
