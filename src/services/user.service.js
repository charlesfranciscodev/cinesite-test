import axios from "axios";

export const USER_SERVICE = {
  login,
  logout,
  register
};

function login(username, password) {
  let data = {username, password};
  return axios.post("/login", data)
  .then(response => {
    let { data } = response;
    localStorage.setItem("user", JSON.stringify(data));
    return data;
  });
}

function logout() {
  localStorage.removeItem("user");
}

function register(user) {
  return axios.post("/register", user)
  .then(response => {
    let { data } = response;
    return data;
  })
}
