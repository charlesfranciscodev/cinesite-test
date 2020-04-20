import React, { Component } from "react";

import CityDailyForecast from "./CityDailyForecast";
import { dailyForecasts } from "../services";

class CityDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "dailyForecastArray": []
    };
  }

  componentDidMount() {
    this.getDailyForecasts();
  }

  getDailyForecasts = () => {
    const { match: { params } } = this.props;
    dailyForecasts(params.locationKey).then(data => {
      this.setState({
        "dailyForecastArray": data
      });
    });
  }

  render() {
    let { LocalizedName } = this.props.location.state;

    return (
      <div className="container">
        <div className="text-center my-4">
          <h2>Daily Weather Forecast for {LocalizedName}</h2>
        </div>
        
        {
          this.state["dailyForecastArray"].map(forecast => 
            <CityDailyForecast key={forecast.Date} forecast={forecast} />
          )
        }
      </div>
    );
  }
};

export default CityDetail;
