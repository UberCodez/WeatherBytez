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
  getCurrentTemperature(req, res) {
    //ToDo Call Weather API
    const city = req.params;
    const weatherModel = new WeatherDao(city);

    //Get the current temp from the DAO
    const currTemp = weatherModel.getCurrentTemperature();

    //We return the Promise (currTemp) at all times, outside and inside of => function
    return currTemp.then(result => {
      if (result)
        res.status(200).json({ message: "Found Data", value: currTemp });
      else res.status(400).json({ error: "No Found Data" });

      //temp
      const msg = `WeatherBytes broadcast! The temperature for 
      ${result.name} is ${result.temp} degrees`;
      console.log(msg);

      //Store results in MongoDB
      weatherModel.storeWeatherForecast(result);

      //Return the 'final' async result
      return result;
    });
  }

  //Simply get 3 day Temp from Weather API
  getThreeDayTemperature(req, res) {}

  //Simply get current Weather condtions from Weather API
  getCurrentConditions(req, res) {}

  //Simply get 3 Day Weather condtions from Weather API
  getThreeDayConditions(req, res) {}
}

//Export the whole Class as a Module
module.exports = ForecastService;
