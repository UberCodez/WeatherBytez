import React, { Component } from "react";
import DataHolder from "./core/DataHolder";
//const WeatherPanel = require("./WeatherPanel");

export default class ForecastPanel extends Component {
  state = {
    forecasts: []
  };

  componentDidMount() {
    this.getForecasts();
    DataHolder.setContext(this);
  }

  //Call REST endpoint
  getForecasts = async () => {
    try {
      const res = await this.callBackendAPI();
      this.setState(
        (this.state.forecasts = res.results),
        () => (this.state.forecasts = res.results)
      );
    } catch (error) {
      console.error(`An error occurred in React Component${error}`);
    }
  };

  //Call REST endpoint
  callBackendAPI = async () => {
    try {
      const response = await fetch(`/api/v1/forecasts/`);
      const body = await response.json();
      if (response.status !== 200) {
        throw Error(body.message);
      }
      return body;
    } catch (error) {
      console.error(`An error occurred in React Component${error}`);
    }
  };

  render() {
    return (
      <div style={{ width: "378px" }} className="container">
        <div className="card mx-auto border-light shadow p-1">
          <h3 className="text-black mx-auto m-2">Forecast History</h3>
          <small className="mx-auto d-block text-muted">
            (MongoDB dynamic data query)
          </small>
        </div>
        <div className="card mx-auto border-light shadow p-1">
          <table className="table table-sm table-striped">
            <thead style={{ display: "block" }}>
              <tr>
                <th className="w-50" scope="col">
                  City
                </th>
                <th className="w-50" scope="col">
                  Temperature
                </th>
                <th className="w-50" scope="col">
                  Conditions
                </th>
              </tr>
            </thead>
            <tbody
              style={{
                position: "relative",
                height: "100px",
                width: "343px",
                overflow: "auto",
                display: "block"
              }}
            >
              {this.state.forecasts.map(item => (
                <tr key={item.temp}>
                  <td className="w-50">{item.name}</td>
                  <td className="w-50">{item.temp}</td>
                  <td className="w-50">{item.condf}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
