import {createTripInfo} from './view/trip-info.js';
import {createTripPrice} from './view/trip-price.js';
import {createMenu} from './view/menu.js';
import {createFilters} from './view/filters.js';
import {createSortingAndList} from './view/sorting-and-list.js';
import {createWaypointForm} from './view/waypoint-form.js';
import {createWaypoint} from './view/waypoint.js';
import {generateWaypointDataArray} from './mock/waypoint-data.js';
import {WAYPOINT_OBJECTS_COUNT} from './constants.js';
import {render} from './utils.js';

const tripInfoContainer = document.querySelector('.trip-main');
const tripMenuContainer = document.querySelector('.trip-controls__navigation');
const tripFiltersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const waypointDataArray = generateWaypointDataArray();

render(tripInfoContainer, createTripInfo(waypointDataArray), 'afterbegin');

const tripPriceContainer = document.querySelector('.trip-info');

render(tripPriceContainer, createTripPrice(waypointDataArray), 'beforeend');

render(tripMenuContainer, createMenu(), 'beforeend');

render(tripFiltersContainer, createFilters(), 'beforeend');

render(tripEventsContainer, createSortingAndList(), 'beforeend');

const tripWaypointContainer = document.querySelector('.trip-events__list');

render(tripWaypointContainer, createWaypointForm(waypointDataArray[0]), 'beforeend');

for (let i = 1; i < WAYPOINT_OBJECTS_COUNT; i++) {
  render(tripWaypointContainer, createWaypoint(waypointDataArray, i), 'beforeend');
}
