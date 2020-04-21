import React, { Component } from "react";

import CitySummary from "./CitySummary";
import CitySearch from "./CitySearch";

import { currentConditionsForTopCities, currentConditionsForNeighbors } from "../services";

import "./CityList.scss";

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
          <div className="col-md-3 d-flex align-items-center justify-content-center">
            <h3 className="mx-2">Search by city...</h3>
          </div>
          <div className="col-md-3 d-flex align-items-center justify-content-center">
            <CitySearch />
          </div>
        </div>

        <div className="row my-4">
          <div className="col-sm text-center">
            <h2>Weather Conditions</h2>
          </div>
          <div className="col-sm">
            <i onClick={this.locationButtonClick} className="fas fa-location-arrow fa-2x mx-2" id="locationIcon"></i>
            <small>Click Icon to Toggle Between Current Location and Top Cities</small>
          </div>
        </div>
        
        <div className="row mb-4">
          {
            this.state["currentConditionsArray"].map(conditions => 
              <CitySummary conditions={conditions} key={conditions.Key} />
            )
          }
        </div>
      </div>
    );
  }
};

export default CityList;
