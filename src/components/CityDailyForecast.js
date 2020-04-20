import React from "react";

/**
 * Display daily weather conditions for one city.
 * @param {*} props 
 */
function CityDailyForecast(props) {
  let date = props.forecast.Date.split('T')[0];

  return (
    <div className="row bg-light my-2">
      <div className="col-sm-4 d-flex align-items-center justify-content-center">
        { date }
      </div>

      <div className="col-sm-4 d-flex align-items-center justify-content-center">
        <img src={`/icons/weather-icon-${props.forecast.Day.Icon}.png`} alt={props.forecast.Day.IconPhrase} className="my-2" /> {props.forecast.Day.IconPhrase}
      </div>

      <div className="col-sm-4 d-flex align-items-center justify-content-center">
        { props.forecast.Temperature.Maximum.Value } °{ props.forecast.Temperature.Maximum.Unit } / { props.forecast.Temperature.Minimum.Value } °{ props.forecast.Temperature.Minimum.Unit }
      </div>
    </div>
  );
};

export default CityDailyForecast;
