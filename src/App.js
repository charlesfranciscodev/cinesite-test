import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import CityList from "./components/CityList";
import LoginForm from "./components/LoginForm";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" component={CityList} />
          <Route path="/login" component={LoginForm}/>
        </div>
      </Router>
    );
  }
}

export default App;
