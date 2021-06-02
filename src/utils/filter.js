import {FilterType} from '../constants.js';
import {checkPastWaypoint, checkFutureWaypoint} from './waypoint.js';

const filter = {
  [FilterType.EVERYTHING]: (waypoints) => {return waypoints;},
  [FilterType.FUTURE]: (waypoints) => {return waypoints.filter((waypoint) => checkFutureWaypoint(waypoint.dateFrom));},
  [FilterType.PAST]: (waypoints) => {return waypoints.filter((waypoint) => checkPastWaypoint(waypoint.dateTo));},
};

export {filter};
