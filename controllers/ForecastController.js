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

  //Call Forecast Service
  getCurrentTemperature(req, res) {
    try {
      const service = new ForecastService();
      console.log(req.params);

      const promiseRes = service.getCurrentTemperature(req, res);
      return promiseRes.then(result => {
        return result;
      });
    } catch (error) {
      console.error(`An error occurred in Controller > ${error}`);
      throw error;
    }
    //ToDo Call Forecast Service
  }

  //Simply get 3 day Temp from Weather API
  getThreeDayTemperature(req, res) {
    //ToDo Call Forecast Service
  }

  //Simply get current Weather condtions from Weather API
  getCurrentConditions(req, res) {
    //ToDo Call Forecast Service
  }

  //Simply get 3 Day Weather condtions from Weather API
  getThreeDayConditions(req, res) {
    //ToDo Call Forecast Service
  }

  getEndpoints() {
    let router = express.Router();
    router.get("/", (req, res) => res.send("WeatherBytes App is ready!"));
    router.get("/api/v1/forecasts/:city", this.getCurrentTemperature);
    // router.post("/api/v1/forecasts", postController.createPost);
    // router.get("/api/v1/forecasts/:id", postController.getOnePost);
    // router.put("/api/v1/forecasts/:id", postController.updatePost);
    // router.delete("/api/v1/forecasts/:id", postController.deletePost);
    return router;
  }
}

//Export the whole Class as a Module
module.exports = ForecastController;
