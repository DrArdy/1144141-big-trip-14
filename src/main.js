import {generateWaypointDataArray} from './mock/waypoint-data.js';
import {TripPresenter} from './presenter/trip-presenter.js';
import {WaypointsModel} from './model/waypoints-model.js';
import {FilterModel} from './model/filter-model';
import {FilterPresenter} from './presenter/filter-presenter.js';
const tripEventsContainer = document.querySelector('.trip-events');
const tripFiltersContainer = document.querySelector('.trip-controls__filters');
const waypointDataArray = generateWaypointDataArray();

const waypointsModel = new WaypointsModel();
waypointsModel.setWaypoints(waypointDataArray);
const filterModel = new FilterModel();
const tripPresenter = new TripPresenter(tripEventsContainer, waypointsModel, filterModel);
const filterPresenter = new FilterPresenter(tripFiltersContainer, filterModel, waypointsModel);

filterPresenter.init();
tripPresenter.init();
