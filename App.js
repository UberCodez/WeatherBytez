/*
 *   WeatherBytez App
 *     Entry point to for App. Creates Express server and APIs.
 */
const ForecastController = require("./controllers/ForecastController");
const AppServer = require("./bin/AppServer");
const BaseCore = require("./core/BaseCore");

class App extends BaseCore {
  constructor() {
    super();
    this.controller = new ForecastController();
    this.server = new AppServer();
    this.server.setRoutes(this.controller.getEndpoints());
  }

  //Test omly method for backend test
  startBroadcast() {
    const promiseRes = this.controller.getCurrentTemperature("Richmond", null);
    promiseRes.then(result => {
      console.log(
        `WeatherBytes broadcast! The temperature forecast for ${
          result.name
        } is  ${result.temp} degrees`
      );
    });
  }
}

//Create a new instaance of WeatherBytes app
const weatherApp = new App();
//weatherApp.startBroadcast();
