import React, { Component } from "react";

//Importing images so Webpack knows where to look
import weatherSunny from "../assets/sunny.png";
import weatherRain from "../assets/rain.png";
import weatherSnow from "../assets/snow.png";
import weatherCloudy from "../assets/cloudy.png";
import mylogoImg from "../assets/logo.png";
import linkedInImg from "../assets/linkedin.png";
import reactImg from "../assets/react.png";
import bootstrapImg from "../assets/bootstrap.png";
import nodejsImg from "../assets/nodejs.png";
import mongoImg from "../assets/mongo.png";
import { ReactComponent as GitIcon } from "../assets/github.svg"; //Octicon as React Comp

export default class WeatherPanel extends Component {
  state = {
    apiCity: "a City...",
    apiTemp: "Enter",
    searchFld: "",
    weatherImg: weatherSunny,
    forecasts: []
  };

  //Call REST endpoint for Forecast for City
  callBackendAPIforCity = async () => {
    if (this.state.searchFld === "") return; //Type something :)
    const response = await fetch(`/api/v1/forecasts/${this.state.searchFld}`);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  //Collect the textfield data
  handleChange = e => {
    e.preventDefault();
    this.setState({ searchFld: e.target.value });
  };

  //Handle the Forecast Search
  handleSearch = () => {
    this.callBackendAPIforCity()
      .then(res => {
        this.setState({ apiCity: res.result.name });
        this.setState({ apiTemp: res.result.temp + "°" });
        this.setState({ weatherImg: this.lookupImg(res.result.cond) });
        this.setState({ searchFld: "" }); //Reset input field
        // this.state.forecasts.unshift(res.result);
        // const rtRes = this.state.forecasts;
        // this.setState({ forecasts: rtRes });
        this.getForecasts();
      })
      .catch(err => console.log(err));
  };

  /* Forecast History calls */
  //On component load, get history
  componentDidMount() {
    this.getForecasts();
  }

  //Call REST endpoint for Forecast History
  getForecasts = async () => {
    try {
      const res = await this.callBackendAPIForecasts();
      this.setState(
        (this.state.forecasts = res.results),
        () => (this.state.forecasts = res.results)
      );
    } catch (error) {
      console.error(`An error occurred in React Component${error}`);
    }
  };

  //Call REST endpoint for Forecast History
  callBackendAPIForecasts = async () => {
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

  /*Utility methods*/
  //Quick weather status key lookup. Can improve...
  lookupImg = key => {
    const cond = [
      { name: weatherRain, value: ["lr", "hr", "s", "t"] },
      { name: weatherSnow, value: ["sn", "sl", "h"] },
      { name: weatherCloudy, value: ["hc", "lc"] },
      { name: weatherSunny, value: ["c"] }
    ];
    const found = cond.filter(ccond => ccond.value.includes(key));
    return found[0].name;
  };

  render() {
    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-md-4">
            <div className="d-block card mx-auto border-light shadow p-1">
              <div className="card border-light shadow p-1">
                <img
                  className="rounded float-left w-50 h-50"
                  src={mylogoImg}
                  alt="Logo"
                />
              </div>
              <div className="card-header bg-light">
                <img
                  src={this.state.weatherImg}
                  className="rounded float-left m-4"
                  alt="Conditions"
                />
                <h1 className="text-black m-2">{this.state.apiTemp}</h1>
                <h2 className="text-black m-2 text-capitalize">
                  {this.state.apiCity}
                </h2>
              </div>
              <form onSubmit={this.handleChange}>
                <input
                  className="form-control-sm m-2"
                  type="text"
                  placeholder="City"
                  aria-label="City"
                  onChange={this.handleChange}
                  value={this.state.searchFld}
                />
                <button
                  className="btn btn-sm btn-outline-success mb-2 m-1"
                  onClick={this.handleSearch}
                  cursor="pointer"
                  type="submit"
                >
                  Go
                </button>
              </form>
              <div className="float-left">
                <small className="float-left d-block text-muted">
                  Powered by
                </small>
                <br />
                <img src={reactImg} alt="React" />
                <img src={bootstrapImg} alt="BootStrap" />
                <img src={nodejsImg} alt="NodeJS" />
                <img src={mongoImg} alt="MongoDB" />
              </div>
              <div className="float-right">
                <br />
                <a
                  href="https://www.linkedin.com/in/erikmengel/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img className="m-1" src={linkedInImg} alt="My profile!" />
                </a>
                <a
                  href="https://github.com/UberCodez/WeatherBytez"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitIcon />
                </a>
              </div>
              <table className="table table-sm table-striped">
                <div className="card border-light shadow">
                  <h5>Forecast History</h5>
                </div>
                <thead style={{ display: "block" }}>
                  <tr>
                    <th className="w-40" scope="col">
                      Date
                    </th>
                    <th className="w-50" scope="col">
                      City
                    </th>
                    <th className="w-40" scope="col">
                      Temp
                    </th>
                    <th className="w-50" scope="col">
                      Conditions
                    </th>
                  </tr>
                </thead>

                <tbody
                  style={{
                    position: "relative",
                    height: "130px",
                    width: "340px",
                    overflow: "auto",
                    display: "block"
                  }}
                >
                  {this.state.forecasts.map(item => (
                    <tr key={item.temp}>
                      <td className="w-40">{item.date}</td>
                      <td className="w-50">{item.name}</td>
                      <td className="w-40">{item.temp}</td>
                      <td className="w-50">{item.condf}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
