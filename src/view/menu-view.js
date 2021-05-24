import {AbstractView} from './abstract-view.js';

const createMenuTemplate = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
    <a class="trip-tabs__btn" href="#">Stats</a>
  </nav>`;
};

class MenuView extends AbstractView {
  getTemplate() {
    return createMenuTemplate();
  }
}

export {MenuView};
