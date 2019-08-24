import React, { Component } from "react";

export default class ForecastPanel extends Component {
  state = {
    forecasts: null
  };

  componentDidMount() {
    this.getForecasts();
  }

  //Call REST endpoint
  getForecasts = async () => {
    this.callBackendAPI()
      .then(res => {
        this.setState({ forecasts: res });
        console.log(`ForecastPanel> ${res}`);
      })
      .catch(err => console.log(err));
  };

  //Call REST endpoint
  callBackendAPI = async () => {
    const response = await fetch(`/api/v1/forecasts/`);
    const body = await response.json();
    if (response.status !== 200) {
      console.log(`ForecastPanel> ${response}`);
      throw Error(body.message);
    }

    return body;
  };

  render() {
    return (
      <div className="container">
        <div className="card mx-auto border-light shadow p-1 w-50">
          <h3 className="text-black mx-auto m-2">Forecast History</h3>
        </div>
        <div className="card mx-auto border-light shadow p-1 w-50">
          <table className="table table-sm">
            <thead>
              <tr>
                <th scope="col">{this.state.forecasts}</th>
                <th scope="col">Temperature</th>
                <th scope="col">Conditions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Dallas</td>
                <td>80/40</td>
                <td>Raining</td>
              </tr>
              <tr>
                <td>Richmond</td>
                <td>80/40</td>
                <td>Snowing</td>
              </tr>
              <tr>
                <td>Detroit</td>
                <td>80/40</td>
                <td>Sunny</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
