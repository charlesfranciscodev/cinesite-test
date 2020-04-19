import React, { Component } from "react";

import CitySummary from "./CitySummary";

import { currentConditionsForTopCities, currentConditionsForNeighbors } from "../services";

class CityList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "currentConditionsArray": [],
      "useCurrentLocation": false
    };
  }

  componentDidMount() {
    this.getCurrentConditionsForTopCities();
  }

  locationButtonClick = () => {
    let useCurrentLocation = !this.state["useCurrentLocation"];
    this.setState({
      "useCurrentLocation": useCurrentLocation
    });
    if (useCurrentLocation) {
      this.getCurrentConditionsForNeighbors();
    } else {
      this.getCurrentConditionsForTopCities();
    }
  }

  getCurrentConditionsForTopCities = () => {
    currentConditionsForTopCities().then(data => {
      this.setState({
        "currentConditionsArray": data
      });
    });
  }

  getCurrentConditionsForNeighbors = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        currentConditionsForNeighbors(position.coords.latitude, position.coords.longitude).then(data => {
            this.setState({
              "currentConditionsArray": data
            });
        })
      })
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row my-4">
          <div className="col-8 text-center">
            <h2>Weather Conditions</h2>
          </div>
          <div className="col-4 d-flex align-items-center justify-content-center">
            <i onClick={this.locationButtonClick} className="fas fa-location-arrow fa-2x mx-2"></i>
            <span className="badge badge-primary">Click to Toggle Between Current Location and Top Cities</span>
          </div>
        </div>
        
        {
          this.state["currentConditionsArray"].map(conditions => 
            <CitySummary conditions={conditions} key={conditions["Key"]} />
          )
        }
      </div>
    );
  }
};

export default CityList;
