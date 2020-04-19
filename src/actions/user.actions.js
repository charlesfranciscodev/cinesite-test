import { USER_CONSTANTS } from "../constants";
import { USER_SERVICE } from "../services";
import { ALERT_ACTIONS } from "./";
import { history } from "../helpers";

export const USER_ACTIONS = {
  login,
  logout,
  register
};

function login(username, password) {
  return dispatch => {
    dispatch(request({ username }));

    USER_SERVICE.login(username, password)
    .then(user => {
      dispatch(success(user));
      history.push("/");
    })
    .catch(error => {
      let [status, data] = error;
      dispatch(failure(data["message"]));
      dispatch(ALERT_ACTIONS.error(data["message"]));
    });
  };

  function request(user) {
    return {
      "type": USER_CONSTANTS["LOGIN_REQUEST"],
      user
    };
  }

  function success(user) {
    return {
      "type": USER_CONSTANTS["LOGIN_SUCCESS"],
      user
    };
  }

  function failure(error) {
    return {
      "type": USER_CONSTANTS["LOGIN_FAILURE"],
      error
    };
  }
}

function logout() {
  USER_SERVICE.logout();
  return {
    "type": USER_CONSTANTS["LOGOUT"]
  }
}

function register(user) {
  return dispatch => {
    dispatch(request(user));

    USER_SERVICE.register(user)
    .then(data => {
      dispatch(success(data));
      history.push("/login");
      dispatch(ALERT_ACTIONS.success(data["message"]));
    })
    .catch(error => {
      let [status, data] = error;
      dispatch(failure(data["message"]));
      dispatch(ALERT_ACTIONS.error(data["message"]));
    });
  };

  function request(user) {
    return {
      "type": USER_CONSTANTS["REGISTER_REQUEST"],
      user
    };
  }

  function success(data) {
    return {
      "type": USER_CONSTANTS["REGISTER_SUCCESS"],
      data
    };
  }

  function failure(error) {
    return {
      "type": USER_CONSTANTS["REGISTER_FAILURE"],
      error
    };
  }
}
