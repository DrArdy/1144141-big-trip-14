import {AbstractView} from './abstract-view.js';

const createEmptyListTemplate = () => {
  return '<p class="trip-events__msg">Click New Event to create your first point</p>';
};

class EmptyListView extends AbstractView {
  getTemplate() {
    return createEmptyListTemplate();
  }
}

export {EmptyListView};
