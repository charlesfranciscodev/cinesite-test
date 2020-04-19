import axios from "axios";
import MockAdapter from "axios-mock-adapter";

export function configureFakeBackend() {
  let mock = new MockAdapter(axios, { "onNoMatch": "passthrough" });

  let users = JSON.parse(localStorage.getItem("users")) || [];

  mock.onPost("/login").reply(function(config) {
    return new Promise((resolve, reject) => {
      let response = {};
      let { username, password } = JSON.parse(config["data"]);
  
      // check if username/password combo matches with an existing user account
      let filteredUsers = users.filter(user => {
        return user.username === username && user.password === password;
      });

      if (filteredUsers.length !== 0) {
        let user = filteredUsers[0];
        response = user;
        response["token"] = "fake.jwt.token";
        resolve([200, response]);
      } else {
        response["message"] = "Invalid username or password";
        reject([401, response]);
      }
    });
  });

  mock.onPost("/register").reply(function(config) {
    return new Promise((resolve, reject) => {
      let response = {};
      let { username, password } = JSON.parse(config["data"]);
  
      // check if username matches with an existing user account
      let filteredUsers = users.filter(user => {
        return user.username === username;
      });

      if (filteredUsers.length !== 0) {
        response["message"] = `Username ${username} already exists.`;
        reject([409, response]);
      } else {
        let user = {
          "username": username,
          "password": password
        };
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        response["message"] = "Account created successfully";
        resolve([201, response]);
      }
    });
  });
}
