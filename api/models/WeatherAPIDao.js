/*
 *   Weather API DAO
 *     Third Party API wrapper for Weather data.
 *     Wraps the Weather API to encapsulate the implementation,
 *     allowing us to change APIs if needed in the future
 *
 */
const BaseDao = require("./BaseDao");
const MetaWeatherAPI = require("metaweather");

class WeatherAPIDao extends BaseDao {
  constructor(city) {
    super();
    this.city = city;
  }

  //Get the Current Conditions(temp/cloudy/sunny/rain/etc) from Weather API
  getCurrentConditions() {
    const api = new MetaWeatherAPI();
    let query = this.city;
    const ctf = this.convertCtoF;
    const ctd = this.convertDate;
    //Find webid of City and return Promise up chain
    return api
      .search()
      .query(query.city)
      .then(response => {
        //With webid of City, get forecast
        const bodyStr = response.body[0];
        query = bodyStr.title; //Return the city the API shows, not what user types
        return api.location(bodyStr.woeid).then(response => {
          //Dig out the proper objects(JSON from free API is unclean)
          const bodyStr = response.body.consolidated_weather[0];
          //Retunr the disired result
          return {
            date: ctd(bodyStr.applicable_date),
            name: query,
            temp: ctf(bodyStr.the_temp),
            cond: bodyStr.weather_state_abbr,
            condf: bodyStr.weather_state_name
          };
        });
      })
      .catch(response => {
        //Handle errors gracefully for end user
        console.error(`No Data Available > ${response}`);
        throw error;
      });
  }

  //Utility
  convertCtoF(cel) {
    return ((cel * 9) / 5 + 32).toFixed(0);
  }

  convertDate(dateIn) {
    let current_datetime = new Date(dateIn);
    let formatted_date =
      current_datetime.getMonth() + 1 + "/" + (current_datetime.getDate() + 1);
    return formatted_date;
  }
}

//Export the whole Class as a Module
module.exports = WeatherAPIDao;
