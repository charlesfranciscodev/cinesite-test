import { ALERT_CONSTANTS } from "../constants";

export const ALERT_ACTIONS = {
  success,
  error,
  clear
};

function success(message) {
  return {
    "type": ALERT_CONSTANTS.SUCCESS,
    message
  };
}

function error(message) {
  return {
    "type": ALERT_CONSTANTS.ERROR,
    message
  };
}

function clear() {
  return {
    "type": ALERT_CONSTANTS.CLEAR
  };
}
