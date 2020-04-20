import React from "react";
import { Link } from "react-router-dom";

/**
 * Display current weather conditions for one city.
 * @param {*} props 
 */
function CitySummary(props) {
  return (
    <div className="row bg-light my-2">
      <div className="col-sm-6 d-flex align-items-center justify-content-center">
        <Link to={{
          pathname: `/daily-forecast/${props.conditions.Key}`,
          state: {
            LocalizedName: props.conditions.LocalizedName
          }
        }}>
          { props.conditions.LocalizedName }
        </Link>
      </div>

      <div className="col-sm-3 d-flex align-items-center justify-content-center">
        <img src={`/icons/weather-icon-${props.conditions.WeatherIcon}.png`} alt={props.conditions.WeatherText} className="my-2" /> {props.conditions.WeatherText}
      </div>

      <div className="col-sm-3 d-flex align-items-center justify-content-center">
        { props.conditions.Temperature.Metric.Value } °{ props.conditions.Temperature.Metric.Unit }
      </div>
    </div>
  );
};

export default CitySummary;
