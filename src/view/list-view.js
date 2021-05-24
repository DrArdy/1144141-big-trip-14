import {AbstractView} from './abstract-view.js';

const createListTemplate = () => {
  return '<ul class="trip-events__list"></ul>';
};

class ListView extends AbstractView {
  getTemplate() {
    return createListTemplate();
  }
}

export {ListView};
