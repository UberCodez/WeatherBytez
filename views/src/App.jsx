import React, { Component } from "react";
import WeatherPanel from "./components/WeatherPanel";
import ForecastPanel from "./components/ForecastPanel";
import "./App.css";

export default class App extends Component {
  render() {
    return (
      <div>
        <main className="container" />
        <WeatherPanel />
        <ForecastPanel />
      </div>
    );
  }
}
