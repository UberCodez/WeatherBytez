/*
 *   Forecast Service BO
 *     Business Object for Forecast API. All business logic here.
 */
const WeatherDao = require("../models/WeatherDao");
const BaseService = require("./BaseService");

class ForecastService extends BaseService {
  constructor() {
    super();
  }

  //Simply get current Temp from Weather API
  getCurrentConditions(req, res) {
    const city = req.params;
    const weatherModel = new WeatherDao(city);

    //Get the current temp from the DAO
    const currTemp = weatherModel.getCurrentConditions();

    //We return the Promise at all times, outside and inside of => function
    return currTemp.then(result => {
      if (result) res.status(200).json({ result });
      else res.status(400).json({ error: "Ugh?" });
      //Store results in MongoDB
      weatherModel.storeWeatherForecast(result);
      //Return the 'final' async result
      return result;
    });
  }

  //Retrieve all the Weather forecast queries made
  getForecasts(req, res) {
    //We don't need to pass city, consider a general 'options' parm
    const weatherModel = new WeatherDao(null);

    //Get the forecasts from the DAO
    const allForecasts = weatherModel.getForecasts();
    return allForecasts.then(result => {
      if (result) res.status(200).json({ result });
      else res.status(400).json({ error: "Ugh?" });
      //Return the 'final' async result
      return result;
    });
  }
}

//Export the whole Class as a Module
module.exports = ForecastService;
