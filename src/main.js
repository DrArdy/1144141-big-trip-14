import {TripInfoView} from './view/trip-info-view.js';
import {TripPriceView} from './view/trip-price-view.js';
import {MenuView} from './view/menu-view.js';
import {FiltersView} from './view/filters-view.js';
import {SortingView} from './view/sorting-view.js';
import {ListView} from './view/list-view.js';
import {EmptyListView} from './view/empty-list-view.js';
import {WaypointFormView} from './view/waypoint-form-view.js';
import {WaypointView} from './view/waypoint-view.js';
import {generateWaypointDataArray} from './mock/waypoint-data.js';
import {WAYPOINT_OBJECTS_COUNT} from './constants.js';
import {render, RenderPosition, replace} from './utils/render.js';

const tripInfoContainer = document.querySelector('.trip-main');
const tripMenuContainer = document.querySelector('.trip-controls__navigation');
const tripFiltersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const waypointDataArray = generateWaypointDataArray();
const tripInfoComponent = new TripInfoView(waypointDataArray);
const listComponent = new ListView();
const emptyListComponent = new EmptyListView();

const renderWaypoint = (waypointListElement, waypointData) => {
  const waypointComponent = new WaypointView(waypointData);
  const waypointFormComponent = new WaypointFormView(waypointData);

  const replaceFormToCard = () => {
    replace(waypointComponent, waypointFormComponent);
  };

  const replaceCardToForm = () => {
    replace(waypointFormComponent, waypointComponent);
  };

  const closeOnEscKeydown = (event) => {
    if (event.key === 'Escape' || event.key === 'Esc') {
      event.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', closeOnEscKeydown);
    }
  };

  waypointComponent.setEditClickHandler(() => {
    replaceCardToForm();
    document.addEventListener('keydown', closeOnEscKeydown);
  });

  waypointFormComponent.setFormHandlers(() => {
    replaceFormToCard();
    document.removeEventListener('keydown', closeOnEscKeydown);
  });

  render(waypointListElement, waypointComponent, RenderPosition.BEFOREEND);
};

render(tripInfoContainer, tripInfoComponent, RenderPosition.AFTERBEGIN);

render(tripInfoComponent, new TripPriceView(waypointDataArray), RenderPosition.BEFOREEND);

render(tripMenuContainer, new MenuView(), RenderPosition.BEFOREEND);

render(tripFiltersContainer, new FiltersView(), RenderPosition.BEFOREEND);

render(tripEventsContainer, new SortingView(), RenderPosition.BEFOREEND);

render(tripEventsContainer, emptyListComponent, RenderPosition.BEFOREEND);

for (let i = 0; i < WAYPOINT_OBJECTS_COUNT; i++) {
  if (i === 1) {
    tripEventsContainer.replaceChild(listComponent.getElement(), emptyListComponent.getElement());
  }
  renderWaypoint(listComponent.getElement(), waypointDataArray[i]);
}
