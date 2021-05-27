import {generateWaypointDataArray} from './mock/waypoint-data.js';
import {TripPresenter} from './presenter/trip-presenter.js';

const tripEventsContainer = document.querySelector('.trip-events');
const waypointDataArray = generateWaypointDataArray();
const tripComponent = new TripPresenter(tripEventsContainer);

tripComponent.init(waypointDataArray);
