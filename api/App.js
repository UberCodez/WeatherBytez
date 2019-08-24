/*
 *   WeatherBytez App
 *     Entry point to for API App. Creates Express server and APIs.
 */
const ForecastController = require("./controllers/ForecastController");
const AppServer = require("../bin/AppServer");
const BaseCore = require("./core/BaseCore");

class App extends BaseCore {
  constructor() {
    super();
    this.controller = new ForecastController();
    this.server = new AppServer();
    this.server.setRoutes(this.controller.getEndpoints());
  }
}

//Create a new instaance of WeatherBytes app
const weatherApp = new App();
