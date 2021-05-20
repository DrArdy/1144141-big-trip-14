import {TripInfoView} from './view/trip-info-view.js';
import {TripPriceView} from './view/trip-price-view.js';
import {MenuView} from './view/menu-view.js';
import {FiltersView} from './view/filters-view.js';
import {SortingView} from './view/sorting-view.js';
import {ListView} from './view/list-view.js';
import {WaypointFormView} from './view/waypoint-form-view.js';
import {WaypointView} from './view/waypoint-view.js';
import {generateWaypointDataArray} from './mock/waypoint-data.js';
import {WAYPOINT_OBJECTS_COUNT} from './constants.js';
import {render, RenderPosition} from './utils.js';

const tripInfoContainer = document.querySelector('.trip-main');
const tripMenuContainer = document.querySelector('.trip-controls__navigation');
const tripFiltersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const waypointDataArray = generateWaypointDataArray();
const tripInfoComponent = new TripInfoView(waypointDataArray);
const sortingComponent = new SortingView();
const listComponent = new ListView();

const renderWaypoint = (waypointListElement, waypointData) => {
  const waypointComponent = new WaypointView(waypointData);
  const waypointFormComponent = new WaypointFormView(waypointData);

  const replaceFormToCard = () => {
    waypointListElement.replaceChild(waypointComponent.getElement(), waypointFormComponent.getElement());
  };

  const replaceCardToForm = () => {
    waypointListElement.replaceChild(waypointFormComponent.getElement(), waypointComponent.getElement());

    tripEventsContainer.querySelector('.event--edit').addEventListener('submit', (event) => {
      event.preventDefault();
      replaceFormToCard();
    }, {once: true});
  };

  render(waypointListElement, waypointComponent.getElement(), RenderPosition.BEFOREEND);

  waypointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceCardToForm();
  });
};

render(tripInfoContainer, tripInfoComponent.getElement(), RenderPosition.AFTERBEGIN);

render(tripInfoComponent.getElement(), new TripPriceView(waypointDataArray).getElement(), RenderPosition.BEFOREEND);

render(tripMenuContainer, new MenuView().getElement(), RenderPosition.BEFOREEND);

render(tripFiltersContainer, new FiltersView().getElement(), RenderPosition.BEFOREEND);

render(tripEventsContainer, sortingComponent.getElement(), RenderPosition.BEFOREEND);

render(sortingComponent.getElement(), listComponent.getElement(), RenderPosition.BEFOREEND);

for (let i = 0; i < WAYPOINT_OBJECTS_COUNT; i++) {
  renderWaypoint(listComponent.getElement(), waypointDataArray[i]);
}
