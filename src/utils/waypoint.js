import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrAfter);

const checkFutureWaypoint = (dateFrom) => {
  return dayjs(dateFrom).isSameOrAfter(dayjs());
};

const checkPastWaypoint = (dateTo) => {
  return dayjs(dateTo).isBefore(dayjs());
};

const checkOffersExistance = (offers) => {
  if (offers !== null) {
    return offers['offersInfo'].length !== 0;
  }
  else {
    return false;
  }
};

const sortWaypointByTime = (waypointA, waypointB) => {
  return dayjs(waypointB.dateTo).diff(dayjs(waypointB.dateFrom)) - dayjs(waypointA.dateTo).diff(dayjs(waypointA.dateFrom));
};

const sortWaypointByPrice = (waypointA, waypointB) => {
  return waypointB.basePrice - waypointA.basePrice ;
};

export {checkOffersExistance, checkFutureWaypoint, checkPastWaypoint, sortWaypointByPrice, sortWaypointByTime};
