import dayjs from 'dayjs';
import {WAYPOINT_TYPES, BLANK_WAYPOINT} from '../constants.js';
import {createElement, checkOffersExistance} from '../utils.js';

const createWaypointFormTemplate = (waypointData) => {
  const {type, city, offers, info, dateFrom, dateTo, basePrice} = waypointData;

  const renderEventTypes = (currentType) => {

    const eventTypes = new Array();

    for (const type of WAYPOINT_TYPES) {
      eventTypes.push(`<div class="event__type-item">
      <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}" ${currentType === type ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
      </div>`);
    }

    return eventTypes.join('');
  };

  const renderOffersList = () => {
    const offersList = new Array();

    for (const offer of offers['offersInfo']) {
      const offerIdentificator = offer.title.split(' ').pop().toLowerCase();

      offersList.push(`<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerIdentificator}-1" type="checkbox" name="event-offer-${offerIdentificator}" ${offers['offersInfo'].length !== 0 && type !== '' && offer.checked ? 'checked' : ''}>
      <label class="event__offer-label" for="event-offer-${offerIdentificator}-1">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
      </div>`);
    }

    return offersList.join('');
  };

  const renderPhotos = () => {
    const photosList = new Array();

    for (const photo of info['photos']) {
      photosList.push(`<img class="event__photo" src=${photo} alt="Event photo">`);
    }
    return photosList.join('');
  };

  return `<form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${renderEventTypes(type)}
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city !== '' ? city : ''}" list="destination-list-1">
      <datalist id="destination-list-1">
        <option value="Amsterdam"></option>
        <option value="Geneva"></option>
        <option value="Chamonix"></option>
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom !== '' ? dayjs(dateFrom).format('YY/MM/DD HH:mm') : `${dayjs().format('YY/MM/DD')} 00:00`}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo !== '' ? dayjs(dateTo).format('YY/MM/DD HH:mm') : `${dayjs().format('YY/MM/DD')} 00:00`}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice !== '' ? basePrice : ''}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    ${city !== '' ? '<button class="event__reset-btn" type="reset">Delete</button> <button class="event__rollup-btn" type="button"> <span class="visually-hidden">Open event</span> </button>' : ' <button class="event__reset-btn" type="reset">Cancel</button>'}
  </header>
  <section class="event__details">

    ${checkOffersExistance(offers) ? `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${renderOffersList()}
    </div>
    </section>` : '' }

    ${city !== '' ? `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${info.description}</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${renderPhotos()}
      </div>
    </div>
    </section>` : ''}

  </section>
  </form>`;
};

class WaypointFormView {
  constructor(waypointData = BLANK_WAYPOINT) {
    this._waypointData = waypointData;
    this._element = null;
  }

  getTemplate() {
    return createWaypointFormTemplate(this._waypointData);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export {WaypointFormView};
