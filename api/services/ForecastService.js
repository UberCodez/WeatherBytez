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
  async getCurrentConditions(req, res) {
    try {
      const city = req.params;
      const weatherModel = new WeatherDao(city);

      //Get the current temp from the DAO
      const currTemp = await weatherModel.getCurrentConditions();
      const result = currTemp;
      //Properly update the response object
      if (result) res.status(200).json({ result });
      else res.status(400).json({ error: "Ugh?" });
      //Store results in MongoDB
      weatherModel.storeWeatherForecast(result);

      //Return the 'final' async result
      return result;
    } catch (error) {
      console.error(`An error occurred in Service${error}`);
      throw error;
    }
  }

  //Retrieve all the Weather forecast queries made
  async getForecasts(req, res) {
    //We don't need to pass city, consider a general 'options' parm
    const weatherModel = new WeatherDao(null);
    try {
      //Get the forecasts from the DAO
      const results = await weatherModel.getForecasts();
      if (results) {
        res.status(200).json({ results });
        return results; //Return the 'final' async result
      } else res.status(400).json({ error: "Ugh?" });
    } catch (error) {
      console.error(`An error occurred in Service${error}`);
      throw error;
    }
  }
}

//Export the whole Class as a Module
module.exports = ForecastService;
