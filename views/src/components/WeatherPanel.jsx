import React, { Component } from "react";
import DataHolder from "./core/DataHolder";

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
import { ReactComponent as Icon } from "../assets/github.svg"; //Octicon as React Comp

export default class WeatherPanel extends Component {
  state = {
    apiCity: "a City...",
    apiTemp: "Enter",
    searchFld: "",
    weatherImg: weatherSunny
  };

  //Call REST endpoint
  callBackendAPI = async () => {
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
    this.callBackendAPI()
      .then(res => {
        this.setState({ apiCity: res.result.name });
        this.setState({ apiTemp: res.result.temp + "°" });
        this.setState({ weatherImg: this.lookupImg(res.result.cond) });
        this.setState({ searchFld: "" }); //Reset input field
        DataHolder.getContext().getForecasts();
      })
      .catch(err => console.log(err));
  };

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
            <div className="card border-light shadow p-1">
              <img
                className="rounded float-left w-50 h-50"
                src={mylogoImg}
                alt="Logo"
              />
            </div>
            <div className="card mb-2 shadow p-1 bg-white rounded">
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

              <div className="card-body">
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
                    type="submit"
                  >
                    Go
                  </button>
                </form>
                <div className="container">
                  <div className="row mt-3">
                    <div className="col-md-auto">
                      <small className="float-left d-block text-muted">
                        Powered by
                      </small>
                      <br />
                      <img src={reactImg} alt="React" />
                      <img src={bootstrapImg} alt="BootStrap" />
                      <img src={nodejsImg} alt="NodeJS" />
                      <img src={mongoImg} alt="MongoDB" />
                    </div>
                    <div className="col float-right">
                      <br />
                      <a
                        href="https://www.linkedin.com/in/erikmengel/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          className="m-1"
                          src={linkedInImg}
                          alt="My profile!"
                        />
                      </a>
                      <a
                        href="https://github.com/UberCodez/WeatherBytez"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
