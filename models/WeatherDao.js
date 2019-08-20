/*
 *   Weather DAO
 *     Primary Weather DAO object for WeatherBytes App.
 */
const WeatherMongoDao = require("../models/WeatherMongoDao");
const WeatherAPIDao = require("../models/WeatherAPIDao");
const BaseDao = require("./BaseDao");

class WeatherDao extends BaseDao {
  constructor(city) {
    super();
    this.city = city;
  }

  //Simply get Temp from Weather API
  getCurrentTemperature() {
    const apiModel = new WeatherAPIDao(this.city);
    const result = apiModel.getCurrentTemperature();
    return result;
  }

  //Simply get 3 day Temp from Weather API
  getThreeDayTemperature() {
    const apiResult = `80, 90, 85 in the ${this.city}`;
    return apiResult;
  }

  //Simply get current Weather condtions from Weather API
  getCurrentConditions() {
    const apiResult = `It's Cloudy in the ${this.city}`;
    return apiResult;
  }

  //Simply get 3 Day Weather condtions from Weather API
  getThreeDayConditions() {
    const apiResult = `Cloudy, Rainy, Sunny in the ${this.city}`;
    return apiResult;
  }

  //Store the current Weather forecast query
  storeWeatherForecast(jsonObj) {
    const dbModel = new WeatherMongoDao();
    const result = dbModel.storeWeatherForecast(jsonObj);
    return result;
    //ToDo Do stuff to store Json
  }
}

//Export the whole Class as a Module
module.exports = WeatherDao;
