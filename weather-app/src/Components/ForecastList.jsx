import React from "react";
import { useState } from "react";
import ForecastCard from "./ForecastCard";

function ForecastList({ forecastArray }) {
  return (
    <section>
      <h2 style={{ textAlign: 'center', marginTop: '2rem', color: 'white' }}>Upcoming Forecast</h2>
      <div className="forecastList">
        {forecastArray.map((data, index) => (
          <ForecastCard key={index} forecastData={data} />
        ))}
      </div>
    </section>
  );
}

export default ForecastList;