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

  //Get the Current Conditions(temp/cloudy/sunny/rain/etc)
  getCurrentConditions() {
    const apiModel = new WeatherAPIDao(this.city);
    const result = apiModel.getCurrentConditions();
    return result;
  }

  //Store the current Weather forecast query
  storeWeatherForecast(jsonObj) {
    const dbModel = new WeatherMongoDao();
    const result = dbModel.storeWeatherForecast(jsonObj);
    return result;
  }

  //Retrieve all the Weather forecast queries made
  getForecasts() {
    const dbModel = new WeatherMongoDao();
    const result = dbModel.getForecasts();
    return result;
  }
}

//Export the whole Class as a Module
module.exports = WeatherDao;
