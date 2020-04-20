import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import { history } from "./helpers";
import { ALERT_ACTIONS } from "./actions";

import { Navbar } from "./components/Navbar";
import CityList from "./components/CityList";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import CityDetail from "./components/CityDetail";

import CitySearch from "./components/CitySearch";

class App extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(ALERT_ACTIONS.clear());
    });
  }

  alertButtonClick = () => {
    const { dispatch } = this.props;
    dispatch(ALERT_ACTIONS.clear());
  }

  render() {
    let { alert } = this.props;

    return (
      <Router history={history}>
        <div>
          <Navbar />

          <CitySearch />

          <div className="container">
            {alert["message"] && 
              <div className={`alert ${alert["type"]} alert-dismissible fade show`} role="alert">
                {alert["message"]}
                <button onClick={this.alertButtonClick} type="button" className="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            }
          </div>

          <Route exact path="/" component={CityList} />
          <Route path="/login" component={LoginForm}/>
          <Route path="/register" component={RegisterForm}/>
          <Route path="/daily-forecast/:locationKey" component={CityDetail}/>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
