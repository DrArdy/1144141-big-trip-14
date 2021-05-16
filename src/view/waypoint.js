import dayjs from 'dayjs';
import {HOURS_IN_DAY, MINUTES_IN_DAY, MINUTES_IN_HOUR} from '../constants.js';


const createWaypoint = (waypointDataArray, index) => {
  const waypointData = waypointDataArray[index];
  const dayDiff = dayjs(waypointData.dateTo).diff(dayjs(waypointData.dateFrom), 'day');
  const hourDiff = dayjs(waypointData.dateTo).diff(dayjs(waypointData.dateFrom), 'hour') - dayDiff * HOURS_IN_DAY;
  const minuteDiff = dayjs(waypointData.dateTo).diff(dayjs(waypointData.dateFrom), 'minute') - hourDiff * MINUTES_IN_HOUR - dayDiff * MINUTES_IN_DAY;
  const dateFromYearMonthDay = dayjs(waypointData.dateFrom).format('YYYY/MM/DD');
  const dateFromHourMinute = dayjs(waypointData.dateFrom).format('HH:mm');
  const dateToYearMonthDay = dayjs(waypointData.dateTo).format('YYYY/MM/DD');
  const dateToHourMinute = dayjs(waypointData.dateTo).format('HH:mm');

  const renderOffersList = () => {
    const offersInfo = waypointData.offers['offersInfo'];

    if (offersInfo.length !== 0) {
      const offersList = new Array();

      for (const offer of offersInfo) {
        if (offer.checked) {
          offersList.push(`<li class="event__offer">
          <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
          </li>`);
        }
        else continue;
      }

      return offersList.join('');
    }
    else {
      return '';
    }
  };

  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime=${dateFromYearMonthDay}>${dayjs(waypointData.dateFrom).format('MMM D').toUpperCase()}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${waypointData.type.toLowerCase()}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${waypointData.type} ${waypointData.city}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${dateFromYearMonthDay}T${dateFromHourMinute}">${dateFromHourMinute}</time>
        &mdash;
        <time class="event__end-time" datetime="${dateToYearMonthDay}T${dateToHourMinute}">${dateToHourMinute}</time>
      </p>
      <p class="event__duration">${dayDiff > 0 ? dayDiff + 'D ' : ''}${hourDiff > 0 ? hourDiff + 'H ' : ''}${minuteDiff}M</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${waypointData.basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
    ${renderOffersList()}
    </ul>
    <button class="event__favorite-btn ${waypointData.isFavourite ? 'event__favorite-btn--active' : ''}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
  </li>`;
};

export {createWaypoint};
