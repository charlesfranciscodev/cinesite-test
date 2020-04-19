import { ALERT_CONSTANTS } from "../constants";

export function alert(state = {}, action) {
  switch(action["type"]) {
    case ALERT_CONSTANTS["SUCCESS"]:
      return {
        "type": "alert-success",
        "message": action["message"]
      };
    case ALERT_CONSTANTS["ERROR"]:
      return {
        "type": "alert-danger",
        "message": action["message"]
      };
    case ALERT_CONSTANTS["CLEAR"]:
      return {};
    default:
      return state;
  }
}
