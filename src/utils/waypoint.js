import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrAfter);

const checkFutureWaypoint = (waypointData) => {
  dayjs(waypointData.dateFrom).isSameOrAfter(dayjs()) ? 'true' : 'false';
};

const checkPastWaypoint = (waypointData) => {
  dayjs(waypointData.dateTo).isBefore(dayjs()) ? 'true' : 'false';
};

const checkOffersExistance = (offers) => {
  if (offers !== null) {
    return offers['offersInfo'].length !== 0;
  }
  else {
    return false;
  }
};

export {checkOffersExistance, checkFutureWaypoint, checkPastWaypoint};
