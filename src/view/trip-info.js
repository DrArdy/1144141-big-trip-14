import dayjs from 'dayjs';
import {CITIES_LIMIT} from '../constants.js';

const createTripInfo = (waypointDataArray) => {

  if (waypointDataArray.length > 0) {
    const firstPointDate = dayjs(waypointDataArray[0].dateFrom).format('MMM D');
    const lastPointDate = dayjs(waypointDataArray[waypointDataArray.length - 1].dateTo).format('MMM D');

    const countCities = () => {
      const visitedCities = new Set ();
      for (const waypointData of waypointDataArray) {
        visitedCities.add(waypointData.city);
      }
      return visitedCities.length;
    };

    const renderRoute = () => {
      if (countCities() <= CITIES_LIMIT) {
        return `<h1 class="trip-info__title">${waypointDataArray[0].city} &mdash; ${waypointDataArray[1].city} &mdash; ${waypointDataArray[2].city}</h1>`;
      } else {
        return `<h1 class="trip-info__title">${waypointDataArray[0].city} &mdash; ... &mdash; ${waypointDataArray[waypointDataArray.length - 1].city}</h1>`;
      }
    };

    return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      ${renderRoute()}

      <p class="trip-info__dates">${firstPointDate}&nbsp;&mdash;&nbsp;${lastPointDate}</p>
    </div>
    </section>`;
  }
  else {
    return '';
  }
};

export {createTripInfo};
