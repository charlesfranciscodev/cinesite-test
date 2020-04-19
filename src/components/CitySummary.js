import React from "react";

function CitySummary(props) {
  let weatherText = `${props["conditions"]["WeatherText"]}`;

  return (
    <div className="row bg-light my-2">
      <div className="col-6 d-flex align-items-center justify-content-center">
        { props["conditions"]["LocalizedName"] }
      </div>

      <div className="col-3 d-flex align-items-center justify-content-center">
        <img src={`./icons/weather-icon-${props["conditions"]["WeatherIcon"]}.png`} alt={weatherText} className="my-2" /> {weatherText}
      </div>

      <div className="col-3 d-flex align-items-center justify-content-center">
        { props["conditions"]["Temperature"]["Metric"]["Value"] } °{ props["conditions"]["Temperature"]["Metric"]["Unit"] }
      </div>
    </div>
  );
};

export default CitySummary;
