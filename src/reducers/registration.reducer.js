import { USER_CONSTANTS } from "../constants";

export function registration(state = {}, action) {
  switch(action["type"]) {
    case USER_CONSTANTS["REGISTER_REQUEST"]:
      return {
        "registering": true
      };
    case USER_CONSTANTS["REGISTER_SUCCESS"]:
      return {};
    case USER_CONSTANTS["REGISTER_FAILURE"]:
      return {};
    default:
      return state;
  }
}
