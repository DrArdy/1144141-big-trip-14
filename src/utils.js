import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrAfter);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const checkFutureWaypoint = (waypointData) => {
  dayjs(waypointData.dateFrom).isSameOrAfter(dayjs()) ? 'true' : 'false';
};

const checkPastWaypoint = (waypointData) => {
  dayjs(waypointData.dateTo).isBefore(dayjs()) ? 'true' : 'false';
};

export {render, getRandomInteger, checkFutureWaypoint, checkPastWaypoint};
