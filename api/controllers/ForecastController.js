/*
 *   Forecast Controller API
 *     Entry point to Forecast service. Holds REST endpoints.
 */
const BaseController = require("./BaseController");
const ForecastService = require("../services/ForecastService");
const express = require("express");

class ForecastController extends BaseController {
  constructor() {
    super();
  }

  //Call Forecast Service for current weather conditions
  getCurrentConditions(req, res) {
    const service = new ForecastService();
    const promiseRes = service.getCurrentConditions(req, res);
    return promiseRes
      .then(result => {
        return result;
      })
      .catch(console.error(`An error occurred in Controller`));
  }

  //Retrieve all the Weather forecast queries made
  getForecasts(req, res) {
    const service = new ForecastService();
    const promiseRes = service.getForecasts(req, res);
    return promiseRes
      .then(result => {
        return result;
      })
      .catch(console.error(`An error occurred in Controller`));
  }

  //Get endpoint routing for app server
  getEndpoints() {
    let router = express.Router();
    router.get("/", (req, res) => res.send("WeatherBytes App is ready!"));
    router.get("/api/v1/forecasts/:city", this.getCurrentConditions);
    router.get("/api/v1/forecasts/", this.getForecasts);
    // router.get("/api/v1/forecasts/:id", this.getThreeDayConditions);
    // router.post("/api/v1/forecasts", this.<insertTODO>);
    // router.put("/api/v1/forecasts/:id",  this.<updateTODO>);
    // router.delete("/api/v1/forecasts/:id",  this.<deleteTODO>);
    return router;
  }
}

//Export the whole Class as a Module
module.exports = ForecastController;
