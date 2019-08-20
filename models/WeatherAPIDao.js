/*
 *   Weather API DAO
 *     Third Party API wrapper for Weather data.
 *     Wraps the Weather API to encapsulate the implementation,
 *     allowing us to change APIs if needed in the future
 *
 *  TODO: Add error handling
 */
const BaseDao = require("./BaseDao");
const MetaWeatherAPI = require("metaweather");

class WeatherAPIDao extends BaseDao {
  constructor(city) {
    super();
    this.city = city;
  }

  //Get the Current Temp from Weather API
  getCurrentTemperature() {
    const api = new MetaWeatherAPI();
    const query = this.city;
    const ctf = this.convertCtoF;
    //Find webid of City and return Promise up chain
    return api
      .search()
      .query(query.city)
      .then(response => {
        //With webid of City, get forecast
        const bodyStr = response.body[0];
        return api.location(bodyStr.woeid).then(response => {
          //Dig out the proper objects(JSON from free API is unclean)
          const bodyStr = response.body.consolidated_weather[0];
          //Retunr the disired result
          return { name: query.city, temp: ctf(bodyStr.the_temp) };
        });
      });
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

  //Utility
  convertCtoF(cel) {
    return ((cel * 9) / 5 + 32).toFixed(0);
  }
}

//Export the whole Class as a Module
module.exports = WeatherAPIDao;
